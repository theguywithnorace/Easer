import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import {Rating , AirbnbRating} from 'react-native-ratings';
import {connect} from "react-redux";

class Checkboxes extends React.Component{
      constructor(props){
          super(props)
          console.log("constructor props")
          console.log(this.props)

      }

      //Sending rating to Reducer in order to be added to userProfile
    _firstRatingCompleted =(rating) => {
        const action = { type: "TEUFEUR_STATUS", value: rating };
       this.props.dispatch(action)
    }

    _secondRatingCompleted = (rating) => {
        const action = { type: "UPDATE_MY_LOVER_STATUS", value: rating };
        this.props.dispatch(action)
    }

    render(){
        return(
                <View>
                    <View style={styles.main_container}>
                        <View style={styles.text_container_left}>
                            <Text style={styles.text}>Sage</Text>
                        </View>
                       <AirbnbRating
                        count={5}
                        defaultRating={this.props.user.teufeur}
                        size={32}
                        onFinishRating={this._firstRatingCompleted}
                       />
                        <View style={styles.text_container_right}>
                            <Text style={styles.text}>Fêtard</Text>
                         </View>
                    </View>
                    <View style={styles.main_container}>
                        <View style={styles.text_container_left}>
                            <Text style={styles.text}>Amis</Text>
                        </View>
                        <AirbnbRating
                            count={5}
                            defaultRating={this.props.user.lover}
                            size={32}
                            onFinishRating={this._secondRatingCompleted}
                        />
                        <View style={styles.text_container_right}>
                            <Text style={styles.text}>Amour</Text>
                        </View>
                      </View>
                </View>

        )
    }
}
const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        flexDirection:'row',
       // alignContent:'center',
        justifyContent:'space-around',
        marginVertical:5

     //   backgroundColor: 'grey'
    },
    text_container_left:{
        justifyContent:'center',
        marginLeft:10
    },text_container_right:{
        justifyContent:'center',
        marginRight:10
    },
    text:{
        bottom:1,
        fontWeight:'bold',
        color:'#313131',
        fontSize:15
        // alignContent:'center',
      //  justifyContent:'center',
    },

})


const mapStateToProps = (state) => {
    return    {
        user: state.updateUserProfile.user
    }
}
export default connect(mapStateToProps)(Checkboxes)


