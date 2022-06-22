# `replayio/action-comment`

> Comment on PRs with links to [Replay](https://replay.io) of replays and test runs

## Usage

```yaml
- name: Generate Test Run ID
  id: test-run-id
  run: echo "::set-output name=UUID::$(uuidgen | tr A-Z a-z)"
  shell: bash
- uses: replayio/action-comment@main
  with:
    apiKey: ${{ secrets.RECORD_REPLAY_API_KEY }}
    issue-number: ${{ github.event.pull_request.number }}
    test-run-id: ${{ steps.test-run-id.outputs.UUID }}
```

## Arguments

Required | Name | Description | Default
-------- | ---- | ----------- | -------
:white_check_mark: | `api-key` | The Replay API Key used to upload recordings
:white_check_mark:  | `issue-number` | The number of the pull request to comment with failed test links | 
&nbsp; | `recordings` | An array of recordings from the Replay CLI | 
&nbsp; | `summary-message` | Templated message (by [@formatjs/intl](https://www.npmjs.com/package/@formatjs/intl)) for the upload summary. | `false`
&nbsp; | `test-run-id` | UUID generated for a test run. If omitted, the test run link will not be included in the comment. |
&nbsp; | `test-run-message` | Templated message (by [@formatjs/intl](https://www.npmjs.com/package/@formatjs/intl)) for the test run link. | `false`
