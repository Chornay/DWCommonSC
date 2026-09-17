import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native'
import { strX } from 'DWcmn/I18n';
import { PrjIcon } from 'DWcmn/PrjIconComponents'
import { COLORS } from 'DWcmn/Global'

//20221124 removed GCCmdIconForDetailsAction
//20221218 moved GCStopDetails to its own file
//20230619 added fit to GCText

//FIX .. we have to allow for 
// export function gcGetThumbnailFilename(code) {
//     const ourCode = code || 'default'    //no code specified .. use default
//     const filename = THUMBNAILS[code] || THUMBNAILS['error'] 
//     console.log(THUMBNAILS['foo'] )
//     let foo= require('./img/dwLogo.png')
//     return( foo)

// }
//prop code an index into the THUMBNAILS table ... gives us filename of the required image
//prop square
//prop small
// export class GCThumbnail extends Component {

//     render() {
//         let code = this.props.code || 'default'    //no code specified .. use default
//         let file = THUMBNAILS[code] || THUMBNAILS['error'] //index not found ... use error
//         return (
//             // <Thumbnail square={this.props.square}
//             //            small={this.props.small}
//             //            source={require('./img/dwLogo.png')}
//             // />
//             <Image
//                 resizeMode={'contain'}
//                 // width and heighi undefined is necessary to set width and height automatically 
//                 // Note width:'auto and heigh:'auto' doesn't work here
//                 style={{ flex: .1, width: undefined, height: undefined }}
//                 source={require('./img/dwLogo.png') }/>
//         );
//     } //end render

// }// end CmnImage

//prop code
//prop + all the GCText properties
export class GCI18n extends Component {
   render() {
      return (
         <GCText {...this.props}>{strX(this.props.code)} </GCText>
      )
   }

}//end GCI18n


//prop detail, large or (default normal)
//prop title (does not apply to large)
//prop list (font that we use in tables where we need lots of information .. bit bigger than detail)
//prop size overides the calculated size
//prop color overides the calculated color
//prop light overrides calculated color (and color prop!) and sets to a light gray
//prop bold set weight to bold (overriden only by style)
//prop underline
//prop edit sets the background to indicate that this field is edittable
//prop ellipsize //NOT IMPLEMENTED
//prop fit adds the 
//prop style overides everything
export class GCText extends Component {
   render() {
      let size, weight, color, background, padding, fit = false, numLines = null, decoration = 'none'
      //choose the styling
      //detail text
      if (this.props.detail) {
         if (this.props.title) {
            size = 12; weight = 'bold'; color = this.props.inverse ? 'white' : COLORS.GC_THEME_DARK
         }
         else {
            size = 12; weight = 'normal'; color = this.props.inverse ? 'white' : '#262627' //10% less than black
         }
      }
      else if (this.props.list) {
         size = Platform.OS === 'ios' ? 13 : 14; color = this.props.inverse ? 'white' : '#262627' //10% less than black
      }
      else if (this.props.large) { //large .. title option ignored
         size = 24; weight = 'normal'; color = this.props.inverse ? 'white' : COLORS.GC_THEME_DARK
      }
      else { //normal
         if (this.props.title) {
            size = Platform.OS === 'ios' ? 16 : 16; weight = 'bold'; color = this.props.inverse ? 'white' : COLORS.GC_THEME_DARK
         }
         else {
            size = Platform.OS === 'ios' ? 13 : 14; weight = 'normal'; color = this.props.inverse ? 'white' : '#262627' //10% less than black
         }
      }

      if (this.props.size) size = this.props.size
      if (this.props.color) color = this.props.color
      if (this.props.light) color = COLORS.GC_TEXT_GREY
      if (this.props.bold) weight = 'bold'
      if (this.props.edit) { background = COLORS.GC_HIGHLIGHT_TEXT_BK; padding = 5 }
      if (this.props.underline) { decoration = 'underline' } //had to remove bold ... didn't work well on ios
      if (this.props.fit) { fit = true, numLines = 1 }

      //render all our children inside a <Text> 
      return (
         <View>
            <Text style={[{
               fontSize: size, fontWeight: weight, color: color,
               backgroundColor: background, paddingHorizontal: padding, textDecorationLine: decoration
            },
            this.props.style]}
               adjustsFontSizeToFit={fit}
               numberOfLines={numLines}
            >
               {this.props.children}</Text>
         </View>
      )

   }
} //end GCText

//GCPencil is the pencil icon which when pressed causes an action
//  if disabled it is invisible
//NOTE PENCIL icon has a default colour specified in the ICONS table
//prop color .. optional, gets passed to PrjIcon
//prop size ... optional
//prop disabled ... don't display the pencil
//prop style
//prop onPress() ... if specified the pencil will be touchable
export class GCPencil extends Component {
   render() {

      if (this.props.disabled) {
         return null
      }
      else if (this.props.onPress) {
         return (
            <TouchableOpacity
               onPress={() => { this.props.onPress() }}>
               <PrjIcon style={[this.props.style,
               { fontSize: this.props.size || 20 }]} id={'PENCIL'} color={this.props.color} />
            </TouchableOpacity>
         )
      }
      return (<PrjIcon style={[this.props.style,
      { fontSize: this.props.size || 20 }]} id={'PENCIL'} color={this.props.color} />)
   }
}//end GCPencil


//prop text (this is text as entered by user)
//prop placeholderI18n
//prop style
//prop pencil [default false] to add a pencil icon to start of text
//NOTE we expect this to be used within a TouchableOpacity
//TODO right now we expect that the field is always editable. that may change and we will have to 
//     use a disabled property
export class GCUserTextWithPlaceholder extends Component {
   render() {

      if (this.props.text) {
         return (<GCText style={this.props.style} {...this.props}>
            {this.props.pencil && <GCPencil />}{this.props.text}</GCText>)
      } else {
         return (<GCText style={[{ fontStyle: 'italic' }, this.props.style]} {...this.props} >{this.props.pencil && <GCPencil noTouch />}{strX(this.props.placeholderI18n)}</GCText>)
      }
   }
}//end GCUserTextWithPlaceholder



//GCTouchableText is used to provide a text 'button' without an outline such as for footer
//prop onPress()
//prop text OR
//     i18n
//prop invisible //don't display anything
//prop disabled  //display text but not touchable
//prop styleText
//prop styleBack
//flex: .8,backgroundColor:GLOBALS.SCCOLOR.SCFOOTER_BK, paddingTop:15, paddingBottom:15, borderRadius:10,borderStyle: 'solid'
//color:GLOBALS.SCCOLOR.SCTEXT_FOR_CONTRAST, fontWeight:'bold'}
//20241004 added text property
export class GCTouchableText extends Component {

   render() {

      //if the text is invisible we return null
      //if the text is disabled we just display it normally
      if (this.props.invisible) {
         return null
      }
      if (this.props.disabled) {
         return (
            <Text style={[this.props.styleText]}>
               {this.props.text || strX(this.props.i18n)}
            </Text>
         )
      }
      return (

         // the flex:1 stretchs the touchable to fill the available space
         <TouchableOpacity style={[{ flex: 1, align_items: 'center', justifyContent: 'center' }, this.props.styleBack]}
            hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
            onPress={() => { this.props.onPress() }}
         >
            <Text style={[{ alignSelf: 'center' }, this.props.styleText]}>
               {this.props.text || strX(this.props.i18n)}
            </Text>
         </TouchableOpacity>
      )
   }
}//end GCTouchableText

const styles = StyleSheet.create({
   checkBox: {
      width: 40,
      height: 40
   },
   textNormal: {
      color: '#262627',
      fontWeight: 'normal',
      fontSize: Platform.OS === 'ios' ? 13 : 14,
   },
   textNormalTitle: {
      color: '#47BDEF',
      fontWeight: 'bold',
      fontSize: Platform.OS === 'ios' ? 16 : 16, //TODOSC should these be different?
   },
   textDetail: {
      color: '#262627', //10% less than black
      fontSize: 12
   },
   textDetailTitle: {
      color: '#47BDEF',
      fontWeight: 'bold',
      fontSize: 12
   },

})

