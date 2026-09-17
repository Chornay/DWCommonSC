import { Platform } from 'react-native'
import DeviceInfo from 'react-native-device-info';


//returns the app build number for either ios or android
//NOTE currently we use the same call to get the field
export function getAppBuild() {
   if (Platform.OS === 'android') { return DeviceInfo.getBuildNumber() }
   else { return DeviceInfo.getBuildNumber() }
}

//returns the app readable version for either ios or android
//NOTE currently we use the same call to get the field
export function getAppVersion() {
   if (Platform.OS === 'android') { return DeviceInfo.getReadableVersion() }
   else { return DeviceInfo.getReadableVersion() }
}
