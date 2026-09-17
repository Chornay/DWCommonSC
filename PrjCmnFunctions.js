import { Platform } from 'react-native'
import { Alert } from 'react-native'
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import moment from 'moment';
import { strX } from 'DWcmn/I18n.js'
import { OrderStatusEnum } from 'DWcmn/Global';
import { ActionIconLookup } from 'DWcmn/Global';
import { cmnOrderActiveLocation } from 'DWcmn/CmnFunctions'
//20230526 moved prjCheckLocationPermission to prjcmnLocationFunctions

export function isBlank(str) {
   // return typeof value === 'string' && value.trim().length > 0;
   //NOTE || with falsey is dangerous so we just brute force it
   if (!str) return true
   return (/^\s*$/.test(str));
}

export function prjPriceListItemName(item, useLongName = false) {
   if (useLongName) { return (prjPriceListItemLongName(item)) }
   else { return (prjPriceListItemStr(item.name)) }
}//end prjPriceListItemName

//return either the name from the dict or the name itself if it starts with $
export function prjPriceListItemStr(name) {
   if (name.startsWith("$")) return name.slice(1)
   return strX('dict.' + name)
}//end prjPriceListItemStr

//NOTE that a '-' is expanded to ' - '
export function prjPriceListItemLongName(item) {
   if (!item.longName) return prjPriceListItemStr(item.name)
   if (item.longName instanceof Array) {
      let temp = ''
      item.longName.forEach((code) => {
         if (code == '-') { temp += ' - ' }
         else { temp += prjPriceListItemStr(code) }
      })
      return (temp)
   }
   return prjPriceListItemStr(item.longName)
}//end prjPriceListItemLongName

//returns 'Regular Service' 'Express Service' 'Same Day Service' or 'ERROR'
export function prjDisplayServiceLevel(level) {
   let result = ''
   switch (level) {
      case 'regular': result = strX('cstNEW.RegularService'); break;
      case 'express': result = strX('cstNEW.ExpressService'); break;
      case 'sameDay': result = strX('cstNEW.SameDayService'); break;
      default: result = strX('cmn.ERROR'); break;
   }
   return result
}//end prjDisplayServiceLevel

//returns 'xx%'
export function prjDisplayServiceSurchargePercentage(amount) {
   const result = amount + '%'
   return result
}//end prjDisplayServiceSurchargePercentage


export function prjAlertText(text) {
   Alert.alert(
      "", //no title
      text,
      [
         {
            text: strX('cmn.OK')

         }
      ],
      { cancelable: true }
   )
}//end prjAlertText


export function prjRouteTimeFormatted(route) {
   return route ? moment(route.schedDate).calendar() : ""
} //end prjRouteTimeFormatted

//this one is given a scheduled route time ...TODO better name needed
export function prjRouteName(routeDate, descrip) {
   
   const dateString = routeDate ? 
                         moment(routeDate).calendar(null, {
                           lastDay: '[Yesterday]',
                           sameDay: '[Today]',
                           nextDay: '[Tomorrow]',
                           lastWeek: '[last] dddd',
                           nextWeek: 'dddd',
                           sameElse: 'L'
                         }): ""
   return dateString + " " + descrip
   return routeDate ? moment(routeDate).calendar() : ""
} //end prjRouteName

//prjcmnCalculateEnclosingMapRegionWithLocArray moved
//prjcmnCalculateEnclosingMapRegionNEW moved


export function prjAlert(text, title = strX('cmn.System_Error')) {
   Alert.alert(
      title,
      text,
      [
         {
            text: strX('cmn.OK'),
            onPress: () => { }
         }
      ],
      { cancelable: false }
   )
}//end prjAlert

//we decide if the order has been pickup by looking for the statuses 
//BEFORE it has been pickup up ... everything else is TRUE
//TODOMISSED check hasbeenPickedUp
export function hasBeenPickedUp(status) {
   switch (status) {
      case OrderStatusEnum.initial:
      case OrderStatusEnum.readyForPickup:
      case OrderStatusEnum.assignedForPickup:
      case OrderStatusEnum.outForPickup:
      case OrderStatusEnum.missedPickup:
         return false
      default:
         return true
   }

}//end hasBeenPickedUp

//we decide if the order has been pickup by looking for the statuses 
//BEFORE it has been pickup up ... everything else is TRUE
//TODOMISSED check hasbeenPickedUpNEW
export function hasBeenPickedUpNEW(order) {
   switch (order.status) {
      case OrderStatusEnum.initial:
      case OrderStatusEnum.readyForPickup:
      case OrderStatusEnum.assignedForPickup:
      case OrderStatusEnum.outForPickup:
      case OrderStatusEnum.missedPickup:
         return false
      default:
         return true
   }

}//end hasBeenPickedUp

//true only for statuses where order is NOT on a truck
//TODO wonder about assignedForDelivery .. is that still in shop?
export function isInShop(status) {
   switch (status) {
      case OrderStatusEnum.atShop:
      case OrderStatusEnum.inShop:
      case OrderStatusEnum.readyForDelivery:
      case OrderStatusEnum.assignedForDelivery:
         return true
      default:
         return false
   }

}//end isInShop

//enumValue is an Enum (either OrderAction or RouteAction)

export function getIconCodeForAction(enumValue) {

   const text = enumValue.enumKey || 'invalid'
   return ActionIconLookup[text] || "INVALID"

}//end getIconCodeForAction
