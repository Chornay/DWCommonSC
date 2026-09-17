//TEST
// google login
// return login
// detail input

//TODO
// 0.A knowledge/test ios release.
// 1.C* put a border around GCStaticMap (doesn't seem to work on MapView)
// 2.D* get rid of black empty spot at top of CmnAddressSelect 
// 3.A CmnAddressSelect when we do not have any permission .... center Address box?
//    Enter any addreess and we will locate on the map .... CSTSigninQuestionScreen example
//    same address edit BUT Click to enter address
//      Text with placeholder .....
//    align space-around??
// 4. dialog in SelectionModal in CstStopSelectionTouchable (select pickup/delivery location)
// 5.A Heading on order tile (order number) should be centered
// 6. Signin ... should we be masking the display after google/fb etc login are done and while
//       we check to see if the user exists.
// 7.A how to do ... for address in shop/drv address field (experiment/document)
// 8. maybe do some checks before writing a user record or and order ... make sure nothing is missing?
// 9.C add the 'home' buttom to map (like driver map) to the CmnAddressOrStopInput (do icon only..click does console log)
//10.A fix the formatting on CstSignupShopSelect ... I tried to 'space-around' and couldn't get it to work
//    NOTE ... double the push shop to test the multi-shop case (remember 2+1 cases)
//   remove title
//11. can we make map timeout .... spinner say what it is doing
//12.I crashlytics firebase package to log errors
//13.Igc android/ios how to force update based on version number / release number
//14.Agcsc ipay88
//15.I am wondering why the image seems to behave differently in CdsSigninLogo and CdsSigninEmail.
//   On Logo the image always seems fine (stretch, contain, cover) but in Email it is always messed up
//   (in different ways). Try swapping the images and see if it is the code or the image that is different?
//16. We could look at the following for dimensions:
//https://github.com/react-native-toolkit/react-native-responsive-dimensions
//17. keep in portrait mode

//CHANGES
//1128 Modals change from PrjTextBold ... reactnative Text size 20 bold
//                       to GCText large bold =24?


//BUGS?
//some missing code for stop ... shows up on screen during order create and prevents write to db
//when you cancel user registration at final stage it goes back to enter address?
//Clicking the remarks pencil in checkoutsummary

//Some DW notes

//StatusBar ---- how to properly handle the colouring of the 'top' area of the screen
//We style the status bar using CmnStatusBar.
//To make sure that your screen is okay.
//  1. use a Screen component (cds,cst,drv,shp) which renders CmnStatusBar
//  2. PrjHeader (or clones) also render CmnStatusBar
//       NOTE PrjHeader renders the status bar because Native Base Header renders a StatusBar
//            using default values
//  3. render a CmnStatusBar anywhere in your screen JSX (but really why not at the top?)
//
//COPYING A STOP .. problem because we have location object inside
//this.details.homeStop={...stop, location:{...stop.location}}
//
//Limiting size of text
//  <Text ellipsizeMode='tail' numberOfLines={2} style={{width:100}}>
//    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at cursus 
//  </Text>
//  NOTE that mode can be tail,middle or head ... but only tail makes sense?



