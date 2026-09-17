import { Platform } from 'react-native'
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native'
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
// import geolib from 'geolib'
import moment from 'moment';
import { strX } from 'DWcmn/I18n.js'
import { prjAlert } from 'DWcmn/PrjCmnFunctions'
import { OrderStatusEnum } from 'DWcmn/Global';
import { ActionIconLookup } from 'DWcmn/Global';
import { cmnOrderActiveLocation } from 'DWcmn/CmnFunctions'
import { dwdbfsShopLoadSnapshots } from 'DWcmn/dwdbfsShop'
import { dwdbfsShopGet } from './dwdbfsShop';

//20230228 created by moving several modules from PrjCmnFunctions
//20230525 add DEMO mode to prjcmnFindNearbyShops
//20250519 added our own isPointInPolygon to avoid r-n-contains-location and geolib@2 problems

//returns the bounding parameters for a map {latitude,longitude,latitudeDelta,longitudeDelta}
//orders is an array of orders {lat,long}
//NOTE will work for any array of objects containing location:{latitude:_,longitude:_}
//position optionally contains the current position {latitude,longitude}
//NOTE that 20% is added to leave 10% padding from the outermost
//NOTE now Mapview has mapPadding property that we could use instead (specified for every map)
export function prjcmnCalculateEnclosingMapRegion(orders, position) {

   let MINDELTA = 0.01 //1 km-ish
   let missingPos = (position == null)
   let missingOrders = (orders == null || orders.length == 0)

   //don't bother with this anymore. no orders and no pos ==> world map
   // if (missingOrders && missingPos) {
   //     return null
   // }

   let minLat = 90.0;
   let maxLat = -90.0;
   let minLong = 180.0;
   let maxLong = -180.0;

   if (!missingPos) { // if we have a current location it will be included in map
      minLat = position.latitude;
      maxLat = position.latitude;
      minLong = position.longitude;
      maxLong = position.longitude;
   }

   //TODO really should be checking for orders without lat/long
   orders.map((order) => {
      let activeLocation = cmnOrderActiveLocation(order)
      const orderLat = activeLocation.latitude
      const orderLong = activeLocation.longitude
      if (orderLat < minLat) { minLat = orderLat }
      if (orderLat > maxLat) { maxLat = orderLat }
      if (orderLong < minLong) { minLong = orderLong }
      if (orderLong > maxLong) { maxLong = orderLong }
   })
   let centerLat = (minLat + maxLat) / 2.0
   let centerLong = (minLong + maxLong) / 2.0
   let deltaLat = Math.abs(maxLat - minLat) * 1.2
   let deltaLong = Math.abs(maxLong - minLong) * 1.2

   //make sure that the map is not too small
   //NOTE this includes the single point case where deltas will be zero
   if (deltaLat <= MINDELTA) { deltaLat = MINDELTA }
   if (deltaLong <= MINDELTA) { deltaLong = MINDELTA }

   return ({
      latitude: centerLat, longitude: centerLong,
      latitudeDelta: deltaLat, longitudeDelta: deltaLong
   })
} //end prjcmnCalculateEnclosingMapRegion



export function prjcmnCalculateEnclosingMapRegionWithLocArray(locationArray, position) {
   let outputArray = []
   locationArray.forEach(
      (location) => {
         outputArray.push({ location: location })
      }
   )
   return prjcmnCalculateEnclosingMapRegion(outputArray, position)
}


//NOTE for a Demo user will only return the DEMO shop
export async function prjcmnFindNearbyShops(location, isDemoUser = false) {
   let nearbyShops = []

   if (isDemoUser) {
      try {
         const record = await dwdbfsShopGet('DEMO')
         if (record ) {nearbyShops.push(record)}
         const record2 = await dwdbfsShopGet('DEMOBLDG')
         if (record2 ) {nearbyShops.push(record2)}
      } catch (error) { // unexpected failure accessing db
         prjAlert(error.message)
      }

      return nearbyShops
   }

   try {
      const latitude = location.latitude
      const longitude = location.longitude
      // .1 degree ~ 100km / 10
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
            if ( prjcmnInShopArea(location, shop)) {
               nearbyShops.push(shop)
            }
         }
      }
   }
   catch (error) { // unexpected failure accessing db
      prjAlert(error.message)
   }

   return nearbyShops

}//end prjcmnFindNearbyShops


//returns true iff location is inside the shop's delivery area
// location {latitude,longitude}
// shop     shop record
// annunciate (optional) display any errors caught (default=true)
//NOTE modified 230301 to return true if shop is null NOTE
export function prjcmnInShopArea(location, shop, annunciate = true) {

   //if they didn't give us a shop we will say the location is okay
   if (!shop) return true

   if (!location || !shop.boundary) {
      return false
   }

   try {
      const response = isPointInPolygon(location, shop.boundary)
      return response
   } catch (error) {
      if (annunciate) {
         prjAlert(error.message)
         return false
      }
   }
}// end prjcmnInShopArea

//requestFlag is true iff we will ask for permission if not already available
export async function prjCheckLocationPermission(requestFlag) {
   try {
      let granted = false
      const desiredPermission = (Platform.OS === 'ios') ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
         : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      // const desiredPermission= PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION

      //check to see if we have location permission
      const result = await check(desiredPermission)
      granted = result === RESULTS.GRANTED

      //if no permission then ask (but only if caller wants us to ... requestFlag)
      if ((!granted) && requestFlag) {
         let replyStr = await request(
            desiredPermission,
            {
               title: strX('cmn.geolocat.title'),
               message: strX('cmn.geolocat.message'),
               buttonNeutral: strX('cmn.geolocat.buttonNeutral'),
               buttonNegative: strX('cmn.geolocat.buttonNegative'),
               buttonPositive: strX('cmn.geolocat.buttonPositive'),
            })
         granted = (replyStr === RESULTS.GRANTED) //see docs for other possibilities
      }

      return granted
   }
   catch (error) {
      prjAlert(error.message)
      return false
   }

}//end prjCheckLocationPermission
function isPointInPolygon(point, polygon) {
  let isInside = false;
  const { latitude: x, longitude: y } = point;

  // Loop through each edge of the polygon
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const { latitude: xi, longitude: yi } = polygon[i];
    const { latitude: xj, longitude: yj } = polygon[j];

    // Check if the point is inside the polygon using ray-casting
    const intersect =
      yi > y !== yj > y &&
      x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

    if (intersect) isInside = !isInside;
  }

  return isInside;
}