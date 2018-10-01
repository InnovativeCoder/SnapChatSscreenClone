import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Camera, Permissions} from 'expo'
import {Container, Content, Header, Item, Icon, Input, Button} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default class Cameracomp extends Component {

  state ={
      hasCameraPermission : null,
      type: Camera.Constants.Type.back
  }

  async componentWillMount(){
      const {status} = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({ hasCameraPermission: status === 'granted'})
  }

  render() {
    
      const {hasCameraPermission} = this.state

      if(hasCameraPermission === null){
          return <View />
      }else if(hasCameraPermission === false){
          return <Text>No access to camera</Text>
      }
      else {
          return(
        <View style={{flex: 1}}>
            <Camera style={{flex: 1, justifyContent:'space-between'}} type={this.state.type} >
                <Header searchabar rounded
                    style={{
                        position: 'absolute', backgroundColor: 'transparent',
                        left: 0, top: 10, right:0 , zIndex: 100, alignItems: 'center', justifyContent:'space-around',
                    }}
                >
                    <View style={{flexDirection: 'row', flex: 4, }}>

                        
                        <Item style = {{backgroundColor: 'transparent'}}>
                            <Icon name='logo-snapchat' style={{color: 'white'}} />
                            <Icon name='ios-search' style={{color: 'white', fontSize: 24, fontWeight: 'bold'}} />
                            <Input placeholder="Search"
                            placeholderTextColor="white"/>
                        </Item>
                    </View>
                    <View style = {{flexDirection: 'row', flex: 2, justifyContent:'space-around'}}>
                        <Icon name='ios-flash' style={{color:'white', fontWeight:'bold'}}/> 
                        <Icon 
                        onPress={() => {
                            this.setState({
                                type: this.state.type === Camera.Constants.Type.abck ?
                                    Camera.Constants.Type.front:
                                    Camera.Constants.Type.back
                            })
                        }}
                        name='ios-reverse-camera' style={{color:'white', fontWeight:'bold'}}/> 
                    </View>
                </Header>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 15, alignItems:'flex-end'}}>
                        <MaterialCommunityIcons name="message-reply" style={{color:'white', fontSize: 36 }}/>
                        <View style={{ alignItems: 'center'}}>
                        <MaterialCommunityIcons name="circle-outline" style={{color:'white', fontSize: 100 }}/>
                        <Icon name="ios-images" style={{color:'white', fontSize: 36 }}/>
                        </View>
                        <MaterialCommunityIcons name="google-circles-communities" style={{color:'white', fontSize: 36 }}/>
                </View>
            </Camera>
        </View> )
      }
  }
}
