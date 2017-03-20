const _getFilteredTrees = (filters, allTrees) => {
    let filteredTrees = [];
    let filterLength = filters.length;
    for (let t = 0, tLen = allTrees.legth; t < tLen; t++) {
        let tree = allTrees[t];
        let intersection = 0;
        for (let f = 0, fLen = filterLength; f < fLen; f++) {
            let filter = filters[f];
            if (tree.characteristicHash[filter] !== undefined) {
                intersection++;
            }
        }
        if (intersection == filterLength) {
            filteredTrees.push(tree);
        }
    }
    return filteredTrees;
}

export default _getFilteredTrees;