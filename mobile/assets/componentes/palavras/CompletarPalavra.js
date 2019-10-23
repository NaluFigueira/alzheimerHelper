import React from 'react';
import { View, TouchableOpacity, FlatList, TextInput, Image, Alert } from 'react-native';
import estilos from '../estilos/estilos.js';
import Botao from '../Botao';


export default class CompletarPalavra extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			tipo: this.props.navigation.getParam('tipo','ANIMAL'),
			palavra: this.props.navigation.getParam('palavra',{nome:"abelha",uri:require('../../imagens/animais/abelha.jpg')}),
			palavraIncompleta: []
		}
	}


	gerarPalavraIncompleta() {
	  var vetor = this.state.palavra.nome.split('');
	  var indiceAtual = vetor.length, valorTemporario, indiceAleatorio;
	  while (indiceAtual > 0) {
	    indiceAleatorio = Math.floor(Math.random() * indiceAtual);
	    indiceAtual -= 1;
	    vetor[indiceAleatorio] = "";
	  }

	  this.setState({palavraIncompleta:vetor});
	}

	alertarIntroducao(){
 		Alert.alert(
		  'COMPLETE A PALAVRA',
		  this.state.tipo === "ANIMAL"?'DESCUBRA O NOME DO '+ this.state.tipo +" QUE ESTÁ NA IMAGEM E COMPLETE SEU NOME!"
		  : 'DESCUBRA O NOME DA '+ this.state.tipo +" QUE ESTÁ NA IMAGEM E COMPLETE SEU NOME!"
		);
 	}

 	alertarVitoria(){
 		Alert.alert(
		  'PARABÉNS, VOCÊ GANHOU!',
		  "CLIQUE EM " + this.state.tipo + ", PARA JOGAR DE NOVO, OU TENTE AS OUTRAS MODALIDADES!" 
		);
		this.props.navigation.push('MenuCompletarPalavra');
 	}

	verificarVitoria(){
		if(this.state.palavraIncompleta.join('').toUpperCase() === this.state.palavra.nome.toUpperCase())
			this.alertarVitoria();
	}

	async atualizarPalavraIncompleta(input,index){
		if (input.length === 0) 
            var textoNovo = "";
        else
			var textoNovo = input[input.length-1];
        
        var auxiliar = this.state.palavraIncompleta;
		auxiliar[index] = textoNovo;
		await this.setState({palavraIncompleta : auxiliar},() => this.verificarVitoria());
	}

	renderItem = ({item, index}) => {
		return(
				<TextInput
			      style={estilos.letraPalavra}
			      onChangeText={input => this.atualizarPalavraIncompleta(input,index)}
				  maxLength = {1}
			      value={item}
			    />
		);
	};

	componentWillMount(){
		this.alertarIntroducao();
		this.gerarPalavraIncompleta();
	}
	
	render(){
		return(
			<View style={estilos.container}>
				<Image
                    style={estilos.imagemCompletarPalavra}
                    source={this.state.palavra.uri}
                  />
				<FlatList
					data = {this.state.palavraIncompleta}
					extraData={this.state}
					keyExtractor={(item, index) => index.toString()}
					renderItem = {this.renderItem}
					numColumns = {this.state.palavra.nome.length}
					contentContainerStyle = {estilos.completarPalavra}
				/>
				<View style={[estilos.voltarSeguir,{backgroundColor: "#FFEB83"}]}>
		            <Botao aoClicar = {() => this.props.navigation.push('MenuCompletarPalavra')} 
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