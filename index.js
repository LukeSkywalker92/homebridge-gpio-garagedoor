/// <reference path="./typings/globals/node/index.d.ts" />
"use strict";
var DoorSensorPort_1 = require("./lib/DoorSensorPort");
var SwitchPort_1 = require("./lib/SwitchPort");
var GPIOGarageDoorAccessory_1 = require("./lib/GPIOGarageDoorAccessory");
var DoorStateExtension_1 = require("./lib/DoorStateExtension");
module.exports = function (homebridge) {
    var exportTypes = {
        Accessory: homebridge.hap.Accessory,
        Service: homebridge.hap.Service,
        Characteristic: homebridge.hap.Characteristic,
        uuid: homebridge.hap.uuid,
    };
    DoorStateExtension_1.default.init(exportTypes);
    DoorSensorPort_1.default.init(exportTypes);
    SwitchPort_1.default.init(exportTypes);
    GPIOGarageDoorAccessory_1.default.init(exportTypes);
    homebridge.registerAccessory("homebridge-gpio-garagedoor", "GPIOGarageDoor", GPIOGarageDoorAccessory_1.default);
};
