import React from 'react';
import { StyleSheet, Text, View , Image} from 'react-native';
import { Button } from 'react-native';
import { useRoute } from '@react-navigation/native';

class ImageScreen extends React.Component {
    render() {
        const { route } = this.props;
   
        return (
            <View style={styles.container}>
                <Image 
                    source={{ uri: route.params.photo }}
                    style={styles.photo}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },

    photo: {
        width:380,
        height:550
    },
});

export default ImageScreen;