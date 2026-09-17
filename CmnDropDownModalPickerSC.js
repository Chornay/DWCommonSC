import React, { Component } from 'react';
import {
   View,
   Text,
   Modal,
   TouchableOpacity,
   FlatList,
   StyleSheet,
} from 'react-native';
import { COLORS } from 'DWcmn/Global';
import { GCText, GCI18n } from 'DWcmn/Gc'

//props initialIndex
//props choices[] - an array of strings
//props prices[] - if the choices have a price
//props onChange()
export class CmnDropdownModalPicker extends Component {
   constructor(props) {
      super(props);
      this.state = {
         selectedIndex: this.props.initialIndex||0,
         modalVisible: false,
      };
      // this.fullList = [null,...this.props.data]
      this.choices = this.props.choices
      this.prices = this.props.prices
      this.hasPrices = !!this.prices
   }

   setModalVisible = (visible) => {
      this.setState({ modalVisible: visible });
   };

   onSelect = (index) => {
      this.setState({ selectedIndex: index, modalVisible: false });
      if (this.props.onChange) {
         this.props.onChange(index);
      }
   };

   renderItem = ({ item, index }) => {
      const isSelected = index === this.state.selectedIndex;

      return (
         <TouchableOpacity
            style={[styles.item, isSelected && styles.selectedItem]}
            onPress={() => this.onSelect(index)}
         >
            <GCText detail style={[styles.itemText, isSelected && styles.selectedItemText]}>
               {this.formatEntry(index)}
            </GCText>
         </TouchableOpacity>
      );
   };

   formatEntry = (index) => {
      const choice = this.choices[index]
      const name = choice||'<none>'

      if (this.hasPrices) {
         return (`${name}     ${this.prices[index]}`)
      }
      else {
         return (name)
      }
   }


   render() {
      const { modalVisible } = this.state;
      return (
         <View style={styles.container}>
            <TouchableOpacity
               style={styles.selector}
               onPress={() => this.setModalVisible(true)}
            >
               <GCText detail style={styles.selectorText}>{this.formatEntry(this.state.selectedIndex)}</GCText>
               <GCText detail style={styles.arrow}>▼</GCText>
            </TouchableOpacity>

            <Modal
               transparent={true}
               visible={modalVisible}
               animationType="slide"
               onRequestClose={() => this.setModalVisible(false)}
            >
               <View style={styles.modalOverlay}>
                  <View style={styles.modalContent}>
                     <FlatList
                        data={this.choices}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this.renderItem}
                     />
                     <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => this.setModalVisible(false)}
                     >
                        <GCText detail style={styles.closeText}>Close</GCText>
                     </TouchableOpacity>
                  </View>
               </View>
            </Modal>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   arrow: {
      fontSize: 16,
      color: '#555',
      marginLeft: 10,
   },
   selectedItem: {
      backgroundColor: '#e0f7fa', // light blue highlight
   },
   selectedItemText: {
      fontWeight: 'bold',
      color: '#00796b',
   },
   container: {
      margin: 0,
   },
   selector: { //changed to look consistent with input text
      flexDirection: 'row',
      justifyContent: 'flex-end',
      borderWidth: 1.5,
      borderColor: COLORS.GC_TILE_BORDER,
      backgroundColor: COLORS.GC_ABS_WHITE,
      padding: 6,
      borderRadius: 5,
   },
   selectorText: {
      fontSize: 16,
   },
   modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
   },
   modalContent: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      maxHeight: '70%',
   },
   item: {
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
   },
   itemText: {
      fontSize: 16,
   },
   closeButton: {
      marginTop: 10,
      padding: 10,
      alignItems: 'center',
   },
   closeText: {
      color: 'blue',
      fontSize: 16,
   },
});

