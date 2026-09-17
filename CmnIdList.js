import React, { Component } from 'react'
import { View } from 'react-native'

import { APP } from 'DWcmn/APP'
import { ListItemXYZ } from 'DWcmn/GCNB'
import { PrjListText } from 'DWcmn/Prj';
import { GCText, GCI18n } from 'DWcmn/Gc'
import { cmnOrderStatusColor, cmnOrderStatusStr } from 'DWcmn/TypeCmnFunctions'
import { cmnPaymentSummary, cmnFormatStopStyled } from 'DWcmn/CmnFunctions'
import { CmnServiceLevelBanner } from 'DWcmn/CmnServiceLevelBanner'


//prop order
export default class CmnIdList extends Component {
  render() {
    const appType = APP.getAppType()
    const order = this.props.order
    const status = order.status
    const paymentSummary = cmnPaymentSummary(order)
    return (
      <View style={{flex:0}}>
        <CmnServiceLevelBanner level={order.serviceLevel} style={{ height: 30 }} />
        {this.formLine('cmn.Status',
          <PrjListText style={{ color: cmnOrderStatusColor(appType, status) }}>{cmnOrderStatusStr(appType, status)}</PrjListText>, true)}
        {this.formLine('cmnNEW.Number', order.id)}
        {this.formLine('cmnNEW.Pricing', paymentSummary, true)}
        {this.formLine('cmn.Name', order.name)}
        {this.formLine('cmn.Address', order.address)}
        {this.formLine('cmn.Phone', order.phoneNumber)}
        {(order.pickupRouteId) && this.formLine('cmnNEW.Pickup', cmnFormatStopStyled(order.pickupStop, order.pickupRouteTime, order.pickupRouteDescrip), true)}
        {(order.deliveryRouteId) && this.formLine('cmnNEW.Delivery', cmnFormatStopStyled(order.deliveryStop, order.deliveryRouteTime, order.deliveryRouteDescrip), true)}
      </View>
    );
  } //end render

  // left - an i18n tag for the name of the field to be displayed
  // right - the value of the field
  // styled - true iff the 'right' field is already styled

  formLine(left, right, styled = false) {
    const COL1 = .3
    const COL2 = .7
    return (
      <View>
        <ListItemXYZ style={{ marginLeft: 0 }}>
          <View style={{ flex: COL1 }}><GCI18n code={left} /></View>
          {(styled) ? <View style={{ flex: COL2 }}>{right}</View> :
            <View style={{ flex: COL2 }}><GCText>{right}</GCText></View>}
        </ListItemXYZ>
      </View>)
  }
}// end CmnIdList



