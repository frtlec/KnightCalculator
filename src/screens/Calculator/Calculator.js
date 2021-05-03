import React, { Component,PureComponent } from 'react';
import {Animated, View,Text,StyleSheet,FlatList,TouchableOpacity,SafeAreaView,Easing} from 'react-native';
import { observer, Observer, inject } from "mobx-react";
import {Container,Title,Item,Footer,FooterTab,List,ListItem,Header,Body,Button, Content,Left, Icon} from 'native-base';
import CalculatorAddModal from '../../Components/Modals/CalculatorAddModal';

@inject("CalculatorStore")
@observer
class RenderItem extends PureComponent {
  _removeItem=async(id)=>{
    const {CalculatorStore}=this.props;
    await CalculatorStore.RemoveCachAndOtherList(id);
  }
  _priceWithCommas(price){
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  render(){
    let { item,index } = this.props;
    let sort=index+1;

    let {itemName,itemPrice}=item;
    let itemPriceStr=this._priceWithCommas(itemPrice);
   
    return (
      

      <Observer>{()=>(
         
     <ListItem style={{marginBottom:0,padding:0,margin:0,justifyContent:"space-between"}}>
     <View style={{flex:1,flexDirection:"row"}}>
       <View style={{backgroundColor:"",borderRightWidth:1,borderRightColor:"#f7f7f7",justifyContent:"center",alignItems:"center",marginRight:10}}>
           <Text style={{fontWeight:"bold",color:"#c3c3c3",width:17,textAlign:"center"}}>{sort}</Text>
         </View>
         <View>
         <Text style={{color:"black"}}>{`${itemName}`}</Text>
         <Text style={{color:"black"}}>{`${itemPriceStr}`}</Text>
         </View>
     </View>
     <View>
       <TouchableOpacity onPress={()=>this._removeItem(ID)}>
         <Icon type="EvilIcons" name="close" style={{color:"#a9a9a9"}} />
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
    this.state = {
      animation: new Animated.Value(0)
    };
  }
  _priceWithCommas(price){
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  openAddModal=async ()=>{
    const {CalculatorStore}=this.props;
    await CalculatorStore.addItemModalOpen();
  }

  calculate=async()=>{
    Animated.timing(this.state.animation, {
      toValue: 1,
      easing: Easing.linear
    }).start()
    const {CalculatorStore}=this.props;
    await CalculatorStore.CalculateTotal();
  }
  componentDidMount=async ()=>{
    const {CalculatorStore}=this.props;
    //await CalculatorStore.loadCalculatorList();

  }
 
  _renderItem = ({ index,item }) => {
    ////console.log"item", item);
    return (<RenderItem
        item={item}
        index={index}
    />);
  }
  render() {
    const {CalculatorStore}=this.props;
 
    return (
      <Container style={{flex:1,backgroundColor:"#fff"}}>
            <CalculatorAddModal/>
        <Header androidStatusBarColor="#00363a" style={{backgroundColor:"#006064",justifyContent:"center",alignItems:"center"}}>
          <Body style={{justifyContent:"center",alignItems:"center",flex:1}}>
            <Title style={{color:"#fff"}}>Toplu Item Hesaplama </Title>
          </Body>
        </Header>
        <Item style={{justifyContent:"center",borderBottomWidth:0}}>
           <TouchableOpacity onPress={this.openAddModal} style={{marginVertical:10,flex:0.8,borderRadius:3,padding:10,borderWidth:1,
            borderColor:"#f7f7f7",backgroundColor:'#bfbfbf',justifyContent:'center',alignItems:"center",alignContent:"space-around",flexDirection:"row"}}>
                <Text>Listeye ekle</Text>
                <Icon name="plus-square-o" type="FontAwesome" style={{marginLeft:15, color: "#006064" }} />
          </TouchableOpacity>
       </Item>
     
   
   <SafeAreaView style={{flex: 1,padding:0,margin:0}}>
              <FlatList
                  data={CalculatorStore.GetItemList.slice()}
                  renderItem={this._renderItem}
                  style={{ padding: 0,margin:0,flex:1 }}
                  keyExtractor={(item, index) => index.toString()}
                  nestedScrollEnabled={true}
              />

            </SafeAreaView>
          
        <Footer style={{marginTop:10,marginBottom:10,paddingHorizontal:30,backgroundColor:"transparent",justifyContent:"space-between",alignContent:"space-between"}}>
          <FooterTab style={{justifyContent:"space-between",alignContent:"space-between",backgroundColor:"transparent"}}>
               <View style={{flex:1,paddingVertical:10,paddingHorizontal:20,backgroundColor:"#fff"}}>
                  <Button full style={{alignContent:"flex-end",borderBottomColor:"#d7d7d7",borderBottomWidth:1,alignItems:"flex-end",paddingRight:10}}>
                    {
                      CalculatorStore.GetResult.total>0 &&(
                      <View style={{marginBottom:3}}>
                         <Text>Sonuc</Text>
                          <Text style={{"textAlign":"right"}}>{`${this._priceWithCommas(CalculatorStore.GetResult.total)}`}</Text>
                          <Text style={{"textAlign":"right"}}>{`${this._priceWithCommas(CalculatorStore.GetResult.totalComission)}`}</Text>
                      </View>
                      )
                    }
                      
                  </Button>
               </View>
              <Button style={{backgroundColor:"#00363a",flex:0.3,borderRadius:10}} onPress={this.calculate}>
               <Icon type="Ionicons" name="calculator-outline" style={{color:"white"}} />
               <Text style={{color:"#fff"}}>Hesapla</Text>
              </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

