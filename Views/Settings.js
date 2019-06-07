import React from 'react'
import {StyleSheet, View, ScrollView, SafeAreaView, Button, Text, Image, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'

class Settings extends React.Component {

    _disconnect(){
        const action = { type: "DISCONNECT_USER", value: null };
        this.props.dispatch(action);
        this.props.navigation.navigate("Login")
    }

    render(){
        return(
        <SafeAreaView>
            <ScrollView>
                <Text>
                    SETTINGS
                </Text>
                <Button onPress={()=>{this._disconnect()}}
                        title="disconnect"/>
            </ScrollView>
        </SafeAreaView>
        )
    }

}
const mapStateToProps = (state) => {
    return    {
        user: state.updateUserProfile.user
    }
}
export default connect(mapStateToProps)(Settings)
