import React, { Component } from 'react'
import { View, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'

import Modal from "react-native-modal";
import { PRJ_STYLES } from 'DWcmn/PrjStyles'
import { COLORS } from 'DWcmn/Global'
import { PrjSpacer } from 'DWcmn/Prj'
import { strX } from 'DWcmn/I18n';
import { GCText } from 'DWcmn/Gc'


//20230113 removed ability to add note (which was never used anyhow)

const { width: SCREEN_WIDTH } = Dimensions.get('window') || {};
const { height: SCREEN_HEIGHT } = Dimensions.get('window') || {};

//TODO chould check for the methods existence 

// Properties
//   isVisible that set the modal flag
//   text string that is the question that you are going to ask
//   confirmButtonText string the title for the button that confirms the action (default YES)
//   dismissButtonText string the title for the button that does not do the action (default null)
//   swipeable boolean default true
//   showDismiss default false
//   title text at the top of the modal (default Please Confirm)
//   onConfirm the method to be executed went the confirm button is pressed
//   onDismiss the method to be executed when the cancel is pressed (or ESC or touch outside area?)
//   style string any changes to the default styling of the box

export default class CmnCmdModal extends Component {

  render() {
    let allowSwipe = true;
    let showDismiss = false;
    if (this.props.swipeable == false) { allowSwipe = false } //swipe disabled only iff they set flag to false
    if (!allowSwipe) { showDismiss = true } //if they can't swipe we will give them the default Dismiss button
    if (this.props.dismissButtonText != null) { showDismiss = true } //or if they specify Dismiss button text
    if (this.props.showDismiss) { showDismiss = true } //or if they ask for the Dismiss button explicitly

    const confirmButtonText = this.props.confirmButtonText ? this.props.confirmButtonText : strX("cmnNEW.YES")
    const dismissButtonText = this.props.dismissButtonText ? this.props.dismissButtonText : strX("cmnNEW.NO")

    return (
      <View>
        <Modal
          avoidKeyboard={true} //for ios modal doesn't hide under keyboard 
          isVisible={this.props.isVisible}
          onSwipeComplete={allowSwipe ? this.props.onDismiss : null}
          swipeDirection={allowSwipe ? ["down"] : null}
        >
          <View style={[PRJ_STYLES.modalNew, this.props.style]}>
            <View style={{ flex: .2, justifyContent: 'center', alignItems: 'flex-start' }}>
            {/* <GCText title color={COLORS.GC_PULLUP_TITLE} style={{ textAlign: 'center' }}>This is a title</GCText> */}
            <GCText title color={COLORS.GC_PULLUP_TITLE} style={{ textAlign: 'center' }}>{this.props.title||strX('cmnNEW.PleaseConfirm')}</GCText>
              <PrjSpacer size={10} />
              <View style={PRJ_STYLES.modalHorizontalLine} />
            </View>
            <View style={{ flex: .6, justifyContent: 'center' }}>
              <GCText title>{this.props.text}</GCText>
            </View>
            <View style={PRJ_STYLES.modalFooter}>
              {showDismiss ?
                <TouchableOpacity
                  // width '30%' prepare for 3 buttons 
                  style={[PRJ_STYLES.buttonSideBySideCancel, { width: '30%' }]}
                  onPress={this.props.onDismiss}>
                  <GCText detail title style={{ textAlign: 'center' }} >{dismissButtonText}</GCText>
                </TouchableOpacity> : null}
              <TouchableOpacity
                style={[PRJ_STYLES.buttonSideBySideOkay, { width: '30%' }]}
                onPress={this.props.onConfirm}>
                <GCText detail title inverse style={{ textAlign: 'center'}}>{confirmButtonText}</GCText>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  } //end render

} //end CmnCmdModal
