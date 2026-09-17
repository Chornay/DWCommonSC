import cloneDeep from 'lodash/cloneDeep'
import { strX } from 'DWcmn/I18n';
//20250630 started used a flag for lobby instead of buildingunit/buildinglobby


//initialize a stop from a shop which is a building service
export function prjStopInitHomeStopFromBuildingService(stop, shop) {

   prjStopInitialize(stop)

   stop.code = 'building'
   stop.address = shop.address
   stop.buildingName = shop.buildingName
   stop.location = {}
   stop.location.latitude = shop?.location?.latitude
   stop.location.longitude = shop?.location?.longitude
}


//initialize a home stop with an address and location
export function prjStopInitHomeStopWithAddressLoc(stop, address, location) {

   prjStopInitialize(stop)

   stop.code = 'home'
   stop.address = address
   stop.location = {}
   stop.location.latitude = location?.latitude
   stop.location.longitude = location?.longitude
}



//updates the stop (better be an alternate) to be missing
//all that really matters is that code is null
export function prjStopInitialize(stop) {
   stop.code = null;
   stop.address = null;
   stop.buildingName = null;
   stop.location = {};
   stop.unit = null;
   stop.instruction = null;
   //TODO add fields
}

//creates an 'empty' alternate stop for the user to edit
//all that really matters is that code is null
export function prjStopAltInit(altStop) {
   prjStopInitialize(altStop)
   altStop.code = 'alternate'
}

//updates the stop (better be an alternate) to be missing
//all that really matters is that code is null
export function prjStopAltRemove(altStop) {
   prjStopInitialize(altStop)
}

//20250219 changed behaviour when input stop is null
//returns a new copy of a stop (not a pointer)
export function prjStopCopy(stop) {
   if (!stop) { return ({ code: null }) }
   return cloneDeep(stop)
}

//update an entire stop from 'replacement' into 'existing'
//NOTE we gave up on how to deal with ... etc. this is guaranteed immutable
export function prjStopUpdate(existing, replacement) {
   existing.code = replacement.code
   existing.address = replacement.address
   existing.buildingName = replacement.buildingName
   existing.location = {}
   existing.location.latitude = replacement?.location?.latitude
   existing.location.longitude = replacement?.location?.longitude
   existing.unit = replacement.unit
   existing.instruction = replacement.instruction
   existing.allowUnattended = replacement.allowUnattended
   existing.lobbyFlag = replacement.lobbyFlag
}

//TODOLOBBY just return code??
export function prjStopType(stop) {
   return stop.code
}

export function prjStopLobbyFlagReadable(stop) {
   return stop.lobbyFlag ? strX('cmnNEW.InLobby') : strX('cmnNEW.AtUnitNumber', { unit: stop.unit })
}
