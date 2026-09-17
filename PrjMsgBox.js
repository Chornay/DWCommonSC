import React, { Component } from 'react'
import { StyleSheet, View, } from 'react-native'
import GLOBALS from 'DWcmn/Global';
import { COLORS } from 'DWcmn/Global'
import { PrjIcon } from 'DWcmn/PrjIconComponents'
import { GCText } from './Gc';

// prop text
// prop children
export class PrjMsgBox extends Component {

    render() {
        return (
            <View style={styles.box}>
                <PrjIcon id={"WARNING"} style={{ fontSize: 13, paddingRight: 6 }} />
                <GCText style={{ fontSize:11, color: COLORS.GC_FORMINPUT_WARNING_TEXT }}>
                    {this.props.text}
                    {this.props.children}
                </GCText>
            </View>
        )
    } // end render

    //We couldn't get this to work with GCText ... couldn't control the vertical positioning of the icon
    // renderDIDNT_WORK() { 
    //     return (
    //         // styles.box commented out below
    //         <View style={styles.box}>
    //             {/* fontWeight '100' for thinner text */}
    //             <GCText  detail style={{ fontWeight: '100', color: COLORS.GC_FORMINPUT_WARNING_TEXT}}> 
    //             <PrjIcon id={"WARNING"} style={{ fontSize: 18, paddingRight: 6, marginTop:20 }} />
    //                 {this.props.text}
    //                 {this.props.children}
    //             </GCText>
    //         </View>
    //     )
    // } // end render
} // end PrjMsgBox

const styles = StyleSheet.create({
    box: {
        flexDirection: 'row',
        backgroundColor: COLORS.GC_FORMINPUT_WARNING_BKG,
        paddingTop: 6,
        // paddingBottom: 8,
        paddingLeft: 4,
    },
})
