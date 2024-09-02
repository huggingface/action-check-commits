const { context } = require("@actions/github");
const core = require("@actions/core");

import isValidCommitMessage from "./isValidCommitMessage";
import extractCommits from "./extractCommits";

async function run() {
    core.info(
        `ℹ️ Checking commit messages ...`
    );

    const extractedCommits = await extractCommits(context, core);
    if (extractedCommits.length === 0) {
        core.info(`No commits to check, skipping...`);
        return;
    }

    const maxCommits = parseInt(core.getInput("max-commits"))
    if (extractedCommits.length > maxCommits) {
        core.setFailed(`🚫 The pull-request shall not contain more than ${maxCommits} commits: please squash some of them or split the pull-request.`);
        return;
    }

    let hasErrors;
    core.startGroup("Commit messages:");
    for (let i = 0; i < extractedCommits.length; i++) {
        let commit = extractedCommits[i];

        if (isValidCommitMessage(commit.message, core)) {
            core.info(`✅ ${commit.message}`);
        } else {
            core.info(`🚩 ${commit.message}`);
            hasErrors = true;
        }
    }
    core.endGroup();

    if (hasErrors) {
        core.setFailed(
            `🚫 Some of the commit messages are either too short of contain forbidden words. Please amend or squash them.`
        );
    } else {
        core.info("🎉 All commit messages are valid.");
    }
}

run();
