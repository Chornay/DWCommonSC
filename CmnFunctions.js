import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Toast } from 'native-base'
import { strX } from 'DWcmn/I18n.js'
import { RouteStatusEnum, OrderStatusEnum } from 'DWcmn/Global'
import { COLORS } from 'DWcmn/Global'
import { PrjListTextBold } from 'DWcmn/Prj'
import { GCText } from 'DWcmn/Gc'
import { prjRouteName } from 'DWcmn/PrjCmnFunctions'
import { PaymentMethodEnum } from 'DWcmn/Global'
import { prjFormatPaymentSummary } from 'DWcmn/prjFormatOrderFunctions'
import moment from 'moment';
import auth from '@react-native-firebase/auth';
import { cmnFormatAPrice } from './cmnFormatFunctions'
import { GoogleSignin, GoogleSigninButton, statusCodes, } from '@react-native-google-signin/google-signin';
// import { LoginManager } from 'react-native-fbsdk-next';

export function cmnCalendarDate(date) {
  const x = moment(date)
  return x.calendar(null, {
    lastDay: '[' + strX('cmn.date.Yesterday') + ']',
    sameDay: '[' + strX('cmn.date.Today') + ']',
    nextDay: '[' + strX('cmn.date.Tomorrow') + ']',
    lastWeek: '[' + strX('cmnNEW.Last') + '] dddd',
    nextWeek: 'dddd',
    sameElse: 'L'
  })

}

export function cmnOrderActiveLocation(order) {
  switch (order.status) {
    //waiting for pickup or in truck 
    case OrderStatusEnum.initial:
    case OrderStatusEnum.cancelled:
    case OrderStatusEnum.readyForPickup:
    case OrderStatusEnum.assignedForPickup:
    case OrderStatusEnum.outForPickup:
    case OrderStatusEnum.pickedUp:
    case OrderStatusEnum.missedPickup:
      return order.pickupStop.location
    // in the shop .. use home address
    case OrderStatusEnum.atShop:
    case OrderStatusEnum.inShop:
      return order.location
    //ready for delivery or in truck
    case OrderStatusEnum.readyForDelivery:
    case OrderStatusEnum.assignedForDelivery:
    case OrderStatusEnum.outForDelivery:
    case OrderStatusEnum.delivered:
    case OrderStatusEnum.missedDelivery:
      return order.deliveryStop.location
    case OrderStatusEnum.confirmed:
    case OrderStatusEnum.completed:
    default:
      return order.location
  } // end status switch
}

//Logout from firebase auth but we also want to logout from the underlying auth provider.
export async function cmnSignout() {
  await auth().signOut()
  // LoginManager&&LoginManager.logOut() //logout of Facebook if we used it to login
  // console.log(GoogleSignin)
  if (GoogleSignin) await GoogleSignin.signOut()
}

//Logout from firebase auth ... use this when we know we are email login
export async function cmnSignoutFirebaseOnly() {
  await auth().signOut()
}

//returns payment/pricing status info in a single component
//20250510 changed to use prjFormatPaymentSummary
export function cmnPaymentSummary(order) {
  const text = prjFormatPaymentSummary(order)
  return (
    <PrjListTextBold key={1}>{text}</PrjListTextBold>
  )

}//end cmnPaymentSummary

//returns an array of GCText components
//  starting with route name if the route is specified
//  then unit number (optional)
//  then address
//  then instructions (optional)
export function cmnFormatStopStyled(theStop, routeTime = null, routeDescrip="") {
  let returnArray = []
  let totalString = ""
  if (routeTime) {
    returnArray.push(<GCText style={{ alignSelf: 'flex-start' }} key='1'>{prjRouteName(routeTime, routeDescrip)}</GCText>)
  }
  if (theStop.unit) { totalString = strX('cmnNEW.Unit_') + theStop.unit + '\n' }
  totalString += theStop.address
  returnArray.push(<GCText key='2'> {totalString} </GCText>)
  if (theStop.instructions) {
    returnArray.push(<GCText style={{ alignSelf: 'flex-start' }} key='3' color={COLORS.GC_INSTRUCTIONS_HI}>{theStop.instructions} </GCText>)
  }
  return (returnArray)
}

export function statusColorForDriver(status) { //DEPRECATED
  switch (status) {
    case 'readyForPickup': return ('#ff1a1a');
    case 'pickedUp': return ('#ff9999');
    case 'readyForDelivery': return ('#47d147');
    case 'delivered': return ('#adebad');
    default: return ('white');
  }
} //end statusColorForDriver

//TODO customer will get a limited range of colors (maybe waiting for pickup, at shop, at the door
export function statusColorForCust(status) {
  switch (status) {
    default: return ('white');
  }

} //end statusColorForCust

//this returns a string for every status that should appear for a route
export function statusStrForRoute(status) { //TODO DEPRECATED
  let prop = (status == null ? 'invalid' : status.enumKey)
  // let prop = 'invalid'
  // switch (status) {
  //   case RouteStatusEnum.pending: prop = 'pending'; break;
  //   case RouteStatusEnum.locked: prop = 'locked'; break;
  //   case RouteStatusEnum.assigned: prop = 'assigned'; break;
  //   case RouteStatusEnum.open: prop = 'open'; break;
  //   case RouteStatusEnum.completed: prop = 'completed'; break;
  //   case RouteStatusEnum.accepted: prop = 'accepted'; break;
  //   case RouteStatusEnum.done: prop = 'done'; break;
  //   case RouteStatusEnum.invalid: prop = 'invalid'; break;
  //   default: prop = 'invalid'
  // }
  return (strX("route.statusDescrip." + prop))
} //end statusStrForRoute

//this returns a string only for those statuses that appear on a button
export function statusStrForCust(status) {
  switch (status) {
    case 'initial': return ('CANCEL');
    case 'delivered': return ('CONFIRM');
    default: return null;
  }
} //end statusStrForCust


export function statusStr(status) {
  switch (status) {
    case 'initial': return ('INITIAL');
    case 'readyForPickup': return ('READY FOR PICKUP');
    case 'pickedUp': return ('PICKED UP');
    case 'readyForDelivery': return ('READY FOR DELIVERY');
    case 'delivered': return ('DELIVERED');
    case 'completed': return ('DONE');
    default: return ('***');
  }
} //end statusStr
