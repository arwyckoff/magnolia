import {STORE} from '../store.js';


export const _getBestBetweenPreferredAndOtherwise = (preferred, otherwise, trees, threshold) => {
    let best = _getMostCommonCharacteristic(preferred, trees);
      if (best.percentage > threshold) {
 STORE.setStore('best', best)
 return best;
}

return _getMostCommonCharacteristic(otherwise, trees);
}

export const _getMostCommonCharacteristic = (preferred, trees) => {
  let otherwise = otherwise
    let best = {
        characteristic: null,
        percentage: 0
    };

    for (let c = 0, cLen = preferred.length; c < cLen; c++) {
        let characteristic = preferred[c]
        let occurrences = 0;
        for (let t = 0, tLen = trees.length; t < tLen; t++) {
            let singleTree = trees[t];
            let charStates = characteristic.states
            for (let s = 0, sLen = characteristic.states.length; s < sLen; s++) {
                let stateA = characteristic.states[s];

                if (singleTree.characteristics.stateA !== 'undefined')
                   occurrences++}

        let percentage = occurrences / trees.length
        if (percentage > best.percentage) {
            Object.assign(
                best,
                { characteristic, percentage }
            );
        }}
}

        STORE.setStore('best', best)
        return best;
    }
