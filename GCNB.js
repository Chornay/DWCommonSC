import React, { Component } from 'react'
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native';

//prop color default '#666666'
//prop size default 'large'
//prop style
export class SpinnerXYZ extends Component {
   render() {
      const color = this.props.color || '#666666'
      const size = this.props.size || 'large'
      return (
         <View style={[styles.spinner, this.props.style]}>
            <ActivityIndicator size={size} color={color} />
         </View>
      )
   }
}

//NOTE the styles passed in are applied to the 'inner' View
//NOTE maybe the two Views could be combined ... be our guest :)
export class ListItemXYZ extends Component {

   render() {
      return (
         <View style={[styles.listItemContainer]}>
            <View style={[styles.listItemContent, this.props.style]}>
               {this.props.children}
            </View>
         </View>
      )
   }
}
export class LeftXYZ extends Component {
render() {
    return(
  <View style={[styles.left, this.props.style]}>{this.props.children}</View>
)}}
export class BodyXYZ extends Component {
render() {
    return(
  <View style={[styles.body, this.props.style]}>{this.props.children}</View>
)}}
export class RightXYZ extends Component {
render() {
    return(
  <View style={[styles.right, this.props.style]}>{this.props.children}</View>
)}}

const styles = StyleSheet.create({
   listItemContainer: {
      minHeight: 40,
      paddingVertical: 6,
      // paddingHorizontal: 10,
      borderBottomWidth: 0.5,
      borderColor: '#ccc',
   },
   listItemContent: {
      // flex:1, //need this according to bff, so that item has a size and alignItems will work (vertical centering)
      //but we have changed to flexGrow:1 to accomodate the three lines of text in CmnIdList
      flexDirection: 'row',
      flexGrow:1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      // paddingHorizontal: 10,
   },
  left: {
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
  },
  right: {
    marginLeft: 'auto', //courtesy of bff, 
   //  justifyContent: 'flex-end',
   //  alignItems: 'flex-end',
  },
   spinner: {
      // marginLeft: 12,
      justifyContent: 'center',
      alignItems: 'center',
   },
});

//GCs chatGpt suggestions
// export class Left extends Component {
// render() {
//     return(
//   <View style={[styles.left, this.props.style]}>{this.props.children}</View>
// )}}

// export class Body extends Component {
// render() {
//     return(
//   <View style={[styles.body, this.props.style]}>{this.props.children}</View>
// )}}

// export class Right extends Component {
// render() {
//     return(
//   <View style={[styles.right, this.props.style]}>{this.props.children}</View>
// )}}

// export class ListItem extends Component {
// render() {
//     return(
//   <Pressable onPress={this.props.onPress}>
//     <View style={[styles.container, this.props.style]}>{this.props.children}</View>
//   </Pressable>
// )}}
// const styles = StyleSheet.create({
//   spinner: {
//     // marginLeft: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   container: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   justifyContent: 'flex-start',
//   paddingHorizontal: 15,
//   paddingVertical: 10,
//   minHeight: 45,
//   borderBottomWidth: 1,
//   borderColor: '#c9c9c9',
//   backgroundColor: 'transparent',
//     // paddingVertical: 12,
//     // paddingHorizontal: 16,
//     // borderBottomWidth: 1,
//     // borderColor: '#e0e0e0',
//     // backgroundColor: '#fff',
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   left: {
//     marginRight: 12,
//     justifyContent: 'center',
//     alignItems: 'flex-start',
//   },
//   body: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   right: {
//     marginLeft: 12,
//     justifyContent: 'center',
//     alignItems: 'flex-end',
//   },
// });


