import CATEGORIES from './categories.js';
import ORDER from './questionOrder.js';

const _getCategoryOrderQuestion = (categoryQuestionRecord, questions) => {
  for (let category in CATEGORIES) {
    if (categoryQuestionRecord[category].current === true) {
      let categoryQuestions = questions[category];
      for (let q = 0, qLen = categoryQuestions.length; q < qLen; q++) {
        let question = categoryQuestions[q];
        if (question.order === ORDER.CATEGORY) {
          return question;
        }
      }
    }
  }

  return false;
}

export default _getCategoryOrderQuestion;