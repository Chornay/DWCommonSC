import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment'

import { OrderStatusEnum, OrderActionEnum, RouteStatusEnum, RouteActionEnum } from 'DWcmn/Global';
import { prjAlert } from 'DWcmn/PrjCmnFunctions'
import { dwdbfsCustGetByAuth } from 'DWcmn/dwdbfsCust'
import { dwdbfsDrvGetByAuth } from 'DWcmn/dwdbfsDrv'
import { PaymentMethodEnum } from 'DWcmn/Global';
import { strX } from 'DWcmn/I18n';



//driver opens the route
//  set route status and owning driver
//  any order waiting for pickup or delivery is marked as 'out'
//for some status changes we record the time in the base fields
//in all cases we record the status change as a transaction
//returns true iff we handled a command
export async function dwdbfsRouteDriverActionNEW(driverId, route, orders, action) {

   const transTime = new Date();
   const routeRef = firestore().collection("ShopTop").doc(route.shopId).collection('Routes').doc(route.docId)
   let newRouteStatus

   let batch = firestore().batch()

   //driver assumes control of route .. route is marked as open
   //as necessary 
   if (action == RouteActionEnum.open) {
      newRouteStatus = RouteStatusEnum.open
      orders.forEach((order) => {
         switch (order.status) {
            case OrderStatusEnum.assignedForPickup:
            case OrderStatusEnum.readyForPickup:
               updateOrder(batch, driverId, order, OrderStatusEnum.outForPickup, transTime)
               break;
            case OrderStatusEnum.assignedForDelivery:
            case OrderStatusEnum.readyForDelivery:
               updateOrder(batch, driverId, order, OrderStatusEnum.outForDelivery, transTime)
               break;
            default:
               updateOrder(batch, driverId, order, null, transTime) //just add driverId to order
         }
      })
   }
   //driver is at stop ... route is marked as completed
   //mark all incoming orders at 'atShop' and remove driver from route and all orders
   else if (action == RouteActionEnum.truckAtShop) {
      newRouteStatus = RouteStatusEnum.completed
      orders.forEach((order) => {
         switch (order.status) {
            case OrderStatusEnum.pickedUp:
               updateOrder(batch, null, order, OrderStatusEnum.atShop, transTime)
               break;
            default:
               updateOrder(batch, null, order, null, transTime)//just remove driverId from order
         }
      })
   }
   //driver releases route ... must revert back to locked status
   //status as necessary reverts from 'outFor' to 'readyFor'. Driver is removed from all orders
   else if (action == RouteActionEnum.releaseRoute) {
      newRouteStatus = RouteStatusEnum.locked
      orders.forEach((order) => {
         switch (order.status) {
            case OrderStatusEnum.outForPickup:
               updateOrder(batch, null, order, OrderStatusEnum.readyForPickup, transTime)
               break;
            case OrderStatusEnum.outForDelivery:
               updateOrder(batch, null, order, OrderStatusEnum.readyForDelivery, transTime)
               break;
            default:
               updateOrder(batch, null, order, null, transTime) //just add driverId to order
         }
      })
   }

   else {
      return false
   }

   batch.update(routeRef, {
      driverId: driverId,
      status: newRouteStatus.enumKey,
      statusDate: transTime
   })

   await batch.commit()

   return true
}//end dwdbfsRouteDriverActionNEW


//update the order as part of the route open/close by a driver
//on 'open'ing the route: driverId non-null, newRouteStatus for anything waiting for pickup/delivery
//on 'close'ing the route: driverId null, new Status for anything that has been picked up
updateOrder = (batch, driverId, { docId, status }, newRouteStatus, transTime) => {

   const orderRef = firestore().collection('Orders').doc(docId)
   if (!newRouteStatus) { //just 'own' the order .. or 'release' if driverId is null
      batch.update(orderRef, { driverId: driverId })
   }
   else {
      batch.update(orderRef, {
         driverId: driverId,
         status: newRouteStatus.enumKey,
         transTime: transTime,
         transactions: firestore.FieldValue.arrayUnion({
            transDate: transTime,
            status: newRouteStatus.enumKey,
            prevStatus: status.enumKey,
         })
      })
      transactions: firestore.FieldValue.arrayUnion({ xyz: '1234' })

   }
}//end updateOrder

