import {observable, action, configure, runInAction, computed} from 'mobx';
import AsyncStorage from '@react-native-community/async-storage';
import '../Utilities/Extensions/StringExtensions';
var uuid = require('react-native-uuid');
configure({
  enforceActions: 'observed',
});
class AnvilFStore {
  @observable receivingItemList = [];
  @observable dragItemMiddleList = [];

  @action async SetReceivedItemList(values) {
    console.log("sadsadsaccc",values);
    runInAction(() => {
      this.receivingItemList=values;
    });
  }
  @computed get GetReceivedItemList() {
    return this.receivingItemList;
  }
  @action async SetDragItemListMiddle(values) {
    runInAction(() => {
        this.dragItemMiddleList=values;
    });
  }
  @computed get GetDragItemListMiddle() {
    return this.dragItemMiddleList;
  }
  @action async ClearRemoveItems(){
    runInAction(() => {
        receivingItemList=[];
        dragItemMiddleList=[];
      });
  }
}

export default new AnvilFStore();
