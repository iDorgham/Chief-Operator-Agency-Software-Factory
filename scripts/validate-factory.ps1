param(
  [string]$SkillValidator = ""
)

$ErrorActionPreference = "Stop"
$root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$failures = [System.Collections.Generic.List[string]]::new()

Get-ChildItem (Join-Path $root "schemas") -Filter "*.json" | ForEach-Object {
  try { Get-Content -Raw -LiteralPath $_.FullName | ConvertFrom-Json | Out-Null }
  catch { $failures.Add("Invalid JSON: $($_.FullName)") }
}

Get-ChildItem $root -Recurse -File -Filter "*.md" |
  Where-Object { $_.FullName -notlike "*\archive\*" } |
  ForEach-Object {
    $file = $_
    $content = Get-Content -Raw -LiteralPath $file.FullName
    foreach ($match in [regex]::Matches($content, '\[[^\]]+\]\(([^)]+)\)')) {
      $target = $match.Groups[1].Value
      if ($target -match '^(https?://|mailto:|#)') { continue }
      $path = ($target -split '#')[0]
      if ($path -and -not (Test-Path -LiteralPath (Join-Path $file.DirectoryName $path))) {
        $failures.Add("Broken link: $($file.FullName) -> $target")
      }
    }
  }

if ($SkillValidator) {
  $skillDirs = @((Join-Path $root ".agents\skills\openbot-run-operator"))
  $skillDirs += Get-ChildItem (Join-Path $root "skills") -Directory | Select-Object -ExpandProperty FullName
  foreach ($dir in $skillDirs) {
    & python $SkillValidator $dir | Out-Host
    if ($LASTEXITCODE -ne 0) { $failures.Add("Skill validation failed: $dir") }
  }
}

# Schema meta-validation, contract fixtures, OpenBot manifest, agent skill
# references and archive hash verification against the baseline commit.
& python (Join-Path $root "scripts\validate_contracts.py") | Out-Host
if ($LASTEXITCODE -ne 0) { $failures.Add("Contract validation failed (scripts/validate_contracts.py)") }

if ($failures.Count) {
  # Write-Error under ErrorActionPreference=Stop would abort after the first
  # failure; report all of them instead.
  $failures | ForEach-Object { [Console]::Error.WriteLine("FAIL: $_") }
  exit 1
}

Write-Output "Factory validation passed."
