import React from 'react'
import {StyleSheet, View, ScrollView, SafeAreaView, Text, Image, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'

class Settings extends React.Component {



    render(){
        return(
        <SafeAreaView>
            <ScrollView>
                <Text>
                    SETTINGS
                </Text>
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
