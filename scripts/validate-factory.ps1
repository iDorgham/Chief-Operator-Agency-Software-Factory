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

# Check repository documentation, not installed dependency or generated docs.
# rg respects .gitignore and includes new, untracked source documents.
# Keep the documented Python/PowerShell-only setup working without ripgrep.
function Get-MarkdownSources([string]$directory) {
  foreach ($entry in Get-ChildItem -LiteralPath $directory -Force) {
    if ($entry.PSIsContainer) {
      if ($entry.Name -notin @('archive', '.git', 'node_modules', '.next', '.cache', 'dist', 'build', 'coverage', 'test-results', 'playwright-report')) {
        Get-MarkdownSources $entry.FullName
      }
    } elseif ($entry.Extension -eq '.md') { $entry.FullName }
  }
}
$markdownSources = if (Get-Command rg -ErrorAction SilentlyContinue) {
  & rg --files --hidden -g '*.md' -g '!archive/**' -g '!.git/**' $root
} else { Get-MarkdownSources $root }
$markdownSources |
  ForEach-Object { Get-Item -LiteralPath $_ } |
  ForEach-Object {
    $file = $_
    $content = Get-Content -Raw -LiteralPath $file.FullName
    foreach ($match in [regex]::Matches($content, '\[[^\]]+\]\(([^)]+)\)')) {
      $target = $match.Groups[1].Value
      if ($target -match '^([a-zA-Z][a-zA-Z0-9+.-]*:|#)') { continue }
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

# Work automation: CLI tests, then every work record (synthetic and real).
& python (Join-Path $root "scripts\test_factory.py") | Out-Host
if ($LASTEXITCODE -ne 0) { $failures.Add("Factory CLI tests failed (scripts/test_factory.py)") }
foreach ($workRoot in @("fixtures\work", "work")) {
  & python (Join-Path $root "scripts\factory.py") --root (Join-Path $root $workRoot) check | Out-Host
  if ($LASTEXITCODE -ne 0) { $failures.Add("Work records invalid under $workRoot (scripts/factory.py check)") }
}

if ($failures.Count) {
  # Write-Error under ErrorActionPreference=Stop would abort after the first
  # failure; report all of them instead.
  $failures | ForEach-Object { [Console]::Error.WriteLine("FAIL: $_") }
  exit 1
}

Write-Output "Factory validation passed."
