import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'
import { GCI18n } from 'DWcmn/Gc'
import GLOBALS from 'DWcmn/Global';
import { COLORS } from 'DWcmn/Global'
import { ICONS, ICONS_WITH_TEXT } from 'DWcmn/Global'
import { PRJ_STYLES } from './PrjStyles';
import { getIconCodeForAction } from 'DWcmn/PrjCmnFunctions'

//prop id key into ICONS table in Global.js
//prop color overrides ICONS color (if present) which overrides COLORS.GC_ICON
//prop style ... will override any of the defaults
//NOTE if id is not found in table nothing will appear
export class PrjIcon extends Component {
   render() {
      const id = ICONS[this.props.id]
      if (id) {
         let color
         if (this.props.color) { color = this.props.color }
         else if (id.color) { color = id.color }
         else { color = COLORS.GC_ICON }
         return (
            <Icon
               name={id.name} type={id.type}
               style={[{ color: color }, this.props.style]}>
            </Icon>
         )
      }
      else {
         return null
      }
   } //end render
} //end PrjIcon

export function prjIconEditableBox() {
   return (
      <PrjIcon style={{ fontSize: 18 }} id='EDITABLE_BOX' />
   )
}

//prop 
//NOT USED YET 
export class PrjIconWithShadow extends Component {
   render() {
      return (
         <View style={[styles.shadowStyle, this.props.style]}>
            {this.props.children}
         </View>
      )
   } //end render
} //end PrjIconBK

//20250526 replaced native-base button
export class PrjIconWithText extends Component {
   render() {

      //if the passed icon code is invalid use CODE_UNDEF (gives us ? for icon and text)
      let iconCode = this.props.code
      if (!iconCode || !ICONS_WITH_TEXT[iconCode]) { iconCode = "CODE_UNDEF" }

      const entry = ICONS_WITH_TEXT[iconCode]
      const iconId = entry.icon
      const i18n = entry.i18n
      const colorStyle = entry.color ? { color: entry.color } : null
      return (
         <TouchableOpacity
            style={styles.iconWithTextButton}
            onPress={this.props.onPress}
         >
            <PrjIcon style={[this.props.iconStyle, colorStyle]} id={iconId} />
            <GCI18n code={i18n} style={[this.props.textStyle, colorStyle, { textAlign: 'center' }]} />
         </TouchableOpacity>

      )
   }
}

//PrjIconForTileAction generates icon styled for an order (route) tile
//  that corresponds to an available action for the tile
//prop action (an action enum used to determine the icon to display)
//prop onPress
export class PrjIconForTileAction extends Component {

   render() {
      return (
         <PrjIconWithText
            code={getIconCodeForAction(this.props.action)}
            style={PRJ_STYLES.tileButtonBkg}
            iconStyle={PRJ_STYLES.tileButtonIcon}
            textStyle={PRJ_STYLES.tileButtonText}
            onPress={this.props.onPress}
         />
      )

   }
}//end PrjIconForTileAction


const styles = StyleSheet.create({
   shadowStyle: {
      backgroundColor: GLOBALS.COLOR.BTN_BK,
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOpacity: .1,
      elevation: 5,
      shadowRadius: .8,
      borderRadius: 1000,
      padding: 10
   },
   iconWithTextButton: {
      flexDirection: 'column',
      height: 45,
      justifyContent: 'center',
      alignItems: 'center'
   },
})
