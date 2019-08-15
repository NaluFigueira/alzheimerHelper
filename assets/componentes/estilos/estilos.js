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
    flex:0.25,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  logo: {
    alignSelf: 'center',
    aspectRatio: 1, 
    resizeMode: 'contain'
  },
  botao:{
    padding: 15,
    borderRadius: 10,
  },
  operacao:{
    margin: "5%",
    backgroundColor:"#FFD917",
  },
  auxilio:{
    margin: "10%",
    backgroundColor:"#B1FF17",
  },
  texto: {
    color: "black", 
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

