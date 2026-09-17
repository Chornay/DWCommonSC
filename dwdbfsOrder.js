import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { cmnAlertPopup } from './cmnAnnunciationFunctions';
import moment from 'moment'

import { OrderStatusEnum, OrderActionEnum, RouteStatusEnum, RouteActionEnum } from 'DWcmn/Global';
import { prjAlert } from 'DWcmn/PrjCmnFunctions'
import { cmnFormatAPrice } from 'DWcmn/cmnFormatFunctions';
import { dwdbfsCustGetByAuth } from 'DWcmn/dwdbfsCust'
import { PaymentMethodEnum } from 'DWcmn/Global';
import { dwdbfsOrderGetById, dwdbfsOrderExtract } from 'DWcmn/DWDBfs'
import { cmnSendNotificationAsync } from 'DWcmn/cmnSendNotificationAsync'
import { strX } from 'DWcmn/I18n';

//to archive an order we just set the archive flag .. no transaction generated
export async function dwdbfsOrderArchive(id) {
   firestore().collection('Orders').doc(id).update({
      archive: true
   })
}// end dwdbfsGetCust

//this is the code for deleting from Orders table and moving to another table
export async function dwdbfsOrderArchiveDONTUSE(id) {
   try {
      const orderRef = await firestore().collection('Orders').doc(id);
      const orderDoc = await orderRef.get()
      if (orderDoc) {
         let newRef = firestore().collection('OrderArchive').doc(orderDoc.data().id)
         await newRef.set(orderDoc.data())
         await orderRef.delete()
      }
   }
   catch (error) { prjAlert(error.message); }
}// end dwdbfsGetCust

//TODO pass current status
//TODO this should be batched
//mark the order as cancelled and remove it from any routes it is in.
//AND we have to remove the route ids from the order
export async function dwdbfsOrderCancel(id, currStatus, shopId, pickupRouteId, deliveryRouteId) {
   try {
      const transTime = new Date();
      const orderRef = await firestore().collection('Orders').doc(id);
      await orderRef.update({
         archive: true,
         status: OrderStatusEnum.cancelled.enumKey,
         transTime: transTime,
         pickupRouteId: null,
         pickupRouteTime: null,
         pickupRouteDescrip: null,
         deliveryRouteId: null,
         deliveryRouteTime: null,
         deliveryRouteDescrip: null,
         routesArray: [],
         transactions: firestore.FieldValue.arrayUnion({
            transDate: transTime,
            status: OrderStatusEnum.cancelled.enumKey,
            prevStatus: currStatus.enumKey,
         })
      })
      const pickupRef = firestore().collection("ShopTop").doc(shopId).collection("Routes").doc(pickupRouteId)
      const deliveryRef = firestore().collection("ShopTop").doc(shopId).collection("Routes").doc(deliveryRouteId)
      if (pickupRef) {
         await pickupRef.update({ ['orders.' + id]: firestore.FieldValue.delete() })
      }
      if (deliveryRef) {
         await deliveryRef.update({ ['orders.' + id]: firestore.FieldValue.delete() })
      }
   }
   catch (error) { prjAlert(error.message); }
}// end dwdbfsOrderCancel

//returns the new document id
//will throw error for any error ... 
//20250302 new
// export async function dwdbfsOrderChangeId(oldId, newId) {

//    const oldDoc = await firestore().collection('Orders').doc(oldId).get();
//    let oldRec = oldDoc.data()

//    await firestore().runTransaction(async trnx => {
//       let newRef
//       newRef = firestore().collection('Orders').doc(newId)
//       oldRec.id = newId
//       trnx.set(newRef, oldRec)

//       // trnx.update(firestore().collection("ShopTop").doc(oldRec.shopId).collection("Routes").doc(oldRec.pickupRouteId), 
//       // {  ['orders.' + newId]: 'pickup' })
//       // trnx.update(firestore().collection("ShopTop").doc(oldRec.shopId).collection("Routes").doc(oldRec.deliveryRouteId),
//       //  { ['orders.' + newId]: 'delivery' })
//       trnx.update(firestore().collection("ShopTop").doc(oldRec.shopId).collection("Routes").doc(oldRec.pickupRouteId),
//          { ['orders.' + oldId]: firestore.FieldValue.delete(), ['orders.' + newId]: 'pickup' })
//       trnx.update(firestore().collection("ShopTop").doc(oldRec.shopId).collection("Routes").doc(oldRec.deliveryRouteId),
//          { ['orders.' + oldId]: firestore.FieldValue.delete(), ['orders.' + newId]: 'delivery' })


//    })

// }



//20250208 added to be used when scanning a QR code to display the order
//TODO implement shop check (by looking inside record or from the id itself?)
export async function dwdbfsOrderDoesIdExistInThisShop(orderId) {
   try {
      const orderDoc = await firestore().collection('Orders').doc(orderId).get();
      return orderDoc.exists
   }
   catch (error) { prjAlert(error.message); return false }
}// end dwdbfsOrderDoesIdExistInThisShop

export async function dwdbfsOrderReschedule(orderMod) {

   let batch = firestore().batch()
   //we have orderMod the modified order which will have any scheduled changes

   //let's get the original unmodified order from the db
   const original = await dwdbfsOrderGetById(orderMod.id)

   if (original) {

      const shopId = original.shopId
      const id = original.id

      const originalPickupRouteId = original.pickupRouteId
      const modPickupRouteId = orderMod.pickupRouteId
      const isPickupChg = (originalPickupRouteId != modPickupRouteId)

      const originalDeliveryRouteId = original.deliveryRouteId
      const modDeliveryRouteId = orderMod.deliveryRouteId
      const isDeliveryChg = (originalDeliveryRouteId != modDeliveryRouteId)

      //remove the pickup from one route and load in the other
      if (isPickupChg) {
         const originalPickupRef = firestore().collection("ShopTop").doc(shopId).collection("Routes").doc(originalPickupRouteId)
         if (originalPickupRef) { batch.update(originalPickupRef, { ['orders.' + id]: firestore.FieldValue.delete() }) }
         const modPickupRef = firestore().collection("ShopTop").doc(shopId).collection("Routes").doc(modPickupRouteId)
         if (modPickupRef) { batch.update(modPickupRef, { ['orders.' + id]: 'pickup' }) }
      }

      //remove the delivery from one route and load in the other
      if (isDeliveryChg) {
         const originalDeliveryRef = firestore().collection("ShopTop").doc(shopId).collection("Routes").doc(originalDeliveryRouteId)
         if (originalDeliveryRef) { batch.update(originalDeliveryRef, { ['orders.' + id]: firestore.FieldValue.delete() }) }
         const modDeliveryRef = firestore().collection("ShopTop").doc(shopId).collection("Routes").doc(modDeliveryRouteId)
         if (modDeliveryRef) { batch.update(modDeliveryRef, { ['orders.' + id]: 'delivery' }) }
      }

      //set pointers to the routes in the order
      //we should be able to do this with testing for change of pickup/delivery ... values will just stay the same
      const orderRef = firestore().collection('Orders').doc(id);
      batch.update(orderRef, {
         pickupRouteTime: orderMod.pickupRouteTime,
         pickupRouteId: orderMod.pickupRouteId,
         pickupRouteDescrip: orderMod.pickupRouteDescrip,
         deliveryRouteTime: orderMod.deliveryRouteTime,
         deliveryRouteId: orderMod.deliveryRouteId,
         deliveryRouteDescrip: orderMod.deliveryRouteDescrip,
         routesArray: [orderMod.pickupRouteId, orderMod.deliveryRouteId]
      })

      //now commit our changes
      await batch.commit()
   }

}

export async function dwdbfsOrderGetByQrCode(qrCode) {
   try {
      // console.log(qrCode.toString())
      const querySnapshot = await firestore().collection('Orders').where('codeFromQr', "==", qrCode.toString()).limit(1).get();
      if (querySnapshot.empty) {
         return null
      }
      else {
         return dwdbfsOrderExtract(querySnapshot.docs[0].data())
      }
   }
   catch (error) { prjAlert(error.message); return null }
}// end dwdbfsOrderGetByQrCode

//NOTE that price is only used for notification
export async function dwdbfsOrderUpdateAsApproved(order) {
   const { id, totalPrice, token } = order
   const transTime = new Date();
   await firestore().collection('Orders').doc(id).update({
      statusTime: transTime,
      isApproved: true,
      transactions: firestore.FieldValue.arrayUnion({
         transDate: transTime,
         strX: "trans.pricingComplete",
      })
   })
   try {
      if (token) {
         cmnSendNotificationAsync(token,
            { text: strX("cmnNEW.notify.OrderIsPriced", { "price": cmnFormatAPrice(totalPrice) }) });
      }
   }
   catch (error) {
      //TODO annunciate error
   }
}//end dwdbfsOrderUpdateAsApproved

//returns true iff successful
//catches and annunciates any errors
export async function dwdbfsOrderUpdateFields(orderId, fields) {
   try {
      await firestore().collection('Orders').doc(orderId).update({
         ...fields
      })
      return true
   }
   catch (err) {
      cmnAlertPopup({ title: strX('cmnNEW.ErrorUpdatingOrder'), text: err.message })
      return false
   }
}//end dwdbfsOrderUpdateFields


//Update the record with shop changes
//We will replace the entire items array and update totals and counts
export async function dwdbfsOrderChange(order, index) {
   const orderDoc = order.docId
   const items = order.items
   let chg = {}
   const transTime = Date.now();
   //////////////////orderRec.transTime = transTime;

   //FOR NOW don't bother with pricing transaction
   // ??orderRec.status = newStatus;
   // const currStatus = orderRec.status.enumKey;
   // orderRec.transactions.push(
   //   realm.create('Transaction', { status: newStatus, prevStatus: currStatus, transDate: transTime })
   // );

   //we used items as an array internally but stored in db as an object of key,value pairs
   let itemsObj = {}
   for (const item of order.items) {
      let { code, ...temp } = item
      // temp.isPriced = item.netPrice != 0
      itemsObj[item.code] = temp
   }

   await firestore().collection('Orders').doc(order.docId).update({
      statusTime: transTime,
      couponRedemption: order.couponRedemption,
      deliveryChargeToApply: order.deliveryChargeToApply,
      minChargeStatus: order.minChargeStatus,
      totalPrice: order.totalPrice,
      shopDeliveryCharge: order.shopDeliveryCharge,
      serviceSurchargeAmount: order.serviceSurchargeAmount,
      serviceSurchargePercent: order.serviceSurchargePercent,
      unpricedCount: order.unpricedCount,
      unweighedCount: order.unweighedCount,
      unpricedSpecialCount: order.unpricedSpecialCount,
      items: itemsObj
   })
}//end dwdbfsOrderChange

//NOTE that price is only used for notification
export async function dwdbfsOrderAddQrCode(order, codeFromQr) {
   const { id } = order
   try {
      await firestore().collection('Orders').doc(id).update({
         codeFromQr: codeFromQr,
      })
   }
   catch (error) {
      cmnAlertPopup({ title: strX('cmnNEW.ErrorUpdatingOrder'), text: error.message })
   }
}//end dwdbfsOrderUpdateAsApproved

//Update the record with the new item pricing
//AND update all the pricing fields that may have been recalculated
//..following comments may no longer apply .. TODO check//////////////////////
//TODO need a way to indicate order pricing transaction .. for now omit
//TODO we may want to be able to have just weight and calculate the netPrice here
//  (but the net price should have been viewed and approved by shop so we shouldn't be redoing here)
export async function dwdbfsOrderUpdateItemPricing(order, index) {
   const orderDoc = order.docId
   const items = order.items
   const item = items[index]
   let chg = {}
   const transTime = Date.now();
   //////////////////orderRec.transTime = transTime;

   //FOR NOW don't bother with pricing transaction
   // ??orderRec.status = newStatus;
   // const currStatus = orderRec.status.enumKey;
   // orderRec.transactions.push(
   //   realm.create('Transaction', { status: newStatus, prevStatus: currStatus, transDate: transTime })
   // );
   await firestore().collection('Orders').doc(order.docId).update({
      statusTime: transTime,
      couponRedemption: order.couponRedemption,
      deliveryChargeToApply: order.deliveryChargeToApply,
      minChargeStatus: order.minChargeStatus,
      totalPrice: order.totalPrice,
      shopDeliveryCharge: order.shopDeliveryCharge,
      serviceSurchargeAmount: order.serviceSurchargeAmount,
      serviceSurchargePercent: order.serviceSurchargePercent,
      unpricedCount: order.unpricedCount,
      unweighedCount: order.unweighedCount,
      unpricedSpecialCount: order.unpricedSpecialCount,
      ['items.' + item.code + '.count']: item.count,
      ['items.' + item.code + '.weight']: item.weight,
      ['items.' + item.code + '.netPrice']: item.netPrice,
      ['items.' + item.code + '.isPriced']: true,
   })
}//end dwdbfsOrderUpdateItemPricing
