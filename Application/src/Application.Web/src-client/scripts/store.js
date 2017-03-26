export const STORE = {
  _data:{
    ready: false,
    treeListData: [],
    categorySelect: '',
    characteristicSelect: [],
    codeList: {},
    categories: {},
    filteredListData: [],
    filterChars: [],
    filteredTrees: [],
    genusTrees: [],
    genus: '',
    myTree: {},
    currentNavRoute: '',
    latinName: '',
    myWiki: '',
    id: '',
    iDKs: {LEAF:
            {totalIDK: 0,
              idkRun: 0
            },
          BARK:
            {totalIDK: 0,
              idkRun: 0
            },
        TWIG:
            {totalIDK: 0,
             idkRun: 0
           },
          FLOWER:
              {totalIDK: 0,
              idkRun: 0
            },
            FRUIT:
               {totalIDK: 0,
               idkRun: 0
             },
              GENERAL:
                {totalIDK: 0,
                idkRun: 0
              }
              },
    currentUser: {id: null,
                  email: null,
                  password: null},
    myImage: '',
    preferredChars: [],
    legalChars: [],
    MostCommonChars: [],
    splitByPreference: {
        preferred: [],
        otherwise: []
      },
    best: {
      characteristic: null,
      percentage: 0
          },
    legalChars:[],
    allCharArray: [],
    appRouteName: '',
    currentQuestion: 1,
  },
  getStoreData: function(){
		return this._data
	},

	setStore: function(storeProp, payload){
    if (typeof this._data[storeProp] === 'undefined' ) {
      throw new Error('cannot pass undefined property to .setStore() ')
      		}
	   this._data[storeProp] = payload
    if (typeof this.callBackFunc === 'function'){
		this.callBackFunc()
    }
	},

	onStoreChange: function(cbFunc){
    if(typeof cbFunc !== 'function'){
  throw new Error('argument passed to STORE.onStoreChange() must be a function')
}

if(typeof this.callBackFunc !== 'undefined'){
  throw new Error('STORE.onStoreChange() already has a function to handle changes')
}
		this.callBackFunc = cbFunc
	}


}
