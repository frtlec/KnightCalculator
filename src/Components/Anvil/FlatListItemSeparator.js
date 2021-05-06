import React, { PureComponent } from 'react';
import {  View, Text,StyleSheet } from 'react-native';

export default class FlatListItemSeparator extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (<View style={styles.itemSeparator} />);
  }
}
const styles = StyleSheet.create({

    itemSeparator: {
        height: 15
      },
})