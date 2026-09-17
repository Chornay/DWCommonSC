import React, { Component } from 'react'
import { View, Text } from 'react-native'

import { strX } from 'DWcmn/I18n';

export default class CmnError extends Component {

  render() {
    return (
      <View>
          <Text>{strX("err.errorDetected")}</Text>
          {this.props.children}
      </View>
    );
  } //end render

}// end CmnError



