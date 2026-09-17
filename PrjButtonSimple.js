import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native';
import { GCText } from 'DWcmn/Gc'
import { strX } from 'DWcmn/I18n';
import { COLORS } from 'DWcmn/Global'

// prop i18n or text
// prop hide 
// prop disabled
// prop onPress

export class PrjButtonSimple extends Component {
   render() {
      const textColor = this.props.disabled ? COLORS.GC_BUTTON_TEXT_DISABLED : COLORS.GC_BUTTON_TEXT
      const bkgColor = this.props.disabled ? COLORS.GC_BUTTON_BKG_DISABLED : COLORS.GC_BUTTON_BKG

      const txt = this.props.i18n ? strX(this.props.i18n) : this.props.text

      if (this.props.hide) { return (null) }

      return (
         <TouchableOpacity
            style={[{ backgroundColor: bkgColor }, styles.button, this.props.style]}
            disabled={this.props.disabled}
            onPress={this.props.onPress}>
            <GCText style={{ color: textColor }}>{txt}</GCText>
         </TouchableOpacity>
      )
   }
} //end PrjButtonSimple

const styles = StyleSheet.create({
   button: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 40,
      borderStyle: 'solid',
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 30,
      paddingRight: 30,
      width: 'auto',
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOpacity: 2,
      shadowRadius: 5,
      shadowOffset: { height: 4 }, // SC added shadowOffset for iOS
      elevation: 5,
   }
})



