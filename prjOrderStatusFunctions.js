import { OrderStatusEnum, OrderActionEnum } from 'DWcmn/Global'


// function template(order) {

//     switch (order.status) {

//          //not yet picked up
//          case OrderStatusEnum.readyForPickup:
//          case OrderStatusEnum.assignedForPickup:
//          case OrderStatusEnum.outForPickup:
//             break;

//          // picked up or in shop
//          case OrderStatusEnum.pickedUp:
//          case OrderStatusEnum.atShop:
//          case OrderStatusEnum.inShop:
//             break;


//          // pending delivery
//          case OrderStatusEnum.readyForDelivery:
//          case OrderStatusEnum.assignedForDelivery:
//          case OrderStatusEnum.outForDelivery:
//             break;

//          //delivered
//          case OrderStatusEnum.delivered:
//          case OrderStatusEnum.confirmed:
//          case OrderStatusEnum.completed:
//             break;

//          //cancelled
//          case OrderStatusEnum.cancelled:
//             return false;

//          case OrderStatusEnum.invalid:
//          default:
//             break;
//       }
//      }

//TODO add appType processing to generateRescheduleAction
//returns the available reschedule option or null
export function generateRescheduleAction(appType, order) {

    switch (appType) {
        case 'cst':
            switch (order.status) {
                //not yet picked up
                case OrderStatusEnum.readyForPickup:
                case OrderStatusEnum.missedPickup:
                case OrderStatusEnum.assignedForPickup:
                    return OrderActionEnum.rescheduleBoth;
                case OrderStatusEnum.outForPickup:
                // picked up or in shop
                case OrderStatusEnum.pickedUp:
                case OrderStatusEnum.atShop:
                case OrderStatusEnum.inShop:
                // pending delivery
                case OrderStatusEnum.readyForDelivery:
                case OrderStatusEnum.missedDelivery:
                case OrderStatusEnum.assignedForDelivery:
                    return OrderActionEnum.rescheduleDelivery;
                //vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv no reschedule past here
                case OrderStatusEnum.outForDelivery:
                //delivered
                case OrderStatusEnum.delivered:
                case OrderStatusEnum.confirmed:
                case OrderStatusEnum.completed:
                //cancelled
                case OrderStatusEnum.cancelled:
                case OrderStatusEnum.invalid:
                default:
                    return false;
            }
        case 'drv'://NOTE can reschedule even if in a route
        case 'shp':
            switch (order.status) {
                //not yet picked up
                case OrderStatusEnum.readyForPickup:
                case OrderStatusEnum.assignedForPickup:
                case OrderStatusEnum.outForPickup:
                case OrderStatusEnum.missedPickup:
                    return OrderActionEnum.rescheduleBoth;
                // picked up or in shop
                case OrderStatusEnum.pickedUp:
                case OrderStatusEnum.atShop:
                case OrderStatusEnum.inShop:
                // pending delivery
                case OrderStatusEnum.readyForDelivery:
                case OrderStatusEnum.assignedForDelivery:
                case OrderStatusEnum.outForDelivery:
                case OrderStatusEnum.missedDelivery:
                    return OrderActionEnum.rescheduleDelivery;
                //vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv no reschedule past here
                //delivered
                case OrderStatusEnum.delivered:
                case OrderStatusEnum.confirmed:
                case OrderStatusEnum.completed:
                //cancelled
                case OrderStatusEnum.cancelled:
                case OrderStatusEnum.invalid:
                default:
                    return false;
            }
        case 'shp':
        default:
            return false;
    }

}// end generateRescheduleAction


