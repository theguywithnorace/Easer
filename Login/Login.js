import React from 'react'
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native'
import {AccessToken, GraphRequest, LoginManager, GraphRequestManager} from 'react-native-fbsdk'
import moment from 'moment'
import firebase from 'react-native-firebase'
import {connect} from 'react-redux'


class Login extends React.Component{

    constructor(props) {
        super(props);
        this.state= {
            user: {},
            myEvents: []
        }
        if(this.props.user.isConnected){
            this.props.navigation.navigate("Home")
        }
        console.log(" user is connected in constructor ? "+ this.props.user.isConnected)
    }



    async facebookLogin() {

        try {
            const result = await LoginManager.logInWithReadPermissions(['public_profile', 'user_events']);

            if (result.isCancelled) {
                this.props.navigation.navigate("Login")
            } else {
                this.props.navigation.navigate("Home")

                console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);
                console.log("Result : ")
                console.log(result);

                // get the access token
                const data = await AccessToken.getCurrentAccessToken();
                console.log(AccessToken.getCurrentAccessToken());
                console.log(data)

                this.FBGraphRequest(data, this.FBLoginCallback)
                if (!data) {
                    // handle this however suites the flow of your app
                    alert('Something went wrong obtaining the users access token');
                    this.props.navigation.navigate("Login")
                }

                // create a new firebase credential with the token then login with this credential
                const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
                const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

                console.log(firebaseUserCredential);
                this._updateProfileByFirebase(firebaseUserCredential)

            }
        } catch (e) {
            console.error(e);
        }

    }

    async FBGraphRequest(data, callback) {
        // Create a graph request asking for user information
        const infoRequest = new GraphRequest('/me', {
            accessToken: data.accessToken,
            parameters: {
                fields: {
                    string: 'id, email, events, picture'
                },

            }
        }, callback.bind(this));
        // Execute the graph request created above
        new GraphRequestManager().addRequest(infoRequest).start();
    }

    async FBLoginCallback(error, result) {
let x;
        if (error) {
            this.setState({
                showLoadingModal: false,
                notificationMessage: "error"
        });
            console.log("ERROR in GraphAPI")
        } else {
            // Retrieve and save user details in state. In our case with
            // Redux and custom action saveUser
            x = result.id;
            console.log("---------------------");
            console.log("EVENTS  :")
            console.log(result.events.data)
            console.log("---------------------");
            this._updateMyEvents(result)
        }
    }

    _updateProfileByFirebase = (credential) => {
        this.setState({
                user: {
                    idFirebase: credential.user._user.uid,
                    idFacebook: credential.additionalUserInfo.profile.id,
                    name: credential.additionalUserInfo.profile.first_name,
                    avatar_picture: credential.additionalUserInfo.profile.picture.data.url,
                    isConnected: true
                }
        })
        const action = { type: "UPDATE_PROFILE", value: this.state.user };
        this.props.dispatch(action)
    }

    _updateMyEvents = (result) =>{
        let futureEvents =[];

        for(var i=0; i<result.events.data.length;i++ ){
            if(result.events.data[i].end_time > moment().format() )
                futureEvents.push(result.events.data[i])
        }
        const action = { type: "UPDATE_MY_EVENTS", value: futureEvents };
        this.props.dispatch(action)
        console.log(this.props.user.myFutureEvents)
    }

    render(){
        if(!this.props.user.isConnected) {
            return (
                <View style={styles.main_container}>
                    <View style={styles.logo_container}>
                        <Image source={require('../Images/Login/logo_bouteilles_noBackground.png')}
                               style={styles.logo}
                        />
                        <Text style={styles.logo_text}>EASER</Text>
                    </View>
                    <View style={{alignItems: 'flex-end'}}>
                        <TouchableOpacity style={styles.FBButton}
                                          onPress={() => {
                                              this.facebookLogin().then(
                                                  //    this.props.navigation.navigate("Home")
                                              )
                                          }}
                        >
                            <Image
                                source={require('../Images/Login/facebook_letter.png')}
                                style={styles.fBLogo}
                            />
                            <Text style={styles.text_connexion}>Connexion</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate("Home")
                        }}
                    >
                        <Text style={styles.text_pq_fb}>Pourquoi uniquement par Facebook ?</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return null
        }
    }
}
const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: '#0e0d4b',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    logo_container:{
        width:340,
        height:340,
        alignItems: 'center'

    },
    logo:{
        width:240,
        height:240,
        resizeMode: 'contain'
    },
    logo_text:{
        fontSize:40,
        margin:22,
        color: 'white',
        fontFamily:'OratorStd',
        fontWeight: 'bold'
    },
    FBButton:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#294b9d',
        marginHorizontal:75,
        marginTop:80,
        height:38,
        width:270,
        borderRadius:4
    },
    fBLogo:{
        width: 24,
        height: 29,
        marginRight:15,
    },
    text_connexion:{
        color:'white',
        fontSize: 21,
        fontFamily: 'WeblySleekUILight',
        //  fontWeight: 'bold'

        // justifyContent:'center',
    },
    text_pq_fb:{
        //  textDecorationLine:'underline',
        color:'grey',
        margin:10,
        fontSize: 9,
        marginBottom:80
    }
})
const mapStateToProps = (state) => {
    return    {
        user: state.updateUserProfile.user
    }
}
export default connect(mapStateToProps)(Login)
