import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import moment from 'moment';
import { GCText } from 'DWcmn/Gc'
import { PrjIcon } from 'DWcmn/PrjIconComponents';
import { strX } from 'DWcmn/I18n';
import { PrjSpacer } from 'DWcmn/Prj'
import { COLORS } from 'DWcmn/Global'

//20250524 sc redesign of the tile

//prop coupon
//prop isSelected true iff selected
//prop readonly //no selection allowed
//prop onPress()
export default class CmnCouponTile extends Component {

  render() {

    const { amount, type, description, name, expiryDate } = this.props.coupon
    // DO we still need selected?
    // const selectColor = this.props.isSelected ? COLORS.GC_THEME_DARK : COLORS.GC_SWITCH_LIGHT_BLUE
    const date = new Date();
    const expiryDateString = expiryDate ? date.toDateString(expiryDate) : null

    return (
      <TouchableOpacity
        activeOpacity={1} // disable to the grey shadow when click 
        onPress={this.props.onPress}>
        <View style={[styles.parent, this.props.isSelected && styles.selected]}>
          <View style={styles.leftChild}>
            <Image
              source={require('../DW/images/company/logoWhite.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.rightChild}>
            <GCText detail inverse >{description}</GCText>
            <PrjSpacer size={10} />

            <GCText title inverse >{cmnCouponFaceValueStr(this.props.coupon)}</GCText>
            <PrjSpacer size={10} />

            {expiryDateString ? <GCText detail inverse >Valid until {expiryDateString}</GCText> : <GCText />}
          </View>
        </View>
      </TouchableOpacity>
    );
  } //end render

}// end CmnCouponTile

export function cmnCouponFaceValueStr(coupon) {
  const renderType = (coupon.type == 'fixed') ? ' RM' : '%'
  return (' ' + coupon.amount + renderType + ' Off')
}


const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    backgroundColor: COLORS.GC_THEME_DARK,
    borderRadius: 10,
    elevation: 2,
    margin: 10,
  },
  selected: {
    borderColor: COLORS.GC_HIGHLIGHT_IMPORTANT,
    borderWidth: 5,
    borderStyle: 'solid',
  },

  leftChild: {
    marginRight: 12,
    flex: .3
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    resizeMode: 'contain'
  },
  rightChild: {
    justifyContent: 'center',
    flex: .7
  },
});
