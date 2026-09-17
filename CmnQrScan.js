import React, { Component } from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity, Text, Linking } from 'react-native'
import { GC_STD_MARGIN } from 'DWcmn/Global'
import { COLORS } from 'DWcmn/Global'
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';

//prop onScan(data, params)
//       data - the whole string encoded in the QR code
//       params - any parameters of a url stored in an object of key, value pairs
//NOTE that there is no way to start another scan .. you have to leave and come back.
export class CmnQrScan extends Component {

   constructor() {
      super();
      this.state = {
         isComponentInitialized: false,
         activeScan: true
      };
   }

   async componentDidMount() {
      this.setState({ isComponentInitialized: true })
   }

   render() {

      if (!this.state.isComponentInitialized) { return (null) } //end if 

      return (
         <View style={{ flex: 1, marginHorizontal: GC_STD_MARGIN }}>
            <View style={styles.camera}>
               {this.state.activeScan && <RNCamera
                  captureAudio={false}
                  style={{ flex: 1 }}
                  onBarCodeRead={this.onScan}
                  barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}>
                  <View style={styles.capture}>
                     <BarcodeMask edgeColor={COLORS.GC_THEME_DARK}
                        showAnimatedLine={true}
                        lineAnimationDuration={1500} />
                  </View>
               </RNCamera>}
            </View>
         </View>
      )
   } //end render

   //called when we have a result from the camera
   //we want to call the onScan property and give it the result and the extract parameters (if any)
   //NOTE that URLSearchParams is not supported in r/n .. so we just use split
   onScan = ({ data }) => {
      // console.log('read data--------------->',data)

      const extractedParams = {}

      this.setState({ activeScan: false })

      //no data at all
      if (!data) { this.props.onScan(null, null); return }

      //test data follows
      // const url = "https://example.com/?product=trousers&color=black&newuser&size=s&order=bbb111ccc"
      const url = data
      const parts = url.split('?')

      //if no ? then there are no parameters to extract
      if (parts.length < 2) { this.props.onScan(data, {}); return }

      //extract any parameters into key value pairs
      const urlParamsArray = parts[1].split('&')
      for (var param of urlParamsArray) {
         const keyAndValue = param.split('=')
         extractedParams[keyAndValue[0]] = keyAndValue[1]
      }

      this.props.onScan(data, extractedParams); return
   };

} //end CmnQrScan

const styles = StyleSheet.create({
   camera: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   },
   capture: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
      width: 400, height: '100%'
   }

});

