import { StyleSheet } from 'react-native'

  
export default estilos = StyleSheet.create({   
  container:{
    flex: 1,
    justifyContent: 'center'
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
    
  }
  
})
