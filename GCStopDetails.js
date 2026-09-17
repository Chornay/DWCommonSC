import React, { Component } from 'react'
import { strX } from 'DWcmn/I18n';
import { GCI18n, GCText } from 'DWcmn/Gc'
import { prjRouteName } from 'DWcmn/PrjCmnFunctions'
import { COLORS } from 'DWcmn/Global'
import { prjStopLobbyFlagReadable } from './prjStopFunctions';

//20240906 changed to implement building service

//A stop has a 'code' which is either home, alternate or building BUT
//the building code can be building-unit or building-lobby


//prop stop
//prop routeTime (optional)
//prop routeDescrip
//renders time, brief address and instructions, null if no stop specified
export class GCStopDetails extends Component {

   render() {

      if (!this.props.stop) return null

      const stop = this.props.stop
      let returnArray = []

      //for a building-service we return:
      //  the time (from route), lobby/unit flag and optional instructions
      //for regular service we return:
      //  the time (from route), brief address and optional instructions
      //  where brief address is @home or @alternate or full address for Custom stop

      //GCText of the route name (if specified)
      if (this.props.routeTime) {
         returnArray.push(<GCText style={{ alignSelf: 'flex-start' }} key='1'>{prjRouteName(this.props.routeTime, this.props.routeDescrip)}</GCText>)
      }

      returnArray.push(<GCText style={{ alignSelf: 'flex-start' }} key='2'>{gcStopAddressBrief(stop)}</GCText>)

      //driver instructions (if specified)
      if (stop.instruction) {
         returnArray.push(<GCText style={{ alignSelf: 'flex-start' }} key='3' color={COLORS.GC_INSTRUCTIONS_HI}>{stop.instruction} </GCText>)
      }
      return (returnArray)

   }
}//end GCStopDetails

//prop stop
//renders address and instructions, null if no stop specified
export class GCStopDetailsForProfile extends Component {

   render() {

      if (!this.props.stop) return null

      const stop = this.props.stop
      let returnArray = []
      let addressString = ""

      //for a building-service we return:
      //  the unit, lobby/unit flag and optional instructions
      //for regular service we return:
      //  address and optional instructions

      returnArray.push(<GCText style={{ alignSelf: 'flex-start' }} key='1'>{gcAddressWithUnit(stop.address, stop.unit)}</GCText>)
      if (stop.code == "building") {
         returnArray.push(<GCText style={{ alignSelf: 'flex-start' }} key='2'>Pickup in lobby/unit</GCText>)
      }

      //driver instructions (if specified)
      if (stop.instruction) {
         returnArray.push(<GCText style={{ alignSelf: 'flex-start' }} key='3' color={COLORS.GC_INSTRUCTIONS_HI}>{stop.instruction} </GCText>)
      }
      return (returnArray)

   }
}//end GCStopDetailsForProfile

//returns a string containing the address from a stop. Unit number is added if present
export function gcAddressWithUnit(address, unit) {

   let addressString = ""

   if (unit) { addressString = strX('cmnNEW.Unit_') + unit + '\n' }
   addressString += address
   return (addressString)
}

//returns a string containing the briefest address for a stop
//ie we use @Home or @Alternate if they are used ow the full address
//
export function gcStopAddressBrief(stop) {

   let addressString = ""
   switch (stop.code) {
      case null: return ('')
      case 'building': return (prjStopLobbyFlagReadable(stop))
      case 'home': return strX('cmnNEW.@Home')
      case 'alternate': strX('cmnNEW.@Alternate')
      case 'custom': return gcAddressWithUnit(stop.address, stop.unit)
      default: return ('ERROR ADDRESS')
   }


}

