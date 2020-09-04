import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';
import { HeaderTitle } from '@react-navigation/stack';



class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      photo: 'https://i1.wp.com/blog.logrocket.com/wp-content/uploads/2019/07/reactrouter.png'
    };

    this.camaraHandleClick = this.camaraHandleClick.bind(this);
    this.userHandleClick = this.userHandleClick.bind(this);
  }

  userHandleClick() { 
    this.props.navigation.navigate('Document')
  }

  camaraHandleClick() { 
    this.props.navigation.navigate('Camera')
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderTitle style={styles.headerTitle}>Document Digialization</HeaderTitle>
        <View style={styles.innerContainer}>

          <Button
            title="Example :: Document Restful"
            onPress={this.userHandleClick}
          />
          <Button
            title="Example :: Camera"
            onPress={this.camaraHandleClick}
          />
        </View>
      </View>
    );
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    // // height: 200,
  },  
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    // height: 200,
  },
 
  headerTitle:{
    margin: 15,
    color: '#0033ff',
  }
});

export default HomeScreen;