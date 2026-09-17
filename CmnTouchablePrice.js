import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, TouchableOpacity, TextInput } from 'react-native'
import { Input } from 'native-base';

import GLOBALS from 'DWcmn/Global';
import { COLORS } from 'DWcmn/Global'
import Modal from "react-native-modal";
import { strX } from 'DWcmn/I18n';
import { isBlank } from 'DWcmn/PrjCmnFunctions'
import { GCText, GCI18n } from 'DWcmn/Gc'
import { PRJ_STYLES } from './PrjStyles'
import { PrjSpacer } from 'DWcmn/Prj'
import { cmnFormatAPrice } from 'DWcmn/cmnFormatFunctions'


const { width: SCREEN_WIDTH } = Dimensions.get('window') || {};
const { height: SCREEN_HEIGHT } = Dimensions.get('window') || {};


//CmnTouchableNumeric
//Displays a price in a Touchable Opacity until pressed
//when it will display a modal to enter/edit/delete the price
//prop initial .. the initial price (may be null or undefined)
//prop titleText or titleI18n (if ommited will say Price)
//prop disabled .. disables the touch
//prop style .. optional styling for the touchable area (NOT the modal buttons)
//prop onOkay(value)
//prop onCancel()
//prop onDelete() //optional, without this the DELETE option will not be offered
export class CmnTouchablePrice extends Component {

   constructor(props) {
      super(props);
      this.state = {
         isActive: false,
         isComponentInitialized: false,
         value: this.props.initial || null
      };
   }
   componentDidMount() {
      this.setState({ isComponentInitialized: true })
   }

   render() {

      //if no delete method is define then we have to pass null to the modal
      const deleteMethod = this.props.onDelete ?
         () => { this.setState({ isActive: false }); this.props.onDelete() }
         : null

      //we always display our button but if it has been pressed we display our modal as well
      return (
         <TouchableOpacity
            disabled={this.props.disabled}
            style={this.props.style}
            onPress={() => { this.setState({ isActive: true }) }}
         >
            <GCText>{cmnFormatAPrice(this.props.initial)}</GCText>
            {this.state.isActive &&
               <NumericModal
                  initial={this.props.initial}
                  titleI18n={this.props.titleI18n}
                  titleText={this.props.titleText}
                  onOkay={(newValue) => {
                     this.props.onOkay(newValue)
                     this.setState({ isActive: false });
                  }}
                  onCancel={() => { this.setState({ isActive: false }); this.props.onCancel() }}
               // onDelete={deleteMethod}
               ></NumericModal>}
         </TouchableOpacity>)
   }

}//end CmnTouchableNumeric


// Properties
//   initial //initial value
//   titleI18n (optional)
//   onOkay(newString)
//   onCancel()
//   onDelete()
// NOTE we show delete button if initial value was non-null (ie an existing remark)
// NOTE that if they delete all the characters of an existing remark we will return onDelete()

class NumericModal extends Component {

   constructor(props) {
      super(props);
      this.state = {
         valueString: (this.props.initial ?? '').toString(),
         isComponentInitialized: false,
      };

   }

   componentDidMount() {
      this.setState({ isComponentInitialized: true })
   }

   render() {

      if (!this.state.isComponentInitialized) { return null }

      //we want to show a DELETE button if there are passing us an existing remark
      //AND an onDelete method
      const allowDelete = this.props.initial !== undefined && this.props.initial !== null && this.props.onDelete
      let titleText = this.props.titleText || strX(this.props.titleI18n || 'cmnNEW.Remarks') //TODO
      return (
         <View>
            <Modal
               avoidKeyboard={true} //for ios modal doesn't hide under keyboard 
               statusBarTranslucent={true}
               isVisible={true}
            >
               <View style={[PRJ_STYLES.modalEditable, this.props.style]}>
                  <View style={{ flex: 1, padding: 10 }}>
                     <View style={{ flex: .2, justifyContent: 'center', alignItems: 'flex-start' }}>
                        <GCText tile bold color={COLORS.GC_PULLUP_TITLE} style={{ textAlign: 'center' }}>{titleText}</GCText>
                        <PrjSpacer size={10} />
                        <View style={PRJ_STYLES.modalHorizontalLine} />
                     </View>
                     <View style={{ flex: .6 }}>
                        <TextInput
                           style={{ color: COLORS.GC_PULLUP_TEXT }}
                           placeholder={strX('cmnNEW.EnterDotDot')}
                           value={this.state.valueString}
                        onChangeText={(newValue) => { this.setState({valueString:newValue}) }}
                        />
                     </View>
                     <View style={PRJ_STYLES.modalFooter}>
                        {allowDelete && <TouchableOpacity
                           style={[PRJ_STYLES.buttonSideBySideCancel, { width: '30%' }]}
                           onPress={() => { this.props.onDelete() }}        >
                           <GCI18n detail title code="cmnNEW.DELETE" />
                        </TouchableOpacity>}
                        <TouchableOpacity
                           style={[PRJ_STYLES.buttonSideBySideCancel, { width: '30%' }]}
                           onPress={() => { this.props.onCancel() }}>
                           <GCI18n detail title code="cmn.CANCEL" />
                        </TouchableOpacity>
                        <TouchableOpacity
                           style={[PRJ_STYLES.buttonSideBySideOkay, { width: '30%' }]}
                           onPress={() => {
                              this.props.onOkay(Number(this.state.valueString))
                              // if (isBlank(this.currRemark)) {
                              //     if (allowDelete) { this.props.onDelete() }//existing gets deleted
                              //     else { this.props.onCancel() }   //didn't exist so do nothing
                              // }
                              // else { this.props.onOkay(this.currRemark) }
                           }
                           }>
                           <GCI18n detail title inverse code="cmn.OKAY" />
                        </TouchableOpacity>
                     </View>
                  </View>
               </View>

            </Modal >
         </View>

      );//end render
   }//render
} //end RemarksModal
