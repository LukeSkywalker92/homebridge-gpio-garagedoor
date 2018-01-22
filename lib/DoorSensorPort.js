/**
 * Created by kraig on 7/2/16.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GPIOPort_1 = require("./GPIOPort");
var DoorStateExtension_1 = require("./DoorStateExtension");
var Characteristic;
var DoorSensorPort = (function (_super) {
    __extends(DoorSensorPort, _super);
    function DoorSensorPort(pin, service, log, isNCSensor) {
        _super.call(this, pin, 'in', 'both');
        this.service = service;
        this.log = log;
        this.closedSensorValue = isNCSensor ? 0 : 1;
        var self = this;
        this.watch(function (err, value) {
            if (err) {
                log.error(err);
                return;
            }
            self.isClosed = value == self.closedSensorValue;
            self.handleStateChange();
        });
        this.reset();
    }
    DoorSensorPort.init = function (exportTypes) {
        Characteristic = exportTypes.Characteristic;
    };
    DoorSensorPort.prototype.handleStateChange = function () {
        var currentState = DoorStateExtension_1.getCurrentDoorState(this.service);
        switch (currentState) {
            case Characteristic.CurrentDoorState.CLOSING:
            case Characteristic.CurrentDoorState.OPENING:
                return;
            default:
                this.updateCurrentDoorState();
        }
        // Handle external state change.
        var targetState = DoorStateExtension_1.getTargetDoorState(this.service);
        if ((this.isClosed && targetState == Characteristic.TargetDoorState.OPEN)
            || (!this.isClosed && targetState == Characteristic.TargetDoorState.CLOSED)) {
            this.service.getCharacteristic(Characteristic.TargetDoorState)
                .setValue(this.isClosed ? Characteristic.TargetDoorState.CLOSED : Characteristic.TargetDoorState.OPEN);
        }
    };
    ;
    DoorSensorPort.prototype.reset = function () {
        this.isClosed = this.getState() == this.closedSensorValue;
        this.updateCurrentDoorState();
    };
    ;
    DoorSensorPort.prototype.updateCurrentDoorState = function () {
        this.service.getCharacteristic(Characteristic.CurrentDoorState)
            .setValue(this.isClosed ? Characteristic.CurrentDoorState.CLOSED : Characteristic.CurrentDoorState.OPEN);
    };
    ;
    return DoorSensorPort;
}(GPIOPort_1.GPIOPort));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DoorSensorPort;
