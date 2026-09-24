import { firebase } from '@react-native-firebase/functions';

//prjCloudLog____ calls cloud function logToFirebase to log message
//  level is info,warning,error
//
// the Async version awaits completion, the other does not


export const prjCloudLog = (message, level = 'info') => {
    const _logCallable = firebase.app().functions('asia-southeast2').httpsCallable('logToFirebase');
    _logCallable({ message, level }).catch(() => { });
};

export const prjCloudLogAsync = async (message, level = 'info') => {
    try {
        const _logCallable = firebase.app().functions('asia-southeast2').httpsCallable('logToFirebase');
        await _logCallable({ message, level });
    } catch (e) { } //do nothing 

};