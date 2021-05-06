import { observable, action, configure, runInAction, computed } from "mobx";
import AsyncStorage from '@react-native-community/async-storage';
import '../Utilities/Extensions/StringExtensions';
var uuid = require('react-native-uuid');
configure({
    enforceActions: "observed"
  });
class AnvilStore{
    @observable itemList=[{itemName:"shard",itemImageSource:'/shard/1.png'},{itemName:"shard",itemImageSource:'/shard/1.png'},
    {itemName:"shard",itemImageSource:'/upgrade/bus.png'}];
    @action async SetItemList(values){
        runInAction(()=>{
            values.ID=uuid.v1();
            this.itemList.push(values);
        });
        console.log(this.itemList);
        await this._setFromStorage("itemList",this.itemList);
    }
    @computed get GetItemList(){
        return this.itemList;
    }
      //load 
     @action async loadItemList(){
        const list = await this._getFromStorage("itemList");
        runInAction(()=>{
            this.itemList=list!=""&& list!=null?JSON.parse(list):[];;
        }) 
    }
    @action async RemoveItemList(id){
        runInAction(()=>{
            this.itemList=this.itemList.filter((item)=>item.ID!=id);
        })
        await this._setFromStorage("itemList",this.itemList);
    }
    @action async AllRemove(){
        runInAction(()=>{
            this.itemList=[];
        })
        await this._setFromStorage("itemList",this.itemList);
    }
    //-----------
    async _getFromStorage(key) {

        return await AsyncStorage.getItem(key);
    }
    async _setFromStorage(key,val) {
        await AsyncStorage.setItem(key, JSON.stringify(val));
    }
  
}


export default new AnvilStore();