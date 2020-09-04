import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button, TextInput, FlatList, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import axios from 'axios';

import { HeaderTitle } from '@react-navigation/stack';

class DocumentScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            api_url: 'http://192.168.0.75:3000',
            loading: false,
            creating: false,
            dataSource: [],
            docsData: null,

            name: null,
            photo: null,
        };

        this.listHandled = this.listHandled.bind(this);
        this.createHandled = this.createHandled.bind(this);
        this.createSendHandled = this.createSendHandled.bind(this);
        this.readHandled = this.readHandled.bind(this);
        this.updateHandled = this.updateHandled.bind(this);
        this.deleteHandled = this.deleteHandled.bind(this);

    }

    showLoading = () => {
        this.setState({
            loading: true,
        })
    }

    hideLoading = () => {
        this.setState({
            loading: false,
        })
    }

    cleanData = () => {
        this.setState({
            docsData: [],
        })
    }

    listHandled = () => {
        console.log('listHandled')
        this.showLoading()
        this.cleanData()
        const url = this.state.api_url + "/docs";

        axios.get(url)
            .then(response => {
                console.log('getting data ' + url, response.data);
                setTimeout(() => {
                    this.setState({
                        docsData: response.data
                    })
                    this.hideLoading()
                }, 2000)
            })
            .catch(error => {
                console.log(error);
                this.hideLoading()
            });

    }

    createHandled = () => {
        console.log('createHandled')
        //this.showLoading()
        this.setState({creating: true})
    }
    createSendHandled = () => {
        console.log('createSendHandled ' )
        this.showLoading()

        const url = this.state.api_url + "/docs/"  
        const data = {
            name: this.state.name,
            photo: this.state.photo
        }
        axios.post(url, data)
            .then(response => {
                console.log('create ' + url, response.data);
                setTimeout(() => {
                    this.setState({creating: false})
                    this.listHandled()
                }, 2000)
            })
            .catch(error => {
                console.log(error);
                this.hideLoading()
            });
    }

    readHandled = () => {
        console.log('readHandled')
        this.showLoading()
    }
    updateHandled = () => {
        console.log('updateHandled')
        this.showLoading()
    }

    deleteHandled = (id) => {
        console.log('deleteHandled ' + id)
        this.showLoading()

        const url = this.state.api_url + "/docs/" + id
        axios.delete(url)
            .then(response => {
                console.log('delete ' + url, response.data);
                setTimeout(() => {
                    this.listHandled()
                }, 2000)
            })
            .catch(error => {
                console.log(error);
                this.hideLoading()
            });
    }

    // Helpers
    FlatListSeparator = () => {
        return (
            <View style={styles.separator}
            />
        );
    }
    renderItem = (data) => {
        return (
            <TouchableOpacity style={styles.list} onPress={() => this.deleteHandled(data.item.id)}>
                <Text style={styles.lightText}>Id: {data.item.id}</Text>
                <Text style={styles.lightText}>name: {data.item.name}</Text>
                <Image
                    source={{ uri: data.item.photo }}
                    style={styles.photo} />
            </TouchableOpacity>
        )

    }


    render() {





        return (
            <View style={styles.parentContainer}>
                <HeaderTitle style={styles.headerTitle}>CRUD for Document</HeaderTitle>

                {this.state.creating &&
                    <View style={styles.containerCreate}>
                        <TextInput
                            value={this.state.name}
                            onChangeText={(name) => this.setState({ name })}
                            placeholder={'name'}
                            style={styles.input}
                        />
                        <TextInput
                            value={this.state.photo}
                            onChangeText={(photo) => this.setState({ photo })}
                            placeholder={'photo'} 
                            style={styles.input} 
                        />

                        <Button
                            title={'Send'}
                            style={styles.input}
                            color="green"
                            onPress={this.createSendHandled}
                        />
                    </View>
                }


                {this.state.loading &&
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color="#0c9" />
                        <Text style={{ fontSize: 16, color: 'red' }}>Loading Data...</Text>
                    </View>
                }

                {/* Botonera */}
                {this.state.creating == false &&
                    <View style={styles.boxWrapper}>
                        <View style={styles.boxStyle}>
                            <Button title="List" onPress={this.listHandled}></Button>
                        </View>
                        <View style={styles.boxStyle}>
                            <Button title="Create" onPress={this.createHandled}></Button>
                        </View>
                        <View style={styles.boxStyle}>
                            <Button title="Read" onPress={this.readHandled}></Button>
                        </View>
                        <View style={styles.boxStyle}>
                            <Button title="Update" onPress={this.updateHandled}></Button>
                        </View>

                    </View>
                }

                {/* Listado */}
                {this.state.docsData &&
                    <FlatList style={styles.boxWrapper2}
                        data={this.state.docsData}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        renderItem={item => this.renderItem(item)}
                        keyExtractor={item => item.id.toString()}
                    />
                }
            </View>
        );
    }
}

const deviceHeight = Dimensions.get('screen').height
const styles = StyleSheet.create({
    separator: {
        height: .5,
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    boxWrapper: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    boxWrapper2: {
        marginTop: 100,


    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        // // height: 200,
    },

    boxStyle: {
        height: 35,
        width: 100,
        // borderWidth: 1,
        backgroundColor: 'orange',
        margin: 5
    },

    headerTitle: {
        margin: 15,
        color: '#0033ff',
    },

    photo: {
        width: 50,
        height: 50,
    },

    list: {
        paddingVertical: 4,
        margin: 5,
        backgroundColor: "#fff"
    },

    containerCreate: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#ecf0f1',
      },
    input: {
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
      },
});

export default DocumentScreen;