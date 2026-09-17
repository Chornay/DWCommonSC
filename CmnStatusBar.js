import React, { Component } from 'react'
import { Platform, SafeAreaView, StatusBar } from 'react-native';
import { COLORS } from 'DWcmn/Global'
//20221115 final version supports overwrite (for image background screens) and hidden (unused)
//20230317 removed   <SafeAreaView style={{ marginTop: '-12%' }}>  for ios overwrite case

//prop overwrite (use full screen but display statusbar elements)
//  or hidden (use full screen)
//  these are optional .. use only one (but hidden takes precedence)
//prop color (default COLORS.GC_BACKGROUND)
export class CmnStatusBar extends Component {

   render() {

      //IOS
      //NOTE the -12% is an arbitrary number ... it has to be big enough to 'cover' the status bar
      //    and doesn't seem to matter if it is too big but too small leaves a white bar
      if (Platform.OS == 'ios') {
         if (this.props.hidden) {
            return (
               <SafeAreaView style={{ marginTop: '-12%' }}>
                  <StatusBar hidden />
               </SafeAreaView>
            );
         }
         else if (this.props.overwrite) {
            return (
               <SafeAreaView>
                  <StatusBar barStyle={'dark-content'} />
               </SafeAreaView>
            );
         }
         else {
            const ourColor = this.props.color || COLORS.GC_HEADER_BKG
            return (
               <SafeAreaView style={{ backgroundColor: ourColor, marginTop: '-12%' }}>
                  <StatusBar barStyle={'dark-content'} />
               </SafeAreaView>
            );
         }
      }

      //else android
      if (this.props.hidden) {
         return (
            <StatusBar hidden />
         );
      }
      else if (this.props.overwrite) {
         return (
            <StatusBar
               backgroundColor='transparent'
               barStyle={'dark-content'}
               translucent={true}
            />
         );
      }
      else {
         return (
            <StatusBar
               translucent={false}
               backgroundColor={this.props.color || COLORS.GC_HEADER_BKG}
               barStyle={'dark-content'}
            />
         );
      }
   }
}//end CmnStatusBar
