import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { COLORS } from 'DWcmn/Global'
import { GCI18n } from 'DWcmn/Gc'


//prop level
//prop style (optional)
export class CmnServiceLevelBanner extends Component {
  render() {

    let i18n
    if (this.props.level === 'regular') {
      return null
    }
    switch (this.props.level) {
      case 'express': i18n = 'cstNEW.ExpressService'; break;
      case 'sameDay': i18n = 'cstNEW.SameDayService'; break;
      default: i18n = 'cmn.ERROR'
    }
    return (
      <View style={[styles.serviceLevel, this.props.style]}>
        <GCI18n code={i18n} large bold style={{ alignSelf: 'center' }}>  </GCI18n>
      </View>)
  }
}


const styles = StyleSheet.create({
  serviceLevel: {
    justifyContent: 'center',
    backgroundColor: COLORS.GC_HIGHLIGHT_IMPORTANT,
    height: 50,
  }
})