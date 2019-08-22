import React from 'react';
import HomeScreen from './assets/componentes/Home'
import MenuJogosScreen from './assets/componentes/menus/MenuJogos'
import MenuCognicaoScreen from './assets/componentes/menus/MenuCognicao'
import MenuCorrespondenciaScreen from './assets/componentes/menus/MenuCorrespondencia'
import CorrespondenciaObjetosScreen from './assets/componentes/correspondencia/CorrespondenciaObjetos'
import {createStackNavigator, createAppContainer} from 'react-navigation';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

const MainNavigator = createStackNavigator(
	{
	
	  Home: HomeScreen,
	  MenuJogos: MenuJogosScreen,
	  MenuCognicao: MenuCognicaoScreen,
	  MenuCorrespondencia: MenuCorrespondenciaScreen,
	  CorrespondenciaObjetos: CorrespondenciaObjetosScreen
	},
	{
	  initialRouteName: "Home",
	  defaultNavigationOptions: {
	      header: null
	  }
	}
);

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  constructor(props){
  	super(props);
  	this.state = {loading: true}
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
      'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    });
    this.setState({loading:false});
  }
  render(){
  	if(this.state.loading){
  		return <AppLoading />;
  	}
	return (
	  <AppContainer />
	);
  }
}


