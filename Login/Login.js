import React from 'react'
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native'
import {AccessToken,LoginButton, GraphRequest, LoginManager} from 'react-native-fbsdk'
import * as firebase from 'firebase'

class Login extends React.Component{

    constructor(props) {
        super(props);
    }


fbconnect = () => {
    const { navigate } = this.props.navigation;

    LoginManager.logInWithReadPermissions(["public_profile","user_events","user_photos"])
        .then(
            function (result) {
                if (result.isCancelled) {
                    console.log("Login cancelled");
                } else {
                    console.log(
                        "Login success with permissions: " +
                        result.grantedPermissions.toString()
                    );
                    console.log(AccessToken.getCurrentAccessToken());
                    console.log(AccessToken);

                    const credential = firebase.auth.FacebookAuthProvider.credential('594719077710798');
                    firebase.auth().signInWithCredential(credential).catch((error) =>{
                        console.log(error)
                    })
                    navigate("Home");
                    AccessToken.getCurrentAccessToken().then((data)=>{
                        const infoRequest = new GraphRequest(
                            '/me?fields=name,picture',
                            null,
                            this._responseInfoCallback
                        )
                        }

                    )


                }
            },
            function (error) {
                console.log("Login fail with error: " + error);
            }
        )

    }

    _responseInfoCallback = (error, result) => {
        if (error) {
            alert('Error fetching data: ' + error.toString());
        } else {
            alert('Result Name: ' + result.name);
        }
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
                                      onPress={()=>{this.fbconnect()}}
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
