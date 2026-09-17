import React, { Component } from 'react'
import { View } from 'react-native'
import Modal from 'react-native-modal'
import { WebView } from 'react-native-webview';
import { PrjIconButton } from 'DWcmn/Prj'
import { PrjWebView } from 'DWcmn/PrjWebView'
import { GCText } from 'DWcmn/Gc'
import GLOBALS from 'DWcmn/Global';
import { COLORS } from 'DWcmn/Global';

//20231104 added dismiss when backdrop is pressed

//Displays a quesion mark icon
//If pressed displays a popup remark
//prop text .. text to display (or link if it starts with http)
//prop size .. icon size (default 20)
//prop styleIcon
//NOTE as a convenience we will accept null text and return null
//prop onPress()
export class PrjIconForRemark extends Component {
   constructor() {
      super();
      this.state = {
         isVisible: false
      }
   } //end constuctor

   render() {

      if (!this.props.text) { return null }

      const iconSize = this.props.size || 20

      return (
         <View>
            <PrjIconButton
               id='QUESTION'
               onPress={() => {
                  this.setState({ isVisible: true })
               }}
               style={{ fontSize: iconSize }}
               disabled={this.state.isVisible}
            ></PrjIconButton>

            <Modal
               isVisible={this.state.isVisible}
               onBackdropPress={() => { this.setState({ isVisible: false }) }}
               onSwipeComplete={() => { this.setState({ isVisible: false }) }}
               swipeDirection={['up', 'down', 'left', 'right']}
            >
               {this.displayContent(this.props.text)}
            </Modal>
         </View>

      )
   }

   displayContent = (text) => {
      const isUrl = text.slice(0, 4) == 'http'
      if (isUrl) {
         // this was the styling   <View style={{ height: '90%', width: '90%', borderRadius: 10, alignSelf: 'center', backgroundColor: COLORS.GC_BACKGROUND }}>
         return (
            <PrjWebView
               url='https://www.dobbywalla.com/apps-termsandcondition'
               onDone={() => { this.setState({ isVisible: false }) }}
            />

         )

      }
      else {
         return (
            <View style={{ flexBasis: 'auto', borderRadius: 10, alignSelf: 'center', backgroundColor: COLORS.GC_BACKGROUND }}>
               <View style={{ padding: 20 }}>
                  <GCText>{text}</GCText>
               </View>
            </View>

         )
      }
   }

}//end PrjIconForRemark

