import React from 'react';
import { View, TouchableOpacity, FlatList, Alert } from 'react-native';
import estilos from '../estilos/estilos.js'
import Botao from '../Botao';
import BotaoDesfazer from '../BotaoDesfazer';
import Titulo from './Titulo';
import Objeto from './Titulo';


const objetos = ["red","green","blue"]; 

export default class CorrespondenciaObjetos extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			numColunas: this.props.navigation.getParam('numColunas',2),
			numLinhas: this.props.navigation.getParam('numLinhas',3),
			objetosPassados: this.props.navigation.getParam('objetosPassados',objetos),
			valorDesativacao: this.props.navigation.getParam('valorDesativacao',"white"),
			cor: this.props.navigation.getParam('cor',true),
			objetos: [],
			alturaFlatList: 0,
			larguraFlatList: 0,
			parAtivo: -1, 
			pilhaAcoes: [],
			parTemporario: -1
		}
	}

	embaralhar(vetor) {
	  var indiceAtual = vetor.length, valorTemporario, indiceAleatorio;

	  while (0 !== indiceAtual) {
	    indiceAleatorio = Math.floor(Math.random() * indiceAtual);
	    indiceAtual -= 1;

	    valorTemporario = vetor[indiceAtual];
	    vetor[indiceAtual] = vetor[indiceAleatorio];
	    vetor[indiceAleatorio] = valorTemporario;
	  }

	  return vetor;
	}

	async gerarObjetos(){
		var auxiliar = [];
		var tamanho = this.state.numColunas*this.state.numLinhas;
		var tamanhoObjetos = this.state.objetosPassados.length;
		var indiceAleatorio = Math.floor(Math.random()*tamanhoObjetos);
		for (var i = 0; i < tamanho/2; i++) {
			var objetoSorteado = this.state.objetosPassados[indiceAleatorio];
			auxiliar.push({objeto:objetoSorteado, selecionado: false, ativo: true});
			auxiliar.push({objeto:objetoSorteado, selecionado: false, ativo: true});
		}
		auxiliar = this.embaralhar(auxiliar);
		await this.setState({objetos:auxiliar});
	}


	async desfazer(){
		if(this.state.pilhaAcoes.length >= 1){
			var ObjetosAntes = this.state.pilhaAcoes.pop();
			await this.setState({objetos: ObjetosAntes, parAtivo:this.state.parTemporario});
		}else {
			Alert.alert('ERRO',"Não há ações para desfazer!");
		}
	}

	async clonarObjetos(){
		var auxiliar = [], pilhaTemporaria = [];
		this.state.objetos.map((item,index) => {
			auxiliar.push({objeto:item.objeto, selecionado:false, ativo:item.ativo});
		});
		pilhaTemporaria.push(auxiliar);
		await this.setState({pilhaAcoes: pilhaTemporaria});
	}

	async clonarPar(){
		var auxiliarPar = this.state.parAtivo;
		if(this.state.parAtivo === -1)await this.setState({parTemporario:auxiliarPar});
		else await this.setState({parTemporario:-1});
	}

	foiSelecionadoPar(){
		return this.state.parAtivo !== -1
	}

	parSelecionadoCorreto(posicao){
		return auxiliar[this.state.parAtivo].objeto === auxiliar[posicao].objeto;
	}

	desativarQuadrado(posicao,vetor){
		vetor[posicao].ativo = false;
		vetor[posicao].selecionado = false;
	}

	trocarQuadradoSelecionado(posicao1,posicao2,vetor){
		vetor[posicao1].selecionado = false;
		vetor[posicao2].selecionado = true;
	}

	selecionarQuadrado(posicao,vetor){
		if(vetor[posicao].objeto !== this.state.valorDesativacao){
			vetor[posicao].selecionado = true;
			console.log('selecionei');
			console.log('cor',vetor[posicao].objeto );
			return true;
		}
		return false;
	}

	async selecionarQuadrado(index){
		this.clonarObjetos();
		this.clonarPar();
		var auxiliar = this.state.objetos;				
		if(this.foiSelecionadoPar()){
			if(this.parSelecionadoCorreto(index)){
				this.desativarQuadrado(auxiliar,this.state.parAtivo);
				this.desativarQuadrado(auxiliar,index);
				await this.setState({objetos:auxiliar, parAtivo:-1}, () => this.clonarPar());
				if(this.verificarVitoria()) this.lertarVitoria();
			}
			else{
				this.trocarQuadradoSelecionado(this.state.parAtivo,index,auxiliar);
				await this.setState({objetos:auxiliar, parAtivo:index});
			}
		}
		else{
			console.log('entrei aqui')
			if(this.selecionarQuadrado(index,auxiliar))
				await this.setState({objetos:auxiliar, parAtivo:index});
		}
		
	}

	quadradoAtivo(quadrado){
		return quadrado.ativo === true
	}

	verificarVitoria(){
		var quadradosAtivos = this.state.objetos.filter(this.quadradoAtivo);
		if(quadradosAtivos.length > 0) return false;
		return true;
 	}

 	alertarVitoria(){
 		Alert.alert(
		  'PARABÉNS!',
		  'VOCÊ GANHOU! CONTINUE ASSIM!',
		  [
		    {text: 'CONTINUAR', onPress: () => this.props.navigation.push('CorrespondenciaObjetos',{
		    	numLinhas: this.state.numLinhas + 1,
		    	numColunas: this.state.numColunas + 1,
		    	nivel: this.props.navigation.getParam('nivel',1)+1,
		    	objetosPassados: this.state.objetosPassados,
				valorDesativacao: this.state.valorDesativacao,
				cor: this.state.cor
		    })},
		    {
		      text: 'VOLTAR',
		      onPress: () => this.props.navigation.push('MenuCorrespondencia'),
		    },
		  ],
		  {cancelable: false},
		);
 	}


	renderItem = ({item, index}) => {
		return(
			<TouchableOpacity
				onPress = {() => this.selecionarQuadrado(index)}
				style = {{margin:8,
					height: this.state.alturaFlatList/this.state.numLinhas - 16,
					width: this.state.larguraFlatList/this.state.numColunas - 16,
					backgroundColor:this.state.objetos[index].ativo&&this.state.cor?item.objeto:"white",
					borderColor: this.state.objetos[index].selecionado?"#FF9200":item.objeto,
					borderWidth: this.state.objetos[index].selecionado?15:0
					}}>
				{this.state.objetos[index].ativo&&this.state.cor?
					<View />
					:
					<Objeto texto = {item.objeto} />
				}
			</TouchableOpacity>
		);
	};

	componentWillMount(){
		this.gerarObjetos();
	}


	render(){
		return(
			<View style={estilos.container}>
				<View style = {estilos.tituloGrid}>	
					<Titulo titulo = {"Nível "+this.props.navigation.getParam('nivel',1)} />
					<BotaoDesfazer aoClicar = {() => this.desfazer()} 
			                   titulo = "DESFAZER" 
			                   operacao = {false}
			                    />
		        </View>
				<FlatList
					data = {this.state.objetos}
					keyExtractor={(item, index) => index.toString()}
					style = {estilos.grid}
					renderItem = {this.renderItem}
					numColumns = {this.state.numColunas}
					onLayout={(event) => {
					  const {x, y, width, height} = event.nativeEvent.layout;
					  this.setState({alturaFlatList: height, larguraFlatList: width});
					}}
				/>
				<View style={estilos.voltarSeguir}>
		            <Botao aoClicar = {() => this.props.navigation.push('MenuCorrespondencia')} 
		                   titulo = "VOLTAR" 
		                   operacao = {false} />
		            <Botao aoClicar = {() => this.props.navigation.push('MenuJogos')} 
		                   titulo = "AJUDA" 
		                   operacao = {false} />
	         	</View>
         	</View>
		);
	}
}