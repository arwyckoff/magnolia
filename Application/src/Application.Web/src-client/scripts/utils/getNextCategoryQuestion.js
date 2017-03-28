const _getNextCategoryQuestion = (categoryQuestions, givenAnswers) => {
    for (let q = 0, qLen = categoryQuestions.length; q < qLen; q++) {
        let question = categoryQuestions[q];

        if (question.depends !== "") {
            if (givenAnswers.indexOf(question.depends) === -1)
                continue;
        }

        if (question.skipIf !== "") {
            if (givenAnswers.indexOf(question.skipIf) !== -1)
                continue;
        }

        for (let a = 0, aLen = givenAnswers.length; a < aLen; a++) {
            let answerCode = givenAnswers[a];
            for (let qa = 0, qaLen = question.answers.length; qa < qaLen; qa++) {
                let questionAnswer = question.answers[a];
                if (answerCode === questionAnswer.code) {
                    break;
                }
                if (qa === qaLen - 1) {
                    return question;
                }
            }
        }
    }

    return {
        question: null,
        category: null,
        depends: null,
        skipIf: null,
        answers: []
    };
}