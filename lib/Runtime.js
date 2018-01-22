/**
 * Created by kraig on 7/2/16.
 */
"use strict";
var util_1 = require("util");
function mixin(Class, MixinClass, doOverride) {
    var mixinMethods = MixinClass.prototype || MixinClass;
    var cls = Class.prototype || Class;
    Object.getOwnPropertyNames(mixinMethods).forEach(function (name) {
        if (!doOverride && cls[name] != undefined)
            return;
        cls[name] = mixinMethods[name];
    });
}
exports.mixin = mixin;
function changeBase(Class, BaseClass) {
    var orig = Class.prototype;
    util_1.inherits(Class, BaseClass);
    Class.prototype.parent = BaseClass.prototype;
    mixin(Class, orig, true);
}
exports.changeBase = changeBase;
