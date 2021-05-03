import React, { PureComponent, } from 'react';
import {  View,Dimensions,Modal,StyleSheet } from 'react-native';
import { observer, Observer, inject } from "mobx-react";
import {Item, Picker,Icon, Button,Text, Input,Label} from 'native-base';
import { Formik } from 'formik';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
@inject("CalculatorStore")
@observer
export default class CalculatorAddModal extends PureComponent {
  close=async ()=>{
    const {CalculatorStore}=this.props;
    await CalculatorStore.addItemModalClose();
  }
  state={
    typeVisible:false,
    amount:0,
    amountUnitSymbol:""
  }
  _add=async(values)=>{
    const {CalculatorStore}=this.props;
    await CalculatorStore.SetItemList(values);
    await this.close();
  }
  render() {
    const {CalculatorStore}=this.props;
  
    return (
        <Modal visible={CalculatorStore.GetAddItemModalVisible}
        transparent
        style={{ justifyContent: "center", alignItems: "center" }}
        >
        <View style={{flex:1}}>
           <View style={styles.modal}>
           <View style={styles.modalInView} >
           <Formik
                initialValues={{ itemName: '' }}
                onSubmit={this._add}
              >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                  <View>
                <Item stackedLabel>
                            <Label>Item Adı</Label>
                            <Input 
                              onChangeText={handleChange('itemName')}
                              onBlur={handleBlur('itemName')}
                              value={values.itemName}
                            />
                          </Item>
                          <Item stackedLabel>
                            <Label>Item Fiyati</Label>
                            <Input 
                              onChangeText={handleChange('itemPrice')}
                              onBlur={handleBlur('itemPrice')}
                              value={values.itemPrice}
                            />
                          </Item>
                      <Item underline={false} style={{borderColor:'transparent'}} >
                        <View style={{flex:1,flexDirection:"row",marginTop:35,justifyContent:"space-around"}}>
                          <Button danger onPress={this.close} >
                              <Text>İptal</Text>
                          </Button>  
                          
                          <Button success onPress={handleSubmit}   >
                              <Text>Ekle</Text>
                          </Button>  
                          </View>
                      </Item>
                  </View>
                         
                      )}
                   </Formik>
                
                   </View>
                  </View>
        </View>
          
        </Modal>
     
    );
  }
}

const styles = StyleSheet.create({
 
  modal: {

      justifyContent: "center",
      alignItems: "center",
      alignContent: "center",
      flex: 1,
      backgroundColor: "#00000080"

  },
  modalInView: {
      backgroundColor: "#fff",
      position: "relative",
      width:width-50,
      padding:20
      
  },

});