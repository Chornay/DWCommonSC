//20230515 added minimum charge
//20230515 added unweighedCount and unpricedSpecialCount calc
//20250511 renamed
//20250703 removed old style adjustments array

//if the order is fully priced we calculate the totalPrice including
//  calculating and applying the service level surcharge 
//  the (shop optional) delivery charge (if less than minimum order)

//NOTE ***********************************
//XXwhen we are initializing an order if everything is priced then we can set isApproved to true
//AFTER THAT an order can only be set as isApproved by Shop command
//BECAUSE they are allowed to price stuff and fix errors eg until they are happy


export function prjUpdateOrderPricing(order, firstTime = false) {
   let unpricedCount = 0
   let unweighedCount = 0
   let unpricedSpecialCount = 0
   let totalPrice = 0.0
   let servicesPrice = 0.0 //NOT currently saved in order
   let couponRedemption = 0.0
   let couponStatus = null
   let serviceSurchargeAmount = 0.0
   order.items.forEach((i) => {
      if (i.isPriced) { servicesPrice += i.netPrice }
      else {
         ++unpricedCount
         if (i.unitType == 'kg') { ++unweighedCount }
         else if (i.unitType == 'spc') { ++unpricedSpecialCount }
      }
   })
   totalPrice = servicesPrice

   //coupon processing if we have one
   //coupon status 'none'
   //               'applies' - total price is > minimum ... set redemption vallue
   //               'lessThanMinimum' - order is priced
   //               'maybe' - order is not priced
   // 

   couponRedemption = 0

   //coupon processing if we have one
   if (order.coupon) {
      const coupon = order.coupon
      if (totalPrice > coupon.minPurchase) {
         couponStatus = 'applies'
         switch (coupon.type) {
            case 'fixed':
               couponRedemption = coupon.amount; 
               if (couponRedemption > totalPrice ) {
                  //TODO special status for coupon value not used
                  couponRedemption = totalPrice
               }
               break;
            case 'percent': couponRedemption = servicesPrice * coupon.amount / 100;
               couponRedemption = Math.round(couponRedemption * 100) / 100 //round to 2 places
               break;
            default: break;
         }
      }
      else if (unpricedCount == 0) {
         couponStatus = 'lessThanMinimum'
      }
      else {
         couponStatus = 'maybe'
      }
   }
   else {
      couponStatus = 'none'
   }
   totalPrice -= couponRedemption


   //if we are fully priced then we can check for discount, service level surcharge 
   //  and see if a delivery charge applies (check for minimum order size)
   if (unpricedCount == 0) {

      // //coupon processing if we have one
      // if (order.coupon) {
      //    const coupon = order.coupon
      //    switch (coupon.type) {
      //       case 'fixed':
      //          couponRedemption = coupon.amount; break;
      //       case 'percent': couponRedemption = servicesPrice * coupon.amount / 100;
      //          couponRedemption = Math.round(couponRedemption * 100) / 100 //round to 2 places
      //          break;
      //       default: break;
      //    }
      // }

      //surcharge if we have elevated service level
      if (order.serviceSurchargePercent > 0) {
         serviceSurchargeAmount = totalPrice * order.serviceSurchargePercent / 100
         totalPrice += serviceSurchargeAmount
      } else {
         serviceSurchargeAmount = 0
      }
      // console.log(order.serviceSurchargePercent, order.serviceSurchargeAmount)

      if (order.minFreeDelivery > 0) { // 0 or -1 means no delivery charge applies
         if (totalPrice < order.minFreeDelivery) {
            order.deliveryChargeToApply = order.shopDeliveryCharge
            totalPrice += order.deliveryChargeToApply
         }
         else { order.deliveryChargeToApply = 0 }
      }
      else { // no delivery charge (this should already be zero)
         order.deliveryChargeToApply = 0
      }
   }

   //else there are unpriced items ... make sure all the above calculations are zero
   // BECAUSE we might have down a backwards and changed conditions  .l 
   else {
      // couponRedemption = 0

   }

   order.unpricedCount = unpricedCount
   order.unweighedCount = unweighedCount
   order.unpricedSpecialCount = unpricedSpecialCount
   order.totalPrice = totalPrice
   order.couponRedemption = couponRedemption
   order.couponStatus = couponStatus
   order.serviceSurchargeAmount = serviceSurchargeAmount
   //see comments at start 
   //WE CURRENTLY DONT DO THIS ... MAY ALLOW AS A SHOP OPTION
   // if (firstTime && (unpricedCount == 0)) { order.isApproved = true }

   //check for miniumum charge
   if (order.totalPrice < order.minCharge) {
      if (order.unpricedCount == 0) {
         order.minChargeStatus = 'applies'
         order.netPriceBeforeMinimum = order.totalPrice
         order.totalPrice = order.minCharge
      }
      else {
         order.minChargeStatus = 'maybe'
      }
   }
   else {
      order.minChargeStatus = 'none'
   }

}//end prjUpdateOrderPricing
