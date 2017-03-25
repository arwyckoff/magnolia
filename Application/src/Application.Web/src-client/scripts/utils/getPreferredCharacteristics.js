

export const _getPreferredCharacteristics = (characteristics, originalCategory) => {
    let splitByPreference = {
        preferred: [],
        otherwise: []
    };

    for (let c = 0, cLen = characteristics.length; c < cLen; c++) {
        let characteristic = characteristics[c];
        // console.log(characteristic.category)
        // console.log(originalCategory)
        if (characteristic.category === originalCategory) {
            splitByPreference.preferred.push(characteristic);
        } else {
            splitByPreference.otherwise.push(characteristic);
        }
    }
    return splitByPreference;

}
