import React from 'react'
import { StyleSheet, View, SafeAreaView, Text, Image  } from 'react-native'

class Settings extends React.Component{

    constructor(props){
        super(props);
        this.state={
            myFriends:{},
            myMatchs:{},

        }
        this.user={
            id: undefined,
            name:'',
            avatar_picture:undefined,
            pictures:{},
            my_events:{},
        }
    }


}
