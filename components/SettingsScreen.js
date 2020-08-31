import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <Button 
        title="Go back"  
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