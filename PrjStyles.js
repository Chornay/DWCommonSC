import {Platform, Dimensions, StyleSheet } from 'react-native'
import { COLORS, GC_STD_MARGIN } from 'DWcmn/Global'
import GLOBALS from 'DWcmn/Global'; //TODO shouldn't need this

//20230520 removed footerBkg, footerBodyBkg
//20250209 remove border from tile
//20250321 new modal styles 


const { width: SCREEN_WIDTH } = Dimensions.get('window') || {};
const { height: SCREEN_HEIGHT } = Dimensions.get('window') || {};

export const PRJ_STYLES = StyleSheet.create({

   categoryLineBkg: {}, //currently no special styling 
   categoryLineText: { color: COLORS.GC_HEADER_TEXT, fontSize: 18, fontWeight: 'bold' },

   footerIcon: { color: COLORS.GC_FOOTER_ICON, fontSize: 24 },
   footerIconText: { color: COLORS.GC_FOOTER_ICON, fontSize: 12, fontWeight: 'bold' },
   footerText: { color: COLORS.GC_FOOTER_TEXT, fontSize: 18, fontWeight: 'bold' },

   // headerBkg: {  marginBottom:10, backgroundColor: COLORS.GC_HEADER_BKG },
   headerBkg: { backgroundColor: COLORS.GC_HEADER_BKG },
   headerSigninBkg: { backgroundColor: 'transparent' },
   headerIcon: { color: COLORS.GC_HEADER_ICON, fontSize: 34 },
   headerSigninIcon: { color: COLORS.GC_HEADER_SIGNIN_ICON, fontSize: 34 },
   headerIconText: { color: COLORS.GC_HEADER_TEXT, fontSize: 12, fontWeight: 'bold' },
   headerText: { color: COLORS.GC_HEADER_TEXT, fontSize: 18, fontWeight: 'bold' },
   headerTextLarge: { color: COLORS.GC_HEADER_TEXT, fontSize: 28, fontWeight: 'bold' },

   //NOTE these modal pullup styles are expected to be the SAME
   //other than the height.  The default is 40% height
   modalPullup: {
      height: '40%',
      width: SCREEN_WIDTH,
      backgroundColor: COLORS.GC_PULLUP_BKG,
      justifyContent: 'center',
      margin: 0,
      marginTop: 'auto',
      marginBottom: -18,
      alignSelf: 'center',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      //     paddingHorizontal: '10%' //CmnCmdModal had this
   },

   modalPullup60: {
      height: '60%',
      width: SCREEN_WIDTH,
      backgroundColor: COLORS.GC_PULLUP_BKG,
      justifyContent: 'center',
      margin: 0,
      marginTop: 'auto',
      marginBottom: -18,
      alignSelf: 'center',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
   },

   modalNew: {
      // height: '40%', 20250616 changed for CmnPriceItemDialog  keyboard problem
      height: Platform.OS === 'ios' ? '70%' : '50%',
      width: '90%',
      borderRadius: 2,
      alignSelf: 'center',
      padding: 20,
      backgroundColor: COLORS.GC_BACKGROUND
   },
   modalEditable: {
      height: Platform.OS === 'ios' ? '70%' : '40%',
      width: '90%',

      borderRadius: 2,
      alignSelf: 'center',
      padding: 20,
      backgroundColor: COLORS.GC_BACKGROUND,
      bottom:'10%'
   },

   modalHorizontalLine: {
      borderBottomWidth: .5,
      borderBottomColor: COLORS.GC_TEXT_GREY,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      // shadow
      shadowColor: COLORS.GC_TEXT_GREY,
      shadowOffset: {
         width: 0,
         height: 1,
      },
   },
    modalFooter:{
      flex: .2,
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingTop: 10,
      alignItems: 'flex-start',
      paddingBottom: 10,
   },
   spacyBox:{
      flex:1,
      width:'auto',
      height:'auto',
      padding:10,
      justifyContent:'center', 
      alignItems:'center', 
      margin:10,
      borderWidth:3,
      borderRadius:10,
      borderColor:COLORS.GC_THEME_DARK,
   },
   pullupBkg: { backgroundColor: COLORS.GC_PULLUP_BKG },
   pullupText: { color: 'red', fontSize: 12, fontWeight: 'bold' },
   pullupCmd: { color: COLORS.GC_PULLUP_CMD, fontSize: 18, fontWeight: 'bold' },

   tabBkg: { backgroundColor: 'transparent' },
   tabText: { color: COLORS.GC_THEME_LIGHT, opacity: 0.6, fontSize: 14 },
   tabBkgActive: { backgroundColor: 'transparent', borderBottomWidth: 3, borderStyle: 'solid', borderColor: COLORS.GC_THEME_DARK },
   tabTextActive: { color: COLORS.GC_THEME_DARK, fontWeight: 'bold', fontSize: 14 },

   //NOTE that we set background color to transparent but we still have to use the
   //  BUTTON parameter 'transparent' to eliminate a border
   // tileButtonBkg: { backgroundColor:'transparent'},
   tileButtonBkg: { backgroundColor: COLORS.GC_TILEBUTTON_BKG },
   tileButtonIcon: { color: COLORS.GC_TILEBUTTON_ICON, fontSize: 20 },
   tileButtonText: { color: COLORS.GC_TILEBUTTON_TEXT, fontSize: 10, fontWeight: 'bold' },

   //styling for a route or order tile
   //has border and shadow
   //no horizontal margin but has vertical margin for easy spacing in lists
   //no interior padding
   tile: {
      alignSelf: 'center',
      justifyContent: 'space-between',
      width: '100%',
      height: 'auto',
      padding: 20,
      paddingVertical: 10,
      borderRadius: 10,
      marginBottom: 10,
      backgroundColor: COLORS.GC_TILE_BK
   },

   // Old tile style has shadow
   // tile: {
   //     justifyContent: 'center',
   //     marginTop: 5,
   //     marginBottom: 10,
   //     marginLeft: 5, //without the shadow will be cute off
   //     marginRight: 5, //without the shadow will be cute off
   //     paddingLeft: 0,
   //     paddingRight: 0,
   //     paddingTop: 0,
   //     paddingBottom: 0,
   //     borderColor: COLORS.GC_TILE_BORDER,
   //     backgroundColor: COLORS.GC_TILE_BK,
   //     shadowColor: 'rgba(0, 0, 0, 0.1)',
   //     shadowOpacity: 2,
   //     shadowRadius: 5,
   //     shadowOffset: { height: 4 }, // SC added shadowOffset for iOS
   //     elevation: 5,
   //     borderStyle: 'solid',
   //     borderBottomWidth: 0,
   //     borderTopWidth: 0,
   //     borderLeftWidth: 0,
   //     borderRightWidth: 0,
   //     borderRadius: 15,
   //     borderWidth: 1,
   // },

   //we hope that this is a standard way to highlight a selected 'box'
   highlightSelected: {
      backgroundColor: COLORS.GC_HIGHLIGHT_SELECTED,
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOpacity: .1,
      elevation: 5,
      shadowRadius: .8,
      //shadow
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOpacity: 2,
      shadowRadius: 5,
      shadowOffset: { height: 4 }, // SC added shadowOffset for iOS
      elevation: 5,

   },

   //used only in CmnCmdModal
   buttonSideBySideOkay: {
      backgroundColor: COLORS.GC_THEME_DARK,
      justifyContent: 'center',
      alignItems: 'center',
      width: '45%',
      height: 'auto',
      borderRadius: 6,
      paddingTop: 10,
      paddingBottom: 10

   },
   buttonSideBySideCancel: {
      borderWidth: 1,
      borderColor: COLORS.GC_BUTTONOTHER_BKG,
      justifyContent: 'center',
      alignItems: 'center',
      width: '45%',
      height: 'auto',
      borderRadius: 6,
      paddingTop: 10,
      paddingBottom: 10,
   }


})
