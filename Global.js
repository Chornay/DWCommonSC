import { Enumify } from 'enumify'

//20250209 commented out unused RouteActionIconLookup and OrderActionIconLookup

// const THEME_COLOR = '#30d5a0';//previous
// const CONTRAST_COLOR = '#f0c760';
// const CONTRAST_DARK_COLOR = '#5d4509';
const THEME_COLOR = '#ffffff';
const CONTRAST_COLOR = '#9cd5f9';
const CONTRAST_DARK_COLOR = '#d39cf9'; //todo should be darker blue shade .. black <must> show through
const WHITE_COLOR = '#ffffff'; //whiter than the 'white' constant
// const HILITE_COLOR = 'red';
const HILITE_COLOR = '#48b9f8';
const TEXT_COLOR = 'grey';
const TEXT_DARK_COLOR = '#262627'; //10% less than black
const ERROR = 'red';
const HINT_DARK_COLOR = '#b3b3b3';

//these colours are from https://www.w3schools.com/colors/colors_picker.asp
const PICKING_UP = '#ff0000'; //dark red 50% lightness
const PICKED_UP = '#ff9999'; //lighter red 80% lightness
const DELIVERING = '#47d147'; //dark green 20% lightness
const DELIVERED = '#00ff00'; //lighter green 50% lightness
const SELECTED = 'blue';
const ALL_ORDERS = 'yellow'; //used for any pin or the filter mode box


export default {

  DRIVER: {
    FAB_COLOR_BUTTON: '#5067FF', //colors for the path Floating Action Button
    FAB_COLOR_PICK: '#33ccff',
    FAB_COLOR_START: '#00ff00',
    FAB_COLOR_STOP: '#ff0000',
    FABSHOWALL_COLOR: '#5067FF', //color for the map 'show all orders in route' button
    PATH_COLOR: 'red',           //color and width of the directions path
    PATH_WIDTH: 4,
    PATHPICK_COLOR_OFF: 'blue',
    PATHPICK_COLOR_ON: 'red',
    PATHPICK_MARKER_OPACITY: 0.8,
  },
  SHOP: {
    FABSHOWALL_COLOR: '#5067FF', //color for the map 'show all orders in route' button
  },

  COLOR: {

    //general constants
    BTN_BK: THEME_COLOR, //TODO don't we want transparent??
    BTN_BORDER: TEXT_COLOR,
    BTN_BORDER_HI: TEXT_COLOR,
    BTN_TEXT: TEXT_DARK_COLOR,

    LIST_ENTRY_TEXT: TEXT_DARK_COLOR,

    MODAL_INFO_BK: 'white',
    MODAL_INFO_HDR_BK: HILITE_COLOR,
    MODAL_INFO_TEXT: 'black',

    MODAL_CMD_BK: 'grey',

    TAB_BK: THEME_COLOR, //TODO 20210925 is this what we want
    // TAB_BK: '#5ac0f9',
    TAB_TEXT: '#b5ddfc',  //light blue
    TAB_ACT_TEXT: '#0881dd', //darker blue
    TAB_UNDERLINE: '#0881dd',

    TEXT: TEXT_DARK_COLOR, ////NOTE 202111 changed from CONTRAST_DARK to TEXT
    TEXT_CONTRAST: CONTRAST_COLOR,
    TEXT_HILITE: HILITE_COLOR,
    TEXT_ERROR: ERROR,

    BADGE_ITEMS: '#2196f3',
    BADGE_ITEMS_UNPRICED: 'red',

    SLIDE_INTRO_TITLE: '#77c1f3',
    SLIDE_INTRO_TEXT: '#6f94ad',

    STATUS_PICKING_UP: PICKING_UP,
    STATUS_PICKED_UP: PICKED_UP,
    STATUS_DELIVERING: DELIVERING,
    STATUS_DELIVERED: DELIVERED,
    STATUS_SELECTED: SELECTED, // used when an order has been selected for display
    STATUS_ALL_ORDERS: ALL_ORDERS,

    SETTING_MODAL_BK: CONTRAST_COLOR,

  },

}
export const DW_EMAIL_ADDRESS = "admin@dobbywalla.com"
export const DW_PHONE_NUMBER = "+601126654287"
export const DW_SMS_NUMBER = "+601126654287"
export const DW_WHATSAPP_NUMBER = "+601126654287"
export const GC_STD_MARGIN = 10 //was 20 20240926
export const GC_MIN_MARGIN = 10 //the horizontal screen margin to be used when not much space
export const GC_STD_TOP = 20 //the standard margin 'claimed' at the bottom of GCHeader

const GC_COLOR_ABSOLUTE_WHITE = '#ffff'
// const GC_DW_BLUE = '#47BDEF'
const GC_DW_BLUE = '#34c7f4' //changed 20230321
const GC_DANIEL_WATER_BLUE = '#EBF4FA'
const GC_DANIEL_GOLD = '#FBB117'
const GC_GREY = 'grey'
// const GC_THEME_DARK = '#122f7e' //this is 'logo bkg color'SC
const GC_THEME_DARK = '#204e94'
const GC_LOGO_DARK = '#204e94'
const GC_LOGO_BKG = '#122f7e' //the preferrend colour for dark screens showing logo
const GC_LOGO_LIGHT = '#34c7f4'
const GC_THEME_LIGHT = '#34c7f4'

export const COLORS = {

  GC_THEME_DARK: GC_THEME_DARK,
  GC_THEME_LIGHT: GC_THEME_LIGHT,
  GC_TEXT_GREY: GC_GREY,  //to be used any time you want a generic 'not black' type
  GC_ABS_WHITE: GC_COLOR_ABSOLUTE_WHITE,


  GC_BUTTON_BKG: GC_THEME_DARK,
  GC_BUTTON_BKG_DISABLED: '#dbdddc',
  GC_BUTTON_TEXT: 'white',
  GC_BUTTON_TEXT_DISPLAYED: '#b3b3b3',

  GC_BUTTONOTHER_BKG: 'grey',
  GC_BUTTONOTHER_TEXT: 'black',

  GC_BACKGROUND: GC_COLOR_ABSOLUTE_WHITE,

  GC_CHECKBOX_BORDER: GC_THEME_DARK, //20240926 was GC_THEME_LIGHT
  GC_CHECKBOX_ON: GC_THEME_DARK, //20240926 was GC_THEME_LIGHT
  GC_CHECKBOX_OFF: GC_COLOR_ABSOLUTE_WHITE,

  GC_FOOTER_TEXT: 'white',          //regular footer light text on a dark background
  GC_FOOTER_BKG: GC_THEME_DARK,     //....
  GC_FOOTER_ICON: 'grey',           //icons in footer are light on a very light background
  GC_FOOTER_ICON_BKG: '#f6f6f6',    //....

  GC_FORMINPUT_BKG: '#f6f6f6', //very light gray
  GC_FORMINPUT_BKG_SIGNIN_STYLE: '#7994be', //bluey grey
  GC_FORMINPUT_BORDER: 'transparent',
  GC_FORMINPUT_BORDER_SIGNIN_STYLE: 'transparent',
  GC_FORMINPUT_LABEL: GC_THEME_DARK,
  GC_FORMINPUT_LABEL_SIGNIN_STYLE: 'white',
  GC_FORMINPUT_TEXT: GC_THEME_DARK,
  GC_FORMINPUT_TEXT_SIGNIN_STYLE: '#f0f0f0',
  GC_FORMINPUT_WARNING_BKG: 'transparent', //a unique pink
  GC_FORMINPUT_WARNING_BORDER: '#fb6e75', //a unique red 
  GC_FORMINPUT_WARNING_TEXT: '#fb6e75',

  GC_HEADER_TEXT: GC_THEME_DARK,
  GC_HEADER_ICON: GC_THEME_DARK,
  GC_HEADER_SIGNIN_ICON: GC_THEME_LIGHT,
  GC_HEADER_BKG: GC_COLOR_ABSOLUTE_WHITE, //20240926 was GC_THEME_LIGHT

  GC_HIGHLIGHT_SELECTED: GC_DANIEL_WATER_BLUE,//TODO diff between HIGHLIGHT and SHADE
  GC_HIGHLIGHT_IMPORTANT: GC_DANIEL_GOLD,
  GC_HIGHLIGHT_TEXT_BK: '#f5dadb',
  GC_HORIZONTAL_LINE: GC_GREY,

  GC_ICON: 'black', //TODO 
  GC_ICON_MAP_THEME_DARK: GC_THEME_DARK,

  GC_LIGHT: GC_GREY,

  GC_LIST_HDR_BKG: '#f1f1f1', //TODO this is an arbitrary gray colour

  GC_INSTRUCTIONS: GC_DANIEL_GOLD,
  GC_INSTRUCTIONS_HI: 'red',

  GC_MAP_FAB_SHOWALL: GC_THEME_DARK, //20240926 was grey

  //the input spinner (+/- component) uses two colours that invert when positive
  GC_PLUSMINUS_ON: GC_THEME_DARK, //20240926 was GC_THEME_LIGHT
  GC_PLUSMINUS_OFF: GC_COLOR_ABSOLUTE_WHITE,
  GC_PLUSMINUS_TEXT_ON: GC_COLOR_ABSOLUTE_WHITE,
  GC_PLUSMINUS_TEXT_OFF: 'black',


  GC_PULLUP_BKG: GC_COLOR_ABSOLUTE_WHITE,
  GC_PULLUP_CMD: GC_THEME_DARK,
  GC_PULLUP_PLACEHOLDER: 'grey',
  GC_PULLUP_TITLE: GC_THEME_DARK,
  GC_PULLUP_TEXT: GC_THEME_DARK,

  GC_SHADE_SELECTED: GC_DANIEL_WATER_BLUE,
  GC_SHADE_TITLE: '#caea8f',

  GC_SIGNIN_BKG: GC_THEME_DARK,
  GC_SIGNIN_BUTTON_TEXT: GC_THEME_DARK,
  GC_SIGNIN_BUTTON_BKG: GC_COLOR_ABSOLUTE_WHITE,
  GC_SIGNIN_TEXT: GC_COLOR_ABSOLUTE_WHITE,
  //NOTE signin buttons are white with dark text
  //     text written directly on screen should be GC_SIGNIN_TEXT

  GC_TILE_BORDER: '#e8e8e8',
  GC_TILE_BK: '#f7f7f7',

  GC_TILEBUTTON_TEXT: 'grey',
  GC_TILEBUTTON_ICON: 'grey',
  GC_TILEBUTTON_BKG: 'transparent',
  GC_SWITCH_LIGHT_BLUE: '#81b0ff',
  GC_SWITCH_DISABLE: '#e9e9eb',



  GC_SHADED_BACKGROUND: 'grey' // a color that can be used to highlight an item without covering (blue or black) text
}

export const ICONS_WITH_TEXT =
{
  ACCEPT: { i18n: "cmnNEW.ACCEPT", icon: "HAND_OKAY" },
  ADD_QR_CODE: { i18n: "cmnNEW.ADD_QR_CODE", icon: "QUESTION" },
  ALERT_TIME: { i18n: "cmnNEW.SOON", icon: "ALERT_TIME" },
  ASSIGN_ID: { i18n: "cmnNEW.ASSIGN_ID", icon: "ASSIGN_ID" },
  AT_SHOP: { i18n: "cmnNEW.AT_SHOP", icon: "HOME" },
  CANCEL: { i18n: "cmn.CANCEL", icon: "CIRCLE_X" },
  CANCEL_GARBAGE: { i18n: "cmn.CANCEL", icon: "DELETE" },
  CHECK_THIS_LOCATION: { i18n: "cmnNEW.CHECK_THIS_ADDRESS", icon: "CIRCLE_CHECK" },
  CHANGE_ORDER: { i18n: "cmnNEW.CHANGE", icon: "CHANGE_ORDER" },
  CLEANED: { i18n: "cmnNEW.CLEANED", icon: "WASHER" },
  CLOSE: { i18n: "cmn.CLOSE", icon: "CLOSE" },
  CODE_UNDEF: { i18n: "cmnNEW.QUESTION_MARKS", icon: "QUESTION" },
  CONFIRM: { i18n: "cmnNEW.CONFIRM", icon: "CIRCLE_CHECK" },
  CONFIRM_RECEIPT: { i18n: "cmnNEW.GOT_IT", icon: "HAND_OKAY" },
  DATE: { i18n: "cmnNEW.DATE", icon: "DATE" },
  DATE_NEXT: { i18n: "cmn.NEXT", icon: "DATE_NEXT" },
  DATE_PREV: { i18n: "cmn.PREVIOUS", icon: "DATE_PREV" },
  DETAILS: { i18n: "cmnNEW.DETAILS", icon: "INFO" },
  DROPOFF: { i18n: "cmnNEW.DROPOFF", icon: "ARROW_DOWN_OUTLINE" },
  DROPOFF_WITH_CASH: { i18n: "cmnNEW.CASH", icon: "ARROW_DOWN_OUTLINE" },
  FAIL_PICKUP: { i18n: "cmnNEW.NO_PICKUP", icon: "CIRCLE_X" },
  FAIL_DROPOFF: { i18n: "cmnNEW.NO_DROPOFF", icon: "CIRCLE_X" },
  HISTORY: { i18n: "cmnNEW.HISTORY", icon: "HISTORY" },
  LOCK: { i18n: "cmnNEW.LOCK", icon: "LOCK" },
  LOGOUT: { i18n: "cmnNEW.LOGOUT", icon: "LOGOUT" },
  NAVIGATE: { i18n: "cmnNEW.NAVIGATE", icon: "ROUTE" },
  NEW_ORDER: { i18n: "cst.NEW_ORDER", icon: "ADD" },
  NEXT_IS_ACCEPT: { i18n: "cmnNEW.ACCEPT", icon: "ARROW_CIRCLE_RIGHT" },
  NEXT_IS_BACK: { i18n: "cmnNEW.BACK", icon: "ARROW_CIRCLE_RIGHT" },
  NEXT_IS_CREATE_ACCOUNT: { i18n: "cmnNEW.CREATE_ACCOUNT", icon: "ARROW_CIRCLE_RIGHT" },
  NEXT_IS_DELETE: { i18n: "cmnNEW.DELETE", icon: "DELETE" },
  NEXT_IS_DELIVERY: { i18n: "cmn.DELIVERY", icon: "ARROW_CIRCLE_RIGHT" },
  NEXT_IS_DONE: { i18n: "cmnNEW.DONE", icon: "ARROW_CIRCLE_RIGHT" },
  NEXT_IS_FINAL_REVIEW: { i18n: "cmnNEW.FINAL_REVIEW", icon: "ARROW_CIRCLE_RIGHT" },
  NEXT_IS_FINAL_WITH_COUPON: { i18n: "cmnNEW.FINAL_USING_COUPON", icon: "ARROW_CIRCLE_RIGHT" },
  NEXT_IS_SEARCH_FOR_DEALS: { i18n: "cmnNEW.SEARCH_FOR_DEALS", icon: "ARROW_CIRCLE_RIGHT" },
  NEXT_IS_NO_CHANGE: { i18n: "cmnNEW.NO_CHANGE", icon: "ARROW_CIRCLE_RIGHT" },
  NEXT_IS_OKAY: { i18n: "cmn.OKAY", icon: "ARROW_CIRCLE_RIGHT" },
  NEXT_IS_OPTIONS: { i18n: "cmnNEW.OPTIONS", icon: "ARROW_CIRCLE_RIGHT" },
  NEXT_IS_ORDER_REVIEW: { i18n: "cmnNEW.ORDER_REVIEW", icon: "ARROW_CIRCLE_RIGHT" },
  NEXT_IS_ORDER_CHANGE_INVOICE: { i18n: "cmnNEW.ORDER_CHANGE_INVOICE", icon: "ARROW_CIRCLE_RIGHT" },
  NEXT_IS_ORDER_CHANGE_SUMMARY: { i18n: "cmnNEW.ORDER_CHANGE_SUMMARY", icon: "ARROW_CIRCLE_RIGHT" },
  NEXT_IS_PICKUP: { i18n: "cmn.PICKUP", icon: "ARROW_CIRCLE_RIGHT" },
  NEXT_IS_SAVE: { i18n: "cmnNEW.SAVE", icon: "ARROW_CIRCLE_RIGHT" },
  NEXT_IS_SERVICE_LEVEL: { i18n: "cmnNEW.SERVICE_LEVEL", icon: "ARROW_CIRCLE_RIGHT" },
  NEXT_IS_SEND_EMAIL: { i18n: "cstNEW.SEND_EMAIL", icon: "ARROW_CIRCLE_RIGHT" },
  NEXT_IS_SHOPPING_CART: { i18n: "cmnNEW.SHOPPING_CART", icon: "ARROW_CIRCLE_RIGHT" },
  NEXT_IS_WHATS_NEXT: { i18n: "cmnNEW.WHATS_NEXT", icon: "ARROW_CIRCLE_RIGHT" },
  NEXT_IS_WRONG_ADDRESS_: { i18n: "cmnNEW.WRONG_ADDRESS_", icon: "ARROW_CIRCLE_RIGHT" },
  NEXT_IS_YES: { i18n: "cmnNEW.YES", icon: "ARROW_CIRCLE_RIGHT" },
  NOTIFY: { i18n: "cmnNEW.NOTIFY", icon: "MESSAGE" },
  OPEN: { i18n: "cmn.OPEN", icon: "OPEN" },
  PAY: { i18n: "cmnNEW.PAY", icon: "MONEY" },
  PHONE: { i18n: "cmn.Phone", icon: "PHONE" },
  PICKUP: { i18n: "cmn.PICKUP", icon: "ARROW_UP_OUTLINE" },
  PICKUP_WITH_CASH: { i18n: "cmnNEW.CASH", icon: "ARROW_UP_OUTLINE" },
  PLACE_NEW_ORDER: { i18n: "cmnNEW.PLACE_NEW_ORDER", icon: "ADD" },
  PREV_IS_CANCEL: { i18n: "cmn.CANCEL", icon: "ARROW_CIRCLE_LEFT" },
  PREV_IS_DECLINE: { i18n: "cmnNEW.DECLINE", icon: "CIRCLE_X" },
  PREV_IS_NEW_ADDRESS: { i18n: "cmnNEW.NEW_ADDRESS", icon: "ARROW_CIRCLE_LEFT" },
  PREV_IS_NO: { i18n: "cmnNEW.NO", icon: "ARROW_CIRCLE_LEFT" },
  PREV_IS_NOT_NOW: { i18n: "cmnNEW.NOT_NOW", icon: "CIRCLE_X" },
  PREV_IS_NO_THANKS: { i18n: "cmnNEW.NO_THANKS", icon: "CIRCLE_X" },
  PREV_IS_START_AGAIN: { i18n: "cmnNEW.START_AGAIN", icon: "ARROW_CIRCLE_LEFT" },
  PREV_IS_TRY_ANOTHER: { i18n: "cmnNEW.TRY_ANOTHER", icon: "ARROW_CIRCLE_LEFT" },
  PREV_IS_WRONG_SHOP_: { i18n: "cmnNEW.WRONG_SHOP_", icon: "ARROW_CIRCLE_LEFT" },
  PRINT: { i18n: "cmnNEW.PRINT", icon: "PRINT" },
  APPROVE: { i18n: "cmnNEW.APPROVE", icon: "THUMBS_UP" },
  PROFILE: { i18n: "cmnNEW.PROFILE", icon: "PERSON" },
  REFRESH: { i18n: "cmnNEW.REFRESH", icon: "REDO" },
  RELEASE: { i18n: "cmnNEW.RELEASE", icon: "CIRCLE_X" },
  REMOVE: { i18n: "cmnNEW.REMOVE", icon: "DELETE" },
  RESCHED: { i18n: "cmnNEW.RESCHEDULE", icon: "CLOCK" },
  RETAKE_PHOTO: { i18n: "cmnNEW.RETRY", icon: "RETAKE_PHOTO" },
  ROUTES: { i18n: 'cmnNEW.ROUTES', icon: "DATE" },
  SAVE: { i18n: "cmnNEW.SAVE", icon: "SAVE" },
  SCAN_QR: { i18n: "cmnNEW.SCAN", icon: "QR" },
  SCAN_NEW_QR: { i18n: "cmnNEW.SCAN_ORDER_QR", icon: "QR" },
  SEARCH: { i18n: "cmnNEW.SEARCH", icon: "SEARCH" },
  SELECT_A_SHOP: { i18n: "cmnNEW.SELECT_A_SHOP", icon: "ADD" },
  TAKE_PHOTO: { i18n: "cmnNEW.Blank", icon: "TAKE_PHOTO" },
  TEST: { i18n: "cmnNEW.TEST", icon: "TEST" },
  UNLOCK: { i18n: "cmnNEW.UNLOCK", icon: "UNLOCK" },
  UNDO_DROPOFF: { i18n: "cmnNEW.UNDO", icon: "ARROW_DOWN_CANCEL", color: 'red' },
  UNDO_PICKUP: { i18n: "cmnNEW.UNDO", icon: "ARROW_UP_CANCEL", color: 'red' },
  UPDATE: { i18n: "cmnNEW.UPDATE", icon: "CIRCLE_CHECK" },
  WHATSAPP: { i18n: "cmnNEW.WHATSAPP", icon: "WHATSAPP", color: '#25d366' }, //whatsapp green

  INVALID: { i18n: "cmnNEW.QUESTION_MARKS", icon: "QUESTION" }
}
export const ICONS =
{
  ADD: { name: "add", type: "MaterialIcons" },
  ALERT_TIME: { name: "clock-alert-outline", type: "MaterialCommunityIcons" },
  ARROW_BACK: { name: "arrow-back", type: "MaterialIcons" },
  ARROW_BACK_FOOTER: { name: "arrow-back", type: "MaterialIcons", color: COLORS.GC_FOOTER_ICON },
  ARROW_BACK_HEADER: { name: "keyboard-arrow-left", type: "MaterialIcons", color: COLORS.GC_HEADER_ICON },
  ARROW_CIRCLE_LEFT: { name: "arrow-left-bold-circle-outline", type: "MaterialCommunityIcons", color: COLORS.GC_FOOTER_ICON },
  ARROW_CIRCLE_RIGHT: { name: "arrow-right-bold-circle-outline", type: "MaterialCommunityIcons", color: COLORS.GC_FOOTER_ICON },
  ARROW_DOWN_OUTLINE: { name: "arrow-down-bold-outline", type: "MaterialCommunityIcons" },
  ARROW_DOWN_CANCEL: { name: "arrow-down-bold-hexagon-outline", type: "MaterialCommunityIcons" },
  ARROW_FORWARD: { name: "arrow-forward", type: "MaterialIcons" },
  ARROW_FORWARD_FOOTER: { name: "arrow-forward", type: "MaterialIcons", color: CONTRAST_COLOR },
  ARROW_RIGHT: { name: "keyboard-arrow-right", type: "MaterialIcons" },
  ARROW_UP_OUTLINE: { name: "arrow-up-bold-outline", type: "MaterialCommunityIcons" },
  ARROW_UP_CANCEL: { name: "arrow-up-bold-hexagon-outline", type: "MaterialCommunityIcons" },
  ASSIGN_ID: { name: "add-chart", type: "MaterialIcons" },
  BURGER: { name: "menu", type: "MaterialCommunityIcons" },
  CALCULATOR: { name: "calculator", type: "MaterialCommunityIcons" },
  CAMERA: { name: "camera", type: "MaterialCommunityIcons", color: GC_THEME_DARK },
  CANCEL_HEADER: { name: "close-circle-outline", type: "MaterialCommunityIcons", color: COLORS.GC_HEADER_ICON },
  CHECK: { name: "check", type: "MaterialIcons" },
  CHANGE_ORDER: { name: "pencil-circle-outline", type: "MaterialCommunityIcons" },
  CHANGE_PASSWORD: { name: "security", type: "MaterialCommunityIcons" },
  CIRCLE_CHECK: { name: "check-circle-outline", type: "MaterialIcons" },
  CIRCLE_X: { name: "highlight-off", type: "MaterialIcons" },
  CLOCK: { name: "progress-clock", type: "MaterialCommunityIcons" },
  CLOSE: { name: "door-closed", type: "MaterialCommunityIcons" }, //TODO
  COUPON: { name: "gift-outline", type: "MaterialCommunityIcons" }, //TODO
  DATE: { name: "calendar-month", type: "MaterialCommunityIcons" },
  DATE_NEXT: { name: "calendar-arrow-right", type: "MaterialCommunityIcons" },
  DATE_PREV: { name: "calendar-arrow-left", type: "MaterialCommunityIcons" },
  DELETE: { name: "delete", type: "MaterialIcons" },
  EAR: { name: "hearing", type: "MaterialIcons" },
  EDIT: { name: "mode-edit", type: "MaterialIcons" },
  EMAIL: { name: "email", type: "MaterialIcons" },
  EMAIL_OUTLINE: { name: "mail-outline", type: "MaterialIcons" },
  EYE: { name: "eye-outline", type: "Ionicons" },
  EYE_OFF: { name: "eye-off-outline", type: "Ionicons" },
  EDIT: { name: "mode-edit", type: "MaterialIcons" },
  EDITABLE_BOX: { name: "square-edit-outline", type: "MaterialCommunityIcons", color: COLORS.GC_THEME_DARK },
  // EDIT:{name:"edit", type:"MaterialIcons"},
  FACE_BOOK: { name: "facebook", type: "MaterialIcons" },
  FILTER: { name: "filter-list", type: "MaterialIcons" },
  HAND_OKAY: { name: "hand-okay", type: "MaterialCommunityIcons" },
  HISTORY: { name: "history", type: "MaterialCommunityIcons" },
  home: { name: "home", type: "MaterialIcons" },
  HOME: { name: "home", type: "MaterialIcons" },
  I_IN_CIRCLE: { name: "information-outline", type: "MaterialCommunityIcons", color: COLORS.GC_INSTRUCTIONS },
  INFO: { name: "information-outline", type: "MaterialCommunityIcons" },
  KEY_ARROW_DOWN: { name: "keyboard-arrow-down", type: "MaterialIcons" },
  KEY_ARROW_DOWN_BOLD: { name: "keyboard-arrow-down", type: "MaterialIcons", color: 'red' },
  KEY_ARROW_UP: { name: "keyboard-arrow-up", type: "MaterialIcons" },
  KEY_ARROW_UP_BOLD: { name: "keyboard-arrow-up", type: "MaterialIcons", color: 'red' },
  KEYBOARD: { name: "keyboard-outline", type: "MaterialCommunityIcons" },
  LANGUAGE: { name: "language", type: "MaterialIcons" },
  LOCATION: { name: "location-on", type: "MaterialIcons" },
  LOCK: { name: "lock-outline", type: "MaterialCommunityIcons" },
  LOGOUT: { name: "logout", type: "MaterialCommunityIcons" },
  MAP: { name: "map", type: "MaterialIcons" },
  MAP_POSITION: { name: "stop-circle-outline", type: "MaterialCommunityIcons" },
  MAP_SHOW_ALL: { name: "stop-circle-outline", type: "MaterialCommunityIcons", color: GC_THEME_DARK },
  MAP_MARKER_PATH: { name: "map-marker-path", type: "MaterialCommunityIcons" },
  MAP_MARKER_PLUS: { name: "map-marker-plus-outline", type: "MaterialCommunityIcons" },
  MAP_START: { name: "play-circle-outline", type: "MaterialCommunityIcons" },
  MAP_STOP: { name: "stop-circle-outline", type: "MaterialCommunityIcons" },
  MAP_TRACKING: { name: "gps-not-fixed", type: "MaterialIcons" },
  MENU: { name: "menu", type: "MaterialIcons" },
  MESSAGE: { name: "message-text-outline", type: "MaterialCommunityIcons" },
  // MONEY: { name: "currency-usd-circle-outline", type: "MaterialCommunityIcons" }, //20250228  changed to use below instead ...this one icon doesn't show icon properly 
  MONEY: { name: "attach-money", type: "MaterialIcons" },
  NAV_BACK: { name: "navigate-before", type: "MaterialIcons" },
  NEW_FOLDER: { name: "create-new-folder", type: "MaterialIcons" }, //used for custom address
  OPEN: { name: "door-open", type: "MaterialCommunityIcons" }, //TODO
  PAYMENT: { name: "payment", type: "MaterialIcons" },
  PENCIL: { name: "pencil-outline", type: "MaterialCommunityIcons", color: GC_THEME_DARK },
  PERSON: { name: "person", type: "MaterialIcons" },
  PHONE: { name: "phone-square", type: "FontAwesome" },
  PHONE_OUTLINE: { name: "phone", type: "MaterialIcons" },
  PIN: { name: "pin-drop", type: "MaterialIcons" },
  PIN_ACTIVE: { name: "pin-drop", type: "MaterialIcons" },
  PIN_DONE: { name: "pin-drop", type: "MaterialIcons" },
  PRINT: { name: "print", type: "MaterialIcons" },
  PRIVACY: { name: "privacy-tip", type: "MaterialIcons" },
  QR: { name: "qrcode-scan", type: "MaterialCommunityIcons" },
  // QUESTION: { name: "question", type: "Octicons", color: GC_THEME_DARK }, //20250228 changed to type FontAwesome...Octicons type doesn't show icon properly 
  QUESTION: { name: "question-circle-o", type: "FontAwesome", color: GC_THEME_DARK },
  REDO: { name: "redo", type: "MaterialIcons" },
  // QUESTION: { name: "crosshairs-question", type: "MaterialCommunityIcons", color:'grey' },
  // QUESTION: { name: "head-question", type: "MaterialCommunityIcons" },
  RETAKE_PHOTO: { name: "redo-alt", type: "FontAwesome5" },
  ROUTE: { name: "waze", type: "MaterialCommunityIcons" },
  SAVE: { name: "save", type: "MaterialIcons" },
  SCREEN: { name: "fullscreen", type: "MaterialIcons" },
  // SCREEN_BOLD: { name: "square", type: "MaterialCommunityIcons", color:COLORS.GC_CHECKBOX_ON },
  SEARCH: { name: "search", type: "MaterialIcons" },
  SETTINGS: { name: "settings", type: "MaterialIcons" },
  SHARE: { name: "share", type: "MaterialIcons" },
  SHOP: { name: "local-laundry-service", type: "MaterialIcons" },
  SMS: { name: "sms", type: "MaterialIcons" },
  SORT: { name: "sort", type: "MaterialIcons" },
  STORE: { name: "local-laundry-service", type: "MaterialIcons", color: 'blue' }, //used in maps
  TAKE_PHOTO: { name: "circle-slice-8", type: "MaterialCommunityIcons" },
  TERMS_OF_USE: { name: "note-text", type: "MaterialCommunityIcons" },
  TEST: { name: "test-tube", type: "MaterialCommunityIcons" },
  THUMBS_UP: { name: "thumb-up-outline", type: "MaterialCommunityIcons" },
  TREE: { name: "tree", type: "Entypo" },
  TRUCK_PICK_UP: { name: "truck-delivery-outline", type: "MaterialCommunityIcons" },
  TWO: { name: "looks-two", type: "MaterialIcons" }, //used for alternate address
  UNLOCK: { name: "lock-open-outline", type: "MaterialCommunityIcons" },
  WASHER: { name: "local-laundry-service", type: "MaterialIcons" },
  WARNING: { name: "warning", type: "MaterialIcons", color: COLORS.GC_FORMINPUT_WARNING_TEXT },
  WHATSAPP: { name: "whatsapp", type: "MaterialCommunityIcons" }
}


//////////////////provided for convenience
// case OrderStatusEnum.initial:
// case OrderStatusEnum.cancelled:
// case OrderStatusEnum.readyForPickup:
// case OrderStatusEnum.assignedForPickup:
// case OrderStatusEnum.outForPickup:
// case OrderStatusEnum.pickedUp:
// case OrderStatusEnum.atShop:
// case OrderStatusEnum.inShop:
// case OrderStatusEnum.readyForDelivery:
// case OrderStatusEnum.assignedForDelivery:
// case OrderStatusEnum.outForDelivery:
// case OrderStatusEnum.delivered:
// case OrderStatusEnum.confirmed:
// case OrderStatusEnum.completed:
// case OrderStatusEnum.invalid:

export class OrderStatusEnum extends Enumify {
  static initial = new OrderStatusEnum();              //NOT USED any order in db is ready for pickup
  static cancelled = new OrderStatusEnum();            //order cancelled (usually before pickup)
  static readyForPickup = new OrderStatusEnum();       //customer has placed order
  static assignedForPickup = new OrderStatusEnum();    //order has been assigned to route for pickup
  static outForPickup = new OrderStatusEnum();         //driver is on the way for pickup  
  static pickedUp = new OrderStatusEnum();             //driver has tapped the pickup
  static missedPickup = new OrderStatusEnum();         //driver did not find package for pickup
  static atShop = new OrderStatusEnum();               //the driver has closed the route 
  static inShop = new OrderStatusEnum();               //the route has been accepted at the shop
  static readyForDelivery = new OrderStatusEnum();     //ready for delivery (and to be put in route)
  static assignedForDelivery = new OrderStatusEnum();  //assigned to a route for delivery
  static outForDelivery = new OrderStatusEnum();       //driver is on the way for delivery
  static delivered = new OrderStatusEnum();            //driver has tapped the delivery
  static missedDelivery = new OrderStatusEnum();       //driver unable to delivery the order
  static confirmed = new OrderStatusEnum();            //user has confirmed delivery
  static completed = new OrderStatusEnum();            //shop has closed the order (route closed)
  static invalid = new OrderStatusEnum();
  static _ = this.closeEnum(); // TypeScript: Color.closeEnum()
}

export class OrderActionEnum extends Enumify {
  static view = new OrderActionEnum();
  static approve = new OrderActionEnum();
  static addToRoute = new OrderActionEnum();
  static removeFromRoute = new OrderActionEnum();
  static accept = new OrderActionEnum();
  static cleaned = new OrderActionEnum();
  static noop = new OrderActionEnum();
  static invalid = new OrderActionEnum();
  static pickup = new OrderActionEnum();
  static failPickup = new OrderActionEnum();
  static undoPickup = new OrderActionEnum();
  static dropoff = new OrderActionEnum();
  static failDropoff = new OrderActionEnum();
  static undoDropoff = new OrderActionEnum();
  static details = new OrderActionEnum();
  static whatsapp = new OrderActionEnum();
  static notify = new OrderActionEnum();
  static soon = new OrderActionEnum(); //send notification driver is almost there
  static changeOrder = new OrderActionEnum(); //shop modifies the order
  static rescheduleBoth = new OrderActionEnum();
  static rescheduleDelivery = new OrderActionEnum();
  static addQrCode = new OrderActionEnum();
  static assignId = new OrderActionEnum();
  static print = new OrderActionEnum();
  /////////////////the following are special use cases that won't be included in most switches
  static paymentReminder = new OrderActionEnum();
  static cashPayment = new OrderActionEnum();
  /////////////////customer only 
  static cancel = new OrderActionEnum();
  static confirm = new OrderActionEnum(); //confirming delivery
  static pay = new OrderActionEnum();
  //////////////////driver only
  static dropoffWithCash = new OrderActionEnum();
  static pickupWithCash = new OrderActionEnum();
  static showExtMap = new OrderActionEnum(); // waze or google map
  static test = new OrderActionEnum();

  static _ = this.closeEnum();
}

//these keys correspond to the OrderActionEnum and map to a key in the ICONS_WITH_TEXT table
//TODO NOT USED
// export const OrderActionIconLookup = {
//   accept: "ACCEPT",
//   cancel: "CANCEL_GARBAGE",
//   cleaned: "CLEANED",
//   confirm: "CONFIRM_RECEIPT",
//   details: "DETAILS",
//   pay: "PAY",  //customer action
//   price: "PRICE", //shop action
//   whatsapp: "WHATSAPP", //whatsapp call about an order
// }

//Route Statuses
// pending ... route has been created but you can still add orders
// locked  ... no more orders can be added
// assigned... a locked routed has a specific driver assigned (NOT USED)
// open    ... route has been opened by a driver
// completedNeedsAction.. route has been closed by its assigned driver, some orders need pricing
// completed.. route has been closed by its assigned driver
// acceptedNeedsAction .. route has been accepted by shop, some orders need pricing
// accepted .. route has been accepted by shop
// done    ... route has been completed and accepted by the shop

export class RouteStatusEnum extends Enumify {
  // static getEnum(str) {
  //   if (str==null) return (RouteStatusEnum.invalid)
  //   else return (RouteStatusEnum.enumValueof(str))
  // }

  static pending = new RouteStatusEnum();
  static locked = new RouteStatusEnum();
  // static assigned = new RouteStatusEnum();
  static open = new RouteStatusEnum();
  static completedNeedsAction = new RouteStatusEnum();
  static completed = new RouteStatusEnum();
  static acceptedNeedsAction = new RouteStatusEnum();
  static accepted = new RouteStatusEnum();
  static done = new RouteStatusEnum();
  static invalid = new RouteStatusEnum();
  static _ = this.closeEnum(); // TypeScript: Color.closeEnum()
}

export class RouteActionEnum extends Enumify {
  static view = new RouteActionEnum();
  static continue = new RouteActionEnum();
  static addOrders = new RouteActionEnum();
  static lock = new RouteActionEnum();
  static unlock = new RouteActionEnum();
  // static assign = new RouteActionEnum(); //assign status not used
  // static unassign = new RouteActionEnum();
  static open = new RouteActionEnum();
  static releaseRoute = new RouteActionEnum();
  static truckAtShop = new RouteActionEnum();
  static complete = new RouteActionEnum();
  static accept = new RouteActionEnum();
  static close = new RouteActionEnum(); //THINK THIS IS NOT USED ANY MORE
  static noop = new RouteActionEnum();
  static test = new RouteActionEnum();
  static invalid = new RouteActionEnum();
  static _ = this.closeEnum();
}

//this table contains the enumKey (text) value for both Order and Action enums.
//it is used to get the key into the ICON_WITH_TEXT table
export const ActionIconLookup = {
  //order actions
  // static view = new OrderActionEnum();
  // static price = new OrderActionEnum();
  // static addToRoute = new OrderActionEnum();
  // static removeFromRoute = new OrderActionEnum();
  // static noop = new OrderActionEnum();
  // static details = new OrderActionEnum();
  // /////////////////the following are special use cases that won't be included in most switches
  // static paymentReminder = new OrderActionEnum();
  // static cashPayment = new OrderActionEnum();
  // /////////////////customer only 
  // //////////////////driver only
  // static showExtMap = new OrderActionEnum(); // waze or google map
  details: "DETAILS",
  accept: "ACCEPT",
  cleaned: "CLEANED",
  rescheduleBoth: "RESCHED", //both reschedules display the same 
  rescheduleDelivery: "RESCHED",
  assignId: "ASSIGN_ID",
  //order - customer only
  cancel: "CANCEL_GARBAGE",
  confirm: "CONFIRM_RECEIPT",
  pay: "PAY",
  whatsapp: "WHATSAPP",
  notify: "NOTIFY",
  soon: "ALERT_TIME",
  //order - driver only
  pickup: "PICKUP",
  failPickup: "FAIL_PICKUP",
  pickupWithCash: "PICKUP_WITH_CASH",
  undoPickup: "UNDO_PICKUP",
  dropoff: "DROPOFF",
  failDropoff: "FAIL_DROPOFF",
  dropoffWithCash: "DROPOFF_WITH_CASH",
  undoDropoff: "UNDO_DROPOFF",
  showExtMap: "NAVIGATE",
  addQrCode: "ADD_QR_CODE",
  //order - shop only
  changeOrder: "CHANGE_ORDER",
  approve: "APPROVE", //shop action
  print: "PRINT",

  //route -- shop
  lock: "LOCK",
  unlock: "UNLOCK",

  //route -- driver
  close: "CLOSE",
  releaseRoute: "RELEASE",
  truckAtShop: "AT_SHOP",
  open: "OPEN",
  //
  test: "TEST",
  invalid: "INVALID"
}

export const ActionConfirmI18nLookup = {
  "cancel": "cmnNEW.QueryCancel",
  "confirm": "cmnNEW.QueryConfirm",
  "pay": "cmnNEW.QueryPay"
}

//these keys correspond to the OrderActionEnum and map to a key in the ICONS_WITH_TEXT table
//TODO NOT USED
// export const RouteActionIconLookup = {
//   lock: "LOCK",
//   unlock: "UNLOCK",
// }

export class PaymentMethodEnum extends Enumify {
  static initial = new PaymentMethodEnum();
  static payLater = new PaymentMethodEnum();
  static payPickup = new PaymentMethodEnum();
  static payDelivery = new PaymentMethodEnum();
  static paidCash = new PaymentMethodEnum();
  static paidOnline = new PaymentMethodEnum();
  static paidPickup = new PaymentMethodEnum();
  static paidDelivery = new PaymentMethodEnum();
  static _ = this.closeEnum();
}

