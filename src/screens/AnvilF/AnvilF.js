import React, { Component, } from 'react';
import { View, Text,StyleSheet,Dimensions } from 'react-native';
import { observer, Observer, inject } from "mobx-react";
import ReceivingZoneUIComponent from "../../Components/Anvil/ReceivingZoneUIComponent";
import DragUIComponent from "../../Components/Anvil/DragUIComponent";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DraxProvider, DraxView, DraxList } from 'react-native-drax';
import {draggableItemList,FirstReceivingItemList} from './data';

const height=Dimensions.get("screen").height;
const width=Dimensions.get("screen").width;
const gestureRootViewStyle = { flex: 1 };
const FlatListItemSeparator = () => {
  return (<View style={styles.itemSeparator} />);
}
@inject("AnvilFStore")
@observer
export default class AnvilF extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    const {AnvilFStore}=this.props;
    AnvilFStore.ClearRemoveItems();
  AnvilFStore.SetReceivedItemList(FirstReceivingItemList);
   AnvilFStore.SetDragItemListMiddle(draggableItemList);
  }
  componentDidMount=async()=>{

  }
  render() {
    const { AnvilFStore } = this.props;

    return (
      <Observer>{()=>(
      <GestureHandlerRootView
            style={gestureRootViewStyle}>
            <View>
              <Text style={styles.headerStyle}>{'Drag drop and swap between lists'}</Text>
            </View>
            <DraxProvider>
              <View style={styles.container}>
                <View style={styles.receivingContainer}>
                  {AnvilFStore.GetReceivedItemList.map((item, index) => <ReceivingZoneUIComponent key={index} index={index} item={item}/>)}
                </View>
                <View style={styles.draxListContainer}>
                  <DraxList
                    data={AnvilFStore.GetDragItemListMiddle}
                    renderItemContent={({item,index})=><DragUIComponent key={index}  index={index} item={item}/>}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={4}
                    ItemSeparatorComponent={FlatListItemSeparator}
                    scrollEnabled={true}
                  />
                </View>
              </View>
            </DraxProvider>
        </GestureHandlerRootView>
      )}</Observer>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    paddingTop: 40,
    justifyContent: 'space-evenly',
  },
  centeredContent: {
    borderRadius: 10,
  },
  receivingZone: {
    height: (Dimensions.get('window').width / 4) - 12,
    borderRadius: 10,
    width: (Dimensions.get('window').width / 4) - 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5
  },
  receiving: {
    borderColor: 'red',
    borderWidth: 2,
  },
  draggableBox: {
    width: (Dimensions.get('window').width / 4) - 12,
    height: (Dimensions.get('window').width / 4) - 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5
  },
  dragging: {
    opacity: 0.2,
  },
  hoverDragging: {
    borderColor: 'magenta',
    borderWidth: 2,
  },
  receivingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  itemSeparator: {
    height: 15
  },
  draxListContainer: {
    padding: 5,
    height: 200
  },
  receivingZoneContainer: {
    padding: 5,
    height: 100
  },
  textStyle: {
    fontSize: 18
  },
  headerStyle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20
  }
});