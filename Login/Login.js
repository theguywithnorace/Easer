import React from 'react'
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native'
import {AccessToken, GraphRequest, LoginManager, GraphRequestManager} from 'react-native-fbsdk'
import firebase from 'react-native-firebase'
//import {facebookLogin} from '../Functions/facebookLogin'

class Login extends React.Component{

    constructor(props) {
        super(props);
        this.saveUser={
            id: 1,
        };
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

                console.log("Firebase credential : ");
                console.log(firebaseUserCredential);
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
                    string: 'id, email, events'
                },

            }
        }, callback.bind(this));
        // Execute the graph request created above
        new GraphRequestManager().addRequest(infoRequest).start();
        console.log("----- Sending GRAPHAPI request ------")
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
            console.log("USER:" + x+ "    result.id : "+ result.id)
            console.log("event-id  :")
            console.log(result.events)
            console.log("---------------------");
            

        }
        this.saveUser.id=x
        console.log(this.saveUser.id)
    }


    render(){
        let req = new GraphRequest('/me', {
            httpMethod: 'GET',
            version: 'v2.5',
            parameters: {
                'fields': {
                    'string' : 'email,name,friends'
                }
            }
        }, (err, res) => {
            console.log("HEY"+err, res);
        });

        return(
            <View style={styles.main_container}>
                <View style={styles.logo_container}>
                    <Image source={require('../Images/Login/logo_bouteilles_noBackground.png')}
                           style={styles.logo}
                    />
                    <Text style={styles.logo_text}>EASER</Text>
                </View>
                <View style={{alignItems:'flex-end'}}>
                    <TouchableOpacity style={styles.FBButton}
                                      onPress={() => {this.facebookLogin().then(
                                      //    this.props.navigation.navigate("Home")
                                      )}}
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
export default Login;
