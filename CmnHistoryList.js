import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import moment from 'moment';
import { ListItem, Left, Right } from 'native-base';
import { PrjListText, PrjListTextHdr } from 'DWcmn/Prj';
import { COLORS } from 'DWcmn/Global';
import { strX } from 'DWcmn/I18n';
import { OrderStatusEnum } from 'DWcmn/Global';
import { cmnOrderStatusStr } from 'DWcmn/TypeCmnFunctions'
//20230526 removed the previous version which did not separate by dates

//prop order
export default class CmnHistoryList extends Component {
  
  render() {

    const COL1 = .2
    const COL2 = .8
    let lastLineDate = moment("1970-01-01").startOf('day').toDate()

    return (
      <View>
        {/* column headers */}
        <ListItem divider style={{ marginLeft: 0, paddingLeft: 20, backgroundColor: COLORS.GC_LIST_HDR_BKG }}>
          <Left style={{ flex: COL1 }}><PrjListTextHdr>{strX('cmn.Time')}</PrjListTextHdr></Left>
          <Right style={{ flex: COL2, alignItems: 'flex-start' }}><PrjListTextHdr>{strX('cmn.Action')}</PrjListTextHdr></Right>
        </ListItem>
        {/* data list */}
        <FlatList
          data={this.props.order.transactions}
          renderItem={({ item }) => {
            //NOTE transaction statuses are strings .. we need enum for the methods
            const statusEnum = OrderStatusEnum.enumValueOf(item.status)
            const currLineDate = moment(item.transDate).startOf('day').toDate()
            const displayDateFlag = (currLineDate.valueOf()!==lastLineDate.valueOf())
            lastLineDate = currLineDate

            //calculate the string to display
            //NOTE all apps get the same status string.
            let dispStr = ""
            if (item.strX) {dispStr = strX(item.strX)}
            else if (item.status) {dispStr = cmnOrderStatusStr('HISTORY',OrderStatusEnum.enumValueOf(item.status))}
            return (
              <View>
              {(displayDateFlag)?
              <ListItem style={{ flex: 1 }}>
              <Left>
              {/* <PrjListText>{relativeDayString(new Date( ),item.transDate)}</PrjListText> */}
              {/* <PrjListText>{moment(item.transDate).format('dddd YY/MM/DD')}</PrjListText> */}
                      <PrjListText>{moment(item.transDate).calendar(null, {
                        lastDay: '[Yesterday]',
                        sameDay: '[Today]',
                        nextDay: '[Tomorrow]',
                        lastWeek: '[last] dddd',
                        nextWeek: 'dddd',
                        sameElse: 'L'
                      })
                      }</PrjListText>
              </Left>
              </ListItem>:null}

              <ListItem style={{ flex: 1 }}>
                <Left style={{ flex: COL1 }}>
                <PrjListText>{moment(item.transDate).format('HH:mm')}</PrjListText>
                {/* <PrjListText>{moment(item.transDate).format('YY/MM/DD HH:mm')}</PrjListText> */}
                </Left>
                <Right style={{ flex: COL2, alignItems: 'flex-start' }}><PrjListText>{dispStr}</PrjListText></Right>
              </ListItem>
              </View>)
          }}
          keyExtractor={(item, index) => index.toString()}>
        </FlatList>
      </View>
    );
  } //end render

}// end CmnHistoryList
