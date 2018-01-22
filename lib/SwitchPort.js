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
var SwitchPort = (function (_super) {
    __extends(SwitchPort, _super);
    function SwitchPort(pin, service, log, doorSensor, doorOpensInSeconds) {
        _super.call(this, pin, 'high');
        this.service = service;
        this.log = log;
        this.isOperating = false;
        var self = this;
        var targetState = service.getCharacteristic(Characteristic.TargetDoorState);
        targetState.on('set', function (state, callback) {
            var curState = DoorStateExtension_1.getCurrentDoorState(service);
            switch (curState) {
                case Characteristic.CurrentDoorState.OPENING:
                case Characteristic.CurrentDoorState.CLOSING:
                    callback(new Error('Must wait until operation is finished'));
                    return;
                default:
                    // If the target state is equal to current state, do nothing.
                    if (DoorStateExtension_1.asDoorState(state) == curState) {
                        callback();
                        return;
                    }
                    break;
            }
            self.isOperating = true;
            self.log.debug("Started operation");
            self.writeAsync(GPIOPort_1.GPIOState.On)
                .then(function () {
                service.setCharacteristic(Characteristic.CurrentDoorState, DoorStateExtension_1.asOperationState(state));
            })
                .asCallback(callback)
                .delay(1000)
                .then(function () {
                return self.writeAsync(GPIOPort_1.GPIOState.Off);
            })
                .delay(doorOpensInSeconds * 1000)
                .catch(function (err) {
                self.log.error(err);
            })
                .finally(function () {
                self.isOperating = false;
                self.log.debug("Finished operation");
                doorSensor.reset();
                self.refresh();
                //TODO: log issues
            });
        });
        this.refresh();
    }
    SwitchPort.init = function (exportTypes) {
        Characteristic = exportTypes.Characteristic;
    };
    SwitchPort.prototype.refresh = function () {
        if (this.isOperating)
            return;
        this.service.getCharacteristic(Characteristic.TargetDoorState)
            .setValue(DoorStateExtension_1.getCurrentDoorState(this.service) == Characteristic.CurrentDoorState.OPEN ?
            Characteristic.TargetDoorState.OPEN :
            Characteristic.TargetDoorState.CLOSED);
    };
    ;
    return SwitchPort;
}(GPIOPort_1.GPIOPort));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SwitchPort;
