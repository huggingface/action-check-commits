const isValidCommitMessage = (message: string, core): boolean => {
    // Split the message into words
    // @ts-expect-error
    const segmenter = new Intl.Segmenter([], { granularity: 'word' });
    const segmentedText = segmenter.segment(message);
    const words = [...segmentedText].filter(s => s.isWordLike).map(s => s.segment);

    const minWords = parseInt(core.getInput("min-words"));

    if (words.length < minWords) {
        return false
    }

    const forbiddenWords = core.getInput("forbidden-words").split(",");
    const includesAny = (arr, values) => values.some(v => arr.includes(v));

    return !includesAny(words, forbiddenWords);
};

export default isValidCommitMessage;
