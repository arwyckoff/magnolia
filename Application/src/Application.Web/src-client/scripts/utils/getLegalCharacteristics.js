import {CATEGORIES} from './categories';
import {STORE} from '../store.js';

export const _getLegalCharacteristics = (filters, IDKs, characteristicsByCategory, IDKthreshold) => {
    let legal = [];
    for (let category in CATEGORIES) {
        // let categoryIDK = IDKs[category];
        // if (categoryIDK.totalIDK > IDKthreshold)
        //     continue;
        //
        // add categories as prop in char
        for (var category in characteristicsByCategory){
              let characteristics = characteristicsByCategory[category];
              for (let c = 0, cLen = characteristics.length; c < cLen; c++) {
                let characteristic = characteristics[c];
                characteristic.category=category
            for (let s = 0, sLen = characteristic.states.length; s < sLen; s++) {
                let code = characteristic.states[s].code;
                let char = characteristic.code
                if (filters.indexOf(code) === -1 || filters ==='undefined') {
                    legal.push(characteristic);
                    break;
                  }
            }
          }
}}

    STORE.setStore('legalChars', legal)
    return legal;

}
