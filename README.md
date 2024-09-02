# Check Commit Messages GitHub Action

A simple GitHub action that checks the list of commits in a pull-request:

- the number of commits shall not be higher than `max-commits` (defaults to 10),
- each commit message must at least contain `min-words` (defaults to 3),
- each commit message must not contain any `forbidden-words` (like `fixup`).

Heavily inspired by [webiny/action-conventional-commits](https://github.com/webiny/action-conventional-commits).


### Usage
Latest version: `v0.0.1`

```yml
name: Check commit messages

on:
  pull_request:
    branches: [ master ]

jobs:
  build:
    name: Check Commits
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: huggingface/check-commits@v0.0.1
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} # Optional, for private repositories.
          max-commits: "15" # Optional, defaults to 10.
          min-words: "5" # Optional, defaults to 3.
          forbidden-words: ["fixup', "wip"] # Optional, defaults to ["fixup"].
```
