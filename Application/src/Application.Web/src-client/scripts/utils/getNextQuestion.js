import CATEGORIES from './categories.js';
import ORDER from './questionOrder.js';

const _getNextSubCatOrFinalizerQuestion = (filters, categoryQuestionRecord, questions) => {
  for (let category in CATEGORIES) {
    let record = categoryQuestionRecord[category];
    if (record.current && !record.finalized) {
      let subCategory = [];
      let finalizer = {};
      for (let q = 0, qLen = questions.length; q < qLen; q++) {
        let question = questions[q];
        if (question.category === category && question.order === ORDER.SUB_CATEGORY) {
          subCategory.push(question);
        } else if (question.category === category && question.order === ORDER.FINALIZER) {
          finalizer = question;
        }
      }
      
      for (let f = 0, fLen = filters.length; f < fLen; f++) {
        let filter = filters[f];
        if (finalizer.depends[filter] !== undefined) {
          return finalizer;
        }
      }

      let notSkipped = [];
      for (let c = 0, cLen = subCategory.length; c < cLen; c++) {
        let question = subCategory[c];
        for (let f = 0, fLen = filters.length; f < fLen; f++) {
          let filter = filters[f];
          if (question.skipIf[filter] !== undefined) {
            break;
          }
          if (f === filters.length) {
            notSkipped.push(categoryQuestion);
          }
        }
      }

      if (notSkipped.length === 0) {
        throw new Error("Something went horribly wrong");
      }

      let next = {};
      for (let s = 0, sLen = notSkipped.length; s < sLen; s++) {
        let question = notSkipped[s];
        for (let f = 0, fLen = filters.length; f < fLen; f++) {
          let filter = filters[f];
          if (question.depends[filter] !== undefined) {
            next = question;
          }
        }
      }

      if (next.length === {}) {
        return notSkipped[0];
      } else {
        return next;
      }
    } 
  }
}

export default _getNextSubCatOrFinalizerQuestion;