import React from 'react';
import { View, TouchableOpacity, FlatList, Alert } from 'react-native';
import estilos from '../estilos/estilos.js'
import Botao from '../Botao';
import BotaoDesfazer from '../BotaoDesfazer';
import Objeto from '../Objeto';
import Titulo from './Titulo';


const objetos = ["red","green","blue"]; 

export default class CorrespondenciaObjetos extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			numColunas: this.props.navigation.getParam('numColunas',2),
			numLinhas: this.props.navigation.getParam('numLinhas',3),
			objetosPassados: this.props.navigation.getParam('objetosPassados',objetos),
			valorDesativacao: this.props.navigation.getParam('valorDesativacao',"white"),
			tipo: this.props.navigation.getParam('tipo',"CORES"),
			nivel: this.props.navigation.getParam('nivel',1),
			objetos: [],
			alturaFlatList: 0,
			larguraFlatList: 0,
			parAtivo: -1, 
			pilhaAcoes: [],
			parTemporario: -1
		}
		this.selecionarQuadrado = this.selecionarQuadrado.bind(this);
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
		for (var i = 0; i < tamanho/2; i++) {
			var indiceAleatorio = Math.floor(Math.random()*tamanhoObjetos);
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
		var auxiliar = [], pilhaTemporaria = this.state.pilhaAcoes;
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

	parSelecionadoCorreto(posicao,vetor){
		return vetor[this.state.parAtivo].objeto === vetor[posicao].objeto;
	}

	desativarQuadrado(posicao,vetor){
		
		vetor[posicao].objeto = this.state.valorDesativacao; 
		vetor[posicao].ativo = false;
		vetor[posicao].selecionado = false;
	}

	trocarQuadradoSelecionado(posicao1,posicao2,vetor){
		this.state.pilhaAcoes.pop();
		vetor[posicao1].selecionado = false;
		vetor[posicao2].selecionado = true;
	}

	selecionar(posicao,vetor){
		if(vetor[posicao].objeto !== this.state.valorDesativacao){
			vetor[posicao].selecionado = true;
			return true;
		}
		return false;
	}

	async selecionarQuadrado(index){
		this.clonarObjetos();
		this.clonarPar();
		var auxiliar = this.state.objetos;				
		if(this.foiSelecionadoPar()){
			if(this.parSelecionadoCorreto(index,auxiliar)){
				this.state.pilhaAcoes.pop();
				this.desativarQuadrado(this.state.parAtivo,auxiliar);
				this.desativarQuadrado(index,auxiliar);
				await this.setState({objetos:auxiliar, parAtivo:-1}, () => this.clonarPar());
				if(this.verificarVitoria()) this.avancarNivel();
			}
			else{
				this.trocarQuadradoSelecionado(this.state.parAtivo,index,auxiliar);
				await this.setState({objetos:auxiliar, parAtivo:index});
			}
		}
		else{
			if(this.selecionar(index,auxiliar))
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

 	avancarNivel(){
 		if(this.state.nivel  == 4){
 			this.alertarNivelMaximo();
 			this.props.navigation.push('MenuCorrespondencia');
 		}
 		else{
 			this.alertarVitoria();
 			
 		}
 	}

 	alertarVitoria(){
 		Alert.alert(
		  'PARABÉNS!',
		  'VOCÊ GANHOU! CONTINUE ASSIM! CLIQUE EM CONTINUAR PARA IR PARA O PRÓXIMO NÍVEL OU CLIQUE EM VOLTAR PARA SAIR!',
		  [
		    {text: 'CONTINUAR', onPress: () => this.props.navigation.push('CorrespondenciaObjetos',{
		    	numLinhas: this.state.numLinhas + 1,
		    	numColunas: this.state.numColunas + 1,
		    	nivel: this.state.nivel+1,
		    	objetosPassados: this.state.objetosPassados,
				valorDesativacao: this.state.valorDesativacao,
				cor: this.state.cor,
				tipo: this.state.tipo
		    	}) 
			},
		    {
		      text: 'VOLTAR',
		      onPress: () => this.props.navigation.push('MenuCorrespondencia'),
		    },
		  ],
		  {cancelable: false},
		);
 	}

 	alertarIntroducao(){
 		Alert.alert(
		  'CORRESPONDÊNCIA DE '+this.state.tipo,
		  'CLIQUE NAS '+ this.state.tipo +" IGUAIS, FORMANDO PARES, ATÉ QUE TUDO FIQUE BRANCO! " 
		);
 	}

 	alertarNivelMaximo(){
 		Alert.alert(
		  'PARABÉNS, VOCÊ COMPLETOU TODOS OS NÍVES!',
		  "CLIQUE EM " + this.state.tipo + ", PARA JOGAR DE NOVO, OU TENTE AS OUTRAS MODALIDADES!" 
		);
 	}


	renderItem = ({item, index}) => {
		return(
			<TouchableOpacity
				onPress = {() => this.selecionarQuadrado(index)}
				style = {{margin:8,
					height: this.state.alturaFlatList/this.state.numLinhas - 16,
					width: this.state.larguraFlatList/this.state.numColunas - 16,
					backgroundColor:this.state.objetos[index].ativo&&this.state.tipo === "CORES"?item.objeto:"white",
					borderColor: this.state.objetos[index].selecionado?"#FF9200":item.objeto,
					borderWidth: this.state.objetos[index].selecionado?15:0
					}}>
				{this.state.tipo === "CORES"?
					<View />
					:
					<Objeto funcao = {() => this.selecionarQuadrado(index)}  
					texto = {this.state.objetos[index].ativo?item.objeto:this.state.valorDesativacao}
					tamanho = {30 - 2*this.state.nivel} />
				}
			</TouchableOpacity>
		);
	};

	componentWillMount(){
		this.gerarObjetos();
	}

	componentDidMount(){
		this.alertarIntroducao();
	}

	render(){
		return(
			<View style={estilos.container}>
				<View style = {estilos.tituloGrid}>	
					<Titulo titulo = {"Nível "+this.state.nivel} />
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