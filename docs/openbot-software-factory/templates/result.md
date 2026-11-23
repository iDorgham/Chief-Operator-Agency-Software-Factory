# Result — {{task_id}}

Fill all schema fields; tests report actual outcomes only.

- task_id: {{task_id}}
- client_id: {{client_id}}
- project_id: {{project_id}}
- feature_id: {{feature_id}}
- spec_version: {{spec_version}}
- branch_or_worktree: {{branch_or_worktree}}
- pr_reference: {{pr_reference_or_empty}}
- summary: {{factual_summary}}
- changed_files: [{{file_path}}]
- tests:
  - command: {{command}}
    status: {{passed_failed_not-run_blocked}}
    details: {{actual_result}}
- limitations: [{{limitation_or_empty}}]

## Related
- [Review](review.md)
- [Result Schema](../schemas/result.schema.json)
