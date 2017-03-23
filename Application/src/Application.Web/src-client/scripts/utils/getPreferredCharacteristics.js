const _getPreferredCharacteristics = (characteristics, originalCategory) => {
    let splitByPreference = {
        preferred: [],
        otherwise: []
    };

    for (let c = 0, cLen = characteristics.length; c < cLen; c++) {
        let characteristic = characteristics[c];
        if (characteristics.category === originalCategory) {
            split.preferred.push(characteristic);
        } else {
            split.otherwise.push(characteristic);
        }
    }

    return splitByPreference;
}

export default _getPreferredCharacteristics;