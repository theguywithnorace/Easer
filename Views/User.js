import React from 'react'
import {StyleSheet, View, ScrollView,ActivityIndicator, SafeAreaView, Text, Image, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import Checkboxes from '../src/Checkboxes'
import AwesomeAlert from 'react-native-awesome-alerts';
import {Button} from "react-native-elements";
import ImagePicker from 'react-native-image-picker';



class User extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showDeleteAlert: false,
            showAddAlert : false,
            renderingPicture : undefined,
            isLoading : false,
        }
        this.imageNumberToDelete= undefined;
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

    _displayLoadingCircle(){
        if(this.state.isLoading ){
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size="large" color='white' />
                </View>
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
                    <TouchableOpacity key={i} onPress={()=>{this.showAddAlert(i)}} onLongPress={ ()=>{this.showAlert(i)}} resizeMode='contain' style={styles.picture_opacity}>
                        <Image   style={styles.picture} source={this.props.userPictures[i]}/>
                    </TouchableOpacity>
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
                    <TouchableOpacity key={i} resizeMode='contain' onPress={()=>{this.showAddAlert(i)}} onLongPress={ ()=>{this.showAlert(i)}} style={styles.picture_opacity}>
                        <Image   style={styles.picture} source={this.props.userPictures[i]}/>
                    </TouchableOpacity>
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
        if(i<(this.props.userPictures.length-1)) {
            this.setState({
                showDeleteAlert: true,
            });
            this.imageNumberToDelete = i;
            console.log("DELETE");
            console.log(this.props.userPictures.length)
        }
    };
    showAddAlert  = (i) => {
        if(i === (this.props.userPictures.length-1)){
            this.setState({
                showAddAlert: true,
            });
            console.log("ADD");
            console.log(this.props.userPictures.length)
        }
    };

    deleteImage = () =>{
        const action = { type: "DELETE_IMAGE", value: this.imageNumberToDelete };
        this.props.dispatch(action);
        this.imageNumberToDelete=undefined;
    };

    addPictureFromFacebook = () => {

        this.setState({renderingPicture:''})
    }


    addPictureFromStorage = () => {
        const options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            this.setState({isLoading:true})
            console.log('Response = ', response);
            this._displayLoadingCircle();

            if (response.didCancel) {
                console.log('L\'utilisateur a annulé')
                this.setState({showAddAlert: false,});
            } else if (response.error) {
                console.log('Erreur : ', response.error)
                this.setState({showAddAlert: false,});

            } else {
                console.log('Photo : ', response.uri)
                let requireSource = {uri: response.uri}

                const action = {type: "ADD_IMAGE", value: requireSource};
                this.props.dispatch(action);
                this.setState({
                    showAddAlert: false,
                    isLoading : false});
            }
        })
    }

    hideAlert = () => {
        this.setState({
            showAddAlert: false,
            showDeleteAlert: false,
        });
    };

    render(){
        console.log("Global state of user profile : ")
        console.log(this.props.user)
        console.log(this.props)
        const {showDeleteAlert, showAddAlert} = this.state;
        return(
            <View>
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
                            <View style={{margin:2}}>
                                {this._showImages()}
                            </View>
                            <View style={styles.second_line_separator}/>
                            <Text style={styles.event_text}>Mes évenements</Text>
                            <Text style={styles.je_suis_text}>Aucun évenement prévu</Text>
                            <Text style={styles.je_suis_text}>Cliquez "Je participe" ou "interessé" aux évenements facebook auquels vous participez</Text>



                            <Text style={{color:'white'}}>
                                { JSON.stringify(this.props.user)}
                            </Text>
                            <Text style={{color:'white'}}>
                                { JSON.stringify(this.props.user)}
                            </Text>
                            <View style={styles.second_line_separator}/>
                            <View style={styles.second_line_separator}/>

                            <Button  title={'ADD PICTURES type 1'}
                                onPress={()=> {
                                const action = {type: "ADD_IMAGE", value: require('../Images/User/userpic.png')};
                                this.props.dispatch(action);
                                console.log(this.props.userPictures);
                                    this.setState({renderingPicture:''})

                                }
                            }/>

                            <Button  title={'ADD PICTURES type 2'}
                                     onPress={()=> {
                                         this.addPictureFromStorage()

                                     }
                                     }/>
                            <Button  title={'REMOVE PICTURES'}
                                     onPress={()=> {
                                         const action = {type: "DELETE_IMAGE", value: (this.props.userPictures.length-1)};
                                         this.props.dispatch(action);
                                         console.log("userPictures : "+this.props.userPictures)
                                         console.log("length" + this.props.userPictures.length);
                                         this.setState({renderingPicture:''})
                                     }
                                     }/>
                            <View style={{flex:1,   flexDirection: 'row',}}>
                                <TouchableOpacity resizeMode='contain' style={styles.picture}>
                                    <Image   style={styles.picture} source={require('../Images/User/userpic.png')}/>
                                </TouchableOpacity>
                                <TouchableOpacity resizeMode='contain' style={styles.picture}>
                                    <Image   style={styles.picture} source={require('../Images/User/profile_pic.png')}/>
                                </TouchableOpacity>
                                <TouchableOpacity resizeMode='contain' style={styles.picture}>
                                    <Image style={styles.picture} source={require('../Images/User/profile_pic.png')}/>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.second_line_separator}/>

                        </View>
                    </View>

                </ScrollView>
                {this._displayLoadingCircle()}

            </SafeAreaView>
            <AwesomeAlert
                show={showDeleteAlert}
                showProgress={false}
                title="Supprimer cette photo ?"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={true}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="Annuler"
                confirmText="Valider"
                confirmButtonColor="#DD6B55"
                onDismiss={() => {
                    this.hideAlert();
                }}
                onCancelPressed={() => {
                    this.hideAlert();
                }}
                onConfirmPressed={() => {
                    this.deleteImage();
                    this.hideAlert();

                }}
            />
            <AwesomeAlert
                show={showAddAlert}
                showProgress={false}
                title="Ajouter une photo depuis... "
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={true}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="Mes Photos"
                confirmText="Photos Facebook"
                cancelButtonColor='#F684F7'
                confirmButtonColor="#3a5eb6"
                onCancelPressed={() => {
                    this.addPictureFromStorage();
                    this.hideAlert();
                }}
                onConfirmPressed={() => {
                    this.deleteImage();
                    this.hideAlert();

                }}
         />
        </View>

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
    picture_opacity:{
        flex:1,
        width: undefined,
        height: undefined,
    },
    picture:{
        flex:1,
        margin:2,
        width: undefined,
        height: undefined,
        aspectRatio: 1,
    },color:{
        backgroundColor:'#3a5eb6'
    },
    loading_container:{
    position:'absolute',
        left:0,
        right:0,
        bottom:250,
        top:250,
        alignItems: 'center',
        justifyContent: 'center'
},
    event_text: {
        fontWeight: 'bold',
        fontFamily:'arial',
        fontSize:16,
        marginLeft: 10,
        marginTop:10
    },


})

const mapStateToProps = (state) => {
    return    {
        user: state.updateUserProfile.user,
        userPictures : state.updateUserPictures.userPictures
    }
}
export default connect(mapStateToProps)(User)
