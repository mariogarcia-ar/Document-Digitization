import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button, FlatList, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

class ServiceScreen extends React.Component {
    constructor(props) {
        super(props);
        //console.log(props);
        const { route } = this.props;

        this.state = {
            api_url: 'http://' + global.api_url,
            loading: true,
            fromFetch: false,
            fromAxios: false,
            dataSource: [],
            axiosData: null,
            isError: false,
        };
        
        this.enviarFoto = this.enviarFoto.bind(this);

    }    

    
    showLoading = () =>{
        console.log("showLoading");
        this.setState({
            fromFetch: false,
            loading: true,
        })        
    }


    componentDidMount() {
        this.enviarFoto();
    }

    enviarFoto = () => {
        console.log(">>EnviarFoto");
        console.log(this.state.api_url)
        this.showLoading();
        const data = {
            name: 'ImagenID',
            photo: this.props.route.params.photo_encoded
        }
        axios.post(this.state.api_url + "/imagen", data)
            .then(response => {
                console.log('getting data from axios', response.data);
                setTimeout(() => {
                    this.setState({
                        loading: false,
                        //axiosData: response.data
                    })
                }, 4000)
            })
            .catch(error => {
                console.log("el errrooorrr");
                console.log(error);
                this.setState({
                    loading: false,
                    isError: true
                })
            });
    }


    render() {                
        if(this.state.loading){
            return(
                <View style={styles.parentContainer}>
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color="#0c9" />
                        <Text style={{ fontSize: 17, color: 'black' }}>Enviando Imagen...</Text>
                    </View>
                </View>

            )
        }

        let resultadoFinal = <Text style={styles.mensajeOK} >Imagen enviada con exito.</Text>
        if (this.state.isError) {
            resultadoFinal = <Text style={styles.mensajeError}> Hubo un Error al enviar la imagen. </Text>
        }

        return (

            <View style={styles.parentContainer}>
               
                {resultadoFinal}
                
                <TouchableOpacity style={styles.botonSiguiente}
                    onPress={() => this.props.navigation.navigate('Home')} >
                    <Text style={styles.text}>Volver al inicio</Text>
                </TouchableOpacity>

            </View>
        );
    }


}

const deviceHeight = Dimensions.get('screen').height
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        marginTop: 10
    },
    photo: {
        width: 380,
        height: 550
    },

    parentContainer: {
        height: deviceHeight,
        justifyContent: 'center',
        flex: 1
    },
    textStyle: {
        fontSize: 18,
        textAlign: 'center',
        paddingTop: 32
    },
    container: {
        backgroundColor: "#fff"
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    list: {
        paddingVertical: 4,
        margin: 5,
        backgroundColor: "#fff"
    },
    botonSiguiente:{
        justifyContent: 'center',
        textAlign: 'center',
        alignSelf: 'center',
        width: 120,
        height: 40,
        backgroundColor: '#568dd6',
        borderRadius: 10,
        margin: 20,
     },
     text: {
        color: 'white',
        textAlign: 'center',
        margin: 10,
  },
   mensajeOK: { 
       fontSize: 16, 
       color: 'black',
       justifyContent: 'center',
       textAlign: 'center',
       alignSelf: 'center'
    },

   mensajeError: { 
       fontSize: 16, 
       color: 'red',
       justifyContent: 'center',
       textAlign: 'center',
       alignSelf: 'center'
    },

});

export default ServiceScreen;