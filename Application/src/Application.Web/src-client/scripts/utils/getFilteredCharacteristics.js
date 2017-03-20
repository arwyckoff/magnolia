const _getFilteredCharacteristics = (filters, allCharacteristics) => {
    let filteredCharacteristics = [];
    for (var c = 0, cLen = allCharacteristics.length; c < cLen; c++) {
        let characteristic = allCharacteristics[c];
        if (characteristic.depends === "") {
            filteredCharacteristics.push(characteristic);
        } else if (characteristic.depends.length === 1) {
            for (var f = 0, fLen = filters.length; f < fLen; f++) {
                let filterPrefix = filters[f][0];
                if (characteristic.depends === filterPrefix) {
                    filteredCharacteristics.push(characteristic);
                    break;
                }
            }
        } else if (characteristic.depends === characteristic.depends.toUpperCase()) {
            for (var f = 0, fLen = filters.length; f < fLen; f++) {
                let filterPrefix = filters[f].slice(0, 2);
                if (characteristic.depends === filterPrefix) {
                    filteredCharacteristics.push(characteristic);
                    break;
                }
            }
        } else {
            for (var f = 0, fLen = filters.length; f < fLen; f++) {
                let filter = filters[f];
                if (characteristic.depends === filter) {
                    filteredCharacteristics.push(characteristic);
                    break;
                }
            }
        }
    }
    return filteredCharacteristics;
}

export default _getFilteredCharacteristics;