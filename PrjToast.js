// Toast.js
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Modal } from 'react-native';
import { strX } from 'DWcmn/I18n.js'

//20250526 new, brought to you by our new bff, chatgpt to replace native base Toast

//TODO probably can do better than pad now that we have access to innards of Toast

//TO USE
// import { showToast } from './Toast';

// showToast(options)

//where options can contain 
// type:typeString  'success', 'warning', 'danger' default 'warning'
// text:string
// OR
// i18n:code
// duration:n duration in mseconds (default 5000)
// buttonI18n: buttonTextCode (default cmn.OKAY)
// pad: put 'pad' new lines before and after text and button text (default 1)
// params is a object containing any key value pairs for the i18n code 
//    eg {'percent':10}
//
// eg. prjToast ({type:'warning', text:'anything',buttonText:'DONE',duration:5000})
//     prjToast ({i18n:'CodeForText'})
//     prjToast ({i18n:'CodeusesParameters'},{percent:value})
//       where CodeUsesParameters -- The discount is {{percent}}%

//NOTE if the caller says that they are in a modal then we will wrap our guy in a transparent modal
//so the toast will be visible .... but touches will not go through it. NOT IDEAL
//BUT it only happens in one case .. CmnAddressInput
//chatgpt explains that Modals are in a different display thread so there is no way to zindex your way
//way above them. There are some solutions 
const { width } = Dimensions.get('window');

// 🪨 Create a singleton-like reference holder
let toastRef = null;

// 🧠 External function to show the toast
export const prjToast = (options, params) => {
    if (toastRef) {
        toastRef.show(options, params);
    }
};

export class PrjToast extends Component {
    state = {
        visible: false,
        message: '',
        type: 'success',
        modalParent: false //this is a kludge. See note at top
    };

    componentDidMount() {
        toastRef = this;
    }

    componentWillUnmount() {
        if (toastRef === this) toastRef = null;
        clearTimeout(this.timer);
    }

    show(options, params) {
        const { text, i18n, type = 'warning', duration = 5000, pad = 1, modalParent = false } = options
        let message = text || strX(i18n, params)
        if (pad > 0) { message = '\n'.repeat(pad) + message + '\n'.repeat(pad) }

        this.setState({ visible: true, message, type, modalParent });
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.setState({ visible: false, message: '' });
        }, duration);
    }

    render() {
        let bkg, fore
        if (!this.state.visible) return null;
        switch (this.state.type) {
            case 'reminder':
            case 'success': bkg = 'green', fore = 'white'; break
            case 'warning': bkg = 'yellow'; fore = 'black'; break
            case 'danger': bkg = 'red'; fore = 'white'; break
            default: bkg = 'purple'; fore = 'white'; break
        }
        if (this.state.modalParent) {
            return (
                <Modal visible={this.state.visible} transparent>
                    <View style={{ flex: 1 }} pointerEvents="box-none" >
                        <View style={[styles.toast, { backgroundColor: bkg }]} pointerEvents="none">
                            <Text style={{ color: fore, textAlign: 'center' }}>{this.state.message}</Text>
                        </View>
                    </View>
                </Modal>
            );

        }
        else {
            return (
                <View style={[styles.toast, { backgroundColor: bkg }]}>
                    <Text style={{ color: fore, textAlign: 'center' }}>{this.state.message}</Text>
                </View>
            );

        }
    }
}

const styles = StyleSheet.create({
    toast: {
        position: 'absolute',
        bottom: 60,
        left: width * 0.1,
        width: width * 0.8,
        backgroundColor: '#333',
        padding: 10,
        borderRadius: 6,
        alignItems: 'center',
        zIndex: 999,
    },
    text: {
        color: '#fff',
        textAlign: 'center',
    },
});
