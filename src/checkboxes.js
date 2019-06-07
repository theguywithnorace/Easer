import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'

class Checkboxes extends React.Component{

    render(){
        const{startText, endText}=this.props;
        return(
            <View style={styles.main_container}>
                <Text style={styles.text_container}>{startText}</Text>
                <TouchableOpacity style={styles.checkbox_container}>
                    <View style={styles.checkbox_itself}></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.checkbox_container}>
                    <View style={styles.checkbox_itself}></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.checkbox_container}>
                    <View style={styles.checkbox_itself}></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.checkbox_container}>
                    <View style={styles.checkbox_itself}></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.checkbox_container}>
                    <View style={styles.checkbox_itself}></View>
                </TouchableOpacity>
                <Text>{endText}</Text>

            </View>
        )
    }

}
const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'center',
        marginVertical:10,
    },
    checkbox_container:{
        width:45,
        height:45,
        resizeMode: 'contain',
      //  marginHorizontal:10
    },
    checkbox_itself:{
        width:25,
        height:25,
        borderRadius: 3,
        backgroundColor:'red'
    },
    text_container:{
       // justifyContent:'space-between',

    }
})
export default Checkboxes
