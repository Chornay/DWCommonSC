import { Alert } from 'react-native'
import { strX } from 'DWcmn/I18n.js'


// options:
//   titleI18n or title (optional)
//   i18n or text
//   cancelable (default false)
//     THIS IS NO BIG DEAL .. true means can be dismissed by clicking outside
//                            false means they have to press the OK
//   reportable (default true)
export function cmnAlertPopup(options){
   const {titleI18n, title, i18n, text, cancelable, reportable} = options
    Alert.alert(
       (titleI18n)?strX(titleI18n):title,
       (i18n)?strX(i18n):text,
       [
          {
             text: strX('cmn.OK')
 
          }
       ],
       { cancelable: cancelable || false }
    )
 }//end cmnAlertPopup
 
 