import React from 'react'
import { StyleSheet, View,ScrollView, SafeAreaView, Text, Image  } from 'react-native'
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
            <ScrollView>
                <SafeAreaView>
                    <Text>
                        { JSON.stringify(this.props.user)}
                    </Text>
                    <Text>
                        { this.props.user.myEvents[0].end_time}
                    </Text>
                    <Image style={{width: 50, height: 50}}
                        source={{uri: this.props.user.avatar_picture}}/>
                </SafeAreaView>
            </ScrollView>
        )
    }


}
const mapStateToProps = (state) => {
    return    {
        user: state.updateUserProfile.user
    }
}
export default connect(mapStateToProps)(UserProfile)
