import React, { Component } from 'react'
import { StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';

import { PRJ_STYLES } from 'DWcmn/PrjStyles'
import { COLORS } from 'DWcmn/Global'

import GCFooter from './GCFooter';
import { PrjIconWithText } from './PrjIconComponents'

//20230520 using Footer,Left etc rather than the deprecated Prj wrapper versions
//20241009 added hide property to GCFooterForIcons .. to mimic behaviour of GCFooterButtons

//GCFooterWithSingleIcon
//GCFooterCmdIcon inside a GCFooterForIcons for convenience
//prop code for the iconWithText (default is NEXT_IS_OKAY)
//prop hide for the footer
//prop onPress for the button press
//NOTE no back //TODO check ... use is removed
//NOTE does NOT pass any other properties to GCFooter
export class GCFooterWithSingleIcon extends Component {

   render() {
      return (
         <GCFooterForIcons hide={this.props.hide} back={this.props.back}>
            <GCFooterCmdIcon code={this.props.code || 'NEXT_IS_OKAY'} onPress={this.props.onPress} />
         </GCFooterForIcons>
      )
   }//end GCFooter
}

//GCFooterWithTwoIcons
//uses GCFooterCmdIcon inside a GCFooterForIcons left is onCancel, right onOkay
//prop onOkayCode gives icon with text for right hand selection
//prop onCancelCode gives icon with text for left hand selection
//prop onOkay for the right hand selection
//prop onCancel for the left hand selection
//prop disable hides the footer
//prop hide hides the footer
//NOTE that this component replace FooterButtonDouble which used disable prop
//     but others use hide ... we support both ... same meaning
export class GCFooterWithTwoIcons extends Component {

   render() {
      if (this.props.disable || this.props.hide) return (null)
      return (
         <GCFooterForIcons hide={this.props.hide} back={this.props.back}>
            {this.props.onCancel && <GCFooterCmdIcon code={this.props.onCancelCode || 'PREV_IS_CANCEL'} onPress={this.props.onCancel} />}
            {this.props.onOkay && <GCFooterCmdIcon code={this.props.onOkayCode || 'NEXT_IS_OKAY'} onPress={this.props.onOkay} />}
         </GCFooterForIcons>
      )
   }//end GCFooterWithTwoIcons
}

//GCFooterForIcons
//prop back to do a navigation goBack
// or  back() 
//prop hide
//NOTE does NOT pass any other properties to GCFooter
class GCFooterForIcons extends Component {

   render() {

      if (this.props.disable || this.props.hide) return (null)
      return (
         <GCFooter back={this.props.back} color={COLORS.GC_FOOTER_ICON_BKG}>
            {this.props.children}
         </GCFooter>
      )
   }
}//end GCFooter


//prop code NOTE this is the key to the ICONS_WITH_TEXT table in Global
//prop onPress
export class GCFooterCmdIcon extends Component {
   render() {
      return (
         <PrjIconWithText
            code={this.props.code}
            iconStyle={PRJ_STYLES.footerIcon}
            textStyle={PRJ_STYLES.footerIconText}
            onPress={this.props.onPress}
         />
      )
   }
}//end GCFooterCmdIcon

const styles = StyleSheet.create({

})


export default withNavigation(GCFooterForIcons)

