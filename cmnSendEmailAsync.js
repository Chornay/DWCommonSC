import { firebase } from '@react-native-firebase/functions';

import { cmnAlertPopup } from './cmnAnnunciationFunctions';
import { prjToast } from 'DWcmn/PrjToast'


//options = {from:, to:, subject:, html:)
//NOTE we can NOT set from .. that is from the account whose email privileges we use
export async function cmnSendEmailAsync(options, annunciate = false) {

    const { 
        to,
        subject = 'Message from Dobby Walla',
        html } = options;

    try {
        const sendEmail = firebase.app().functions('asia-southeast2').httpsCallable('sendEmail')

        //TODO not sure if we get pass/fail from sendMail
        await sendEmail({ to, subject, html })
        //TODO should check for result true? AND CHECK RETURN
        annunciate && prjToast({ type: 'success', i18n: 'cmnNEW.EmailSent' }) //OK
    }
    catch (error) {
        cmnAlertPopup({ text: error.message })
    }
}

