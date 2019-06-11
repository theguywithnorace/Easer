import { Rating, AirbnbRating } from 'react-native-ratings';
import React from 'react'

import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'


const WATER_IMAGE = require('../Images/User/user_bold.png')

export default class Test extends React.Component {
    ratingCCompleted(rating) {
        console.log("Rating CC is: " + rating)
    }
    ratingCompleted(rating) {
        console.log("Rating c is: " + rating)
    }

    render(){
        return(

    <View>

<
    AirbnbRating
    count = {5}
rating = {5}
size = {40}
    onFinishRating = {this.ratingCCompleted}

/>

        <
            AirbnbRating
            count = {5}
            rating = {5}
            size = {40}
            onFinishRating = {this.ratingCompleted}

        />

<Rating
    showRating
    onFinishRating={this.ratingCompleted}
    style={{paddingVertical: 10}}
/>

< Rating
type = 'heart'
ratingCount = {3}
imageSize = {60}
showRating
onFinishRating = {this.ratingCompleted}
/>

<Rating
    type='custom'
    ratingImage={WATER_IMAGE}
    ratingColor='#3498db'
    ratingBackgroundColor='#c8c7c8'
    ratingCount={10}
    imageSize={30}
    onFinishRating={this.ratingCompleted}
    style={{paddingVertical: 10}}
/>
</View>
)}
}
