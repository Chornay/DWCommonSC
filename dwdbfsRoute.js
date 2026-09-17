import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment'

import { RouteStatusEnum, RouteActionEnum } from 'DWcmn/Global';
import { prjAlert } from 'DWcmn/PrjCmnFunctions'
import { dwdbfsCustGetByAuth } from 'DWcmn/dwdbfsCust'
import { dwdbfsDrvGetByAuth } from 'DWcmn/dwdbfsDrv'
import { PaymentMethodEnum } from 'DWcmn/Global';
import { strX } from 'DWcmn/I18n';


export function dwdbfsRouteLoadSingleSnapshot(docSnapshot) {

   if (docSnapshot == null) { //take care of null just in case
      return null;
   }
   let dbRoute = docSnapshot.data()
   let { docId,
      status,
      schedDate,
      ...localRoute } = dbRoute
   localRoute.docId = docSnapshot.id
   localRoute.status = RouteStatusEnum.enumValueOf(dbRoute.status)
   localRoute.schedDate = dbRoute.schedDate.toDate()
   localRoute.selected = false //TODO not sure we need this
   // let dbRoute = docSnapshot.data()
   // let localRoute = {
   //   name: dbRoute.name,
   //   status: RouteStatusEnum.enumValueOf(dbRoute.status),
   //   schedDate: dbRoute.schedDate.toDate(),
   //   // statusDate: dbRoute.statusDate,
   //   orders: dbRoute.orders,
   //   shopId: dbRoute.shopId,
   //   // openTime: dbRoute.openTime,
   //   driverId: dbRoute.driverId,
   //   docId: docSnapshot.id,
   //   selected: false
   // }

   return localRoute;
} //end dwdbfsRouteLoadSingleSnapshot
