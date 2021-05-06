import React, { PureComponent, } from 'react';
import {  View,Dimensions,Modal,StyleSheet } from 'react-native';
import { observer, Observer, inject } from "mobx-react";
import {Item, Picker,Icon, Button,Text, Input,Label} from 'native-base';
import { Formik } from 'formik';
import calculatorAddValidations from '../../Validations/CalculatorAddValidations';
import '../../Utilities/Extensions/StringExtensions';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
@inject("CalculatorStore")
@observer
export default class CalculatorAddModal extends PureComponent {
  close=async ()=>{
    const {CalculatorStore}=this.props;
    await CalculatorStore.addItemModalClose();
    await CalculatorStore.SetItemPriceInputVal();
  }
  state={
    typeVisible:false,
  }
 
  _add=async(values)=>{
    const {CalculatorStore}=this.props;
    await CalculatorStore.SetItemList(values);
    await this.close();
    await CalculatorStore.SetItemPriceInputVal();
  }
  _setPriceInputValue=async (value)=>{
    const {CalculatorStore}=this.props;
    await CalculatorStore.SetItemPriceInputVal(value);
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
                initialValues={{ itemName: '',itemPrice:'' }}
                validationSchema={calculatorAddValidations}
                onSubmit={this._add}
                
              >
                {({ handleChange,isSubmitting, touched,handleBlur, handleSubmit,setFieldValue, values,errors}) => (
                  <View>
                <Item stackedLabel error={errors.itemName && touched.itemName}>
                            <Input 
                              onChangeText={handleChange('itemName')}
                              onBlur={handleBlur('itemName')}
                              value={values.itemName}
                              placeholder={"Item Adı"}
                              keyboardType={"default"}
                              returnKeyType="next"
                              onSubmitEditing={(event) => { this.priceInput._root.focus(); }}
                            />
                          </Item>
                          {
                              (errors.itemName && touched.itemName )&&
                              (
                                <Label style={styles.errorMessage}>
                                  {errors.itemName}
                                </Label>
                              )
                            }
                          <Item stackedLabel error={errors.itemPrice && touched.itemPrice}>
                            <Input 
                            ref={(input) => { this.priceInput = input; }}
                              onChangeText={(val)=>{
                                this._setPriceInputValue(val);
                                setFieldValue("itemPrice", CalculatorStore.GetItemPriceInputVal)
                              }}
                              onBlur={handleBlur('itemPrice')}
                              value={CalculatorStore.GetItemPriceInputValWithDot}
                              placeholder={"Item Fiyati"}
                              keyboardType={"number-pad"}
                              returnKeyType="send"
                            />
                         
                          
                          </Item>
                          {
                              (errors.itemPrice && touched.itemPrice )&&
                              (
                                <Label style={styles.errorMessage}>
                                  {errors.itemPrice}
                                </Label>
                              )
                            }
                      <Item underline={false} style={{borderColor:'transparent'}} >
                        <View style={{flex:1,flexDirection:"row",marginTop:35,justifyContent:"space-around"}}>
                          <Button danger onPress={this.close} >
                              <Text>İptal</Text>
                          </Button>  
                          
                          <Button primary onPress={handleSubmit}   >
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
  errorMessage:{fontSize:14,color:"#f25252"}

});