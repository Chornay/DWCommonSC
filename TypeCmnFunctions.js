import GLOBALS from 'DWcmn/Global';
import { OrderStatusEnum } from 'DWcmn/Global'
import { strX } from 'DWcmn/I18n.js'

// the colours can not change … they must agree with the hard coded image colors
//TODOMISSED
export function cmnOrderStatusColor(appType, status) {

  if (appType === "drv") {
    switch (status) {
      case OrderStatusEnum.readyForPickup:
      case OrderStatusEnum.assignedForPickup:
      case OrderStatusEnum.outForPickup:
        return (GLOBALS.COLOR.STATUS_PICKING_UP);
      case OrderStatusEnum.pickedUp:
      case OrderStatusEnum.missedPickup:
        return (GLOBALS.COLOR.STATUS_PICKED_UP);
      case OrderStatusEnum.readyForDelivery:
      case OrderStatusEnum.assignedForDelivery:
      case OrderStatusEnum.outForDelivery:
        return (GLOBALS.COLOR.STATUS_DELIVERING);
      case OrderStatusEnum.delivered:
      case OrderStatusEnum.missedDelivery:
        return (GLOBALS.COLOR.STATUS_DELIVERED);
      default: return ('red');
    }

  }
  else if (appType === "shp") { //currently same as drv
    switch (status) {
      case OrderStatusEnum.readyForPickup:
      case OrderStatusEnum.assignedForPickup:
      case OrderStatusEnum.outForPickup:
        return (GLOBALS.COLOR.STATUS_PICKING_UP);
      case OrderStatusEnum.pickedUp:
      case OrderStatusEnum.missedPickup:
        return (GLOBALS.COLOR.STATUS_PICKED_UP);
      case OrderStatusEnum.readyForDelivery:
      case OrderStatusEnum.assignedForDelivery:
      case OrderStatusEnum.outForDelivery:
        return (GLOBALS.COLOR.STATUS_DELIVERING);
      case OrderStatusEnum.delivered:
      case OrderStatusEnum.missedDelivery:
        return (GLOBALS.COLOR.STATUS_DELIVERED);
      default: return ('red');
    }
  }
  else {
    return ('green');
  }
} //end cmnOrderStatusColor


//takes a special app type of 'HISTORY' because we want the CmnHistoryList status display
//  to be the same for every app.
export function cmnOrderStatusStr(appType, status) {
  let prop
  switch (appType) {
    case "HISTORY":
      prop = (status == null ? 'invalid' : status.enumKey)
      return (strX("history.orderStatusDescrip." + prop))
    case "cst":
      prop = (status == null ? 'invalid' : status.enumKey)
      return (strX("cst.orderStatusDescrip." + prop))
    case "drv":
      prop = (status == null ? 'invalid' : status.enumKey)
      return (strX("drv.orderStatusDescrip." + prop))
    case "shp":
      prop = (status == null ? 'invalid' : status.enumKey)
      return (strX("shp.orderStatusDescrip." + prop))
    default:
      return (strX("cmn.ERROR"))
  }
} //end cmnOrderStatusStr


//TODOMISSED cmnRouteStatusColor
export function cmnRouteStatusColor(appType, status) { //TODO check route status colours

  if (appType === "drv") {
    switch (status) {
      case OrderStatusEnum.readyForPickup:
      case OrderStatusEnum.assignedForPickup:
      case OrderStatusEnum.outForPickup:
        return ('#ff1a1a');
      case OrderStatusEnum.pickedUp: return ('#ff9999');
      case OrderStatusEnum.readyForDelivery: return ('#47d147');
      case OrderStatusEnum.delivered: return ('#adebad');
      default: return ('white');
    }
  }
  else if (appType === "shp") {
    return ('red')
  }
  else {
    return ('white');
  }
} //end cmnRouteStatusColor


export function cmnRouteStatusStr(appType, status) {
  let prop
  switch (appType) {
    case "drv":
      prop = (status == null ? 'invalid' : status.enumKey)
      return (strX("drv.routeStatusDescrip." + prop))
    case "shp":
      prop = (status == null ? 'invalid' : status.enumKey)
      return (strX("shp.routeStatusDescrip." + prop))
    default:
      return (strX("cmn.ERROR"))
  }
} //end cmnRouteStatusStr
