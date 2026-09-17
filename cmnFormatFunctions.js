import { strX } from 'DWcmn/I18n.js'

//TODO localize price formatting ... currently RM
export function cmnFormatAPrice(amt) {
  if (amt!=null) return ('RM ' + amt.toFixed(2)) //handles null and undefined
    else return ('?.??')
}

//TODO localize weight formatting ... currently kg
export function cmnFormatAWeight(amt) {
  if (amt!=null) return (amt.toFixed(1) + ' kg')
    else return('??? kg')
}

//short unit priced is provided for use in tiles ... doesn't say each or /kg
export function cmnFormatShortUnitPrice(type, amt) {
  switch (type) {
    case 'kg':
    case 'pc':
      if (amt!=null) return (cmnFormatAPrice(amt))
        else return ('???')
      break;

    case 'spc':
      return (strX('cmn.CustomPriceAtShop'))
      break;

    default:
      return ('???')

  }
}
