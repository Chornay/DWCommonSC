import { OrderStatusEnum } from "./Global";

//filter and sort the orders array and return
export function cmnFilterAndSortOrders(filterMode, sortMode, orders) {
    let data = null;

    //if necessary then filter the orders
    data = cmnFilterOrders(filterMode, orders)
    cmnSortOrders(sortMode, data)
    return (data)

    //following is the way we used to do this when it was in the component .. we were trying to avoid
    //filtering data when it wasn't necessary. 
    // let data = null;

    //     //if necessary then filter the orders
    //     if (newFilterMode != this.state.filterOrdersSetting) {
    //         data = cmnFilterOrders(newFilterMode, this.state.orders)
    //     }
    //     else { //filter didn't change
    //         data = this.state.filteredOrders;
    //     }

    //     //at this point data contains the orders that we want so sort them
    //     cmnSortOrders(newSortMode, data)
    //     this.setState({ filteredOrders: data });
}// end cmnFilterAndSortOrders

export function cmnFilterOrders(newFilterMode, orders) {
    let localArray = [];
    switch (newFilterMode) {
        case 'all':
            orders.forEach((item) => { localArray.push(item) }) //end forEach
            break;
        case 'pickup':
            orders.forEach((item) => {
                switch (item.status) {
                    case OrderStatusEnum.readyForPickup:
                    case OrderStatusEnum.assignedForPickup:
                    case OrderStatusEnum.outForPickup:
                    case OrderStatusEnum.pickedUp:
                    case OrderStatusEnum.missedPickup:
                        localArray.push(item)
                }
            }) //end forEach
            break;
        case 'delivery':
            orders.forEach((item) => {
                switch (item.status) {
                    case OrderStatusEnum.readyForDelivery:
                    case OrderStatusEnum.assignedForDelivery:
                    case OrderStatusEnum.outForDelivery:
                    case OrderStatusEnum.delivered:
                    case OrderStatusEnum.missedDelivery:
                        localArray.push(item)
                }
            }) //end forEach
            break;
    } // end switch

    return localArray;
} //end cmnFilterOrders

export function cmnSortOrders(newSortMode, orders) {
    switch (newSortMode) {
        case 'name':
            orders.sort((a, b) => a.name.localeCompare(b.name))
            break;
        case 'order':
            // locationArray.sort((a,b)=>a.ptr.id.localeCompare(b.ptr.id))
            orders.sort((a, b) => a.id - b.id);
            break;
        case 'distance':
            orders.sort((a, b) => a.distance - b.distance);
            break;
    } // end switch
} //end cmnSortOrders

