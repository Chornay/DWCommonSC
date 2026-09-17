import React from 'react'
import { Linking } from 'react-native'
import { prjToast } from 'DWcmn/PrjToast'
import { DW_WHATSAPP_NUMBER, DW_PHONE_NUMBER } from 'DWcmn/Global'


//param options
//  support - call support
//  number - call number
export async   function prjCallOnPhone (options) {
      const {support, number} = options || {}

      let dialMe
      if (support) { dialMe = DW_PHONE_NUMBER }
      else dialMe = number || null
      let url
      if (Platform.OS !== "android") {
         url = `telprompt:${dialMe}`;
      } else {
         url = `tel:${dialMe}`;
      }
      try {
         if (await Linking.canOpenURL(url)) {
            await Linking.openURL(url)
         }
         else {
            prjToast({ type: 'warning', i18n: 'cmnNEW.MsgCantOpenDialer' }) //OK
         }
      }
      catch (error) {
         prjToast({ type: 'danger', text:error.message }) //OK
      }

   }


//param options:
//   order= order record, msg will be sent to shop with the order # appended
//  OR custId= order will be sent to ?
//  OR support order will be sent to support
export async function prjWhatsapp(options) {

    let uri
    if (options.order){
    uri = 'whatsapp://send?text=' +
        encodeURIComponent('Order#: ' + options.order.id + '\n') +
        '&phone=' + options.order.shopWhatsappNumber
    }
    else if (options.custId) {
      uri = 'whatsapp://send?text=' +
         encodeURIComponent('Message from customer ' + options.custId + '\n') +
         '&phone=' + DW_WHATSAPP_NUMBER

    }
    else { //to support
     uri = 'whatsapp://send?text=' + '&phone=' + DW_WHATSAPP_NUMBER
  
    }
    try {
            const supported = await Linking.canOpenURL(uri)
            if (supported) {
               await Linking.openURL(uri) 
            }
            else {
               prjToast({ type:'warning', i18n: 'cmnNEW.MsgCantFindWhatsapp' }) //OK
            }
    }
    catch (error) {
        prjToast({ type:'danger', text:error.message }) //OK
    }

}

//param location {latitude, longitude}
export async function prjWaze(location) {
         let uri = 'waze://?q=' + location.latitude + ',' + location.longitude + '&navigate-yes'
         try {
            const supported = await Linking.canOpenURL('waze://') //OK
            if (supported) {
               await Linking.openURL(uri) 
            }
            else {
               prjToast({ type:'warning', i18n: 'cmnNEW.MsgCantFindWaze' }) //OK
            }
         }
         catch (error) {
            prjToast({type:'danger', text:error.message})
         };
}
