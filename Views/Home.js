import React from 'react'
import { StyleSheet, View, SafeAreaView, Text, TouchableOpacity, Image, BackHandler } from 'react-native'
import {IndicatorViewPager,PagerTabIndicator, PagerTitleIndicator, PagerDotIndicator } from 'rn-viewpager'
import Map from './Map'
import Swiper from './Swiper'
import Messaging from './Messaging'



class Home extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            headerRight: (
                <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}
                                  i={"info"}
                                  color='red'>
                    <Image
                        source={require('../Images/User/user.png')}
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

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }

    onBackPress = () => {
            BackHandler.exitApp();
    }

    _renderTabIndicator() {
        let tabs = [{
            iconSource: require('../Images/HomeTabs/map.png'),
            selectedIconSource: require('../Images/HomeTabs/map_filled.png'),
        },{
            iconSource: require('../Images/HomeTabs/fire.png'),
            selectedIconSource: require('../Images/HomeTabs/fire_filled.png'),
        },{
            iconSource: require('../Images/HomeTabs/message.png'),
            selectedIconSource: require('../Images/HomeTabs/message_filled.png'),
        }];
        return <PagerTabIndicator
            iconStyle={styles.icon_style}
            selectedIconStyle={styles.icon_style}
            tabs={tabs} />;
    }
    render() {
        return (
            <View style={{flex:1}}>

                <SafeAreaView style={{flex:1}}>
                    <IndicatorViewPager
                        style={{flex:1,  backgroundColor:'white'}}
                        indicator={this._renderTabIndicator()}
                    >
                        <View style={{backgroundColor:'white'}}>
                            <Map/>
                        </View>
                        <View style={{backgroundColor:'cornflowerblue'}}>
                            <Swiper/>
                        </View>
                        <View style={{backgroundColor:'#1AA094'}}>
                            <Messaging/>
                        </View>
                    </IndicatorViewPager>
                </SafeAreaView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    icon_style:{
        width:35,
        height:35,
        resizeMode: 'contain'

    },
})

export default Home
