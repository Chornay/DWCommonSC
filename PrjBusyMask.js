import React, { Component } from 'react'
import { View } from 'react-native'
import { SpinnerXYZ } from 'DWcmn/GCNB'
import Modal from 'react-native-modal'


//a modal which will obscure the screen .. to be used when an extended operation is taking place
export class PrjBusyMask extends Component {
   render() {
      return (
         <Modal isVisible={true} transparent={true} >
            <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
               <SpinnerXYZ />
            </View>
         </Modal>)
   }
}//end PrjBusyMask

