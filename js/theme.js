"use strict";

function _typeof(t) {
    return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
        return typeof t
    } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    })(t)
}! function (t, e) {
    "object" === ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? e(exports, require("jquery")) : "function" == typeof define && define.amd ? define(["exports", "jquery"], e) : e((t = t || self).bootstrap = {}, t.jQuery)
}(void 0, function (t, p) {
    function i(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
        }
    }

    function s(t, e, n) {
        return e && i(t.prototype, e), n && i(t, n), t
    }

    function e(e, t) {
        var n, i = Object.keys(e);
        return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(e), t && (n = n.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable
        })), i.push.apply(i, n)), i
    }

    function l(o) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2 ? e(Object(r), !0).forEach(function (t) {
                var e, n, i;
                e = o, i = r[n = t], n in e ? Object.defineProperty(e, n, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[n] = i
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(r)) : e(Object(r)).forEach(function (t) {
                Object.defineProperty(o, t, Object.getOwnPropertyDescriptor(r, t))
            })
        }
        return o
    }
    p = p && Object.prototype.hasOwnProperty.call(p, "default") ? p.default : p;
    var n = "transitionend";

    function o(t) {
        var e = this,
            n = !1;
        return p(this).one(m.TRANSITION_END, function () {
            n = !0
        }), setTimeout(function () {
            n || m.triggerTransitionEnd(e)
        }, t), this
    }
    var m = {
        TRANSITION_END: "bsTransitionEnd",
        getUID: function (t) {
            for (; t += ~~(1e6 * Math.random()), document.getElementById(t););
            return t
        },
        getSelectorFromElement: function (t) {
            var e, n = t.getAttribute("data-target");
            n && "#" !== n || (n = (e = t.getAttribute("href")) && "#" !== e ? e.trim() : "");
            try {
                return document.querySelector(n) ? n : null
            } catch (t) {
                return null
            }
        },
        getTransitionDurationFromElement: function (t) {
            if (!t) return 0;
            var e = p(t).css("transition-duration"),
                n = p(t).css("transition-delay"),
                i = parseFloat(e),
                o = parseFloat(n);
            return i || o ? (e = e.split(",")[0], n = n.split(",")[0], 1e3 * (parseFloat(e) + parseFloat(n))) : 0
        },
        reflow: function (t) {
            return t.offsetHeight
        },
        triggerTransitionEnd: function (t) {
            p(t).trigger(n)
        },
        supportsTransitionEnd: function () {
            return Boolean(n)
        },
        isElement: function (t) {
            return (t[0] || t).nodeType
        },
        typeCheckConfig: function (t, e, n) {
            for (var i in n)
                if (Object.prototype.hasOwnProperty.call(n, i)) {
                    var o = n[i],
                        r = e[i],
                        s = r && m.isElement(r) ? "element" : null == (a = r) ? "" + a : {}.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase();
                    if (!new RegExp(o).test(s)) throw new Error(t.toUpperCase() + ': Option "' + i + '" provided type "' + s + '" but expected type "' + o + '".')
                } var a
        },
        findShadowRoot: function (t) {
            if (!document.documentElement.attachShadow) return null;
            if ("function" != typeof t.getRootNode) return t instanceof ShadowRoot ? t : t.parentNode ? m.findShadowRoot(t.parentNode) : null;
            var e = t.getRootNode();
            return e instanceof ShadowRoot ? e : null
        },
        jQueryDetection: function () {
            if (void 0 === p) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
            var t = p.fn.jquery.split(" ")[0].split(".");
            if (t[0] < 2 && t[1] < 9 || 1 === t[0] && 9 === t[1] && t[2] < 1 || 4 <= t[0]) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
        }
    };
    m.jQueryDetection(), p.fn.emulateTransitionEnd = o, p.event.special[m.TRANSITION_END] = {
        bindType: n,
        delegateType: n,
        handle: function (t) {
            if (p(t.target).is(this)) return t.handleObj.handler.apply(this, arguments)
        }
    };
    var r = "alert",
        a = "bs.alert",
        c = p.fn[r],
        h = function () {
            function i(t) {
                this._element = t
            }
            var t = i.prototype;
            return t.close = function (t) {
                var e = this._element;
                t && (e = this._getRootElement(t)), this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e)
            }, t.dispose = function () {
                p.removeData(this._element, a), this._element = null
            }, t._getRootElement = function (t) {
                var e = m.getSelectorFromElement(t),
                    n = !1;
                return e && (n = document.querySelector(e)), n = n || p(t).closest(".alert")[0]
            }, t._triggerCloseEvent = function (t) {
                var e = p.Event("close.bs.alert");
                return p(t).trigger(e), e
            }, t._removeElement = function (e) {
                var t, n = this;
                p(e).removeClass("show"), p(e).hasClass("fade") ? (t = m.getTransitionDurationFromElement(e), p(e).one(m.TRANSITION_END, function (t) {
                    return n._destroyElement(e, t)
                }).emulateTransitionEnd(t)) : this._destroyElement(e)
            }, t._destroyElement = function (t) {
                p(t).detach().trigger("closed.bs.alert").remove()
            }, i._jQueryInterface = function (n) {
                return this.each(function () {
                    var t = p(this),
                        e = t.data(a);
                    e || (e = new i(this), t.data(a, e)), "close" === n && e[n](this)
                })
            }, i._handleDismiss = function (e) {
                return function (t) {
                    t && t.preventDefault(), e.close(this)
                }
            }, s(i, null, [{
                key: "VERSION",
                get: function () {
                    return "4.5.0"
                }
            }]), i
        }();
    p(document).on("click.bs.alert.data-api", '[data-dismiss="alert"]', h._handleDismiss(new h)), p.fn[r] = h._jQueryInterface, p.fn[r].Constructor = h, p.fn[r].noConflict = function () {
        return p.fn[r] = c, h._jQueryInterface
    };
    var u = "button",
        f = "bs.button",
        d = p.fn[u],
        g = "active",
        _ = '[data-toggle^="button"]',
        v = 'input:not([type="hidden"])',
        y = ".btn",
        b = function () {
            function n(t) {
                this._element = t
            }
            var t = n.prototype;
            return t.toggle = function () {
                var t, e, n = !0,
                    i = !0,
                    o = p(this._element).closest('[data-toggle="buttons"]')[0];
                !o || (t = this._element.querySelector(v)) && ("radio" === t.type && (t.checked && this._element.classList.contains(g) ? n = !1 : (e = o.querySelector(".active")) && p(e).removeClass(g)), n && ("checkbox" !== t.type && "radio" !== t.type || (t.checked = !this._element.classList.contains(g)), p(t).trigger("change")), t.focus(), i = !1), this._element.hasAttribute("disabled") || this._element.classList.contains("disabled") || (i && this._element.setAttribute("aria-pressed", !this._element.classList.contains(g)), n && p(this._element).toggleClass(g))
            }, t.dispose = function () {
                p.removeData(this._element, f), this._element = null
            }, n._jQueryInterface = function (e) {
                return this.each(function () {
                    var t = p(this).data(f);
                    t || (t = new n(this), p(this).data(f, t)), "toggle" === e && t[e]()
                })
            }, s(n, null, [{
                key: "VERSION",
                get: function () {
                    return "4.5.0"
                }
            }]), n
        }();
    p(document).on("click.bs.button.data-api", _, function (t) {
        var e = t.target,
            n = e;
        if (p(e).hasClass("btn") || (e = p(e).closest(y)[0]), !e || e.hasAttribute("disabled") || e.classList.contains("disabled")) t.preventDefault();
        else {
            var i = e.querySelector(v);
            if (i && (i.hasAttribute("disabled") || i.classList.contains("disabled"))) return void t.preventDefault();
            "LABEL" === n.tagName && i && "checkbox" === i.type && t.preventDefault(), b._jQueryInterface.call(p(e), "toggle")
        }
    }).on("focus.bs.button.data-api blur.bs.button.data-api", _, function (t) {
        var e = p(t.target).closest(y)[0];
        p(e).toggleClass("focus", /^focus(in)?$/.test(t.type))
    }), p(window).on("load.bs.button.data-api", function () {
        for (var t = [].slice.call(document.querySelectorAll('[data-toggle="buttons"] .btn')), e = 0, n = t.length; e < n; e++) {
            var i = t[e],
                o = i.querySelector(v);
            o.checked || o.hasAttribute("checked") ? i.classList.add(g) : i.classList.remove(g)
        }
        for (var r = 0, s = (t = [].slice.call(document.querySelectorAll('[data-toggle="button"]'))).length; r < s; r++) {
            var a = t[r];
            "true" === a.getAttribute("aria-pressed") ? a.classList.add(g) : a.classList.remove(g)
        }
    }), p.fn[u] = b._jQueryInterface, p.fn[u].Constructor = b, p.fn[u].noConflict = function () {
        return p.fn[u] = d, b._jQueryInterface
    };
    var E = "carousel",
        w = "bs.carousel",
        T = "." + w,
        C = p.fn[E],
        S = {
            interval: 5e3,
            keyboard: !0,
            slide: !1,
            pause: "hover",
            wrap: !0,
            touch: !0
        },
        D = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            slide: "(boolean|string)",
            pause: "(string|boolean)",
            wrap: "boolean",
            touch: "boolean"
        },
        N = "next",
        k = "prev",
        O = "slid" + T,
        A = "active",
        I = ".active.carousel-item",
        x = {
            TOUCH: "touch",
            PEN: "pen"
        },
        j = function () {
            function r(t, e) {
                this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, this._config = this._getConfig(e), this._element = t, this._indicatorsElement = this._element.querySelector(".carousel-indicators"), this._touchSupported = "ontouchstart" in document.documentElement || 0 < navigator.maxTouchPoints, this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent), this._addEventListeners()
            }
            var t = r.prototype;
            return t.next = function () {
                this._isSliding || this._slide(N)
            }, t.nextWhenVisible = function () {
                !document.hidden && p(this._element).is(":visible") && "hidden" !== p(this._element).css("visibility") && this.next()
            }, t.prev = function () {
                this._isSliding || this._slide(k)
            }, t.pause = function (t) {
                t || (this._isPaused = !0), this._element.querySelector(".carousel-item-next, .carousel-item-prev") && (m.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
            }, t.cycle = function (t) {
                t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
            }, t.to = function (t) {
                var e = this;
                this._activeElement = this._element.querySelector(I);
                var n = this._getItemIndex(this._activeElement);
                if (!(t > this._items.length - 1 || t < 0))
                    if (this._isSliding) p(this._element).one(O, function () {
                        return e.to(t)
                    });
                    else {
                        if (n === t) return this.pause(), void this.cycle();
                        var i = n < t ? N : k;
                        this._slide(i, this._items[t])
                    }
            }, t.dispose = function () {
                p(this._element).off(T), p.removeData(this._element, w), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
            }, t._getConfig = function (t) {
                return t = l(l({}, S), t), m.typeCheckConfig(E, t, D), t
            }, t._handleSwipe = function () {
                var t, e = Math.abs(this.touchDeltaX);
                e <= 40 || (t = e / this.touchDeltaX, (this.touchDeltaX = 0) < t && this.prev(), t < 0 && this.next())
            }, t._addEventListeners = function () {
                var e = this;
                this._config.keyboard && p(this._element).on("keydown.bs.carousel", function (t) {
                    return e._keydown(t)
                }), "hover" === this._config.pause && p(this._element).on("mouseenter.bs.carousel", function (t) {
                    return e.pause(t)
                }).on("mouseleave.bs.carousel", function (t) {
                    return e.cycle(t)
                }), this._config.touch && this._addTouchEventListeners()
            }, t._addTouchEventListeners = function () {
                var t, e, n = this;
                this._touchSupported && (t = function (t) {
                    n._pointerEvent && x[t.originalEvent.pointerType.toUpperCase()] ? n.touchStartX = t.originalEvent.clientX : n._pointerEvent || (n.touchStartX = t.originalEvent.touches[0].clientX)
                }, e = function (t) {
                    n._pointerEvent && x[t.originalEvent.pointerType.toUpperCase()] && (n.touchDeltaX = t.originalEvent.clientX - n.touchStartX), n._handleSwipe(), "hover" === n._config.pause && (n.pause(), n.touchTimeout && clearTimeout(n.touchTimeout), n.touchTimeout = setTimeout(function (t) {
                        return n.cycle(t)
                    }, 500 + n._config.interval))
                }, p(this._element.querySelectorAll(".carousel-item img")).on("dragstart.bs.carousel", function (t) {
                    return t.preventDefault()
                }), this._pointerEvent ? (p(this._element).on("pointerdown.bs.carousel", t), p(this._element).on("pointerup.bs.carousel", e), this._element.classList.add("pointer-event")) : (p(this._element).on("touchstart.bs.carousel", t), p(this._element).on("touchmove.bs.carousel", function (t) {
                    var e;
                    (e = t).originalEvent.touches && 1 < e.originalEvent.touches.length ? n.touchDeltaX = 0 : n.touchDeltaX = e.originalEvent.touches[0].clientX - n.touchStartX
                }), p(this._element).on("touchend.bs.carousel", e)))
            }, t._keydown = function (t) {
                if (!/input|textarea/i.test(t.target.tagName)) switch (t.which) {
                    case 37:
                        t.preventDefault(), this.prev();
                        break;
                    case 39:
                        t.preventDefault(), this.next()
                }
            }, t._getItemIndex = function (t) {
                return this._items = t && t.parentNode ? [].slice.call(t.parentNode.querySelectorAll(".carousel-item")) : [], this._items.indexOf(t)
            }, t._getItemByDirection = function (t, e) {
                var n = t === N,
                    i = t === k,
                    o = this._getItemIndex(e),
                    r = this._items.length - 1;
                if ((i && 0 === o || n && o === r) && !this._config.wrap) return e;
                var s = (o + (t === k ? -1 : 1)) % this._items.length;
                return -1 == s ? this._items[this._items.length - 1] : this._items[s]
            }, t._triggerSlideEvent = function (t, e) {
                var n = this._getItemIndex(t),
                    i = this._getItemIndex(this._element.querySelector(I)),
                    o = p.Event("slide.bs.carousel", {
                        relatedTarget: t,
                        direction: e,
                        from: i,
                        to: n
                    });
                return p(this._element).trigger(o), o
            }, t._setActiveIndicatorElement = function (t) {
                var e, n;
                this._indicatorsElement && (e = [].slice.call(this._indicatorsElement.querySelectorAll(".active")), p(e).removeClass(A), (n = this._indicatorsElement.children[this._getItemIndex(t)]) && p(n).addClass(A))
            }, t._slide = function (t, e) {
                var n, i, o, r, s, a = this,
                    l = this._element.querySelector(I),
                    c = this._getItemIndex(l),
                    h = e || l && this._getItemByDirection(t, l),
                    u = this._getItemIndex(h),
                    f = Boolean(this._interval),
                    d = t === N ? (n = "carousel-item-left", i = "carousel-item-next", "left") : (n = "carousel-item-right", i = "carousel-item-prev", "right");
                h && p(h).hasClass(A) ? this._isSliding = !1 : this._triggerSlideEvent(h, d).isDefaultPrevented() || l && h && (this._isSliding = !0, f && this.pause(), this._setActiveIndicatorElement(h), o = p.Event(O, {
                    relatedTarget: h,
                    direction: d,
                    from: c,
                    to: u
                }), p(this._element).hasClass("slide") ? (p(h).addClass(i), m.reflow(h), p(l).addClass(n), p(h).addClass(n), (r = parseInt(h.getAttribute("data-interval"), 10)) ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, this._config.interval = r) : this._config.interval = this._config.defaultInterval || this._config.interval, s = m.getTransitionDurationFromElement(l), p(l).one(m.TRANSITION_END, function () {
                    p(h).removeClass(n + " " + i).addClass(A), p(l).removeClass(A + " " + i + " " + n), a._isSliding = !1, setTimeout(function () {
                        return p(a._element).trigger(o)
                    }, 0)
                }).emulateTransitionEnd(s)) : (p(l).removeClass(A), p(h).addClass(A), this._isSliding = !1, p(this._element).trigger(o)), f && this.cycle())
            }, r._jQueryInterface = function (i) {
                return this.each(function () {
                    var t = p(this).data(w),
                        e = l(l({}, S), p(this).data());
                    "object" === _typeof(i) && (e = l(l({}, e), i));
                    var n = "string" == typeof i ? i : e.slide;
                    if (t || (t = new r(this, e), p(this).data(w, t)), "number" == typeof i) t.to(i);
                    else if ("string" == typeof n) {
                        if (void 0 === t[n]) throw new TypeError('No method named "' + n + '"');
                        t[n]()
                    } else e.interval && e.ride && (t.pause(), t.cycle())
                })
            }, r._dataApiClickHandler = function (t) {
                var e, n, i, o = m.getSelectorFromElement(this);
                !o || (e = p(o)[0]) && p(e).hasClass("carousel") && (n = l(l({}, p(e).data()), p(this).data()), (i = this.getAttribute("data-slide-to")) && (n.interval = !1), r._jQueryInterface.call(p(e), n), i && p(e).data(w).to(i), t.preventDefault())
            }, s(r, null, [{
                key: "VERSION",
                get: function () {
                    return "4.5.0"
                }
            }, {
                key: "Default",
                get: function () {
                    return S
                }
            }]), r
        }();
    p(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", j._dataApiClickHandler), p(window).on("load.bs.carousel.data-api", function () {
        for (var t = [].slice.call(document.querySelectorAll('[data-ride="carousel"]')), e = 0, n = t.length; e < n; e++) {
            var i = p(t[e]);
            j._jQueryInterface.call(i, i.data())
        }
    }), p.fn[E] = j._jQueryInterface, p.fn[E].Constructor = j, p.fn[E].noConflict = function () {
        return p.fn[E] = C, j._jQueryInterface
    };
    var L = "collapse",
        P = "bs.collapse",
        F = p.fn[L],
        R = {
            toggle: !0,
            parent: ""
        },
        B = {
            toggle: "boolean",
            parent: "(string|element)"
        },
        M = "show",
        q = "collapse",
        H = "collapsing",
        Q = "collapsed",
        W = '[data-toggle="collapse"]',
        U = function () {
            function a(e, t) {
                this._isTransitioning = !1, this._element = e, this._config = this._getConfig(t), this._triggerArray = [].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'));
                for (var n = [].slice.call(document.querySelectorAll(W)), i = 0, o = n.length; i < o; i++) {
                    var r = n[i],
                        s = m.getSelectorFromElement(r),
                        a = [].slice.call(document.querySelectorAll(s)).filter(function (t) {
                            return t === e
                        });
                    null !== s && 0 < a.length && (this._selector = s, this._triggerArray.push(r))
                }
                this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
            }
            var t = a.prototype;
            return t.toggle = function () {
                p(this._element).hasClass(M) ? this.hide() : this.show()
            }, t.show = function () {
                var t, e, n, i, o, r, s = this;
                this._isTransitioning || p(this._element).hasClass(M) || (this._parent && 0 === (t = [].slice.call(this._parent.querySelectorAll(".show, .collapsing")).filter(function (t) {
                    return "string" == typeof s._config.parent ? t.getAttribute("data-parent") === s._config.parent : t.classList.contains(q)
                })).length && (t = null), t && (e = p(t).not(this._selector).data(P)) && e._isTransitioning || (n = p.Event("show.bs.collapse"), p(this._element).trigger(n), n.isDefaultPrevented() || (t && (a._jQueryInterface.call(p(t).not(this._selector), "hide"), e || p(t).data(P, null)), i = this._getDimension(), p(this._element).removeClass(q).addClass(H), this._element.style[i] = 0, this._triggerArray.length && p(this._triggerArray).removeClass(Q).attr("aria-expanded", !0), this.setTransitioning(!0), o = "scroll" + (i[0].toUpperCase() + i.slice(1)), r = m.getTransitionDurationFromElement(this._element), p(this._element).one(m.TRANSITION_END, function () {
                    p(s._element).removeClass(H).addClass(q + " " + M), s._element.style[i] = "", s.setTransitioning(!1), p(s._element).trigger("shown.bs.collapse")
                }).emulateTransitionEnd(r), this._element.style[i] = this._element[o] + "px")))
            }, t.hide = function () {
                var t = this;
                if (!this._isTransitioning && p(this._element).hasClass(M)) {
                    var e = p.Event("hide.bs.collapse");
                    if (p(this._element).trigger(e), !e.isDefaultPrevented()) {
                        var n = this._getDimension();
                        this._element.style[n] = this._element.getBoundingClientRect()[n] + "px", m.reflow(this._element), p(this._element).addClass(H).removeClass(q + " " + M);
                        var i = this._triggerArray.length;
                        if (0 < i)
                            for (var o = 0; o < i; o++) {
                                var r = this._triggerArray[o],
                                    s = m.getSelectorFromElement(r);
                                null !== s && (p([].slice.call(document.querySelectorAll(s))).hasClass(M) || p(r).addClass(Q).attr("aria-expanded", !1))
                            }
                        this.setTransitioning(!0);
                        this._element.style[n] = "";
                        var a = m.getTransitionDurationFromElement(this._element);
                        p(this._element).one(m.TRANSITION_END, function () {
                            t.setTransitioning(!1), p(t._element).removeClass(H).addClass(q).trigger("hidden.bs.collapse")
                        }).emulateTransitionEnd(a)
                    }
                }
            }, t.setTransitioning = function (t) {
                this._isTransitioning = t
            }, t.dispose = function () {
                p.removeData(this._element, P), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
            }, t._getConfig = function (t) {
                return (t = l(l({}, R), t)).toggle = Boolean(t.toggle), m.typeCheckConfig(L, t, B), t
            }, t._getDimension = function () {
                return p(this._element).hasClass("width") ? "width" : "height"
            }, t._getParent = function () {
                var t, n = this;
                m.isElement(this._config.parent) ? (t = this._config.parent, void 0 !== this._config.parent.jquery && (t = this._config.parent[0])) : t = document.querySelector(this._config.parent);
                var e = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]',
                    i = [].slice.call(t.querySelectorAll(e));
                return p(i).each(function (t, e) {
                    n._addAriaAndCollapsedClass(a._getTargetFromElement(e), [e])
                }), t
            }, t._addAriaAndCollapsedClass = function (t, e) {
                var n = p(t).hasClass(M);
                e.length && p(e).toggleClass(Q, !n).attr("aria-expanded", n)
            }, a._getTargetFromElement = function (t) {
                var e = m.getSelectorFromElement(t);
                return e ? document.querySelector(e) : null
            }, a._jQueryInterface = function (i) {
                return this.each(function () {
                    var t = p(this),
                        e = t.data(P),
                        n = l(l(l({}, R), t.data()), "object" === _typeof(i) && i ? i : {});
                    if (!e && n.toggle && "string" == typeof i && /show|hide/.test(i) && (n.toggle = !1), e || (e = new a(this, n), t.data(P, e)), "string" == typeof i) {
                        if (void 0 === e[i]) throw new TypeError('No method named "' + i + '"');
                        e[i]()
                    }
                })
            }, s(a, null, [{
                key: "VERSION",
                get: function () {
                    return "4.5.0"
                }
            }, {
                key: "Default",
                get: function () {
                    return R
                }
            }]), a
        }();
    p(document).on("click.bs.collapse.data-api", W, function (t) {
        "A" === t.currentTarget.tagName && t.preventDefault();
        var n = p(this),
            e = m.getSelectorFromElement(this),
            i = [].slice.call(document.querySelectorAll(e));
        p(i).each(function () {
            var t = p(this),
                e = t.data(P) ? "toggle" : n.data();
            U._jQueryInterface.call(t, e)
        })
    }), p.fn[L] = U._jQueryInterface, p.fn[L].Constructor = U, p.fn[L].noConflict = function () {
        return p.fn[L] = F, U._jQueryInterface
    };
    var V = "undefined" != typeof window && "undefined" != typeof document && "undefined" != typeof navigator,
        Y = function () {
            for (var t = ["Edge", "Trident", "Firefox"], e = 0; e < t.length; e += 1)
                if (V && 0 <= navigator.userAgent.indexOf(t[e])) return 1;
            return 0
        }();
    var z = V && window.Promise ? function (t) {
        var e = !1;
        return function () {
            e || (e = !0, window.Promise.resolve().then(function () {
                e = !1, t()
            }))
        }
    } : function (t) {
        var e = !1;
        return function () {
            e || (e = !0, setTimeout(function () {
                e = !1, t()
            }, Y))
        }
    };

    function X(t) {
        return t && "[object Function]" === {}.toString.call(t)
    }

    function K(t, e) {
        if (1 !== t.nodeType) return [];
        var n = t.ownerDocument.defaultView.getComputedStyle(t, null);
        return e ? n[e] : n
    }

    function $(t) {
        return "HTML" === t.nodeName ? t : t.parentNode || t.host
    }

    function G(t) {
        if (!t) return document.body;
        switch (t.nodeName) {
            case "HTML":
            case "BODY":
                return t.ownerDocument.body;
            case "#document":
                return t.body
        }
        var e = K(t),
            n = e.overflow,
            i = e.overflowX,
            o = e.overflowY;
        return /(auto|scroll|overlay)/.test(n + o + i) ? t : G($(t))
    }

    function J(t) {
        return t && t.referenceNode ? t.referenceNode : t
    }
    var Z = V && !(!window.MSInputMethodContext || !document.documentMode),
        tt = V && /MSIE 10/.test(navigator.userAgent);

    function et(t) {
        return 11 === t ? Z : 10 !== t && Z || tt
    }

    function nt(t) {
        if (!t) return document.documentElement;
        for (var e = et(10) ? document.body : null, n = t.offsetParent || null; n === e && t.nextElementSibling;) n = (t = t.nextElementSibling).offsetParent;
        var i = n && n.nodeName;
        return i && "BODY" !== i && "HTML" !== i ? -1 !== ["TH", "TD", "TABLE"].indexOf(n.nodeName) && "static" === K(n, "position") ? nt(n) : n : t ? t.ownerDocument.documentElement : document.documentElement
    }

    function it(t) {
        return null !== t.parentNode ? it(t.parentNode) : t
    }

    function ot(t, e) {
        if (!(t && t.nodeType && e && e.nodeType)) return document.documentElement;
        var n = t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING,
            i = n ? t : e,
            o = n ? e : t,
            r = document.createRange();
        r.setStart(i, 0), r.setEnd(o, 0);
        var s, a, l = r.commonAncestorContainer;
        if (t !== l && e !== l || i.contains(o)) return "BODY" === (a = (s = l).nodeName) || "HTML" !== a && nt(s.firstElementChild) !== s ? nt(l) : l;
        var c = it(t);
        return c.host ? ot(c.host, e) : ot(t, it(e).host)
    }

    function rt(t, e) {
        var n = "top" === (1 < arguments.length && void 0 !== e ? e : "top") ? "scrollTop" : "scrollLeft",
            i = t.nodeName;
        if ("BODY" !== i && "HTML" !== i) return t[n];
        var o = t.ownerDocument.documentElement;
        return (t.ownerDocument.scrollingElement || o)[n]
    }

    function st(t, e) {
        var n = "x" === e ? "Left" : "Top",
            i = "Left" == n ? "Right" : "Bottom";
        return parseFloat(t["border" + n + "Width"], 10) + parseFloat(t["border" + i + "Width"], 10)
    }

    function at(t, e, n, i) {
        return Math.max(e["offset" + t], e["scroll" + t], n["client" + t], n["offset" + t], n["scroll" + t], et(10) ? parseInt(n["offset" + t]) + parseInt(i["margin" + ("Height" === t ? "Top" : "Left")]) + parseInt(i["margin" + ("Height" === t ? "Bottom" : "Right")]) : 0)
    }

    function lt(t) {
        var e = t.body,
            n = t.documentElement,
            i = et(10) && getComputedStyle(n);
        return {
            height: at("Height", e, n, i),
            width: at("Width", e, n, i)
        }
    }
    var ct = function (t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        },
        ht = function (t, e, n) {
            return e && ut(t.prototype, e), n && ut(t, n), t
        };

    function ut(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
        }
    }

    function ft(t, e, n) {
        return e in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n, t
    }
    var dt = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i])
        }
        return t
    };

    function pt(t) {
        return dt({}, t, {
            right: t.left + t.width,
            bottom: t.top + t.height
        })
    }

    function mt(t) {
        var e, n, i = {};
        try {
            et(10) ? (i = t.getBoundingClientRect(), e = rt(t, "top"), n = rt(t, "left"), i.top += e, i.left += n, i.bottom += e, i.right += n) : i = t.getBoundingClientRect()
        } catch (t) {}
        var o, r = {
                left: i.left,
                top: i.top,
                width: i.right - i.left,
                height: i.bottom - i.top
            },
            s = "HTML" === t.nodeName ? lt(t.ownerDocument) : {},
            a = s.width || t.clientWidth || r.width,
            l = s.height || t.clientHeight || r.height,
            c = t.offsetWidth - a,
            h = t.offsetHeight - l;
        return (c || h) && (c -= st(o = K(t), "x"), h -= st(o, "y"), r.width -= c, r.height -= h), pt(r)
    }

    function gt(t, e, n) {
        var i = 2 < arguments.length && void 0 !== n && n,
            o = et(10),
            r = "HTML" === e.nodeName,
            s = mt(t),
            a = mt(e),
            l = G(t),
            c = K(e),
            h = parseFloat(c.borderTopWidth, 10),
            u = parseFloat(c.borderLeftWidth, 10);
        i && r && (a.top = Math.max(a.top, 0), a.left = Math.max(a.left, 0));
        var f, d, p = pt({
            top: s.top - a.top - h,
            left: s.left - a.left - u,
            width: s.width,
            height: s.height
        });
        return p.marginTop = 0, p.marginLeft = 0, !o && r && (f = parseFloat(c.marginTop, 10), d = parseFloat(c.marginLeft, 10), p.top -= h - f, p.bottom -= h - f, p.left -= u - d, p.right -= u - d, p.marginTop = f, p.marginLeft = d), (o && !i ? e.contains(l) : e === l && "BODY" !== l.nodeName) && (p = function (t, e, n) {
            var i = 2 < arguments.length && void 0 !== n && n,
                o = rt(e, "top"),
                r = rt(e, "left"),
                s = i ? -1 : 1;
            return t.top += o * s, t.bottom += o * s, t.left += r * s, t.right += r * s, t
        }(p, e)), p
    }

    function _t(t) {
        if (!t || !t.parentElement || et()) return document.documentElement;
        for (var e = t.parentElement; e && "none" === K(e, "transform");) e = e.parentElement;
        return e || document.documentElement
    }

    function vt(t, e, n, i, o) {
        var r, s, a, l, c, h = 4 < arguments.length && void 0 !== o && o,
            u = {
                top: 0,
                left: 0
            },
            f = h ? _t(t) : ot(t, J(e));
        "viewport" === i ? u = function (t, e) {
            var n = 1 < arguments.length && void 0 !== e && e,
                i = t.ownerDocument.documentElement,
                o = gt(t, i),
                r = Math.max(i.clientWidth, window.innerWidth || 0),
                s = Math.max(i.clientHeight, window.innerHeight || 0),
                a = n ? 0 : rt(i),
                l = n ? 0 : rt(i, "left");
            return pt({
                top: a - o.top + o.marginTop,
                left: l - o.left + o.marginLeft,
                width: r,
                height: s
            })
        }(f, h) : (r = void 0, "scrollParent" === i ? "BODY" === (r = G($(e))).nodeName && (r = t.ownerDocument.documentElement) : r = "window" === i ? t.ownerDocument.documentElement : i, s = gt(r, f, h), "HTML" !== r.nodeName || function t(e) {
            var n = e.nodeName;
            if ("BODY" === n || "HTML" === n) return !1;
            if ("fixed" === K(e, "position")) return !0;
            var i = $(e);
            return !!i && t(i)
        }(f) ? u = s : (l = (a = lt(t.ownerDocument)).height, c = a.width, u.top += s.top - s.marginTop, u.bottom = l + s.top, u.left += s.left - s.marginLeft, u.right = c + s.left));
        var d = "number" == typeof (n = n || 0);
        return u.left += d ? n : n.left || 0, u.top += d ? n : n.top || 0, u.right -= d ? n : n.right || 0, u.bottom -= d ? n : n.bottom || 0, u
    }

    function yt(t, e, i, n, o, r) {
        var s = 5 < arguments.length && void 0 !== r ? r : 0;
        if (-1 === t.indexOf("auto")) return t;
        var a = vt(i, n, s, o),
            l = {
                top: {
                    width: a.width,
                    height: e.top - a.top
                },
                right: {
                    width: a.right - e.right,
                    height: a.height
                },
                bottom: {
                    width: a.width,
                    height: a.bottom - e.bottom
                },
                left: {
                    width: e.left - a.left,
                    height: a.height
                }
            },
            c = Object.keys(l).map(function (t) {
                return dt({
                    key: t
                }, l[t], {
                    area: (e = l[t]).width * e.height
                });
                var e
            }).sort(function (t, e) {
                return e.area - t.area
            }),
            h = c.filter(function (t) {
                var e = t.width,
                    n = t.height;
                return e >= i.clientWidth && n >= i.clientHeight
            }),
            u = 0 < h.length ? h[0].key : c[0].key,
            f = t.split("-")[1];
        return u + (f ? "-" + f : "")
    }

    function bt(t, e, n, i) {
        var o = 3 < arguments.length && void 0 !== i ? i : null;
        return gt(n, o ? _t(e) : ot(e, J(n)), o)
    }

    function Et(t) {
        var e = t.ownerDocument.defaultView.getComputedStyle(t),
            n = parseFloat(e.marginTop || 0) + parseFloat(e.marginBottom || 0),
            i = parseFloat(e.marginLeft || 0) + parseFloat(e.marginRight || 0);
        return {
            width: t.offsetWidth + i,
            height: t.offsetHeight + n
        }
    }

    function wt(t) {
        var e = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom"
        };
        return t.replace(/left|right|bottom|top/g, function (t) {
            return e[t]
        })
    }

    function Tt(t, e, n) {
        n = n.split("-")[0];
        var i = Et(t),
            o = {
                width: i.width,
                height: i.height
            },
            r = -1 !== ["right", "left"].indexOf(n),
            s = r ? "top" : "left",
            a = r ? "left" : "top",
            l = r ? "height" : "width",
            c = r ? "width" : "height";
        return o[s] = e[s] + e[l] / 2 - i[l] / 2, o[a] = n === a ? e[a] - i[c] : e[wt(a)], o
    }

    function Ct(t, e) {
        return Array.prototype.find ? t.find(e) : t.filter(e)[0]
    }

    function St(t, n, e) {
        return (void 0 === e ? t : t.slice(0, function (t, e, n) {
            if (Array.prototype.findIndex) return t.findIndex(function (t) {
                return t[e] === n
            });
            var i = Ct(t, function (t) {
                return t[e] === n
            });
            return t.indexOf(i)
        }(t, "name", e))).forEach(function (t) {
            t.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
            var e = t.function || t.fn;
            t.enabled && X(e) && (n.offsets.popper = pt(n.offsets.popper), n.offsets.reference = pt(n.offsets.reference), n = e(n, t))
        }), n
    }

    function Dt(t, n) {
        return t.some(function (t) {
            var e = t.name;
            return t.enabled && e === n
        })
    }

    function Nt(t) {
        for (var e = [!1, "ms", "Webkit", "Moz", "O"], n = t.charAt(0).toUpperCase() + t.slice(1), i = 0; i < e.length; i++) {
            var o = e[i],
                r = o ? "" + o + n : t;
            if (void 0 !== document.body.style[r]) return r
        }
        return null
    }

    function kt(t) {
        var e = t.ownerDocument;
        return e ? e.defaultView : window
    }

    function Ot(t, e, n, i) {
        n.updateBound = i, kt(t).addEventListener("resize", n.updateBound, {
            passive: !0
        });
        var o = G(t);
        return function t(e, n, i, o) {
            var r = "BODY" === e.nodeName,
                s = r ? e.ownerDocument.defaultView : e;
            s.addEventListener(n, i, {
                passive: !0
            }), r || t(G(s.parentNode), n, i, o), o.push(s)
        }(o, "scroll", n.updateBound, n.scrollParents), n.scrollElement = o, n.eventsEnabled = !0, n
    }

    function At() {
        var t, e;
        this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = (t = this.reference, e = this.state, kt(t).removeEventListener("resize", e.updateBound), e.scrollParents.forEach(function (t) {
            t.removeEventListener("scroll", e.updateBound)
        }), e.updateBound = null, e.scrollParents = [], e.scrollElement = null, e.eventsEnabled = !1, e))
    }

    function It(t) {
        return "" !== t && !isNaN(parseFloat(t)) && isFinite(t)
    }

    function xt(n, i) {
        Object.keys(i).forEach(function (t) {
            var e = ""; - 1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(t) && It(i[t]) && (e = "px"), n.style[t] = i[t] + e
        })
    }

    function jt(t, e) {
        function n(t) {
            return t
        }
        var i = t.offsets,
            o = i.popper,
            r = i.reference,
            s = Math.round,
            a = Math.floor,
            l = s(r.width),
            c = s(o.width),
            h = -1 !== ["left", "right"].indexOf(t.placement),
            u = -1 !== t.placement.indexOf("-"),
            f = e ? h || u || l % 2 == c % 2 ? s : a : n,
            d = e ? s : n;
        return {
            left: f(l % 2 == 1 && c % 2 == 1 && !u && e ? o.left - 1 : o.left),
            top: d(o.top),
            bottom: d(o.bottom),
            right: f(o.right)
        }
    }
    var Lt = V && /Firefox/i.test(navigator.userAgent);

    function Pt(t, e, n) {
        var i, o, r = Ct(t, function (t) {
                return t.name === e
            }),
            s = !!r && t.some(function (t) {
                return t.name === n && t.enabled && t.order < r.order
            });
        return s || (i = "`" + e + "`", o = "`" + n + "`", console.warn(o + " modifier is required by " + i + " modifier in order to work, be sure to include it before " + i + "!")), s
    }
    var Ft = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
        Rt = Ft.slice(3);

    function Bt(t, e) {
        var n = 1 < arguments.length && void 0 !== e && e,
            i = Rt.indexOf(t),
            o = Rt.slice(i + 1).concat(Rt.slice(0, i));
        return n ? o.reverse() : o
    }
    var Mt = "flip",
        qt = "clockwise",
        Ht = "counterclockwise";

    function Qt(t, o, r, e) {
        var s = [0, 0],
            a = -1 !== ["right", "left"].indexOf(e),
            n = t.split(/(\+|\-)/).map(function (t) {
                return t.trim()
            }),
            i = n.indexOf(Ct(n, function (t) {
                return -1 !== t.search(/,|\s/)
            }));
        n[i] && -1 === n[i].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
        var l = /\s*,\s*|\s+/;
        return (-1 !== i ? [n.slice(0, i).concat([n[i].split(l)[0]]), [n[i].split(l)[1]].concat(n.slice(i + 1))] : [n]).map(function (t, e) {
            var n = (1 === e ? !a : a) ? "height" : "width",
                i = !1;
            return t.reduce(function (t, e) {
                return "" === t[t.length - 1] && -1 !== ["+", "-"].indexOf(e) ? (t[t.length - 1] = e, i = !0, t) : i ? (t[t.length - 1] += e, i = !1, t) : t.concat(e)
            }, []).map(function (t) {
                return function (t, e, n, i) {
                    var o = t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
                        r = +o[1],
                        s = o[2];
                    if (!r) return t;
                    if (0 !== s.indexOf("%")) return "vh" !== s && "vw" !== s ? r : ("vh" === s ? Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : Math.max(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 * r;
                    var a = void 0;
                    switch (s) {
                        case "%p":
                            a = n;
                            break;
                        case "%":
                        case "%r":
                        default:
                            a = i
                    }
                    return pt(a)[e] / 100 * r
                }(t, n, o, r)
            })
        }).forEach(function (n, i) {
            n.forEach(function (t, e) {
                It(t) && (s[i] += t * ("-" === n[e - 1] ? -1 : 1))
            })
        }), s
    }
    var Wt = {
            placement: "bottom",
            positionFixed: !1,
            eventsEnabled: !0,
            removeOnDestroy: !1,
            onCreate: function () {},
            onUpdate: function () {},
            modifiers: {
                shift: {
                    order: 100,
                    enabled: !0,
                    fn: function (t) {
                        var e, n, i, o, r, s, a, l = t.placement,
                            c = l.split("-")[0],
                            h = l.split("-")[1];
                        return h && (n = (e = t.offsets).reference, i = e.popper, s = (o = -1 !== ["bottom", "top"].indexOf(c)) ? "width" : "height", a = {
                            start: ft({}, r = o ? "left" : "top", n[r]),
                            end: ft({}, r, n[r] + n[s] - i[s])
                        }, t.offsets.popper = dt({}, i, a[h])), t
                    }
                },
                offset: {
                    order: 200,
                    enabled: !0,
                    fn: function (t, e) {
                        var n = e.offset,
                            i = t.placement,
                            o = t.offsets,
                            r = o.popper,
                            s = o.reference,
                            a = i.split("-")[0],
                            l = void 0,
                            l = It(+n) ? [+n, 0] : Qt(n, r, s, a);
                        return "left" === a ? (r.top += l[0], r.left -= l[1]) : "right" === a ? (r.top += l[0], r.left += l[1]) : "top" === a ? (r.left += l[0], r.top -= l[1]) : "bottom" === a && (r.left += l[0], r.top += l[1]), t.popper = r, t
                    },
                    offset: 0
                },
                preventOverflow: {
                    order: 300,
                    enabled: !0,
                    fn: function (t, i) {
                        var e = i.boundariesElement || nt(t.instance.popper);
                        t.instance.reference === e && (e = nt(e));
                        var n = Nt("transform"),
                            o = t.instance.popper.style,
                            r = o.top,
                            s = o.left,
                            a = o[n];
                        o.top = "", o.left = "", o[n] = "";
                        var l = vt(t.instance.popper, t.instance.reference, i.padding, e, t.positionFixed);
                        o.top = r, o.left = s, o[n] = a, i.boundaries = l;
                        var c = i.priority,
                            h = t.offsets.popper,
                            u = {
                                primary: function (t) {
                                    var e = h[t];
                                    return h[t] < l[t] && !i.escapeWithReference && (e = Math.max(h[t], l[t])), ft({}, t, e)
                                },
                                secondary: function (t) {
                                    var e = "right" === t ? "left" : "top",
                                        n = h[e];
                                    return h[t] > l[t] && !i.escapeWithReference && (n = Math.min(h[e], l[t] - ("right" === t ? h.width : h.height))), ft({}, e, n)
                                }
                            };
                        return c.forEach(function (t) {
                            var e = -1 !== ["left", "top"].indexOf(t) ? "primary" : "secondary";
                            h = dt({}, h, u[e](t))
                        }), t.offsets.popper = h, t
                    },
                    priority: ["left", "right", "top", "bottom"],
                    padding: 5,
                    boundariesElement: "scrollParent"
                },
                keepTogether: {
                    order: 400,
                    enabled: !0,
                    fn: function (t) {
                        var e = t.offsets,
                            n = e.popper,
                            i = e.reference,
                            o = t.placement.split("-")[0],
                            r = Math.floor,
                            s = -1 !== ["top", "bottom"].indexOf(o),
                            a = s ? "right" : "bottom",
                            l = s ? "left" : "top",
                            c = s ? "width" : "height";
                        return n[a] < r(i[l]) && (t.offsets.popper[l] = r(i[l]) - n[c]), n[l] > r(i[a]) && (t.offsets.popper[l] = r(i[a])), t
                    }
                },
                arrow: {
                    order: 500,
                    enabled: !0,
                    fn: function (t, e) {
                        var n;
                        if (!Pt(t.instance.modifiers, "arrow", "keepTogether")) return t;
                        var i = e.element;
                        if ("string" == typeof i) {
                            if (!(i = t.instance.popper.querySelector(i))) return t
                        } else if (!t.instance.popper.contains(i)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), t;
                        var o = t.placement.split("-")[0],
                            r = t.offsets,
                            s = r.popper,
                            a = r.reference,
                            l = -1 !== ["left", "right"].indexOf(o),
                            c = l ? "height" : "width",
                            h = l ? "Top" : "Left",
                            u = h.toLowerCase(),
                            f = l ? "left" : "top",
                            d = l ? "bottom" : "right",
                            p = Et(i)[c];
                        a[d] - p < s[u] && (t.offsets.popper[u] -= s[u] - (a[d] - p)), a[u] + p > s[d] && (t.offsets.popper[u] += a[u] + p - s[d]), t.offsets.popper = pt(t.offsets.popper);
                        var m = a[u] + a[c] / 2 - p / 2,
                            g = K(t.instance.popper),
                            _ = parseFloat(g["margin" + h], 10),
                            v = parseFloat(g["border" + h + "Width"], 10),
                            y = m - t.offsets.popper[u] - _ - v,
                            y = Math.max(Math.min(s[c] - p, y), 0);
                        return t.arrowElement = i, t.offsets.arrow = (ft(n = {}, u, Math.round(y)), ft(n, f, ""), n), t
                    },
                    element: "[x-arrow]"
                },
                flip: {
                    order: 600,
                    enabled: !0,
                    fn: function (g, _) {
                        if (Dt(g.instance.modifiers, "inner")) return g;
                        if (g.flipped && g.placement === g.originalPlacement) return g;
                        var v = vt(g.instance.popper, g.instance.reference, _.padding, _.boundariesElement, g.positionFixed),
                            y = g.placement.split("-")[0],
                            b = wt(y),
                            E = g.placement.split("-")[1] || "",
                            w = [];
                        switch (_.behavior) {
                            case Mt:
                                w = [y, b];
                                break;
                            case qt:
                                w = Bt(y);
                                break;
                            case Ht:
                                w = Bt(y, !0);
                                break;
                            default:
                                w = _.behavior
                        }
                        return w.forEach(function (t, e) {
                            if (y !== t || w.length === e + 1) return g;
                            y = g.placement.split("-")[0], b = wt(y);
                            var n, i = g.offsets.popper,
                                o = g.offsets.reference,
                                r = Math.floor,
                                s = "left" === y && r(i.right) > r(o.left) || "right" === y && r(i.left) < r(o.right) || "top" === y && r(i.bottom) > r(o.top) || "bottom" === y && r(i.top) < r(o.bottom),
                                a = r(i.left) < r(v.left),
                                l = r(i.right) > r(v.right),
                                c = r(i.top) < r(v.top),
                                h = r(i.bottom) > r(v.bottom),
                                u = "left" === y && a || "right" === y && l || "top" === y && c || "bottom" === y && h,
                                f = -1 !== ["top", "bottom"].indexOf(y),
                                d = !!_.flipVariations && (f && "start" === E && a || f && "end" === E && l || !f && "start" === E && c || !f && "end" === E && h),
                                p = !!_.flipVariationsByContent && (f && "start" === E && l || f && "end" === E && a || !f && "start" === E && h || !f && "end" === E && c),
                                m = d || p;
                            (s || u || m) && (g.flipped = !0, (s || u) && (y = w[e + 1]), m && (E = "end" === (n = E) ? "start" : "start" === n ? "end" : n), g.placement = y + (E ? "-" + E : ""), g.offsets.popper = dt({}, g.offsets.popper, Tt(g.instance.popper, g.offsets.reference, g.placement)), g = St(g.instance.modifiers, g, "flip"))
                        }), g
                    },
                    behavior: "flip",
                    padding: 5,
                    boundariesElement: "viewport",
                    flipVariations: !1,
                    flipVariationsByContent: !1
                },
                inner: {
                    order: 700,
                    enabled: !1,
                    fn: function (t) {
                        var e = t.placement,
                            n = e.split("-")[0],
                            i = t.offsets,
                            o = i.popper,
                            r = i.reference,
                            s = -1 !== ["left", "right"].indexOf(n),
                            a = -1 === ["top", "left"].indexOf(n);
                        return o[s ? "left" : "top"] = r[n] - (a ? o[s ? "width" : "height"] : 0), t.placement = wt(e), t.offsets.popper = pt(o), t
                    }
                },
                hide: {
                    order: 800,
                    enabled: !0,
                    fn: function (t) {
                        if (!Pt(t.instance.modifiers, "hide", "preventOverflow")) return t;
                        var e = t.offsets.reference,
                            n = Ct(t.instance.modifiers, function (t) {
                                return "preventOverflow" === t.name
                            }).boundaries;
                        if (e.bottom < n.top || e.left > n.right || e.top > n.bottom || e.right < n.left) {
                            if (!0 === t.hide) return t;
                            t.hide = !0, t.attributes["x-out-of-boundaries"] = ""
                        } else {
                            if (!1 === t.hide) return t;
                            t.hide = !1, t.attributes["x-out-of-boundaries"] = !1
                        }
                        return t
                    }
                },
                computeStyle: {
                    order: 850,
                    enabled: !0,
                    fn: function (t, e) {
                        var n = e.x,
                            i = e.y,
                            o = t.offsets.popper,
                            r = Ct(t.instance.modifiers, function (t) {
                                return "applyStyle" === t.name
                            }).gpuAcceleration;
                        void 0 !== r && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
                        var s, a, l = void 0 !== r ? r : e.gpuAcceleration,
                            c = nt(t.instance.popper),
                            h = mt(c),
                            u = {
                                position: o.position
                            },
                            f = jt(t, window.devicePixelRatio < 2 || !Lt),
                            d = "bottom" === n ? "top" : "bottom",
                            p = "right" === i ? "left" : "right",
                            m = Nt("transform"),
                            g = void 0,
                            _ = void 0,
                            _ = "bottom" == d ? "HTML" === c.nodeName ? -c.clientHeight + f.bottom : -h.height + f.bottom : f.top,
                            g = "right" == p ? "HTML" === c.nodeName ? -c.clientWidth + f.right : -h.width + f.right : f.left;
                        l && m ? (u[m] = "translate3d(" + g + "px, " + _ + "px, 0)", u[d] = 0, u[p] = 0, u.willChange = "transform") : (s = "bottom" == d ? -1 : 1, a = "right" == p ? -1 : 1, u[d] = _ * s, u[p] = g * a, u.willChange = d + ", " + p);
                        var v = {
                            "x-placement": t.placement
                        };
                        return t.attributes = dt({}, v, t.attributes), t.styles = dt({}, u, t.styles), t.arrowStyles = dt({}, t.offsets.arrow, t.arrowStyles), t
                    },
                    gpuAcceleration: !0,
                    x: "bottom",
                    y: "right"
                },
                applyStyle: {
                    order: 900,
                    enabled: !0,
                    fn: function (t) {
                        var e, n;
                        return xt(t.instance.popper, t.styles), e = t.instance.popper, n = t.attributes, Object.keys(n).forEach(function (t) {
                            !1 !== n[t] ? e.setAttribute(t, n[t]) : e.removeAttribute(t)
                        }), t.arrowElement && Object.keys(t.arrowStyles).length && xt(t.arrowElement, t.arrowStyles), t
                    },
                    onLoad: function (t, e, n, i, o) {
                        var r = bt(o, e, t, n.positionFixed),
                            s = yt(n.placement, r, e, t, n.modifiers.flip.boundariesElement, n.modifiers.flip.padding);
                        return e.setAttribute("x-placement", s), xt(e, {
                            position: n.positionFixed ? "fixed" : "absolute"
                        }), n
                    },
                    gpuAcceleration: void 0
                }
            }
        },
        Ut = (ht(Vt, [{
            key: "update",
            value: function () {
                return function () {
                    var t;
                    this.state.isDestroyed || ((t = {
                        instance: this,
                        styles: {},
                        arrowStyles: {},
                        attributes: {},
                        flipped: !1,
                        offsets: {}
                    }).offsets.reference = bt(this.state, this.popper, this.reference, this.options.positionFixed), t.placement = yt(this.options.placement, t.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), t.originalPlacement = t.placement, t.positionFixed = this.options.positionFixed, t.offsets.popper = Tt(this.popper, t.offsets.reference, t.placement), t.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute", t = St(this.modifiers, t), this.state.isCreated ? this.options.onUpdate(t) : (this.state.isCreated = !0, this.options.onCreate(t)))
                }.call(this)
            }
        }, {
            key: "destroy",
            value: function () {
                return function () {
                    return this.state.isDestroyed = !0, Dt(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.position = "", this.popper.style.top = "", this.popper.style.left = "", this.popper.style.right = "", this.popper.style.bottom = "", this.popper.style.willChange = "", this.popper.style[Nt("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
                }.call(this)
            }
        }, {
            key: "enableEventListeners",
            value: function () {
                return function () {
                    this.state.eventsEnabled || (this.state = Ot(this.reference, this.options, this.state, this.scheduleUpdate))
                }.call(this)
            }
        }, {
            key: "disableEventListeners",
            value: function () {
                return At.call(this)
            }
        }]), Vt);

    function Vt(t, e) {
        var n = this,
            i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
        ct(this, Vt), this.scheduleUpdate = function () {
            return requestAnimationFrame(n.update)
        }, this.update = z(this.update.bind(this)), this.options = dt({}, Vt.Defaults, i), this.state = {
            isDestroyed: !1,
            isCreated: !1,
            scrollParents: []
        }, this.reference = t && t.jquery ? t[0] : t, this.popper = e && e.jquery ? e[0] : e, this.options.modifiers = {}, Object.keys(dt({}, Vt.Defaults.modifiers, i.modifiers)).forEach(function (t) {
            n.options.modifiers[t] = dt({}, Vt.Defaults.modifiers[t] || {}, i.modifiers ? i.modifiers[t] : {})
        }), this.modifiers = Object.keys(this.options.modifiers).map(function (t) {
            return dt({
                name: t
            }, n.options.modifiers[t])
        }).sort(function (t, e) {
            return t.order - e.order
        }), this.modifiers.forEach(function (t) {
            t.enabled && X(t.onLoad) && t.onLoad(n.reference, n.popper, n.options, t, n.state)
        }), this.update();
        var o = this.options.eventsEnabled;
        o && this.enableEventListeners(), this.state.eventsEnabled = o
    }
    Ut.Utils = ("undefined" != typeof window ? window : global).PopperUtils, Ut.placements = Ft, Ut.Defaults = Wt;
    var Yt = "dropdown",
        zt = "bs.dropdown",
        Xt = "." + zt,
        Kt = ".data-api",
        $t = p.fn[Yt],
        Gt = new RegExp("38|40|27"),
        Jt = "hide" + Xt,
        Zt = "hidden" + Xt,
        te = "click" + Xt + Kt,
        ee = "keydown" + Xt + Kt,
        ne = "disabled",
        ie = "show",
        oe = "dropdown-menu-right",
        re = '[data-toggle="dropdown"]',
        se = ".dropdown-menu",
        ae = {
            offset: 0,
            flip: !0,
            boundary: "scrollParent",
            reference: "toggle",
            display: "dynamic",
            popperConfig: null
        },
        le = {
            offset: "(number|string|function)",
            flip: "boolean",
            boundary: "(string|element)",
            reference: "(string|element)",
            display: "string",
            popperConfig: "(null|object)"
        },
        ce = function () {
            function c(t, e) {
                this._element = t, this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
            }
            var t = c.prototype;
            return t.toggle = function () {
                var t;
                this._element.disabled || p(this._element).hasClass(ne) || (t = p(this._menu).hasClass(ie), c._clearMenus(), t || this.show(!0))
            }, t.show = function (t) {
                if (void 0 === t && (t = !1), !(this._element.disabled || p(this._element).hasClass(ne) || p(this._menu).hasClass(ie))) {
                    var e = {
                            relatedTarget: this._element
                        },
                        n = p.Event("show.bs.dropdown", e),
                        i = c._getParentFromElement(this._element);
                    if (p(i).trigger(n), !n.isDefaultPrevented()) {
                        if (!this._inNavbar && t) {
                            if (void 0 === Ut) throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org/)");
                            var o = this._element;
                            "parent" === this._config.reference ? o = i : m.isElement(this._config.reference) && (o = this._config.reference, void 0 !== this._config.reference.jquery && (o = this._config.reference[0])), "scrollParent" !== this._config.boundary && p(i).addClass("position-static"), this._popper = new Ut(o, this._menu, this._getPopperConfig())
                        }
                        "ontouchstart" in document.documentElement && 0 === p(i).closest(".navbar-nav").length && p(document.body).children().on("mouseover", null, p.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), p(this._menu).toggleClass(ie), p(i).toggleClass(ie).trigger(p.Event("shown.bs.dropdown", e))
                    }
                }
            }, t.hide = function () {
                var t, e, n;
                this._element.disabled || p(this._element).hasClass(ne) || !p(this._menu).hasClass(ie) || (t = {
                    relatedTarget: this._element
                }, e = p.Event(Jt, t), n = c._getParentFromElement(this._element), p(n).trigger(e), e.isDefaultPrevented() || (this._popper && this._popper.destroy(), p(this._menu).toggleClass(ie), p(n).toggleClass(ie).trigger(p.Event(Zt, t))))
            }, t.dispose = function () {
                p.removeData(this._element, zt), p(this._element).off(Xt), this._element = null, (this._menu = null) !== this._popper && (this._popper.destroy(), this._popper = null)
            }, t.update = function () {
                this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
            }, t._addEventListeners = function () {
                var e = this;
                p(this._element).on("click.bs.dropdown", function (t) {
                    t.preventDefault(), t.stopPropagation(), e.toggle()
                })
            }, t._getConfig = function (t) {
                return t = l(l(l({}, this.constructor.Default), p(this._element).data()), t), m.typeCheckConfig(Yt, t, this.constructor.DefaultType), t
            }, t._getMenuElement = function () {
                var t;
                return this._menu || (t = c._getParentFromElement(this._element)) && (this._menu = t.querySelector(se)), this._menu
            }, t._getPlacement = function () {
                var t = p(this._element.parentNode),
                    e = "bottom-start";
                return t.hasClass("dropup") ? e = p(this._menu).hasClass(oe) ? "top-end" : "top-start" : t.hasClass("dropright") ? e = "right-start" : t.hasClass("dropleft") ? e = "left-start" : p(this._menu).hasClass(oe) && (e = "bottom-end"), e
            }, t._detectNavbar = function () {
                return 0 < p(this._element).closest(".navbar").length
            }, t._getOffset = function () {
                var e = this,
                    t = {};
                return "function" == typeof this._config.offset ? t.fn = function (t) {
                    return t.offsets = l(l({}, t.offsets), e._config.offset(t.offsets, e._element) || {}), t
                } : t.offset = this._config.offset, t
            }, t._getPopperConfig = function () {
                var t = {
                    placement: this._getPlacement(),
                    modifiers: {
                        offset: this._getOffset(),
                        flip: {
                            enabled: this._config.flip
                        },
                        preventOverflow: {
                            boundariesElement: this._config.boundary
                        }
                    }
                };
                return "static" === this._config.display && (t.modifiers.applyStyle = {
                    enabled: !1
                }), l(l({}, t), this._config.popperConfig)
            }, c._jQueryInterface = function (n) {
                return this.each(function () {
                    var t = p(this).data(zt),
                        e = "object" === _typeof(n) ? n : null;
                    if (t || (t = new c(this, e), p(this).data(zt, t)), "string" == typeof n) {
                        if (void 0 === t[n]) throw new TypeError('No method named "' + n + '"');
                        t[n]()
                    }
                })
            }, c._clearMenus = function (t) {
                if (!t || 3 !== t.which && ("keyup" !== t.type || 9 === t.which))
                    for (var e = [].slice.call(document.querySelectorAll(re)), n = 0, i = e.length; n < i; n++) {
                        var o, r, s = c._getParentFromElement(e[n]),
                            a = p(e[n]).data(zt),
                            l = {
                                relatedTarget: e[n]
                            };
                        t && "click" === t.type && (l.clickEvent = t), a && (o = a._menu, p(s).hasClass(ie) && (t && ("click" === t.type && /input|textarea/i.test(t.target.tagName) || "keyup" === t.type && 9 === t.which) && p.contains(s, t.target) || (r = p.Event(Jt, l), p(s).trigger(r), r.isDefaultPrevented() || ("ontouchstart" in document.documentElement && p(document.body).children().off("mouseover", null, p.noop), e[n].setAttribute("aria-expanded", "false"), a._popper && a._popper.destroy(), p(o).removeClass(ie), p(s).removeClass(ie).trigger(p.Event(Zt, l))))))
                    }
            }, c._getParentFromElement = function (t) {
                var e, n = m.getSelectorFromElement(t);
                return n && (e = document.querySelector(n)), e || t.parentNode
            }, c._dataApiKeydownHandler = function (t) {
                if ((/input|textarea/i.test(t.target.tagName) ? !(32 === t.which || 27 !== t.which && (40 !== t.which && 38 !== t.which || p(t.target).closest(se).length)) : Gt.test(t.which)) && !this.disabled && !p(this).hasClass(ne)) {
                    var e = c._getParentFromElement(this),
                        n = p(e).hasClass(ie);
                    if (n || 27 !== t.which) {
                        if (t.preventDefault(), t.stopPropagation(), !n || n && (27 === t.which || 32 === t.which)) return 27 === t.which && p(e.querySelector(re)).trigger("focus"), void p(this).trigger("click");
                        var i, o = [].slice.call(e.querySelectorAll(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)")).filter(function (t) {
                            return p(t).is(":visible")
                        });
                        0 !== o.length && (i = o.indexOf(t.target), 38 === t.which && 0 < i && i--, 40 === t.which && i < o.length - 1 && i++, i < 0 && (i = 0), o[i].focus())
                    }
                }
            }, s(c, null, [{
                key: "VERSION",
                get: function () {
                    return "4.5.0"
                }
            }, {
                key: "Default",
                get: function () {
                    return ae
                }
            }, {
                key: "DefaultType",
                get: function () {
                    return le
                }
            }]), c
        }();
    p(document).on(ee, re, ce._dataApiKeydownHandler).on(ee, se, ce._dataApiKeydownHandler).on(te + " keyup.bs.dropdown.data-api", ce._clearMenus).on(te, re, function (t) {
        t.preventDefault(), t.stopPropagation(), ce._jQueryInterface.call(p(this), "toggle")
    }).on(te, ".dropdown form", function (t) {
        t.stopPropagation()
    }), p.fn[Yt] = ce._jQueryInterface, p.fn[Yt].Constructor = ce, p.fn[Yt].noConflict = function () {
        return p.fn[Yt] = $t, ce._jQueryInterface
    };
    var he = "modal",
        ue = "bs.modal",
        fe = "." + ue,
        de = p.fn[he],
        pe = {
            backdrop: !0,
            keyboard: !0,
            focus: !0,
            show: !0
        },
        me = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            focus: "boolean",
            show: "boolean"
        },
        ge = "hidden" + fe,
        _e = "show" + fe,
        ve = "focusin" + fe,
        ye = "resize" + fe,
        be = "click.dismiss" + fe,
        Ee = "keydown.dismiss" + fe,
        we = "mousedown.dismiss" + fe,
        Te = "modal-open",
        Ce = "fade",
        Se = "show",
        De = "modal-static",
        Ne = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
        ke = ".sticky-top",
        Oe = function () {
            function o(t, e) {
                this._config = this._getConfig(e), this._element = t, this._dialog = t.querySelector(".modal-dialog"), this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._scrollbarWidth = 0
            }
            var t = o.prototype;
            return t.toggle = function (t) {
                return this._isShown ? this.hide() : this.show(t)
            }, t.show = function (t) {
                var e, n = this;
                this._isShown || this._isTransitioning || (p(this._element).hasClass(Ce) && (this._isTransitioning = !0), e = p.Event(_e, {
                    relatedTarget: t
                }), p(this._element).trigger(e), this._isShown || e.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), p(this._element).on(be, '[data-dismiss="modal"]', function (t) {
                    return n.hide(t)
                }), p(this._dialog).on(we, function () {
                    p(n._element).one("mouseup.dismiss.bs.modal", function (t) {
                        p(t.target).is(n._element) && (n._ignoreBackdropClick = !0)
                    })
                }), this._showBackdrop(function () {
                    return n._showElement(t)
                })))
            }, t.hide = function (t) {
                var e, n, i, o = this;
                t && t.preventDefault(), this._isShown && !this._isTransitioning && (e = p.Event("hide.bs.modal"), p(this._element).trigger(e), this._isShown && !e.isDefaultPrevented() && (this._isShown = !1, (n = p(this._element).hasClass(Ce)) && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), p(document).off(ve), p(this._element).removeClass(Se), p(this._element).off(be), p(this._dialog).off(we), n ? (i = m.getTransitionDurationFromElement(this._element), p(this._element).one(m.TRANSITION_END, function (t) {
                    return o._hideModal(t)
                }).emulateTransitionEnd(i)) : this._hideModal()))
            }, t.dispose = function () {
                [window, this._element, this._dialog].forEach(function (t) {
                    return p(t).off(fe)
                }), p(document).off(ve), p.removeData(this._element, ue), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._isTransitioning = null, this._scrollbarWidth = null
            }, t.handleUpdate = function () {
                this._adjustDialog()
            }, t._getConfig = function (t) {
                return t = l(l({}, pe), t), m.typeCheckConfig(he, t, me), t
            }, t._triggerBackdropTransition = function () {
                var t = this;
                if ("static" === this._config.backdrop) {
                    var e = p.Event("hidePrevented.bs.modal");
                    if (p(this._element).trigger(e), e.defaultPrevented) return;
                    this._element.classList.add(De);
                    var n = m.getTransitionDurationFromElement(this._element);
                    p(this._element).one(m.TRANSITION_END, function () {
                        t._element.classList.remove(De)
                    }).emulateTransitionEnd(n), this._element.focus()
                } else this.hide()
            }, t._showElement = function (t) {
                var e = this,
                    n = p(this._element).hasClass(Ce),
                    i = this._dialog ? this._dialog.querySelector(".modal-body") : null;
                this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), p(this._dialog).hasClass("modal-dialog-scrollable") && i ? i.scrollTop = 0 : this._element.scrollTop = 0, n && m.reflow(this._element), p(this._element).addClass(Se), this._config.focus && this._enforceFocus();

                function o() {
                    e._config.focus && e._element.focus(), e._isTransitioning = !1, p(e._element).trigger(s)
                }
                var r, s = p.Event("shown.bs.modal", {
                    relatedTarget: t
                });
                n ? (r = m.getTransitionDurationFromElement(this._dialog), p(this._dialog).one(m.TRANSITION_END, o).emulateTransitionEnd(r)) : o()
            }, t._enforceFocus = function () {
                var e = this;
                p(document).off(ve).on(ve, function (t) {
                    document !== t.target && e._element !== t.target && 0 === p(e._element).has(t.target).length && e._element.focus()
                })
            }, t._setEscapeEvent = function () {
                var e = this;
                this._isShown ? p(this._element).on(Ee, function (t) {
                    e._config.keyboard && 27 === t.which ? (t.preventDefault(), e.hide()) : e._config.keyboard || 27 !== t.which || e._triggerBackdropTransition()
                }) : this._isShown || p(this._element).off(Ee)
            }, t._setResizeEvent = function () {
                var e = this;
                this._isShown ? p(window).on(ye, function (t) {
                    return e.handleUpdate(t)
                }) : p(window).off(ye)
            }, t._hideModal = function () {
                var t = this;
                this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._isTransitioning = !1, this._showBackdrop(function () {
                    p(document.body).removeClass(Te), t._resetAdjustments(), t._resetScrollbar(), p(t._element).trigger(ge)
                })
            }, t._removeBackdrop = function () {
                this._backdrop && (p(this._backdrop).remove(), this._backdrop = null)
            }, t._showBackdrop = function (t) {
                var e, n, i = this,
                    o = p(this._element).hasClass(Ce) ? Ce : "";
                if (this._isShown && this._config.backdrop) {
                    if (this._backdrop = document.createElement("div"), this._backdrop.className = "modal-backdrop", o && this._backdrop.classList.add(o), p(this._backdrop).appendTo(document.body), p(this._element).on(be, function (t) {
                            i._ignoreBackdropClick ? i._ignoreBackdropClick = !1 : t.target === t.currentTarget && i._triggerBackdropTransition()
                        }), o && m.reflow(this._backdrop), p(this._backdrop).addClass(Se), !t) return;
                    if (!o) return void t();
                    var r = m.getTransitionDurationFromElement(this._backdrop);
                    p(this._backdrop).one(m.TRANSITION_END, t).emulateTransitionEnd(r)
                } else {
                    !this._isShown && this._backdrop ? (p(this._backdrop).removeClass(Se), e = function () {
                        i._removeBackdrop(), t && t()
                    }, p(this._element).hasClass(Ce) ? (n = m.getTransitionDurationFromElement(this._backdrop), p(this._backdrop).one(m.TRANSITION_END, e).emulateTransitionEnd(n)) : e()) : t && t()
                }
            }, t._adjustDialog = function () {
                var t = this._element.scrollHeight > document.documentElement.clientHeight;
                !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px")
            }, t._resetAdjustments = function () {
                this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
            }, t._checkScrollbar = function () {
                var t = document.body.getBoundingClientRect();
                this._isBodyOverflowing = Math.round(t.left + t.right) < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
            }, t._setScrollbar = function () {
                var t, e, n, i, o = this;
                this._isBodyOverflowing && (t = [].slice.call(document.querySelectorAll(Ne)), e = [].slice.call(document.querySelectorAll(ke)), p(t).each(function (t, e) {
                    var n = e.style.paddingRight,
                        i = p(e).css("padding-right");
                    p(e).data("padding-right", n).css("padding-right", parseFloat(i) + o._scrollbarWidth + "px")
                }), p(e).each(function (t, e) {
                    var n = e.style.marginRight,
                        i = p(e).css("margin-right");
                    p(e).data("margin-right", n).css("margin-right", parseFloat(i) - o._scrollbarWidth + "px")
                }), n = document.body.style.paddingRight, i = p(document.body).css("padding-right"), p(document.body).data("padding-right", n).css("padding-right", parseFloat(i) + this._scrollbarWidth + "px")), p(document.body).addClass(Te)
            }, t._resetScrollbar = function () {
                var t = [].slice.call(document.querySelectorAll(Ne));
                p(t).each(function (t, e) {
                    var n = p(e).data("padding-right");
                    p(e).removeData("padding-right"), e.style.paddingRight = n || ""
                });
                var e = [].slice.call(document.querySelectorAll(ke));
                p(e).each(function (t, e) {
                    var n = p(e).data("margin-right");
                    void 0 !== n && p(e).css("margin-right", n).removeData("margin-right")
                });
                var n = p(document.body).data("padding-right");
                p(document.body).removeData("padding-right"), document.body.style.paddingRight = n || ""
            }, t._getScrollbarWidth = function () {
                var t = document.createElement("div");
                t.className = "modal-scrollbar-measure", document.body.appendChild(t);
                var e = t.getBoundingClientRect().width - t.clientWidth;
                return document.body.removeChild(t), e
            }, o._jQueryInterface = function (n, i) {
                return this.each(function () {
                    var t = p(this).data(ue),
                        e = l(l(l({}, pe), p(this).data()), "object" === _typeof(n) && n ? n : {});
                    if (t || (t = new o(this, e), p(this).data(ue, t)), "string" == typeof n) {
                        if (void 0 === t[n]) throw new TypeError('No method named "' + n + '"');
                        t[n](i)
                    } else e.show && t.show(i)
                })
            }, s(o, null, [{
                key: "VERSION",
                get: function () {
                    return "4.5.0"
                }
            }, {
                key: "Default",
                get: function () {
                    return pe
                }
            }]), o
        }();
    p(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (t) {
        var e, n = this,
            i = m.getSelectorFromElement(this);
        i && (e = document.querySelector(i));
        var o = p(e).data(ue) ? "toggle" : l(l({}, p(e).data()), p(this).data());
        "A" !== this.tagName && "AREA" !== this.tagName || t.preventDefault();
        var r = p(e).one(_e, function (t) {
            t.isDefaultPrevented() || r.one(ge, function () {
                p(n).is(":visible") && n.focus()
            })
        });
        Oe._jQueryInterface.call(p(e), o, this)
    }), p.fn[he] = Oe._jQueryInterface, p.fn[he].Constructor = Oe, p.fn[he].noConflict = function () {
        return p.fn[he] = de, Oe._jQueryInterface
    };
    var Ae = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"],
        Ie = {
            "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
            a: ["target", "href", "title", "rel"],
            area: [],
            b: [],
            br: [],
            col: [],
            code: [],
            div: [],
            em: [],
            hr: [],
            h1: [],
            h2: [],
            h3: [],
            h4: [],
            h5: [],
            h6: [],
            i: [],
            img: ["src", "srcset", "alt", "title", "width", "height"],
            li: [],
            ol: [],
            p: [],
            pre: [],
            s: [],
            small: [],
            span: [],
            sub: [],
            sup: [],
            strong: [],
            u: [],
            ul: []
        },
        xe = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi,
        je = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

    function Le(t, r, e) {
        if (0 === t.length) return t;
        if (e && "function" == typeof e) return e(t);
        for (var n = (new window.DOMParser).parseFromString(t, "text/html"), s = Object.keys(r), a = [].slice.call(n.body.querySelectorAll("*")), i = function (t) {
                var e = a[t],
                    n = e.nodeName.toLowerCase();
                if (-1 === s.indexOf(e.nodeName.toLowerCase())) return e.parentNode.removeChild(e), "continue";
                var i = [].slice.call(e.attributes),
                    o = [].concat(r["*"] || [], r[n] || []);
                i.forEach(function (t) {
                    ! function (t, e) {
                        var n = t.nodeName.toLowerCase();
                        if (-1 !== e.indexOf(n)) return -1 === Ae.indexOf(n) || Boolean(t.nodeValue.match(xe) || t.nodeValue.match(je));
                        for (var i = e.filter(function (t) {
                                return t instanceof RegExp
                            }), o = 0, r = i.length; o < r; o++)
                            if (n.match(i[o])) return 1
                    }(t, o) && e.removeAttribute(t.nodeName)
                })
            }, o = 0, l = a.length; o < l; o++) i(o);
        return n.body.innerHTML
    }
    var Pe = "tooltip",
        Fe = "bs.tooltip",
        Re = "." + Fe,
        Be = p.fn[Pe],
        Me = "bs-tooltip",
        qe = new RegExp("(^|\\s)" + Me + "\\S+", "g"),
        He = ["sanitize", "whiteList", "sanitizeFn"],
        Qe = {
            animation: "boolean",
            template: "string",
            title: "(string|element|function)",
            trigger: "string",
            delay: "(number|object)",
            html: "boolean",
            selector: "(string|boolean)",
            placement: "(string|function)",
            offset: "(number|string|function)",
            container: "(string|element|boolean)",
            fallbackPlacement: "(string|array)",
            boundary: "(string|element)",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            whiteList: "object",
            popperConfig: "(null|object)"
        },
        We = {
            AUTO: "auto",
            TOP: "top",
            RIGHT: "right",
            BOTTOM: "bottom",
            LEFT: "left"
        },
        Ue = {
            animation: !0,
            template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            selector: !1,
            placement: "top",
            offset: 0,
            container: !1,
            fallbackPlacement: "flip",
            boundary: "scrollParent",
            sanitize: !0,
            sanitizeFn: null,
            whiteList: Ie,
            popperConfig: null
        },
        Ve = "show",
        Ye = {
            HIDE: "hide" + Re,
            HIDDEN: "hidden" + Re,
            SHOW: "show" + Re,
            SHOWN: "shown" + Re,
            INSERTED: "inserted" + Re,
            CLICK: "click" + Re,
            FOCUSIN: "focusin" + Re,
            FOCUSOUT: "focusout" + Re,
            MOUSEENTER: "mouseenter" + Re,
            MOUSELEAVE: "mouseleave" + Re
        },
        ze = "fade",
        Xe = "show",
        Ke = "hover",
        $e = "focus",
        Ge = function () {
            function i(t, e) {
                if (void 0 === Ut) throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org/)");
                this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners()
            }
            var t = i.prototype;
            return t.enable = function () {
                this._isEnabled = !0
            }, t.disable = function () {
                this._isEnabled = !1
            }, t.toggleEnabled = function () {
                this._isEnabled = !this._isEnabled
            }, t.toggle = function (t) {
                if (this._isEnabled)
                    if (t) {
                        var e = this.constructor.DATA_KEY,
                            n = p(t.currentTarget).data(e);
                        n || (n = new this.constructor(t.currentTarget, this._getDelegateConfig()), p(t.currentTarget).data(e, n)), n._activeTrigger.click = !n._activeTrigger.click, n._isWithActiveTrigger() ? n._enter(null, n) : n._leave(null, n)
                    } else {
                        if (p(this.getTipElement()).hasClass(Xe)) return void this._leave(null, this);
                        this._enter(null, this)
                    }
            }, t.dispose = function () {
                clearTimeout(this._timeout), p.removeData(this.element, this.constructor.DATA_KEY), p(this.element).off(this.constructor.EVENT_KEY), p(this.element).closest(".modal").off("hide.bs.modal", this._hideModalHandler), this.tip && p(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
            }, t.show = function () {
                var e = this;
                if ("none" === p(this.element).css("display")) throw new Error("Please use show on visible elements");
                var t = p.Event(this.constructor.Event.SHOW);
                if (this.isWithContent() && this._isEnabled) {
                    p(this.element).trigger(t);
                    var n = m.findShadowRoot(this.element),
                        i = p.contains(null !== n ? n : this.element.ownerDocument.documentElement, this.element);
                    if (t.isDefaultPrevented() || !i) return;
                    var o = this.getTipElement(),
                        r = m.getUID(this.constructor.NAME);
                    o.setAttribute("id", r), this.element.setAttribute("aria-describedby", r), this.setContent(), this.config.animation && p(o).addClass(ze);
                    var s = "function" == typeof this.config.placement ? this.config.placement.call(this, o, this.element) : this.config.placement,
                        a = this._getAttachment(s);
                    this.addAttachmentClass(a);
                    var l = this._getContainer();
                    p(o).data(this.constructor.DATA_KEY, this), p.contains(this.element.ownerDocument.documentElement, this.tip) || p(o).appendTo(l), p(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new Ut(this.element, o, this._getPopperConfig(a)), p(o).addClass(Xe), "ontouchstart" in document.documentElement && p(document.body).children().on("mouseover", null, p.noop);
                    var c, h = function () {
                        e.config.animation && e._fixTransition();
                        var t = e._hoverState;
                        e._hoverState = null, p(e.element).trigger(e.constructor.Event.SHOWN), "out" === t && e._leave(null, e)
                    };
                    p(this.tip).hasClass(ze) ? (c = m.getTransitionDurationFromElement(this.tip), p(this.tip).one(m.TRANSITION_END, h).emulateTransitionEnd(c)) : h()
                }
            }, t.hide = function (t) {
                function e() {
                    i._hoverState !== Ve && o.parentNode && o.parentNode.removeChild(o), i._cleanTipClass(), i.element.removeAttribute("aria-describedby"), p(i.element).trigger(i.constructor.Event.HIDDEN), null !== i._popper && i._popper.destroy(), t && t()
                }
                var n, i = this,
                    o = this.getTipElement(),
                    r = p.Event(this.constructor.Event.HIDE);
                p(this.element).trigger(r), r.isDefaultPrevented() || (p(o).removeClass(Xe), "ontouchstart" in document.documentElement && p(document.body).children().off("mouseover", null, p.noop), this._activeTrigger.click = !1, this._activeTrigger[$e] = !1, this._activeTrigger[Ke] = !1, p(this.tip).hasClass(ze) ? (n = m.getTransitionDurationFromElement(o), p(o).one(m.TRANSITION_END, e).emulateTransitionEnd(n)) : e(), this._hoverState = "")
            }, t.update = function () {
                null !== this._popper && this._popper.scheduleUpdate()
            }, t.isWithContent = function () {
                return Boolean(this.getTitle())
            }, t.addAttachmentClass = function (t) {
                p(this.getTipElement()).addClass(Me + "-" + t)
            }, t.getTipElement = function () {
                return this.tip = this.tip || p(this.config.template)[0], this.tip
            }, t.setContent = function () {
                var t = this.getTipElement();
                this.setElementContent(p(t.querySelectorAll(".tooltip-inner")), this.getTitle()), p(t).removeClass(ze + " " + Xe)
            }, t.setElementContent = function (t, e) {
                "object" !== _typeof(e) || !e.nodeType && !e.jquery ? this.config.html ? (this.config.sanitize && (e = Le(e, this.config.whiteList, this.config.sanitizeFn)), t.html(e)) : t.text(e) : this.config.html ? p(e).parent().is(t) || t.empty().append(e) : t.text(p(e).text())
            }, t.getTitle = function () {
                return this.element.getAttribute("data-original-title") || ("function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title)
            }, t._getPopperConfig = function (t) {
                var e = this;
                return l(l({}, {
                    placement: t,
                    modifiers: {
                        offset: this._getOffset(),
                        flip: {
                            behavior: this.config.fallbackPlacement
                        },
                        arrow: {
                            element: ".arrow"
                        },
                        preventOverflow: {
                            boundariesElement: this.config.boundary
                        }
                    },
                    onCreate: function (t) {
                        t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t)
                    },
                    onUpdate: function (t) {
                        return e._handlePopperPlacementChange(t)
                    }
                }), this.config.popperConfig)
            }, t._getOffset = function () {
                var e = this,
                    t = {};
                return "function" == typeof this.config.offset ? t.fn = function (t) {
                    return t.offsets = l(l({}, t.offsets), e.config.offset(t.offsets, e.element) || {}), t
                } : t.offset = this.config.offset, t
            }, t._getContainer = function () {
                return !1 === this.config.container ? document.body : m.isElement(this.config.container) ? p(this.config.container) : p(document).find(this.config.container)
            }, t._getAttachment = function (t) {
                return We[t.toUpperCase()]
            }, t._setListeners = function () {
                var i = this;
                this.config.trigger.split(" ").forEach(function (t) {
                    var e, n;
                    "click" === t ? p(i.element).on(i.constructor.Event.CLICK, i.config.selector, function (t) {
                        return i.toggle(t)
                    }) : "manual" !== t && (e = t === Ke ? i.constructor.Event.MOUSEENTER : i.constructor.Event.FOCUSIN, n = t === Ke ? i.constructor.Event.MOUSELEAVE : i.constructor.Event.FOCUSOUT, p(i.element).on(e, i.config.selector, function (t) {
                        return i._enter(t)
                    }).on(n, i.config.selector, function (t) {
                        return i._leave(t)
                    }))
                }), this._hideModalHandler = function () {
                    i.element && i.hide()
                }, p(this.element).closest(".modal").on("hide.bs.modal", this._hideModalHandler), this.config.selector ? this.config = l(l({}, this.config), {}, {
                    trigger: "manual",
                    selector: ""
                }) : this._fixTitle()
            }, t._fixTitle = function () {
                var t = _typeof(this.element.getAttribute("data-original-title"));
                !this.element.getAttribute("title") && "string" === t || (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
            }, t._enter = function (t, e) {
                var n = this.constructor.DATA_KEY;
                (e = e || p(t.currentTarget).data(n)) || (e = new this.constructor(t.currentTarget, this._getDelegateConfig()), p(t.currentTarget).data(n, e)), t && (e._activeTrigger["focusin" === t.type ? $e : Ke] = !0), p(e.getTipElement()).hasClass(Xe) || e._hoverState === Ve ? e._hoverState = Ve : (clearTimeout(e._timeout), e._hoverState = Ve, e.config.delay && e.config.delay.show ? e._timeout = setTimeout(function () {
                    e._hoverState === Ve && e.show()
                }, e.config.delay.show) : e.show())
            }, t._leave = function (t, e) {
                var n = this.constructor.DATA_KEY;
                (e = e || p(t.currentTarget).data(n)) || (e = new this.constructor(t.currentTarget, this._getDelegateConfig()), p(t.currentTarget).data(n, e)), t && (e._activeTrigger["focusout" === t.type ? $e : Ke] = !1), e._isWithActiveTrigger() || (clearTimeout(e._timeout), e._hoverState = "out", e.config.delay && e.config.delay.hide ? e._timeout = setTimeout(function () {
                    "out" === e._hoverState && e.hide()
                }, e.config.delay.hide) : e.hide())
            }, t._isWithActiveTrigger = function () {
                for (var t in this._activeTrigger)
                    if (this._activeTrigger[t]) return !0;
                return !1
            }, t._getConfig = function (t) {
                var e = p(this.element).data();
                return Object.keys(e).forEach(function (t) {
                    -1 !== He.indexOf(t) && delete e[t]
                }), "number" == typeof (t = l(l(l({}, this.constructor.Default), e), "object" === _typeof(t) && t ? t : {})).delay && (t.delay = {
                    show: t.delay,
                    hide: t.delay
                }), "number" == typeof t.title && (t.title = t.title.toString()), "number" == typeof t.content && (t.content = t.content.toString()), m.typeCheckConfig(Pe, t, this.constructor.DefaultType), t.sanitize && (t.template = Le(t.template, t.whiteList, t.sanitizeFn)), t
            }, t._getDelegateConfig = function () {
                var t = {};
                if (this.config)
                    for (var e in this.config) this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
                return t
            }, t._cleanTipClass = function () {
                var t = p(this.getTipElement()),
                    e = t.attr("class").match(qe);
                null !== e && e.length && t.removeClass(e.join(""))
            }, t._handlePopperPlacementChange = function (t) {
                this.tip = t.instance.popper, this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(t.placement))
            }, t._fixTransition = function () {
                var t = this.getTipElement(),
                    e = this.config.animation;
                null === t.getAttribute("x-placement") && (p(t).removeClass(ze), this.config.animation = !1, this.hide(), this.show(), this.config.animation = e)
            }, i._jQueryInterface = function (n) {
                return this.each(function () {
                    var t = p(this).data(Fe),
                        e = "object" === _typeof(n) && n;
                    if ((t || !/dispose|hide/.test(n)) && (t || (t = new i(this, e), p(this).data(Fe, t)), "string" == typeof n)) {
                        if (void 0 === t[n]) throw new TypeError('No method named "' + n + '"');
                        t[n]()
                    }
                })
            }, s(i, null, [{
                key: "VERSION",
                get: function () {
                    return "4.5.0"
                }
            }, {
                key: "Default",
                get: function () {
                    return Ue
                }
            }, {
                key: "NAME",
                get: function () {
                    return Pe
                }
            }, {
                key: "DATA_KEY",
                get: function () {
                    return Fe
                }
            }, {
                key: "Event",
                get: function () {
                    return Ye
                }
            }, {
                key: "EVENT_KEY",
                get: function () {
                    return Re
                }
            }, {
                key: "DefaultType",
                get: function () {
                    return Qe
                }
            }]), i
        }();
    p.fn[Pe] = Ge._jQueryInterface, p.fn[Pe].Constructor = Ge, p.fn[Pe].noConflict = function () {
        return p.fn[Pe] = Be, Ge._jQueryInterface
    };
    var Je = "popover",
        Ze = "bs.popover",
        tn = "." + Ze,
        en = p.fn[Je],
        nn = "bs-popover",
        on = new RegExp("(^|\\s)" + nn + "\\S+", "g"),
        rn = l(l({}, Ge.Default), {}, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        }),
        sn = l(l({}, Ge.DefaultType), {}, {
            content: "(string|element|function)"
        }),
        an = {
            HIDE: "hide" + tn,
            HIDDEN: "hidden" + tn,
            SHOW: "show" + tn,
            SHOWN: "shown" + tn,
            INSERTED: "inserted" + tn,
            CLICK: "click" + tn,
            FOCUSIN: "focusin" + tn,
            FOCUSOUT: "focusout" + tn,
            MOUSEENTER: "mouseenter" + tn,
            MOUSELEAVE: "mouseleave" + tn
        },
        ln = function (t) {
            var e, n;

            function i() {
                return t.apply(this, arguments) || this
            }
            n = t, (e = i).prototype = Object.create(n.prototype), (e.prototype.constructor = e).__proto__ = n;
            var o = i.prototype;
            return o.isWithContent = function () {
                return this.getTitle() || this._getContent()
            }, o.addAttachmentClass = function (t) {
                p(this.getTipElement()).addClass(nn + "-" + t)
            }, o.getTipElement = function () {
                return this.tip = this.tip || p(this.config.template)[0], this.tip
            }, o.setContent = function () {
                var t = p(this.getTipElement());
                this.setElementContent(t.find(".popover-header"), this.getTitle());
                var e = this._getContent();
                "function" == typeof e && (e = e.call(this.element)), this.setElementContent(t.find(".popover-body"), e), t.removeClass("fade show")
            }, o._getContent = function () {
                return this.element.getAttribute("data-content") || this.config.content
            }, o._cleanTipClass = function () {
                var t = p(this.getTipElement()),
                    e = t.attr("class").match(on);
                null !== e && 0 < e.length && t.removeClass(e.join(""))
            }, i._jQueryInterface = function (n) {
                return this.each(function () {
                    var t = p(this).data(Ze),
                        e = "object" === _typeof(n) ? n : null;
                    if ((t || !/dispose|hide/.test(n)) && (t || (t = new i(this, e), p(this).data(Ze, t)), "string" == typeof n)) {
                        if (void 0 === t[n]) throw new TypeError('No method named "' + n + '"');
                        t[n]()
                    }
                })
            }, s(i, null, [{
                key: "VERSION",
                get: function () {
                    return "4.5.0"
                }
            }, {
                key: "Default",
                get: function () {
                    return rn
                }
            }, {
                key: "NAME",
                get: function () {
                    return Je
                }
            }, {
                key: "DATA_KEY",
                get: function () {
                    return Ze
                }
            }, {
                key: "Event",
                get: function () {
                    return an
                }
            }, {
                key: "EVENT_KEY",
                get: function () {
                    return tn
                }
            }, {
                key: "DefaultType",
                get: function () {
                    return sn
                }
            }]), i
        }(Ge);
    p.fn[Je] = ln._jQueryInterface, p.fn[Je].Constructor = ln, p.fn[Je].noConflict = function () {
        return p.fn[Je] = en, ln._jQueryInterface
    };
    var cn = "scrollspy",
        hn = "bs.scrollspy",
        un = "." + hn,
        fn = p.fn[cn],
        dn = {
            offset: 10,
            method: "auto",
            target: ""
        },
        pn = {
            offset: "number",
            method: "string",
            target: "(string|element)"
        },
        mn = "active",
        gn = ".nav, .list-group",
        _n = ".nav-link",
        vn = ".list-group-item",
        yn = "position",
        bn = function () {
            function i(t, e) {
                var n = this;
                this._element = t, this._scrollElement = "BODY" === t.tagName ? window : t, this._config = this._getConfig(e), this._selector = this._config.target + " " + _n + "," + this._config.target + " " + vn + "," + this._config.target + " .dropdown-item", this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, p(this._scrollElement).on("scroll.bs.scrollspy", function (t) {
                    return n._process(t)
                }), this.refresh(), this._process()
            }
            var t = i.prototype;
            return t.refresh = function () {
                var e = this,
                    t = this._scrollElement === this._scrollElement.window ? "offset" : yn,
                    o = "auto" === this._config.method ? t : this._config.method,
                    r = o === yn ? this._getScrollTop() : 0;
                this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), [].slice.call(document.querySelectorAll(this._selector)).map(function (t) {
                    var e, n = m.getSelectorFromElement(t);
                    if (n && (e = document.querySelector(n)), e) {
                        var i = e.getBoundingClientRect();
                        if (i.width || i.height) return [p(e)[o]().top + r, n]
                    }
                    return null
                }).filter(function (t) {
                    return t
                }).sort(function (t, e) {
                    return t[0] - e[0]
                }).forEach(function (t) {
                    e._offsets.push(t[0]), e._targets.push(t[1])
                })
            }, t.dispose = function () {
                p.removeData(this._element, hn), p(this._scrollElement).off(un), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
            }, t._getConfig = function (t) {
                var e;
                return "string" != typeof (t = l(l({}, dn), "object" === _typeof(t) && t ? t : {})).target && m.isElement(t.target) && ((e = p(t.target).attr("id")) || (e = m.getUID(cn), p(t.target).attr("id", e)), t.target = "#" + e), m.typeCheckConfig(cn, t, pn), t
            }, t._getScrollTop = function () {
                return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
            }, t._getScrollHeight = function () {
                return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
            }, t._getOffsetHeight = function () {
                return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
            }, t._process = function () {
                var t = this._getScrollTop() + this._config.offset,
                    e = this._getScrollHeight(),
                    n = this._config.offset + e - this._getOffsetHeight();
                if (this._scrollHeight !== e && this.refresh(), n <= t) {
                    var i = this._targets[this._targets.length - 1];
                    this._activeTarget !== i && this._activate(i)
                } else {
                    if (this._activeTarget && t < this._offsets[0] && 0 < this._offsets[0]) return this._activeTarget = null, void this._clear();
                    for (var o = this._offsets.length; o--;) {
                        this._activeTarget !== this._targets[o] && t >= this._offsets[o] && (void 0 === this._offsets[o + 1] || t < this._offsets[o + 1]) && this._activate(this._targets[o])
                    }
                }
            }, t._activate = function (e) {
                this._activeTarget = e, this._clear();
                var t = this._selector.split(",").map(function (t) {
                        return t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]'
                    }),
                    n = p([].slice.call(document.querySelectorAll(t.join(","))));
                n.hasClass("dropdown-item") ? (n.closest(".dropdown").find(".dropdown-toggle").addClass(mn), n.addClass(mn)) : (n.addClass(mn), n.parents(gn).prev(_n + ", " + vn).addClass(mn), n.parents(gn).prev(".nav-item").children(_n).addClass(mn)), p(this._scrollElement).trigger("activate.bs.scrollspy", {
                    relatedTarget: e
                })
            }, t._clear = function () {
                [].slice.call(document.querySelectorAll(this._selector)).filter(function (t) {
                    return t.classList.contains(mn)
                }).forEach(function (t) {
                    return t.classList.remove(mn)
                })
            }, i._jQueryInterface = function (n) {
                return this.each(function () {
                    var t = p(this).data(hn),
                        e = "object" === _typeof(n) && n;
                    if (t || (t = new i(this, e), p(this).data(hn, t)), "string" == typeof n) {
                        if (void 0 === t[n]) throw new TypeError('No method named "' + n + '"');
                        t[n]()
                    }
                })
            }, s(i, null, [{
                key: "VERSION",
                get: function () {
                    return "4.5.0"
                }
            }, {
                key: "Default",
                get: function () {
                    return dn
                }
            }]), i
        }();
    p(window).on("load.bs.scrollspy.data-api", function () {
        for (var t = [].slice.call(document.querySelectorAll('[data-spy="scroll"]')), e = t.length; e--;) {
            var n = p(t[e]);
            bn._jQueryInterface.call(n, n.data())
        }
    }), p.fn[cn] = bn._jQueryInterface, p.fn[cn].Constructor = bn, p.fn[cn].noConflict = function () {
        return p.fn[cn] = fn, bn._jQueryInterface
    };
    var En = "bs.tab",
        wn = p.fn.tab,
        Tn = "active",
        Cn = ".active",
        Sn = "> li > .active",
        Dn = function () {
            function i(t) {
                this._element = t
            }
            var t = i.prototype;
            return t.show = function () {
                var t, e, n, i, o, r, s, a, l = this;
                this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && p(this._element).hasClass(Tn) || p(this._element).hasClass("disabled") || (e = p(this._element).closest(".nav, .list-group")[0], n = m.getSelectorFromElement(this._element), e && (i = "UL" === e.nodeName || "OL" === e.nodeName ? Sn : Cn, o = (o = p.makeArray(p(e).find(i)))[o.length - 1]), r = p.Event("hide.bs.tab", {
                    relatedTarget: this._element
                }), s = p.Event("show.bs.tab", {
                    relatedTarget: o
                }), o && p(o).trigger(r), p(this._element).trigger(s), s.isDefaultPrevented() || r.isDefaultPrevented() || (n && (t = document.querySelector(n)), this._activate(this._element, e), a = function () {
                    var t = p.Event("hidden.bs.tab", {
                            relatedTarget: l._element
                        }),
                        e = p.Event("shown.bs.tab", {
                            relatedTarget: o
                        });
                    p(o).trigger(t), p(l._element).trigger(e)
                }, t ? this._activate(t, t.parentNode, a) : a()))
            }, t.dispose = function () {
                p.removeData(this._element, En), this._element = null
            }, t._activate = function (t, e, n) {
                function i() {
                    return r._transitionComplete(t, s, n)
                }
                var o, r = this,
                    s = (!e || "UL" !== e.nodeName && "OL" !== e.nodeName ? p(e).children(Cn) : p(e).find(Sn))[0],
                    a = n && s && p(s).hasClass("fade");
                s && a ? (o = m.getTransitionDurationFromElement(s), p(s).removeClass("show").one(m.TRANSITION_END, i).emulateTransitionEnd(o)) : i()
            }, t._transitionComplete = function (t, e, n) {
                var i, o, r;
                e && (p(e).removeClass(Tn), (i = p(e.parentNode).find("> .dropdown-menu .active")[0]) && p(i).removeClass(Tn), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !1)), p(t).addClass(Tn), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !0), m.reflow(t), t.classList.contains("fade") && t.classList.add("show"), t.parentNode && p(t.parentNode).hasClass("dropdown-menu") && ((o = p(t).closest(".dropdown")[0]) && (r = [].slice.call(o.querySelectorAll(".dropdown-toggle")), p(r).addClass(Tn)), t.setAttribute("aria-expanded", !0)), n && n()
            }, i._jQueryInterface = function (n) {
                return this.each(function () {
                    var t = p(this),
                        e = t.data(En);
                    if (e || (e = new i(this), t.data(En, e)), "string" == typeof n) {
                        if (void 0 === e[n]) throw new TypeError('No method named "' + n + '"');
                        e[n]()
                    }
                })
            }, s(i, null, [{
                key: "VERSION",
                get: function () {
                    return "4.5.0"
                }
            }]), i
        }();
    p(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]', function (t) {
        t.preventDefault(), Dn._jQueryInterface.call(p(this), "show")
    }), p.fn.tab = Dn._jQueryInterface, p.fn.tab.Constructor = Dn, p.fn.tab.noConflict = function () {
        return p.fn.tab = wn, Dn._jQueryInterface
    };
    var Nn = "toast",
        kn = "bs.toast",
        On = "." + kn,
        An = p.fn[Nn],
        In = "click.dismiss" + On,
        xn = "show",
        jn = "showing",
        Ln = {
            animation: "boolean",
            autohide: "boolean",
            delay: "number"
        },
        Pn = {
            animation: !0,
            autohide: !0,
            delay: 500
        },
        Fn = function () {
            function o(t, e) {
                this._element = t, this._config = this._getConfig(e), this._timeout = null, this._setListeners()
            }
            var t = o.prototype;
            return t.show = function () {
                var t, e, n = this,
                    i = p.Event("show.bs.toast");
                p(this._element).trigger(i), i.isDefaultPrevented() || (this._config.animation && this._element.classList.add("fade"), t = function () {
                    n._element.classList.remove(jn), n._element.classList.add(xn), p(n._element).trigger("shown.bs.toast"), n._config.autohide && (n._timeout = setTimeout(function () {
                        n.hide()
                    }, n._config.delay))
                }, this._element.classList.remove("hide"), m.reflow(this._element), this._element.classList.add(jn), this._config.animation ? (e = m.getTransitionDurationFromElement(this._element), p(this._element).one(m.TRANSITION_END, t).emulateTransitionEnd(e)) : t())
            }, t.hide = function () {
                var t;
                this._element.classList.contains(xn) && (t = p.Event("hide.bs.toast"), p(this._element).trigger(t), t.isDefaultPrevented() || this._close())
            }, t.dispose = function () {
                clearTimeout(this._timeout), this._timeout = null, this._element.classList.contains(xn) && this._element.classList.remove(xn), p(this._element).off(In), p.removeData(this._element, kn), this._element = null, this._config = null
            }, t._getConfig = function (t) {
                return t = l(l(l({}, Pn), p(this._element).data()), "object" === _typeof(t) && t ? t : {}), m.typeCheckConfig(Nn, t, this.constructor.DefaultType), t
            }, t._setListeners = function () {
                var t = this;
                p(this._element).on(In, '[data-dismiss="toast"]', function () {
                    return t.hide()
                })
            }, t._close = function () {
                function t() {
                    n._element.classList.add("hide"), p(n._element).trigger("hidden.bs.toast")
                }
                var e, n = this;
                this._element.classList.remove(xn), this._config.animation ? (e = m.getTransitionDurationFromElement(this._element), p(this._element).one(m.TRANSITION_END, t).emulateTransitionEnd(e)) : t()
            }, o._jQueryInterface = function (i) {
                return this.each(function () {
                    var t = p(this),
                        e = t.data(kn),
                        n = "object" === _typeof(i) && i;
                    if (e || (e = new o(this, n), t.data(kn, e)), "string" == typeof i) {
                        if (void 0 === e[i]) throw new TypeError('No method named "' + i + '"');
                        e[i](this)
                    }
                })
            }, s(o, null, [{
                key: "VERSION",
                get: function () {
                    return "4.5.0"
                }
            }, {
                key: "DefaultType",
                get: function () {
                    return Ln
                }
            }, {
                key: "Default",
                get: function () {
                    return Pn
                }
            }]), o
        }();
    p.fn[Nn] = Fn._jQueryInterface, p.fn[Nn].Constructor = Fn, p.fn[Nn].noConflict = function () {
        return p.fn[Nn] = An, Fn._jQueryInterface
    }, t.Alert = h, t.Button = b, t.Carousel = j, t.Collapse = U, t.Dropdown = ce, t.Modal = Oe, t.Popover = ln, t.Scrollspy = bn, t.Tab = Dn, t.Toast = Fn, t.Tooltip = Ge, t.Util = m, Object.defineProperty(t, "__esModule", {
        value: !0
    })
}),
function () {
    var t = -1 < navigator.userAgent.toLowerCase().indexOf("webkit"),
        e = -1 < navigator.userAgent.toLowerCase().indexOf("opera"),
        n = -1 < navigator.userAgent.toLowerCase().indexOf("msie");
    (t || e || n) && document.getElementById && window.addEventListener && window.addEventListener("hashchange", function () {
        var t, e = location.hash.substring(1);
        /^[A-z0-9_-]+$/.test(e) && (t = document.getElementById(e)) && (/^(?:a|select|input|button|textarea)$/i.test(t.tagName) || (t.tabIndex = -1), t.focus())
    }, !1)
}();

(function($){

    "use strict";

    /*
        1. Add product to wishlist
        2. Display wishlist items in the table
        3. Remove product from the wishlist

    */

    Array.prototype.unique = function() {
      return this.filter(function (value, index, self) {
        return self.indexOf(value) === index;
      });
    }

    function isInArray(value, array) {return array.indexOf(value) > -1;}

    function onWishlistComplete(target, title){
        setTimeout(function(){
            target
            .removeClass('loading')
            .addClass('active')
            .attr('title',title).html('<i class="fa fa-heart" aria-hidden="true"></i>');
        },800);
    }

    function highlightWishlist(wishlist,title){
        $('.wishlist-toggle').each(function(){
            var $this = $(this);
            var currentProduct = $this.data('product');
            currentProduct = currentProduct.toString();
            if (isInArray(currentProduct,wishlist)) {
                $this.addClass('active').attr('title',title).html('<i class="fa fa-heart" aria-hidden="true"></i>');
            }
        });
    }

    var shopName   = opt.shopName+'-wishlist',
        inWishlist = opt.inWishlist,
        restUrl    = opt.restUrl,
        wishlist   = new Array,
        ls         = sessionStorage.getItem(shopName),
        loggedIn   = ($('body').hasClass('logged-in')) ? true : false,
        userData   = '';

    if(loggedIn) {
        // Fetch current user data
        $.ajax({
            type: 'POST',
            url: opt.ajaxUrl,
            data: {
                'action' : 'fetch_user_data',
                'dataType': 'json'
            },
            success:function(data) {
                userData = JSON.parse(data);
                if (typeof(userData['wishlist']) != 'undefined' && userData['wishlist'] != null && userData['wishlist'] != "") {

                    var userWishlist = userData['wishlist'];
                    userWishlist = userWishlist.split(',');

                    if (wishlist.length) {
                        wishlist =  wishlist.concat(userWishlist);

                        $.ajax({
                            type: 'POST',
                            url:opt.ajaxPost,
                            data:{
                                action:'user_wishlist_update',
                                user_id :userData['user_id'],
                                wishlist :wishlist.join(','),
                            }
                        });

                    } else {
                        wishlist =  userWishlist;
                    }

                    wishlist = wishlist.unique();

                    showWishlist(wishlist);

                    highlightWishlist(wishlist,inWishlist);
                    sessionStorage.removeItem(shopName);
                } else {
                    if (typeof(ls) != 'undefined' && ls != null) {
                        ls = ls.split(',');
                        ls = ls.unique();
                        wishlist = ls;
                    }

                    $.ajax({
                        type: 'POST',
                        url:opt.ajaxPost,
                        data:{
                            action:'user_wishlist_update',
                            user_id :userData['user_id'],
                            wishlist :wishlist.join(','),
                        }
                    })
                    .done(function(response) {
                        highlightWishlist(wishlist,inWishlist);
                        sessionStorage.removeItem(shopName);
                    });
                }
                
            },
            error: function(){
                console.log('No user data returned');
            }
        });
    } else {
        if (typeof(ls) != 'undefined' && ls != null) {
            ls = ls.split(',');
            ls = ls.unique();
            wishlist = ls;
        }
    }

    $('.wishlist-toggle').each(function(){

        var $this = $(this);

        var currentProduct = $this.data('product');

        currentProduct = currentProduct.toString();

        if (!loggedIn && isInArray(currentProduct,wishlist)) {
            $this.addClass('active').attr('title',inWishlist).html('<i class="fa fa-heart" aria-hidden="true"></i>');
        }

        $(this).on('click',function(e){
            e.preventDefault();
            if (!$this.hasClass('active') && !$this.hasClass('loading')) {

                $this.addClass('loading').html('<i class="fa fa-spinner fa-pulse fa-fw"></i>');

                wishlist.push(currentProduct);
                wishlist = wishlist.unique();

                if (loggedIn) {
                    // get user ID
                    if (userData['user_id']) {
                        $.ajax({
                            type: 'POST',
                            url:opt.ajaxPost,
                            data:{
                                action:'user_wishlist_update',
                                user_id :userData['user_id'],
                                wishlist :wishlist.join(','),
                            }
                        })
                        .done(function(response) {
                            onWishlistComplete($this, inWishlist);
                        })
                        .fail(function(data) {
                            // alert(opt.error);
                        });
                    }
                } else {

                    sessionStorage.setItem(shopName, wishlist.toString());
                    onWishlistComplete($this, inWishlist);

                }

            }


        });
    });

    function showWishlist( wishlist ){
        if (undefined !== wishlist && wishlist.length) {

            restUrl += '?include='+wishlist.join(',');
            restUrl += '&per_page='+wishlist.length;

            $.ajax({
                dataType: 'json',
                url:restUrl
            })
            .done(function(response){
                $('.wishlist-table').each(function(){
                    var $this = $(this);
                    $.each(response,function(index,object){
                        $this.append('<tr data-product="'+object.id+'"><td>'+object.image+'</td><td>'+object.title["rendered"]+'<div>'+object.price+'</div><div>'+object.stock+'</div><td><a class="btn btn-outline-dark text-dark btn-sm" href="'+object.link+'"><i class="fa fa-eye" aria-hidden="true"></i></a> <a class="wishlist-remove btn btn-outline-danger text-danger btn-sm" title="'+opt.removeWishlist+'"><i class="fa fa-times" aria-hidden="true"></i></a></td></tr>');
                    });
                });
            })
            .fail(function(response){
                // alert(opt.noWishlist);
            })
            .always(function(response){
                $('.wishlist-table').each(function(){
                    $(this).removeClass('loading');
                });
            });

        } else {
            $('.wishlist-table').each(function(){
                $(this).removeClass('loading');
            });
        }

    }

    setTimeout( showWishlist ,1000);

    $(document).on('click', '.wishlist-remove', function(){

        var $this = $(this);

        $this.html('<i class="fa fa-spinner fa-pulse fa-fw"></i>');

        wishlist = [];

        $this.closest('table').find('tr').each(function(){

            if ($(this).data('product') != $this.closest('tr').data('product')) {

                wishlist.push($(this).data('product'));
            }
    
        });

        if (loggedIn) {

            // get user ID
            if (userData['user_id']) {
                $.ajax({
                    type: 'POST',
                    url:opt.ajaxPost,
                    data:{
                        action:'user_wishlist_update',
                        user_id :userData['user_id'],
                        wishlist :wishlist.join(','),
                    }
                })
                .done(function(response) {
                    $this.closest('table').removeClass('loading');
                    $this.closest('tr').remove();
                })
                .fail(function(data) {
                    // alert(opt.error);
                });
            }
        } else {
            sessionStorage.setItem(shopName, wishlist.toString());
            setTimeout(function(){
                $this.closest('table').removeClass('loading');
                $this.closest('tr').remove();
            },500);
        }

    });

})(jQuery);

(function ($) {

    //On menu parent click 
    $('.navbar .dropdown > a').click(function() {
        if(this.href){
            location.href = this.href;
        }
    });

    // Submenu hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";

    $(window).on("load resize", function () {
        if (this.matchMedia("(min-width: 768px)").matches) {
            $dropdown.hover(
                function () {
                    const $this = $(this);
                    $this.addClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "true");
                    $this.find($dropdownMenu).addClass(showClass);
                },
                function () {
                    const $this = $(this);
                    $this.removeClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "false");
                    $this.find($dropdownMenu).removeClass(showClass);
                }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });

    //close menu mobile if click out of menu
    $(document).on('click', function (e) {
        if ($(e.target).closest(".navbar-collapse.show").length === 0) {
            $(".navbar-collapse").removeClass('show');
        }
    });

    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('.bg-to-top-float').fadeIn( 200 );
            if ($(".bg-to-top-float")[0]){
                $('.wa-right').addClass( 'push-left' );
            }
        } else {
            $('.bg-to-top-float').fadeOut( 200 );
            $('.wa-right').removeClass( 'push-left' );
        }
    });

    //go to top animation
    $('#go-to-top').each(function(){
        $(this).click(function(){ 
            $('html,body').animate({ scrollTop: 0 }, 'slow');
            return false; 
        });
    });

    // Add rounded in thumbnail class
    $('.attachment-woocommerce_thumbnail').addClass('rounded p-0')

    // Add hide added to cart
    $('body').on('added_to_cart',function(){
        toggleMiniCart();
        setTimeout(
        $('.added_to_cart').hide('slow');
    });

    function toggleMiniCart() {
        $('.cart-widget-side').toggleClass('cart-widget-side-opened');
        $('.close-mini-cart').toggleClass('cart-side-opened');
    }

    // Open mini cart
    $(document).on( 'click', '.open-mini-cart, .cart-side-opened', function(e) {
        e.preventDefault();
        toggleMiniCart();
    });

    // Quantity btn
    $('form.cart').on( 'click', 'button.plus, button.minus', function() {
        // Get current quantity values
        var qty = $( this ).parent().find( '.qty' );
        var val   = parseFloat(qty.val());
        var max = parseFloat(qty.attr( 'max' ));
        var min = parseFloat(qty.attr( 'min' ));
        var step = parseFloat(qty.attr( 'step' ));

        // Change the value if plus or minus
        if ( $( this ).is( '.plus' ) ) {
           if ( max && ( max <= val ) ) {
              qty.val( max );
           } else {
              qty.val( val + step );
           }
        } else {
           if ( min && ( min >= val ) ) {
              qty.val( min );
           } else if ( val > 1 ) {
              qty.val( val - step );
           }
        }
    });

})(jQuery);

