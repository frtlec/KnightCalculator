import { observable, action, configure, runInAction, computed } from "mobx";
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";

class CalculatorStore{
    @observable itemList=[];
    @action async SetItemList(values){
        runInAction(()=>{
            this.itemList.push(values);
        });
    }
    @computed get GetItemList(){
        return this.itemList;
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
            total=+item.itemPrice-item.itemPrice*0.03;
            comission=+item.itemPrice*0.03;
        }
        runInAction(()=>{
            this.resultCalculated.total=total;
            this.resultCalculated.totalComission=comission;
        })
    }
    @computed get GetResult(){
        return this.resultCalculated;
    }
}


export default new CalculatorStore();