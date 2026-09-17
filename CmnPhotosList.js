import React, { Component } from 'react'
import { SpinnerXYZ } from 'DWcmn/GCNB';
import { StyleSheet, View, FlatList, Image } from 'react-native'
import { PrjSpacer } from 'DWcmn/Prj'
import storage from '@react-native-firebase/storage';
import { GCFooterCmdIcon } from 'DWcmn/GCFooterForIcons'
import { GCText } from 'DWcmn/Gc'
import { withNavigation } from 'react-navigation';
import { dwdbfsOrderUpdateFields } from 'DWcmn/dwdbfsOrder'
import { cmnAlertPopup } from './cmnAnnunciationFunctions';
import { COLORS, GC_STD_MARGIN } from 'DWcmn/Global'
import { prjPriceListItemName } from 'DWcmn/PrjCmnFunctions'


//20230523 removed a class called CmnNotesListReal
//20230523 modified CmnNotesList to display images
//20241120 button to remove picture now says REMOVE not CANCEL
//20250302 added cmnAlertPop
//20250816 display any images from the order items


//NOTE retake photo is commented out .. we could not get the picture to update after we navigated
//  to CstCamera (we try forceUpdate on gotFocus)

//prop order
export class CmnPhotosList extends Component {

   constructor(props) {
      super(props);

      this.order = this.props.order

      let imgArray = []

      if (this.order.imageForPickup) {
         imgArray.push({ tag: "Pickup", path: this.order.imageForPickup, url: null, isLoaded: false })
      }
      for (const item of this.order.items) {
         if (item.imagePath) {
            imgArray.push({
               tag: "tag",
               remarks: item.remarks,
               path: item.imagePath,
               url: null,
               isLoaded: false,
               name: this.prjOrderItemString(item)
            })
         }
      }

      this.state = {
         imageUrl: null, //beware ... Image does NOT like the blank string
         isComponentInitialized: false,
         images: imgArray
      };

   } //end constructor 

   prjOrderItemString(item) {

      let displayNameStr = ''
      let longNameStr = prjPriceListItemName(item, true)

      switch (item.unitType) {
         case 'adj':
            displayNameStr = `${longNameStr} - ${item.inputText}`
            break;
         case 'EZnote':
            displayNameStr = `${item.longName[0]} - ${item.inputText}`
            break;
         case 'shopNote':
            displayNameStr = `${item.longName[0]} - ${item.inputText}`
            break;
         case 'choice':
            displayNameStr = `${longNameStr} - ${item.choiceText}`
         case 'yesNo':
            displayNameStr = longNameStr
            break;
         default:
            displayNameStr = longNameStr
            break;
      }
      return displayNameStr

   } //end 

   async componentDidMount() {
      //NOTE that we do NOT wait for these to complete. The requests are in parallel.
      //We will display images when they return
      this.state.images.forEach((img, index) => {
         this.loadImage(index, img.path);
      });
      this.setState({ isComponentInitialized: true });
   }

   //update our images state variable array with the single image we just received 
   async loadImage(index, path) {
      try {
         const url = await storage().ref(path).getDownloadURL();
         this.setState((prevState) => {
            const modImages = [...prevState.images];
            modImages[index] = { ...modImages[index], url: url, isLoaded: true };
            return { images: modImages };
         });
      } catch (err) {
         console.warn(`Failed to load image at ${path}`, err);
      }
   }

   render() {
      if (!this.state.isComponentInitialized) {
         return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
               <SpinnerXYZ />
            </View>
         )
      }
      return (
         <FlatList
            data={this.state.images}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
               if (item.isLoaded) {
                  return (
                     <View style={styles.container}>
                        <PrjSpacer size={10} />
                        <Image
                           source={{ uri: item.url }}
                           style={styles.image}
                        />
                        <PrjSpacer size={10} />
                        <GCText bold>{item.tag.toUpperCase()}</GCText>
                        <PrjSpacer size={10} />
                        {/* TODO dummy item for now */}
                        <GCText>{item.name}</GCText>
                        {/* If item no remark we don't display */}
                        {item.remarks != null ?
                           <View style={{ flexDirection: 'row' }}><GCText>Remark: {item.remarks}</GCText>
                           </View> : null}
                     </View>
                  )
               } else {
                  return (
                     <GCText>image is loading...</GCText>
                  )
               }
            }} //end renderItem 
         >
         </FlatList>

      )
      // return (
      //    <View style={{ flex: 1 }}>
      //       <View style={{ flex: .8 }}>
      //          {this.state.imageUrl && <Image
      //             style={{ width: '100%', height: '80%' }}
      //             source={{ uri: this.state.imageUrl }}
      //          />}
      //       </View>
      //       <View style={{ flex: .2, justifyContent: 'center', alignSelf: 'center' }}>
      //          {this.state.imageUrl && <GCFooterCmdIcon
      //             code="REMOVE"
      //             onPress={async () => {
      //                try {
      //                   await dwdbfsOrderUpdateFields(this.props.order.id, { imageForPickup: null },)
      //                   this.setState({ imageUrl: null })
      //                }
      //                catch (error) { cmnAlertPopup({ text: error.message }) } //confirmed
      //             }}
      //          />}

      //       </View>

      //    </View>
      // )

   } //end render

}// end CmnPhotosList

const styles = StyleSheet.create({
   container: {
      alignSelf: 'center',
      justifyContent: 'space-between',
      width: '100%',
      height: 'auto',
      padding: 10,
      borderRadius: 10,
      marginBottom: 10,
      backgroundColor: COLORS.GC_TILE_BK,
      // borderWidth:.5,
      // borderColor:'grey'
   },

   image: {
      alignSelf: 'center',
      width: '100%',
      height: 200,
      resizeMode: 'cover',
      borderRadius: 10
   },
});