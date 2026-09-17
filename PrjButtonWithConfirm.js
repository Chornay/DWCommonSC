import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Dimensions, Text } from 'react-native'
import Modal from 'react-native-modal'
import { PRJ_STYLES } from 'DWcmn/PrjStyles'
import { COLORS } from 'DWcmn/Global'
import { strX } from 'DWcmn/I18n';
import { GCTouchableText } from 'DWcmn/Gc'
import { GCText, GCI18n } from 'DWcmn/Gc'
import { PrjIconButton } from 'DWcmn/Prj';
import { PrjButtonSideBySide } from './PrjButtonSideBySide';
import { PrjBusyMask } from 'DWcmn/PrjBusyMask'
import { PrjSpacer } from 'DWcmn/Prj'

const { width: SCREEN_WIDTH } = Dimensions.get('window') || {};
const { height: SCREEN_HEIGHT } = Dimensions.get('window') || {};

//PrjButtonWithConfirm will display text or icon until pressed
//when it will display a modal Confirm dialog saying YES or NO
//specify i18n for text button, icon for icon button
//prop text .. button text
//  OR i18n ..
//  OR icon .. 
//prop color ..currently just used for icon
//prop title text at the top of the modal (default Please Confirm)
//prop buttonStyle .. optional styling for the button (icon or text) (NOT the modal buttons)
//prop confirmI18n .. confirm dialog text optional //TOTO optional?
//prop disableConfirm .. set if you want action without the confirmation dialog
//prop onConfirm()
//prop onCancel()

//20241004 added text property
//20250320 new modal styling


export class PrjButtonWithConfirm extends Component {

   constructor() {
      super();
      this.state = {
         isActive: false,
         isComponentInitialized: false,
      };
   }
   componentDidMount() {
      this.setState({ isComponentInitialized: true })
   }

   render() {
      //we always display our button but if it has been pressed we display our modal as well
      // console.log('PrjButtonWithConfirm', this.props.i18n, this.props.icon, this.props.onConfirm)
      // let modalText
      // if (this.props.confirmI18n) { modalText = strX(this.props.confirmI18n) }
      // else { modalText = strX('cmnNEW.AreYouSure') }
      let modalText = strX(this.props.confirmI18n || 'cmnNEW.AreYouSure')
      return (

         <View>
            {/* display either a text or icon button */}
            {(this.props.icon) ?
               <PrjIconButton
                  id={this.props.icon}
                  style={this.props.buttonStyle}
                  color={this.props.color}
                  onPress={() => {
                     if (this.props.disableConfirm) { this.props.onConfirm() }
                     else { this.setState({ isActive: true }) }
                  }}
               /> :
               <GCTouchableText text={this.props.text || strX(this.props.i18n)}
                  styleText={this.props.buttonStyle}
                  onPress={() => {
                     if (this.props.disableConfirm) { this.props.onConfirm() }
                     else { this.setState({ isActive: true }) }
                  }}
               />
            }
            {this.state.isActive &&
               <Modal
                  isVisible={this.state.isActive}
                  onSwipeComplete={() => { //same as click cancel button
                     this.setState({ isActive: false })
                     this.props.onCancel && this.props.onCancel()
                  }}
                  swipeDirection={["down"]}
               >
                  <View style={[PRJ_STYLES.modalNew, this.props.style]}>
                     <View style={{ flex: .2, justifyContent: 'center', alignItems: 'flex-start' }}>
                        <GCText title color={COLORS.GC_PULLUP_TITLE} style={{ textAlign: 'center' }}>{this.props.title || strX('cmnNEW.PleaseConfirm')}</GCText>
                        <PrjSpacer size={10} />
                        <View style={PRJ_STYLES.modalHorizontalLine} />
                     </View>
                     <View style={{ flex: .6, justifyContent: 'center' }}>
                        <GCText title>{modalText}</GCText>
                     </View>
                     <PrjButtonSideBySide
                        onCancel={() => {
                           this.setState({ isActive: false })
                           this.props.onCancel && this.props.onCancel()
                        }}
                        onOkay={() => {
                           this.setState({ isActive: false })
                           this.props.onConfirm()
                        }}
                     ></PrjButtonSideBySide>
                  </View>
               </Modal>}
         </View>
      )
   }

}//end PrjButtonWithConfirm

