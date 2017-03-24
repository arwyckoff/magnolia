import {STORE} from '../store.js';

export const _getFilteredTrees = (filters, allTrees) => {
    let filteredTrees = [];
    let filterLength = filters.length;
    for (let t = 0, tLen = allTrees.length; t < tLen; t++) {
        let tree = allTrees[t];
        let intersection = 0;
        for (let f = 0, fLen = filterLength; f < fLen; f++) {
            let filter = filters[f];
            if (tree.characteristics[filter] !== undefined) {
                intersection++;
            }
        }
        if (intersection === filterLength) {
            filteredTrees.push(tree);
        }
    }
STORE.setStore('filteredTrees', filteredTrees)
        return filteredTrees;
}
