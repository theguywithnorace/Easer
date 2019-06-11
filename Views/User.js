import React from 'react'
import {StyleSheet, View, ScrollView, SafeAreaView, Text, Image, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import Checkboxes from '../src/Checkboxes'
import AwesomeAlert from 'react-native-awesome-alerts';
import {Button} from "react-native-elements";


class User extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showAlert: false,
        }
        this.imageNumberToDelete= undefined;
    //    this.props.userPictures = [require('../Images/User/profile_pic.png'),require('../Images/User/profile_pic.png')];
      //  const action = { type: "ADD_IMAGE", value: null };
       // this.props.dispatch(action);
        console.log("constructor props")
        console.log(this.props)
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


    _showImages = () => {
        console.log("PROPS>>>>>")
        console.log(this.props.userPictures)
        let firstLineImages =[];
        let secondLineImages =[];

        //création de la première ligne
        for (let i = 0; i <=2 ; i++) {
                firstLineImages.push(
                        <Image key={i} style={styles.picture} resizeMode='contain' source={this.props.userPictures[i]}/>
                           )
            }

        //affichage conditionnel de la 1ere ligne
        if(this.props.userPictures.length<=3) {
            return (
                <View style={{flex: 1, flexDirection: 'row',}}>
                    {firstLineImages}
                </View>
            )
        } else {  //creation conditionelle de la 2e ligne
            for (let i = 3; i <=5; i++) {
                secondLineImages.push(
                    <Image key={i} style={styles.picture} resizeMode='contain' source={this.props.userPictures[i]}/>
                )
                console.log("second line image")
                console.log(secondLineImages)
            }
        }
        return ( //affichage conditionel des deux lignes
           <View>
                    <View style={{flex:1, flexDirection: 'row',}}>
                        {firstLineImages}
                    </View>
                    <View style={{flex:1, flexDirection: 'row',}}>
                        {secondLineImages}
                    </View>
            </View>
        )
    }

    showAlert = (i) => {
        this.setState({
            showAlert: true,
        });
        this.imageNumberToDelete=i;
    };

    deleteImage = () =>{
        const action = { type: "DELETE_IMAGE", value: this.state.imageNumberToDelete };
        this.props.dispatch(action);
        this.imageNumberToDelete=undefined;
    }

    hideAlert = () => {
        this.setState({
            showAlert: false
        });
    };

    render(){
        console.log("Global state of user profile : ")
        console.log(this.props.user)
        console.log(this.props)
        const {showAlert} = this.state;
        return(
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.top_container}>
                        <Image style={styles.avatar} source={{uri: this.props.user.avatar_picture}}/>
                        <View style={styles.number_container_container}>
                            <View style={styles.number_container}>
                                <Text style={styles.number}>{this.props.user.myFutureEvents.length}</Text>
                                <Text style={styles.type_of_number}>Evénements Facebook</Text>
                            </View>
                            <View style={styles.number_container}>
                                <Text style={styles.number}>25</Text>
                                <Text style={styles.type_of_number}>Matchs</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.name_text}>{this.props.user.name}</Text>
                    <Text style={styles.je_suis_text}>Je suis plutôt du genre...</Text>
                    <View>
                        <View>
                            <View style={{margin:10}}>
                                <Checkboxes/>
                            </View>
                            <View style={styles.first_line_separator}/>
                                {this._showImages()}
                            <View style={styles.second_line_separator}/>
                            <View style={styles.second_line_separator}/>
                            <View style={styles.second_line_separator}/>
                            <Button  title={'ADD PICTURES type 1'}
                                onPress={()=> {
                                const action = {type: "ADD_IMAGE", value: require('../Images/User/userpic.png')};
                                this.props.dispatch(action);
                                console.log(this.props.userPictures)
                            }
                            }/>
                            <Button  title={'ADD PICTURES type 2'}
                                     onPress={()=> {
                                         const action = {type: "ADD_IMAGE", value: require('../Images/User/profile_pic.png')};
                                         this.props.dispatch(action);
                                         console.log(this.props.userPictures)
                                     }
                                     }/>
                            <Button  title={'REMOVE PICTURES'}
                                     onPress={()=> {
                                         const action = {type: "DELETE_IMAGE", value: (this.props.userPictures.length-1)};
                                         this.props.dispatch(action);
                                         console.log(this.props.userPictures)
                                         console.log(this.props.userPictures.length)
                                     }
                                     }/>
                            <View style={{flex:1,   flexDirection: 'row',}}>
                                <Image style={styles.picture} resizeMode='contain' source={require('../Images/User/profile_pic.png')}/>
                                <Image style={styles.picture} resizeMode='contain' source={require('../Images/User/profile_pic.png')}/>
                                <Image style={styles.picture} resizeMode='contain' source={require('../Images/User/profile_pic.png')}/>
                            </View>
                            <View style={{flex:1,   flexDirection: 'row',}}>
                                <Image style={styles.picture} resizeMode='contain' source={require('../Images/User/profile_pic.png')}/>
                                <Image style={styles.picture} resizeMode='contain' source={require('../Images/User/profile_pic.png')}/>
                                <Image style={styles.picture} resizeMode='contain' source={require('../Images/User/userpic.png')}/>
                            </View>
                            <View style={styles.second_line_separator}/>

                        </View>
                    </View>
                    <AwesomeAlert
                        show={showAlert}
                        showProgress={false}
                        title="Supprimer cette photo ?"
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={true}
                        showCancelButton={true}
                        showConfirmButton={true}
                        cancelText="Annuler"
                        confirmText="Valider"
                        confirmButtonColor="#DD6B55"
                        onCancelPressed={() => {
                            this.hideAlert();
                        }}
                        onConfirmPressed={() => {
                            this.deleteImage();
                        }}
                    />
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
        height: undefined,
        aspectRatio: 1,
        borderRadius: 45,
        borderColor: '#cacaca',
        borderWidth: 1,
        margin: 19,

    },number_container_container:{
        flexDirection: 'row',
        flex:1,
        justifyContent:'center'
    },
    number_container:{
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal:20
    },
    number:{
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
        marginLeft: 10,
        marginTop:6
      //  backgroundColor:'pink'

    },
    icon_style:{
        width:35,
        height:35,
        resizeMode: 'contain'

    },
    first_line_separator:{
        backgroundColor:'#cbcbcb',
        height:0.4,
    },
    second_line_separator:{
        backgroundColor:'#cbcbcb',
        height:0.4,
        marginVertical:3
    },
    picture:{
        flex:1,
        margin:2,
        width: undefined,
        height: undefined,
        aspectRatio: 1,    }

})

const mapStateToProps = (state) => {
    return    {
        user: state.updateUserProfile.user,
        userPictures : state.updateUserPictures.userPictures
    }
}
export default connect(mapStateToProps)(User)
