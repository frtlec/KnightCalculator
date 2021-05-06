import { observable, action, configure, runInAction, computed } from "mobx";
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";
import '../Utilities/Extensions/StringExtensions';
var uuid = require('react-native-uuid');
configure({
    enforceActions: "observed"
  });
class CalculatorStore{
    @observable itemList=[];
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
    
    @observable addItemModalVisible=false;
    @computed get GetAddItemModalVisible(){
        return this.addItemModalVisible;
    }
    @action async addItemModalOpen(){
        runInAction(()=>{
            this.addItemModalVisible=true;
        })
    }
    @action async addItemModalClose(){
        runInAction(()=>{
            this.addItemModalVisible=false;
        })
    }
    //---------
    @observable resultCalculated={total:0,totalComission:0};
    @action async CalculateTotal(){
        let total=0;
        let comission=0;
        for (let item of this.itemList) {
            console.log(item);
            total+=item.itemPrice-item.itemPrice*0.03;
            comission+=item.itemPrice*0.03;
        }
        runInAction(()=>{
            this.resultCalculated.total=total;
            this.resultCalculated.totalComission=comission;
        })
    }
    @computed get GetResult(){
        return this.resultCalculated;
    }
    //------------------
    @observable itemPriceInputVal="";
    @action async SetItemPriceInputVal(val=""){
        runInAction(()=>{
            this.itemPriceInputVal=val.toString().removeDot();
        })
    }
    @computed  get GetItemPriceInputValWithDot(){
        return this.itemPriceInputVal.toString().priceWithDot();
    }
    @computed  get GetItemPriceInputVal(){
        return this.itemPriceInputVal;
    }

    async _getFromStorage(key) {

        return await AsyncStorage.getItem(key);
    }
    async _setFromStorage(key,val) {
        await AsyncStorage.setItem(key, JSON.stringify(val));
    }
}


export default new CalculatorStore();