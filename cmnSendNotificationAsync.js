// import firebase from '@react-native-firebase/app';
// import functions from '@react-native-firebase/functions';
import firestore from '@react-native-firebase/firestore';
import { functions, firebase } from '@react-native-firebase/functions';
// import firestore from '@react-native-firebase/firestore';
import { cmnAlertPopup } from './cmnAnnunciationFunctions';
import { prjToast } from 'DWcmn/PrjToast'


//options = {text:,i18n:,title:}
export async function cmnSendNotificationAsync(token, options, annunciate = false) {

   const {text,i18n,title="Dobby Walla"} = options;
   
   try {
      const sendMsg = firebase.app().functions('asia-southeast2').httpsCallable('sendMsg')
      const result = await sendMsg({ token: token, text: text, title:title })
      //TODO should check for result true? AND CHECK RETURN
      annunciate && prjToast({ type: 'success', i18n: 'cmnNEW.NotificationSent' })
   }
   catch (error) {
      cmnAlertPopup({text:error.message})
   }
}

