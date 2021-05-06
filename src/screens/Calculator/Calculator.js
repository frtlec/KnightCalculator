import React, { Component, PureComponent } from 'react';
import { Animated, View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Easing, Dimensions,useStyles } from 'react-native';
import { observer, Observer, inject } from "mobx-react";
import { Container, Title, Item, Footer, FooterTab, List, ListItem, Header, Body, Button, Content, Left, Icon, Right } from 'native-base';
import CalculatorAddModal from '../../Components/Modals/CalculatorAddModal';
import Draggable from 'react-native-draggable';
import BottomSheet from 'react-native-simple-bottom-sheet';
import '../../Utilities/Extensions/StringExtensions';
const height=Dimensions.get("screen").height;
const width=Dimensions.get("screen").width;

@inject("CalculatorStore")
@observer
class RenderItem extends PureComponent {
  _removeItem = async (id) => {
    const { CalculatorStore } = this.props;
    await CalculatorStore.RemoveItemList(id);
  }
 
  render() {
    let { item, index } = this.props;
    let sort = index + 1;

    let { itemName, itemPrice, ID } = item;
    let itemPriceStr = itemPrice.toString().priceWithDot();

    return (


      <Observer>{() => (

        <ListItem style={{ marginBottom: 0, padding: 0, margin: 0, justifyContent: "space-between" }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ backgroundColor: "", borderRightWidth: 1, borderRightColor: "#f7f7f7", justifyContent: "center", alignItems: "center", marginRight: 10 }}>
              <Text style={{ fontWeight: "bold", color: "#c3c3c3", width: 17, textAlign: "center" }}>{sort}</Text>
            </View>
            <View>
              <Text style={{ color: "#555" }}>{`${itemName}`}</Text>
              <Text style={{ color: "#333" }}>{`${itemPriceStr}`}</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity onPress={() => this._removeItem(ID)}>
              <Icon type="EvilIcons" name="close" style={{ color: "#a9a9a9" }} />
            </TouchableOpacity>
          </View>
        </ListItem>
      )}</Observer>

    );
  }


}

@inject("CalculatorStore")
@observer
export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.panelRef = React.createRef();
    this.state = {
      animation: new Animated.Value(0),
    };
  }
  
  openAddModal = async () => {
    const { CalculatorStore } = this.props;
    await CalculatorStore.addItemModalOpen();
  }

  calculate = async () => {
    this.panelRef.current.togglePanel()
    const { CalculatorStore } = this.props;
    await CalculatorStore.CalculateTotal();
  }
  componentDidMount = async () => {
    const { CalculatorStore } = this.props;
    await CalculatorStore.loadItemList();
    

  }

  _renderItem = ({ index, item }) => {
    ////console.log"item", item);
    return (<RenderItem
      item={item}
      index={index}
    />);
  }
  _allRemove=async()=>{
    const { CalculatorStore } = this.props;
    await CalculatorStore.AllRemove();
  }
  render() {
    const { CalculatorStore } = this.props;
    return (
      <Container style={{ flex: 1, backgroundColor: "#fff" }}>
        <CalculatorAddModal />
        <Header androidStatusBarColor="#00363a" style={{ backgroundColor: "#006064", justifyContent: "space-around", alignItems: "center" }}>
          <Body style={{ justifyContent: "flex-start", alignItems: "flex-start", flex:3 }}>
            <Title style={{ color: "#fff" }}>Toplu Item Hesaplama </Title>
          </Body>
          <Right style={{flex:1}}>
            <TouchableOpacity transparent onPress={this._allRemove}>
              <Icon name="delete-sweep" type="MaterialIcons" style={{ marginLeft: 15, color: "white" }} />
            </TouchableOpacity>
          </Right>
        </Header>
        <Item style={{ justifyContent: "center",marginVertical:15 }}>
          <TouchableOpacity onPress={this.openAddModal} style={[{
              padding:15,
              flexDirection: 'row',
              alignItems:"center",
              justifyContent:"center",
              textAlign:"center"

          },style.boxWithShadow]}>
            <Icon name="plus-a" type="Fontisto" size={50} style={{color:"#cc0c0c",fontSize:40,alignSelf:'center',textAlign:"center"}} color={'white'}/>
          </TouchableOpacity>
        </Item>


    <SafeAreaView style={{ flex: 1, padding: 0, margin: 0 }}>
    { CalculatorStore.GetItemList.slice().length>0?
  (
  
    <FlatList
      data={CalculatorStore.GetItemList.slice()}
      renderItem={this._renderItem}
      style={{ padding: 0, margin: 0, flex: 1 }}
      keyExtractor={(item, index) => index.toString()}
      nestedScrollEnabled={true}
    />
  ):
  <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <Text style={{color:"#c7c7c7"}}>ITEM LISTESİ BOŞ</Text>
  </View>
  }
  </SafeAreaView>

     <Draggable x={width-70} y={height-300}>
            <Button style={{ backgroundColor: "#cc0c0c", borderRadius: 4,padding:0,height:55,width:55,justifyContent:"center",alignItems:"center" }} 
              onPress={this.calculate}>
              <Icon type="Ionicons" name="calculator-outline" style={{ color: "white" }} />
            </Button>
     </Draggable>
     <BottomSheet  ref={this.panelRef} isOpen={false} >
           <View style={{ flex: 1,justifyContent:"center", paddingVertical: 2, paddingHorizontal: 10,   }}>
                <View  style={{flex:1,paddingHorizontal:5, alignContent: "flex-end",flexDirection:"column", alignItems: "flex-end", paddingRight: 10 }}>
               
                  <View style={{flexDirection:'row',alignItems:"center",marginBottom:5,paddingBottom:5,borderBottomColor:"#f4f4f4",borderBottomWidth:1,minHeight:20,justifyContent:"space-between",width:"100%", flexWrap:'wrap'}}>
                    <Text style={style.resultTitleText}>KOMİSYON</Text>
                    {
                      CalculatorStore.GetResult.totalComission > 0 && (
                        <Text style={{flex:2, textAlign: "right",fontWeight:"bold",fontSize:17,color:"#333" }}>{`${CalculatorStore.GetResult.totalComission.toString().priceWithDot()}`}</Text>
                      )
                    }
                  </View>
                  <View style={{flex:1,flexDirection:'row',alignItems:"center",marginBottom:5,borderBottomColor:"#f4f4f4",borderBottomWidth:1,paddingBottom:5,minHeight:20,justifyContent:"space-between",width:"100%"}}>
                    <Text style={style.resultTitleText}>SONUÇ</Text>
                      {
                        CalculatorStore.GetResult.total>0&&(
                          <Text style={{flex:2, textAlign: "right",fontWeight:"bold",fontSize:17,color:"#333" }}>{`${CalculatorStore.GetResult.total.toString().priceWithDot()}`}</Text>
                        )
                      }
                  </View>
                </View>
              </View>
      </BottomSheet>
     
      </Container>
    );
  }
}


const style=StyleSheet.create({

  footer:{
        backgroundColor:"transparent", 
        marginBottom: 10,
        paddingHorizontal: 20,
        position:"absolute",
        bottom:2,
        height:150,
        zIndex:1
   },
boxWithShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,  
},
resultTitleText:{color:"black",fontSize:9,flex:1,fontWeight:"bold"}
});