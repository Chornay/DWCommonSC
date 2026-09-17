import { PermissionsAndroid, Platform } from 'react-native'

import RNQRGenerator from 'rn-qr-generator';


let BLEPrinter = null;
// if (Platform.OS === 'android') {
//     BLEPrinter = require('react-native-thermal-receipt-printer-image-qr').BLEPrinter;
// }

import { cmnAlertPopup } from './cmnAnnunciationFunctions';
import { prjToast } from 'DWcmn/PrjToast'

import { prjFormatOrderForPrintBill } from 'DWcmn/prjFormatOrderForPrintBill'

//20251111 new
//20260221 handle case where there is no QR code

//prop order
//prop readonly
//returns true iff successful

export async function cmnPrintOrderAsync(order) {

    let QRimage = null //defined iff there is a code from a QR
    if (Platform.OS !== 'android') {
        cmnAlertPopup({ text: 'Printing only supported on android' })
        return false;
    }

    //if we have a code from a QR then form the printable object QRimage
    if (!order.codeFromQr) {

        let response = await RNQRGenerator.generate({
            value: 'https://dobbywalla.com/?code=' + order.codeFromQr,
            base64: true, //we want to get a string representation of the image
            height: 200,
            width: 200,
            color: '#204e94',
        })
        QRimage = response.base64;
    }

    // remove any special character in from the printed receipt
    function stripHtml(html) {
        return html.replace(/<[^>]*>?/gm, '');
    }

    const receipt = prjFormatOrderForPrintBill(order)
    const plainText = stripHtml(receipt);

    try {
        // open system Bluetooth dialog
        const granted = await PermissionsAndroid.requestMultiple([
            'android.permission.BLUETOOTH_CONNECT',
            'android.permission.BLUETOOTH_SCAN',
        ]);

        await BLEPrinter.init();
        const devices = await BLEPrinter.getDeviceList();

        let list = devices;
        // If devices is a JSON string or wrapped in an object, parse it
        if (typeof devices === 'string') {
            list = JSON.parse(devices);
        } else if (devices.found) {
            list = JSON.parse(devices.found);
        }
        const printer = list.find(
            d => (d.name || d.device_name)?.toLowerCase().includes('printer')
        );

        //  console.log('Found printer---------------->', printer)
        if (!printer) {
            cmnAlertPopup({ text: 'No Printer Found' })
            return false;
        }
        await BLEPrinter.connectPrinter(printer.inner_mac_address);
        if (QRimage) { await BLEPrinter.printImageBase64(QRimage, { width: 576 }); }
        await BLEPrinter.printBill(plainText);
        // Cutting invoice
        // const cutCommand = '\x1dV\x00';
        // await BLEPrinter.printText(cutCommand);
        return true

    } catch (error) {
        cmnAlertPopup({ text: error.message })
        return false
    }

};

