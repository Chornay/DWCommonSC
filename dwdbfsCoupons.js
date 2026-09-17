import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import remoteConfig from '@react-native-firebase/remote-config';
import { cmnAlertPopup } from 'DWcmn/cmnAnnunciationFunctions'

//20250721 use remote_config to retrieve available coupons


//get all the coupons for a specific customer
//note that we add the document Id to the coupon data so we can delete/update it
//TODO we really should change query to include isUsed ... and build the index for it
export async function dwdbfsCouponsGetForCustomer(custId) {

   let querySnapshot = await firestore().collection("Coupons")
      .where("custId", "==", custId)
      .get()
   let localCoupons = [];
   querySnapshot.forEach((doc) => {
      const couponData = doc.data()
      couponData.docId = doc.id
      if (!couponData.isUsed) localCoupons.push(couponData)
   })
   return localCoupons;
} //end dwdbfsCouponsGetForCustomer

//writes a new coupon for a customer. Add the document id to the coupon
export async function dwdbfsCouponsAddNew(coupon) {
   try {
      const couponRef = await firestore().collection("Coupons").add(coupon)
      await couponRef.update({ id: couponRef.id })
      return (couponRef)
   }

   catch (error) {
      cmnAlertPopup({ text: error.message })
      return null
   }
}

//deletes a coupon using the doc id
//returns true iff successful
//A UTILITY FUNCTION THAT SHOULD SELDOM BE USED
export async function dwdbfsCouponsDelete(coupon) {
   try {
      let ref = firestore().collection('Coupons').doc(coupon.id)
      await ref.delete()
      return true
   }

   catch (error) {
      cmnAlertPopup({ text: error.message })
      return false
   }
}

export async function getRemoteStorage(key) {

   let parameterString = null
   try {
      await remoteConfig().setConfigSettings({
         minimumFetchIntervalMillis: 0, // force fetch every time DEBUG
      });
      await remoteConfig().fetchAndActivate();
      return await remoteConfig().getValue(key).asString();
   }
   catch (error) {
      cmnAlertPopup({ text: error.message })
      return null
   }
}

//get all available coupons
export async function dwdbfsCouponsGetAvailable(selShopId) {

   const couponsAsString = await getRemoteStorage('CouponAllAvailable')

   const metaData = JSON.parse(couponsAsString)
   let coupons = []

   for (const single of metaData) {

      //we have to calculate expiryDate from the expiry property
      const { expiry: expiryString, effective: effectiveString, ...coupon } = single

      //if the coupon is for a certain shop and it is not the customers then ignore it
      if (coupon.shopId && selShopId != coupon.shopId) {
         break;
      }

      let expiryTime
      if (/^\d+$/.test(expiryString)) {//they have specifed the length of validity in days
         //start with today and then add the duration in days
         //but then we want end of day on that day
         expiryTime = new Date();
         expiryTime.setDate(getDate() + expiryString);
         expiryTime.setHours(23, 59, 59, 999);
      }
      else if (!isNaN(new Date(expiryString).getTime())) {//expiry date is specified as a string
         expiryTime = new Date(expiryString)
      }
      else if (expiryString == undefined) {
         expiryTime = null
      }
      else {
         cmnAlertPopup({ text: `invalid expiry <${expiryString}>, coupon ignored` })
         break //////////////ignore this coupon
      }

      let effectiveDate
      if (effectiveString == undefined) {
         effectiveDate = null
      }
      else if (!isNaN(new Date(effectiveString).getTime())) {//expiry date is specified as a string
         effectiveDate = new Date(effectiveString)
      }
      else {
         cmnAlertPopup({ text: `invalid effective date <${effectiveString}>, coupon ignored` })
         break //////////////ignore this coupon
      }
      coupon.expiryDate = expiryTime
      coupon.effectiveDate = effectiveDate
      coupon.issueDate = new Date()
      coupons.push(coupon)
   }
   return coupons;
} //end dwdbfsCouponsGetAvailable

//add a welcome coupon to a (new) customer
export async function dwdbfsCouponsAddWelcome(custId) {

   const welcomeCouponAsString = await getRemoteStorage('CouponWelcome')

   const welcomeCoupon = JSON.parse(welcomeCouponAsString)
   welcomeCoupon.custId = custId
   try {
      const couponRef = await firestore().collection("Coupons").add(welcomeCoupon)
      await couponRef.update({ id: couponRef.id })
      return (couponRef)
   }

   catch (error) {
      cmnAlertPopup({ text: error.message })
      return null
   }


} //end dwdbfsCouponsAddWelcome
