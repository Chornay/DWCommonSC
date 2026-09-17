export class APP {
   static appType = 'drv';
   static appId = null;
   static shpRec = null;
   static drvRec = null;
   static cstRec = null;
   static comboShopRec = null;

   //called by driver or shop with their record
   //TODO check for error/null
   static setApp(type, rec) {
      appType = type
      switch (type) {
         case 'cst': appType = 'cst'; appId = rec.id; cstRec = rec;
            break;
         case 'drv': appType = 'drv'; appId = rec.id; drvRec = rec;
            break;
         case 'shp': appType = 'shp'; appId = rec.id; comboShopRec = rec; //TODO
            break;
         default: appType = null; appId = null;
            break
      }
   }

   //will only be called by drv (and cust?)
   static setShop(rec) { shpRec = rec }

   static setComboShop(rec) { comboShopRec = rec }

   //probably not necessary .. driver will be set by setApp call in drv
   static setDriver(rec) { drvRec = rec }

   static getAppType() { return appType }

   //getId returns the 'id' for the app .. it is driverId for drv and shopId for shp
   //this is necessary sometimes in 'cs' methods 
   static getId() { return appId }

   static getDriverId() { return drvRec.id }

   static getComboShopId() { return comboShopRec.id }
   static getComboShopName() { return comboShopRec.name }
   
   static getShopId() { return shpRec.id }
   static getShopName() { return shpRec.name }
   static getShopRec() { return shpRec }

}