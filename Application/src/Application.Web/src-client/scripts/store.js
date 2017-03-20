export const STORE = {
  _data:{
    treeListData: [],
    filterChars: ["Aa"],
    myTree: {},
    currentNavRoute: '',
    latinName: '',
    myWiki: '',
    id: '',
    currentUser: {},
    myImage: ''
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
