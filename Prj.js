import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { Fab } from 'native-base'
import { Text } from 'react-native'
import GLOBALS from 'DWcmn/Global';
import { COLORS, ICONS } from 'DWcmn/Global'
import { strX } from 'DWcmn/I18n';
import { OrderStatusEnum } from 'DWcmn/Global';
import { PrjIcon } from 'DWcmn/PrjIconComponents'

const { width: SCREEN_WIDTH } = Dimensions.get('window') || {};
const { height: SCREEN_HEIGHT } = Dimensions.get('window') || {};

//20221222 TouchableAuthI18n removed


//prop text (this is text as entered by customer)
//prop placeholderI18n
//prop style
//TODO right now we expect that the field is always editable. that may change and we will have to 
//     use a disabled property
export class PrjTextWithPlaceholder extends Component {
  render() {

    if (this.props.text) {
      return (<Text style={this.props.style} {...this.props}>
        <PrjIcon id='PENCIL' />{this.props.text}</Text>)
    } else {
      return (<Text style={[{ fontStyle: 'italic' }, this.props.style]} {...this.props} ><PrjIcon id='PENCIL' />{strX(this.props.placeholderI18n)}</Text>)
    }
  }
}//end PrjTextWithPlaceholder


// //prop text
// //prop style
// //prop onPress()
// export class PrjButtonNOTUSED extends Component {
//   render() {
//     return (
//       <Button
//         style={[styles.button, this.props.style]}
//         onPress={this.props.onPress}>
//         <Text style={styles.btnText}>{this.props.text}</Text>
//       </Button>
//     )
//   }
// }
//prop text OR
//prop i18n
//prop style
//prop width (optional)
//prop disabled button
//prop onPress()
//NOTE to specify a width use width parameter .. if you try to use the style it will be
//     be overridden as 'auto'
//NOT USED
// export class GcPrjButton extends Component {
//   render() {
//     const ourText = this.props.i18n ? strX(this.props.i18n) : this.props.text
//     let width = this.props.width ? this.props.width : 'auto'
//     return (
//       <Button
//         style={[styles.gcbutton, this.props.style, { width: width }]}
//         onPress={this.props.onPress}
//         disabled={this.props.disabled}>
//         <Text style={styles.gcBtnText}>{ourText}</Text>
//       </Button>
//     )
//   }
// }

//20221124 PrjButtonWithConfirm moved to its own file

//20221124 PrjBusyMask moved to its own file

//20221124 PrjButtonSigninWithEmail replaced with CmnSignInEMailButton

//20221218 removed PrjHeader, PrjHeaderRight, PrjHeaderBody, PrjHeaderLeft
//20221218 removed PrjListContainer (had no styling or effect)
//20221222 removed PrjListItem (not used)
//20250526 removed PrjTile (not used)


export class PrjListText extends Component {
  render() {
    return (
      <View>
        <Text style={[styles.listText, this.props.style]}>{this.props.children}</Text>
      </View>
    )
  }
} //end PrjListText

export class PrjListTextHdr extends Component {
  render() {
    return (
      <View>
        <Text style={[styles.listTextHdr, this.props.style]}>{this.props.children}</Text>
      </View>
    )
  }
} //end PrjListTextHdr

export class PrjListTextBold extends Component {
  render() {
    return (
      <View>
        <Text style={[styles.listTextBold, this.props.style]}>{this.props.children}</Text>
      </View>
    )
  }
} //end PrjListTextBold

export class PrjText extends Component {
  render() {
    return (
      <Text style={[styles.prjText, this.props.style]}>{this.props.children}</Text>
    )
  }
} //end PrjText

//prop id .. the id used to look up icon in PrjIcon
//prop color .. optional, gets passed to PrjIcon
//prop disabled
//prop style
//prop onPress()
//TODO do we really need style here ... we put in icon instead
export class PrjIconButton extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => { this.props.onPress() }}
        disabled={this.props.disabled}
      >
        <PrjIcon style={this.props.style} id={this.props.id} color={this.props.color}
        />
      </TouchableOpacity>
    )
  }
}

//prop onPress()
export class PrjFabMapShowAll extends Component {
  render() {
    return (
      <Fab
        active={true}
        containerStyle={{}}
        style={[styles.fabButtonShape, { backgroundColor: COLORS.GC_MAP_FAB_SHOWALL }]}
        position="topRight"
        onPress={this.props.onPress}
      >
        <PrjIcon id="MAP_SHOW_ALL" />
      </Fab>

    )
  }
}

//prop position (default topRight) //NOTE bottom does not work in CmnAddressOrStopInput
//prop color (default COLORS.GC_MAP_FAB_SHOWALL)
//prop onPress()
export class PrjFabMapCurrPos extends Component {
  render() {
    return (
      <Fab
        active={true}
        containerStyle={{}}
        style={[styles.fabButtonShape, { backgroundColor: this.props.color || COLORS.GC_MAP_FAB_SHOWALL }]}
        position={this.props.position || "topRight"}
        onPress={this.props.onPress}
      >
        <PrjIcon id="MAP_SHOW_ALL" />
      </Fab>

    )
  }
}

//prop size the height of the spacer
export class PrjSpacer extends Component {
  render() {
    return (<View style={{ height: (this.props.size) }} />)
  }
}// end PrjSpacer

<View style={{ height: 10 }} />


//prop order status
//prop selected (optional)
//TODOMISSED
export class PrjMapIcon extends Component {
  render() {
    if (this.props.selected) {
      return (<PrjIcon id={"PIN_ACTIVE"} color={GLOBALS.COLOR.STATUS_SELECTED} />);
    }

    switch (this.props.status) {
      case OrderStatusEnum.initial:
      case OrderStatusEnum.cancelled:
        return null
      case OrderStatusEnum.readyForPickup:
      case OrderStatusEnum.assignedForPickup:
      case OrderStatusEnum.outForPickup:
        return (<PrjIcon id={"PIN_ACTIVE"} color={GLOBALS.COLOR.STATUS_PICKING_UP} />);
        case OrderStatusEnum.pickedUp:
          case OrderStatusEnum.missedPickup:
            return (<PrjIcon id={"PIN_DONE"} color={GLOBALS.COLOR.STATUS_PICKED_UP} />);
      case OrderStatusEnum.atShop:
      case OrderStatusEnum.inShop:
        return null
      case OrderStatusEnum.readyForDelivery:
      case OrderStatusEnum.assignedForDelivery:
      case OrderStatusEnum.outForDelivery:
        case OrderStatusEnum.missedDelivery:
          return (<PrjIcon id={"PIN_ACTIVE"} color={GLOBALS.COLOR.STATUS_DELIVERING} />);
      case OrderStatusEnum.delivered:
      case OrderStatusEnum.confirmed:
      case OrderStatusEnum.completed:
        return (<PrjIcon id={"PIN_DONE"} color={GLOBALS.COLOR.STATUS_DELIVERED} />);
      default:
        return null
    }

  } //end render
} //end PrjMapIcon

//PrjFilterSetting .. we out text with the appropriate colour to indicate filter setting
//prop mode .. the filter mode all/pickup/delivery
export class PrjFilterSetting extends Component {
  render() {
    let mode = this.props.mode
    let bkColor
    switch (this.props.mode) {
      case 'pickup': bkColor = GLOBALS.COLOR.STATUS_PICKING_UP; break;
      case 'delivery': bkColor = GLOBALS.COLOR.STATUS_DELIVERING; break;
      case 'all': bkColor = GLOBALS.COLOR.STATUS_ALL_ORDERS; break;
      default: bkColor = GLOBALS.COLOR.STATUS_ALL_ORDERS; break; //certainly don't expect this.
    }
    return (<PrjListText style={{ backgroundColor: bkColor }}>{strX('cmn.' + mode)}</PrjListText>)
  } //end render
} //end PrjFilterSetting

export class PrjSortOrdersSetting extends Component {
  render() {
    let mode = this.props.mode
    return (<PrjListText>{strX('cmn.' + mode)}</PrjListText>)
  } //end render
} //end PrjSortOrdersSetting



const styles = StyleSheet.create({

  btnText: {
    fontSize: 10,
    alignSelf: 'center',
    color: GLOBALS.COLOR.BTN_TEXT
  },
  gcBtnText: {
    color: GLOBALS.COLOR.BTN_TEXT,
    fontWeight: 'bold',
    fontSize: 10,
    alignSelf: 'center',
  },
  button: {
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 16,
    width: 'auto',
    height: 'auto',
    borderColor: GLOBALS.COLOR.BTN_BORDER,
    marginVertical: 5,
    backgroundColor: GLOBALS.COLOR.BTN_BK,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: .8,
    elevation: 5,
    shadowRadius: .25,
    // shadowOffset: { width: 1, height: 13 }
  },

  fabButtonShape: {
    width: 40,
    height: 40,
    borderRadius: 400 / 2
  },

  prjText: {
    color: GLOBALS.COLOR.TEXT,
    fontWeight: 'bold',
    fontSize: Platform.OS === 'ios' ? 13 : 14,
  },

  listText: {
    fontSize: Platform.OS === 'ios' ? 13 : 14,
    color: GLOBALS.COLOR.LIST_ENTRY_TEXT,
  },

  listTextBold: { //everything in listText + bold
    fontSize: Platform.OS === 'ios' ? 13 : 14,
    fontWeight: 'bold',
    color: GLOBALS.COLOR.LIST_ENTRY_TEXT,
  },

  listTextHdr: {
    fontSize: Platform.OS === 'ios' ? 13 : 14,
    fontWeight: 'bold',
    color: GLOBALS.COLOR.LIST_ENTRY_TEXT,
  },

  listTextBoldPlatform: { //everything in listText + bold
    fontSize: Platform.OS === 'ios' ? 13 : 14,
    fontWeight: 'bold',
    color: GLOBALS.COLOR.LIST_ENTRY_TEXT,
  },

  textPlatform: {
    color: GLOBALS.COLOR.TEXT,
    fontWeight: 'bold',
    fontSize: Platform.OS === 'ios' ? 13 : 14,
  },

  text: {
    fontSize: 20,
    color: GLOBALS.COLOR.TEXT,
  },

  textButtonStyle: {
    backgroundColor: '#b3b3b3', //test for now
    textAlign: 'center',
    width: 'auto',
    height: 'auto',
    fontSize: 11,
    fontWeight: 'bold',
  },

  tile: {
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 'auto',
    paddingVertical: 10,
    borderRadius: 6,
    marginLeft: 0,
    marginBottom: 10,
    // TODO light grey for tile border... move this color to gobal later
    borderColor: COLORS.GC_TILE_BORDER,
    borderWidth: 2,
    // TODO white color ish... for tile background... move this color to gobal later
    backgroundColor: COLORS.GC_TILE_BK,
    borderBottomWidth: 2, // not sure why only  borderWidth doesn't show border bottoom width
  },

  // tileOld: { //20240926 delete shadow style to have border the same as address box
  //   justifyContent: 'center',
  //   marginTop: 5,
  //   marginBottom: 10,
  //   marginLeft: 0,
  //   marginRight: 0,
  //   paddingLeft: 10,
  //   paddingRight: 20,
  //   paddingTop: 12,
  //   paddingBottom: 12,
  //   borderColor: COLORS.GC_TILE_BORDER,
  //   backgroundColor: COLORS.GC_TILE_BK,
  //   shadowColor: 'rgba(0, 0, 0, 0.1)',
  //   shadowOpacity: .8,
  //   elevation: 5,
  //   shadowRadius: 1,
  //   borderStyle: 'solid',
  //   borderBottomWidth: 0,
  //   borderTopWidth: 0,
  //   borderLeftWidth: 0,
  //   borderRightWidth: 0,
  //   borderRadius: 15,
  //   borderWidth: 1,
  // },
})

export const prjTabStyles = StyleSheet.create({
  tabStyle: { backgroundColor: GLOBALS.COLOR.TAB_BK }, //old style 
  textStyle: { color: GLOBALS.COLOR.TAB_TEXT, fontWeight: 'bold', fontSize: 14 }, //inactive tab 
  activeTabStyle: { backgroundColor: GLOBALS.COLOR.TAB_BK }, //active tab
  activeTextStyle: { color: GLOBALS.COLOR.TAB_ACT_TEXT, fontWeight: 'bold', fontSize: 14 } //active tab text style
})

export const prjTabBarStyles = {
  tabBarUnderlineStyle: { backgroundColor: GLOBALS.COLOR.TAB_UNDERLINE }, // Tabs
  tabContainerStyle: { elevation: 0 }, // Getting rid of upper and underline line of Tabs
}
