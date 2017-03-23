import {STORE} from '../store.js';

export const _getPreferredCharacteristics = (characteristics, originalCategory) => {
    let splitByPreference = {
        preferred: [],
        otherwise: []
    };

    for (let c = 0, cLen = characteristics.length; c < cLen; c++) {
        let characteristic = characteristics[c];
        console.log(characteristic)
        if (characteristics.category === originalCategory) {
            splitByPreference.preferred.push(characteristic);
        } else {
            splitByPreference.otherwise.push(characteristic);
        }
    }
    STORE.setStore('splitByPreference', splitByPreference)
    return splitByPreference;

}
