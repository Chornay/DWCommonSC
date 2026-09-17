import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import * as RNLocalize from "react-native-localize"
import DropDownPicker from 'react-native-dropdown-picker';
import I18n from 'i18n-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

import GLOBALS from 'DWcmn/Global';
import { CmnDropdownModalPicker } from 'DWcmn/CmnDropDownModalPicker'

//20250218 used GCText
//20250502 final version for I18nLanguagePicker, added getInitialLanguage()

// Import all locales
import en from './locales/en.json';
import ms from './locales/ms.json'  //country code my language code ms
import cn from './locales/cn.json'  //country code cn language code zh


// Should the app fallback to English if user locale doesn't exists
I18n.fallbacks = true;

// Define the supported translations
I18n.translations = { //have to do this as well as supply the .json
  en,
  ms,
  cn
};

// const currentLocale = I18n.currentLocale();

// // Is it a RTL language?
// export const isRTL = currentLocale.indexOf('he') === 0 || currentLocale.indexOf('ar') === 0;

// // Allow RTL alignment in RTL languages
// ReactNative.I18nManager.allowRTL(isRTL);

// The method we'll use instead of a regular string
export function strX(name, params = {}) {
  return I18n.t(name, params).toString();
};


//get the language that we want to use for the app.
//if it is already stored in Async then use that
//otherwise use phone's language (if not supported use en)
export async function getInitialLanguage() {
  const locales = RNLocalize.getLocales();
  const validLanguages = ['ms', 'en', 'cn'];
  let ourLang = null;

  //if we have a language stored in AsyncStorage then use it
  // (async () => { ourLang = await AsyncStorage.removeItem('DWAppLang'); })();
  ourLang = await AsyncStorage.getItem('DWAppLang');
  // (async () => { ourLang = await AsyncStorage.getItem('DWAppLang'); })();
  // console.log('stored language is ', ourLang)
  if (ourLang) {
    // console.log('using stored language ', ourLang)
    I18n.locale = ourLang;
  }

  //otherwise if the phone has a language that we support, use it
  //current phone language is the top of the list of languages
  else if (Array.isArray(locales)) {
    let languageCode = locales[0].languageCode;
    if (!validLanguages.includes(languageCode)) { languageCode = 'en' }
    await storeLanguage(languageCode);
    // console.log('storing language ', languageCode)
  }

  else { //never happens?
    I18n.locale = 'en';
  }
}



// prop onChange() you will probably want to do a forceUpdate to re-render your screen
export class I18nLanguagePicker extends Component {
  constructor() {
    super();
    this.state = {
      isComponentInitialized: false,
      languageChoice: I18n.locale,
    };
  }


  componentDidMount() {
    // const locales = RNLocalize.getLocales();
    // const validLanguages = ['ms', 'en', 'cn'];

    // //if the phone has a language that we support, use it
    // //current phone language is the top of the list of languages
    // if (Array.isArray(locales)) {
    //   const languageCode = locales[0].languageCode;
    //   if(validLanguages.includes(languageCode)){
    //     I18n.locale = languageCode;
    //     this.setState({ languageChoice: languageCode })
    //   }
    // }
    this.setState({ isComponentInitialized: true })
  }

  render() {

    const items = [
      '🇬🇧  English',
      '🇲🇾  Bahasa Malay',
      '🇨🇳  中文'
      //TODO NO CHINESE TRANSLATION YET { label: '🇨🇳  中文', value: 'cn' },
    ]
    const codes = [
      'en',
      'ms',
      'cn'
    ]
    if (!this.state.isComponentInitialized) return null

    return (
      <View style={{ paddingHorizontal: 12, paddingBottom: 10, }}>

        <CmnDropdownModalPicker choices={items}
          prices={null} //may be null meaning no charge for any pick
          onChange={async (index) => {
            this.setState({ languageChoice: codes[index] })
            console.log(codes[index])
            await storeLanguage(codes[index])
            this.props.onChange(codes[index])
          }} />
      </View>
    )

  }
} //end  I18nLanguagePicker


async function storeLanguage(lang) {
  I18n.locale = lang;
  await AsyncStorage.setItem('DWAppLang', lang);
}




const styles = StyleSheet.create({
  modalStyle: {
    height: 'auto',
    width: '90%',
    backgroundColor: GLOBALS.COLOR.MODAL_INFO_BK,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10,
  },
  modalHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    backgroundColor: GLOBALS.COLOR.MODAL_INFO_HDR_BK,
    margin: -10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  }
});

export default I18n;

