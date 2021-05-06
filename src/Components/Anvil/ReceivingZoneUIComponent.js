import React, { Component, PureComponent } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { DraxView} from 'react-native-drax';
import { observer, Observer, inject } from "mobx-react";
@inject("AnvilFStore")
@observer
 class ReceivingZoneUIComponent extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
      };
    }
 
  
    render() {
        const { item, index,AnvilFStore } = this.props;
      return (
        <DraxView
        style={[styles.centeredContent, styles.receivingZone, { backgroundColor: item.background_color }]}
        receivingStyle={styles.receiving}
        renderContent={({ viewState }) => {
          const receivingDrag = viewState && viewState.receivingDrag;
          const payload = receivingDrag && receivingDrag.payload;
          return (
            <View>
              <Text style={styles.textStyle}>{item.name}</Text>
            </View>
          );
        }}
        key={index}
        onReceiveDragDrop={(event) => {
          console.log("event.dragged.payload",event.dragged.payload);
          let selected_item = AnvilFStore.GetDragItemListMiddle[event.dragged.payload];
          console.log('onReceiveDragDrop::index', selected_item, index);
          console.log('onReceiveDragDrop :: payload', event.dragged.payload);
          let newReceivingItemList = [...AnvilFStore.GetReceivedItemList];
          console.log('onReceiveDragDrop :: newReceivingItemList', newReceivingItemList);
          newReceivingItemList[index] = selected_item;
          AnvilFStore.SetReceivedItemList(newReceivingItemList);
          let newDragItemMiddleList = [...AnvilFStore.GetDragItemListMiddle];
          console.log('onReceiveDragDrop :: newDragItemMiddleList 1', newDragItemMiddleList);
          newDragItemMiddleList[event.dragged.payload] = AnvilFStore.GetReceivedItemList[index];
          console.log('onReceiveDragDrop :: newDragItemMiddleList 2', newDragItemMiddleList);
          AnvilFStore.SetDragItemListMiddle(newDragItemMiddleList);
        }}
      />
      );
    }
  }
  export default ReceivingZoneUIComponent;

  const styles = StyleSheet.create({
    receiving: {
        borderColor: 'red',
        borderWidth: 2,
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
      textStyle: {
        fontSize: 18
      },
      centeredContent: {
        borderRadius: 10,
      },
  });