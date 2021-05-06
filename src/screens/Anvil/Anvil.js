import React, {Component,PureComponent} from 'react';
import { observer, Observer, inject } from "mobx-react";
import {View, Text, Image, StyleSheet,Dimensions,SafeAreaView,FlatList} from 'react-native';
import { DraxProvider, DraxView } from 'react-native-drax';
import {
  Container,
  Title,
  Item,
  Footer,
  FooterTab,
  List,
  ListItem,
  Header,
  Body,
  Button,
  Content,
  Left,
  Icon,
  Right,
} from 'native-base';
import '../../Utilities/Extensions/StringExtensions';
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
@inject('AnvilStore')
@observer
class RenderItem extends PureComponent {
  render() {
    let {item, index} = this.props;
    return (
        <DraxProvider>
        <View style={styles.container}>
            <DraxView
                style={styles.draggable}
                onDragStart={() => {
                    console.log('start drag');
                }}
                payload="world"
            />
            <DraxView
                style={styles.receiver}
                onReceiveDragEnter={({ dragged: { payload } }) => {
                    console.log(`hello ${payload}`);
                }}
                onReceiveDragExit={({ dragged: { payload } }) => {
                    console.log(`goodbye ${payload}`);
                }}
                onReceiveDragDrop={({ dragged: { payload } }) => {
                    console.log(`received ${payload}`);
                }}
            />
        </View>
    </DraxProvider>
    );
  }
}
@inject('AnvilStore')
@observer
export default class Anvil extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _renderItem = ({ index, item }) => {
    ////console.log"item", item);
    return (<RenderItem
      item={item}
      index={index}
    />);
    }
  componentDidMount = () => {};
 
  render() {
    const {AnvilStore} = this.props;
    return (
      <Container style={{backgroundColor: '#333',padding:10}}>
        <View style={{flex: 3, flexDirection: 'row'}}>
          <View
            style={{
              flex: 4,
              backgroundColor: 'transparent',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: 80,
                width: 80,
                backgroundColor: '#111',
                borderColor: '#888',
                borderWidth: 2,
              }}
            />
          </View>
          <View style={{flex: 3, backgroundColor: 'purple'}}>
            <View style={styles.anvilItemMoveContainer} />
            <View style={styles.anvilItemMoveContainer} />
            <View style={styles.anvilItemMoveContainer} />
          </View>
          <View
            style={{
              flex: 3,
              backgroundColor: 'green',
              borderWidth: 1,
              borderColor: '#888',
            }}>
            <View style={styles.anvilItemMoveContainer} />
            <View style={styles.anvilItemMoveContainer} />
            <View style={styles.anvilItemMoveContainer} />
          </View>
          <View
            style={{
              flex: 3,
              backgroundColor: 'brown',
              borderWidth: 1,
              borderColor: '#888',
            }}>
            <View style={styles.anvilItemMoveContainer} />
            <View style={styles.anvilItemMoveContainer} />
            <View style={styles.anvilItemMoveContainer} />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',

              marginBottom: 10,
            }}>
            <Button full style={styles.eventBtn}>
              <Text style={styles.eventBtnTxt}>Confirm</Text>
            </Button>
            <Button full style={styles.eventBtn}>
              <Text style={styles.eventBtnTxt}>Cancel</Text>
            </Button>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <Button full style={styles.eventBtn}>
              <Text style={styles.eventBtnTxt}>Chat</Text>
            </Button>
            <Button full style={styles.eventBtn}>
              <Text style={styles.eventBtnTxt}>Preview</Text>
            </Button>
          </View>
        </View>
        <View
          style={{
            flex: 3,
            backgroundColor: '#222',
            borderTopColor: '#111',
            borderTopWidth: 2,
          }}>
         {AnvilStore.GetItemList.slice().length > 0 ? (
              <FlatList
                data={AnvilStore.GetItemList.slice()}
                renderItem={this._renderItem}
             
                keyExtractor={(item, index) => index.toString()}
                nestedScrollEnabled={true}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: '#c7c7c7'}}>ITEM LISTESİ BOŞ</Text>
              </View>
            )}
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  eventBtn: {
    flex: 1,
    borderColor: 'grey',
    backgroundColor: '#510b0c',
    borderWidth: 2,
    marginBottom: 20,
  },
  eventBtnTxt: {
    color: '#ffff00',
  },
  anvilItemMoveContainer: {
    flex: 3,
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#888',
  },
  draggable: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
},
receiver: {
    width: 100,
    height: 100,
    backgroundColor: 'green',
},
});
