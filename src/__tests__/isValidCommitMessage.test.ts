import isValidCommitMessage from "../isValidCommitMessage";

function Core (minWords, forbiddenWords) {
    return {
        "min-words": minWords,
        "forbidden-words": forbiddenWords,
        "getInput": function (name) {
            return this[name]
        }
    }
}

test("should be able to correctly validate the commit message", () => {
    // Using default properties
    const core = Core(3, 'fixup')
    // Text messages
    expect(isValidCommitMessage("chore(nice-one): doing this right", core)).toBe(true);
    expect(isValidCommitMessage("wip", core)).toBe(false);
    expect(isValidCommitMessage("wip 1", core)).toBe(false);
    expect(isValidCommitMessage("one more fix", core)).toBe(true);
    expect(isValidCommitMessage("fix: foo did not work", core)).toBe(true);
    expect(isValidCommitMessage("fixes something that did not work", core)).toBe(true);
    // Messages with emojis
    expect(isValidCommitMessage("🚧 this should work", core)).toBe(true);
    expect(isValidCommitMessage("🚧 this: should work", core)).toBe(true);
    expect(isValidCommitMessage("🚧: should fail", core)).toBe(false);
    expect(isValidCommitMessage("🚧 should fail", core)).toBe(false);
    // Forbidden words
    expect(isValidCommitMessage("fixup! one legit commit", core)).toBe(false);

    // Using custom properties
    const custom_core = Core(4, 'chore,fixup')
    expect(isValidCommitMessage("chore(nice-one): doing this right", custom_core)).toBe(false);
    expect(isValidCommitMessage("wip", custom_core)).toBe(false);
    expect(isValidCommitMessage("wip 1", custom_core)).toBe(false);
    expect(isValidCommitMessage("one more fix", custom_core)).toBe(false);
    expect(isValidCommitMessage("fix: foo did not work", custom_core)).toBe(true);
    expect(isValidCommitMessage("fixes something that did not work", custom_core)).toBe(true);
    expect(isValidCommitMessage("🚧 this should work", custom_core)).toBe(false);
    expect(isValidCommitMessage("🚧 this: should work", custom_core)).toBe(false);
    expect(isValidCommitMessage("🚧: should fail", custom_core)).toBe(false);
    expect(isValidCommitMessage("🚧 should fail", custom_core)).toBe(false);
    expect(isValidCommitMessage("fixup! one legit commit", custom_core)).toBe(false);
});
