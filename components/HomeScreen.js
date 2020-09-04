import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';

//Manejar en estados de componentes
global.api_url = "host:port";

class HomeScreen extends React.Component {

  
  constructor(props) {
    super(props);
    this.state = {
      photo: 'https://i1.wp.com/blog.logrocket.com/wp-content/uploads/2019/07/reactrouter.png'
    };

    this.camaraHandleClick = this.camaraHandleClick.bind(this);
  }

  camaraHandleClick(){
    // console.log('camaraHandleClick');

    // useEffect(() => {
    //     (async () => {
    //         const { status } = await Camera.requestPermissionsAsync();
    //         //this.setHasPermission(status === 'granted');
    //     })();
    // }, []);    
    this.props.navigation.navigate('Camera')
  }

 /* render() {
    return (
      <View style={styles.container}>
        <Button
          title="Go to Profile"
          onPress={() => this.props.navigation.navigate('Profile')}
        />
        <Button
          title="Go to Camera"
          onPress={this.camaraHandleClick}
        />
        <Button
          title="Go to Image"
          onPress={() => this.props.navigation.navigate('Image', { 'photo': this.state.photo })}
        />
      </View>
    );
  }*/


render() {
  return (
    <View style={styles.container}>
      <Button
        title="Capturar imagen"
        onPress={this.camaraHandleClick}
      />
      
      <Button
          title="Configurar Endpoint"
          onPress={() => this.props.navigation.navigate('Settings')}
      />

    </View>
  );
}

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
});

export default HomeScreen;