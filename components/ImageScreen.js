import React from 'react';
import { StyleSheet, Text, View , Image} from 'react-native';
import { Button } from 'react-native';
import { TouchableOpacity } from 'react-native';


class ImageScreen extends React.Component {
    render() {
        const { route } = this.props;
   
        return (
            <View style={styles.container}>
               
                <Image 
                    source={{ uri: route.params.photo_uri }}
                    style={styles.photo}/>
                
                <TouchableOpacity style={styles.botonVolver}
                    onPress={() => this.props.navigation.goBack()} >
                    <Text style={styles.text}>Capturar Nuevamente</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botonSiguiente}
                    onPress={() => this.props.navigation.navigate('Service', { 'photo_encoded': route.params.photo_encoded })} >
                    <Text style={styles.text}>Enviar para digitalizar</Text>
                </TouchableOpacity>

                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { 
        flex: 1,         
        justifyContent: 'flex-end',
        alignContent: 'space-between'
    },

    photo: {
        width:360,
        height:450
    },
    botonVolver:{
        justifyContent: 'center',
        textAlign: 'center',
        width: 100,
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
  botonSiguiente:{
    justifyContent: 'center',
    textAlign: 'right',
    position: 'absolute',
    alignSelf: 'flex-end',
    width: 100,
    height: 40,
    backgroundColor: '#568dd6',
    borderRadius: 10,
    margin: 20,
 }
});

export default ImageScreen;