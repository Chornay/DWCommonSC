import React, { Component } from 'react'
import Geolocation from 'react-native-geolocation-service';

import { View, Dimensions, Platform, addons } from 'react-native'
import { Root } from 'native-base';
import { SpinnerXYZ } from 'DWcmn/GCNB';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import { prjCheckLocationPermission } from 'DWcmn/prjcmnLocationFunctions'
import { prjAlert } from 'DWcmn/PrjCmnFunctions'
import GCHeader from 'DWcmn/GCHeader'
import { GCUserTextWithPlaceholder } from 'DWcmn/Gc'
import { GCPencil } from './Gc';
import { CmnTouchableEdit } from 'DWcmn/CmnTouchableEdit'
import GCFooterForIcons, { GCFooterCmdIcon } from 'DWcmn/GCFooterForIcons'
import { COLORS } from 'DWcmn/Global'
import { GCI18n, GCText } from './Gc';
import { PrjFabMapCurrPos } from 'DWcmn/Prj'
import { strX } from 'DWcmn/I18n';
import { GC_STD_MARGIN, GC_MIN_MARGIN } from 'DWcmn/Global'
import { prjToast } from 'DWcmn/PrjToast'


//20221113 fix await errors in geocoding
//20240914 created from CmnAddressOrStopInput
//20260302 fixed iOS render world map

const { width: SCREEN_WIDTH } = Dimensions.get('window') || {};
const { height: SCREEN_HEIGHT } = Dimensions.get('window') || {};

//prop title
//prop requestPermission
//prop defaultAddress //both Location and Address must be supplied
//prop defaultLocation
//prop onSelect(location,address)
//
//prop onCancel()
//prop onRemove() optional .. gives REMOVE button (used only for alternate address?)
//prop buttonI18n (optional .. defaults to 'Confirm' at the bottom) REMOVED
//prop buttonCode (optional ICON_WITH_TEXT code .... defaults to 'Confirm with check')
//NOTE even if default address is specified we will use current location if it is available.
//NOTE will .goBack when finished.//TODO this is no longer correct????
export class CmnAddressInput extends Component {

   constructor() {
      // Geocoder.init('AIzaSyCKWzq24yA3vrjiNV0TXK4Zq9I_9Bxorn0') //TODO move this .. only need once 
      // Geocoder.init('AIzaSyAwsYSXjC5IFjq_-33E0zAdq7TDLkl2Cf4') //TODO move this .. only need once 
      Geocoder.init('AIzaSyCWJHXmu4XklJBidVN_zR-hFHzQp7q1hmA') //TODO move this .. only need once 
      super();
      this.state = {
         currLocation: null,
         currAddress: '',
         placeId: null,
         isComponentInitialized: false,
      };
      this.isStopMode
      this.weHaveLocPermission = false
   } //end constuctor

   async componentDidMount() {

      this.weHaveLocPermission = await prjCheckLocationPermission(this.props.requestPermission)

      //we start the map centred at the location given us
      //or we go to the phone's location
      //or we have no address
      if (this.props.defaultLocation) {
         this.setState({ currLocation: this.props.defaultLocation })
         this.setState({ currAddress: this.props.defaultAddress })
         this.setState({ isComponentInitialized: true });
      }
      else if (this.weHaveLocPermission) {
         Geolocation.getCurrentPosition(
            async (position) => {//success ... got position
               this.setState({ currLocation: position.coords })
               await this.setAddressFromLocation(position.coords, true)
               this.setState({ isComponentInitialized: true });
            }, //failure
            (error) => { // really don't expect an error .. we have permission
               prjAlert(error.message)
               this.setState({ currLocation: null })
               this.setState({ currAddress: '' })
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
         );
      }
      else { //we got nothing .. show no map until they enter an address
         this.setState({ currLocation: null })
         this.setState({ currAddress: '' })
         this.setState({ isComponentInitialized: true });
      }
   }//end componentDidMount

   render() {

      if (!this.state.isComponentInitialized) {
         return (
            <Root>
               <GCHeader titleText={this.props.title} />
               <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <SpinnerXYZ />
               </View>
            </Root>)
      }
      //NOTE we don't use a Screen component here so Root is essential

      //if they did not give us access to location we don't display map
      //they must enter the address (and then we will display it)
      //also have to check for {} ie no lat or long
      if ((!this.state.currLocation) || Object.keys(this.state.currLocation).length == 0) {
         return (<Root>
            <GCHeader titleText={this.props.title} back={() => { this.props.onCancel() }} />
            <View style={{ flex: 1, paddingHorizontal: 10, alignItems: 'flex-start', justifyContent: 'center' }}>
               <CmnTouchableEdit
                  titleI18n='cmnNEW.YourAddress'
                  initial={this.state.currAddress}
                  onOkay={(value) => { this.setLocationFromAddress(value) }}
                  onCancel={() => { }}
               //no onDelete
               >
                  <GCText title>{strX('cmn.Address')} <GCPencil /></GCText>
                  <GCUserTextWithPlaceholder
                     detail
                     text={this.state.currAddress}
                     placeholderI18n='cmnNEW.EnterAnAddress'
                     numberOfLines={2}
                  />
               </CmnTouchableEdit>
            </View>
         </Root>
         )
      }

      //else we have a location so we will display it on a map
      return (
         <Root>
            <View style={{ flex: 1 }}>
               <GCHeader titleText={this.props.title} />
               <View style={{ flex: 1 }}>
                  <View style={styles.mapContainer}>
                     {Platform.OS == 'android' ?
                        <MapView
                           provider={PROVIDER_GOOGLE} //for ios
                           ref={component => this._map = component}
                           style={styles.map}
                           toolbarEnabled={false}
                           // showsUserLocation={true}
                           showsMyLocationButton={true}
                           // moveOnMarkerPress={false}
                           initialRegion={{
                              latitude: this.state.currLocation.latitude,
                              longitude: this.state.currLocation.longitude,
                              latitudeDelta: 0.023,
                              longitudeDelta: 0.01,
                           }}
                           onPress={async (e) => {
                              await this.setAddressFromLocation(e.nativeEvent.coordinate)
                           }}>
                           <Marker.Animated
                              pinColor={COLORS.GC_ICON_MAP_THEME_DARK}
                              draggable
                              // ref={this.markerRef}
                              coordinate={this.state.currLocation}
                              onDragEnd={async (e) => {
                                 let dragPos = e.nativeEvent.coordinate
                                 await this.setAddressFromLocation(dragPos)
                              }}
                           />
                        </MapView> :
                        <MapView
                           provider={PROVIDER_GOOGLE} //for ios
                           ref={component => this._map = component}
                           style={styles.map}
                           toolbarEnabled={false}
                           // showsUserLocation={true}
                           showsMyLocationButton={true}
                           // moveOnMarkerPress={false}
                           region={{
                              latitude: this.state.currLocation.latitude,
                              longitude: this.state.currLocation.longitude,
                              latitudeDelta: 0.023,
                              longitudeDelta: 0.01,
                           }}
                           onPress={async (e) => {
                              await this.setAddressFromLocation(e.nativeEvent.coordinate)
                           }}>
                           <Marker.Animated
                              pinColor={COLORS.GC_ICON_MAP_THEME_DARK}
                              draggable
                              // ref={this.markerRef}
                              coordinate={this.state.currLocation}
                              onDragEnd={async (e) => {
                                 let dragPos = e.nativeEvent.coordinate
                                 await this.setAddressFromLocation(dragPos)
                              }}
                           />
                        </MapView>
                     }
                     {this.weHaveLocPermission && <PrjFabMapCurrPos
                        onPress={() => {
                           Geolocation.getCurrentPosition(
                              (position) => {
                                 this._map.animateCamera({ center: position.coords }),
                                    this.setState({ currLocation: position.coords }) //20240809 move marker back to current position 
                              },
                              (error) => { prjAlert(error.message) },
                              { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 });
                        }} />}
                     <View style={{ marginLeft: GC_MIN_MARGIN, paddingTop: 20 }}>
                        <GCI18n color={COLORS.GC_INSTRUCTIONS} code='cmnNEW.MsgAddressSelect' />
                     </View>
                  </View>
                  <View style={{ flex: .45, marginHorizontal: GC_STD_MARGIN }}>
                     <CmnTouchableEdit
                        titleI18n='cmnNEW.YourAddress'
                        initial={this.state.currAddress}
                        onOkay={(value) => { this.setLocationFromAddress(value) }}
                        onCancel={() => { }}
                     //no onDelete
                     >
                        <GCText title>{strX('cmn.Address')} <GCPencil /></GCText>
                        <GCUserTextWithPlaceholder
                           detail
                           text={this.state.currAddress}
                           placeholderI18n='cmnNEW.EnterAnAddress'
                           numberOfLines={2}
                        />
                     </CmnTouchableEdit>

                     <View style={{ height: 10 }} />

                  </View>
               </View>
               {/* <View style={{ height: 25 }} /> */}
               <GCFooterForIcons style={{ backgroundColor: COLORS.GC_BACKGROUND }}>
                  <GCFooterCmdIcon code={"CANCEL"} onPress={this.props.onCancel} />
                  <GCFooterCmdIcon code={this.props.buttonCode || "CONFIRM"}
                     onPress={() => {
                        this.props.onSelect(this.state.currAddress, this.state.currLocation)
                     }} />
                  {(this.props.onRemove) && <GCFooterCmdIcon code="REMOVE"
                     onPress={this.props.onRemove} />}

               </GCFooterForIcons>
            </View>
         </Root>
      )

   }//end render

   //NOTE that we set current location to the location returned by the geocoder ...
   //which can be a different (place_id is the best thing)
   //NOTE we allow for the case in didMount where the map is not yet displayed (dont move)
   async setAddressFromLocation(location, dontMove = false) {
      try {
         const data = await Geocoder.from(location.latitude, location.longitude)
         let firstResults = data.results[0];
         let loc = firstResults.geometry.location //uses lat/lng
         let newLoc = { latitude: loc.lat, longitude: loc.lng }
         this.setState({ currAddress: firstResults.formatted_address })
         this.setState({ currLocation: { latitude: loc.lat, longitude: loc.lng } })
         this.setState({ placeId: firstResults.place_id })
         if (!dontMove) { this._map.animateCamera({ center: newLoc }); }
      }
      catch (err) { prjAlert(err.message); }
   }//end setAddressFromLocation

   //NOTE that we set current location to the location returned by the geocoder ...
   //which can be a different (place_id is the best thing)
   async setLocationFromAddress(address) {
      try {
         const data = await Geocoder.from(address)
         let firstResults = data.results[0];
         let loc = firstResults.geometry.location //uses lat/lng
         let newLoc = { latitude: loc.lat, longitude: loc.lng }
         this.setState({ currAddress: firstResults.formatted_address })
         this.setState({ currLocation: { ...newLoc } })
         this.setState({ placeId: firstResults.place_id })
         this._map.animateCamera({ center: newLoc });
      }
      catch (err) {
         prjToast({ i18n: 'cmnNEW.AddressNotFound' })
      } //silent error (they entered a bad address?)
   }//end setLocationFromAddress

}//end CmnAddressInput


const styles = {
   mapContainer: {
      flex: 1,
      paddingLeft: 0,
      paddingRight: 0,
      marginBottom: 0,
   },
   map: {
      flex: 0,
      height: 300,
      // minHeight: '80%',
      justifyContent: 'center',
      alignItems: 'center',
   },
   inputBox: {
      borderWidth: .2,
      flexDirection: 'row',
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 20,
      marginHorizontal: 10,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#f7f7f7'
   }
}
