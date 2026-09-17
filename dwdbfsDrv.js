import firestore from '@react-native-firebase/firestore';

import { prjAlert } from 'DWcmn/PrjCmnFunctions'

// DRIVER
// id: document id .. hand-picked unique code
// authId: the auth token that 'owns' us 
// nickname .. name used in customer visible data
// name:
// email: 
// phoneNumber:
// shopId: 

export async function dwdbfsDrvGet(driverId) {
   try {
      const drvDoc = await firestore().collection('Drivers').doc(driverId).get(); { }
      if (drvDoc.exists) {
         const drvData = drvDoc.data()
         return ({ ...drvData })
      }
      else {
         return (null)
      }
   }
   catch (error) { prjAlert(error.message); }
}// end dwdbfsDrvGet

export async function dwdbfsDrvGetByAuth(authId) {
   let drvData
   try {
      const querySnapshot = await firestore().collection('Drivers').where('authId', "==", authId.toString()).limit(1).get();
      if (querySnapshot.empty) {
         return null
      }
      else {
         drvData = querySnapshot.docs[0].data()
         return { ...drvData } //TODO is this necessary?
      }
   }
   catch (error) { prjAlert(error.message); return null }
}// end dwdbfsDrvGetByAuth

