var PresenceSensor = (function (api) {
    var uuid = 'B7961C93-0934-464B-97E2-2EF1D9CA4F68';
    var presencesensor_svs = 'urn:afoyi-com:serviceId:PresenceSensor1';
    var myModule = {};

    function ProcessForm() {
        var el = document.getElementById('presence_address');
        api.setDeviceStateVariablePersistent(api.getCpanelDeviceId(), presencesensor_svs, "Address", el.value, 0);

        el = document.getElementById('presence_devicetype');
        api.setDeviceStateVariablePersistent(api.getCpanelDeviceId(), presencesensor_svs, "DeviceType", el.options[el.selectedIndex].text, 0);

        api.luReload();
    }

    function PresenceSensorSettings(deviceID) {
        try {
            var address  = api.getDeviceState(deviceID,  presencesensor_svs, 'Address');
            var devicetype  = api.getDeviceState(deviceID,  presencesensor_svs, 'DeviceType');
            if(devicetype == 'ibeacon') {
                var select_options = '<option>bluetooth</option><option selected="selected">ibeacon</option>';
            } else if(devicetype == 'bluetooth') {
                var select_options = '<option selected="selected">bluetooth</option><option>ibeacon</option>';
            } else {
                var select_options = '<option selected="selected" disabled="disabled">Choose One:</option><option>bluetooth</option><option>ibeacon</option>';
            }
            var html =  '' +
                '<div style="margin-top: 1em;"><label style="width: 10em;">Address:</label><input id="presence_address" type="text" value="' + address + '" /></div>' +
                '<div><label style="width: 10em;">Device Type:</label><select id="presence_devicetype">'+ select_options + '</select></div>' +
                '<input type="button" value="Save and Reload" onClick="PresenceSensor.ProcessForm()" style="margin-top: 2em;" />';
            api.setCpanelContent(html);
        } catch (e) {
            Utils.logError('Error in PresenceSensor.PresenceSensorSettings(): ' + e);
        }
    }

    ///////////////////////////
    myModule = {
        uuid: uuid,
        PresenceSensorSettings : PresenceSensorSettings,
        ProcessForm: ProcessForm,
    };
    return myModule;

})(api);
