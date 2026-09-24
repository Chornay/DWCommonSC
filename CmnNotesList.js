import React, { Component } from 'react'
// import { Content, Button, Title, Subtitle, Left, Body, Right, Drawer, Badge, List, ListItem, Tabs, Tab, TabHeading } from 'native-base';
import { View, Text, FlatList } from 'react-native'
import GLOBALS from 'DWcmn/Global';
import { COLORS } from 'DWcmn/Global';

//TODO Native Base has been eliminated and this code is not currently used
//TODO to implement notes this code will have to be modified 

//props notes
//prop count defined iff count is maintained by our caller (from a badge?)
//prop NoHeader defined iff no header is desired
export default class CmnNotesList extends Component {

    constructor() {
        super();
        this.state = {
            displayCount: 0,
        };
    }
    componentDidMount() {
    }

    render() {
        const COL1 = .3
        const COL2 = .7
        let noteCount = this.props.notes.length;
        let external = (this.props.count != null);
        let count = external ? this.props.count : this.state.displayCount;
return null
        // if (count == 0) {
        //     if (external||this.props.NoHeader) {
        //         return null;
        //     }
        //     // (else)
        //     return (
        //         <View>
        //             {/* column headers */}
        //             <ListItem divider style={{ marginLeft: 0, paddingLeft: 20, backgroundColor: COLORS.GC_LIST_HDR_BKG }}>
        //                 <Left style={{ flex: COL1 }}>
        //                     <View style={{ flexDirection: 'row' }}>
        //                         <Text>Notes</Text>
        //                         < Badge style={{ borderRadius: 90, width: 20, height: 20 }} >
        //                             <Text>{noteCount}</Text>
        //                         </ Badge>
        //                     </View>
        //                 </Left>
        //                 <Right style={{ flex: COL2, alignItems: 'flex-start' }}>
        //                     <Button transparent
        //                         onPress={() => {
        //                             this.setState({ displayCount: noteCount })
        //                         }}>
        //                         <Text style={{ color: 'blue' }}>SHOW</Text>
        //                     </Button>
        //                 </Right>
        //             </ListItem>
        //         </View>
        //     )
        // } //end if count==0

        // // (else) count is non-zero
        // return (
        //     <View>
        //         {/* title unless it is turned off*/}
        //         {this.props.NoHeader?null:
        //         <ListItem divider style={{ marginLeft: 0, paddingLeft: 20, backgroundColor: COLORS.GC_LIST_HDR_BKG, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
        //             <Left style={{ flex: COL1 }}>
        //                 <View style={{ flexDirection: 'row' }}>
        //                     <Text>Notes</Text>
        //                 </View>
        //             </Left>
        //             <Right style={{ flex: COL2, alignItems: 'flex-start' }}>
        //                 {external ? null :
        //                 <Button transparent
        //                 onPress={() => {
        //                     this.setState({ displayCount: 0 })
        //                 }}
        //                 >
        //                     <Text style={{ color: 'blue' }}>HIDE</Text>
        //                 </Button>
        //                  } 
        //             </Right>
        //         </ListItem>
        //         }
        //         {/* data list */}
        //         <FlatList
        //             data={this.props.notes}
        //             renderItem={({ item }) => {
        //                 return (
        //                     <ListItem style={{ flex: 1 }}>
        //                         <Text>{item.note}</Text>
        //                     </ListItem>)
        //             }}
        //             keyExtractor={(item, index) => index.toString()}
        //         >
        //         </FlatList>
        //     </View>
        // )
    } //end render
}// end CmnNotesList

// // props notes
// class CmnNoteReal extends Component {

//     constructor() {
//         super();
//         this.state = {
//             displayCount: 0,
//         };
//     }
//     componentDidMount() {
//     }

//     render() {
//         const COL1 = .3
//         const COL2 = .7
//         let noteCount = this.props.notes.length;

//         if (this.state.displayCount == 0) { // there are notes but we just display the count and a button
//             return (
//                 <View>
//                     {/* column headers */}
//                     <ListItem divider style={{ marginLeft: 0, paddingLeft: 20, backgroundColor: COLORS.GC_LIST_HDR_BKG }}>
//                         <Left style={{ flex: COL1 }}>
//                             <View style={{ flexDirection: 'row' }}>
//                                 <Text>Notes</Text>
//                                 < Badge style={{ borderRadius: 90, width: 20, height: 20 }} >
//                                     <Text>{noteCount}</Text>
//                                 </ Badge>
//                             </View>
//                         </Left>
//                         <Right style={{ flex: COL2, alignItems: 'flex-start' }}>
//                             <Button transparent
//                                 onPress={() => {
//                                     this.setState({ displayCount: noteCount })
//                                 }}>
//                                 <Text style={{ color: 'blue' }}>SHOW</Text>
//                             </Button>
//                         </Right>
//                     </ListItem>
//                 </View>
//             )
//         } //end else if 

//         else { //display notes
//             return (
//                 <View style={{ borderWidth: .5, margin: 5, borderRadius: 20 }}>
//                     {/* column headers */}
//                     <ListItem divider style={{ marginLeft: 0, paddingLeft: 20, backgroundColor: COLORS.GC_LIST_HDR_BKG, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
//                         <Left style={{ flex: COL1 }}>
//                             <View style={{ flexDirection: 'row' }}>
//                                 <Text>Notes</Text>
//                             </View>
//                         </Left>
//                         <Right style={{ flex: COL2, alignItems: 'flex-start' }}>
//                             <Button transparent
//                                 onPress={() => {
//                                     this.setState({ displayCount: 0 })
//                                 }}>
//                                 <Text style={{ color: 'blue' }}>HIDE</Text>
//                             </Button>
//                         </Right>
//                     </ListItem>
//                     {/* data list */}
//                     <FlatList
//                         data={this.props.notes}
//                         renderItem={({ item }) => {
//                             return (
//                                 <ListItem style={{ flex: 1 }}>
//                                     <Text>{item.note}</Text>
//                                 </ListItem>)
//                         }}
//                         keyExtractor={(item, index) => index.toString()}
//                     >
//                     </FlatList>
//                 </View>
//             )
//         } //end else
//     } //end render
// }// end CmnNote




