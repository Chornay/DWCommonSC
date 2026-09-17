import NetInfo from "@react-native-community/netinfo";
import { Platform } from 'react-native'
import { prjToast } from 'DWcmn/PrjToast'



// simmple method to check if we have intenet available
// if internet is not available we will give message iff annunciate
//NOTE all examples seem to use fetch but to get current status must use refresh method
//TODO 202305 does not seem to work for ios ... return true for now
export async function prjNetworkStatus(annunciate = false) {

   if (Platform.OS == 'ios') { return true }

   try {
      let state = await NetInfo.refresh()
      if (state.isInternetReachable) {
         return true
      }
      else {
         if (annunciate) { prjToast({ type: 'danger', i18n: 'cmnNEW.ERRORNoInternet' }) } //OK
         return false
      }
   }
   catch (error) {
      { prjToast({ type: 'danger', text: error }) } //OK
      return false
   }


}