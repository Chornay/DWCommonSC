import { strX } from 'DWcmn/I18n'
import { PaymentMethodEnum } from 'DWcmn/Global';
import { cmnFormatAPrice, cmnFormatAWeight, cmnFormatShortUnitPrice } from 'DWcmn/cmnFormatFunctions';

//20250508 created by moving from CmnViewOrder and changing to external

export function prjFormatItemPricing(item) {

   let amtStr = ''; //this value is local

   let pricingStr = '';
   let netPriceStr = '';
   let unitPriceStr; //this value is calculated and returned .. BUT no one currently uses it

   if (item.unitType == 'pc') { //pricing by piece

      if (item.isPriced) {
         amtStr = item.count.toString()
         netPriceStr = cmnFormatAPrice(item.netPrice)
      }
      else { //no count specified .... don't expect this case 
         amtStr = '___'
         netPriceStr = null
      }
      // pricingStr = amtStr + " pc @ " + cmnFormatAPrice(item.unitPrice) + '/pc'
      pricingStr = amtStr + " pc @ " + cmnFormatShortUnitPrice(item.unitType, item.unitPrice)
   }

   else if (item.unitType == 'kg') { //pricing by weight
      if (item.isPriced) {
         amtStr = cmnFormatAWeight(item.weight)
         netPriceStr = cmnFormatAPrice(item.netPrice)
      }

      else {
         amtStr = '___ ' + item.unitType
         netPriceStr = null
      }
      // pricingStr = amtStr + " @ " + cmnFormatAPrice(item.unitPrice) + '/' + item.unitType
      pricingStr = amtStr + " @ " + cmnFormatShortUnitPrice(item.unitType, item.unitPrice)
   }

   else if (item.unitType == 'yesNo') { //a logical but may have a price
      if (!!item.unitPrice) {
         netPriceStr = cmnFormatAPrice(item.unitPrice)
      } else {
         netPriceStr = 'YES'
      }
      unitPriceStr = null
      pricingStr = null
   }

   else { //special (custom) pricing
      amtStr = strX('cmn.Special')
      if (item.isPriced) {
         unitPriceStr = cmnFormatAPrice(item.unitPrice)
         netPriceStr = cmnFormatAPrice(item.netPrice)
         pricingStr = strX('cmn.CUSTOM')
      } else {
         unitPriceStr = '___'
         netPriceStr = null
         pricingStr = strX('cmn.CUSTOM')
      }
   } //end else
   return ({ pricingStr, netPriceStr, unitPriceStr })
}// end prjFormatItemPricing

export function prjFormatServiceLevel(level) {
   switch (level) {
      case 'regular': return (strX('cstNEW.RegularService'));
      case 'express': return (strX('cstNEW.ExpressService'));
      case 'sameDay': return (strX('cstNEW.SameDayService'));
      default: return (strX('cmn.ERROR'));
   }
}//end prjFormatServiceLevel

//returns a payment/pricing status string
export function prjFormatPaymentSummary(order) {

   //some tricky bits
   //if an order is unpriced it will never have a paid payment status
   //if an order is unpriced it will never have a 'pay on' status
   //BUT for payLater we don't say unpriced is DUE (that wouldn't be fair :) )
   //NOTE that paymentMethod could be initial if the app is interrupted before choosing a payment option
   let paidStr = ''
   switch (order.paymentMethod) {
      case PaymentMethodEnum.initial:
         paidStr = strX("cmnNEW.Unpaid"); break;
      case PaymentMethodEnum.payDelivery:
         paidStr = strX("cmnNEW.DUEonDelivery"); break;
      case PaymentMethodEnum.payPickup:
         paidStr = strX("cmnNEW.DUEonPickup"); break;
      case PaymentMethodEnum.payLater:
         if (order.isApproved) {paidStr = strX("cmnNEW.DUE")}
         else {
            if (order.unpricedCount!=0 ) {paidStr=""} // because we will be adding "Unpriced" below
            else {paidStr=strX("cmnNEW.WaitingForApproval")}
         }
         break;
      case PaymentMethodEnum.paidCash:
      case PaymentMethodEnum.paidPickup:
      case PaymentMethodEnum.paidDelivery:
         paidStr = strX("cmnNEW.PAIDCash"); break;
      case PaymentMethodEnum.paidOnline:
         paidStr = strX("cmnNEW.PAIDOnline"); break;
      default:
         paidStr = strX("cmn.ERROR"); break;
   }

   let text = order.unpricedCount==0 ? cmnFormatAPrice(order.totalPrice) : strX("cmnNEW.Unpriced")
   text += ' '
   text += paidStr
   return text
}//end prjFormatPaymentSummary
