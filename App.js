import React from 'react';
import HomeScreen from './assets/componentes/Home'
import MenuJogosScreen from './assets/componentes/menus/MenuJogos'
import MenuCognicaoScreen from './assets/componentes/menus/MenuCognicao'
import MenuCorrespondenciaScreen from './assets/componentes/menus/MenuCorrespondencia'
import {createStackNavigator, createAppContainer} from 'react-navigation';

const MainNavigator = createStackNavigator(
	{
	
	  Home: HomeScreen,
	  MenuJogos: MenuJogosScreen,
	  MenuCognicao: MenuCognicaoScreen,
	  MenuCorrespondencia: MenuCorrespondenciaScreen
	},
	{
	  initialRouteName: "Home",
	  defaultNavigationOptions: {
	      header: null
	  }
	}
);

const AppContainer = createAppContainer(MainNavigator);

export default function App() {
  return (
    <AppContainer />
  );
}


