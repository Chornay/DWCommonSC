import React, { Component } from 'react'

import { View } from 'react-native'
import { SpinnerXYZ } from 'DWcmn/GCNB';
import { WebView } from 'react-native-webview';
import { GCFooterWithSingleIcon } from 'DWcmn/GCFooterForIcons'
import GCHeader from 'DWcmn/GCHeader'
import { COLORS } from 'DWcmn/Global';

//PrjWebView should be displayed inside a Cds/Cst/Drv/Shp Screen
//prop titleI18n
//prop onDone()
//prop url
export class PrjWebView extends Component {

    constructor() {
        super();
        this.state = {
            pageIsLoaded: false
        };

    }

    render() {
        //NOTE not the usual situation. We display the spinner AND the webview .. stop displaying the spinner
        //when the Webview has content
        return (
            <View style={{ flex: 1 }}>
                {this.props.titleI18n && <GCHeader titleI18n={this.props.titleI18n} />}
                <View style={{ flex: 1, backgroundColor: COLORS.GC_BACKGROUND, justifyContent: 'center' }}>
                    {(!this.state.pageIsLoaded) &&
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <SpinnerXYZ />
                        </View>
                    }
                    <WebView
                        originWhitelist={['*']}
                        source={{ uri: this.props.url }}
                        onLoadEnd={(syntheticEvent) => {
                            const { nativeEvent } = syntheticEvent;
                            this.setState({ pageIsLoaded: !nativeEvent.loading });
                        }}
                    />
                </View>

                {/* FOOTER SECTION */}
                <GCFooterWithSingleIcon
                    code='NEXT_IS_BACK'
                    onPress={() => this.props.onDone()}
                />
            </View >
        )
    }
}//end class PrjWebView



