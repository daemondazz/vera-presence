var presencesensor_svs = 'urn:afoyi-com:serviceId:PresenceSensor1';

function presencesensor_settings(deviceID) {
    var address  = get_device_state(deviceID,  presencesensor_svs, 'Address');
    var devicetype  = get_device_state(deviceID,  presencesensor_svs, 'DeviceType');
    if (devicetype == "bluetooth") {
        var html =  '<table>' +
            '<tr><td>Address </td><td><input  type="text" id="presence_address" size=40 value="' +  address + '" onchange="address_set(' + deviceID + ', this.value);"></td></tr>' +
            '<tr><td>Device Type </td><td><select onchange="devicetype_set(' + deviceID + ', this.value);"><option value="bluetooth" selected>Bluetooth (phone, tablet etc.)</option><option value="ibeacon">iBeacon</option></select></td></tr>' +
            '</table>';
    } else {
        var html =  '<table>' +
            '<tr><td>Address </td><td><input  type="text" id="presence_address" size=40 value="' +  address + '" onchange="address_set(' + deviceID + ', this.value);"></td></tr>' +
            '<tr><td>Device Type </td><td><select onchange="devicetype_set(' + deviceID + ', this.value);"><option value="bluetooth">Bluetooth (phone, tablet etc.)</option><option value="ibeacon" selected>iBeacon</option></select></td></tr>' +
            '</table>';
    }
    html = html +
    '<p><p>Address is MAC for bluetooth<br>' +
    'MAC or &lt;UUID&gt;,&lt;major&gt;,&lt;minor&gt; for iBeacon<br>' +
    '(note: UUID is without dashes)';

    set_panel_html(html);
}

function address_set(deviceID, varVal) {
  set_device_state(deviceID,  presencesensor_svs, 'Address', varVal);
}

function devicetype_set(deviceID, varVal) {
  set_device_state(deviceID,  presencesensor_svs, 'DeviceType', varVal);
}
