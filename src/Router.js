  
import React from 'react';
import 'react-native-gesture-handler';
import {
	createBottomTabNavigator,
	createAppContainer,
	createSwitchNavigator,
	createStackNavigator,
	createMaterialTopTabNavigator,
	createDrawerNavigator
} from 'react-navigation';
import { Icon } from 'native-base';
import Calculator from './screens/Calculator/Calculator';
import Anvil from './screens/Anvil/Anvil';
import AnvilF from './screens/AnvilF/AnvilF';
const Calculations = createDrawerNavigator({
	AnvilF:{
		screen:AnvilF,
		navigationOptions: {
			title: 'Hesaplama',
			header: null,
		}
	},
	Anvil: {
		screen: Anvil,
		navigationOptions: {
			title: 'Anvil',
			header: null,
		}
	},
	Calculator: {
		screen: Calculator,
		navigationOptions: {
			title: 'Hesaplama',
			header: null,
		}
	},


}, {
	
	contentOptions: {
		activeTintColor: '#009bd9',
		
		itemsContainerStyle: {
			marginVertical: 5,
			paddingTop: 50,
		},

		iconContainerStyle: {
			opacity: 1
		},
		overlayColor: "transparent",
		drawerBackgroundColor: "#2c005d",
		inactiveBackgroundColor: "white",
		activeBackgroundColor: "#e3e3e375",
		backgroundColor:"#2c005d",
		itemStyle:{
			borderBottomWidth:1,
			borderBottomColor:"#e7e7e7"
		}

	}
}
);




const SwitchNavigator = createSwitchNavigator(
	{
		Calculations: Calculations,
	},
	{
		initialRouteName: 'Calculations',
	}
);




export default createAppContainer(SwitchNavigator);