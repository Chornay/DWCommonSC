
//FIX whole file is not used
//function checks for a pricelist in AsyncStorage and if it is not there or is out of date
//reads it from the database
//if unsuccessful it returns an empty pricelist (or null)
//TODO implement version checks and db reads and decide what to return if error
//TODO think have to catch JSON.parse
// async function getData() {
//     return await AsyncStorage.getItem('DWpricelist')   
// }
export function getRefreshedPriceList_NOT_USED() {
    // let jsonPriceList
    // let priceList
    // //find out what is in phone storage
    // foo = (async () => {
    //     jsonPriceList = await getData()
    //     //use the phone version or load from db
    //     if (jsonPriceList) {
    //         priceList = JSON.parse(jsonPriceList)
    //     }
    //     else {
    //         priceList = dwdbGetPriceList()
    //     }
    //     if (!priceList) {
    //         priceList = { categories: [] }
    //     }
    //     // console.warn(priceList)
    //     return priceList
    // })()
    getData().then( (jsonPriceList) => {
        if (jsonPriceList) {
            priceList = JSON.parse(jsonPriceList)
        }
        else {
            priceList = dwdbGetPriceList() //realm module gone 20210302
        }
        if (!priceList) {
            priceList = { top:{entries: [] }} //FIX maybe top can just be null?
        }
        // console.warn(priceList)
        return priceList

    }

    )



    //  priceList.categories.forEach((category) => {
    //     category.expanded = false;
    //     category.count = 0;
  
    //     category.entries.forEach((lineItem) => {
    //       lineItem.count = 0;
    //       lineItem.included = false;
    //       lineItem.netPrice = 0.0;
    //     });
    //   });

      return { entries: [] } 

}

export function getRefreshedPriceListxx() {

        let priceList = getPriceListFromStorage()
     
        //if we didn't get the pricelist locally then get it from DB
    console.warn(priceList)
    if (!priceList){
        priceList = { entries: [] }
        // priceList = dwdbGetPriceList()
    }
 

      priceList.entries.forEach((category) => {
        category.expanded = false;
        category.count = 0;
  
        category.entries.forEach((lineItem) => {
          lineItem.count = 0;
          lineItem.included = false;
          lineItem.netPrice = 0.0;
        });
      });

    // try {
    //   const jsonPriceList = await AsyncStorage.getItem('DWpricelist')
    //   if (jsonPriceList == null) {
    //     priceList = { categories: [] }
    //   }
    //   else {
    //     priceList = JSON.parse(jsonPriceList)
    //   }
      //TODO check if pricelist is there and check version
    // } catch (e) { console.warn(e.message) }
  
    return  priceList
  }//end dwdbGetPriceList

  function persistOrder() {
    // try {
    //     await AsyncStorage.setItem(
    //       '@MySuperStore:key',
    //       'I like to save it.'
    //     );
    //   } catch (error) {
    //     // Error saving data
    //   }
    }