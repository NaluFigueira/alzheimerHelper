import React from 'react';
import { View, TouchableOpacity, FlatList, Alert, Text } from 'react-native';
import estilos from '../estilos/estilos.js'
import Botao from '../Botao';


letras = ["A","B","C","D","E","F","G","H","I","J","K","L",
		  "M","N","O","P","Q","R","S","T","U","V","X","Z"]

export default class SopaLetras extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			palavra: this.props.navigation.getParam('palavra',"abelha").split(''),
			matrizLetras: [],
			alturaFlatList: 0,
			larguraFlatList: 0,
			numColunas: 9,
			numLinhas: 9
		}
	}

	async gerarSopaLetras(){

	  var matrizTemporaria = [], matrizFinal = [];
	  for (var i = 0; i < 9; i++) {
	  	matrizTemporaria[i] = [];
	  	for(var j = 0; j < 9; j++){
	  		var indiceAleatorio = Math.floor(Math.random()*24);
	  		matrizTemporaria[i][j] = {letra:letras[indiceAleatorio], selecionado:false};
	  	}
	  }
	  var orientacao = Math.floor(Math.random()*2);
	  var contador = 0;
	  if(orientacao == 0){//vertical
	  	var coluna = Math.floor(Math.random()*9);
	  	var linhaInicial = Math.floor(Math.random()*(10-this.state.palavra.length)),
	  		linhaFinal = linhaInicial+this.state.palavra.length;
	  	for(var i = linhaInicial; i < linhaFinal; i++){
	  		matrizTemporaria[i][coluna] = {letra:this.state.palavra[contador].toUpperCase(), selecionado:false};
	  		contador++;
	  	}
	  }
	  else{ //horizontal
	  	var linha = Math.floor(Math.random()*9);
	  	var colunaInicial = Math.floor(Math.random()*(10-this.state.palavra.length)),
	  		colunaFinal = colunaInicial + this.state.palavra.length;
	  	for(var j = colunaInicial; j < colunaFinal; j++){
	  		matrizTemporaria[linha][j] = {letra:this.state.palavra[contador].toUpperCase(), selecionado:false};
	  		contador++;
	  	}
	  }

	  for(var i = 0; i < matrizTemporaria.length; i++){
		    matrizFinal = matrizFinal.concat(matrizTemporaria[i]);
	  
	  }	

	  await this.setState({matrizLetras:matrizFinal})

	}

	selecionarLetra(index){

		
		var auxiliar = this.state.matrizLetras;
		auxiliar[index].selecionado = true;
		this.setState({matrizLetras:auxiliar})
	}


	renderItem = ({item, index}) => {
		return(
			<TouchableOpacity
				onPress = {() => this.selecionarLetra(index)}
				style = {{margin:8,
					height: this.state.alturaFlatList/this.state.numLinhas - 16,
					width: this.state.larguraFlatList/this.state.numColunas - 16,
					}}>
				<Text onPress = {() => this.selecionarLetra(index)} style = {item.selecionado?estilos.letraSelecionada:estilos.letraNaoSelecionada} >
		          	{item.letra}
		       	</Text>			
		    </TouchableOpacity>
		);
	};

	componentWillMount(){

		this.gerarSopaLetras();
	}


	render(){
		return(
			<View style={estilos.container}>
				<View style = {[estilos.tituloGrid,{backgroundColor: "#FFEB83"}]}>	
					<Text style = {{ fontFamily: 'Roboto-Light', fontSize: 20}} > 
						{"Procure a palavra "+this.state.palavra.join('')} 
					</Text>
		        </View>
				<FlatList
					data = {this.state.matrizLetras}
					extraData={this.state}
					keyExtractor={(item, index) => index.toString()}
					style = {estilos.grid}
					renderItem = {this.renderItem}
					numColumns = {this.state.numColunas}
					onLayout={(event) => {
					  const {x, y, width, height} = event.nativeEvent.layout;
					  this.setState({alturaFlatList: height, larguraFlatList: width});
					}}
				/>
				<View style={[estilos.voltarSeguir,{backgroundColor: "#FFEB83"}]}>
		            <Botao aoClicar = {() => this.props.navigation.push('MenuSopaLetras')} 
		                   titulo = "SAIR" 
		                   operacao = {false} />
		            <Botao aoClicar = {() => this.props.navigation.push('MenuJogos')} 
		                   titulo = "AJUDA" 
		                   operacao = {false} />
	         	</View>
         	</View>
		);
	}
}