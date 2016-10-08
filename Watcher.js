;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory)
    } else if (typeof exports === 'object') {
        // Node, CommonJS
        module.exports = factory()
    } else {
        // Window
        root.Watcher = factory()
    }
}(this, function () {
    var Watcher = function () {
        this.events = {}
    }

    Watcher.prototype = {
        construct: Watcher,

        on: function (type, fn) {
            this._getEvent(type).push(fn)
        },

        trigger: function (type) {
            var event  = this._getEvent(type)
            var params = Array.prototype.slice.call(arguments, 1)

            event.forEach(function (fn) {
                fn.apply(fn, params)
            })
        },

        _getEvent: function (type) {
            if (!this.events[type]) this.events[type] = []

            return this.events[type]
        },

        remove: function (type, fn) {
            var event = this._getEvent(type)

            if (!fn) {
                this.events[type] = []
            } else {
                event.splice(event.indexOf(fn), 1)
            }
        }
    }

    return Watcher
}))