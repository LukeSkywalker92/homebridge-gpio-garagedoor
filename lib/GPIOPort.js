/**
 * Created by kraig on 7/2/16.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Promise = require("bluebird");
var onoff = require("onoff");
var Gpio = onoff.Gpio;
var gpioReadAsync = Promise.promisify(Gpio.prototype.read);
var gpioWriteAsync = Promise.promisify(Gpio.prototype.write);
(function (GPIOState) {
    GPIOState[GPIOState["On"] = 0] = "On";
    GPIOState[GPIOState["Off"] = 1] = "Off";
})(exports.GPIOState || (exports.GPIOState = {}));
var GPIOState = exports.GPIOState;
var GPIOPort = (function (_super) {
    __extends(GPIOPort, _super);
    function GPIOPort(gpio, direction, edge) {
        _super.call(this, gpio, direction, edge);
        var self = this;
        process.on('SIGINT', function () {
            self.unexport();
        });
    }
    ;
    GPIOPort.prototype.getState = function (retryCount) {
        retryCount = retryCount != null ? retryCount : 3;
        var val = 0;
        for (var i = 0; i < retryCount; i++) {
            val = this.readSync();
            if (val == 1) {
                break;
            }
        }
        return val;
    };
    ;
    GPIOPort.prototype.readAsync = function () {
        return gpioReadAsync.call(this);
    };
    GPIOPort.prototype.writeAsync = function (state) {
        return gpioWriteAsync.call(this, state);
    };
    return GPIOPort;
}(Gpio));
exports.GPIOPort = GPIOPort;
