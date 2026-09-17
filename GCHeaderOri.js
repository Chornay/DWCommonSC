import React, { Component } from 'react'
import { StyleSheet, Dimensions, Image, View } from 'react-native'
import { Body, Left, Right, Header } from 'native-base'
import { withNavigation } from 'react-navigation';
import { PRJ_STYLES } from './PrjStyles'
import { PrjIconButton } from './Prj';
import { PrjButtonWithConfirm } from 'DWcmn/PrjButtonWithConfirm'
import { GCText, GCI18n } from 'DWcmn/Gc'
import { COLORS, GC_STD_MARGIN } from 'DWcmn/Global'

//20230501 changed to have header be coloured and go to edge of screen
//         NOTE we had to flex-end < icon to make it more reachable (and flex-start for burger)
//20230501 added height :-GC_STD_MARGIN below header
//20250209 simplified cancel processing to always do a verified popToTop

const { width: SCREEN_WIDTH } = Dimensions.get('window') || {};
const { height: SCREEN_HEIGHT } = Dimensions.get('window') || {};



//GCHeader is a header with limited styling abilities
//designed for Cust (back) and Cust order creation (cancel) but also 
//  used by D&S
//It gives a title centered in the middle
//BIG NOTE .. it will also render children ... not sure if we have used that capability
//back() property gives a back arrow on the left
//       back gives goBack ... back() calls that function
//cancel property gives an X on the right
//       if confirmed then user will popToTop ... cancelling order
//OR
//optionsBurger() property gives a options burger on the right
//cancelConfirmI18n .. for the cancel confirmation .. used for rescheduling dialog
//prop titleI18n
//prop titleText   .... please use just one of titleI18n and titleText
//prop style (for the Body of the Header)
//prop titleStyle (for the Title in the Header)
//prop large to make a bigger title
//prop transparent
//prop iconColor
//prop noBottomPadding .. do not put the blank padding after the header
class GCHeader extends Component {
  render() {
    const bkg = this.props.transparent ? 'transparent' : COLORS.GC_HEADER_BKG
    const headerTextStyle = this.props.large ? PRJ_STYLES.headerTextLarge : PRJ_STYLES.headerText
    const iconColor = this.props.iconColor || COLORS.GC_HEADER_ICON

    return (
      <View >
      <Header style={[styles.header, {backgroundColor:bkg}, this.props.style]} >
        <Left style={{ flex: .1, alignItems: 'flex-end' }}>
          {this.props.back && <PrjIconButton id='ARROW_BACK_HEADER'
            style={[PRJ_STYLES.headerIcon, {color:iconColor}, this.props.iconStyle ]}
            onPress={() => {
              if (typeof this.props.back === 'function') { this.props.back() }
              else { this.props.navigation.goBack() }
            }} />}

        </Left>
        <Body style={[
          { flex: .8, justifyContent: 'center', alignItems: 'center' },
          this.props.style]}>
          {(this.props.titleI18n) &&
            <GCI18n style={[headerTextStyle, this.props.titleStyle]} code={this.props.titleI18n} />
          }
          {(this.props.titleText) &&
            <GCText style={[headerTextStyle, this.props.titleStyle]}>{this.props.titleText}</GCText>
          }
          {(this.props.image) &&
            <Image
              style={{
                flex: 1, justifyContent: 'center', alignSelf: 'center', resizeMode: 'contain',
                width: SCREEN_WIDTH * .6 //CAUSE THEY INSISTED!!
              }}
              source={this.props.image} />
          }
          {this.props.children}
        </Body>
        <Right style={{ flex: .1, alignItems: 'flex-start' }}>
          {this.props.cancel && <PrjButtonWithConfirm
            icon="CANCEL_HEADER"
            buttonStyle={[PRJ_STYLES.headerIcon, this.props.iconStyle ]}
            confirmI18n={this.props.cancelConfirmI18n||"cstNEW.DiscardOrder"}
            onConfirm={() => {
              this.props.navigation.popToTop()
            }}
          />}
          {this.props.optionsBurger && <PrjIconButton id='BURGER'
            style={[PRJ_STYLES.headerIcon, {color:iconColor}, this.props.iconStyle ]}
            onPress={() => { this.props.optionsBurger() }}
          />}

        </Right>
      </Header>
      {(!this.props.noBottomPadding)&&<View style={{height:20}}/>}

      </View>    )
  }
}


const styles = StyleSheet.create({
  header: {
    paddingLeft: 0, //native base Header seems to have paddingLeft of 5ish
    borderBottomWidth: 0, //to 'remove' bottom line on ios
    elevation: 0,         //..............................
    shadowOpacity: 0, //......................
  },

})

export default withNavigation(GCHeader)
