import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { ListItem, Left, Right } from 'native-base';
import Modal from "react-native-modal";

import GLOBALS from 'DWcmn/Global';
import { GCText } from 'DWcmn/Gc'
import { PrjIcon } from 'DWcmn/PrjIconComponents';
import GCHeader from 'DWcmn/GCHeader'

const { width: SCREEN_WIDTH } = Dimensions.get('window') || {};
const { height: SCREEN_HEIGHT } = Dimensions.get('window') || {};

//20250218 used GCText


// Properties
//   onDone()
//   style string any changes to the default styling of the box
// the component does not control its own visibility, the wrapper class is expected to do so
export default class CmnSettingsModal extends Component {

    constructor() {
        super();
        this.state = {
        };
    }


    render() {

        return (
            <View>
                <Modal
                    avoidKeyboard={true} //for ios modal doesn't hide under keyboard 
                    isVisible={true}
                    animationIn='slideInRight'
                    animationOut='slideOutRight'
                    onSwipeComplete={this.props.onDone}
                    swipeDirection="right"
                >
                    <View style={[styles.modal, this.props.style]}>
                        <View style={{ flex: .1 }}>
                            <GCHeader titleI18n="cmn.SETTINGS" />
                        </View>
                        {this.props.children}
                    </View>

                </Modal>
            </View>
        );
    } //end render

} //end CmnSettingsModal

//     <View style={{ flex: .2, flexDirection: 'row', paddingLeft: 40, paddingRight: 40, justifyContent: 'space-between', alignItems: 'center', backgroundColor: GLOBALS.COLOR.SETTING_MODAL_BK }}>
//     <Thumbnail large
//         style={{ backgroundColor: GLOBALS.COLOR.MAIN_BK }}
//         source={require('../images/dwLogo.png')}
//     />
// </View>

export function settingsField(title) {

    return (
        <ListItem>
            <TouchableOpacity
                style={{ flexDirection: 'row', paddingRight: 10, paddingTop: 10, paddingBottom: 10 }}
                onPress={() => { }}>
                <Left style={{}}>
                    <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'flex-start' }}>
                        <View style={{ paddingLeft: 20 }} />
                        <GCText style={{ color: 'white', marginLeft: -20 }}>{title}</GCText>
                    </View>
                </Left>
                <Right style={{}}>
                    {/* <PrjIcon style={{ color: 'white' }} id={"ARROW_RIGHT"} /> */}
                    <PrjIcon style={{ color: 'white' }} id={"ARROW_RIGHT"}
                    />
                </Right>
            </TouchableOpacity>
        </ListItem>
    );
}// end settingsField


class CstTermsOfUse extends Component {

    constructor() {
        super();
        this.state = {
        };
    }
    render() {

        return (
            <ListItem>
                <TouchableOpacity
                    onPress={() => { this.props.onPress() }}>
                    <Left style={{}}>
                        <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'flex-start' }}>
                            <View style={{ paddingLeft: 20 }} />
                            <GCText style={{ color: 'white', marginLeft: -20 }}>{this.props.text}</GCText>
                        </View>
                    </Left>
                    <Right style={{}}>
                        {/* <PrjIcon style={{ color: 'white' }} id={"ARROW_RIGHT"} /> */}
                        <PrjIcon style={{ color: 'white' }} id={"ARROW_RIGHT"}
                        />
                    </Right>
                </TouchableOpacity>
            </ListItem>
        );
    } //end render
} //end CstTermsOfUse


const styles = StyleSheet.create({
    modal: {
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        backgroundColor: GLOBALS.COLOR.MODAL_CMD_BK,
        margin: 0,
        flex: 1,
    },
    listItem: {
        borderBottomWidth: 0
    }
})




