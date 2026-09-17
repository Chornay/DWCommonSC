import React, { Component } from 'react'
import { StatusBar, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { PrjMsgBox } from 'DWcmn/PrjMsgBox'
import { GCText, GCI18n } from 'DWcmn/Gc'
import GLOBALS from 'DWcmn/Global';
import { PrjSpacer } from 'DWcmn/Prj'
import { COLORS } from 'DWcmn/Global'
import { strX } from 'DWcmn/I18n.js'
import { isBlank } from 'DWcmn/PrjCmnFunctions'
import { PrjIcon } from 'DWcmn/PrjIconComponents';

//20211121 used PrjMsgBox 
//         removed margin:10 .. have to display in the properly sized View
//20251001 removed nativebase input...Problem cursor hides behind the View on Galaxy S24

//prop options
// signin to do special styling for Signin screens (with blue-ish background)
// title
// mandatory
// disabled
// prop showKeyboard
// type .. password, email, text, phoneNum, integer
//prop refresh()
export class XFormInput extends Component {

   constructor() {
      super();
      this.state = {
         isComponentInitialized: false,
      }
      // this.value = null
   }


   componentDidMount() {
      const options = this.props.options
      if (options.init) { //if there is an init routine
         options.value = options.init()
      }
      else {
         options.value = null
      }
      this.setState({ isComponentInitialized: true })
   }

   render() {
      // console.log (this.inputRef)
      const options = this.props.options
      const bkgClr = this.props.signin ? COLORS.GC_FORMINPUT_BKG_SIGNIN_STYLE : COLORS.GC_FORMINPUT_BKG
      const labelClr = this.props.signin ? COLORS.GC_FORMINPUT_LABEL_SIGNIN_STYLE : COLORS.GC_FORMINPUT_LABEL
      let borderClr = this.props.signin ? COLORS.GC_FORMINPUT_BORDER_SIGNIN_STYLE : COLORS.GC_FORMINPUT_BORDER
      if (options.errMessage) { borderClr = COLORS.GC_FORMINPUT_WARNING_BORDER }
      const textClr = this.props.signin ? COLORS.GC_FORMINPUT_TEXT_SIGNIN_STYLE : COLORS.GC_FORMINPUT_TEXT

      let kybdType
      switch (options.type) {
         case 'integer': kybdType = 'number-pad'; break
         default: kybdType = 'default'
      }

      //This is important. We do not want to render the Item until AFTER the didMount so that the
      //initial value is ready for defaultValue prop
      if (!this.state.isComponentInitialized) return null
      return (

         <View>
            <GCText title style={{ color: textClr }}>
               {options.title}
            </GCText>
            <PrjSpacer size={5} />
            <TextInput
               style={[styles.tile, { backgroundColor: bkgClr, borderColor: borderClr, color: textClr }]}
               ref={(component) => { this.inputRef = component }}
               onFocus={() => { this.props.showKeyboard ? this.inputRef.current?.focus() : null }}
               autoFocus={this.props.showKeyboard}
               defaultValue={options.value}
               editable={!options.disabled}
               onChangeText={(text) => {
                  options.value = text;
               }}
               onSubmitEditing={() => {
                  validate(options);
                  this.props.refresh && this.props.refresh();
               }}
               secureTextEntry={options.type === "password"}
            />
            {options.errMessage && <PrjMsgBox text={options.errMessage} />}
         </View>
      )
   } // end render


} // end XFormInput

export function validateForm(fieldArray) {
   // console.log("validateForm", fieldArray)
   let okay = true
   fieldArray.forEach((field) => {
      okay = validate(field) && okay
   })
   return okay
}

//validate checks a single entry to see if it meets the criteria for its type
//if an error is found then the errMessage property is set with the appropriate message
//it returns false iff there is an error (ie message not null)
function validate(options) {
   // console.log("validate", options)
   options.assign(options.value)
   options.errMessage = null
   if (options.mandatory && isBlank(options.value)) {
      options.errMessage = strX("cst.err.MandatoryField", { name: options.title })
   }
   else if (options.type == "email") {
      // options.value = options.value.trim() //get rid of leading/trailing white space
      // const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      // const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      const re = /[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,64}/
      // console.log(options.value)
      if (re.test(options.value) == false) {
         options.errMessage = strX("cst.err.EmailInvalid")
      }
   }
   return options.errMessage == null
}


styles = StyleSheet.create({
   tile: {
      alignSelf: 'center',
      justifyContent: 'space-between',
      width: '100%',
      height: 60,
      padding: 10,
      borderRadius: 10,
      marginBottom: 10,
   },
})
