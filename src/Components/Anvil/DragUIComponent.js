import React, {Component} from 'react';
import {View, Text,StyleSheet,Dimensions} from 'react-native';
import { DraxView } from 'react-native-drax';
export default class DragUIComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { item, index } = this.props;
    return (
      <DraxView
        style={[
          styles.centeredContent,
          styles.draggableBox,
          {backgroundColor: item.background_color},
        ]}
        draggingStyle={styles.dragging}
        dragReleasedStyle={styles.dragging}
        hoverDraggingStyle={styles.hoverDragging}
        dragPayload={index}
        longPressDelay={1}
        key={index}>
        <Text style={styles.textStyle}>{item.name}</Text>
      </DraxView>
    );
  }
}
const styles = StyleSheet.create({
  centeredContent: {
    borderRadius: 10,
  },
  draggableBox: {
    width: Dimensions.get('window').width / 4 - 12,
    height: Dimensions.get('window').width / 4 - 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  dragging: {
    opacity: 0.2,
  },
  hoverDragging: {
    borderColor: 'magenta',
    borderWidth: 2,
  },

  textStyle: {
    fontSize: 18,
  },
});
