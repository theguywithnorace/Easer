import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import {connect} from "react-redux";
import {Image} from "react-native-elements";

class ProfilePic extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={{flex:1,   flexDirection: 'row',}}>
                <Image style={styles.picture} resizeMode='contain' source={require('../Images/User/profile_pic.png')}/>
                <Image style={styles.picture} resizeMode='contain' source={require('../Images/User/profile_pic.png')}/>
                <Image style={styles.picture} resizeMode='contain' source={require('../Images/User/profile_pic.png')}/>
            </View>


        )
    }
}
const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        flexDirection: 'row',
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
        user: state.updateUserProfile.user
    }
}
export default connect(mapStateToProps)(ProfilePic)


/*
for (var i = 0; i < 10; i++) {
      images.push(
        <TouchableOpacity key={i} activeOpacity={0.75} style={styles.item}>
          <Image style={styles.image} source={{ uri: temp }} />
        </TouchableOpacity>
      );
    }

    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          {images}
        </View>
      </ScrollView>
    );
 */
