import React, { Component } from 'react'
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { withNavigation } from 'react-navigation';
import { Footer, Left, Body, Right } from 'native-base'

import { COLORS } from 'DWcmn/Global'
import { PRJ_STYLES } from 'DWcmn/PrjStyles'

import { PrjIconButton } from 'DWcmn/Prj'

//20230520 using Footer,Left etc rather than the deprecated Prj wrapper versions
//20230520 replaced PRJ_STYLES.footerBkg with a color property (icons want transparent background)

//GCFooter generic footer displays children with optional back and hide
//prop hide if the action is not enabled (no display)
//prop back to do a navigation goBack
// or  back() 
//prop style
//prop height
//prop color
//TODO check the styling ... seems to be some extra PRJ_STYLES.footerbkg hanging around
//     and buttons does the necessary stuff anyhow?
//NOTE this footer is coloured with the default project colour
//     to display simple icons in the footer use GCFooterTransparent

class GCFooter extends Component {

   render() {

      if (this.props.hide) { return null }

      let height = this.props.height || 60
      let color = this.props.color || COLORS.GC_FOOTER_BKG
      if (!this.props.back) {
         return (
            //20250822 added SafeAreaView - edges for pusing up footer above navigation bar at the bottom 
            //...Otherwise footer hides navigation bar at the bottom for new samsung devices
            <SafeAreaView edges={['bottom']} style={{backgroundColor:color, paddingTop:0}}>
               <Footer style={[{ height: height, backgroundColor: color }, styles.footer, this.props.style]}>
               {this.props.children}
            </Footer>
            </SafeAreaView>
         )
      }
      else {
         return (
            //20250822 added SafeAreaView - edges for pusing up footer above navigation bar at the bottom 
            //...Otherwise footer hides navigation bar at the bottom for new samsung devices
            <SafeAreaView edges={['bottom']}>
               <Footer style={[{ height: height, backgroundColor: color }, styles.footer, this.props.style]}>
               <Left style={styles.left}>
                  <PrjIconButton id='ARROW_BACK_FOOTER'
                     onPress={() => {
                        if (typeof this.props.back === 'function') { this.props.back() }
                        else { this.props.navigation.goBack() }
                     }} />
               </Left>
               <Body buttons style={styles.body}>{this.props.children}</Body>
               <Right style={styles.right} />
            </Footer>
            </SafeAreaView>
         )
      }
   }
}//end GCFooter

const styles = StyleSheet.create({

   footer: {
      justifyContent: 'space-evenly',// 20220810 used to be space-between
      flexDirection: 'row',
      alignItems: 'center',
      elevation: 0, //native base seems to set elevation to 3 by default .. we don't want
   },
   body: {
      flex: .8,
      flexDirection: 'row',
      justifyContent: 'space-evenly'
   },
   left: {
      flex: .1
   },
   right: {
      flex: .1
   },

})


export default withNavigation(GCFooter)

