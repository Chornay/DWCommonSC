import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Dimensions, Text } from 'react-native'
import { COLORS } from 'DWcmn/Global'
import { GCText, GCI18n } from 'DWcmn/Gc'
import { PRJ_STYLES } from 'DWcmn/PrjStyles'

//prop i18nOkay the code to display for 'positive' acttion (default YES)
//prop i18nCancel the code to display for 'negative' acttion (default NO)
//prop onOkay()
//prop onCancel()
//prop disabled if the positive action is not enabled
//prop hide .. display nothing
export class PrjButtonSideBySide extends Component {
   render() {
      if (this.props.disable) {
         return null
      }
      return (
         <View style={PRJ_STYLES.modalFooter}>
            <TouchableOpacity
               style={[PRJ_STYLES.buttonSideBySideCancel, { width: '30%' }]}
               onPress={this.props.onCancel}>
               <GCI18n detail title style={{ textAlign: 'center'}}code="cmnNEW.NO" />
            </TouchableOpacity>
            {(!this.props.disabled) && <TouchableOpacity
               style={[PRJ_STYLES.buttonSideBySideOkay, { width: '30%' }]}
               onPress={this.props.onOkay}>
               <GCI18n detail title inverse style={{ textAlign: 'center'}}code="cmnNEW.YES" />
            </TouchableOpacity>}
         </View>
      )
   }
}//end class PrjButtonSideBySide

