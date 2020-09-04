import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button, FlatList, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
///////////////////////////////////////////////////////////////////////////
///Este componente tiene todo el codigo de ejemplo para los servicios.////
////////////////////Borrar cuando no se necesite mas //////////////////////
///////////////////////////////////////////////////////////////////////////
class ServiceExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            api_url: 'http://192.168.0.75:3000',
            loading: false,
            fromFetch: false,
            fromAxios: false,
            dataSource: [],
            axiosData: null
        };

        this.goForFetch = this.goForFetch.bind(this);
        this.goForAxios = this.goForAxios.bind(this);
        this.createAxios = this.createAxios.bind(this);
        this.listAxios = this.listAxios.bind(this);
        this.deleteAxios = this.deleteAxios.bind(this);

    }
    
    listAxios = () => {
        this.showLoading();

        axios.get(this.state.api_url + "/users")
            .then(response => {
                console.log('getting data from axios', response.data);
                setTimeout(() => {
                    this.setState({
                        loading: false,
                        axiosData: response.data
                    })
                }, 2000)
            })
            .catch(error => {
                console.log(error);
            });
    }    
    createAxios = () => {
        this.showLoading();
        const data = {
            name: 'nombre desde axios',
            photo: 'photo desde axios'
        }
        axios.post(this.state.api_url + "/users",data)
            .then(response => {
                console.log('getting data from axios', response.data);
                setTimeout(() => {
                    this.setState({
                        loading: false,
                        //axiosData: response.data
                    })
                }, 2000)
            })
            .catch(error => {
                console.log(error);
            });
    }
    
    deleteAxios = () => {
        this.showLoading();
        const id = 3;

        axios.delete(this.state.api_url + "/users/"+ id)
            .then(response => {
                console.log('delete data from axios', response.data);
                setTimeout(() => {
                    this.setState({
                        loading: false,
                        //axiosData: response.data
                    })
                }, 2000)
            })
            .catch(error => {
                console.log(error);
            });
    }     

    showLoading = () =>{
        this.setState({
            fromFetch: false,
            loading: true,
        })        
    }






    goForAxios = () => {
        this.setState({
            fromFetch: false,
            loading: true,

        })
        axios.get("http://192.168.0.75:3000/users")
            .then(response => {
                console.log('getting data from axios', response.data);
                setTimeout(() => {
                    this.setState({
                        loading: false,
                        axiosData: response.data
                    })
                }, 2000)
            })
            .catch(error => {
                console.log(error);
            });
    }

    goForFetch = () => {
        this.setState((state) => {
            return {
                fromFetch: true,
                loading: true,
            }
        });

        console.log('-------------------------')
        fetch("http://192.168.0.75:3000/users")
            .then(response => response.json())
            .then((responseJson) => {
                console.log('getting data from fetch', responseJson)
                setTimeout(() => {
                    this.setState({
                        loading: false,
                        dataSource: responseJson
                    });
                    console.log(this.state)
                }, 2000)

            })
            .catch(error => console.log(error))
    }

    FlatListSeparator = () => {
        return (
            <View style={{
                height: .5,
                width: "100%",
                backgroundColor: "rgba(0,0,0,0.5)",
            }}
            />
        );
    }
    renderItem = (data) => {
        // console.log('render -> ', data)
        return (
            <TouchableOpacity style={styles.list}>
                <Text style={styles.lightText}>{data.item.id}</Text>
                <Text style={styles.lightText}>{data.item.name}</Text>
                <Text style={styles.lightText}>{data.item.photo}</Text></TouchableOpacity>
        )

    }
    render() {
        // const { route } = this.props;
        //const { goForAxios, fromFetch, fromAxios, axiosData, renderItem, FlatListItemSeparator, dataSource } = this.props

        return (
            <View style={styles.parentContainer}>
                {this.state.loading &&
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color="#0c9" />
                        <Text style={{ fontSize: 16, color: 'red' }}>Loading Data...</Text>
                    </View>
                }

                <Button style={styles.button}
                    title={'list User '}
                    onPress={this.listAxios}
                    color='blue'
                />
                <Button style={styles.button}
                    title={'Create User '}
                    onPress={this.createAxios}
                    color='blue'
                />
                <Text>Read usuario</Text>
                <Text>Update usuario</Text>
                <Text>Delete usuario</Text>
                <Button style={styles.button}
                    title={'Delete User '}
                    onPress={this.deleteAxios}
                    color='red'
                />

                <Button style={styles.button}
                    title={'User List Fetch'}
                    onPress={this.goForFetch}
                    color='green'
                />
                <Button style={styles.button}
                    title={'User List Axios'}
                    onPress={this.goForAxios}
                    color='green'
                />


                {this.state.fromFetch ?
                    <FlatList
                        data={this.state.dataSource}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        renderItem={item => this.renderItem(item)}
                        keyExtractor={item => item.id.toString()}
                    /> : <FlatList
                        data={this.state.axiosData}
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
    }
});

export default ServiceExample;