import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';
import semver from 'semver'



// simmple method to check our cureent version passes a validity check eg '>2.3'
// validity object is {android:'xxxx',ios:'yyyy'}
// this is the appVersion property from the pricelist
// both properties are optional
export function prjVersionCheck(validityObject) {

    if (validityObject==null) return true 

    //get the validity expression for our phone o/s ('android' or 'ios')
    const requiredVersion = validityObject?.[Platform.OS];

    //there is no check for this o/s
    if (requiredVersion == null) return true


    const currentVersion = DeviceInfo.getVersion()
    return semver.satisfies(currentVersion, requiredVersion)

    }
