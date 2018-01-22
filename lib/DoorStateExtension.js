/**
 * Created by kraig on 7/2/16.
 */
"use strict";
var Characteristic;
var DoorStateExtension = (function () {
    function DoorStateExtension() {
    }
    DoorStateExtension.init = function (exportedTypes) {
        Characteristic = exportedTypes.Characteristic;
    };
    return DoorStateExtension;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DoorStateExtension;
function getCurrentDoorState(service) {
    return service.getCharacteristic(Characteristic.CurrentDoorState).value;
}
exports.getCurrentDoorState = getCurrentDoorState;
function getTargetDoorState(service) {
    return service.getCharacteristic(Characteristic.TargetDoorState).value;
}
exports.getTargetDoorState = getTargetDoorState;
function asDoorState(targetState) {
    switch (targetState) {
        case Characteristic.TargetDoorState.OPEN:
            return Characteristic.CurrentDoorState.OPEN;
        case Characteristic.TargetDoorState.CLOSED:
            return Characteristic.CurrentDoorState.CLOSED;
    }
}
exports.asDoorState = asDoorState;
function asOperationState(targetState) {
    switch (targetState) {
        case Characteristic.TargetDoorState.OPEN:
            return Characteristic.CurrentDoorState.OPENING;
        case Characteristic.TargetDoorState.CLOSED:
            return Characteristic.CurrentDoorState.CLOSING;
    }
}
exports.asOperationState = asOperationState;
function getCurrentDoorStateDescription(doorState) {
    switch (doorState) {
        case Characteristic.CurrentDoorState.OPEN:
            return "OPEN";
        case Characteristic.CurrentDoorState.OPENING:
            return "OPENING";
        case Characteristic.CurrentDoorState.CLOSING:
            return "CLOSING";
        case Characteristic.CurrentDoorState.CLOSED:
            return "CLOSED";
        case Characteristic.CurrentDoorState.STOPPED:
            return "STOPPED";
    }
}
exports.getCurrentDoorStateDescription = getCurrentDoorStateDescription;
function getTargetDoorStateDescription(doorState) {
    switch (doorState) {
        case Characteristic.TargetDoorState.OPEN:
            return "OPEN";
        case Characteristic.TargetDoorState.CLOSED:
            return "CLOSED";
    }
}
exports.getTargetDoorStateDescription = getTargetDoorStateDescription;
