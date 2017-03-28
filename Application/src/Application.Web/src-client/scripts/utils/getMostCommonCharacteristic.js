import {STORE} from '../store.js';


export const _getBestBetweenPreferredAndOtherwise = (preferred, otherwise, trees, threshold) => {
    let best = _getMostCommonCharacteristic(preferred, trees);
      if (best.percentage > threshold) {
 return best;
}

return _getMostCommonCharacteristic(otherwise, trees);
}

export const _getMostCommonCharacteristic = (preferred, trees) => {
  let otherwise = otherwise
    let prevQuestions = STORE.getStoreData().prevQuestions
    let currentBest = STORE.getStoreData().best
    let best =  {
          characteristic: null,
          percentage: 0,
          occurrences: 0,
              }
 for (let c = 0, cLen = preferred.length; c < cLen; c++) {
                let characteristic = preferred[c];
                              let occurrences = 0;
                if (prevQuestions.indexOf(characteristic.characteristic) === -1 || prevQuestions.length ===0){
               for (let t = 0, tLen = trees.length; t < tLen; t++) {
                        let tree = trees[t];
                        for (let s = 0, sLen = characteristic.states.length; s < sLen; s++) {
                          let state = characteristic.states[s].code;
                           if (tree.characteristics[state]!== undefined) {
                                   occurrences++;
                                   break;
                               }
                           }

                       let percentage = occurrences / trees.length
   if (percentage > best.percentage) {
     Object.assign(
  best,
   { characteristic, percentage, occurrences }
        );
         }
       }  }       }

                          return best;
                      }

                      export default _getBestBetweenPreferredAndOtherwise;
