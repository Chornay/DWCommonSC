import React, { Component } from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { COLORS } from 'DWcmn/Global'


//20221124 moved into its own file


//GCStaticMap displays a map that is display only
//It displays a map centred on a location (and by default displaying a pin)
//prop location (contains latitude and longitude)  default 0,0
//prop height default 100
//prop delta default .002 (degrees of latitude displayed in map)
//prop noPin default false (true iff no pin to be displayed)
//prop style
//prop ref(component) optionally receive a reference to the component
export class GCStaticMap extends Component {
   constructor() {
      super();
      this._mapRef = null
   } //end constuctor

   render() {
      let location = this.props.location || { latitude: 0, longitude: 0 }
      let height = this.props.height || 100
      return (
         <MapView
            provider={PROVIDER_GOOGLE} //for ios
            ref={(component) => this._mapRef = component}
            style={[{ flex: 0, height: height }, this.props.style]}
            toolbarEnabled={false}
            showsUserLocation={false}
            showsMyLocationButton={true}
            moveOnMarkerPress={false}
            zoomEnabled={false}
            zoomTapEnabled={false}
            zoomControlEnabled={false}
            scrollEnabled={false}
            initialRegion={{
               latitude: location.latitude,
               longitude: location.longitude,
               latitudeDelta: this.props.delta || 0.002,
               longitudeDelta: 0.0,
            }}>
            {this.props.noPin || <Marker pinColor={COLORS.GC_ICON_MAP_THEME_DARK} coordinate={location} />}
         </MapView>

      )
   }

   recenterMap(location) {
      this._mapRef.animateCamera({ center: location });
   }//end recenterMap


}//end GCStaticMap
