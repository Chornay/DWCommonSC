import { strX } from 'DWcmn/I18n.js'

import { cmnFormatAPrice } from 'DWcmn/cmnFormatFunctions';
import { cmnOrderStatusStr } from 'DWcmn/TypeCmnFunctions'
import { prjFormatItemPricing, prjFormatServiceLevel, prjFormatPaymentSummary } from "./prjFormatOrderFunctions"
import { prjPriceListItemName } from 'DWcmn/PrjCmnFunctions'
import { cmnCouponFaceValueStr } from 'DWcmn/CmnCouponTile'

//20250510 created
//prjFormatOrderForEmail
//Returns a text file with HTML describing the specified order

//TODO add some missing information .. stop, notes.

//we set the app type because we probably always want 'shp' context
export function prjFormatOrderForEmail(order, appType = 'shp') {

    const status = order.status
    // const paymentSummary = cmnPaymentSummary(order)
    let report = "<html><body>\n"

    report += '<table id="ID">\n'
    report += addIdLine('cmnNEW.OrderId', order.id)
    report += addIdLine('cstNEW.ServiceLevel', prjFormatServiceLevel(order.serviceLevel))
    report += addIdLine('cmn.Status', cmnOrderStatusStr(appType, order.status))
    report += addIdLine('cst.Payment', prjFormatPaymentSummary(order))
    report += addIdLine('cmn.Name', order.name)
    report += addIdLine('cmn.Address', order.address)
    report += addIdLine('cmn.Phone', order.phoneNumber)
    report += addDate()
    report += addSeparator()
    report += "</table>\n"

    report += '<table id="ITEMS">\n'
    report += addItemsTitle()
    for (let item of order.items) {
        report += addItem(item)
    }
    report += addCoupon(order)
    report += addDeliveryCharge(order)
    report += addSeparator()
    report += addItemsTotal(order)
    report += "</table>\n"
    report += '</body></html>'
    return report
} //end prjFormatOrderForEmail

function addDate() {
    let line = "<tr>"
    line += "<tr>"
    line += '<th align=left>' + "Date: " + '</th>'
    line += '<th align=left>' + new Date().toLocaleString() + '</th>'
    line += "</tr>\n"
    return line

} //end addItemsTitle

function addSeparator() {
    let line = "<tr>"
    line += "<tr>";
    line += '<td colspan="3"><hr style="border:1px solid #000;"></td>';
    line += "</tr>\n\n\n";
    return line
} //end addItemsTitle


function addItemsTitle() {
    let line = "<tr>"
    line += '<th align=left><u>' + strX('cmn.Name') + '</u></th>'
    line += '<th align=right><u>' + strX('cmn.Unit_Price') + '</u></th>'
    line += '<th align=right><u>' + strX('cmn.Net') + '</u></th>'
    line += "</tr>\n"
    return line
} //end addItemsTitle

function addItem(item) {
    const nameStr = prjPriceListItemName(item, true)
    const { pricingStr, netPriceStr } = prjFormatItemPricing(item)
    let line = "<tr>"
    line += '<th align=left>' + nameStr + '</th>'
    line += '<th align=right>' + pricingStr + '</th>'
    line += '<th align=right>' + netPriceStr + '</th>'
    line += "</tr>\n"
    return line
} //end addItem

function addIdLine(title, value) {
    let line = "<tr>"
    line += '<th align=left>' + strX(title) + ': ' + '</th>'
    line += '<th align=left>' + value + '</th>'
    line += "</tr>\n"
    return line
} //end addIdLine

//TODO fix this

function addCoupon(order) {
    let line = ''
    if (order.couponStatus == 'applies') {
        line = "<tr>"
        line += '<th align=left>' + strX('cmnNEW.YourCouponAmount', { amount: cmnCouponFaceValueStr(order.coupon) }) + '</th>'
        line += '<th> </th>'
        line += '<th align=right>' + cmnFormatAPrice(order.couponRedemption) + '</th>'
        line += "</tr>\n"
    }
    return line
} //end addCoupon


function addDeliveryCharge(order) {
    let line = ''
    if (order.deliveryChargeToApply > 0) {
        line = "<tr>"
        line += '<th align=left>' + strX('cmnNEW.DeliveryChargeApplies', { min: cmnFormatAPrice(order.minFreeDelivery) }) + '</th>'
        line += '<th> </th>'
        line += '<th align=right>' + cmnFormatAPrice(order.deliveryChargeToApply) + '</th>'
        line += "</tr>\n"
    }
    return line
} //addDeliveryCharge

function addItemsTotal(order) {
    let line = ""
    if (order.minChargeStatus == 'applies') {
        line += '<th align=left>' + "Minimum Charge Applied" + '</th>'
        line += '<th align=left>' + strX('cmn.Total_Price') + '</th>'
    }
    else {
        {
            (order.unpricedCount == 0) ?
                line += '<th align=left>' + strX('cmn.Total_Price') + '</th>'
                :
                line += '<th align=left>' + strX('cmn.Interim_Price') + '</th>'
        }
    }
    line += '<th align=right>' + cmnFormatAPrice(order.totalPrice) + '</th>'
    return line
} //end addItemsTotal
