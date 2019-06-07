import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import { Rating, AirbnbRating } from 'react-native-ratings';

class Checkboxes extends React.Component{
      constructor(props){
          super(props)
          this.note = 3;

      }

    ratingCompleted(rating) {
        console.log("Rating is: " + rating)
    }

    render(){
        const{startText, endText}=this.props;
        console.log(" NOOOTTTEEE: " + this.note)
        return(
              /*  <View style={styles.main_container}>
                    <View style={styles.text_container}>
                        <Text style={styles.text}>{startText}</Text>
                    </View>*/
            <View>

                <AirbnbRating
            count={5}
            defaultRating={3}
            size={32}
            onFinishRating={this.ratingCompleted}
            />
            </View>

        /*  <View style={{flexDirection:'row'}}>
              <TouchableOpacity style={styles.checkbox_container}
                                  onPress={()=>{this.note=1;
                                  console.log(" NOOOTTTEEE: " + this.note)}}>
                  <View style={styles.checkbox_itself}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.checkbox_container}
                                onPress={()=>{this.note=2;
                                    console.log(" NOOOTTTEEE: " + this.note)}}>
                  <View style={styles.checkbox_itself}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.checkbox_container}
                                onPress={()=>{this.note=3;
                                    console.log(" NOOOTTTEEE: " + this.note)}}>
                  <View style={styles.checkbox_itself}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.checkbox_container}
                                onPress={()=>{this.note=4;
                                    console.log(" NOOOTTTEEE: " + this.note)}}>
                  <View style={styles.checkbox_itself}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.checkbox_container}
                                onPress={()=>{this.note=5;
                                    console.log(" NOOOTTTEEE: " + this.note)}}>
                  <View style={styles.checkbox_itself}/>
              </TouchableOpacity>
          </View>
          <View style={styles.text_container}>
              <Text style={styles.text}>{endText}</Text>
          </View>
          </View> */

        )
    }
}
const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        flexDirection:'row',
       // alignContent:'center',
        justifyContent:'space-around',

     //   backgroundColor: 'grey'
    },
    checkbox_container:{
        width:40,
        height:40,
        resizeMode: 'contain',
        alignContent:'center',
        justifyContent:'center',
      //  marginHorizontal:10
    },
    checkbox_itself:{
        width:25,
        height:25,
        borderRadius: 3,
        backgroundColor:'#0e0d4b'
    },
    text_container:{
       // backgroundColor:'red',
        //alignContent:'center',
        justifyContent:'center',
        marginHorizontal:10
       // justifyContent:'space-between',

    },
    text:{
        bottom:1,
       // alignContent:'center',
      //  justifyContent:'center',
    }

})
export default Checkboxes
