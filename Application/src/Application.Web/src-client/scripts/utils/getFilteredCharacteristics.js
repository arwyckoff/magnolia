const _getFilteredCharacteristics = (filters, allCharacteristics) => {
    let filteredCharacteristics = [];
    for (var c = 0, cLen = allCharacteristics.length; c < cLen; c++) {
        let characteristic = allCharacteristics[c];
        if (characteristic.depends === "") {
            filteredCharacteristics.push(characteristic);
        } else {
            for (var f = 0, fLen = filters.length; f < fLen; f++) {
                let filter = filters[f];
                if (characteristic.depends === f) {
                    filteredCharacteristics.push(characteristic);
                    break;
                }
            }
        }
    }
    return filteredCharacteristics;
}

export default _getFilteredCharacteristics;