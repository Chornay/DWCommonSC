import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { Input } from 'native-base';

import GLOBALS from 'DWcmn/Global';
import { COLORS } from 'DWcmn/Global'
import Modal from "react-native-modal";
import { strX } from 'DWcmn/I18n';
import { isBlank } from 'DWcmn/PrjCmnFunctions'
import { GCText, GCI18n } from 'DWcmn/Gc'
import { PRJ_STYLES } from './PrjStyles'
import { PrjSpacer } from 'DWcmn/Prj'


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;


//20221006 made the DELETE action disappear if no onDelete()
//20221216 fixed bug .. onOkay on called if no value was ever entered .. set currValue to initial
//20230512 sc to fix up side by side buttons
//20230523 sc change to use modalPullup60 so the button doesn't get squeezed with keyboard

//CmnTouchableEdit
//Displays its children components in a Touchable Opacity until pressed
//when it will display a modal to enter/edit/delete a string
//prop initial .. the initial value of the text (may be null or undefined)
//prop titleText or titleI18n (if ommited will say ENTER)
//prop disabled .. disables the touch
//prop style .. optional styling for the touchable area (NOT the modal buttons)
//prop specialEditBox .. we will apply special formatting for the edit box that we display on the rhs
//prop onOkay(value)
//prop onCancel()
//prop onDelete() //optional, without this the DELETE option will not be offered
export class CmnTouchableEdit extends Component {

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

      //if no delete method is define then we have to pass null to the modal
      const deleteMethod = this.props.onDelete ?
         () => { this.setState({ isActive: false }); this.props.onDelete() }
         : null

      //we always display our button but if it has been pressed we display our modal as well
      return (<TouchableOpacity
         disabled={this.props.disabled}
         style={this.props.style}
         // 20251011 the touchable area is too big...pressable by other touchable area 
         // hitSlop={this.props.specialEditBox && { top: 40, bottom: 40, left: 40, right: 40 }} // Increase touchable area
         hitSlop={this.props.specialEditBox && { top: 20, bottom: 20, left: 20, right: 20 }} // Increase touchable area
         onPress={() => { this.setState({ isActive: true }) }}
      >
         {this.props.children}
         {this.state.isActive &&
            <RemarksModal
               initial={this.props.initial}
               titleI18n={this.props.titleI18n}
               titleText={this.props.titleText}
               onOkay={(value) => { this.setState({ isActive: false }); this.props.onOkay(value) }}
               onCancel={() => { this.setState({ isActive: false }); this.props.onCancel() }}
               onDelete={deleteMethod}
            ></RemarksModal>}
      </TouchableOpacity>)
   }

}//end CmnTouchableEdit

// NOTES if we want modal to be at top...
// position:'absolute', top:0, left:0,//this would put it at top
// and we would have to slide in and out from top

// Properties
//   initial //initial value
//   titleI18n (optional)
//   onOkay(newString)
//   onCancel()
//   onDelete()
// NOTE we show delete button if initial value was non-null (ie an existing remark)
// NOTE that if they delete all the characters of an existing remark we will return onDelete()

export class RemarksModal extends Component {

   constructor() {
      super();
      this.state = {
      };

      this.currRemark = null
   }

   componentDidMount() {
      this.currRemark = this.props.initial
   }

   render() {

      //we want to show a DELETE button if there are passing us an existing remark
      //AND an onDelete method
      const allowDelete = this.props.initial !== undefined && this.props.initial !== null && this.props.onDelete
      let titleText = this.props.titleText || strX(this.props.titleI18n || 'cmnNEW.EnterDotDot')
      return (
         <View>
            <Modal
               // WE TRIED BOTH OF THESE .. NO LUCK WITH KYBD
               // onShow={()=>{this.inputRef.current?.focus()}}
               // onShow={()=>{this.inputRef.focus()}}
               avoidKeyboard={true} //for ios modal doesn't hide under keyboard 
               statusBarTranslucent={true}
               isVisible={true}
            // hasBackdrop={true}
            // backdropOpacity={.30}
            // backdropColor='black'
            >
               <View style={[PRJ_STYLES.modalEditable, this.props.style]}>
                  <View style={{ flex: 1, padding: 10 }}>
                     <View style={{ flex: .2, justifyContent: 'center', alignItems: 'flex-start' }}>
                        <GCText tile bold color={COLORS.GC_PULLUP_TITLE} style={{ textAlign: 'center' }}>{titleText}</GCText>
                        <PrjSpacer size={10} />
                        <View style={PRJ_STYLES.modalHorizontalLine} />
                     </View>
                     <View style={{ flex: .6 }}>
                        <Input
                           // TODO why deleted?? style={{ paddingHorizontal: '4%', paddingTop: 0 }}
                           ref={(component) => { this.inputRef = component }}
                           //WE WERE TRYING TO GET THE KYBD TO OPEN .. NO SUCCESS
                           //THINK THAT WE HAVE TO DELAY BEFORE AUTOFOCUS
                           autoFocus={true}
                           onShow={() => { this.inputRef.current?.focus() }}
                           style={{ color: COLORS.GC_PULLUP_TEXT }}
                           defaultValue={this.props.initial}
                           placeholder={strX('cmnNEW.EnterDotDot')}
                           placeholderTextColor={COLORS.GC_PULLUP_PLACEHOLDER}
                           multiline={true}
                           numberOfLines={4}
                           onChangeText={(newValue) => { this.currRemark = newValue }}
                        />
                     </View>
                     <View style={PRJ_STYLES.modalFooter}>
                        {allowDelete && <TouchableOpacity
                           style={[PRJ_STYLES.buttonSideBySideCancel, { width: '30%' }]}
                           onPress={() => { this.props.onDelete() }}
                        >
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
                              if (isBlank(this.currRemark)) {
                                 if (allowDelete) { this.props.onDelete() }//existing gets deleted
                                 else { this.props.onCancel() }   //didn't exist so do nothing
                              }
                              else { this.props.onOkay(this.currRemark) }
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


const styles = StyleSheet.create({
   touchableArea: {
      // width:120, 
      // height:80, 
      alignItems: 'flex-end'
   }
});
