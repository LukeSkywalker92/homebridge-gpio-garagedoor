/**
 * Created by kraig on 7/2/16.
 */
"use strict";
var DoorStateExtension_1 = require("./DoorStateExtension");
var Runtime_1 = require("./Runtime");
var DoorSensorPort_1 = require("./DoorSensorPort");
var SwitchPort_1 = require("./SwitchPort");
var Accessory, Service, Characteristic, uuid;
var GPIOGarageDoorAccessory = (function () {
    function GPIOGarageDoorAccessory(log, config) {
        var name = config["name"];
        var id = uuid.generate('gpio-garagedoor.' + (config['id'] || this.name));
        Accessory.call(this, name, id);
        this.uuid_base = id;
        this.name = name;
        this.log = log;
        var garageDoorOpener = this.addService(Service.GarageDoorOpener);
        var doorSensorPin = config["doorSensorPin"];
        log("Door Sensor Pin: " + doorSensorPin);
        if (doorSensorPin) {
            var isNCSensor = config['isNCSensor'] == true;
            log("Is NC Sensor: " + isNCSensor);
            this.doorSensor = new DoorSensorPort_1.default(doorSensorPin, garageDoorOpener, log, isNCSensor);
        }
        var doorSwitchPin = config["doorSwitchPin"];
        log("Door Switch Pin: " + doorSwitchPin);
        var doorOpensInSeconds = config["doorOpensInSeconds"];
        log("Door Opens (in seconds): " + doorOpensInSeconds);
        if (doorSwitchPin) {
            this.doorSwitch = new SwitchPort_1.default(doorSwitchPin, garageDoorOpener, log, this.doorSensor, doorOpensInSeconds);
        }
        garageDoorOpener.getCharacteristic(Characteristic.CurrentDoorState)
            .on('change', function (change) {
            log("Garage Door state changed to " + DoorStateExtension_1.getCurrentDoorStateDescription(change.newValue));
        });
        this.getService(Service.AccessoryInformation)
            .setCharacteristic(Characteristic.Model, "GPIO Garage Door");
    }
    GPIOGarageDoorAccessory.init = function (exportTypes) {
        Accessory = exportTypes.Accessory;
        Service = exportTypes.Service;
        Characteristic = exportTypes.Characteristic;
        uuid = exportTypes.uuid;
        Runtime_1.changeBase(GPIOGarageDoorAccessory, Accessory);
    };
    GPIOGarageDoorAccessory.prototype.getServices = function () {
        return this.services;
    };
    ;
    return GPIOGarageDoorAccessory;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GPIOGarageDoorAccessory;
