import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native';
import { Camera } from 'expo-camera';
class CameraScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // hasPermission: null,
            cameraRef: null,
            type: Camera.Constants.Type.back,
        };
        this.typeHandleTouch = this.typeHandleTouch.bind(this);
        this.takePhotoHandleTouch = this.takePhotoHandleTouch.bind(this);
        this.cameraHandleRef = this.cameraHandleRef.bind(this);

    }

    typeHandleTouch() {

        this.setState((state) => {
            const mtype = (state.type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back);
             
            return {type: mtype}
        });
    }

    async takePhotoHandleTouch() {
        let photo = await this.state.cameraRef.takePictureAsync({skipProcessing: true, base64: true});
        //console.log('photo', photo);
        this.props.navigation.navigate('Document', { 'photo_uri': photo.uri, 'photo_encoded':photo.base64 });
    }

    cameraHandleRef(ref) {
        this.setState((state) => {
            // state.cameraRef = ref;
            return {cameraRef: ref}
        });
    }

    render() {
        // if (this.state.hasPermission === null) {
        //     console.log('Null hasPermission');
        //     return <View />;
        // }
        // if (this.state.hasPermission === false) {
        //     return <Text>No access to camera</Text>;
        // }
        return (
            <View style={styles.container}>
                <Camera
                    style={styles.camara}
                    type={this.state.type}
                    ref={this.cameraHandleRef}
                    autoFocus='on'>

                    <View style={styles.viewType}>
                        <TouchableOpacity
                            style={styles.viewTypeInner}
                            onPress={this.typeHandleTouch}
                        >
                            <Text style={styles.text}>Flip</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.viewTakePhoto}
                            onPress={this.takePhotoHandleTouch}
                        >
                            <View style={styles.viewTakePhotoWrapper}>
                                <View style={styles.viewTakePhotoInner} >
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

    camara: {
        flex: 1
    },

    viewType: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'flex-end'
    },
    viewTypeInner: {
        flex: 0.1,
        alignSelf: 'flex-end'
    },

    viewTakePhoto: { alignSelf: 'center' },
    viewTakePhotoWrapper: {
        borderWidth: 2,
        // borderRadius: '50%',
        borderColor: 'white',
        height: 50,
        width: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewTakePhotoInner: {
        borderWidth: 2,
        // borderRadius: '50%',
        borderColor: 'white',
        height: 40,
        width: 40,
        backgroundColor: 'white'
    },
    text: { 
        fontSize: 18, 
        marginBottom: 10, 
        color: 'white' 
    },
    cameraSwitch:{ 
        color: "#fff",
        fontSize: 40
    },
    cameraIcon:{ 
        color: "#fff", 
        fontSize: 40
    }

});




export default CameraScreen;