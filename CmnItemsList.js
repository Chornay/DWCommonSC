import React, { Component } from 'react'
import { View, ScrollView, FlatList, TouchableOpacity, StyleSheet, Switch, } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Platform } from 'react-native'

import { ListItem } from 'native-base';

import { PrjIconButton } from 'DWcmn/Prj';
import { cmnFormatAPrice, cmnFormatAWeight, cmnFormatShortUnitPrice } from 'DWcmn/cmnFormatFunctions';
import { prjDisplayServiceLevel, prjDisplayServiceSurchargePercentage } from 'DWcmn/PrjCmnFunctions'
import { prjPriceListItemName } from 'DWcmn/PrjCmnFunctions'
import { cmnPaymentDetails } from 'DWcmn/CmnFunctions'
import { CmnServiceLevelBanner } from 'DWcmn/CmnServiceLevelBanner'
import CmnPriceItemDialog from 'DWcmn/CmnPriceItemDialog'
import { PaymentMethodEnum } from 'DWcmn/Global'
import { prjFormatItemPricing } from 'DWcmn/prjFormatOrderFunctions'
import { GCI18n, GCText } from './Gc'
import { cmnCouponFaceValueStr } from 'DWcmn/CmnCouponTile'
import GLOBALS from 'DWcmn/Global';
import { APP } from 'DWcmn/APP'
import { COLORS } from 'DWcmn/Global';
import { strX } from 'DWcmn/I18n';

//20210917 removed the line between an item and its remarks
//20230515 combined delivery charge amount and warning in single line
//20230515 removed all old commented code
//20230619 added fit parameter to some GCText fields (warnings for example)
//20250703 removed old style adjustments

const paymentIdAsString = {

   //online banking
   16: "FPXTPA",
   6: "Maybank2U",
   8: "AllianceOnline",
   10: "AmOnline",
   14: "RHBOnline",
   15: "HongLeongOnline",
   20: "CIMBClicks",
   31: "PublicBankOnline",
   102: "BankRakyatInternetBanking",
   103: "AffinOnline",
   122: "Pay4Me(Delaypayment)",
   124: "BSNOnline",
   134: "BankIslam",
   152: "UOB",
   166: "BankMuamalat",
   167: "OCBC",
   168: "StandardCharteredBank",
   178: "Maybank2E",
   198: "HSBCOnlineBanking",
   199: "KuwaitFinanceHouse",
   405: "AgroBank",
   1261: "BankOfChina",
   18: "ChinaUnionPay",

   //credit card payment methods
     2: "CreditCard(MYR)",
    55: "CreditCard(MYR)Pre-Auth",
   111: "PublicBankEPP",
   112: "MaybankEzyPay",
   115: "MaybankEzyPay",
   157: "HSBCInstallment",
   174: "CIMBEasyPay",
   179: "HongLeongEPP",
   430: "OCBCInstallment",
   534: "RHBInstallment",
   606: "AmBankEPP",
   727: "SCBInstallment",

   //wallet
    22: "KipleOnline",
    48: "Paypal",
   210: "BoostWallet",
   244: "MCash",
   382: "NETSQR",
   523: "GrabPay",
   538: "TnG",
   542: "MaybankPayQR",
   801: "ShopeePay",
   912: "Setel",

   //BNPL
   891: "Atome",
   890: "MobyPay",

}


//NOTE there is a case where the order is isPriced==false but unpricedCount==0
// when the shop has set prices on items but not approved the pricing.
// we CAN do money calculations when unpricedCount==0 so that is the best check to do
//prop order
//props readonly //if defined then no pricing allowed
export default class CmnItemsList extends Component {
   static COL1 = .4
   static COL2 = .4
   static COL3 = .2
   static PADDING_LEFT = 0

   constructor() {
      super();
      this.state = {
         displayPricingModal: false,
         itemIndexForPricing: null,
         toggle: false,
      };
   }
   //toggle a state variable to cause a render
   toggle = () => {
      this.setState({ toggle: !this.state.toggle })
   } //toggle 



   render() {
      const appType = APP.getAppType()
      const order = this.props.order
      let itemIndex = 0
      let adjIndex = 0

      return (
         <View style={{ marginLeft: 0 }}>
            {this.state.displayPricingModal &&
               <CmnPriceItemDialog isVisible={this.state.displayPricingModal}
                  dismiss={() => this.setState({ displayPricingModal: false })}
                  order={order}
                  index={this.state.itemIndexForPricing}
               />}

            <ScrollView>
               <CmnServiceLevelBanner level={order.serviceLevel} style={{ height: 30 }} />
               {/* Column Titles */}
               <ListItem divider style={{ marginLeft: 0, paddingLeft: 0, backgroundColor: COLORS.GC_LIST_HDR_BKG }}>
                  <View style={{ flex: CmnItemsList.COL1, alignItems: 'flex-start' }}>
                     <GCI18n title code='cmn.Name' />
                  </View>
                  <View style={{ flex: CmnItemsList.COL2, alignItems: 'flex-end' }}>
                     <GCI18n title code='cmn.Unit_Price' />
                  </View>
                  <View style={{ flex: CmnItemsList.COL3, alignItems: 'flex-end' }}>
                     <GCI18n title code='cmn.Net' />
                  </View>
               </ListItem>

               {/* List all items in order */}
               {order.items.map((item) => { return (this.renderItem(order, item, itemIndex++)) })}

               {/* Coupon to apply if any */}
               {order.couponStatus == 'applies' && <ListItem divider style={{ marginLeft: 0, paddingLeft: 0, backgroundColor: COLORS.GC_HIGHLIGHT_IMPORTANT }}>
                  <View style={{ flex: CmnItemsList.COL1 + CmnItemsList.COL2, alignItems: 'flex-start' }}>
                     <GCText fit list bold >{strX('cmnNEW.YourCouponAmount', { amount: cmnCouponFaceValueStr(order.coupon) })}</GCText>
                  </View>
                  <View style={{ flex: CmnItemsList.COL3, alignItems: 'flex-end' }}>
                     <GCText fit list bold>{cmnFormatAPrice(order.couponRedemption)}</GCText>
                  </View>
               </ListItem>}

               {/* Order surcharge if expedited service */}
               {order.serviceSurchargeAmount > 0 &&
                  <ListItem divider style={{ marginLeft: 0, paddingLeft: 0, backgroundColor: COLORS.GC_LIST_HDR_BKG }}>
                     <View style={{ flex: CmnItemsList.COL1 + CmnItemsList.COL2, alignItems: 'flex-end' }}>
                        <GCText title fit style={{ color: GLOBALS.COLOR.TEXT_ERROR }}>
                           {prjDisplayServiceLevel(order.serviceLevel)}
                           {' '} {prjDisplayServiceSurchargePercentage(order.serviceSurchargePercent)} {' '}
                           {strX('cmnNEW.Surcharge')}
                        </GCText>
                     </View>
                     <View style={{ flex: CmnItemsList.COL3, alignItems: 'flex-end' }}>
                        <GCText fit list bold>{cmnFormatAPrice(order.serviceSurchargeAmount)}</GCText>
                     </View>
                  </ListItem>}

               {/* Delivery Charge if any */}
               {order.deliveryChargeToApply > 0 && <ListItem divider style={{ marginLeft: 0, paddingLeft: 0, backgroundColor: COLORS.GC_HIGHLIGHT_IMPORTANT }}>
                  <View style={{ flex: CmnItemsList.COL1 + CmnItemsList.COL2, alignItems: 'flex-start' }}>
                     <GCText fit list bold >{strX('cmnNEW.DeliveryChargeApplies', { min: cmnFormatAPrice(order.minFreeDelivery) })}</GCText>
                  </View>
                  <View style={{ flex: CmnItemsList.COL3, alignItems: 'flex-end' }}>
                     <GCText fit list bold>{cmnFormatAPrice(order.deliveryChargeToApply)}</GCText>
                  </View>
               </ListItem>}

               {/* Net Price (only if minimum charge has been applied) */}
               {order.minChargeStatus == 'applies' && <ListItem divider style={{ marginLeft: 0, paddingLeft: 0, backgroundColor: COLORS.GC_LIST_HDR_BKG }}>
                  <View style={{ flex: CmnItemsList.COL1 + CmnItemsList.COL2, alignItems: 'flex-end' }}>
                     <GCText fit list bold>{strX('cmnNEW.NetPrice')}</GCText>
                  </View>
                  <View style={{ flex: CmnItemsList.COL3, alignItems: 'flex-end' }}>
                     <GCText fit list bold>{cmnFormatAPrice(order.netPriceBeforeMinimum)}</GCText>
                  </View>
               </ListItem>}

               {/* Total Price */}
               {this.renderTotalPrice(order)}

               <View style={{ height: 10 }} />

               {/* if not priced yet we give a warning that order will be priced at shop */}
               {appType == 'cst' && this.renderPricingWarning(order)}

               {/* if not priced yet we give a warning that order will be priced at shop */}
               {appType == 'cst' && this.renderCouponWarning(order)}

               {/* if not priced yet and premium service , warn about service surcharge */}
               {appType == 'cst' && this.renderSurchargeWarning(order)}

               {/* if not priced yet and price is low, warn about delivery charge */}
               {appType == 'cst' && this.renderDeliveryWarning(order)}

               {/* if not priced yet and price is low, warn about minimum charge */}
               {appType == 'cst' && this.renderMinimumChargeWarning(order)}

               {/* if paid we give some details */}
               {/* {(order.isPaid) && <ListItem divider style={{ marginLeft: 0, paddingLeft: 0, backgroundColor: COLORS.GC_LIST_HDR_BKG }}>
                     {this.renderPaymentDetails(order)}
               </ListItem>} */}
               {(order.isPaid) && this.renderPaymentDetails(order)}
            </ScrollView>
         </View>
      )

   }

   //if the shop has a minimum free delivery price
   //AND the order is unpriced and interim price is below min then give warning that charge may apply
   //OR null
   renderCouponWarning = (order) => {

      let msg = null
      if (order.couponStatus == 'maybe') {
         msg = strX('cmnNEW.MsgCouponMayApply', { min: cmnFormatAPrice(order.coupon.minPurchase) })
      }
      else if (order.couponStatus == 'lessThanMinimum') {
         msg = strX('cmnNEW.MsgCouponMinimumOrderIs', { min: cmnFormatAPrice(order.coupon.minPurchase) })
      }
      if (msg) {
         return (
            <ListItem style={{ marginLeft: 0, paddingLeft: 0 }}>
               <View style={{ flex: 1, alignItems: 'center' }}>
                  <GCText list bold fit style={{ color: GLOBALS.COLOR.TEXT_ERROR }}>{msg}</GCText>
               </View>
            </ListItem>

         )
      }
      else return null
   }


   //if the shop has a minimum free delivery price
   //AND the order is unpriced and interim price is below min then give warning that charge may apply
   //OR null
   renderDeliveryWarning = (order) => {

      if (order.minFreeDelivery &&
         order.unpricedCount > 0 &&
         order.totalPrice < order.minFreeDelivery) {
         const msg = strX('cmnNEW.MsgDeliveryChargeMayApply', { amount: cmnFormatAPrice(order.shopDeliveryCharge), min: cmnFormatAPrice(order.minFreeDelivery) })
         return (
            <ListItem style={{ marginLeft: 0, paddingLeft: 0 }}>
               <View style={{ flex: 1, alignItems: 'center' }}>
                  <GCText list bold fit style={{ color: GLOBALS.COLOR.TEXT_ERROR }}>{msg}</GCText>
               </View>
            </ListItem>

         )
      }
      else return null

      //the old way to do it
      // if (!order.minFreeDelivery) return null
      // if (order.unpricedCount == 0) return null
      // if (order.totalPrice >= order.minFreeDelivery) return null
      // const msg = strX('cmnNEW.MsgDeliveryChargeMayApply', { amount: cmnFormatAPrice(order.shopDeliveryCharge), min: cmnFormatAPrice(order.minFreeDelivery) })
      // return (
      //    <ListItem style={{ marginLeft: 0, paddingLeft: 0 }}>
      //       <View style={{ flex: 1, alignItems: 'center' }}>
      //          <GCText list bold fit style={{ color: GLOBALS.COLOR.TEXT_ERROR }}>{msg}</GCText>
      //       </View>
      //    </ListItem>

      // )
   }

   //if the shop has premium service and the order has some unpriced items 
   //then give a warning that a surcharge of x% will apply
   renderSurchargeWarning = (order) => {
      if (order.serviceLevel == 'regular') return null
      if (order.unpricedCount == 0) return null
      if (order.totalPrice >= order.minFreeDelivery) return null
      const msg = strX('cmnNEW.MsgServiceChargeWillApply', { percent: order.serviceSurchargePercent })
      return (
         <ListItem style={{ marginLeft: 0, paddingLeft: 0 }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
               <GCText list bold fit style={{ color: GLOBALS.COLOR.TEXT_ERROR }}>{msg}</GCText>
            </View>
         </ListItem>

      )
   }

   //if the shop has a minimum charge
   //AND the order is unpriced and interim price is below min then give warning that charge may apply
   //OR null
   renderMinimumChargeWarning = (order) => {
      if (!order.minCharge) return null
      if (order.unpricedCount == 0) return null
      if (order.totalPrice >= order.minCharge) return null
      const msg = strX('cmnNEW.MsgMinimumChargeMayApply', { amount: cmnFormatAPrice(order.minCharge) })
      return (
         <ListItem style={{ marginLeft: 0, paddingLeft: 0 }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
               <GCText list bold fit style={{ color: GLOBALS.COLOR.TEXT_ERROR }}>{msg}</GCText>
            </View>
         </ListItem>

      )
   }

   //if the order is unpriced we will give one of various messages
   //OR null
   renderPricingWarning = (order) => {

      if (order.unpricedCount == 0) return null
      let pricingWarning = null
      if (order.unweighedCount > 0) {
         if (order.driverWeighs) {
            if (order.unpricedSpecialCount == 0) {
               pricingWarning = "cmnNEW.MsgDriverCanWeighAndPrice"
            }
            else {
               pricingWarning = "cmnNEW.MsgDriverCanWeighButShopPrice"
            }
         }
         else { //
            pricingWarning = "cmnNEW.MsgShopPrice"
         }
      }
      else { //there are unpriced specials
         pricingWarning = "cmnNEW.MsgShopPrice"
      }
      const msg = strX('cmnNEW.MsgDeliveryChargeMayApply', { amount: cmnFormatAPrice(order.shopDeliveryCharge), min: cmnFormatAPrice(order.minFreeDelivery) })
      return (
         <ListItem style={{ marginLeft: 0, paddingLeft: 0 }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
               <GCText list bold fit style={{ color: GLOBALS.COLOR.TEXT_ERROR }}>{strX(pricingWarning)}</GCText>
            </View>
         </ListItem>

      )
   }

   //Total price line is one of:
   // a highlighted line if we have applied the minimum charge
   // a Total price if the order is priced
   // an Interim price title if the order is not priced
   //NOTE Net price will be shown in previous line if minimum charge applied
   //NOTE warnings may follow if 
   renderTotalPrice = (order) => {
      const bkgColor = (order.minChargeStatus == 'applies') ? COLORS.GC_HIGHLIGHT_IMPORTANT : COLORS.GC_LIST_HDR_BKG
      let titleJSX
      if (order.minChargeStatus == 'applies') {
         titleJSX =
            <View style={{ flex: CmnItemsList.COL1 + CmnItemsList.COL2 }}>
               <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <GCText list bold>Minimum Charge Applied</GCText>
                  <GCText fit list bold>{strX('cmn.Total_Price')}</GCText>
               </View>
            </View>
      }
      else {
         titleJSX =
            <View style={{ flex: CmnItemsList.COL1 + CmnItemsList.COL2, alignItems: 'flex-end' }}>
               {(order.unpricedCount == 0) ?
                  <GCText list bold>{strX('cmn.Total_Price')}</GCText>
                  :
                  <GCText list bold>{strX('cmn.Interim_Price')}</GCText>
               }
            </View>
      }
      return (
         <ListItem divider style={{ marginLeft: 0, paddingLeft: 0, backgroundColor: bkgColor }}>
            {titleJSX}
            <View style={{ flex: CmnItemsList.COL3, alignItems: 'flex-end' }}>
               <GCText fit list bold >{cmnFormatAPrice(order.totalPrice)}</GCText>
            </View>
         </ListItem>


      )
   }

   //This method outputs the details of a single item of laundry in all its cases
   //If the item is by piece, it is always? counted (but we allow for the uncounted case)
   //               by weight, the weight will not be supplied by the customer
   //               special (custom) pricing must be entered by shop
   //These three cases are presented in three variables:
   //  nameStr 
   //  pricingStr 4 pc @ $5/pc or 5.1 kg @ $3/kg or custom
   //  netPriceStr is either the amount or a button for the shop to enter the quantity
   //NOTE order is passed just to be lazy .... read only 

   renderItem = (order, item, index) => {

      let nameStr = prjPriceListItemName(item, true)
      const { pricingStr, netPriceStr } = prjFormatItemPricing(item)
      //only the following three types are modifiable in an order detail screen
      const requiresEditPopup = ['kg', 'pc', 'spc,'].includes(item.unitType)

      //by now we have name, pricing and netPrice
      //if isPriced is false we display a button for the shop to add quantity

      //NOTE if there are remarks then we don't want to have a thin line after the item
      //because we will have the remarks ListItem that we want to 'join'
      const specialBorderStyle = item.remarks ? styles.noBottomMargin : null
      // return (<GCText key={String(index)}>abcd</GCText>) //DEBUG
      return (
         // <View key={item.code} > //20220320 code was renamed key for convenience
         <View key={String(index)}>
            <ListItem style={[{ marginLeft: 0, marginRight: 0 }, specialBorderStyle]}>
               <TouchableOpacity
                  disabled={order.isApproved || this.props.readonly || !requiresEditPopup}
                  style={{ flex: 1, flexDirection: 'row', paddingLeft: CmnItemsList.PADDING_LEFT }}
                  onPress={() => {
                     this.setState({ displayPricingModal: true })
                     this.setState({ itemIndexForPricing: index })
                  }}
               >
                  {this.renderItemContents(item, index)}
               </TouchableOpacity>
            </ListItem>
            {item.remarks && <ListItem style={{ paddingLeft: CmnItemsList.PADDING_LEFT }}>
               <GCText list color={'grey'}>{item.remarks}</GCText>
            </ListItem>}
         </View>
      )
   } //end renderItem

   renderItemContents = (item, index) => {

      const nameStr = prjPriceListItemName(item, true)
      const { pricingStr, netPriceStr } = prjFormatItemPricing(item)
      let output = []
      //COLUMN 1
      switch (item.unitType) {

         case 'adj': //display the input text in two columns
            output.push(<View key='1' style={{ flex: CmnItemsList.COL1 + CmnItemsList.COL2, alignItems: 'flex-start' }}><GCText list>{`${nameStr}\n${item.inputText}`}</GCText></View>)
            break;

         case 'EZnote': //special processing ... uses all three right now
            const specialNameStr = item.longName[0] + ' - ' + item.inputText
            output.push(
               <View key='1' style={{ flex: CmnItemsList.COL1 + CmnItemsList.COL2, alignItems: 'flex-start', paddingVertical: 10 }}><GCText list>{specialNameStr}</GCText></View>)
            break;

         case 'shopNote': //special processing ... uses all three right now
            const shopNoteStr = item.longName[0] + ' - ' + item.inputText
            output.push(
               <View key='1' style={{ flex: CmnItemsList.COL1 + CmnItemsList.COL2 + CmnItemsList.COL3, alignItems: 'flex-start', paddingVertical: 10 }}><GCText list>{shopNoteStr}</GCText></View>)
            break;

         case 'choice': //right just name - choice in 1,2
            output.push(<View key='1' style={{ flex: CmnItemsList.COL1 + CmnItemsList.COL2, alignItems: 'flex-start' }}>
               <GCText list>{`${nameStr} - ${item.choiceText}`}</GCText></View>)
            break;

         case 'yesNo': //right justify name in 1,2
            output.push(<View key='1' style={{ flex: CmnItemsList.COL1 + CmnItemsList.COL2 + CmnItemsList.COL3, alignItems: 'flex-start' }}><GCText list>{nameStr}</GCText></View>)
            break;

         default://everyone else displays the item name
            output.push(<View key='1' style={{ flex: CmnItemsList.COL1, alignItems: 'flex-start' }}><GCText list>{nameStr}</GCText></View>)
            break;
      }

      //COLUMN 2
      switch (item.unitType) {

         case 'adj':
         case 'EZnote': //already used column 2
         case 'shopNote': //already used column 2
            break;

         case 'EZcount': //count in column 2
            output.push(<View key='2' style={{ flex: CmnItemsList.COL2, alignItems: 'flex-end' }}><GCText fit list>{String(item.count)}</GCText></View>)
            break;

         case 'kg': //unit price
         case 'pc': //
         case 'spc': //
            output.push(<View key='2' style={{ flex: CmnItemsList.COL2, alignItems: 'flex-end' }}><GCText fit list>{pricingStr}</GCText></View>)
            break;

         default:
            break;
      }

      //COLUMN 3
      switch (item.unitType) {

         case 'EZnote': //no net-price
            if (!this.props.readonly) {
               output.push(<View key='3' style={{ flex: CmnItemsList.COL3, alignItems: 'flex-end', paddingVertical: 10 }}>
                  <NewCheckBox
                     checked={item.isPriced}
                     onPress={() => {
                        // console.log('B4 CHECKED', item.isPriced)
                        item.isPriced = !item.isPriced
                        // console.log('CHECKED', item.isPriced)
                        this.toggle()
                     }}
                  />
               </View>)
            }
            break;

         case 'EZcount': //cust in EZ enters a count for a specific item
            output.push(<View key='3' style={{ flex: CmnItemsList.COL3, alignItems: 'flex-end' }} />)
            break;

         case 'adj': //always have net price
         case 'pc': //
            output.push(
               <View key='3' style={{ flex: CmnItemsList.COL3, alignItems: 'flex-end' }}>
                  <GCText fit list>{netPriceStr}</GCText>
               </View>
            )
            break;

         case 'choice'://may have price
         case 'yesNo': //
            output.push(
               <View key='3' style={{ flex: CmnItemsList.COL3, alignItems: 'flex-end'}}>
                  <GCText fit list>{netPriceStr}</GCText>
               </View>
            )
            break;

         case 'kg': //'standard cases'
         case 'spc': //
            output.push(
               <View key='3' style={{ flex: CmnItemsList.COL3, alignItems: 'flex-end' }}>
                  {(item.isPriced) ?
                     <GCText fit list>{netPriceStr}</GCText> :
                     (this.props.readonly) ? <GCText list>___</GCText> :
                        <PrjIconButton
                           id="CALCULATOR"
                           onPress={() => {
                              this.setState({ displayPricingModal: true })
                              this.setState({ itemIndexForPricing: index })
                           }}>
                        </PrjIconButton>}
               </View>
            )

            break;

         default:
            break;
      }
      return output

   }

   //returns the details of a payment
   //we expect to be called only ifPaid
   renderPaymentDetails = (order) => {

      let output = []
      switch (order.paymentMethod) {
         case PaymentMethodEnum.paidCash:
         case PaymentMethodEnum.paidPickup:
         case PaymentMethodEnum.paidDelivery:
            return (
               <ListItem divider style={{ marginLeft: 0, paddingLeft: 0, backgroundColor: COLORS.GC_LIST_HDR_BKG }}>
                  {this.renderPaymentStatus(order.paymentMethod)}
               </ListItem>
            )
            break
         case PaymentMethodEnum.paidOnline:
            return (
               <>
                  {this.renderCCDetail('Online Payment Type - ' + this.paymentIdAsString(order.paymentDetails?.PaymentId),
                     null, true)}
                  {this.renderCCDetail('Trans ID', order.paymentDetails?.TransId)}
                  {this.renderCCDetail('Bank Ref', order.paymentDetails?.AuthCode)}
                  {this.renderCCDetail('CC Name ', order.paymentDetails?.CCName)}
                  {this.renderCCDetail('CC #    ', order.paymentDetails?.CCNo)}
               </>
            )
            break
         default:
            break
      }
      return output
   }//end renderPaymentDetails

   // NOTE cmnNEW.paymentStatusStr in en.json has all the enum types of PaymentMethodEnum
   renderPaymentStatus = (status) => {
      // console.log('status', status.enumKey)
      const prop = (status == null ? 'invalid' : status.enumKey)
      const statusI18n = "cmnNEW.paymentStatusStr." + prop
      // console.log(prop, statusI18n)
      return (<GCI18n list bold code={statusI18n}></GCI18n>)
   } //end renderPaymentStatus


   //returns "" if null, valid payment type or "invalid"
   paymentIdAsString = (id) => {
      if (!id) return ("")
      const text = paymentIdAsString[id] || 'invalid'
      return (text)
   }

   //NOTE returns null if text is false
   //NOTE optional parameter forces display of title even if text is null.
   renderCCDetail = (title, text, displayIfNull = false) => {
      if (!text && !displayIfNull) { return null }
      return (
         <View style={{ flex: 1, flexDirection: 'row', marginLeft: 0, paddingLeft: 0, backgroundColor: COLORS.GC_LIST_HDR_BKG }}>
            <View style={{ flex: CmnItemsList.COL1 + CmnItemsList.COL2, flexDirection: 'row', justifyContent: 'space-between' }}>
               <GCText list bold>{title}</GCText>
               <GCText list>{text}</GCText>
            </View>
            <View style={{ flex: CmnItemsList.COL3 }} />
         </View>
         // </View>
      )
   }

} // end class CmnItemsList

//prop checked
//prop onPress
//prop checkedStyle
//prop uncheckedStyle
//prop disabled
class NewCheckBox extends Component {
   render() {
      // Move the switch aligh with Count button...orignal switch on and off position differently 
      // Align switch with plus and minus button
      let flexEndAndroid = this.props.checked ? 15 : 0
      let flexEndIOS = this.props.checked ? 8 : 8
      return (
         // use left to move to the right because alignItem:'flex-end' doesn't do it
         // <View style={{ left: flexEnd }}>
         <View style={{ right: Platform.OS === 'ios' ? flexEndIOS : flexEndAndroid }}>
            <Switch
               // We can't apply any style to trackColor eg.shadow style 
               trackColor={{ false: COLORS.GC_SWITCH_DISABLE, true: COLORS.GC_SWITCH_DISABLE }} //lighter 
               thumbColor={this.props.checked ? COLORS.GC_THEME_DARK : COLORS.GC_ABS_WHITE}
               onValueChange={(val) => {
                  this.props.onPress(val)
               }}
               value={this.props.checked}
               style={{ transform: Platform.OS === 'ios' ? [{ scaleX: 1.25 }, { scaleY: 1.25 }] : [{ scaleX: 2.00 }, { scaleY: 1.75 }]}}
               disabled={this.props.disabled}
            />
         </View>

      )
   }
}




const styles = StyleSheet.create({
   noBottomMargin: {
      borderBottomWidth: 0
   }
})
