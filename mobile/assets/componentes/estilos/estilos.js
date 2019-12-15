import { StyleSheet } from 'react-native'

  
export default estilos = StyleSheet.create({   
  container:{
    flex: 1,
    justifyContent: 'center',
  },
  containerMaior:{
    flex:0.55,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  voltarSeguir:{
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logo: {
    alignSelf: 'center',
    aspectRatio: 1, 
    resizeMode: 'contain'
  },
  imagemCompletarPalavra:{
    alignSelf: 'center',
    aspectRatio: 1, 
    resizeMode: 'contain',
    flex:1,
    marginTop: '15%',
    marginBottom: '15%',
  },
  imagemQuizz:{
    alignSelf: 'center',
    aspectRatio: 1, 
    resizeMode: 'contain',
    minHeight: 200,
    marginTop: '15%',
    marginBottom: '15%',
  },
  imagemLivro:{
    alignSelf: 'center',
    aspectRatio: 1, 
    height:'100%',
  },
  tituloLivro:{
    color: 'white',
    fontFamily: 'Roboto-Bold',
    fontSize: 24
  },
  botao:{
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
  },
  operacao:{
    margin: "5%",
    backgroundColor:"#FFD917",
  },
  auxilio:{
    paddingRight: 15,
    paddingLeft: 15,
    margin: "10%",
    backgroundColor:"#B1FF17",
  },
  desfazer:{
    paddingRight: 10,
    paddingLeft: 10,
    backgroundColor:"#B1FF17",
  },
  texto: {
    color: "black", 
    textAlign: 'center'
  },
  grid:{
    flex:0.5
  },
  completarPalavra:{
    flex:1,
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  letraPalavra:{
    height: 40, 
    width: 30,
    borderWidth: 1, 
    textAlign: "center",
    marginRight: 5, 
    marginLeft: 5 
  },
  tituloGrid:{
    flex: 0.25, 
    justifyContent: "space-around",
    alignItems: 'center',
    flexDirection: 'row',
  },
  letraSelecionada:{
    fontFamily: 'Roboto-Light', 
    fontSize: 20,
    textDecorationLine:'underline'
  },
  letraNaoSelecionada:{
    fontFamily: 'Roboto-Light', 
    fontSize: 20,
    
  },
  radioButton:{
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  input:{
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: "5%",
    maxWidth: "90%",
    borderColor:"#FFD917",
    borderWidth: 2,
  },
  absoluteView:{
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  informacao:{
    flexDirection: 'row', 
    marginHorizontal: 20,
    marginVertical: 5,
    flexWrap:"wrap",
    alignItems: "baseline"
  },
  informacaoTitulo:{
    marginLeft: 15,
    fontWeight:"bold",
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    textDecorationLine: "underline"
  },
  informacaoConteudo:{
    marginLeft: 15,
    fontFamily: 'Roboto-Light',
    fontSize: 16
  },
  nomeArquivo:{
    fontFamily: 'Roboto-Bold',
    alignSelf: "center",
    marginHorizontal: 20,
  }
})

