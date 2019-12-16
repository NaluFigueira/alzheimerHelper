import React from 'react';
import {AsyncStorage} from 'react-native';
import Login from './assets/componentes/Login'
import Home from './assets/componentes/Home'
import MenuLivro from './assets/componentes/menus/MenuLivro'
import Pessoas from './assets/componentes/livro/Pessoas'
import Eventos from './assets/componentes/livro/Eventos'
import DetalhesPessoa from './assets/componentes/livro/DetalhesPessoa'
import DetalhesEvento from './assets/componentes/livro/DetalhesEvento'
import FormularioPessoa from './assets/componentes/livro/FormularioPessoa'
import FormularioEvento from './assets/componentes/livro/FormularioEvento'
import MenuJogos from './assets/componentes/menus/MenuJogos'
import MenuCognicao from './assets/componentes/menus/MenuCognicao'
import MenuMemoria from './assets/componentes/menus/MenuMemoria'
import MenuCorrespondencia from './assets/componentes/menus/MenuCorrespondencia'
import MenuPalavras from './assets/componentes/menus/MenuPalavras'
import MenuCompletarPalavra from './assets/componentes/menus/MenuCompletarPalavra'
import CorrespondenciaObjetos from './assets/componentes/correspondencia/CorrespondenciaObjetos'
import SopaLetras from './assets/componentes/palavras/SopaLetras'
import CompletarPalavra from './assets/componentes/palavras/CompletarPalavra'
import IdentificarForma from './assets/componentes/memoria/IdentificarForma'
import Quizz from './assets/componentes/memoria/Quizz'
import SelecionarResposta from './assets/componentes/memoria/SelecionarResposta'
import {createStackNavigator, createAppContainer} from 'react-navigation';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

const MainNavigator = (logado) => createStackNavigator(
	{
		Login,
		Home,
		MenuLivro,
		Eventos,
		Pessoas,
		DetalhesPessoa,
		DetalhesEvento,
		FormularioPessoa,
		FormularioEvento,
	  MenuJogos,
	  MenuCognicao,
	  MenuMemoria,
	  MenuCorrespondencia,
	  MenuPalavras,
	  MenuCompletarPalavra,
	  CorrespondenciaObjetos,
	  SopaLetras,
	  CompletarPalavra,
		IdentificarForma,
		Quizz,
		SelecionarResposta
	},
	{
		initialRouteName: logado?"Home":"Login",
	  defaultNavigationOptions: {
			header: null
	  }
	}
	);
	
	export default class App extends React.Component {
		constructor(props){
  	super(props);
		this.state = {loading: true, logado: false}
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
      'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
		});
		const token = await AsyncStorage.getItem('token');
    this.setState({loading:false, logado: token !== null});
  }
  render(){
		const AppContainer = createAppContainer(MainNavigator(this.state.logado));
		if(this.state.loading){
  		return <AppLoading />;
  	}
	return (
	  <AppContainer />
	);
  }
}


