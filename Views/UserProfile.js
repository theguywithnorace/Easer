import React from 'react'
import { StyleSheet, View, SafeAreaView, Text, Image  } from 'react-native'
import {connect} from 'react-redux'

class UserProfile extends React.Component{

    constructor(props){
        super(props);
        this.state={
            myFriends:{},
            myMatchs:{},
        }
    }

    render(){
        console.log("Global state of user profile : ")
        console.log(this.props.user)
        return(
            <View>
                <SafeAreaView>
                    <Text>
                        { JSON.stringify(this.props.user)}
                    </Text>
                </SafeAreaView>
            </View>
        )
    }


}
const mapStateToProps = (state) => {
    return    {
        user: state.updateUserProfile.user
    }
}
export default connect(mapStateToProps)(UserProfile)
