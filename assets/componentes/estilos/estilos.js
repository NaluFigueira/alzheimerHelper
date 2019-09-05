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
  botao:{
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 10,
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
  tituloGrid:{
    flex: 0.25, 
    justifyContent: "space-around",
    alignItems: 'center',
    flexDirection: 'row',
   
  },
  
})

