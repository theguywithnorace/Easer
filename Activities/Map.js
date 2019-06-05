import React from 'react'
import { TouchableOpacity, TouchableHighlight, Image, StyleSheet, View, Text } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import RNLocation from "react-native-location";


class Map extends React.Component {
    constructor() {
        super();
        this.state = {
            location: null,
            region:{
                latitude: 48.8,
                longitude: 2.34,
                latitudeDelta: 0.5,
                longitudeDelta: 0.5,
            },
        };
        this.centeringMap = false;
        this.firstLocationUpdate = true;
        this.region={
            latitude: 48.8,
            longitude: 2.34,
            latitudeDelta: 0.12,
            longitudeDelta: 0.1222,
        };
    }

    componentWillMount() {
        RNLocation.configure({
            distanceFilter: 2.0
        });

        RNLocation.requestPermission({
            ios: "whenInUse",
            android: {
                detail: "fine",
                rationale: {
                    title: "Location permission",
                    message: "We use your location to demo the library",
                    buttonPositive: "OK",
                    buttonNegative: "Cancel"
                }
            }
        }).then(granted => {
            if (granted) {
                this._startUpdatingLocation();
            }
        });
    }

    _startUpdatingLocation =  () => {
        this.locationSubscription = RNLocation.subscribeToLocationUpdates(
            locations => {
                if (!this.centeringMap) {                   //to stop charging the position when changing the region
                    if (this.centerMap || this.firstLocationUpdate) {
                        console.log("in update function with centeringMap, this.centerMap : ");
                        console.log("this.centerMap : " + this.centerMap)
                        console.log("this.firstLocationUpdate : " + this.firstLocationUpdate)
                        this.setState({
                            location: locations[0],

                        });
                        this.region = {
                            latitude: locations[0].latitude,
                            longitude: locations[0].longitude,
                            latitudeDelta: 0.02,
                            longitudeDelta: 0.0222,
                        }
                        this.centerMap = false;
                        this.firstLocationUpdate = false;
                    } else {
                        this.setState({
                            location: locations[0],
                        })
                    }
                }
            }
        );
    };

    _centerMap(){
        this.centerMap=true;
        console.log("centerMap pressed");
        console.log(this.centerMap)
        this.region = {
            latitude: this.state.location.latitude,
            longitude: this.state.location.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.0222,
        }
        this.setState(this.state);      //to force re-rendering at the click with the new region
    }



    componentWillUnmount(): void {
        this.locationSubscription && this.locationSubscription();
        this.setState({ location: null });
    }

    onRegionChange = (region) => {
        this.region = region;
        this.centeringMap=true;
        console.log("centerMap pressed");
    }

    onRegionChangeComplete = (region) => {
        this.centeringMap=false;
        console.log("RRRegionChangeComplete")
    }

    render() {
        const {location} = this.state
        console.log("RENDERING - this.centerMap : " + this.centerMap + " + location : " + location)
        console.log("this.firstLocationUpdate : " + this.firstLocationUpdate)
        console.log("region : lat " + this.state.region.latitude +"/ long "+ this.state.region.longitude)
        return (
            <View style={styles.main_container}>
                {location && (
                    <React.Fragment>
                        <MapView
                            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                            style={styles.map}
                            initialRegion={{
                                latitude:location.latitude,
                                longitude:location.longitude,
                                latitudeDelta: 0.02,
                                longitudeDelta: 0.0222,
                            }}
                            region={this.region}
                            onRegionChange={this.onRegionChange}
                            onRegionChangeComplete={this.onRegionChangeComplete}
                        >
                            <Marker
                                coordinate={{latitude: location.latitude, longitude: location.longitude}}
                            />

                            {console.log(location.latitude)}


                        </MapView>
                        <TouchableOpacity
                            style={styles.centeringButton}
                            onPress={()=>{this._centerMap();}}
                        >
                            <Image source={require('../Images/Map/center_blue.png')}
                                   style={styles.centering_image}/>
                        </TouchableOpacity>


                    </React.Fragment>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    map: {
        flex:1
        //   ...StyleSheet.absoluteFillObject,
    },
    centeringButton:{
        position:'absolute',
        width: 50,
        height:50,
        // padding:12,
        borderColor: '#f5f5f5',
        borderWidth: 3,
        borderRadius: 25,
        bottom:30,
        right:30,
        backgroundColor: 'white',
        alignItems:'center',
        justifyContent:'center',
    },
    centering_image:{
        width: 21,
        height:21,
        alignItems:'center',
        justifyContent:'center',
    }
})

export default Map
