const _getBestBetweenPreferredAndOtherwise = (preferred, otherwise, trees, threshold) => {
    let best = _getMostCommonCharacteristic(preferred, trees);
    if (bestPreferred.percentage > threshold) {
        return best;
    }

    return _getMostCommonCharacteristic(otherwise, trees);
}

const _getMostCommonCharacteristic = (characteristics, trees) => {
    let best = {
        characteristic: null,
        percentage: 0
    };

    for (let c = 0, cLen = preferred.length; c < cLen; c++) {
        let characteristic = preferred[c];
        let occurrences = 0;

        for (let t = 0, tLen = trees.length; t < tLen; t++) {
            let tree = trees[t];
            for (let s = 0, sLen = characteristic.states.length; s < sLen; s++) {
                let state = characteristic.states[s];
                if (tree.characteristics[state] !== undefined) {
                    occurrences++;
                    break;
                }
            }
        }

        let percentage = occurrences / trees.length;
        if (percentage > best.percentage) {
            Object.assign(
                best,
                { characteristic, percentage }
            );
        }
    }

    return best;
}

export default _getBestBetweenPreferredAndOtherwise;