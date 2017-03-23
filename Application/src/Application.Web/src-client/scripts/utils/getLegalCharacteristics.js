const _getLegalCharacteristics = (filters, IDKs, allCharacteristics, IDKthreshold) => {
    let legal = [];
    for (let c = 0, cLen = allCharacteristics.length; c < cLen; c++) {
        let characteristic = allCharacteristics[c];
        let categoryIDK = IDKs[characteristic.category];
        if (categoryIDK.totalIDK > IDKthreshold)
            continue;
        
        for (let s = 0, sLen = characteristic.states.length; s < sLen; s++) {
            let state = characteristic.states[s];
            if (filters.indexOf(state) === -1) {
                legal.push(characteristic);
                break;
            }
        }
    }

    return legal;
}

export default _getLegalCharacteristics;