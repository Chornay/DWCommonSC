import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native';

import { PRJ_STYLES } from 'DWcmn/PrjStyles'
import { GCI18n } from 'DWcmn/Gc'


//This is a component to help replace Native Base Tabs which was giving us trouble
// This expects an array of objects like this:
//    { key: 0, i18n: 'cmn.ID'}
//It will look after the display of a tab bar and return the currently selected index in onPress 

//prop fields an array of tab descriptors
//prop selectedTab
//prop onPress(index) should be used to set selected index
//TODO used this.props.selectedTab to render styling
export class PrjTabBar extends Component {

    render() {
       return (
          <View style={{flex:0, height:35, paddingBottom:5}}>        
          <View style={{ flex: 1, flexDirection: 'row', height: '10%', justifyContent: 'space-around' }}>
             {this.props.fields.map((field, index) => {
                let bkgStyle = (index == this.props.selectedTab) ? PRJ_STYLES.tabBkgActive : PRJ_STYLES.tabBkg
                let textStyle = (index == this.props.selectedTab) ? PRJ_STYLES.tabTextActive : PRJ_STYLES.tabText
                return (
                   <TouchableOpacity key={index}
                      style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }, bkgStyle]}
                      onPress={() => { this.props.onPress(index) }}>
                      <GCI18n style={textStyle} code={field.i18n} />
                   </TouchableOpacity>
                )
             })}
          </View>
          <View style={{height:5}}/>
          </View>
 
       )
    }
 }//end class PrjTabBar
 