import { strX } from 'DWcmn/I18n.js'

import { cmnFormatAPrice } from 'DWcmn/cmnFormatFunctions';
import { cmnOrderStatusStr } from 'DWcmn/TypeCmnFunctions'
import { prjFormatItemPricing, prjFormatServiceLevel, prjFormatPaymentSummary } from "./prjFormatOrderFunctions"
import { prjPriceListItemName } from 'DWcmn/PrjCmnFunctions'
import { cmnCouponFaceValueStr } from 'DWcmn/CmnCouponTile'

//20250510 created from prjFormatOrderForEmail
//Returns a text file with HTML describing the specified order

//TODO add some missing information .. stop, notes.

const totalLineWidth = 48;
export function prjFormatOrderForPrintBill(order) {

    const status = order.status
    // const paymentSummary = cmnPaymentSummary(order)
    let report = "<html><body>\n"
    report += '<table id="ID">\n'
    report += addIdLine('cmnNEW.OrderId', order.id)
    report += addIdLine('cmn.Name', order.name)
    report += addIdLine('cmn.Address', order.address)
    report += addIdLine('cmn.Phone', order.phoneNumber)
    report += "Date: " + new Date().toLocaleString() + "\n"
    report += "-".repeat(totalLineWidth) + "\n";
    report += "</table>\n"

    report += '<table id="ITEMS">\n'
    report += addItemsTitle()
    for (let item of order.items) {
        report += addItem(item)
    }
    report += "-".repeat(totalLineWidth) + "\n";
    report += addCoupon(order)
    //WE ASSUME THAT A PRINTED ORDER HAS BEEN PRICED ... NO NEED FOR THESE WARNINGS
    //report += addSurchargeWarning(order)
    //report += addMinimumChargeWarning(order)
    report += addDeliveryCharge(order)
    report += "-".repeat(totalLineWidth) + "\n\n";
    report += addItemsTotal(order)
    report += "THANK YOU!"
    report += "</table>\n"
    report += '</body></html>'
    return report
} //end prjFormatOrderForPrintBill

function addItemsTitle() {
    let line = ""
    line += strX('cmn.Name').padEnd(10)
    // strX('cmn.Unit_Price').padStart(15) +
    line += strX('cmn.Net').padStart(30) + "\n\n";
    return line
} //end addItem

// 20260122 fixed error printing when value is null
function addItem(item) {
    const nameStr = String(prjPriceListItemName(item, true) ?? "");
    const { pricingStr, netPriceStr } = prjFormatItemPricing(item) || {};
    let line = "";
    line += nameStr.padEnd(10, " ") + "\n";
    line += String(pricingStr ?? "").padStart(15, " ");
    line += String(netPriceStr ?? "").padStart(30, " ") + "\n";

    return line;
} // addItem

function addIdLine(title, value) {
    let line = ""
    line += strX(title) + ": " + value + "\n"
    return line
} //end addIdLine

function addCoupon(order) {
    let line = ""
    if (order.couponStatus == 'applies') {
        line += strX('cmnNEW.YourCouponAmount', { amount: cmnCouponFaceValueStr(order.coupon) })
        line += " " + "-" + " " + cmnFormatAPrice(order.couponRedemption) + "\n"
    }
    return line
} //end addCoupon


// function addSurchargeWarning(order) {
//     let line = ""
//     if (order.serviceLevel == 'regular') { return "" }
//     // if (order.unpricedCount == 0) { return "" }
//     // if (order.totalPrice >= order.minFreeDelivery) { return "" }
//     line += strX('cmnNEW.MsgServiceChargeWillApply', { percent: order.serviceSurchargePercent }) + "\n"
//     return line
// } //end addSurchargeWarning


// function addMinimumChargeWarning(order) {
//     line = ""
//     // if (!order.minCharge) { return "" }
//     // if (order.unpricedCount == 0) { return "" }
//     if (order.totalPrice >= order.minCharge) { return "" }
//     line += strX('cmnNEW.MsgMinimumChargeMayApply', { amount: cmnFormatAPrice(order.minCharge) }) + "\n"
//     return line
// } //end addMinimumChargeWarning

function addDeliveryCharge(order) {
    line = ""
    if (order.deliveryChargeToApply > 0) {
        line += strX('cmnNEW.DeliveryChargeApplies', { min: cmnFormatAPrice(order.minFreeDelivery) })
        line += cmnFormatAPrice(order.deliveryChargeToApply) + '\n'
    }
    return line
} //addDeliveryCharge


function addItemsTotal(order) {
    let line = ""
    if (order.minChargeStatus == 'applies') {
        line += "Minimum Charge Applied"
        line += strX('cmn.Total_Price').padEnd(10)
    }
    else {
        {
            (order.unpricedCount == 0) ?
                line += strX('cmn.Total_Price').padEnd(10)
                :
                line += strX('cmn.Interim_Price').padEnd(10)
        }
    }
    line += cmnFormatAPrice(order.totalPrice).padStart(25) + "\n\n";
    return line
} //end addItemsTotal







