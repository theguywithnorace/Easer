import React from 'react'
import {StyleSheet, View, ScrollView, SafeAreaView, Text, Image, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'

class User extends React.Component{

    constructor(props){
        super(props);
        this.state={
            myFriends:{},
            myMatchs:{},
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
            headerRight: (
                <TouchableOpacity onPress={() => navigation.navigate('Settings')}
                                  i={"info"}
                                  color='red'>
                    <Image
                        source={require('../Images/User/menu_icon.png')}
                        style={{
                            width: 30,
                            height: 30,
                            margin: 12
                        }}
                    />
                </TouchableOpacity>
            )
        }
    }

    render(){
        console.log("Global state of user profile : ")
        console.log(this.props.user)
        return(
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.top_container}>
                        <Image style={styles.avatar} source={{uri: this.props.user.avatar_picture}}/>
                        <View>
                            <Text style={styles.number}>{this.props.user.myEvents.length}</Text>
                            <Text style={styles.type_of_number}>Je suis plutot du genre...</Text>
                        </View>
                        <View>
                            <Text style={styles.number}>Je suis plutot du genre...</Text>
                            <Text style={styles.type_of_number}>Je suis plutot du genre...</Text>
                        </View>
                    </View>
                    <Text style={styles.name_text}>{this.props.user.name}</Text>
                    <Text style={styles.je_suis_text}>Je suis plutot du genre...</Text>


                    <Text style={{color:'white'}}>
                        { JSON.stringify(this.props.user)}
                    </Text>
                    <Text>
                        { this.props.user.myEvents[0].end_time}
                    </Text>
                </ScrollView>
            </SafeAreaView>

        )
    }


}
const styles = StyleSheet.create({
    top_container:{
        flexDirection: 'row',

    },avatar:{
        width: 90,
        height: 90,
        borderRadius: 45,
        borderColor: '#cacaca',
        borderWidth: 1,
        margin: 15,

    },number:{
        fontFamily:'arial',
        fontSize:25,
    },type_of_number:{
        fontFamily:'arial',
        fontSize:12,
        color:'#6d6d6d',
    },name_text: {
        fontWeight: 'bold',
        fontFamily:'arial',
        fontSize:16,
        marginLeft: 10
    },
    je_suis_text: {
        fontFamily:'arial',
        fontSize:15,
        color:'#6d6d6d',
        marginLeft: 10

    },
    icon_style:{
        width:35,
        height:35,
        resizeMode: 'contain'

    },
})

const mapStateToProps = (state) => {
    return    {
        user: state.updateUserProfile.user
    }
}
export default connect(mapStateToProps)(User)
