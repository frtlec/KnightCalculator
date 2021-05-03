  
import React from 'react';
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
const Calculations = createBottomTabNavigator({
	Calculator: {
		screen: Calculator,
		navigationOptions: {
			title: 'Toplu',
			header: null,
		}
	},
	Crop: {
		screen: Calculator,
		navigationOptions: {
			title: 'Tek',
			header: null,
		}
	}
}, {
	tabBarOptions: {
		// other properties
		pressColor: 'gray',// for click (ripple) effect color
		style: {
			color: 'white',
			fontWeight:"bold",
		},
		activeTintColor: '#fff',
		activeBackgroundColor:"#006064",
		inactiveBackgroundColor:"#c7c7c7"
	}
})


const SwitchNavigator = createSwitchNavigator(
	{
		Calculations: Calculations,
	},
	{
		initialRouteName: 'Calculations',
	}
);




export default createAppContainer(SwitchNavigator);