import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment'

import { OrderStatusEnum, OrderActionEnum, RouteStatusEnum, RouteActionEnum } from 'DWcmn/Global';
import { prjAlert } from 'DWcmn/PrjCmnFunctions'
import { prjcmnInShopArea } from 'DWcmn/prjcmnLocationFunctions'
import { dwdbfsCustGetByAuth } from 'DWcmn/dwdbfsCust'
import { PaymentMethodEnum } from 'DWcmn/Global';
import { strX } from 'DWcmn/I18n';

//20230509 change the return to not use {...}

// SHOP
// id: 
// shopId: //DEPRECATED??
// name:
// email:
// address:
// city: 
// phoneNumber: 
// whatsappNumber:
// location: shpData.location,
// boundary: {}
// isBuildingService:
// 
//   allowCash:      allows one of COP or COD
//   allowCashOnDelivery: allows cash on delivery
//   allowCashOnPickup:   allows cash on pickup
//   allowOnline:    allows online payment
//   allowLobbyAccess: defined for building service. true iff we can leave/pickup in lobby
//   allowUnitAccess: defined for building service. true iff we can enter building to unit
//   deliveryCharge: delivery charge if < minimum
//   dontDisplayAddress: true iff no physical presence
//   driverWeighs:   if a driver has the ability to weigh
//   hoursOfDeliveryRoutes: how many routes we offer for choice
//   hoursOfPickupRoutes:
//   imageSlider[]: array of jpeg promos for this shop
//   minFreeDelivery: minimum order for free delivery 
//   minCharge:       minimum order amount (careful if combining with minFreeDelivery)
//   requiresIOS: 
//   requiresShopVersion:
//   routeAvailableOffset: route no longer available x minutes before start
//   surchargeExpress: %charge for express service (-1 == not available)
//   surchargeSameDay: %charge for same day service (-1 == not available)
// 
// docId: shpDoc.id, //DEPRECATED

//returns the record or undefined
export async function dwdbfsComboShopGet(comboShopId) {
   try {
      const cmbShpDoc = await firestore().collection('ComboShops').doc(comboShopId).get();
      return cmbShpDoc.data()
      // if (shpDoc) {
      //    const shpData = shpDoc.data()
      //    return ({ ...shpData })
      // }
      // else {
      //    return null
      // }
   }
   catch (error) { prjAlert(error.message); return null }
}// end dwdbfsShopGet

//returns the record or undefined
export async function dwdbfsShopGet(shopId) {
   try {
      const shpDoc = await firestore().collection('Shops').doc(shopId).get();
      return shpDoc.data()
      // if (shpDoc) {
      //    const shpData = shpDoc.data()
      //    return ({ ...shpData })
      // }
      // else {
      //    return null
      // }
   }
   catch (error) { prjAlert(error.message); return null }
}// end dwdbfsShopGet

export async function dwdbfsComboShopGetByAuth(authId) {
   let shpData
   try {
      const querySnapshot = await firestore().collection('ComboShops').where('authId', "==", authId.toString()).limit(1).get();
      return (querySnapshot.empty ? null : querySnapshot.docs[0].data())
   }
   catch (error) { prjAlert(error.message); return null }
}// end dwdbfsComboShopGetByAuth

export function dwdbfsShopLoadSnapshots(querySnapshot) {

   let localShops = [];
   if (querySnapshot != null) { //take care of null just in case
      querySnapshot.forEach((doc) => {
         const shpData = doc.data()
         shpData.docId = doc.id
         localShops.push({ ...shpData })
      })
   }
   return localShops;
} //end dwdbfsShopLoadSnapshots

export async function dwdbfsGetShopHolidaySched(yyyy_mm) {
   try {
      const shpDoc = await firestore().collection('ShopConfigs').doc(shopId).get();
      if (shpDoc) {
         const shpData = shpDoc.data()
         return (
            shpData.holidays)
      }
      else {//return blank schedule 7 days + holiday
         return []
      }
   }
   catch (error) { prjAlert(error.message); }
}// end dwdbfsGetShopWeeklySched

export async function dwdbfsUpdateShopHolidaySched(shopId, sched) {
   await firestore().collection('ShopConfigs').doc(shopId).update({
      holidays: sched,
   })
}//end dwdbfsUpdateShopHolidaySched

export async function dwdbfsGetShopWeeklySched(shopId) {
   try {
      const shpDoc = await firestore().collection('ShopConfigs').doc(shopId).get();
      if (shpDoc) {
         const shpData = shpDoc.data()
         return (shpData.weekly)
      }
      else {//return blank schedule 7 days + holiday
         return [{}, {}, {}, {}, {}, {}, {}, {}]
      }
   }
   catch (error) { prjAlert(error.message); }
}// end dwdbfsGetShopWeeklySched

export async function dwdbfsUpdateShopWeeklySched(shopId, sched) {
   await firestore().collection('ShopConfigs').doc(shopId).update({
      weekly: sched,
   })
}//end dwdbfsUpdateShopWeeklySched

export async function dwdbfsShopGetPriceList(shopId) {
   try {
      const priceListDoc = await firestore().collection('PriceLists').doc(shopId).get({ source: 'server' });
      if (priceListDoc) {
         // const priceListData = priceListDoc.data().priceList
         // return priceListData
         return priceListDoc.data()
      }
      else {
         return null
      }
   }
   catch { (error => prjAlert(error.message)); }
}// end dwdbfsShopGetPriceList


//There is not easy way to do this so:
// 1. we use a query to find all shops within +/- .5 degree of longitude (~+/-50km) 
// 2. then we filter that list to find all shops within a similar distance of latitude
// 3. then we check each shop to see if our location is in their area (using inShopArea method)
export async function dwdbfsShopGetAllForThisLocation(location) {
   let shops = [] //the array to return
   try {
      const latitude = location.latitude
      const longitude = location.longitude
      const minLat = latitude - .5;
      const maxLat = latitude + .5;
      const minLong = longitude - .5;
      const maxLong = longitude + .5
      //first find all shops within ~50 km in each direction
      //BUT firestore can only have equalities on one field 
      //limit the lat here and the long at the next step
      let allShops = []
      let querySnapshot = {}
      querySnapshot = await firestore().collection("Shops")
         .where("location.latitude", ">", minLat)
         .where("location.latitude", "<", maxLat)
         .get()
      allShops = dwdbfsShopLoadSnapshots(querySnapshot)

      for (let i = 0; i < allShops.length; ++i) {
         const shop = allShops[i]
         const shopLong = shop.location.longitude
         if (shopLong > minLong && shopLong < maxLong) {
            if (prjcmnInShopArea(location, shop)) {
               shops.push(shop)
            }
         }
      }
   }
   catch (error) { // unexpected failure accessing db
      prjAlert(error.message)
   };
   return shops

}//end dwdbfsShopGetAllForThisLocation

//NOT USED
// export function dwdbfsLoadShopsSnapshot(querySnapshot) {

//    let localShops = [];
//    if (querySnapshot == null) { //take care of null just in case
//       return localShops;
//    }

//    querySnapshot.forEach((doc) => {
//       let dbShop = doc.data()
//       localShops.push({
//          id: dbShop.id,
//          name: dbShop.name,
//          email: dbShop.email,
//          address: dbShop.address,
//          city: dbShop.city,
//          phoneNumber: dbShop.phoneNumber,
//          // lat: dbShop.lat, //DEPRECATED
//          // long: dbShop.long, //DEPRECATED
//          location: dbShop.location,
//          docId: doc.id,

//       })
//    })
//    return localShops;
// } //end dwdbfsLoadShopsSnapshot

