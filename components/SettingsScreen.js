import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Button } from 'react-native';

class SettingsScreen extends React.Component {
  render() {
    return (

    <View style={styles.container}>
      
      <TextInput  
        style={{height: 40,backgroundColor: 'azure', fontSize: 20, marginBottom:30}}  
        placeholder= {global.api_url}  
        onChangeText={(text) => global.api_url = text}  
      />        
      
      
      <Button 
        title="Aceptar"  
        onPress={() => this.props.navigation.goBack()} 
      />
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
});

export default SettingsScreen;