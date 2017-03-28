const _getNextCategoryQuestion = (categoryQuestions, givenAnswers, answeredQuestions) => {
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

        if (givenAnswers.length === 0) {
          return question;
        }

        if (answeredQuestions.indexOf(question.question) === -1) {
          return question;
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

export default _getNextCategoryQuestion;
