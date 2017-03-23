import CATEGORIES from './categories';

const _getLegalCharacteristics = (filters, IDKs, characteristicsByCategory, IDKthreshold) => {
    let legal = [];

    for (let category in CATEGORIES) {
        let categoryIDK = IDKs[category];
        if (categoryIDK.totalIDK > IDKthreshold)
            continue;
        
        let characteristics = characteristicsByCategory[category];
        for (let c = 0, cLen = characteristics.length; c < cLen; c++) {
            let characteristic = characteristics[c];
            for (let s = 0, sLen = characteristic.states.length; s < sLen; s++) {
                let code = characteristic.states[s].code;
                if (filters.indexOf(state) === -1) {
                    legal.push(characteristic);
                    break;
                }
            }
        }
    }

    return legal;
}

export default _getLegalCharacteristics;
