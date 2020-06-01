function getContactFormMessage(formid, key) {
    if (contactform == "") {
        return "";
    } else {
        for (var i = 0; i < contactform.length; i++) {
            var checkId = contactform[i][0];
            var checkKey = contactform[i][1];
            var returnMsg = contactform[i][2];
            if (formid == checkId && checkKey == key) {
                return returnMsg;
                break;
            }
        }
    }
}
function contactFormDefaultValidator(objForm) {
    var formid = jQuery(objForm).find(".formid").val();
    var havingError = false;
    objForm.find('.wpcf7-validates-as-required').each(function() {
        jQuery(this).parent().find('.wpcf7-not-valid-tip').remove();
        if (!jQuery(this).hasClass('wpcf7-checkbox')) {
            if (jQuery(this).hasClass('wpcf7-wpgdprc')) {
                var checkselected = 0;
                jQuery(this).find('input').each(function() {
                    if (jQuery(this).prop('checked') == true) {
                        checkselected++;
                    }
                });
                if (checkselected == 0) {
                    jQuery(this).parent().find('.wpcf7-not-valid-tip').remove();
                    jQuery(this).after('<span class="wpcf7-not-valid-tip" role="alert">' + getContactFormMessage(formid, 'gdpr') + '</span>');
                    havingError = true;
                }
            } else if (!jQuery(this).val()) {
                jQuery(this).val('');
                jQuery(this).parent().find('.wpcf7-not-valid-tip').remove();
                jQuery(this).after('<span class="wpcf7-not-valid-tip" role="alert">' + getContactFormMessage(formid, 'invalid_required') + '</span>');
                havingError = true;
            } else {
                if (jQuery(this).attr('class').indexOf("wpcf7-validates-as-email") >= 0) {
                    var emailField = jQuery(this).val();
                    if (!validateCustomFormEmail(emailField)) {
                        jQuery(this).parent().find('.wpcf7-not-valid-tip').remove();
                        jQuery(this).after('<span role="alert" class="wpcf7-not-valid-tip">' + getContactFormMessage(formid, 'invalid_email') + '</span>');
                        havingError = true;
                    }
                } else if (jQuery(this).attr('class').indexOf("wpcf7-validates-as-url") >= 0) {
                    var urlField = jQuery(this).val();
                    if (!validateCustomFormurl(urlField)) {
                        jQuery(this).parent().find('.wpcf7-not-valid-tip').remove();
                        jQuery(this).after('<span role="alert" class="wpcf7-not-valid-tip">' + getContactFormMessage(formid, 'invalid_url') + '</span>');
                        havingError = true;
                    }
                } else if (jQuery(this).attr('class').indexOf("wpcf7-validates-as-tel") >= 0) {
                    var telField = jQuery(this).val();
                    if (!validateCustomFormtel(telField)) {
                        jQuery(this).parent().find('.wpcf7-not-valid-tip').remove();
                        jQuery(this).after('<span role="alert" class="wpcf7-not-valid-tip">' + getContactFormMessage(formid, 'invalid_tel') + '</span>');
                        havingError = true;
                    }
                } else if (jQuery(this).attr('class').indexOf("wpcf7-validates-as-number") >= 0) {
                    var numField = jQuery(this).val();
                    var min = jQuery(this).attr('min');
                    var max = jQuery(this).attr('max');
                    var testnum = validateCustomFormnum(numField, min, max);
                    if (testnum != 0) {
                        jQuery(this).parent().find('.wpcf7-not-valid-tip').remove();
                        if (testnum == 1) {
                            jQuery(this).after('<span role="alert" class="wpcf7-not-valid-tip">' + getContactFormMessage(formid, 'invalid_number') + '</span>');
                        }
                        if (testnum == 2) {
                            jQuery(this).after('<span role="alert" class="wpcf7-not-valid-tip">' + getContactFormMessage(formid, 'invalid_too_long') + '</span>');
                        }
                        if (testnum == 3) {
                            jQuery(this).after('<span role="alert" class="wpcf7-not-valid-tip">' + getContactFormMessage(formid, 'invalid_too_short') + '</span>');
                        }
                        havingError = true;
                    }
                } else if (jQuery(this).attr('class').indexOf("wpcf7-validates-as-date") >= 0) {
                    var date = jQuery(this).val();
                    if (!validateCustomFordate(date)) {
                        jQuery(this).parent().find('.wpcf7-not-valid-tip').remove();
                        jQuery(this).after('<span role="alert" class="wpcf7-not-valid-tip">' + getContactFormMessage(formid, 'invalid_date') + '</span>');
                        havingError = true;
                    }
                }
            }
        } else {
            var checkselected = 0;
            jQuery(this).find('input').each(function() {
                if (jQuery(this).prop('checked') == true) {
                    checkselected++;
                }
            });
            if (checkselected == 0) {
                jQuery(this).parent().find('.wpcf7-not-valid-tip').remove();
                jQuery(this).after('<span class="wpcf7-not-valid-tip" role="alert">' + getContactFormMessage(formid, 'invalid_required') + '</span>');
                havingError = true;
            }
        }
    });
    if (jQuery(objForm).find('.wpcf7-acceptance').length > 0) {
        if (jQuery(objForm).find('.wpcf7-acceptance').hasClass('wpcf7-invert')) {
            if (jQuery(objForm).find('.wpcf7-acceptance').prop('checked') == true) {
                jQuery(objForm).find('.wpcf7-acceptance').parent().find('.wpcf7-not-valid-tip').remove();
                jQuery(objForm).find('.wpcf7-acceptance').after('<span class="wpcf7-not-valid-tip" role="alert">' + getContactFormMessage(formid, 'accept_terms') + '</span>');
                havingError = true;
            } else {
                jQuery(objForm).find('.wpcf7-acceptance').parent().find('.wpcf7-not-valid-tip').remove();
            }
        } else {
            if (jQuery(objForm).find('.wpcf7-acceptance').prop('checked') == false) {
                jQuery(objForm).find('.wpcf7-acceptance').parent().find('.wpcf7-not-valid-tip').remove();
                jQuery(objForm).find('.wpcf7-acceptance').after('<span class="wpcf7-not-valid-tip" role="alert">' + getContactFormMessage(formid, 'accept_terms') + '</span>');
                havingError = true;
            } else {
                jQuery(objForm).find('.wpcf7-acceptance').parent().find('.wpcf7-not-valid-tip').remove();
            }
        }
    }
    return havingError;
}
function validateCustomFormEmail(email) {
    var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,10}|[0-9]{1,3})(\]?)$/;
    return expr.test(email);
}
function validateCustomFormurl(url) {
    if (url) {
        return true;
    } else {
        return false;
    }
}
function validateCustomFormtel(number) {
    var phoneno = /[a-zA-Z]/;
    if (number.match(phoneno)) {
        return false;
    } else {
        return true;
    }
}
function validateCustomFormnum(number, min, max) {
    if (isNaN(number)) {
        return 1;
    } else {
        if (min) {
            if (number < min) {
                return 3;
            }
        }
        if (max) {
            if (number > max) {
                return 2;
            }
        }
        return 0;
    }
}
function validateCustomFordate(input) {
    var status = false;
    if (!input || input.length <= 0) {
        status = false;
    } else {
        var result = new Date(input);
        if (result == 'Invalid Date') {
            status = false;
        } else {
            status = true;
        }
    }
    return status;
}
;;jQuery(document).ready(function($) {
    $('#mfcf7_zl_add_file').on('click tap', function() {
        var zl_filecontainer = '#mfcf7_zl_multifilecontainer';
        var dname = $(zl_filecontainer).append($('#mfcf7_zl_multifilecontainer span.mfcf7-zl-multiline-sample').html());
        $(zl_filecontainer + ' p.wpcf7-form-control-wrap:last').hide();
        $(zl_filecontainer + ' p.wpcf7-form-control-wrap:last input').on('change', function(e) {
            var files = $(this)[0].files;
            for (var i = 0; i < files.length; i++) {
                $(zl_filecontainer + ' p.wpcf7-form-control-wrap:last span.mfcf7-zl-multifile-name').append(files[i].name + "&nbsp;");
            }
            $(zl_filecontainer + ' p.wpcf7-form-control-wrap:last').show();
            $(zl_filecontainer + ' p.wpcf7-form-control-wrap:last input').hide();
            $(zl_filecontainer + ' p.wpcf7-form-control-wrap:last .mfcf7-zl-multifile-name').show();
            $(zl_filecontainer + ' p.wpcf7-form-control-wrap:last a.mfcf7_zl_delete_file').show();
        });
        $(zl_filecontainer + ' p.wpcf7-form-control-wrap:last a.mfcf7_zl_delete_file').hide();
        var fname = $(zl_filecontainer + ' p.wpcf7-form-control-wrap:last').find('input').trigger('click');
        $(zl_filecontainer + ' p.wpcf7-form-control-wrap:last input').hide();
        $('.mfcf7_zl_delete_file').on('click', function() {
            var get_parent = $(this).parent().remove();
        });
        document.addEventListener('wpcf7mailsent', function(event) {
            jQuery(zl_filecontainer + '>p').remove();
        });
        $('.wpcf7-form').submit(function() {
            var inputs = $('.wpcf7-form input[type="file"]:not([disabled])');
            inputs.each(function(_, input) {
                if (input.files.length > 0)
                    return
                $(input).prop('disabled', true);
            })
        });
        document.addEventListener('wpcf7submit', function(event) {
            var inputs = $('.wpcf7-form input[type="file"][disabled]');
            inputs.each(function(_, input) {
                $(input).prop('disabled', false);
            })
        }, false);
    });
});
;;document.addEventListener('wpcf7mailsent', function(event) {
    var currentfid = event.detail.contactFormId;
    var pid = event.detail.apiResponse.popup_id;
    if (event.detail.apiResponse.popup_background_option == "bg_color") {
        var ccode = event.detail.apiResponse.popup_background_color;
    }
    if (event.detail.apiResponse.popup_background_option === "gradient_color") {
        var ccode = 'linear-gradient(' + event.detail.apiResponse.popup_gradient_color + ',' + event.detail.apiResponse.popup_gradient_color1 + ')';
    }
    if (event.detail.apiResponse.popup_background_option === "image") {
        var ccode = '  url("' + event.detail.apiResponse.popup_image_color + '")right center / cover no-repeat';
    }
    if (pid != null && pid != '') {
        swal({
            background: ccode,
            title: '<span style="color:' + event.detail.apiResponse.popup_text_color + '">' + event.detail.apiResponse.popup_message + '</span>',
            confirmButtonColor: event.detail.apiResponse.popup_button_background_color,
            confirmButtonText: '<span style="color:' + event.detail.apiResponse.popup_text_color + '">' + event.detail.apiResponse.popup_button_text + '</span>',
            width: event.detail.apiResponse.m_popup_width,
            timer: event.detail.apiResponse.m_popup_duration,
        })
        jQuery('.swal2-modal').css('border-radius', event.detail.apiResponse.m_popup_radius + "px");
    }
}, false);
document.addEventListener('wpcf7submit', function(event) {
    var currentfid = event.detail.contactFormId;
    var popup_id = event.detail.apiResponse.popup_id;
    var fpid = event.detail.apiResponse.failure_popup_id;
    var fstatus = event.detail.apiResponse.status;
    var fmessage = event.detail.apiResponse.message;
    if (event.detail.apiResponse.failure_popup_background_option == "bg_color") {
        var ccode = event.detail.apiResponse.failure_popup_background_color;
    }
    if (event.detail.apiResponse.failure_popup_background_option === "gradient_color") {
        var ccode = 'linear-gradient(' + event.detail.apiResponse.failure_popup_gradient_color + ',' + event.detail.apiResponse.failure_popup_gradient_color1 + ')';
    }
    if (event.detail.apiResponse.failure_popup_background_option === "image") {
        var ccode = '  url("' + event.detail.apiResponse.failure_popup_image_color + '")right center / cover no-repeat';
    }
    if ((fpid != null && fpid != '') && (fstatus == 'validation_failed' || fstatus == 'acceptance_missing' || fstatus == 'spam' || fstatus == 'aborted' || fstatus == 'mail_failed')) {
        swal({
            background: ccode,
            title: '<span style="color:' + event.detail.apiResponse.failure_popup_text_color + '">' + fmessage + '</span>',
            confirmButtonColor: event.detail.apiResponse.failure_popup_button_background_color,
            confirmButtonText: '<span style="color:' + event.detail.apiResponse.failure_popup_text_color + '">' + event.detail.apiResponse.failure_popup_button_text + '</span>',
            width: event.detail.apiResponse.failure_popup_width,
            timer: event.detail.apiResponse.failure_popup_duration,
        })
        jQuery('.swal2-modal').css('border-radius', event.detail.apiResponse.failure_popup_radius + "px");
    }
}, false);
;;!function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Sweetalert2 = t()
}(this, function() {
    "use strict";
    function V(e) {
        return (V = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        }
        : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }
        )(e)
    }
    function c(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }
    function o(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1,
            o.configurable = !0,
            "value"in o && (o.writable = !0),
            Object.defineProperty(e, o.key, o)
        }
    }
    function r(e, t, n) {
        return t && o(e.prototype, t),
        n && o(e, n),
        e
    }
    function i() {
        return (i = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var o in n)
                    Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o])
            }
            return e
        }
        ).apply(this, arguments)
    }
    function a(e, t) {
        if ("function" != typeof t && null !== t)
            throw new TypeError("Super expression must either be null or a function");
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                writable: !0,
                configurable: !0
            }
        }),
        t && u(e, t)
    }
    function s(e) {
        return (s = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }
        )(e)
    }
    function u(e, t) {
        return (u = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t,
            e
        }
        )(e, t)
    }
    function l(e, t, n) {
        return (l = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
                return !1;
            if (Reflect.construct.sham)
                return !1;
            if ("function" == typeof Proxy)
                return !0;
            try {
                return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})),
                !0
            } catch (e) {
                return !1
            }
        }() ? Reflect.construct : function(e, t, n) {
            var o = [null];
            o.push.apply(o, t);
            var r = new (Function.bind.apply(e, o));
            return n && u(r, n.prototype),
            r
        }
        ).apply(null, arguments)
    }
    function d(e, t) {
        return !t || "object" != typeof t && "function" != typeof t ? function(e) {
            if (void 0 === e)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e) : t
    }
    function p(e, t, n) {
        return (p = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(e, t, n) {
            var o = function(e, t) {
                for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = s(e)); )
                    ;
                return e
            }(e, t);
            if (o) {
                var r = Object.getOwnPropertyDescriptor(o, t);
                return r.get ? r.get.call(n) : r.value
            }
        }
        )(e, t, n || e)
    }
    var t = "SweetAlert2:"
      , f = function(e) {
        return Array.prototype.slice.call(e)
    }
      , m = function(e) {
        console.warn("".concat(t, " ").concat(e))
    }
      , R = function(e) {
        console.error("".concat(t, " ").concat(e))
    }
      , n = []
      , h = function(e) {
        -1 === n.indexOf(e) && (n.push(e),
        m(e))
    }
      , M = function(e) {
        return "function" == typeof e ? e() : e
    }
      , H = function(e) {
        return "object" === V(e) && "function" == typeof e.then
    }
      , e = Object.freeze({
        cancel: "cancel",
        backdrop: "overlay",
        close: "close",
        esc: "esc",
        timer: "timer"
    })
      , g = function(e) {
        var t = {};
        for (var n in e)
            t[e[n]] = "swal2-" + e[n];
        return t
    }
      , I = g(["container", "shown", "height-auto", "iosfix", "popup", "modal", "no-backdrop", "toast", "toast-shown", "toast-column", "fade", "show", "hide", "noanimation", "close", "title", "header", "content", "actions", "confirm", "cancel", "footer", "icon", "icon-text", "image", "input", "file", "range", "select", "radio", "checkbox", "label", "textarea", "inputerror", "validationerror", "progresssteps", "activeprogressstep", "progresscircle", "progressline", "loading", "styled", "top", "top-start", "top-end", "top-left", "top-right", "center", "center-start", "center-end", "center-left", "center-right", "bottom", "bottom-start", "bottom-end", "bottom-left", "bottom-right", "grow-row", "grow-column", "grow-fullscreen"])
      , b = g(["success", "warning", "info", "question", "error"])
      , y = {
        previousBodyPadding: null
    }
      , v = function(e, t) {
        return e.classList.contains(t)
    }
      , _ = function(e) {
        if (e.focus(),
        "file" !== e.type) {
            var t = e.value;
            e.value = "",
            e.value = t
        }
    }
      , w = function(e, t, n) {
        e && t && ("string" == typeof t && (t = t.split(/\s+/).filter(Boolean)),
        t.forEach(function(t) {
            e.forEach ? e.forEach(function(e) {
                n ? e.classList.add(t) : e.classList.remove(t)
            }) : n ? e.classList.add(t) : e.classList.remove(t)
        }))
    }
      , D = function(e, t) {
        w(e, t, !0)
    }
      , N = function(e, t) {
        w(e, t, !1)
    }
      , W = function(e, t) {
        for (var n = 0; n < e.childNodes.length; n++)
            if (v(e.childNodes[n], t))
                return e.childNodes[n]
    }
      , z = function(e) {
        e.style.opacity = "",
        e.style.display = e.id === I.content ? "block" : "flex"
    }
      , U = function(e) {
        e.style.opacity = "",
        e.style.display = "none"
    }
      , K = function(e) {
        return e && (e.offsetWidth || e.offsetHeight || e.getClientRects().length)
    }
      , C = function() {
        return document.body.querySelector("." + I.container)
    }
      , k = function(e) {
        var t = C();
        return t ? t.querySelector("." + e) : null
    }
      , x = function() {
        return k(I.popup)
    }
      , A = function() {
        var e = x();
        return f(e.querySelectorAll("." + I.icon))
    }
      , B = function() {
        return k(I.title)
    }
      , P = function() {
        return k(I.content)
    }
      , S = function() {
        return k(I.image)
    }
      , E = function() {
        return k(I.progresssteps)
    }
      , O = function() {
        return k(I.confirm)
    }
      , F = function() {
        return k(I.cancel)
    }
      , Z = function() {
        return k(I.actions)
    }
      , Q = function() {
        return k(I.footer)
    }
      , Y = function() {
        return k(I.close)
    }
      , $ = function() {
        var e = f(x().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')).sort(function(e, t) {
            return e = parseInt(e.getAttribute("tabindex")),
            (t = parseInt(t.getAttribute("tabindex"))) < e ? 1 : e < t ? -1 : 0
        })
          , t = f(x().querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable], audio[controls], video[controls]')).filter(function(e) {
            return "-1" !== e.getAttribute("tabindex")
        });
        return function(e) {
            for (var t = [], n = 0; n < e.length; n++)
                -1 === t.indexOf(e[n]) && t.push(e[n]);
            return t
        }(e.concat(t)).filter(function(e) {
            return K(e)
        })
    }
      , L = function() {
        return !T() && !document.body.classList.contains(I["no-backdrop"])
    }
      , T = function() {
        return document.body.classList.contains(I["toast-shown"])
    }
      , j = function() {
        return "undefined" == typeof window || "undefined" == typeof document
    }
      , q = '\n <div aria-labelledby="'.concat(I.title, '" aria-describedby="').concat(I.content, '" class="').concat(I.popup, '" tabindex="-1">\n   <div class="').concat(I.header, '">\n     <ul class="').concat(I.progresssteps, '"></ul>\n     <div class="').concat(I.icon, " ").concat(b.error, '">\n       <span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span>\n     </div>\n     <div class="').concat(I.icon, " ").concat(b.question, '">\n       <span class="').concat(I["icon-text"], '">?</span>\n      </div>\n     <div class="').concat(I.icon, " ").concat(b.warning, '">\n       <span class="').concat(I["icon-text"], '">!</span>\n      </div>\n     <div class="').concat(I.icon, " ").concat(b.info, '">\n       <span class="').concat(I["icon-text"], '">i</span>\n      </div>\n     <div class="').concat(I.icon, " ").concat(b.success, '">\n       <div class="swal2-success-circular-line-left"></div>\n       <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n       <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n       <div class="swal2-success-circular-line-right"></div>\n     </div>\n     <img class="').concat(I.image, '" />\n     <h2 class="').concat(I.title, '" id="').concat(I.title, '"></h2>\n     <button type="button" class="').concat(I.close, '">×</button>\n   </div>\n   <div class="').concat(I.content, '">\n     <div id="').concat(I.content, '"></div>\n     <input class="').concat(I.input, '" />\n     <input type="file" class="').concat(I.file, '" />\n     <div class="').concat(I.range, '">\n       <input type="range" />\n       <output></output>\n     </div>\n     <select class="').concat(I.select, '"></select>\n     <div class="').concat(I.radio, '"></div>\n     <label for="').concat(I.checkbox, '" class="').concat(I.checkbox, '">\n       <input type="checkbox" />\n       <span class="').concat(I.label, '"></span>\n     </label>\n     <textarea class="').concat(I.textarea, '"></textarea>\n     <div class="').concat(I.validationerror, '" id="').concat(I.validationerror, '"></div>\n   </div>\n   <div class="').concat(I.actions, '">\n     <button type="button" class="').concat(I.confirm, '">OK</button>\n     <button type="button" class="').concat(I.cancel, '">Cancel</button>\n   </div>\n   <div class="').concat(I.footer, '">\n   </div>\n </div>\n').replace(/(^|\n)\s*/g, "")
      , J = function(e) {
        var t = C();
        if (t && (t.parentNode.removeChild(t),
        N([document.documentElement, document.body], [I["no-backdrop"], I["toast-shown"], I["has-column"]])),
        !j()) {
            var n = document.createElement("div");
            n.className = I.container,
            n.innerHTML = q,
            ("string" == typeof e.target ? document.querySelector(e.target) : e.target).appendChild(n);
            var o, r = x(), i = P(), a = W(i, I.input), c = W(i, I.file), s = i.querySelector(".".concat(I.range, " input")), u = i.querySelector(".".concat(I.range, " output")), l = W(i, I.select), d = i.querySelector(".".concat(I.checkbox, " input")), p = W(i, I.textarea);
            r.setAttribute("role", e.toast ? "alert" : "dialog"),
            r.setAttribute("aria-live", e.toast ? "polite" : "assertive"),
            e.toast || r.setAttribute("aria-modal", "true");
            var f = function(e) {
                qe.isVisible() && o !== e.target.value && qe.resetValidationError(),
                o = e.target.value
            };
            return a.oninput = f,
            c.onchange = f,
            l.onchange = f,
            d.onchange = f,
            p.oninput = f,
            s.oninput = function(e) {
                f(e),
                u.value = s.value
            }
            ,
            s.onchange = function(e) {
                f(e),
                s.nextSibling.value = s.value
            }
            ,
            r
        }
        R("SweetAlert2 requires document to initialize")
    }
      , X = function(e, t) {
        if (!e)
            return U(t);
        if ("object" === V(e))
            if (t.innerHTML = "",
            0 in e)
                for (var n = 0; n in e; n++)
                    t.appendChild(e[n].cloneNode(!0));
            else
                t.appendChild(e.cloneNode(!0));
        else
            e && (t.innerHTML = e);
        z(t)
    }
      , G = function() {
        if (j())
            return !1;
        var e = document.createElement("div")
          , t = {
            WebkitAnimation: "webkitAnimationEnd",
            OAnimation: "oAnimationEnd oanimationend",
            animation: "animationend"
        };
        for (var n in t)
            if (t.hasOwnProperty(n) && void 0 !== e.style[n])
                return t[n];
        return !1
    }()
      , ee = function(e) {
        var t, n, o = Z(), r = O(), i = F();
        if (e.showConfirmButton || e.showCancelButton ? z(o) : U(o),
        e.showCancelButton ? i.style.display = "inline-block" : U(i),
        e.showConfirmButton ? (n = "display",
        (t = r).style.removeProperty ? t.style.removeProperty(n) : t.style.removeAttribute(n)) : U(r),
        r.innerHTML = e.confirmButtonText,
        i.innerHTML = e.cancelButtonText,
        r.setAttribute("aria-label", e.confirmButtonAriaLabel),
        i.setAttribute("aria-label", e.cancelButtonAriaLabel),
        r.className = I.confirm,
        D(r, e.confirmButtonClass),
        i.className = I.cancel,
        D(i, e.cancelButtonClass),
        e.buttonsStyling) {
            D([r, i], I.styled),
            e.confirmButtonColor && (r.style.backgroundColor = e.confirmButtonColor),
            e.cancelButtonColor && (i.style.backgroundColor = e.cancelButtonColor);
            var a = window.getComputedStyle(r).getPropertyValue("background-color");
            r.style.borderLeftColor = a,
            r.style.borderRightColor = a
        } else
            N([r, i], I.styled),
            r.style.backgroundColor = r.style.borderLeftColor = r.style.borderRightColor = "",
            i.style.backgroundColor = i.style.borderLeftColor = i.style.borderRightColor = ""
    }
      , te = function(e) {
        var t = P().querySelector("#" + I.content);
        e.html ? X(e.html, t) : e.text ? (t.textContent = e.text,
        z(t)) : U(t)
    }
      , ne = function(e) {
        for (var t = A(), n = 0; n < t.length; n++)
            U(t[n]);
        if (e.type)
            if (-1 !== Object.keys(b).indexOf(e.type)) {
                var o = qe.getPopup().querySelector(".".concat(I.icon, ".").concat(b[e.type]));
                z(o),
                e.animation && D(o, "swal2-animate-".concat(e.type, "-icon"))
            } else
                R('Unknown type! Expected "success", "error", "warning", "info" or "question", got "'.concat(e.type, '"'))
    }
      , oe = function(e) {
        var t = S();
        e.imageUrl ? (t.setAttribute("src", e.imageUrl),
        t.setAttribute("alt", e.imageAlt),
        z(t),
        e.imageWidth ? t.setAttribute("width", e.imageWidth) : t.removeAttribute("width"),
        e.imageHeight ? t.setAttribute("height", e.imageHeight) : t.removeAttribute("height"),
        t.className = I.image,
        e.imageClass && D(t, e.imageClass)) : U(t)
    }
      , re = function(r) {
        var i = E()
          , a = parseInt(null === r.currentProgressStep ? qe.getQueueStep() : r.currentProgressStep, 10);
        r.progressSteps && r.progressSteps.length ? (z(i),
        i.innerHTML = "",
        a >= r.progressSteps.length && m("Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"),
        r.progressSteps.forEach(function(e, t) {
            var n = document.createElement("li");
            if (D(n, I.progresscircle),
            n.innerHTML = e,
            t === a && D(n, I.activeprogressstep),
            i.appendChild(n),
            t !== r.progressSteps.length - 1) {
                var o = document.createElement("li");
                D(o, I.progressline),
                r.progressStepsDistance && (o.style.width = r.progressStepsDistance),
                i.appendChild(o)
            }
        })) : U(i)
    }
      , ie = function(e) {
        var t = B();
        e.titleText ? t.innerText = e.titleText : e.title && ("string" == typeof e.title && (e.title = e.title.split("\n").join("<br />")),
        X(e.title, t))
    }
      , ae = function() {
        null === y.previousBodyPadding && document.body.scrollHeight > window.innerHeight && (y.previousBodyPadding = parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right")),
        document.body.style.paddingRight = y.previousBodyPadding + function() {
            if ("ontouchstart"in window || navigator.msMaxTouchPoints)
                return 0;
            var e = document.createElement("div");
            e.style.width = "50px",
            e.style.height = "50px",
            e.style.overflow = "scroll",
            document.body.appendChild(e);
            var t = e.offsetWidth - e.clientWidth;
            return document.body.removeChild(e),
            t
        }() + "px")
    }
      , ce = {}
      , se = function(e, n) {
        var o = C()
          , t = x();
        if (t) {
            null !== e && "function" == typeof e && e(t),
            N(t, I.show),
            D(t, I.hide);
            var r = function() {
                var e, t;
                T() || (e = window.scrollX,
                t = window.scrollY,
                ce.restoreFocusTimeout = setTimeout(function() {
                    ce.previousActiveElement && ce.previousActiveElement.focus ? (ce.previousActiveElement.focus(),
                    ce.previousActiveElement = null) : document.body && document.body.focus()
                }, 100),
                void 0 !== e && void 0 !== t && window.scrollTo(e, t),
                ce.keydownTarget.removeEventListener("keydown", ce.keydownHandler, {
                    capture: ce.keydownListenerCapture
                }),
                ce.keydownHandlerAdded = !1),
                o.parentNode && o.parentNode.removeChild(o),
                N([document.documentElement, document.body], [I.shown, I["height-auto"], I["no-backdrop"], I["toast-shown"], I["toast-column"]]),
                L() && (null !== y.previousBodyPadding && (document.body.style.paddingRight = y.previousBodyPadding,
                y.previousBodyPadding = null),
                function() {
                    if (v(document.body, I.iosfix)) {
                        var e = parseInt(document.body.style.top, 10);
                        N(document.body, I.iosfix),
                        document.body.style.top = "",
                        document.body.scrollTop = -1 * e
                    }
                }(),
                f(document.body.children).forEach(function(e) {
                    e.hasAttribute("data-previous-aria-hidden") ? (e.setAttribute("aria-hidden", e.getAttribute("data-previous-aria-hidden")),
                    e.removeAttribute("data-previous-aria-hidden")) : e.removeAttribute("aria-hidden")
                })),
                null !== n && "function" == typeof n && setTimeout(function() {
                    n()
                })
            };
            G && !v(t, I.noanimation) ? t.addEventListener(G, function e() {
                t.removeEventListener(G, e),
                v(t, I.hide) && r()
            }) : r()
        }
    };
    function ue(e) {
        var t = function e() {
            for (var t = arguments.length, n = new Array(t), o = 0; o < t; o++)
                n[o] = arguments[o];
            if (!(this instanceof e))
                return l(e, n);
            Object.getPrototypeOf(e).apply(this, n)
        };
        return t.prototype = i(Object.create(e.prototype), {
            constructor: t
        }),
        "function" == typeof Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e,
        t
    }
    var le = {
        title: "",
        titleText: "",
        text: "",
        html: "",
        footer: "",
        type: null,
        toast: !1,
        customClass: "",
        target: "body",
        backdrop: !0,
        animation: !0,
        heightAuto: !0,
        allowOutsideClick: !0,
        allowEscapeKey: !0,
        allowEnterKey: !0,
        stopKeydownPropagation: !0,
        keydownListenerCapture: !1,
        showConfirmButton: !0,
        showCancelButton: !1,
        preConfirm: null,
        confirmButtonText: "OK",
        confirmButtonAriaLabel: "",
        confirmButtonColor: null,
        confirmButtonClass: null,
        cancelButtonText: "Cancel",
        cancelButtonAriaLabel: "",
        cancelButtonColor: null,
        cancelButtonClass: null,
        buttonsStyling: !0,
        reverseButtons: !1,
        focusConfirm: !0,
        focusCancel: !1,
        showCloseButton: !1,
        closeButtonAriaLabel: "Close this dialog",
        showLoaderOnConfirm: !1,
        imageUrl: null,
        imageWidth: null,
        imageHeight: null,
        imageAlt: "",
        imageClass: null,
        timer: null,
        width: null,
        padding: null,
        background: null,
        input: null,
        inputPlaceholder: "",
        inputValue: "",
        inputOptions: {},
        inputAutoTrim: !0,
        inputClass: null,
        inputAttributes: {},
        inputValidator: null,
        grow: !1,
        position: "center",
        progressSteps: [],
        currentProgressStep: null,
        progressStepsDistance: null,
        onBeforeOpen: null,
        onAfterClose: null,
        onOpen: null,
        onClose: null,
        useRejections: !1,
        expectRejections: !1
    }
      , de = ["useRejections", "expectRejections"]
      , pe = ["allowOutsideClick", "allowEnterKey", "backdrop", "focusConfirm", "focusCancel", "heightAuto", "keydownListenerCapture"]
      , fe = function(e) {
        return le.hasOwnProperty(e) || "extraParams" === e
    }
      , me = function(e) {
        return -1 !== de.indexOf(e)
    }
      , he = function(e) {
        for (var t in e)
            fe(t) || m('Unknown parameter "'.concat(t, '"')),
            e.toast && -1 !== pe.indexOf(t) && m('The parameter "'.concat(t, '" is incompatible with toasts')),
            me(t) && h('The parameter "'.concat(t, '" is deprecated and will be removed in the next major release.'))
    }
      , ge = '"setDefaults" & "resetDefaults" methods are deprecated in favor of "mixin" method and will be removed in the next major release. For new projects, use "mixin". For past projects already using "setDefaults", support will be provided through an additional package.'
      , be = {};
    var ye = []
      , ve = function() {
        var e = x();
        e || qe(""),
        e = x();
        var t = Z()
          , n = O()
          , o = F();
        z(t),
        z(n),
        D([e, t], I.loading),
        n.disabled = !0,
        o.disabled = !0,
        e.setAttribute("data-loading", !0),
        e.setAttribute("aria-busy", !0),
        e.focus()
    }
      , we = Object.freeze({
        isValidParameter: fe,
        isDeprecatedParameter: me,
        argsToParams: function(n) {
            var o = {};
            switch (V(n[0])) {
            case "object":
                i(o, n[0]);
                break;
            default:
                ["title", "html", "type"].forEach(function(e, t) {
                    switch (V(n[t])) {
                    case "string":
                        o[e] = n[t];
                        break;
                    case "undefined":
                        break;
                    default:
                        R("Unexpected type of ".concat(e, '! Expected "string", got ').concat(V(n[t])))
                    }
                })
            }
            return o
        },
        adaptInputValidator: function(n) {
            return function(e, t) {
                return n.call(this, e, t).then(function() {}, function(e) {
                    return e
                })
            }
        },
        close: se,
        closePopup: se,
        closeModal: se,
        closeToast: se,
        isVisible: function() {
            return !!x()
        },
        clickConfirm: function() {
            return O().click()
        },
        clickCancel: function() {
            return F().click()
        },
        getContainer: C,
        getPopup: x,
        getTitle: B,
        getContent: P,
        getImage: S,
        getIcons: A,
        getCloseButton: Y,
        getButtonsWrapper: function() {
            return h("swal.getButtonsWrapper() is deprecated and will be removed in the next major release, use swal.getActions() instead"),
            k(I.actions)
        },
        getActions: Z,
        getConfirmButton: O,
        getCancelButton: F,
        getFooter: Q,
        getFocusableElements: $,
        isLoading: function() {
            return x().hasAttribute("data-loading")
        },
        fire: function() {
            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
                t[n] = arguments[n];
            return l(this, t)
        },
        mixin: function(n) {
            return ue(function(e) {
                function t() {
                    return c(this, t),
                    d(this, s(t).apply(this, arguments))
                }
                return a(t, e),
                r(t, [{
                    key: "_main",
                    value: function(e) {
                        return p(s(t.prototype), "_main", this).call(this, i({}, n, e))
                    }
                }]),
                t
            }(this))
        },
        queue: function(e) {
            var i = this;
            ye = e;
            var a = function() {
                ye = [],
                document.body.removeAttribute("data-swal2-queue-step")
            }
              , c = [];
            return new Promise(function(r) {
                !function t(n, o) {
                    n < ye.length ? (document.body.setAttribute("data-swal2-queue-step", n),
                    i(ye[n]).then(function(e) {
                        void 0 !== e.value ? (c.push(e.value),
                        t(n + 1, o)) : (a(),
                        r({
                            dismiss: e.dismiss
                        }))
                    })) : (a(),
                    r({
                        value: c
                    }))
                }(0)
            }
            )
        },
        getQueueStep: function() {
            return document.body.getAttribute("data-swal2-queue-step")
        },
        insertQueueStep: function(e, t) {
            return t && t < ye.length ? ye.splice(t, 0, e) : ye.push(e)
        },
        deleteQueueStep: function(e) {
            void 0 !== ye[e] && ye.splice(e, 1)
        },
        showLoading: ve,
        enableLoading: ve,
        getTimerLeft: function() {
            return ce.timeout && ce.timeout.getTimerLeft()
        }
    })
      , Ce = "function" == typeof Symbol ? Symbol : function() {
        var t = 0;
        function e(e) {
            return "__" + e + "_" + Math.floor(1e9 * Math.random()) + "_" + ++t + "__"
        }
        return e.iterator = e("Symbol.iterator"),
        e
    }()
      , ke = "function" == typeof WeakMap ? WeakMap : function(n, o, t) {
        function e() {
            o(this, n, {
                value: Ce("WeakMap")
            })
        }
        return e.prototype = {
            delete: function(e) {
                delete e[this[n]]
            },
            get: function(e) {
                return e[this[n]]
            },
            has: function(e) {
                return t.call(e, this[n])
            },
            set: function(e, t) {
                o(e, this[n], {
                    configurable: !0,
                    value: t
                })
            }
        },
        e
    }(Ce("WeakMap"), Object.defineProperty, {}.hasOwnProperty)
      , xe = {
        promise: new ke,
        innerParams: new ke,
        domCache: new ke
    };
    function Ae() {
        var e = xe.innerParams.get(this)
          , t = xe.domCache.get(this);
        e.showConfirmButton || (U(t.confirmButton),
        e.showCancelButton || U(t.actions)),
        N([t.popup, t.actions], I.loading),
        t.popup.removeAttribute("aria-busy"),
        t.popup.removeAttribute("data-loading"),
        t.confirmButton.disabled = !1,
        t.cancelButton.disabled = !1
    }
    var Be = function e(t, n) {
        var o, r, i;
        c(this, e);
        var a = n;
        this.start = function() {
            i = !0,
            r = new Date,
            o = setTimeout(t, a)
        }
        ,
        this.stop = function() {
            i = !1,
            clearTimeout(o),
            a -= new Date - r
        }
        ,
        this.getTimerLeft = function() {
            return i && (this.stop(),
            this.start()),
            a
        }
        ,
        this.start()
    }
      , Pe = {
        email: function(e, t) {
            return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(e) ? Promise.resolve() : Promise.reject(t && t.validationMessage ? t.validationMessage : "Invalid email address")
        },
        url: function(e, t) {
            return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/.test(e) ? Promise.resolve() : Promise.reject(t && t.validationMessage ? t.validationMessage : "Invalid URL")
        }
    };
    var Se = function(e) {
        var t = C()
          , n = x();
        null !== e.onBeforeOpen && "function" == typeof e.onBeforeOpen && e.onBeforeOpen(n),
        e.animation ? (D(n, I.show),
        D(t, I.fade),
        N(n, I.hide)) : N(n, I.fade),
        z(n),
        t.style.overflowY = "hidden",
        G && !v(n, I.noanimation) ? n.addEventListener(G, function e() {
            n.removeEventListener(G, e),
            t.style.overflowY = "auto"
        }) : t.style.overflowY = "auto",
        D([document.documentElement, document.body, t], I.shown),
        e.heightAuto && e.backdrop && !e.toast && D([document.documentElement, document.body], I["height-auto"]),
        L() && (ae(),
        function() {
            if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream && !v(document.body, I.iosfix)) {
                var e = document.body.scrollTop;
                document.body.style.top = -1 * e + "px",
                D(document.body, I.iosfix)
            }
        }(),
        f(document.body.children).forEach(function(e) {
            e === C() || e.contains(C()) || (e.hasAttribute("aria-hidden") && e.setAttribute("data-previous-aria-hidden", e.getAttribute("aria-hidden")),
            e.setAttribute("aria-hidden", "true"))
        })),
        T() || ce.previousActiveElement || (ce.previousActiveElement = document.activeElement),
        null !== e.onOpen && "function" == typeof e.onOpen && setTimeout(function() {
            e.onOpen(n)
        })
    };
    var Ee, Oe = Object.freeze({
        hideLoading: Ae,
        disableLoading: Ae,
        getInput: function(e) {
            var t = xe.innerParams.get(this)
              , n = xe.domCache.get(this);
            if (!(e = e || t.input))
                return null;
            switch (e) {
            case "select":
            case "textarea":
            case "file":
                return W(n.content, I[e]);
            case "checkbox":
                return n.popup.querySelector(".".concat(I.checkbox, " input"));
            case "radio":
                return n.popup.querySelector(".".concat(I.radio, " input:checked")) || n.popup.querySelector(".".concat(I.radio, " input:first-child"));
            case "range":
                return n.popup.querySelector(".".concat(I.range, " input"));
            default:
                return W(n.content, I.input)
            }
        },
        enableButtons: function() {
            var e = xe.domCache.get(this);
            e.confirmButton.disabled = !1,
            e.cancelButton.disabled = !1
        },
        disableButtons: function() {
            var e = xe.domCache.get(this);
            e.confirmButton.disabled = !0,
            e.cancelButton.disabled = !0
        },
        enableConfirmButton: function() {
            xe.domCache.get(this).confirmButton.disabled = !1
        },
        disableConfirmButton: function() {
            xe.domCache.get(this).confirmButton.disabled = !0
        },
        enableInput: function() {
            var e = this.getInput();
            if (!e)
                return !1;
            if ("radio" === e.type)
                for (var t = e.parentNode.parentNode.querySelectorAll("input"), n = 0; n < t.length; n++)
                    t[n].disabled = !1;
            else
                e.disabled = !1
        },
        disableInput: function() {
            var e = this.getInput();
            if (!e)
                return !1;
            if (e && "radio" === e.type)
                for (var t = e.parentNode.parentNode.querySelectorAll("input"), n = 0; n < t.length; n++)
                    t[n].disabled = !0;
            else
                e.disabled = !0
        },
        showValidationError: function(e) {
            var t = xe.domCache.get(this);
            t.validationError.innerHTML = e;
            var n = window.getComputedStyle(t.popup);
            t.validationError.style.marginLeft = "-".concat(n.getPropertyValue("padding-left")),
            t.validationError.style.marginRight = "-".concat(n.getPropertyValue("padding-right")),
            z(t.validationError);
            var o = this.getInput();
            o && (o.setAttribute("aria-invalid", !0),
            o.setAttribute("aria-describedBy", I.validationerror),
            _(o),
            D(o, I.inputerror))
        },
        resetValidationError: function() {
            var e = xe.domCache.get(this);
            e.validationError && U(e.validationError);
            var t = this.getInput();
            t && (t.removeAttribute("aria-invalid"),
            t.removeAttribute("aria-describedBy"),
            N(t, I.inputerror))
        },
        getProgressSteps: function() {
            return xe.innerParams.get(this).progressSteps
        },
        setProgressSteps: function(e) {
            var t = i({}, xe.innerParams.get(this), {
                progressSteps: e
            });
            xe.innerParams.set(this, t),
            re(t)
        },
        showProgressSteps: function() {
            var e = xe.domCache.get(this);
            z(e.progressSteps)
        },
        hideProgressSteps: function() {
            var e = xe.domCache.get(this);
            U(e.progressSteps)
        },
        _main: function(e) {
            var L = this;
            he(e);
            var T = i({}, le, e);
            !function(t) {
                var e;
                t.inputValidator || Object.keys(Pe).forEach(function(e) {
                    t.input === e && (t.inputValidator = t.expectRejections ? Pe[e] : qe.adaptInputValidator(Pe[e]))
                }),
                (!t.target || "string" == typeof t.target && !document.querySelector(t.target) || "string" != typeof t.target && !t.target.appendChild) && (m('Target parameter is not valid, defaulting to "body"'),
                t.target = "body");
                var n = x()
                  , o = "string" == typeof t.target ? document.querySelector(t.target) : t.target;
                e = n && o && n.parentNode !== o.parentNode ? J(t) : n || J(t),
                t.width && (e.style.width = "number" == typeof t.width ? t.width + "px" : t.width),
                t.padding && (e.style.padding = "number" == typeof t.padding ? t.padding + "px" : t.padding),
                t.background && (e.style.background = t.background);
                for (var r = window.getComputedStyle(e).getPropertyValue("background-color"), i = e.querySelectorAll("[class^=swal2-success-circular-line], .swal2-success-fix"), a = 0; a < i.length; a++)
                    i[a].style.backgroundColor = r;
                var c = C()
                  , s = Y()
                  , u = Q();
                if (ie(t),
                te(t),
                "string" == typeof t.backdrop ? C().style.background = t.backdrop : t.backdrop || D([document.documentElement, document.body], I["no-backdrop"]),
                !t.backdrop && t.allowOutsideClick && m('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`'),
                t.position in I ? D(c, I[t.position]) : (m('The "position" parameter is not valid, defaulting to "center"'),
                D(c, I.center)),
                t.grow && "string" == typeof t.grow) {
                    var l = "grow-" + t.grow;
                    l in I && D(c, I[l])
                }
                "function" == typeof t.animation && (t.animation = t.animation.call()),
                t.showCloseButton ? (s.setAttribute("aria-label", t.closeButtonAriaLabel),
                z(s)) : U(s),
                e.className = I.popup,
                t.toast ? (D([document.documentElement, document.body], I["toast-shown"]),
                D(e, I.toast)) : D(e, I.modal),
                t.customClass && D(e, t.customClass),
                re(t),
                ne(t),
                oe(t),
                ee(t),
                X(t.footer, u),
                !0 === t.animation ? N(e, I.noanimation) : D(e, I.noanimation),
                t.showLoaderOnConfirm && !t.preConfirm && m("showLoaderOnConfirm is set to true, but preConfirm is not defined.\nshowLoaderOnConfirm should be used together with preConfirm, see usage example:\nhttps://sweetalert2.github.io/#ajax-request")
            }(T),
            Object.freeze(T),
            xe.innerParams.set(this, T),
            ce.timeout && (ce.timeout.stop(),
            delete ce.timeout),
            clearTimeout(ce.restoreFocusTimeout);
            var j = {
                popup: x(),
                container: C(),
                content: P(),
                actions: Z(),
                confirmButton: O(),
                cancelButton: F(),
                closeButton: Y(),
                validationError: k(I.validationerror),
                progressSteps: E()
            };
            xe.domCache.set(this, j);
            var q = this.constructor;
            return new Promise(function(t, n) {
                var o = function(e) {
                    q.closePopup(T.onClose, T.onAfterClose),
                    T.useRejections ? t(e) : t({
                        value: e
                    })
                }
                  , s = function(e) {
                    q.closePopup(T.onClose, T.onAfterClose),
                    T.useRejections ? n(e) : t({
                        dismiss: e
                    })
                }
                  , u = function(e) {
                    q.closePopup(T.onClose, T.onAfterClose),
                    n(e)
                };
                T.timer && (ce.timeout = new Be(function() {
                    s("timer"),
                    delete ce.timeout
                }
                ,T.timer)),
                T.input && setTimeout(function() {
                    var e = L.getInput();
                    e && _(e)
                }, 0);
                for (var l = function(t) {
                    if (T.showLoaderOnConfirm && q.showLoading(),
                    T.preConfirm) {
                        L.resetValidationError();
                        var e = Promise.resolve().then(function() {
                            return T.preConfirm(t, T.extraParams)
                        });
                        T.expectRejections ? e.then(function(e) {
                            return o(e || t)
                        }, function(e) {
                            L.hideLoading(),
                            e && L.showValidationError(e)
                        }) : e.then(function(e) {
                            K(j.validationError) || !1 === e ? L.hideLoading() : o(e || t)
                        }, function(e) {
                            return u(e)
                        })
                    } else
                        o(t)
                }, e = function(e) {
                    var t = e.target
                      , n = j.confirmButton
                      , o = j.cancelButton
                      , r = n && (n === t || n.contains(t))
                      , i = o && (o === t || o.contains(t));
                    switch (e.type) {
                    case "click":
                        if (r && q.isVisible())
                            if (L.disableButtons(),
                            T.input) {
                                var a = function() {
                                    var e = L.getInput();
                                    if (!e)
                                        return null;
                                    switch (T.input) {
                                    case "checkbox":
                                        return e.checked ? 1 : 0;
                                    case "radio":
                                        return e.checked ? e.value : null;
                                    case "file":
                                        return e.files.length ? e.files[0] : null;
                                    default:
                                        return T.inputAutoTrim ? e.value.trim() : e.value
                                    }
                                }();
                                if (T.inputValidator) {
                                    L.disableInput();
                                    var c = Promise.resolve().then(function() {
                                        return T.inputValidator(a, T.extraParams)
                                    });
                                    T.expectRejections ? c.then(function() {
                                        L.enableButtons(),
                                        L.enableInput(),
                                        l(a)
                                    }, function(e) {
                                        L.enableButtons(),
                                        L.enableInput(),
                                        e && L.showValidationError(e)
                                    }) : c.then(function(e) {
                                        L.enableButtons(),
                                        L.enableInput(),
                                        e ? L.showValidationError(e) : l(a)
                                    }, function(e) {
                                        return u(e)
                                    })
                                } else
                                    l(a)
                            } else
                                l(!0);
                        else
                            i && q.isVisible() && (L.disableButtons(),
                            s(q.DismissReason.cancel))
                    }
                }, r = j.popup.querySelectorAll("button"), i = 0; i < r.length; i++)
                    r[i].onclick = e,
                    r[i].onmouseover = e,
                    r[i].onmouseout = e,
                    r[i].onmousedown = e;
                if (j.closeButton.onclick = function() {
                    s(q.DismissReason.close)
                }
                ,
                T.toast)
                    j.popup.onclick = function() {
                        T.showConfirmButton || T.showCancelButton || T.showCloseButton || T.input || s(q.DismissReason.close)
                    }
                    ;
                else {
                    var a = !1;
                    j.popup.onmousedown = function() {
                        j.container.onmouseup = function(e) {
                            j.container.onmouseup = void 0,
                            e.target === j.container && (a = !0)
                        }
                    }
                    ,
                    j.container.onmousedown = function() {
                        j.popup.onmouseup = function(e) {
                            j.popup.onmouseup = void 0,
                            (e.target === j.popup || j.popup.contains(e.target)) && (a = !0)
                        }
                    }
                    ,
                    j.container.onclick = function(e) {
                        a ? a = !1 : e.target === j.container && M(T.allowOutsideClick) && s(q.DismissReason.backdrop)
                    }
                }
                T.reverseButtons ? j.confirmButton.parentNode.insertBefore(j.cancelButton, j.confirmButton) : j.confirmButton.parentNode.insertBefore(j.confirmButton, j.cancelButton);
                var c = function(e, t) {
                    for (var n = $(T.focusCancel), o = 0; o < n.length; o++)
                        return (e += t) === n.length ? e = 0 : -1 === e && (e = n.length - 1),
                        n[e].focus();
                    j.popup.focus()
                };
                ce.keydownHandlerAdded && (ce.keydownTarget.removeEventListener("keydown", ce.keydownHandler, {
                    capture: ce.keydownListenerCapture
                }),
                ce.keydownHandlerAdded = !1),
                T.toast || (ce.keydownHandler = function(e) {
                    return function(e, t) {
                        if (t.stopKeydownPropagation && e.stopPropagation(),
                        "Enter" !== e.key || e.isComposing)
                            if ("Tab" === e.key) {
                                for (var n = e.target, o = $(t.focusCancel), r = -1, i = 0; i < o.length; i++)
                                    if (n === o[i]) {
                                        r = i;
                                        break
                                    }
                                e.shiftKey ? c(r, -1) : c(r, 1),
                                e.stopPropagation(),
                                e.preventDefault()
                            } else
                                -1 !== ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Left", "Right", "Up", "Down"].indexOf(e.key) ? document.activeElement === j.confirmButton && K(j.cancelButton) ? j.cancelButton.focus() : document.activeElement === j.cancelButton && K(j.confirmButton) && j.confirmButton.focus() : "Escape" !== e.key && "Esc" !== e.key || !0 !== M(t.allowEscapeKey) || s(q.DismissReason.esc);
                        else if (e.target && L.getInput() && e.target.outerHTML === L.getInput().outerHTML) {
                            if (-1 !== ["textarea", "file"].indexOf(t.input))
                                return;
                            q.clickConfirm(),
                            e.preventDefault()
                        }
                    }(e, T)
                }
                ,
                ce.keydownTarget = T.keydownListenerCapture ? window : j.popup,
                ce.keydownListenerCapture = T.keydownListenerCapture,
                ce.keydownTarget.addEventListener("keydown", ce.keydownHandler, {
                    capture: ce.keydownListenerCapture
                }),
                ce.keydownHandlerAdded = !0),
                L.enableButtons(),
                L.hideLoading(),
                L.resetValidationError(),
                T.toast && (T.input || T.footer || T.showCloseButton) ? D(document.body, I["toast-column"]) : N(document.body, I["toast-column"]);
                for (var d, p, f = ["input", "file", "range", "select", "radio", "checkbox", "textarea"], m = 0; m < f.length; m++) {
                    var h = I[f[m]]
                      , g = W(j.content, h);
                    if (d = L.getInput(f[m])) {
                        for (var b in d.attributes)
                            if (d.attributes.hasOwnProperty(b)) {
                                var y = d.attributes[b].name;
                                "type" !== y && "value" !== y && d.removeAttribute(y)
                            }
                        for (var v in T.inputAttributes)
                            d.setAttribute(v, T.inputAttributes[v])
                    }
                    g.className = h,
                    T.inputClass && D(g, T.inputClass),
                    U(g)
                }
                switch (T.input) {
                case "text":
                case "email":
                case "password":
                case "number":
                case "tel":
                case "url":
                    (d = W(j.content, I.input)).value = T.inputValue,
                    d.placeholder = T.inputPlaceholder,
                    d.type = T.input,
                    z(d);
                    break;
                case "file":
                    (d = W(j.content, I.file)).placeholder = T.inputPlaceholder,
                    d.type = T.input,
                    z(d);
                    break;
                case "range":
                    var w = W(j.content, I.range)
                      , C = w.querySelector("input")
                      , k = w.querySelector("output");
                    C.value = T.inputValue,
                    C.type = T.input,
                    k.value = T.inputValue,
                    z(w);
                    break;
                case "select":
                    var x = W(j.content, I.select);
                    if (x.innerHTML = "",
                    T.inputPlaceholder) {
                        var A = document.createElement("option");
                        A.innerHTML = T.inputPlaceholder,
                        A.value = "",
                        A.disabled = !0,
                        A.selected = !0,
                        x.appendChild(A)
                    }
                    p = function(e) {
                        e.forEach(function(e) {
                            var t = e[0]
                              , n = e[1]
                              , o = document.createElement("option");
                            o.value = t,
                            o.innerHTML = n,
                            T.inputValue.toString() === t.toString() && (o.selected = !0),
                            x.appendChild(o)
                        }),
                        z(x),
                        x.focus()
                    }
                    ;
                    break;
                case "radio":
                    var B = W(j.content, I.radio);
                    B.innerHTML = "",
                    p = function(e) {
                        e.forEach(function(e) {
                            var t = e[0]
                              , n = e[1]
                              , o = document.createElement("input")
                              , r = document.createElement("label");
                            o.type = "radio",
                            o.name = I.radio,
                            o.value = t,
                            T.inputValue.toString() === t.toString() && (o.checked = !0);
                            var i = document.createElement("span");
                            i.innerHTML = n,
                            i.className = I.label,
                            r.appendChild(o),
                            r.appendChild(i),
                            B.appendChild(r)
                        }),
                        z(B);
                        var t = B.querySelectorAll("input");
                        t.length && t[0].focus()
                    }
                    ;
                    break;
                case "checkbox":
                    var P = W(j.content, I.checkbox)
                      , S = L.getInput("checkbox");
                    S.type = "checkbox",
                    S.value = 1,
                    S.id = I.checkbox,
                    S.checked = Boolean(T.inputValue),
                    P.querySelector("span").innerHTML = T.inputPlaceholder,
                    z(P);
                    break;
                case "textarea":
                    var E = W(j.content, I.textarea);
                    E.value = T.inputValue,
                    E.placeholder = T.inputPlaceholder,
                    z(E);
                    break;
                case null:
                    break;
                default:
                    R('Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "'.concat(T.input, '"'))
                }
                if ("select" === T.input || "radio" === T.input) {
                    var O = function(e) {
                        return p((t = e,
                        n = [],
                        "undefined" != typeof Map && t instanceof Map ? t.forEach(function(e, t) {
                            n.push([t, e])
                        }) : Object.keys(t).forEach(function(e) {
                            n.push([e, t[e]])
                        }),
                        n));
                        var t, n
                    };
                    H(T.inputOptions) ? (q.showLoading(),
                    T.inputOptions.then(function(e) {
                        L.hideLoading(),
                        O(e)
                    })) : "object" === V(T.inputOptions) ? O(T.inputOptions) : R("Unexpected type of inputOptions! Expected object, Map or Promise, got ".concat(V(T.inputOptions)))
                } else
                    -1 !== ["text", "email", "number", "tel", "textarea"].indexOf(T.input) && H(T.inputValue) && (q.showLoading(),
                    U(d),
                    T.inputValue.then(function(e) {
                        d.value = "number" === T.input ? parseFloat(e) || 0 : e + "",
                        z(d),
                        d.focus(),
                        L.hideLoading()
                    }).catch(function(e) {
                        R("Error in inputValue promise: " + e),
                        d.value = "",
                        z(d),
                        d.focus(),
                        L.hideLoading()
                    }));
                Se(T),
                T.toast || (M(T.allowEnterKey) ? T.focusCancel && K(j.cancelButton) ? j.cancelButton.focus() : T.focusConfirm && K(j.confirmButton) ? j.confirmButton.focus() : c(-1, 1) : document.activeElement && document.activeElement.blur()),
                j.container.scrollTop = 0
            }
            )
        }
    });
    function Le() {
        if ("undefined" != typeof window) {
            "undefined" == typeof Promise && R("This package requires a Promise library, please include a shim to enable it in this browser (See: https://github.com/sweetalert2/sweetalert2/wiki/Migration-from-SweetAlert-to-SweetAlert2#1-ie-support)");
            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
                t[n] = arguments[n];
            if (0 === t.length)
                return R("At least 1 argument is expected!"),
                !1;
            Ee = this;
            var o = Object.freeze(this.constructor.argsToParams(t));
            Object.defineProperties(this, {
                params: {
                    value: o,
                    writable: !1,
                    enumerable: !0
                }
            });
            var r = this._main(this.params);
            xe.promise.set(this, r)
        }
    }
    Le.prototype.then = function(e, t) {
        return xe.promise.get(this).then(e, t)
    }
    ,
    Le.prototype.catch = function(e) {
        return xe.promise.get(this).catch(e)
    }
    ,
    Le.prototype.finally = function(e) {
        return xe.promise.get(this).finally(e)
    }
    ,
    i(Le.prototype, Oe),
    i(Le, we),
    Object.keys(Oe).forEach(function(t) {
        Le[t] = function() {
            var e;
            if (Ee)
                return (e = Ee)[t].apply(e, arguments)
        }
    }),
    Le.DismissReason = e,
    Le.noop = function() {}
    ,
    Le.version = "7.26.27";
    var Te, je, qe = ue((Te = Le,
    je = function(e) {
        function t() {
            return c(this, t),
            d(this, s(t).apply(this, arguments))
        }
        return a(t, Te),
        r(t, [{
            key: "_main",
            value: function(e) {
                return p(s(t.prototype), "_main", this).call(this, i({}, be, e))
            }
        }], [{
            key: "setDefaults",
            value: function(t) {
                if (h(ge),
                !t || "object" !== V(t))
                    throw new TypeError("SweetAlert2: The argument for setDefaults() is required and has to be a object");
                he(t),
                Object.keys(t).forEach(function(e) {
                    Te.isValidParameter(e) && (be[e] = t[e])
                })
            }
        }, {
            key: "resetDefaults",
            value: function() {
                h(ge),
                be = {}
            }
        }]),
        t
    }(),
    "undefined" != typeof window && "object" === V(window._swalDefaults) && je.setDefaults(window._swalDefaults),
    je));
    return qe.default = qe
}),
"undefined" != typeof window && window.Sweetalert2 && (window.swal = window.sweetAlert = window.Swal = window.SweetAlert = window.Sweetalert2);
"undefined" != typeof document && function(e, t) {
    var n = e.createElement("style");
    if (e.getElementsByTagName("head")[0].appendChild(n),
    n.styleSheet)
        n.styleSheet.disabled || (n.styleSheet.cssText = t);
    else
        try {
            n.innerHTML = t
        } catch (e) {
            n.innerText = t
        }
}(document, "@-webkit-keyframes swal2-show{0%{-webkit-transform:scale(.7);transform:scale(.7)}45%{-webkit-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);transform:scale(.95)}100%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes swal2-show{0%{-webkit-transform:scale(.7);transform:scale(.7)}45%{-webkit-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);transform:scale(.95)}100%{-webkit-transform:scale(1);transform:scale(1)}}@-webkit-keyframes swal2-hide{0%{-webkit-transform:scale(1);transform:scale(1);opacity:1}100%{-webkit-transform:scale(.5);transform:scale(.5);opacity:0}}@keyframes swal2-hide{0%{-webkit-transform:scale(1);transform:scale(1);opacity:1}100%{-webkit-transform:scale(.5);transform:scale(.5);opacity:0}}@-webkit-keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.875em;width:1.5625em}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.875em;width:1.5625em}}@-webkit-keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@-webkit-keyframes swal2-rotate-success-circular-line{0%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}5%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}12%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}100%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}}@keyframes swal2-rotate-success-circular-line{0%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}5%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}12%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}100%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}}@-webkit-keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;-webkit-transform:scale(.4);transform:scale(.4);opacity:0}50%{margin-top:1.625em;-webkit-transform:scale(.4);transform:scale(.4);opacity:0}80%{margin-top:-.375em;-webkit-transform:scale(1.15);transform:scale(1.15)}100%{margin-top:0;-webkit-transform:scale(1);transform:scale(1);opacity:1}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;-webkit-transform:scale(.4);transform:scale(.4);opacity:0}50%{margin-top:1.625em;-webkit-transform:scale(.4);transform:scale(.4);opacity:0}80%{margin-top:-.375em;-webkit-transform:scale(1.15);transform:scale(1.15)}100%{margin-top:0;-webkit-transform:scale(1);transform:scale(1);opacity:1}}@-webkit-keyframes swal2-animate-error-icon{0%{-webkit-transform:rotateX(100deg);transform:rotateX(100deg);opacity:0}100%{-webkit-transform:rotateX(0);transform:rotateX(0);opacity:1}}@keyframes swal2-animate-error-icon{0%{-webkit-transform:rotateX(100deg);transform:rotateX(100deg);opacity:0}100%{-webkit-transform:rotateX(0);transform:rotateX(0);opacity:1}}body.swal2-toast-shown .swal2-container{position:fixed;background-color:transparent}body.swal2-toast-shown .swal2-container.swal2-shown{background-color:transparent}body.swal2-toast-shown .swal2-container.swal2-top{top:0;right:auto;bottom:auto;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{top:0;right:0;bottom:auto;left:auto}body.swal2-toast-shown .swal2-container.swal2-top-left,body.swal2-toast-shown .swal2-container.swal2-top-start{top:0;right:auto;bottom:auto;left:0}body.swal2-toast-shown .swal2-container.swal2-center-left,body.swal2-toast-shown .swal2-container.swal2-center-start{top:50%;right:auto;bottom:auto;left:0;-webkit-transform:translateY(-50%);transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{top:50%;right:auto;bottom:auto;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{top:50%;right:0;bottom:auto;left:auto;-webkit-transform:translateY(-50%);transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-left,body.swal2-toast-shown .swal2-container.swal2-bottom-start{top:auto;right:auto;bottom:0;left:0}body.swal2-toast-shown .swal2-container.swal2-bottom{top:auto;right:auto;bottom:0;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{top:auto;right:0;bottom:0;left:auto}body.swal2-toast-column .swal2-toast{flex-direction:column;align-items:stretch}body.swal2-toast-column .swal2-toast .swal2-actions{flex:1;align-self:stretch;height:2.2em;margin-top:.3125em}body.swal2-toast-column .swal2-toast .swal2-loading{justify-content:center}body.swal2-toast-column .swal2-toast .swal2-input{height:2em;margin:.3125em auto;font-size:1em}body.swal2-toast-column .swal2-toast .swal2-validationerror{font-size:1em}.swal2-popup.swal2-toast{flex-direction:row;align-items:center;width:auto;padding:.625em;box-shadow:0 0 .625em #d9d9d9;overflow-y:hidden}.swal2-popup.swal2-toast .swal2-header{flex-direction:row}.swal2-popup.swal2-toast .swal2-title{flex-grow:1;justify-content:flex-start;margin:0 .6em;font-size:1em}.swal2-popup.swal2-toast .swal2-footer{margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-popup.swal2-toast .swal2-close{position:initial;width:.8em;height:.8em;line-height:.8}.swal2-popup.swal2-toast .swal2-content{justify-content:flex-start;font-size:1em}.swal2-popup.swal2-toast .swal2-icon{width:2em;min-width:2em;height:2em;margin:0}.swal2-popup.swal2-toast .swal2-icon-text{font-size:2em;font-weight:700;line-height:1em}.swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-popup.swal2-toast .swal2-actions{height:auto;margin:0 .3125em}.swal2-popup.swal2-toast .swal2-styled{margin:0 .3125em;padding:.3125em .625em;font-size:1em}.swal2-popup.swal2-toast .swal2-styled:focus{box-shadow:0 0 0 .0625em #fff,0 0 0 .125em rgba(50,100,150,.4)}.swal2-popup.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:2em;height:2.8125em;-webkit-transform:rotate(45deg);transform:rotate(45deg);border-radius:50%}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.25em;left:-.9375em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:2em 2em;transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.25em;left:.9375em;-webkit-transform-origin:0 2em;transform-origin:0 2em;border-radius:0 4em 4em 0}.swal2-popup.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.swal2-popup.swal2-toast.swal2-show{-webkit-animation:showSweetToast .5s;animation:showSweetToast .5s}.swal2-popup.swal2-toast.swal2-hide{-webkit-animation:hideSweetToast .2s forwards;animation:hideSweetToast .2s forwards}.swal2-popup.swal2-toast .swal2-animate-success-icon .swal2-success-line-tip{-webkit-animation:animate-toast-success-tip .75s;animation:animate-toast-success-tip .75s}.swal2-popup.swal2-toast .swal2-animate-success-icon .swal2-success-line-long{-webkit-animation:animate-toast-success-long .75s;animation:animate-toast-success-long .75s}@-webkit-keyframes showSweetToast{0%{-webkit-transform:translateY(-.625em) rotateZ(2deg);transform:translateY(-.625em) rotateZ(2deg);opacity:0}33%{-webkit-transform:translateY(0) rotateZ(-2deg);transform:translateY(0) rotateZ(-2deg);opacity:.5}66%{-webkit-transform:translateY(.3125em) rotateZ(2deg);transform:translateY(.3125em) rotateZ(2deg);opacity:.7}100%{-webkit-transform:translateY(0) rotateZ(0);transform:translateY(0) rotateZ(0);opacity:1}}@keyframes showSweetToast{0%{-webkit-transform:translateY(-.625em) rotateZ(2deg);transform:translateY(-.625em) rotateZ(2deg);opacity:0}33%{-webkit-transform:translateY(0) rotateZ(-2deg);transform:translateY(0) rotateZ(-2deg);opacity:.5}66%{-webkit-transform:translateY(.3125em) rotateZ(2deg);transform:translateY(.3125em) rotateZ(2deg);opacity:.7}100%{-webkit-transform:translateY(0) rotateZ(0);transform:translateY(0) rotateZ(0);opacity:1}}@-webkit-keyframes hideSweetToast{0%{opacity:1}33%{opacity:.5}100%{-webkit-transform:rotateZ(1deg);transform:rotateZ(1deg);opacity:0}}@keyframes hideSweetToast{0%{opacity:1}33%{opacity:.5}100%{-webkit-transform:rotateZ(1deg);transform:rotateZ(1deg);opacity:0}}@-webkit-keyframes animate-toast-success-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes animate-toast-success-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@-webkit-keyframes animate-toast-success-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@keyframes animate-toast-success-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow-y:hidden}body.swal2-height-auto{height:auto!important}body.swal2-no-backdrop .swal2-shown{top:auto;right:auto;bottom:auto;left:auto;background-color:transparent}body.swal2-no-backdrop .swal2-shown>.swal2-modal{box-shadow:0 0 10px rgba(0,0,0,.4)}body.swal2-no-backdrop .swal2-shown.swal2-top{top:0;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}body.swal2-no-backdrop .swal2-shown.swal2-top-left,body.swal2-no-backdrop .swal2-shown.swal2-top-start{top:0;left:0}body.swal2-no-backdrop .swal2-shown.swal2-top-end,body.swal2-no-backdrop .swal2-shown.swal2-top-right{top:0;right:0}body.swal2-no-backdrop .swal2-shown.swal2-center{top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}body.swal2-no-backdrop .swal2-shown.swal2-center-left,body.swal2-no-backdrop .swal2-shown.swal2-center-start{top:50%;left:0;-webkit-transform:translateY(-50%);transform:translateY(-50%)}body.swal2-no-backdrop .swal2-shown.swal2-center-end,body.swal2-no-backdrop .swal2-shown.swal2-center-right{top:50%;right:0;-webkit-transform:translateY(-50%);transform:translateY(-50%)}body.swal2-no-backdrop .swal2-shown.swal2-bottom{bottom:0;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}body.swal2-no-backdrop .swal2-shown.swal2-bottom-left,body.swal2-no-backdrop .swal2-shown.swal2-bottom-start{bottom:0;left:0}body.swal2-no-backdrop .swal2-shown.swal2-bottom-end,body.swal2-no-backdrop .swal2-shown.swal2-bottom-right{right:0;bottom:0}.swal2-container{display:flex;position:fixed;top:0;right:0;bottom:0;left:0;flex-direction:row;align-items:center;justify-content:center;padding:10px;background-color:transparent;z-index:1060;overflow-x:hidden;-webkit-overflow-scrolling:touch}.swal2-container.swal2-top{align-items:flex-start}.swal2-container.swal2-top-left,.swal2-container.swal2-top-start{align-items:flex-start;justify-content:flex-start}.swal2-container.swal2-top-end,.swal2-container.swal2-top-right{align-items:flex-start;justify-content:flex-end}.swal2-container.swal2-center{align-items:center}.swal2-container.swal2-center-left,.swal2-container.swal2-center-start{align-items:center;justify-content:flex-start}.swal2-container.swal2-center-end,.swal2-container.swal2-center-right{align-items:center;justify-content:flex-end}.swal2-container.swal2-bottom{align-items:flex-end}.swal2-container.swal2-bottom-left,.swal2-container.swal2-bottom-start{align-items:flex-end;justify-content:flex-start}.swal2-container.swal2-bottom-end,.swal2-container.swal2-bottom-right{align-items:flex-end;justify-content:flex-end}.swal2-container.swal2-grow-fullscreen>.swal2-modal{display:flex!important;flex:1;align-self:stretch;justify-content:center}.swal2-container.swal2-grow-row>.swal2-modal{display:flex!important;flex:1;align-content:center;justify-content:center}.swal2-container.swal2-grow-column{flex:1;flex-direction:column}.swal2-container.swal2-grow-column.swal2-bottom,.swal2-container.swal2-grow-column.swal2-center,.swal2-container.swal2-grow-column.swal2-top{align-items:center}.swal2-container.swal2-grow-column.swal2-bottom-left,.swal2-container.swal2-grow-column.swal2-bottom-start,.swal2-container.swal2-grow-column.swal2-center-left,.swal2-container.swal2-grow-column.swal2-center-start,.swal2-container.swal2-grow-column.swal2-top-left,.swal2-container.swal2-grow-column.swal2-top-start{align-items:flex-start}.swal2-container.swal2-grow-column.swal2-bottom-end,.swal2-container.swal2-grow-column.swal2-bottom-right,.swal2-container.swal2-grow-column.swal2-center-end,.swal2-container.swal2-grow-column.swal2-center-right,.swal2-container.swal2-grow-column.swal2-top-end,.swal2-container.swal2-grow-column.swal2-top-right{align-items:flex-end}.swal2-container.swal2-grow-column>.swal2-modal{display:flex!important;flex:1;align-content:center;justify-content:center}.swal2-container:not(.swal2-top):not(.swal2-top-start):not(.swal2-top-end):not(.swal2-top-left):not(.swal2-top-right):not(.swal2-center-start):not(.swal2-center-end):not(.swal2-center-left):not(.swal2-center-right):not(.swal2-bottom):not(.swal2-bottom-start):not(.swal2-bottom-end):not(.swal2-bottom-left):not(.swal2-bottom-right):not(.swal2-grow-fullscreen)>.swal2-modal{margin:auto}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-container .swal2-modal{margin:0!important}}.swal2-container.swal2-fade{transition:background-color .1s}.swal2-container.swal2-shown{background-color:rgba(0,0,0,.4)}.swal2-popup{display:none;position:relative;flex-direction:column;justify-content:center;width:32em;max-width:100%;padding:1.25em;border-radius:.3125em;background:#fff;font-family:inherit;font-size:1rem;box-sizing:border-box}.swal2-popup:focus{outline:0}.swal2-popup.swal2-loading{overflow-y:hidden}.swal2-popup .swal2-header{display:flex;flex-direction:column;align-items:center}.swal2-popup .swal2-title{display:block;position:relative;max-width:100%;margin:0 0 .4em;padding:0;color:#595959;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;word-wrap:break-word}.swal2-popup .swal2-actions{align-items:center;justify-content:center;margin:1.25em auto 0;z-index:1}.swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled[disabled]{opacity:.4}.swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled:hover{background-image:linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.1))}.swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled:active{background-image:linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.2))}.swal2-popup .swal2-actions.swal2-loading .swal2-styled.swal2-confirm{width:2.5em;height:2.5em;margin:.46875em;padding:0;border:.25em solid transparent;border-radius:100%;border-color:transparent;background-color:transparent!important;color:transparent;cursor:default;box-sizing:border-box;-webkit-animation:swal2-rotate-loading 1.5s linear 0s infinite normal;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.swal2-popup .swal2-actions.swal2-loading .swal2-styled.swal2-cancel{margin-right:30px;margin-left:30px}.swal2-popup .swal2-actions.swal2-loading :not(.swal2-styled).swal2-confirm::after{display:inline-block;width:15px;height:15px;margin-left:5px;border:3px solid #999;border-radius:50%;border-right-color:transparent;box-shadow:1px 1px 1px #fff;content:'';-webkit-animation:swal2-rotate-loading 1.5s linear 0s infinite normal;animation:swal2-rotate-loading 1.5s linear 0s infinite normal}.swal2-popup .swal2-styled{margin:0 .3125em;padding:.625em 2em;font-weight:500;box-shadow:none}.swal2-popup .swal2-styled:not([disabled]){cursor:pointer}.swal2-popup .swal2-styled.swal2-confirm{border:0;border-radius:.25em;background:initial;background-color:#3085d6;color:#fff;font-size:1.0625em}.swal2-popup .swal2-styled.swal2-cancel{border:0;border-radius:.25em;background:initial;background-color:#aaa;color:#fff;font-size:1.0625em}.swal2-popup .swal2-styled:focus{outline:0;box-shadow:0 0 0 2px #fff,0 0 0 4px rgba(50,100,150,.4)}.swal2-popup .swal2-styled::-moz-focus-inner{border:0}.swal2-popup .swal2-footer{justify-content:center;margin:1.25em 0 0;padding:1em 0 0;border-top:1px solid #eee;color:#545454;font-size:1em}.swal2-popup .swal2-image{max-width:100%;margin:1.25em auto}.swal2-popup .swal2-close{position:absolute;top:0;right:0;justify-content:center;width:1.2em;height:1.2em;padding:0;transition:color .1s ease-out;border:none;border-radius:0;background:0 0;color:#ccc;font-family:serif;font-size:2.5em;line-height:1.2;cursor:pointer;overflow:hidden}.swal2-popup .swal2-close:hover{-webkit-transform:none;transform:none;color:#f27474}.swal2-popup>.swal2-checkbox,.swal2-popup>.swal2-file,.swal2-popup>.swal2-input,.swal2-popup>.swal2-radio,.swal2-popup>.swal2-select,.swal2-popup>.swal2-textarea{display:none}.swal2-popup .swal2-content{justify-content:center;margin:0;padding:0;color:#545454;font-size:1.125em;font-weight:300;line-height:normal;z-index:1;word-wrap:break-word}.swal2-popup #swal2-content{text-align:center}.swal2-popup .swal2-checkbox,.swal2-popup .swal2-file,.swal2-popup .swal2-input,.swal2-popup .swal2-radio,.swal2-popup .swal2-select,.swal2-popup .swal2-textarea{margin:1em auto}.swal2-popup .swal2-file,.swal2-popup .swal2-input,.swal2-popup .swal2-textarea{width:100%;transition:border-color .3s,box-shadow .3s;border:1px solid #d9d9d9;border-radius:.1875em;font-size:1.125em;box-shadow:inset 0 1px 1px rgba(0,0,0,.06);box-sizing:border-box}.swal2-popup .swal2-file.swal2-inputerror,.swal2-popup .swal2-input.swal2-inputerror,.swal2-popup .swal2-textarea.swal2-inputerror{border-color:#f27474!important;box-shadow:0 0 2px #f27474!important}.swal2-popup .swal2-file:focus,.swal2-popup .swal2-input:focus,.swal2-popup .swal2-textarea:focus{border:1px solid #b4dbed;outline:0;box-shadow:0 0 3px #c4e6f5}.swal2-popup .swal2-file::-webkit-input-placeholder,.swal2-popup .swal2-input::-webkit-input-placeholder,.swal2-popup .swal2-textarea::-webkit-input-placeholder{color:#ccc}.swal2-popup .swal2-file:-ms-input-placeholder,.swal2-popup .swal2-input:-ms-input-placeholder,.swal2-popup .swal2-textarea:-ms-input-placeholder{color:#ccc}.swal2-popup .swal2-file::-ms-input-placeholder,.swal2-popup .swal2-input::-ms-input-placeholder,.swal2-popup .swal2-textarea::-ms-input-placeholder{color:#ccc}.swal2-popup .swal2-file::placeholder,.swal2-popup .swal2-input::placeholder,.swal2-popup .swal2-textarea::placeholder{color:#ccc}.swal2-popup .swal2-range input{width:80%}.swal2-popup .swal2-range output{width:20%;font-weight:600;text-align:center}.swal2-popup .swal2-range input,.swal2-popup .swal2-range output{height:2.625em;margin:1em auto;padding:0;font-size:1.125em;line-height:2.625em}.swal2-popup .swal2-input{height:2.625em;padding:0 .75em}.swal2-popup .swal2-input[type=number]{max-width:10em}.swal2-popup .swal2-file{font-size:1.125em}.swal2-popup .swal2-textarea{height:6.75em;padding:.75em}.swal2-popup .swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;color:#545454;font-size:1.125em}.swal2-popup .swal2-checkbox,.swal2-popup .swal2-radio{align-items:center;justify-content:center}.swal2-popup .swal2-checkbox label,.swal2-popup .swal2-radio label{margin:0 .6em;font-size:1.125em}.swal2-popup .swal2-checkbox input,.swal2-popup .swal2-radio input{margin:0 .4em}.swal2-popup .swal2-validationerror{display:none;align-items:center;justify-content:center;padding:.625em;background:#f0f0f0;color:#666;font-size:1em;font-weight:300;overflow:hidden}.swal2-popup .swal2-validationerror::before{display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center;content:'!';zoom:normal}@supports (-ms-accelerator:true){.swal2-range input{width:100%!important}.swal2-range output{display:none}}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-range input{width:100%!important}.swal2-range output{display:none}}@-moz-document url-prefix(){.swal2-close:focus{outline:2px solid rgba(50,100,150,.4)}}.swal2-icon{position:relative;justify-content:center;width:5em;height:5em;margin:1.25em auto 1.875em;border:.25em solid transparent;border-radius:50%;line-height:5em;cursor:default;box-sizing:content-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;zoom:normal}.swal2-icon-text{font-size:3.75em}.swal2-icon.swal2-error{border-color:#f27474}.swal2-icon.swal2-error .swal2-x-mark{position:relative;flex-grow:1}.swal2-icon.swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.swal2-icon.swal2-warning{border-color:#facea8;color:#f8bb86}.swal2-icon.swal2-info{border-color:#9de0f6;color:#3fc3ee}.swal2-icon.swal2-question{border-color:#c9dae1;color:#87adbd}.swal2-icon.swal2-success{border-color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;-webkit-transform:rotate(45deg);transform:rotate(45deg);border-radius:50%}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.4375em;left:-2.0635em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:3.75em 3.75em;transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.6875em;left:1.875em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:0 3.75em;transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}.swal2-icon.swal2-success .swal2-success-ring{position:absolute;top:-.25em;left:-.25em;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%;z-index:2;box-sizing:content-box}.swal2-icon.swal2-success .swal2-success-fix{position:absolute;top:.5em;left:1.625em;width:.4375em;height:5.625em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);z-index:1}.swal2-icon.swal2-success [class^=swal2-success-line]{display:block;position:absolute;height:.3125em;border-radius:.125em;background-color:#a5dc86;z-index:2}.swal2-icon.swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.875em;width:1.5625em;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.swal2-icon.swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.swal2-progresssteps{align-items:center;margin:0 0 1.25em;padding:0;font-weight:600}.swal2-progresssteps li{display:inline-block;position:relative}.swal2-progresssteps .swal2-progresscircle{width:2em;height:2em;border-radius:2em;background:#3085d6;color:#fff;line-height:2em;text-align:center;z-index:20}.swal2-progresssteps .swal2-progresscircle:first-child{margin-left:0}.swal2-progresssteps .swal2-progresscircle:last-child{margin-right:0}.swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep{background:#3085d6}.swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep~.swal2-progresscircle{background:#add8e6}.swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep~.swal2-progressline{background:#add8e6}.swal2-progresssteps .swal2-progressline{width:2.5em;height:.4em;margin:0 -1px;background:#3085d6;z-index:10}[class^=swal2]{-webkit-tap-highlight-color:transparent}.swal2-show{-webkit-animation:swal2-show .3s;animation:swal2-show .3s}.swal2-show.swal2-noanimation{-webkit-animation:none;animation:none}.swal2-hide{-webkit-animation:swal2-hide .15s forwards;animation:swal2-hide .15s forwards}.swal2-hide.swal2-noanimation{-webkit-animation:none;animation:none}[dir=rtl] .swal2-close{right:auto;left:0}.swal2-animate-success-icon .swal2-success-line-tip{-webkit-animation:swal2-animate-success-line-tip .75s;animation:swal2-animate-success-line-tip .75s}.swal2-animate-success-icon .swal2-success-line-long{-webkit-animation:swal2-animate-success-line-long .75s;animation:swal2-animate-success-line-long .75s}.swal2-animate-success-icon .swal2-success-circular-line-right{-webkit-animation:swal2-rotate-success-circular-line 4.25s ease-in;animation:swal2-rotate-success-circular-line 4.25s ease-in}.swal2-animate-error-icon{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-animate-error-icon .swal2-x-mark{-webkit-animation:swal2-animate-error-x-mark .5s;animation:swal2-animate-error-x-mark .5s}@-webkit-keyframes swal2-rotate-loading{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes swal2-rotate-loading{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}");
;;"use strict";
if (!window.jscolor) {
    window.jscolor = (function() {
        var jsc = {
            register: function() {
                jsc.attachDOMReadyEvent(jsc.init);
                jsc.attachEvent(document, 'mousedown', jsc.onDocumentMouseDown);
                jsc.attachEvent(document, 'touchstart', jsc.onDocumentTouchStart);
                jsc.attachEvent(window, 'resize', jsc.onWindowResize);
            },
            init: function() {
                if (jsc.jscolor.lookupClass) {
                    jsc.jscolor.installByClassName(jsc.jscolor.lookupClass);
                }
            },
            tryInstallOnElements: function(elms, className) {
                var matchClass = new RegExp('(^|\\s)(' + className + ')(\\s*(\\{[^}]*\\})|\\s|$)','i');
                for (var i = 0; i < elms.length; i += 1) {
                    if (elms[i].type !== undefined && elms[i].type.toLowerCase() == 'color') {
                        if (jsc.isColorAttrSupported) {
                            continue;
                        }
                    }
                    var m;
                    if (!elms[i].jscolor && elms[i].className && (m = elms[i].className.match(matchClass))) {
                        var targetElm = elms[i];
                        var optsStr = null;
                        var dataOptions = jsc.getDataAttr(targetElm, 'jscolor');
                        if (dataOptions !== null) {
                            optsStr = dataOptions;
                        } else if (m[4]) {
                            optsStr = m[4];
                        }
                        var opts = {};
                        if (optsStr) {
                            try {
                                opts = (new Function('return (' + optsStr + ')'))();
                            } catch (eParseError) {
                                jsc.warn('Error parsing jscolor options: ' + eParseError + ':\n' + optsStr);
                            }
                        }
                        targetElm.jscolor = new jsc.jscolor(targetElm,opts);
                    }
                }
            },
            isColorAttrSupported: (function() {
                var elm = document.createElement('input');
                if (elm.setAttribute) {
                    elm.setAttribute('type', 'color');
                    if (elm.type.toLowerCase() == 'color') {
                        return true;
                    }
                }
                return false;
            }
            )(),
            isCanvasSupported: (function() {
                var elm = document.createElement('canvas');
                return !!(elm.getContext && elm.getContext('2d'));
            }
            )(),
            fetchElement: function(mixed) {
                return typeof mixed === 'string' ? document.getElementById(mixed) : mixed;
            },
            isElementType: function(elm, type) {
                return elm.nodeName.toLowerCase() === type.toLowerCase();
            },
            getDataAttr: function(el, name) {
                var attrName = 'data-' + name;
                var attrValue = el.getAttribute(attrName);
                if (attrValue !== null) {
                    return attrValue;
                }
                return null;
            },
            attachEvent: function(el, evnt, func) {
                if (el.addEventListener) {
                    el.addEventListener(evnt, func, false);
                } else if (el.attachEvent) {
                    el.attachEvent('on' + evnt, func);
                }
            },
            detachEvent: function(el, evnt, func) {
                if (el.removeEventListener) {
                    el.removeEventListener(evnt, func, false);
                } else if (el.detachEvent) {
                    el.detachEvent('on' + evnt, func);
                }
            },
            _attachedGroupEvents: {},
            attachGroupEvent: function(groupName, el, evnt, func) {
                if (!jsc._attachedGroupEvents.hasOwnProperty(groupName)) {
                    jsc._attachedGroupEvents[groupName] = [];
                }
                jsc._attachedGroupEvents[groupName].push([el, evnt, func]);
                jsc.attachEvent(el, evnt, func);
            },
            detachGroupEvents: function(groupName) {
                if (jsc._attachedGroupEvents.hasOwnProperty(groupName)) {
                    for (var i = 0; i < jsc._attachedGroupEvents[groupName].length; i += 1) {
                        var evt = jsc._attachedGroupEvents[groupName][i];
                        jsc.detachEvent(evt[0], evt[1], evt[2]);
                    }
                    delete jsc._attachedGroupEvents[groupName];
                }
            },
            attachDOMReadyEvent: function(func) {
                var fired = false;
                var fireOnce = function() {
                    if (!fired) {
                        fired = true;
                        func();
                    }
                };
                if (document.readyState === 'complete') {
                    setTimeout(fireOnce, 1);
                    return;
                }
                if (document.addEventListener) {
                    document.addEventListener('DOMContentLoaded', fireOnce, false);
                    window.addEventListener('load', fireOnce, false);
                } else if (document.attachEvent) {
                    document.attachEvent('onreadystatechange', function() {
                        if (document.readyState === 'complete') {
                            document.detachEvent('onreadystatechange', arguments.callee);
                            fireOnce();
                        }
                    })
                    window.attachEvent('onload', fireOnce);
                    if (document.documentElement.doScroll && window == window.top) {
                        var tryScroll = function() {
                            if (!document.body) {
                                return;
                            }
                            try {
                                document.documentElement.doScroll('left');
                                fireOnce();
                            } catch (e) {
                                setTimeout(tryScroll, 1);
                            }
                        };
                        tryScroll();
                    }
                }
            },
            warn: function(msg) {
                if (window.console && window.console.warn) {
                    window.console.warn(msg);
                }
            },
            preventDefault: function(e) {
                if (e.preventDefault) {
                    e.preventDefault();
                }
                e.returnValue = false;
            },
            captureTarget: function(target) {
                if (target.setCapture) {
                    jsc._capturedTarget = target;
                    jsc._capturedTarget.setCapture();
                }
            },
            releaseTarget: function() {
                if (jsc._capturedTarget) {
                    jsc._capturedTarget.releaseCapture();
                    jsc._capturedTarget = null;
                }
            },
            fireEvent: function(el, evnt) {
                if (!el) {
                    return;
                }
                if (document.createEvent) {
                    var ev = document.createEvent('HTMLEvents');
                    ev.initEvent(evnt, true, true);
                    el.dispatchEvent(ev);
                } else if (document.createEventObject) {
                    var ev = document.createEventObject();
                    el.fireEvent('on' + evnt, ev);
                } else if (el['on' + evnt]) {
                    el['on' + evnt]();
                }
            },
            classNameToList: function(className) {
                return className.replace(/^\s+|\s+$/g, '').split(/\s+/);
            },
            hasClass: function(elm, className) {
                if (!className) {
                    return false;
                }
                return -1 != (' ' + elm.className.replace(/\s+/g, ' ') + ' ').indexOf(' ' + className + ' ');
            },
            setClass: function(elm, className) {
                var classList = jsc.classNameToList(className);
                for (var i = 0; i < classList.length; i += 1) {
                    if (!jsc.hasClass(elm, classList[i])) {
                        elm.className += (elm.className ? ' ' : '') + classList[i];
                    }
                }
            },
            unsetClass: function(elm, className) {
                var classList = jsc.classNameToList(className);
                for (var i = 0; i < classList.length; i += 1) {
                    var repl = new RegExp('^\\s*' + classList[i] + '\\s*|' + '\\s*' + classList[i] + '\\s*$|' + '\\s+' + classList[i] + '(\\s+)','g');
                    elm.className = elm.className.replace(repl, '$1');
                }
            },
            getStyle: function(elm) {
                return window.getComputedStyle ? window.getComputedStyle(elm) : elm.currentStyle;
            },
            setStyle: (function() {
                var helper = document.createElement('div');
                var getSupportedProp = function(names) {
                    for (var i = 0; i < names.length; i += 1) {
                        if (names[i]in helper.style) {
                            return names[i];
                        }
                    }
                };
                var props = {
                    borderRadius: getSupportedProp(['borderRadius', 'MozBorderRadius', 'webkitBorderRadius']),
                    boxShadow: getSupportedProp(['boxShadow', 'MozBoxShadow', 'webkitBoxShadow'])
                };
                return function(elm, prop, value) {
                    switch (prop.toLowerCase()) {
                    case 'opacity':
                        var alphaOpacity = Math.round(parseFloat(value) * 100);
                        elm.style.opacity = value;
                        elm.style.filter = 'alpha(opacity=' + alphaOpacity + ')';
                        break;
                    default:
                        elm.style[props[prop]] = value;
                        break;
                    }
                }
                ;
            }
            )(),
            setBorderRadius: function(elm, value) {
                jsc.setStyle(elm, 'borderRadius', value || '0');
            },
            setBoxShadow: function(elm, value) {
                jsc.setStyle(elm, 'boxShadow', value || 'none');
            },
            getElementPos: function(e, relativeToViewport) {
                var x = 0
                  , y = 0;
                var rect = e.getBoundingClientRect();
                x = rect.left;
                y = rect.top;
                if (!relativeToViewport) {
                    var viewPos = jsc.getViewPos();
                    x += viewPos[0];
                    y += viewPos[1];
                }
                return [x, y];
            },
            getElementSize: function(e) {
                return [e.offsetWidth, e.offsetHeight];
            },
            getAbsPointerPos: function(e) {
                if (!e) {
                    e = window.event;
                }
                var x = 0
                  , y = 0;
                if (typeof e.changedTouches !== 'undefined' && e.changedTouches.length) {
                    x = e.changedTouches[0].clientX;
                    y = e.changedTouches[0].clientY;
                } else if (typeof e.clientX === 'number') {
                    x = e.clientX;
                    y = e.clientY;
                }
                return {
                    x: x,
                    y: y
                };
            },
            getRelPointerPos: function(e) {
                if (!e) {
                    e = window.event;
                }
                var target = e.target || e.srcElement;
                var targetRect = target.getBoundingClientRect();
                var x = 0
                  , y = 0;
                var clientX = 0
                  , clientY = 0;
                if (typeof e.changedTouches !== 'undefined' && e.changedTouches.length) {
                    clientX = e.changedTouches[0].clientX;
                    clientY = e.changedTouches[0].clientY;
                } else if (typeof e.clientX === 'number') {
                    clientX = e.clientX;
                    clientY = e.clientY;
                }
                x = clientX - targetRect.left;
                y = clientY - targetRect.top;
                return {
                    x: x,
                    y: y
                };
            },
            getViewPos: function() {
                var doc = document.documentElement;
                return [(window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0), (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)];
            },
            getViewSize: function() {
                var doc = document.documentElement;
                return [(window.innerWidth || doc.clientWidth), (window.innerHeight || doc.clientHeight), ];
            },
            redrawPosition: function() {
                if (jsc.picker && jsc.picker.owner) {
                    var thisObj = jsc.picker.owner;
                    var tp, vp;
                    if (thisObj.fixed) {
                        tp = jsc.getElementPos(thisObj.targetElement, true);
                        vp = [0, 0];
                    } else {
                        tp = jsc.getElementPos(thisObj.targetElement);
                        vp = jsc.getViewPos();
                    }
                    var ts = jsc.getElementSize(thisObj.targetElement);
                    var vs = jsc.getViewSize();
                    var ps = jsc.getPickerOuterDims(thisObj);
                    var a, b, c;
                    switch (thisObj.position.toLowerCase()) {
                    case 'left':
                        a = 1;
                        b = 0;
                        c = -1;
                        break;
                    case 'right':
                        a = 1;
                        b = 0;
                        c = 1;
                        break;
                    case 'top':
                        a = 0;
                        b = 1;
                        c = -1;
                        break;
                    default:
                        a = 0;
                        b = 1;
                        c = 1;
                        break;
                    }
                    var l = (ts[b] + ps[b]) / 2;
                    if (!thisObj.smartPosition) {
                        var pp = [tp[a], tp[b] + ts[b] - l + l * c];
                    } else {
                        var pp = [-vp[a] + tp[a] + ps[a] > vs[a] ? (-vp[a] + tp[a] + ts[a] / 2 > vs[a] / 2 && tp[a] + ts[a] - ps[a] >= 0 ? tp[a] + ts[a] - ps[a] : tp[a]) : tp[a], -vp[b] + tp[b] + ts[b] + ps[b] - l + l * c > vs[b] ? (-vp[b] + tp[b] + ts[b] / 2 > vs[b] / 2 && tp[b] + ts[b] - l - l * c >= 0 ? tp[b] + ts[b] - l - l * c : tp[b] + ts[b] - l + l * c) : (tp[b] + ts[b] - l + l * c >= 0 ? tp[b] + ts[b] - l + l * c : tp[b] + ts[b] - l - l * c)];
                    }
                    var x = pp[a];
                    var y = pp[b];
                    var positionValue = thisObj.fixed ? 'fixed' : 'absolute';
                    var contractShadow = (pp[0] + ps[0] > tp[0] || pp[0] < tp[0] + ts[0]) && (pp[1] + ps[1] < tp[1] + ts[1]);
                    jsc._drawPosition(thisObj, x, y, positionValue, contractShadow);
                }
            },
            _drawPosition: function(thisObj, x, y, positionValue, contractShadow) {
                var vShadow = contractShadow ? 0 : thisObj.shadowBlur;
                jsc.picker.wrap.style.position = positionValue;
                jsc.picker.wrap.style.left = x + 'px';
                jsc.picker.wrap.style.top = y + 'px';
                jsc.setBoxShadow(jsc.picker.boxS, thisObj.shadow ? new jsc.BoxShadow(0,vShadow,thisObj.shadowBlur,0,thisObj.shadowColor) : null);
            },
            getPickerDims: function(thisObj) {
                var displaySlider = !!jsc.getSliderComponent(thisObj);
                var dims = [2 * thisObj.insetWidth + 2 * thisObj.padding + thisObj.width + (displaySlider ? 2 * thisObj.insetWidth + jsc.getPadToSliderPadding(thisObj) + thisObj.sliderSize : 0), 2 * thisObj.insetWidth + 2 * thisObj.padding + thisObj.height + (thisObj.closable ? 2 * thisObj.insetWidth + thisObj.padding + thisObj.buttonHeight : 0)];
                return dims;
            },
            getPickerOuterDims: function(thisObj) {
                var dims = jsc.getPickerDims(thisObj);
                return [dims[0] + 2 * thisObj.borderWidth, dims[1] + 2 * thisObj.borderWidth];
            },
            getPadToSliderPadding: function(thisObj) {
                return Math.max(thisObj.padding, 1.5 * (2 * thisObj.pointerBorderWidth + thisObj.pointerThickness));
            },
            getPadYComponent: function(thisObj) {
                switch (thisObj.mode.charAt(1).toLowerCase()) {
                case 'v':
                    return 'v';
                    break;
                }
                return 's';
            },
            getSliderComponent: function(thisObj) {
                if (thisObj.mode.length > 2) {
                    switch (thisObj.mode.charAt(2).toLowerCase()) {
                    case 's':
                        return 's';
                        break;
                    case 'v':
                        return 'v';
                        break;
                    }
                }
                return null;
            },
            onDocumentMouseDown: function(e) {
                if (!e) {
                    e = window.event;
                }
                var target = e.target || e.srcElement;
                if (target._jscLinkedInstance) {
                    if (target._jscLinkedInstance.showOnClick) {
                        target._jscLinkedInstance.show();
                    }
                } else if (target._jscControlName) {
                    jsc.onControlPointerStart(e, target, target._jscControlName, 'mouse');
                } else {
                    if (jsc.picker && jsc.picker.owner) {
                        jsc.picker.owner.hide();
                    }
                }
            },
            onDocumentTouchStart: function(e) {
                if (!e) {
                    e = window.event;
                }
                var target = e.target || e.srcElement;
                if (target._jscLinkedInstance) {
                    if (target._jscLinkedInstance.showOnClick) {
                        target._jscLinkedInstance.show();
                    }
                } else if (target._jscControlName) {
                    jsc.onControlPointerStart(e, target, target._jscControlName, 'touch');
                } else {
                    if (jsc.picker && jsc.picker.owner) {
                        jsc.picker.owner.hide();
                    }
                }
            },
            onWindowResize: function(e) {
                jsc.redrawPosition();
            },
            onParentScroll: function(e) {
                if (jsc.picker && jsc.picker.owner) {
                    jsc.picker.owner.hide();
                }
            },
            _pointerMoveEvent: {
                mouse: 'mousemove',
                touch: 'touchmove'
            },
            _pointerEndEvent: {
                mouse: 'mouseup',
                touch: 'touchend'
            },
            _pointerOrigin: null,
            _capturedTarget: null,
            onControlPointerStart: function(e, target, controlName, pointerType) {
                var thisObj = target._jscInstance;
                jsc.preventDefault(e);
                jsc.captureTarget(target);
                var registerDragEvents = function(doc, offset) {
                    jsc.attachGroupEvent('drag', doc, jsc._pointerMoveEvent[pointerType], jsc.onDocumentPointerMove(e, target, controlName, pointerType, offset));
                    jsc.attachGroupEvent('drag', doc, jsc._pointerEndEvent[pointerType], jsc.onDocumentPointerEnd(e, target, controlName, pointerType));
                };
                registerDragEvents(document, [0, 0]);
                if (window.parent && window.frameElement) {
                    var rect = window.frameElement.getBoundingClientRect();
                    var ofs = [-rect.left, -rect.top];
                    registerDragEvents(window.parent.window.document, ofs);
                }
                var abs = jsc.getAbsPointerPos(e);
                var rel = jsc.getRelPointerPos(e);
                jsc._pointerOrigin = {
                    x: abs.x - rel.x,
                    y: abs.y - rel.y
                };
                switch (controlName) {
                case 'pad':
                    switch (jsc.getSliderComponent(thisObj)) {
                    case 's':
                        if (thisObj.hsv[1] === 0) {
                            thisObj.fromHSV(null, 100, null);
                        }
                        ;break;
                    case 'v':
                        if (thisObj.hsv[2] === 0) {
                            thisObj.fromHSV(null, null, 100);
                        }
                        ;break;
                    }
                    jsc.setPad(thisObj, e, 0, 0);
                    break;
                case 'sld':
                    jsc.setSld(thisObj, e, 0);
                    break;
                }
                jsc.dispatchFineChange(thisObj);
            },
            onDocumentPointerMove: function(e, target, controlName, pointerType, offset) {
                return function(e) {
                    var thisObj = target._jscInstance;
                    switch (controlName) {
                    case 'pad':
                        if (!e) {
                            e = window.event;
                        }
                        jsc.setPad(thisObj, e, offset[0], offset[1]);
                        jsc.dispatchFineChange(thisObj);
                        break;
                    case 'sld':
                        if (!e) {
                            e = window.event;
                        }
                        jsc.setSld(thisObj, e, offset[1]);
                        jsc.dispatchFineChange(thisObj);
                        break;
                    }
                }
            },
            onDocumentPointerEnd: function(e, target, controlName, pointerType) {
                return function(e) {
                    var thisObj = target._jscInstance;
                    jsc.detachGroupEvents('drag');
                    jsc.releaseTarget();
                    jsc.dispatchChange(thisObj);
                }
                ;
            },
            dispatchChange: function(thisObj) {
                if (thisObj.valueElement) {
                    if (jsc.isElementType(thisObj.valueElement, 'input')) {
                        jsc.fireEvent(thisObj.valueElement, 'change');
                    }
                }
            },
            dispatchFineChange: function(thisObj) {
                if (thisObj.onFineChange) {
                    var callback;
                    if (typeof thisObj.onFineChange === 'string') {
                        callback = new Function(thisObj.onFineChange);
                    } else {
                        callback = thisObj.onFineChange;
                    }
                    callback.call(thisObj);
                }
            },
            setPad: function(thisObj, e, ofsX, ofsY) {
                var pointerAbs = jsc.getAbsPointerPos(e);
                var x = ofsX + pointerAbs.x - jsc._pointerOrigin.x - thisObj.padding - thisObj.insetWidth;
                var y = ofsY + pointerAbs.y - jsc._pointerOrigin.y - thisObj.padding - thisObj.insetWidth;
                var xVal = x * (360 / (thisObj.width - 1));
                var yVal = 100 - (y * (100 / (thisObj.height - 1)));
                switch (jsc.getPadYComponent(thisObj)) {
                case 's':
                    thisObj.fromHSV(xVal, yVal, null, jsc.leaveSld);
                    break;
                case 'v':
                    thisObj.fromHSV(xVal, null, yVal, jsc.leaveSld);
                    break;
                }
            },
            setSld: function(thisObj, e, ofsY) {
                var pointerAbs = jsc.getAbsPointerPos(e);
                var y = ofsY + pointerAbs.y - jsc._pointerOrigin.y - thisObj.padding - thisObj.insetWidth;
                var yVal = 100 - (y * (100 / (thisObj.height - 1)));
                switch (jsc.getSliderComponent(thisObj)) {
                case 's':
                    thisObj.fromHSV(null, yVal, null, jsc.leavePad);
                    break;
                case 'v':
                    thisObj.fromHSV(null, null, yVal, jsc.leavePad);
                    break;
                }
            },
            _vmlNS: 'jsc_vml_',
            _vmlCSS: 'jsc_vml_css_',
            _vmlReady: false,
            initVML: function() {
                if (!jsc._vmlReady) {
                    var doc = document;
                    if (!doc.namespaces[jsc._vmlNS]) {
                        doc.namespaces.add(jsc._vmlNS, 'urn:schemas-microsoft-com:vml');
                    }
                    if (!doc.styleSheets[jsc._vmlCSS]) {
                        var tags = ['shape', 'shapetype', 'group', 'background', 'path', 'formulas', 'handles', 'fill', 'stroke', 'shadow', 'textbox', 'textpath', 'imagedata', 'line', 'polyline', 'curve', 'rect', 'roundrect', 'oval', 'arc', 'image'];
                        var ss = doc.createStyleSheet();
                        ss.owningElement.id = jsc._vmlCSS;
                        for (var i = 0; i < tags.length; i += 1) {
                            ss.addRule(jsc._vmlNS + '\\:' + tags[i], 'behavior:url(#default#VML);');
                        }
                    }
                    jsc._vmlReady = true;
                }
            },
            createPalette: function() {
                var paletteObj = {
                    elm: null,
                    draw: null
                };
                if (jsc.isCanvasSupported) {
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    var drawFunc = function(width, height, type) {
                        canvas.width = width;
                        canvas.height = height;
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        var hGrad = ctx.createLinearGradient(0, 0, canvas.width, 0);
                        hGrad.addColorStop(0 / 6, '#F00');
                        hGrad.addColorStop(1 / 6, '#FF0');
                        hGrad.addColorStop(2 / 6, '#0F0');
                        hGrad.addColorStop(3 / 6, '#0FF');
                        hGrad.addColorStop(4 / 6, '#00F');
                        hGrad.addColorStop(5 / 6, '#F0F');
                        hGrad.addColorStop(6 / 6, '#F00');
                        ctx.fillStyle = hGrad;
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                        var vGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
                        switch (type.toLowerCase()) {
                        case 's':
                            vGrad.addColorStop(0, 'rgba(255,255,255,0)');
                            vGrad.addColorStop(1, 'rgba(255,255,255,1)');
                            break;
                        case 'v':
                            vGrad.addColorStop(0, 'rgba(0,0,0,0)');
                            vGrad.addColorStop(1, 'rgba(0,0,0,1)');
                            break;
                        }
                        ctx.fillStyle = vGrad;
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                    };
                    paletteObj.elm = canvas;
                    paletteObj.draw = drawFunc;
                } else {
                    jsc.initVML();
                    var vmlContainer = document.createElement('div');
                    vmlContainer.style.position = 'relative';
                    vmlContainer.style.overflow = 'hidden';
                    var hGrad = document.createElement(jsc._vmlNS + ':fill');
                    hGrad.type = 'gradient';
                    hGrad.method = 'linear';
                    hGrad.angle = '90';
                    hGrad.colors = '16.67% #F0F, 33.33% #00F, 50% #0FF, 66.67% #0F0, 83.33% #FF0'
                    var hRect = document.createElement(jsc._vmlNS + ':rect');
                    hRect.style.position = 'absolute';
                    hRect.style.left = -1 + 'px';
                    hRect.style.top = -1 + 'px';
                    hRect.stroked = false;
                    hRect.appendChild(hGrad);
                    vmlContainer.appendChild(hRect);
                    var vGrad = document.createElement(jsc._vmlNS + ':fill');
                    vGrad.type = 'gradient';
                    vGrad.method = 'linear';
                    vGrad.angle = '180';
                    vGrad.opacity = '0';
                    var vRect = document.createElement(jsc._vmlNS + ':rect');
                    vRect.style.position = 'absolute';
                    vRect.style.left = -1 + 'px';
                    vRect.style.top = -1 + 'px';
                    vRect.stroked = false;
                    vRect.appendChild(vGrad);
                    vmlContainer.appendChild(vRect);
                    var drawFunc = function(width, height, type) {
                        vmlContainer.style.width = width + 'px';
                        vmlContainer.style.height = height + 'px';
                        hRect.style.width = vRect.style.width = (width + 1) + 'px';
                        hRect.style.height = vRect.style.height = (height + 1) + 'px';
                        hGrad.color = '#F00';
                        hGrad.color2 = '#F00';
                        switch (type.toLowerCase()) {
                        case 's':
                            vGrad.color = vGrad.color2 = '#FFF';
                            break;
                        case 'v':
                            vGrad.color = vGrad.color2 = '#000';
                            break;
                        }
                    };
                    paletteObj.elm = vmlContainer;
                    paletteObj.draw = drawFunc;
                }
                return paletteObj;
            },
            createSliderGradient: function() {
                var sliderObj = {
                    elm: null,
                    draw: null
                };
                if (jsc.isCanvasSupported) {
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    var drawFunc = function(width, height, color1, color2) {
                        canvas.width = width;
                        canvas.height = height;
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        var grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
                        grad.addColorStop(0, color1);
                        grad.addColorStop(1, color2);
                        ctx.fillStyle = grad;
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                    };
                    sliderObj.elm = canvas;
                    sliderObj.draw = drawFunc;
                } else {
                    jsc.initVML();
                    var vmlContainer = document.createElement('div');
                    vmlContainer.style.position = 'relative';
                    vmlContainer.style.overflow = 'hidden';
                    var grad = document.createElement(jsc._vmlNS + ':fill');
                    grad.type = 'gradient';
                    grad.method = 'linear';
                    grad.angle = '180';
                    var rect = document.createElement(jsc._vmlNS + ':rect');
                    rect.style.position = 'absolute';
                    rect.style.left = -1 + 'px';
                    rect.style.top = -1 + 'px';
                    rect.stroked = false;
                    rect.appendChild(grad);
                    vmlContainer.appendChild(rect);
                    var drawFunc = function(width, height, color1, color2) {
                        vmlContainer.style.width = width + 'px';
                        vmlContainer.style.height = height + 'px';
                        rect.style.width = (width + 1) + 'px';
                        rect.style.height = (height + 1) + 'px';
                        grad.color = color1;
                        grad.color2 = color2;
                    };
                    sliderObj.elm = vmlContainer;
                    sliderObj.draw = drawFunc;
                }
                return sliderObj;
            },
            leaveValue: 1 << 0,
            leaveStyle: 1 << 1,
            leavePad: 1 << 2,
            leaveSld: 1 << 3,
            BoxShadow: (function() {
                var BoxShadow = function(hShadow, vShadow, blur, spread, color, inset) {
                    this.hShadow = hShadow;
                    this.vShadow = vShadow;
                    this.blur = blur;
                    this.spread = spread;
                    this.color = color;
                    this.inset = !!inset;
                };
                BoxShadow.prototype.toString = function() {
                    var vals = [Math.round(this.hShadow) + 'px', Math.round(this.vShadow) + 'px', Math.round(this.blur) + 'px', Math.round(this.spread) + 'px', this.color];
                    if (this.inset) {
                        vals.push('inset');
                    }
                    return vals.join(' ');
                }
                ;
                return BoxShadow;
            }
            )(),
            jscolor: function(targetElement, options) {
                this.value = null;
                this.valueElement = targetElement;
                this.styleElement = targetElement;
                this.required = true;
                this.refine = true;
                this.hash = false;
                this.uppercase = true;
                this.onFineChange = null;
                this.activeClass = 'jscolor-active';
                this.overwriteImportant = false;
                this.minS = 0;
                this.maxS = 100;
                this.minV = 0;
                this.maxV = 100;
                this.hsv = [0, 0, 100];
                this.rgb = [255, 255, 255];
                this.width = 181;
                this.height = 101;
                this.showOnClick = true;
                this.mode = 'HSV';
                this.position = 'bottom';
                this.smartPosition = true;
                this.sliderSize = 16;
                this.crossSize = 8;
                this.closable = false;
                this.closeText = 'Close';
                this.buttonColor = '#000000';
                this.buttonHeight = 18;
                this.padding = 12;
                this.backgroundColor = '#FFFFFF';
                this.borderWidth = 1;
                this.borderColor = '#BBBBBB';
                this.borderRadius = 8;
                this.insetWidth = 1;
                this.insetColor = '#BBBBBB';
                this.shadow = true;
                this.shadowBlur = 15;
                this.shadowColor = 'rgba(0,0,0,0.2)';
                this.pointerColor = '#4C4C4C';
                this.pointerBorderColor = '#FFFFFF';
                this.pointerBorderWidth = 1;
                this.pointerThickness = 2;
                this.zIndex = 1000;
                this.container = null;
                for (var opt in options) {
                    if (options.hasOwnProperty(opt)) {
                        this[opt] = options[opt];
                    }
                }
                this.hide = function() {
                    if (isPickerOwner()) {
                        detachPicker();
                    }
                }
                ;
                this.show = function() {
                    drawPicker();
                }
                ;
                this.redraw = function() {
                    if (isPickerOwner()) {
                        drawPicker();
                    }
                }
                ;
                this.importColor = function() {
                    if (!this.valueElement) {
                        this.exportColor();
                    } else {
                        if (jsc.isElementType(this.valueElement, 'input')) {
                            if (!this.refine) {
                                if (!this.fromString(this.valueElement.value, jsc.leaveValue)) {
                                    if (this.styleElement) {
                                        this.styleElement.style.backgroundImage = this.styleElement._jscOrigStyle.backgroundImage;
                                        this.styleElement.style.backgroundColor = this.styleElement._jscOrigStyle.backgroundColor;
                                        this.styleElement.style.color = this.styleElement._jscOrigStyle.color;
                                    }
                                    this.exportColor(jsc.leaveValue | jsc.leaveStyle);
                                }
                            } else if (!this.required && /^\s*$/.test(this.valueElement.value)) {
                                this.valueElement.value = '';
                                if (this.styleElement) {
                                    this.styleElement.style.backgroundImage = this.styleElement._jscOrigStyle.backgroundImage;
                                    this.styleElement.style.backgroundColor = this.styleElement._jscOrigStyle.backgroundColor;
                                    this.styleElement.style.color = this.styleElement._jscOrigStyle.color;
                                }
                                this.exportColor(jsc.leaveValue | jsc.leaveStyle);
                            } else if (this.fromString(this.valueElement.value)) {} else {
                                this.exportColor();
                            }
                        } else {
                            this.exportColor();
                        }
                    }
                }
                ;
                this.exportColor = function(flags) {
                    if (!(flags & jsc.leaveValue) && this.valueElement) {
                        var value = this.toString();
                        if (this.uppercase) {
                            value = value.toUpperCase();
                        }
                        if (this.hash) {
                            value = '#' + value;
                        }
                        if (jsc.isElementType(this.valueElement, 'input')) {
                            this.valueElement.value = value;
                        } else {
                            this.valueElement.innerHTML = value;
                        }
                    }
                    if (!(flags & jsc.leaveStyle)) {
                        if (this.styleElement) {
                            var bgColor = '#' + this.toString();
                            var fgColor = this.isLight() ? '#000' : '#FFF';
                            this.styleElement.style.backgroundImage = 'none';
                            this.styleElement.style.backgroundColor = bgColor;
                            this.styleElement.style.color = fgColor;
                            if (this.overwriteImportant) {
                                this.styleElement.setAttribute('style', 'background: ' + bgColor + ' !important; ' + 'color: ' + fgColor + ' !important;');
                            }
                        }
                    }
                    if (!(flags & jsc.leavePad) && isPickerOwner()) {
                        redrawPad();
                    }
                    if (!(flags & jsc.leaveSld) && isPickerOwner()) {
                        redrawSld();
                    }
                }
                ;
                this.fromHSV = function(h, s, v, flags) {
                    if (h !== null) {
                        if (isNaN(h)) {
                            return false;
                        }
                        h = Math.max(0, Math.min(360, h));
                    }
                    if (s !== null) {
                        if (isNaN(s)) {
                            return false;
                        }
                        s = Math.max(0, Math.min(100, this.maxS, s), this.minS);
                    }
                    if (v !== null) {
                        if (isNaN(v)) {
                            return false;
                        }
                        v = Math.max(0, Math.min(100, this.maxV, v), this.minV);
                    }
                    this.rgb = HSV_RGB(h === null ? this.hsv[0] : (this.hsv[0] = h), s === null ? this.hsv[1] : (this.hsv[1] = s), v === null ? this.hsv[2] : (this.hsv[2] = v));
                    this.exportColor(flags);
                }
                ;
                this.fromRGB = function(r, g, b, flags) {
                    if (r !== null) {
                        if (isNaN(r)) {
                            return false;
                        }
                        r = Math.max(0, Math.min(255, r));
                    }
                    if (g !== null) {
                        if (isNaN(g)) {
                            return false;
                        }
                        g = Math.max(0, Math.min(255, g));
                    }
                    if (b !== null) {
                        if (isNaN(b)) {
                            return false;
                        }
                        b = Math.max(0, Math.min(255, b));
                    }
                    var hsv = RGB_HSV(r === null ? this.rgb[0] : r, g === null ? this.rgb[1] : g, b === null ? this.rgb[2] : b);
                    if (hsv[0] !== null) {
                        this.hsv[0] = Math.max(0, Math.min(360, hsv[0]));
                    }
                    if (hsv[2] !== 0) {
                        this.hsv[1] = hsv[1] === null ? null : Math.max(0, this.minS, Math.min(100, this.maxS, hsv[1]));
                    }
                    this.hsv[2] = hsv[2] === null ? null : Math.max(0, this.minV, Math.min(100, this.maxV, hsv[2]));
                    var rgb = HSV_RGB(this.hsv[0], this.hsv[1], this.hsv[2]);
                    this.rgb[0] = rgb[0];
                    this.rgb[1] = rgb[1];
                    this.rgb[2] = rgb[2];
                    this.exportColor(flags);
                }
                ;
                this.fromString = function(str, flags) {
                    var m;
                    if (m = str.match(/^\W*([0-9A-F]{3}([0-9A-F]{3})?)\W*$/i)) {
                        if (m[1].length === 6) {
                            this.fromRGB(parseInt(m[1].substr(0, 2), 16), parseInt(m[1].substr(2, 2), 16), parseInt(m[1].substr(4, 2), 16), flags);
                        } else {
                            this.fromRGB(parseInt(m[1].charAt(0) + m[1].charAt(0), 16), parseInt(m[1].charAt(1) + m[1].charAt(1), 16), parseInt(m[1].charAt(2) + m[1].charAt(2), 16), flags);
                        }
                        return true;
                    } else if (m = str.match(/^\W*rgba?\(([^)]*)\)\W*$/i)) {
                        var params = m[1].split(',');
                        var re = /^\s*(\d*)(\.\d+)?\s*$/;
                        var mR, mG, mB;
                        if (params.length >= 3 && (mR = params[0].match(re)) && (mG = params[1].match(re)) && (mB = params[2].match(re))) {
                            var r = parseFloat((mR[1] || '0') + (mR[2] || ''));
                            var g = parseFloat((mG[1] || '0') + (mG[2] || ''));
                            var b = parseFloat((mB[1] || '0') + (mB[2] || ''));
                            this.fromRGB(r, g, b, flags);
                            return true;
                        }
                    }
                    return false;
                }
                ;
                this.toString = function() {
                    return ((0x100 | Math.round(this.rgb[0])).toString(16).substr(1) + (0x100 | Math.round(this.rgb[1])).toString(16).substr(1) + (0x100 | Math.round(this.rgb[2])).toString(16).substr(1));
                }
                ;
                this.toHEXString = function() {
                    return '#' + this.toString().toUpperCase();
                }
                ;
                this.toRGBString = function() {
                    return ('rgb(' + Math.round(this.rgb[0]) + ',' + Math.round(this.rgb[1]) + ',' + Math.round(this.rgb[2]) + ')');
                }
                ;
                this.isLight = function() {
                    return (0.213 * this.rgb[0] + 0.715 * this.rgb[1] + 0.072 * this.rgb[2] > 255 / 2);
                }
                ;
                this._processParentElementsInDOM = function() {
                    if (this._linkedElementsProcessed) {
                        return;
                    }
                    this._linkedElementsProcessed = true;
                    var elm = this.targetElement;
                    do {
                        var currStyle = jsc.getStyle(elm);
                        if (currStyle && currStyle.position.toLowerCase() === 'fixed') {
                            this.fixed = true;
                        }
                        if (elm !== this.targetElement) {
                            if (!elm._jscEventsAttached) {
                                jsc.attachEvent(elm, 'scroll', jsc.onParentScroll);
                                elm._jscEventsAttached = true;
                            }
                        }
                    } while ((elm = elm.parentNode) && !jsc.isElementType(elm, 'body'));
                }
                ;
                function RGB_HSV(r, g, b) {
                    r /= 255;
                    g /= 255;
                    b /= 255;
                    var n = Math.min(Math.min(r, g), b);
                    var v = Math.max(Math.max(r, g), b);
                    var m = v - n;
                    if (m === 0) {
                        return [null, 0, 100 * v];
                    }
                    var h = r === n ? 3 + (b - g) / m : (g === n ? 5 + (r - b) / m : 1 + (g - r) / m);
                    return [60 * (h === 6 ? 0 : h), 100 * (m / v), 100 * v];
                }
                function HSV_RGB(h, s, v) {
                    var u = 255 * (v / 100);
                    if (h === null) {
                        return [u, u, u];
                    }
                    h /= 60;
                    s /= 100;
                    var i = Math.floor(h);
                    var f = i % 2 ? h - i : 1 - (h - i);
                    var m = u * (1 - s);
                    var n = u * (1 - s * f);
                    switch (i) {
                    case 6:
                    case 0:
                        return [u, n, m];
                    case 1:
                        return [n, u, m];
                    case 2:
                        return [m, u, n];
                    case 3:
                        return [m, n, u];
                    case 4:
                        return [n, m, u];
                    case 5:
                        return [u, m, n];
                    }
                }
                function detachPicker() {
                    jsc.unsetClass(THIS.targetElement, THIS.activeClass);
                    jsc.picker.wrap.parentNode.removeChild(jsc.picker.wrap);
                    delete jsc.picker.owner;
                }
                function drawPicker() {
                    THIS._processParentElementsInDOM();
                    if (!jsc.picker) {
                        jsc.picker = {
                            owner: null,
                            wrap: document.createElement('div'),
                            box: document.createElement('div'),
                            boxS: document.createElement('div'),
                            boxB: document.createElement('div'),
                            pad: document.createElement('div'),
                            padB: document.createElement('div'),
                            padM: document.createElement('div'),
                            padPal: jsc.createPalette(),
                            cross: document.createElement('div'),
                            crossBY: document.createElement('div'),
                            crossBX: document.createElement('div'),
                            crossLY: document.createElement('div'),
                            crossLX: document.createElement('div'),
                            sld: document.createElement('div'),
                            sldB: document.createElement('div'),
                            sldM: document.createElement('div'),
                            sldGrad: jsc.createSliderGradient(),
                            sldPtrS: document.createElement('div'),
                            sldPtrIB: document.createElement('div'),
                            sldPtrMB: document.createElement('div'),
                            sldPtrOB: document.createElement('div'),
                            btn: document.createElement('div'),
                            btnT: document.createElement('span')
                        };
                        jsc.picker.pad.appendChild(jsc.picker.padPal.elm);
                        jsc.picker.padB.appendChild(jsc.picker.pad);
                        jsc.picker.cross.appendChild(jsc.picker.crossBY);
                        jsc.picker.cross.appendChild(jsc.picker.crossBX);
                        jsc.picker.cross.appendChild(jsc.picker.crossLY);
                        jsc.picker.cross.appendChild(jsc.picker.crossLX);
                        jsc.picker.padB.appendChild(jsc.picker.cross);
                        jsc.picker.box.appendChild(jsc.picker.padB);
                        jsc.picker.box.appendChild(jsc.picker.padM);
                        jsc.picker.sld.appendChild(jsc.picker.sldGrad.elm);
                        jsc.picker.sldB.appendChild(jsc.picker.sld);
                        jsc.picker.sldB.appendChild(jsc.picker.sldPtrOB);
                        jsc.picker.sldPtrOB.appendChild(jsc.picker.sldPtrMB);
                        jsc.picker.sldPtrMB.appendChild(jsc.picker.sldPtrIB);
                        jsc.picker.sldPtrIB.appendChild(jsc.picker.sldPtrS);
                        jsc.picker.box.appendChild(jsc.picker.sldB);
                        jsc.picker.box.appendChild(jsc.picker.sldM);
                        jsc.picker.btn.appendChild(jsc.picker.btnT);
                        jsc.picker.box.appendChild(jsc.picker.btn);
                        jsc.picker.boxB.appendChild(jsc.picker.box);
                        jsc.picker.wrap.appendChild(jsc.picker.boxS);
                        jsc.picker.wrap.appendChild(jsc.picker.boxB);
                    }
                    var p = jsc.picker;
                    var displaySlider = !!jsc.getSliderComponent(THIS);
                    var dims = jsc.getPickerDims(THIS);
                    var crossOuterSize = (2 * THIS.pointerBorderWidth + THIS.pointerThickness + 2 * THIS.crossSize);
                    var padToSliderPadding = jsc.getPadToSliderPadding(THIS);
                    var borderRadius = Math.min(THIS.borderRadius, Math.round(THIS.padding * Math.PI));
                    var padCursor = 'crosshair';
                    p.wrap.style.clear = 'both';
                    p.wrap.style.width = (dims[0] + 2 * THIS.borderWidth) + 'px';
                    p.wrap.style.height = (dims[1] + 2 * THIS.borderWidth) + 'px';
                    p.wrap.style.zIndex = THIS.zIndex;
                    p.box.style.width = dims[0] + 'px';
                    p.box.style.height = dims[1] + 'px';
                    p.boxS.style.position = 'absolute';
                    p.boxS.style.left = '0';
                    p.boxS.style.top = '0';
                    p.boxS.style.width = '100%';
                    p.boxS.style.height = '100%';
                    jsc.setBorderRadius(p.boxS, borderRadius + 'px');
                    p.boxB.style.position = 'relative';
                    p.boxB.style.border = THIS.borderWidth + 'px solid';
                    p.boxB.style.borderColor = THIS.borderColor;
                    p.boxB.style.background = THIS.backgroundColor;
                    jsc.setBorderRadius(p.boxB, borderRadius + 'px');
                    p.padM.style.background = p.sldM.style.background = '#FFF';
                    jsc.setStyle(p.padM, 'opacity', '0');
                    jsc.setStyle(p.sldM, 'opacity', '0');
                    p.pad.style.position = 'relative';
                    p.pad.style.width = THIS.width + 'px';
                    p.pad.style.height = THIS.height + 'px';
                    p.padPal.draw(THIS.width, THIS.height, jsc.getPadYComponent(THIS));
                    p.padB.style.position = 'absolute';
                    p.padB.style.left = THIS.padding + 'px';
                    p.padB.style.top = THIS.padding + 'px';
                    p.padB.style.border = THIS.insetWidth + 'px solid';
                    p.padB.style.borderColor = THIS.insetColor;
                    p.padM._jscInstance = THIS;
                    p.padM._jscControlName = 'pad';
                    p.padM.style.position = 'absolute';
                    p.padM.style.left = '0';
                    p.padM.style.top = '0';
                    p.padM.style.width = (THIS.padding + 2 * THIS.insetWidth + THIS.width + padToSliderPadding / 2) + 'px';
                    p.padM.style.height = dims[1] + 'px';
                    p.padM.style.cursor = padCursor;
                    p.cross.style.position = 'absolute';
                    p.cross.style.left = p.cross.style.top = '0';
                    p.cross.style.width = p.cross.style.height = crossOuterSize + 'px';
                    p.crossBY.style.position = p.crossBX.style.position = 'absolute';
                    p.crossBY.style.background = p.crossBX.style.background = THIS.pointerBorderColor;
                    p.crossBY.style.width = p.crossBX.style.height = (2 * THIS.pointerBorderWidth + THIS.pointerThickness) + 'px';
                    p.crossBY.style.height = p.crossBX.style.width = crossOuterSize + 'px';
                    p.crossBY.style.left = p.crossBX.style.top = (Math.floor(crossOuterSize / 2) - Math.floor(THIS.pointerThickness / 2) - THIS.pointerBorderWidth) + 'px';
                    p.crossBY.style.top = p.crossBX.style.left = '0';
                    p.crossLY.style.position = p.crossLX.style.position = 'absolute';
                    p.crossLY.style.background = p.crossLX.style.background = THIS.pointerColor;
                    p.crossLY.style.height = p.crossLX.style.width = (crossOuterSize - 2 * THIS.pointerBorderWidth) + 'px';
                    p.crossLY.style.width = p.crossLX.style.height = THIS.pointerThickness + 'px';
                    p.crossLY.style.left = p.crossLX.style.top = (Math.floor(crossOuterSize / 2) - Math.floor(THIS.pointerThickness / 2)) + 'px';
                    p.crossLY.style.top = p.crossLX.style.left = THIS.pointerBorderWidth + 'px';
                    p.sld.style.overflow = 'hidden';
                    p.sld.style.width = THIS.sliderSize + 'px';
                    p.sld.style.height = THIS.height + 'px';
                    p.sldGrad.draw(THIS.sliderSize, THIS.height, '#000', '#000');
                    p.sldB.style.display = displaySlider ? 'block' : 'none';
                    p.sldB.style.position = 'absolute';
                    p.sldB.style.right = THIS.padding + 'px';
                    p.sldB.style.top = THIS.padding + 'px';
                    p.sldB.style.border = THIS.insetWidth + 'px solid';
                    p.sldB.style.borderColor = THIS.insetColor;
                    p.sldM._jscInstance = THIS;
                    p.sldM._jscControlName = 'sld';
                    p.sldM.style.display = displaySlider ? 'block' : 'none';
                    p.sldM.style.position = 'absolute';
                    p.sldM.style.right = '0';
                    p.sldM.style.top = '0';
                    p.sldM.style.width = (THIS.sliderSize + padToSliderPadding / 2 + THIS.padding + 2 * THIS.insetWidth) + 'px';
                    p.sldM.style.height = dims[1] + 'px';
                    p.sldM.style.cursor = 'default';
                    p.sldPtrIB.style.border = p.sldPtrOB.style.border = THIS.pointerBorderWidth + 'px solid ' + THIS.pointerBorderColor;
                    p.sldPtrOB.style.position = 'absolute';
                    p.sldPtrOB.style.left = -(2 * THIS.pointerBorderWidth + THIS.pointerThickness) + 'px';
                    p.sldPtrOB.style.top = '0';
                    p.sldPtrMB.style.border = THIS.pointerThickness + 'px solid ' + THIS.pointerColor;
                    p.sldPtrS.style.width = THIS.sliderSize + 'px';
                    p.sldPtrS.style.height = sliderPtrSpace + 'px';
                    function setBtnBorder() {
                        var insetColors = THIS.insetColor.split(/\s+/);
                        var outsetColor = insetColors.length < 2 ? insetColors[0] : insetColors[1] + ' ' + insetColors[0] + ' ' + insetColors[0] + ' ' + insetColors[1];
                        p.btn.style.borderColor = outsetColor;
                    }
                    p.btn.style.display = THIS.closable ? 'block' : 'none';
                    p.btn.style.position = 'absolute';
                    p.btn.style.left = THIS.padding + 'px';
                    p.btn.style.bottom = THIS.padding + 'px';
                    p.btn.style.padding = '0 15px';
                    p.btn.style.height = THIS.buttonHeight + 'px';
                    p.btn.style.border = THIS.insetWidth + 'px solid';
                    setBtnBorder();
                    p.btn.style.color = THIS.buttonColor;
                    p.btn.style.font = '12px sans-serif';
                    p.btn.style.textAlign = 'center';
                    try {
                        p.btn.style.cursor = 'pointer';
                    } catch (eOldIE) {
                        p.btn.style.cursor = 'hand';
                    }
                    p.btn.onmousedown = function() {
                        THIS.hide();
                    }
                    ;
                    p.btnT.style.lineHeight = THIS.buttonHeight + 'px';
                    p.btnT.innerHTML = '';
                    p.btnT.appendChild(document.createTextNode(THIS.closeText));
                    redrawPad();
                    redrawSld();
                    if (jsc.picker.owner && jsc.picker.owner !== THIS) {
                        jsc.unsetClass(jsc.picker.owner.targetElement, THIS.activeClass);
                    }
                    jsc.picker.owner = THIS;
                    if (jsc.isElementType(container, 'body')) {
                        jsc.redrawPosition();
                    } else {
                        jsc._drawPosition(THIS, 0, 0, 'relative', false);
                    }
                    if (p.wrap.parentNode != container) {
                        container.appendChild(p.wrap);
                    }
                    jsc.setClass(THIS.targetElement, THIS.activeClass);
                }
                function redrawPad() {
                    switch (jsc.getPadYComponent(THIS)) {
                    case 's':
                        var yComponent = 1;
                        break;
                    case 'v':
                        var yComponent = 2;
                        break;
                    }
                    var x = Math.round((THIS.hsv[0] / 360) * (THIS.width - 1));
                    var y = Math.round((1 - THIS.hsv[yComponent] / 100) * (THIS.height - 1));
                    var crossOuterSize = (2 * THIS.pointerBorderWidth + THIS.pointerThickness + 2 * THIS.crossSize);
                    var ofs = -Math.floor(crossOuterSize / 2);
                    jsc.picker.cross.style.left = (x + ofs) + 'px';
                    jsc.picker.cross.style.top = (y + ofs) + 'px';
                    switch (jsc.getSliderComponent(THIS)) {
                    case 's':
                        var rgb1 = HSV_RGB(THIS.hsv[0], 100, THIS.hsv[2]);
                        var rgb2 = HSV_RGB(THIS.hsv[0], 0, THIS.hsv[2]);
                        var color1 = 'rgb(' + Math.round(rgb1[0]) + ',' + Math.round(rgb1[1]) + ',' + Math.round(rgb1[2]) + ')';
                        var color2 = 'rgb(' + Math.round(rgb2[0]) + ',' + Math.round(rgb2[1]) + ',' + Math.round(rgb2[2]) + ')';
                        jsc.picker.sldGrad.draw(THIS.sliderSize, THIS.height, color1, color2);
                        break;
                    case 'v':
                        var rgb = HSV_RGB(THIS.hsv[0], THIS.hsv[1], 100);
                        var color1 = 'rgb(' + Math.round(rgb[0]) + ',' + Math.round(rgb[1]) + ',' + Math.round(rgb[2]) + ')';
                        var color2 = '#000';
                        jsc.picker.sldGrad.draw(THIS.sliderSize, THIS.height, color1, color2);
                        break;
                    }
                }
                function redrawSld() {
                    var sldComponent = jsc.getSliderComponent(THIS);
                    if (sldComponent) {
                        switch (sldComponent) {
                        case 's':
                            var yComponent = 1;
                            break;
                        case 'v':
                            var yComponent = 2;
                            break;
                        }
                        var y = Math.round((1 - THIS.hsv[yComponent] / 100) * (THIS.height - 1));
                        jsc.picker.sldPtrOB.style.top = (y - (2 * THIS.pointerBorderWidth + THIS.pointerThickness) - Math.floor(sliderPtrSpace / 2)) + 'px';
                    }
                }
                function isPickerOwner() {
                    return jsc.picker && jsc.picker.owner === THIS;
                }
                function blurValue() {
                    THIS.importColor();
                }
                if (typeof targetElement === 'string') {
                    var id = targetElement;
                    var elm = document.getElementById(id);
                    if (elm) {
                        this.targetElement = elm;
                    } else {
                        jsc.warn('Could not find target element with ID \'' + id + '\'');
                    }
                } else if (targetElement) {
                    this.targetElement = targetElement;
                } else {
                    jsc.warn('Invalid target element: \'' + targetElement + '\'');
                }
                if (this.targetElement._jscLinkedInstance) {
                    jsc.warn('Cannot link jscolor twice to the same element. Skipping.');
                    return;
                }
                this.targetElement._jscLinkedInstance = this;
                this.valueElement = jsc.fetchElement(this.valueElement);
                this.styleElement = jsc.fetchElement(this.styleElement);
                var THIS = this;
                var container = this.container ? jsc.fetchElement(this.container) : document.getElementsByTagName('body')[0];
                var sliderPtrSpace = 3;
                if (jsc.isElementType(this.targetElement, 'button')) {
                    if (this.targetElement.onclick) {
                        var origCallback = this.targetElement.onclick;
                        this.targetElement.onclick = function(evt) {
                            origCallback.call(this, evt);
                            return false;
                        }
                        ;
                    } else {
                        this.targetElement.onclick = function() {
                            return false;
                        }
                        ;
                    }
                }
                if (this.valueElement) {
                    if (jsc.isElementType(this.valueElement, 'input')) {
                        var updateField = function() {
                            THIS.fromString(THIS.valueElement.value, jsc.leaveValue);
                            jsc.dispatchFineChange(THIS);
                        };
                        jsc.attachEvent(this.valueElement, 'keyup', updateField);
                        jsc.attachEvent(this.valueElement, 'input', updateField);
                        jsc.attachEvent(this.valueElement, 'blur', blurValue);
                        this.valueElement.setAttribute('autocomplete', 'off');
                    }
                }
                if (this.styleElement) {
                    this.styleElement._jscOrigStyle = {
                        backgroundImage: this.styleElement.style.backgroundImage,
                        backgroundColor: this.styleElement.style.backgroundColor,
                        color: this.styleElement.style.color
                    };
                }
                if (this.value) {
                    this.fromString(this.value) || this.exportColor();
                } else {
                    this.importColor();
                }
            }
        };
        jsc.jscolor.lookupClass = 'jscolor';
        jsc.jscolor.installByClassName = function(className) {
            var inputElms = document.getElementsByTagName('input');
            var buttonElms = document.getElementsByTagName('button');
            jsc.tryInstallOnElements(inputElms, className);
            jsc.tryInstallOnElements(buttonElms, className);
        }
        ;
        jsc.register();
        return jsc.jscolor;
    }
    )();
}
;;jQuery(function($) {
    $('#true_loadmore').click(function() {
        $(this).text('Загружаю...');
        var data = {
            'action': 'loadmore',
            'query': true_posts,
            'page': current_page
        };
        $.ajax({
            url: ajaxurl,
            data: data,
            type: 'POST',
            success: function(data) {
                if (data) {
                    $('.portfolios_list .portfolios-item:last-child').after(data);
                    current_page++;
                    if (current_page == max_pages)
                        $("#true_loadmore").remove();
                } else {
                    $('#true_loadmore').remove();
                }
            }
        });
    });
});
;;var preloader_txt = document.querySelector('.glitch');
setTimeout(function() {
    preloader_txt.style.display = 'block';
}, 1000);
var preloader = document.querySelector('.glitch-wrapper');
setTimeout(function() {
    preloader.style.display = 'none';
}, 4000);
;;(function($) {
    'use strict';
    if (typeof wpcf7 === 'undefined' || wpcf7 === null) {
        return;
    }
    wpcf7 = $.extend({
        cached: 0,
        inputs: []
    }, wpcf7);
    $(function() {
        wpcf7.supportHtml5 = (function() {
            var features = {};
            var input = document.createElement('input');
            features.placeholder = 'placeholder'in input;
            var inputTypes = ['email', 'url', 'tel', 'number', 'range', 'date'];
            $.each(inputTypes, function(index, value) {
                input.setAttribute('type', value);
                features[value] = input.type !== 'text';
            });
            return features;
        }
        )();
        $('div.wpcf7 > form').each(function() {
            var $form = $(this);
            wpcf7.initForm($form);
            if (wpcf7.cached) {
                wpcf7.refill($form);
            }
        });
    });
    wpcf7.getId = function(form) {
        return parseInt($('input[name="_wpcf7"]', form).val(), 10);
    }
    ;
    wpcf7.initForm = function(form) {
        var $form = $(form);
        $form.submit(function(event) {
            if (!wpcf7.supportHtml5.placeholder) {
                $('[placeholder].placeheld', $form).each(function(i, n) {
                    $(n).val('').removeClass('placeheld');
                });
            }
            if (typeof window.FormData === 'function') {
                wpcf7.submit($form);
                event.preventDefault();
            }
        });
        $('.wpcf7-submit', $form).after('<span class="ajax-loader"></span>');
        wpcf7.toggleSubmit($form);
        $form.on('click', '.wpcf7-acceptance', function() {
            wpcf7.toggleSubmit($form);
        });
        $('.wpcf7-exclusive-checkbox', $form).on('click', 'input:checkbox', function() {
            var name = $(this).attr('name');
            $form.find('input:checkbox[name="' + name + '"]').not(this).prop('checked', false);
        });
        $('.wpcf7-list-item.has-free-text', $form).each(function() {
            var $freetext = $(':input.wpcf7-free-text', this);
            var $wrap = $(this).closest('.wpcf7-form-control');
            if ($(':checkbox, :radio', this).is(':checked')) {
                $freetext.prop('disabled', false);
            } else {
                $freetext.prop('disabled', true);
            }
            $wrap.on('change', ':checkbox, :radio', function() {
                var $cb = $('.has-free-text', $wrap).find(':checkbox, :radio');
                if ($cb.is(':checked')) {
                    $freetext.prop('disabled', false).focus();
                } else {
                    $freetext.prop('disabled', true);
                }
            });
        });
        if (!wpcf7.supportHtml5.placeholder) {
            $('[placeholder]', $form).each(function() {
                $(this).val($(this).attr('placeholder'));
                $(this).addClass('placeheld');
                $(this).focus(function() {
                    if ($(this).hasClass('placeheld')) {
                        $(this).val('').removeClass('placeheld');
                    }
                });
                $(this).blur(function() {
                    if ('' === $(this).val()) {
                        $(this).val($(this).attr('placeholder'));
                        $(this).addClass('placeheld');
                    }
                });
            });
        }
        if (wpcf7.jqueryUi && !wpcf7.supportHtml5.date) {
            $form.find('input.wpcf7-date[type="date"]').each(function() {
                $(this).datepicker({
                    dateFormat: 'yy-mm-dd',
                    minDate: new Date($(this).attr('min')),
                    maxDate: new Date($(this).attr('max'))
                });
            });
        }
        if (wpcf7.jqueryUi && !wpcf7.supportHtml5.number) {
            $form.find('input.wpcf7-number[type="number"]').each(function() {
                $(this).spinner({
                    min: $(this).attr('min'),
                    max: $(this).attr('max'),
                    step: $(this).attr('step')
                });
            });
        }
        wpcf7.resetCounter($form);
        $form.on('change', '.wpcf7-validates-as-url', function() {
            var val = $.trim($(this).val());
            if (val && !val.match(/^[a-z][a-z0-9.+-]*:/i) && -1 !== val.indexOf('.')) {
                val = val.replace(/^\/+/, '');
                val = 'http://' + val;
            }
            $(this).val(val);
        });
    }
    ;
    wpcf7.submit = function(form) {
        if (typeof window.FormData !== 'function') {
            return;
        }
        var $form = $(form);
        $('.ajax-loader', $form).addClass('is-active');
        wpcf7.clearResponse($form);
        var formData = new FormData($form.get(0));
        var detail = {
            id: $form.closest('div.wpcf7').attr('id'),
            status: 'init',
            inputs: [],
            formData: formData
        };
        $.each($form.serializeArray(), function(i, field) {
            if ('_wpcf7' == field.name) {
                detail.contactFormId = field.value;
            } else if ('_wpcf7_version' == field.name) {
                detail.pluginVersion = field.value;
            } else if ('_wpcf7_locale' == field.name) {
                detail.contactFormLocale = field.value;
            } else if ('_wpcf7_unit_tag' == field.name) {
                detail.unitTag = field.value;
            } else if ('_wpcf7_container_post' == field.name) {
                detail.containerPostId = field.value;
            } else if (field.name.match(/^_wpcf7_\w+_free_text_/)) {
                var owner = field.name.replace(/^_wpcf7_\w+_free_text_/, '');
                detail.inputs.push({
                    name: owner + '-free-text',
                    value: field.value
                });
            } else if (field.name.match(/^_/)) {} else {
                detail.inputs.push(field);
            }
        });
        wpcf7.triggerEvent($form.closest('div.wpcf7'), 'beforesubmit', detail);
        var ajaxSuccess = function(data, status, xhr, $form) {
            detail.id = $(data.into).attr('id');
            detail.status = data.status;
            detail.apiResponse = data;
            var $message = $('.wpcf7-response-output', $form);
            switch (data.status) {
            case 'validation_failed':
                $.each(data.invalidFields, function(i, n) {
                    $(n.into, $form).each(function() {
                        wpcf7.notValidTip(this, n.message);
                        $('.wpcf7-form-control', this).addClass('wpcf7-not-valid');
                        $('[aria-invalid]', this).attr('aria-invalid', 'true');
                    });
                });
                $message.addClass('wpcf7-validation-errors');
                $form.addClass('invalid');
                wpcf7.triggerEvent(data.into, 'invalid', detail);
                break;
            case 'acceptance_missing':
                $message.addClass('wpcf7-acceptance-missing');
                $form.addClass('unaccepted');
                wpcf7.triggerEvent(data.into, 'unaccepted', detail);
                break;
            case 'spam':
                $message.addClass('wpcf7-spam-blocked');
                $form.addClass('spam');
                wpcf7.triggerEvent(data.into, 'spam', detail);
                break;
            case 'aborted':
                $message.addClass('wpcf7-aborted');
                $form.addClass('aborted');
                wpcf7.triggerEvent(data.into, 'aborted', detail);
                break;
            case 'mail_sent':
                $message.addClass('wpcf7-mail-sent-ok');
                $form.addClass('sent');
                wpcf7.triggerEvent(data.into, 'mailsent', detail);
                break;
            case 'mail_failed':
                $message.addClass('wpcf7-mail-sent-ng');
                $form.addClass('failed');
                wpcf7.triggerEvent(data.into, 'mailfailed', detail);
                break;
            default:
                var customStatusClass = 'custom-' + data.status.replace(/[^0-9a-z]+/i, '-');
                $message.addClass('wpcf7-' + customStatusClass);
                $form.addClass(customStatusClass);
            }
            wpcf7.refill($form, data);
            wpcf7.triggerEvent(data.into, 'submit', detail);
            if ('mail_sent' == data.status) {
                $form.each(function() {
                    this.reset();
                });
                wpcf7.toggleSubmit($form);
                wpcf7.resetCounter($form);
            }
            if (!wpcf7.supportHtml5.placeholder) {
                $form.find('[placeholder].placeheld').each(function(i, n) {
                    $(n).val($(n).attr('placeholder'));
                });
            }
            $message.html('').append(data.message).slideDown('fast');
            $message.attr('role', 'alert');
            $('.screen-reader-response', $form.closest('.wpcf7')).each(function() {
                var $response = $(this);
                $response.html('').attr('role', '').append(data.message);
                if (data.invalidFields) {
                    var $invalids = $('<ul></ul>');
                    $.each(data.invalidFields, function(i, n) {
                        if (n.idref) {
                            var $li = $('<li></li>').append($('<a></a>').attr('href', '#' + n.idref).append(n.message));
                        } else {
                            var $li = $('<li></li>').append(n.message);
                        }
                        $invalids.append($li);
                    });
                    $response.append($invalids);
                }
                $response.attr('role', 'alert').focus();
            });
        };
        $.ajax({
            type: 'POST',
            url: wpcf7.apiSettings.getRoute('/contact-forms/' + wpcf7.getId($form) + '/feedback'),
            data: formData,
            dataType: 'json',
            processData: false,
            contentType: false
        }).done(function(data, status, xhr) {
            ajaxSuccess(data, status, xhr, $form);
            $('.ajax-loader', $form).removeClass('is-active');
        }).fail(function(xhr, status, error) {
            var $e = $('<div class="ajax-error"></div>').text(error.message);
            $form.after($e);
        });
    }
    ;
    wpcf7.triggerEvent = function(target, name, detail) {
        var $target = $(target);
        var event = new CustomEvent('wpcf7' + name,{
            bubbles: true,
            detail: detail
        });
        $target.get(0).dispatchEvent(event);
        $target.trigger('wpcf7:' + name, detail);
        $target.trigger(name + '.wpcf7', detail);
    }
    ;
    wpcf7.toggleSubmit = function(form, state) {
        var $form = $(form);
        var $submit = $('input:submit', $form);
        if (typeof state !== 'undefined') {
            $submit.prop('disabled', !state);
            return;
        }
        if ($form.hasClass('wpcf7-acceptance-as-validation')) {
            return;
        }
        $submit.prop('disabled', false);
        $('.wpcf7-acceptance', $form).each(function() {
            var $span = $(this);
            var $input = $('input:checkbox', $span);
            if (!$span.hasClass('optional')) {
                if ($span.hasClass('invert') && $input.is(':checked') || !$span.hasClass('invert') && !$input.is(':checked')) {
                    $submit.prop('disabled', true);
                    return false;
                }
            }
        });
    }
    ;
    wpcf7.resetCounter = function(form) {
        var $form = $(form);
        $('.wpcf7-character-count', $form).each(function() {
            var $count = $(this);
            var name = $count.attr('data-target-name');
            var down = $count.hasClass('down');
            var starting = parseInt($count.attr('data-starting-value'), 10);
            var maximum = parseInt($count.attr('data-maximum-value'), 10);
            var minimum = parseInt($count.attr('data-minimum-value'), 10);
            var updateCount = function(target) {
                var $target = $(target);
                var length = $target.val().length;
                var count = down ? starting - length : length;
                $count.attr('data-current-value', count);
                $count.text(count);
                if (maximum && maximum < length) {
                    $count.addClass('too-long');
                } else {
                    $count.removeClass('too-long');
                }
                if (minimum && length < minimum) {
                    $count.addClass('too-short');
                } else {
                    $count.removeClass('too-short');
                }
            };
            $(':input[name="' + name + '"]', $form).each(function() {
                updateCount(this);
                $(this).keyup(function() {
                    updateCount(this);
                });
            });
        });
    }
    ;
    wpcf7.notValidTip = function(target, message) {
        var $target = $(target);
        $('.wpcf7-not-valid-tip', $target).remove();
        $('<span></span>').attr({
            'class': 'wpcf7-not-valid-tip',
            'role': 'alert',
            'aria-hidden': 'true',
        }).text(message).appendTo($target);
        if ($target.is('.use-floating-validation-tip *')) {
            var fadeOut = function(target) {
                $(target).not(':hidden').animate({
                    opacity: 0
                }, 'fast', function() {
                    $(this).css({
                        'z-index': -100
                    });
                });
            };
            $target.on('mouseover', '.wpcf7-not-valid-tip', function() {
                fadeOut(this);
            });
            $target.on('focus', ':input', function() {
                fadeOut($('.wpcf7-not-valid-tip', $target));
            });
        }
    }
    ;
    wpcf7.refill = function(form, data) {
        var $form = $(form);
        var refillCaptcha = function($form, items) {
            $.each(items, function(i, n) {
                $form.find(':input[name="' + i + '"]').val('');
                $form.find('img.wpcf7-captcha-' + i).attr('src', n);
                var match = /([0-9]+)\.(png|gif|jpeg)$/.exec(n);
                $form.find('input:hidden[name="_wpcf7_captcha_challenge_' + i + '"]').attr('value', match[1]);
            });
        };
        var refillQuiz = function($form, items) {
            $.each(items, function(i, n) {
                $form.find(':input[name="' + i + '"]').val('');
                $form.find(':input[name="' + i + '"]').siblings('span.wpcf7-quiz-label').text(n[0]);
                $form.find('input:hidden[name="_wpcf7_quiz_answer_' + i + '"]').attr('value', n[1]);
            });
        };
        if (typeof data === 'undefined') {
            $.ajax({
                type: 'GET',
                url: wpcf7.apiSettings.getRoute('/contact-forms/' + wpcf7.getId($form) + '/refill'),
                beforeSend: function(xhr) {
                    var nonce = $form.find(':input[name="_wpnonce"]').val();
                    if (nonce) {
                        xhr.setRequestHeader('X-WP-Nonce', nonce);
                    }
                },
                dataType: 'json'
            }).done(function(data, status, xhr) {
                if (data.captcha) {
                    refillCaptcha($form, data.captcha);
                }
                if (data.quiz) {
                    refillQuiz($form, data.quiz);
                }
            });
        } else {
            if (data.captcha) {
                refillCaptcha($form, data.captcha);
            }
            if (data.quiz) {
                refillQuiz($form, data.quiz);
            }
        }
    }
    ;
    wpcf7.clearResponse = function(form) {
        var $form = $(form);
        $form.removeClass('invalid spam sent failed');
        $form.siblings('.screen-reader-response').html('').attr('role', '');
        $('.wpcf7-not-valid-tip', $form).remove();
        $('[aria-invalid]', $form).attr('aria-invalid', 'false');
        $('.wpcf7-form-control', $form).removeClass('wpcf7-not-valid');
        $('.wpcf7-response-output', $form).hide().empty().removeAttr('role').removeClass('wpcf7-mail-sent-ok wpcf7-mail-sent-ng wpcf7-validation-errors wpcf7-spam-blocked');
    }
    ;
    wpcf7.apiSettings.getRoute = function(path) {
        var url = wpcf7.apiSettings.root;
        url = url.replace(wpcf7.apiSettings.namespace, wpcf7.apiSettings.namespace + path);
        return url;
    }
    ;
}
)(jQuery);
(function() {
    if (typeof window.CustomEvent === "function")
        return false;
    function CustomEvent(event, params) {
        params = params || {
            bubbles: false,
            cancelable: false,
            detail: undefined
        };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }
    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
}
)();
;;!function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], function(b) {
        a(b, window, document)
    }) : "object" == typeof module && module.exports ? module.exports = a(require("jquery"), window, document) : a(jQuery, window, document)
}(function(a, b, c, d) {
    "use strict";
    function e(b, c) {
        this.a = a(b),
        this.b = a.extend({}, h, c),
        this.ns = "." + f + g++,
        this.d = Boolean(b.setSelectionRange),
        this.e = Boolean(a(b).attr("placeholder"))
    }
    var f = "intlTelInput"
      , g = 1
      , h = {
        allowDropdown: !0,
        autoHideDialCode: !0,
        autoPlaceholder: "polite",
        customPlaceholder: null,
        dropdownContainer: "",
        excludeCountries: [],
        formatOnDisplay: !0,
        geoIpLookup: null,
        hiddenInput: "",
        initialCountry: "",
        localizedCountries: null,
        nationalMode: !0,
        onlyCountries: [],
        placeholderNumberType: "MOBILE",
        preferredCountries: ["us", "gb"],
        separateDialCode: !1,
        utilsScript: ""
    }
      , i = {
        b: 38,
        c: 40,
        d: 13,
        e: 27,
        f: 43,
        A: 65,
        Z: 90,
        j: 32,
        k: 9
    }
      , j = ["800", "822", "833", "844", "855", "866", "877", "880", "881", "882", "883", "884", "885", "886", "887", "888", "889"];
    a(b).on("load", function() {
        a.fn[f].windowLoaded = !0
    }),
    e.prototype = {
        _a: function() {
            return this.b.nationalMode && (this.b.autoHideDialCode = !1),
            this.b.separateDialCode && (this.b.autoHideDialCode = this.b.nationalMode = !1),
            this.g = /Android.+Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            this.g && (a("body").addClass("iti-mobile"),
            this.b.dropdownContainer || (this.b.dropdownContainer = "body")),
            this.h = new a.Deferred,
            this.i = new a.Deferred,
            this.s = {},
            this._b(),
            this._f(),
            this._h(),
            this._i(),
            this._i2(),
            [this.h, this.i]
        },
        _b: function() {
            this._d(),
            this._d2(),
            this._e(),
            this.b.localizedCountries && this._translateCountriesByLocale(),
            (this.b.onlyCountries.length || this.b.localizedCountries) && this.p.sort(this._countryNameSort)
        },
        _c: function(a, b, c) {
            b in this.q || (this.q[b] = []);
            var d = c || 0;
            this.q[b][d] = a
        },
        _d: function() {
            if (this.b.onlyCountries.length) {
                var a = this.b.onlyCountries.map(function(a) {
                    return a.toLowerCase()
                });
                this.p = k.filter(function(b) {
                    return a.indexOf(b.iso2) > -1
                })
            } else if (this.b.excludeCountries.length) {
                var b = this.b.excludeCountries.map(function(a) {
                    return a.toLowerCase()
                });
                this.p = k.filter(function(a) {
                    return -1 === b.indexOf(a.iso2)
                })
            } else
                this.p = k
        },
        _translateCountriesByLocale: function() {
            for (var a = 0; a < this.p.length; a++) {
                var b = this.p[a].iso2.toLowerCase();
                b in this.b.localizedCountries && (this.p[a].name = this.b.localizedCountries[b])
            }
        },
        _countryNameSort: function(a, b) {
            return a.name.localeCompare(b.name)
        },
        _d2: function() {
            this.q = {};
            for (var a = 0; a < this.p.length; a++) {
                var b = this.p[a];
                if (this._c(b.iso2, b.dialCode, b.priority),
                b.areaCodes)
                    for (var c = 0; c < b.areaCodes.length; c++)
                        this._c(b.iso2, b.dialCode + b.areaCodes[c])
            }
        },
        _e: function() {
            this.preferredCountries = [];
            for (var a = 0; a < this.b.preferredCountries.length; a++) {
                var b = this.b.preferredCountries[a].toLowerCase()
                  , c = this._y(b, !1, !0);
                c && this.preferredCountries.push(c)
            }
        },
        _f: function() {
            this.a.attr("autocomplete", "off");
            var b = "intl-tel-input";
            this.b.allowDropdown && (b += " allow-dropdown"),
            this.b.separateDialCode && (b += " separate-dial-code"),
            this.a.wrap(a("<div>", {
                "class": b
            })),
            this.k = a("<div>", {
                "class": "flag-container"
            }).insertBefore(this.a);
            var c = a("<div>", {
                "class": "selected-flag"
            });
            if (c.appendTo(this.k),
            this.l = a("<div>", {
                "class": "iti-flag"
            }).appendTo(c),
            this.b.separateDialCode && (this.t = a("<div>", {
                "class": "selected-dial-code"
            }).appendTo(c)),
            this.b.allowDropdown ? (c.attr("tabindex", "0"),
            a("<div>", {
                "class": "iti-arrow"
            }).appendTo(c),
            this.m = a("<ul>", {
                "class": "country-list hide"
            }),
            this.preferredCountries.length && (this._g(this.preferredCountries, "preferred"),
            a("<li>", {
                "class": "divider"
            }).appendTo(this.m)),
            this._g(this.p, ""),
            this.o = this.m.children(".country"),
            this.b.dropdownContainer ? this.dropdown = a("<div>", {
                "class": "intl-tel-input iti-container"
            }).append(this.m) : this.m.appendTo(this.k)) : this.o = a(),
            this.b.hiddenInput) {
                var d = this.b.hiddenInput
                  , e = this.a.attr("name");
                if (e) {
                    var f = e.lastIndexOf("[");
                    -1 !== f && (d = e.substr(0, f) + "[" + d + "]")
                }
                this.hiddenInput = a("<input>", {
                    type: "hidden",
                    name: d
                }).insertAfter(this.a)
            }
        },
        _g: function(a, b) {
            for (var c = "", d = 0; d < a.length; d++) {
                var e = a[d];
                c += "<li class='country " + b + "' data-dial-code='" + e.dialCode + "' data-country-code='" + e.iso2 + "'>",
                c += "<div class='flag-box'><div class='iti-flag " + e.iso2 + "'></div></div>",
                c += "<span class='country-name'>" + e.name + "</span>",
                c += "<span class='dial-code'>+" + e.dialCode + "</span>",
                c += "</li>"
            }
            this.m.append(c)
        },
        _h: function() {
            var a = this.a.val();
            this._af(a) && (!this._isRegionlessNanp(a) || this.b.nationalMode && !this.b.initialCountry) ? this._v(a) : "auto" !== this.b.initialCountry && (this.b.initialCountry ? this._z(this.b.initialCountry.toLowerCase()) : (this.j = this.preferredCountries.length ? this.preferredCountries[0].iso2 : this.p[0].iso2,
            a || this._z(this.j)),
            a || this.b.nationalMode || this.b.autoHideDialCode || this.b.separateDialCode || this.a.val("+" + this.s.dialCode)),
            a && this._u(a)
        },
        _i: function() {
            this._j(),
            this.b.autoHideDialCode && this._l(),
            this.b.allowDropdown && this._i1(),
            this.hiddenInput && this._initHiddenInputListener()
        },
        _initHiddenInputListener: function() {
            var a = this
              , b = this.a.closest("form");
            b.length && b.submit(function() {
                a.hiddenInput.val(a.getNumber())
            })
        },
        _i1: function() {
            var a = this
              , b = this.a.closest("label");
            b.length && b.on("click" + this.ns, function(b) {
                a.m.hasClass("hide") ? a.a.focus() : b.preventDefault()
            }),
            this.l.parent().on("click" + this.ns, function(b) {
                !a.m.hasClass("hide") || a.a.prop("disabled") || a.a.prop("readonly") || a._n()
            }),
            this.k.on("keydown" + a.ns, function(b) {
                !a.m.hasClass("hide") || b.which != i.b && b.which != i.c && b.which != i.j && b.which != i.d || (b.preventDefault(),
                b.stopPropagation(),
                a._n()),
                b.which == i.k && a._ac()
            })
        },
        _i2: function() {
            var c = this;
            this.b.utilsScript ? a.fn[f].windowLoaded ? a.fn[f].loadUtils(this.b.utilsScript, this.i) : a(b).on("load", function() {
                a.fn[f].loadUtils(c.b.utilsScript, c.i)
            }) : this.i.resolve(),
            "auto" === this.b.initialCountry ? this._i3() : this.h.resolve()
        },
        _i3: function() {
            a.fn[f].autoCountry ? this.handleAutoCountry() : a.fn[f].startedLoadingAutoCountry || (a.fn[f].startedLoadingAutoCountry = !0,
            "function" == typeof this.b.geoIpLookup && this.b.geoIpLookup(function(b) {
                a.fn[f].autoCountry = b.toLowerCase(),
                setTimeout(function() {
                    a(".intl-tel-input input").intlTelInput("handleAutoCountry")
                })
            }))
        },
        _j: function() {
            var a = this;
            this.a.on("keyup" + this.ns, function() {
                a._v(a.a.val()) && a._triggerCountryChange()
            }),
            this.a.on("cut" + this.ns + " paste" + this.ns, function() {
                setTimeout(function() {
                    a._v(a.a.val()) && a._triggerCountryChange()
                })
            })
        },
        _j2: function(a) {
            var b = this.a.attr("maxlength");
            return b && a.length > b ? a.substr(0, b) : a
        },
        _l: function() {
            var b = this;
            this.a.on("mousedown" + this.ns, function(a) {
                b.a.is(":focus") || b.a.val() || (a.preventDefault(),
                b.a.focus())
            }),
            this.a.on("focus" + this.ns, function(a) {
                b.a.val() || b.a.prop("readonly") || !b.s.dialCode || (b.a.val("+" + b.s.dialCode),
                b.a.one("keypress.plus" + b.ns, function(a) {
                    a.which == i.f && b.a.val("")
                }),
                setTimeout(function() {
                    var a = b.a[0];
                    if (b.d) {
                        var c = b.a.val().length;
                        a.setSelectionRange(c, c)
                    }
                }))
            });
            var c = this.a.prop("form");
            c && a(c).on("submit" + this.ns, function() {
                b._removeEmptyDialCode()
            }),
            this.a.on("blur" + this.ns, function() {
                b._removeEmptyDialCode()
            })
        },
        _removeEmptyDialCode: function() {
            var a = this.a.val();
            if ("+" == a.charAt(0)) {
                var b = this._m(a);
                b && this.s.dialCode != b || this.a.val("")
            }
            this.a.off("keypress.plus" + this.ns)
        },
        _m: function(a) {
            return a.replace(/\D/g, "")
        },
        _n: function() {
            this._o();
            var a = this.m.children(".active");
            a.length && (this._x(a),
            this._ad(a)),
            this._p(),
            this.l.children(".iti-arrow").addClass("up"),
            this.a.trigger("open:countrydropdown")
        },
        _o: function() {
            var c = this;
            if (this.b.dropdownContainer && this.dropdown.appendTo(this.b.dropdownContainer),
            this.n = this.m.removeClass("hide").outerHeight(),
            !this.g) {
                var d = this.a.offset()
                  , e = d.top
                  , f = a(b).scrollTop()
                  , g = e + this.a.outerHeight() + this.n < f + a(b).height()
                  , h = e - this.n > f;
                if (this.m.toggleClass("dropup", !g && h),
                this.b.dropdownContainer) {
                    var i = !g && h ? 0 : this.a.innerHeight();
                    this.dropdown.css({
                        top: e + i,
                        left: d.left
                    }),
                    a(b).on("scroll" + this.ns, function() {
                        c._ac()
                    })
                }
            }
        },
        _p: function() {
            var b = this;
            this.m.on("mouseover" + this.ns, ".country", function(c) {
                b._x(a(this))
            }),
            this.m.on("click" + this.ns, ".country", function(c) {
                b._ab(a(this))
            });
            var d = !0;
            a("html").on("click" + this.ns, function(a) {
                d || b._ac(),
                d = !1
            });
            var e = ""
              , f = null;
            a(c).on("keydown" + this.ns, function(a) {
                a.preventDefault(),
                a.which == i.b || a.which == i.c ? b._q(a.which) : a.which == i.d ? b._r() : a.which == i.e ? b._ac() : (a.which >= i.A && a.which <= i.Z || a.which == i.j) && (f && clearTimeout(f),
                e += String.fromCharCode(a.which),
                b._s(e),
                f = setTimeout(function() {
                    e = ""
                }, 1e3))
            })
        },
        _q: function(a) {
            var b = this.m.children(".highlight").first()
              , c = a == i.b ? b.prev() : b.next();
            c.length && (c.hasClass("divider") && (c = a == i.b ? c.prev() : c.next()),
            this._x(c),
            this._ad(c))
        },
        _r: function() {
            var a = this.m.children(".highlight").first();
            a.length && this._ab(a)
        },
        _s: function(a) {
            for (var b = 0; b < this.p.length; b++)
                if (this._t(this.p[b].name, a)) {
                    var c = this.m.children("[data-country-code=" + this.p[b].iso2 + "]").not(".preferred");
                    this._x(c),
                    this._ad(c, !0);
                    break
                }
        },
        _t: function(a, b) {
            return a.substr(0, b.length).toUpperCase() == b
        },
        _u: function(a) {
            if (this.b.formatOnDisplay && b.intlTelInputUtils && this.s) {
                var c = this.b.separateDialCode || !this.b.nationalMode && "+" == a.charAt(0) ? intlTelInputUtils.numberFormat.INTERNATIONAL : intlTelInputUtils.numberFormat.NATIONAL;
                a = intlTelInputUtils.formatNumber(a, this.s.iso2, c)
            }
            a = this._ah(a),
            this.a.val(a)
        },
        _v: function(b) {
            b && this.b.nationalMode && "1" == this.s.dialCode && "+" != b.charAt(0) && ("1" != b.charAt(0) && (b = "1" + b),
            b = "+" + b);
            var c = this._af(b)
              , d = null
              , e = this._m(b);
            if (c) {
                var f = this.q[this._m(c)]
                  , g = a.inArray(this.s.iso2, f) > -1
                  , h = "+1" == c && e.length >= 4;
                if ((!("1" == this.s.dialCode) || !this._isRegionlessNanp(e)) && (!g || h))
                    for (var i = 0; i < f.length; i++)
                        if (f[i]) {
                            d = f[i];
                            break
                        }
            } else
                "+" == b.charAt(0) && e.length ? d = "" : b && "+" != b || (d = this.j);
            return null !== d && this._z(d)
        },
        _isRegionlessNanp: function(b) {
            var c = this._m(b);
            if ("1" == c.charAt(0)) {
                var d = c.substr(1, 3);
                return a.inArray(d, j) > -1
            }
            return !1
        },
        _x: function(a) {
            this.o.removeClass("highlight"),
            a.addClass("highlight")
        },
        _y: function(a, b, c) {
            for (var d = b ? k : this.p, e = 0; e < d.length; e++)
                if (d[e].iso2 == a)
                    return d[e];
            if (c)
                return null;
            throw new Error("No country data for '" + a + "'")
        },
        _z: function(a) {
            var b = this.s.iso2 ? this.s : {};
            this.s = a ? this._y(a, !1, !1) : {},
            this.s.iso2 && (this.j = this.s.iso2),
            this.l.attr("class", "iti-flag " + a);
            var c = a ? this.s.name + ": +" + this.s.dialCode : "Unknown";
            if (this.l.parent().attr("title", c),
            this.b.separateDialCode) {
                var d = this.s.dialCode ? "+" + this.s.dialCode : ""
                  , e = this.a.parent();
                b.dialCode && e.removeClass("iti-sdc-" + (b.dialCode.length + 1)),
                d && e.addClass("iti-sdc-" + d.length),
                this.t.text(d)
            }
            return this._aa(),
            this.o.removeClass("active"),
            a && this.o.find(".iti-flag." + a).first().closest(".country").addClass("active"),
            b.iso2 !== a
        },
        _aa: function() {
            var a = "aggressive" === this.b.autoPlaceholder || !this.e && (!0 === this.b.autoPlaceholder || "polite" === this.b.autoPlaceholder);
            if (b.intlTelInputUtils && a) {
                var c = intlTelInputUtils.numberType[this.b.placeholderNumberType]
                  , d = this.s.iso2 ? intlTelInputUtils.getExampleNumber(this.s.iso2, this.b.nationalMode, c) : "";
                d = this._ah(d),
                "function" == typeof this.b.customPlaceholder && (d = this.b.customPlaceholder(d, this.s)),
                this.a.attr("placeholder", d)
            }
        },
        _ab: function(a) {
            var b = this._z(a.attr("data-country-code"));
            if (this._ac(),
            this._ae(a.attr("data-dial-code"), !0),
            this.a.focus(),
            this.d) {
                var c = this.a.val().length;
                this.a[0].setSelectionRange(c, c)
            }
            b && this._triggerCountryChange()
        },
        _ac: function() {
            this.m.addClass("hide"),
            this.l.children(".iti-arrow").removeClass("up"),
            a(c).off(this.ns),
            a("html").off(this.ns),
            this.m.off(this.ns),
            this.b.dropdownContainer && (this.g || a(b).off("scroll" + this.ns),
            this.dropdown.detach()),
            this.a.trigger("close:countrydropdown")
        },
        _ad: function(a, b) {
            var c = this.m
              , d = c.height()
              , e = c.offset().top
              , f = e + d
              , g = a.outerHeight()
              , h = a.offset().top
              , i = h + g
              , j = h - e + c.scrollTop()
              , k = d / 2 - g / 2;
            if (h < e)
                b && (j -= k),
                c.scrollTop(j);
            else if (i > f) {
                b && (j += k);
                var l = d - g;
                c.scrollTop(j - l)
            }
        },
        _ae: function(a, b) {
            var c, d = this.a.val();
            if (a = "+" + a,
            "+" == d.charAt(0)) {
                var e = this._af(d);
                c = e ? d.replace(e, a) : a
            } else {
                if (this.b.nationalMode || this.b.separateDialCode)
                    return;
                if (d)
                    c = a + d;
                else {
                    if (!b && this.b.autoHideDialCode)
                        return;
                    c = a
                }
            }
            this.a.val(c)
        },
        _af: function(b) {
            var c = "";
            if ("+" == b.charAt(0))
                for (var d = "", e = 0; e < b.length; e++) {
                    var f = b.charAt(e);
                    if (a.isNumeric(f) && (d += f,
                    this.q[d] && (c = b.substr(0, e + 1)),
                    4 == d.length))
                        break
                }
            return c
        },
        _ag: function() {
            var b = a.trim(this.a.val())
              , c = this.s.dialCode
              , d = this._m(b)
              , e = "1" == d.charAt(0) ? d : "1" + d;
            return (this.b.separateDialCode ? "+" + c : "+" != b.charAt(0) && "1" != b.charAt(0) && c && "1" == c.charAt(0) && 4 == c.length && c != e.substr(0, 4) ? c.substr(1) : "") + b
        },
        _ah: function(a) {
            if (this.b.separateDialCode) {
                var b = this._af(a);
                if (b) {
                    null !== this.s.areaCodes && (b = "+" + this.s.dialCode);
                    var c = " " === a[b.length] || "-" === a[b.length] ? b.length + 1 : b.length;
                    a = a.substr(c)
                }
            }
            return this._j2(a)
        },
        _triggerCountryChange: function() {
            this.a.trigger("countrychange", this.s)
        },
        handleAutoCountry: function() {
            "auto" === this.b.initialCountry && (this.j = a.fn[f].autoCountry,
            this.a.val() || this.setCountry(this.j),
            this.h.resolve())
        },
        handleUtils: function() {
            b.intlTelInputUtils && (this.a.val() && this._u(this.a.val()),
            this._aa()),
            this.i.resolve()
        },
        destroy: function() {
            if (this.b.allowDropdown && (this._ac(),
            this.l.parent().off(this.ns),
            this.a.closest("label").off(this.ns)),
            this.b.autoHideDialCode) {
                var b = this.a.prop("form");
                b && a(b).off(this.ns)
            }
            this.a.off(this.ns),
            this.a.parent().before(this.a).remove()
        },
        getExtension: function() {
            return b.intlTelInputUtils ? intlTelInputUtils.getExtension(this._ag(), this.s.iso2) : ""
        },
        getNumber: function(a) {
            return b.intlTelInputUtils ? intlTelInputUtils.formatNumber(this._ag(), this.s.iso2, a) : ""
        },
        getNumberType: function() {
            return b.intlTelInputUtils ? intlTelInputUtils.getNumberType(this._ag(), this.s.iso2) : -99
        },
        getSelectedCountryData: function() {
            return this.s
        },
        getValidationError: function() {
            return b.intlTelInputUtils ? intlTelInputUtils.getValidationError(this._ag(), this.s.iso2) : -99
        },
        isValidNumber: function() {
            var c = a.trim(this._ag())
              , d = this.b.nationalMode ? this.s.iso2 : "";
            return b.intlTelInputUtils ? intlTelInputUtils.isValidNumber(c, d) : null
        },
        setCountry: function(a) {
            a = a.toLowerCase(),
            this.l.hasClass(a) || (this._z(a),
            this._ae(this.s.dialCode, !1),
            this._triggerCountryChange())
        },
        setNumber: function(a) {
            var b = this._v(a);
            this._u(a),
            b && this._triggerCountryChange()
        },
        setPlaceholderNumberType: function(a) {
            this.b.placeholderNumberType = a,
            this._aa()
        }
    },
    a.fn[f] = function(b) {
        var c = arguments;
        if (b === d || "object" == typeof b) {
            var g = [];
            return this.each(function() {
                if (!a.data(this, "plugin_" + f)) {
                    var c = new e(this,b)
                      , d = c._a();
                    g.push(d[0]),
                    g.push(d[1]),
                    a.data(this, "plugin_" + f, c)
                }
            }),
            a.when.apply(null, g)
        }
        if ("string" == typeof b && "_" !== b[0]) {
            var h;
            return this.each(function() {
                var d = a.data(this, "plugin_" + f);
                d instanceof e && "function" == typeof d[b] && (h = d[b].apply(d, Array.prototype.slice.call(c, 1))),
                "destroy" === b && a.data(this, "plugin_" + f, null)
            }),
            h !== d ? h : this
        }
    }
    ,
    a.fn[f].getCountryData = function() {
        return k
    }
    ,
    a.fn[f].loadUtils = function(b, c) {
        a.fn[f].loadedUtilsScript ? c && c.resolve() : (a.fn[f].loadedUtilsScript = !0,
        a.ajax({
            type: "GET",
            url: b,
            complete: function() {
                a(".intl-tel-input input").intlTelInput("handleUtils")
            },
            dataType: "script",
            cache: !0
        }))
    }
    ,
    a.fn[f].defaults = h,
    a.fn[f].version = "12.4.0";
    for (var k = [["Afghanistan (‫افغانستان‬‎)", "af", "93"], ["Albania (Shqipëri)", "al", "355"], ["Algeria (‫الجزائر‬‎)", "dz", "213"], ["American Samoa", "as", "1684"], ["Andorra", "ad", "376"], ["Angola", "ao", "244"], ["Anguilla", "ai", "1264"], ["Antigua and Barbuda", "ag", "1268"], ["Argentina", "ar", "54"], ["Armenia (Հայաստան)", "am", "374"], ["Aruba", "aw", "297"], ["Australia", "au", "61", 0], ["Austria (Österreich)", "at", "43"], ["Azerbaijan (Azərbaycan)", "az", "994"], ["Bahamas", "bs", "1242"], ["Bahrain (‫البحرين‬‎)", "bh", "973"], ["Bangladesh (বাংলাদেশ)", "bd", "880"], ["Barbados", "bb", "1246"], ["Belarus (Беларусь)", "by", "375"], ["Belgium (België)", "be", "32"], ["Belize", "bz", "501"], ["Benin (Bénin)", "bj", "229"], ["Bermuda", "bm", "1441"], ["Bhutan (འབྲུག)", "bt", "975"], ["Bolivia", "bo", "591"], ["Bosnia and Herzegovina (Босна и Херцеговина)", "ba", "387"], ["Botswana", "bw", "267"], ["Brazil (Brasil)", "br", "55"], ["British Indian Ocean Territory", "io", "246"], ["British Virgin Islands", "vg", "1284"], ["Brunei", "bn", "673"], ["Bulgaria (България)", "bg", "359"], ["Burkina Faso", "bf", "226"], ["Burundi (Uburundi)", "bi", "257"], ["Cambodia (កម្ពុជា)", "kh", "855"], ["Cameroon (Cameroun)", "cm", "237"], ["Canada", "ca", "1", 1, ["204", "226", "236", "249", "250", "289", "306", "343", "365", "387", "403", "416", "418", "431", "437", "438", "450", "506", "514", "519", "548", "579", "581", "587", "604", "613", "639", "647", "672", "705", "709", "742", "778", "780", "782", "807", "819", "825", "867", "873", "902", "905"]], ["Cape Verde (Kabu Verdi)", "cv", "238"], ["Caribbean Netherlands", "bq", "599", 1], ["Cayman Islands", "ky", "1345"], ["Central African Republic (République centrafricaine)", "cf", "236"], ["Chad (Tchad)", "td", "235"], ["Chile", "cl", "56"], ["China (中国)", "cn", "86"], ["Christmas Island", "cx", "61", 2], ["Cocos (Keeling) Islands", "cc", "61", 1], ["Colombia", "co", "57"], ["Comoros (‫جزر القمر‬‎)", "km", "269"], ["Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)", "cd", "243"], ["Congo (Republic) (Congo-Brazzaville)", "cg", "242"], ["Cook Islands", "ck", "682"], ["Costa Rica", "cr", "506"], ["Côte d’Ivoire", "ci", "225"], ["Croatia (Hrvatska)", "hr", "385"], ["Cuba", "cu", "53"], ["Curaçao", "cw", "599", 0], ["Cyprus (Κύπρος)", "cy", "357"], ["Czech Republic (Česká republika)", "cz", "420"], ["Denmark (Danmark)", "dk", "45"], ["Djibouti", "dj", "253"], ["Dominica", "dm", "1767"], ["Dominican Republic (República Dominicana)", "do", "1", 2, ["809", "829", "849"]], ["Ecuador", "ec", "593"], ["Egypt (‫مصر‬‎)", "eg", "20"], ["El Salvador", "sv", "503"], ["Equatorial Guinea (Guinea Ecuatorial)", "gq", "240"], ["Eritrea", "er", "291"], ["Estonia (Eesti)", "ee", "372"], ["Ethiopia", "et", "251"], ["Falkland Islands (Islas Malvinas)", "fk", "500"], ["Faroe Islands (Føroyar)", "fo", "298"], ["Fiji", "fj", "679"], ["Finland (Suomi)", "fi", "358", 0], ["France", "fr", "33"], ["French Guiana (Guyane française)", "gf", "594"], ["French Polynesia (Polynésie française)", "pf", "689"], ["Gabon", "ga", "241"], ["Gambia", "gm", "220"], ["Georgia (საქართველო)", "ge", "995"], ["Germany (Deutschland)", "de", "49"], ["Ghana (Gaana)", "gh", "233"], ["Gibraltar", "gi", "350"], ["Greece (Ελλάδα)", "gr", "30"], ["Greenland (Kalaallit Nunaat)", "gl", "299"], ["Grenada", "gd", "1473"], ["Guadeloupe", "gp", "590", 0], ["Guam", "gu", "1671"], ["Guatemala", "gt", "502"], ["Guernsey", "gg", "44", 1], ["Guinea (Guinée)", "gn", "224"], ["Guinea-Bissau (Guiné Bissau)", "gw", "245"], ["Guyana", "gy", "592"], ["Haiti", "ht", "509"], ["Honduras", "hn", "504"], ["Hong Kong (香港)", "hk", "852"], ["Hungary (Magyarország)", "hu", "36"], ["Iceland (Ísland)", "is", "354"], ["India (भारत)", "in", "91"], ["Indonesia", "id", "62"], ["Iran (‫ایران‬‎)", "ir", "98"], ["Iraq (‫العراق‬‎)", "iq", "964"], ["Ireland", "ie", "353"], ["Isle of Man", "im", "44", 2], ["Israel (‫ישראל‬‎)", "il", "972"], ["Italy (Italia)", "it", "39", 0], ["Jamaica", "jm", "1", 4, ["876", "658"]], ["Japan (日本)", "jp", "81"], ["Jersey", "je", "44", 3], ["Jordan (‫الأردن‬‎)", "jo", "962"], ["Kazakhstan (Казахстан)", "kz", "7", 1], ["Kenya", "ke", "254"], ["Kiribati", "ki", "686"], ["Kosovo", "xk", "383"], ["Kuwait (‫الكويت‬‎)", "kw", "965"], ["Kyrgyzstan (Кыргызстан)", "kg", "996"], ["Laos (ລາວ)", "la", "856"], ["Latvia (Latvija)", "lv", "371"], ["Lebanon (‫لبنان‬‎)", "lb", "961"], ["Lesotho", "ls", "266"], ["Liberia", "lr", "231"], ["Libya (‫ليبيا‬‎)", "ly", "218"], ["Liechtenstein", "li", "423"], ["Lithuania (Lietuva)", "lt", "370"], ["Luxembourg", "lu", "352"], ["Macau (澳門)", "mo", "853"], ["Macedonia (FYROM) (Македонија)", "mk", "389"], ["Madagascar (Madagasikara)", "mg", "261"], ["Malawi", "mw", "265"], ["Malaysia", "my", "60"], ["Maldives", "mv", "960"], ["Mali", "ml", "223"], ["Malta", "mt", "356"], ["Marshall Islands", "mh", "692"], ["Martinique", "mq", "596"], ["Mauritania (‫موريتانيا‬‎)", "mr", "222"], ["Mauritius (Moris)", "mu", "230"], ["Mayotte", "yt", "262", 1], ["Mexico (México)", "mx", "52"], ["Micronesia", "fm", "691"], ["Moldova (Republica Moldova)", "md", "373"], ["Monaco", "mc", "377"], ["Mongolia (Монгол)", "mn", "976"], ["Montenegro (Crna Gora)", "me", "382"], ["Montserrat", "ms", "1664"], ["Morocco (‫المغرب‬‎)", "ma", "212", 0], ["Mozambique (Moçambique)", "mz", "258"], ["Myanmar (Burma) (မြန်မာ)", "mm", "95"], ["Namibia (Namibië)", "na", "264"], ["Nauru", "nr", "674"], ["Nepal (नेपाल)", "np", "977"], ["Netherlands (Nederland)", "nl", "31"], ["New Caledonia (Nouvelle-Calédonie)", "nc", "687"], ["New Zealand", "nz", "64"], ["Nicaragua", "ni", "505"], ["Niger (Nijar)", "ne", "227"], ["Nigeria", "ng", "234"], ["Niue", "nu", "683"], ["Norfolk Island", "nf", "672"], ["North Korea (조선 민주주의 인민 공화국)", "kp", "850"], ["Northern Mariana Islands", "mp", "1670"], ["Norway (Norge)", "no", "47", 0], ["Oman (‫عُمان‬‎)", "om", "968"], ["Pakistan (‫پاکستان‬‎)", "pk", "92"], ["Palau", "pw", "680"], ["Palestine (‫فلسطين‬‎)", "ps", "970"], ["Panama (Panamá)", "pa", "507"], ["Papua New Guinea", "pg", "675"], ["Paraguay", "py", "595"], ["Peru (Perú)", "pe", "51"], ["Philippines", "ph", "63"], ["Poland (Polska)", "pl", "48"], ["Portugal", "pt", "351"], ["Puerto Rico", "pr", "1", 3, ["787", "939"]], ["Qatar (‫قطر‬‎)", "qa", "974"], ["Réunion (La Réunion)", "re", "262", 0], ["Romania (România)", "ro", "40"], ["Russia (Россия)", "ru", "7", 0], ["Rwanda", "rw", "250"], ["Saint Barthélemy", "bl", "590", 1], ["Saint Helena", "sh", "290"], ["Saint Kitts and Nevis", "kn", "1869"], ["Saint Lucia", "lc", "1758"], ["Saint Martin (Saint-Martin (partie française))", "mf", "590", 2], ["Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)", "pm", "508"], ["Saint Vincent and the Grenadines", "vc", "1784"], ["Samoa", "ws", "685"], ["San Marino", "sm", "378"], ["São Tomé and Príncipe (São Tomé e Príncipe)", "st", "239"], ["Saudi Arabia (‫المملكة العربية السعودية‬‎)", "sa", "966"], ["Senegal (Sénégal)", "sn", "221"], ["Serbia (Србија)", "rs", "381"], ["Seychelles", "sc", "248"], ["Sierra Leone", "sl", "232"], ["Singapore", "sg", "65"], ["Sint Maarten", "sx", "1721"], ["Slovakia (Slovensko)", "sk", "421"], ["Slovenia (Slovenija)", "si", "386"], ["Solomon Islands", "sb", "677"], ["Somalia (Soomaaliya)", "so", "252"], ["South Africa", "za", "27"], ["South Korea (대한민국)", "kr", "82"], ["South Sudan (‫جنوب السودان‬‎)", "ss", "211"], ["Spain (España)", "es", "34"], ["Sri Lanka (ශ්‍රී ලංකාව)", "lk", "94"], ["Sudan (‫السودان‬‎)", "sd", "249"], ["Suriname", "sr", "597"], ["Svalbard and Jan Mayen", "sj", "47", 1], ["Swaziland", "sz", "268"], ["Sweden (Sverige)", "se", "46"], ["Switzerland (Schweiz)", "ch", "41"], ["Syria (‫سوريا‬‎)", "sy", "963"], ["Taiwan (台灣)", "tw", "886"], ["Tajikistan", "tj", "992"], ["Tanzania", "tz", "255"], ["Thailand (ไทย)", "th", "66"], ["Timor-Leste", "tl", "670"], ["Togo", "tg", "228"], ["Tokelau", "tk", "690"], ["Tonga", "to", "676"], ["Trinidad and Tobago", "tt", "1868"], ["Tunisia (‫تونس‬‎)", "tn", "216"], ["Turkey (Türkiye)", "tr", "90"], ["Turkmenistan", "tm", "993"], ["Turks and Caicos Islands", "tc", "1649"], ["Tuvalu", "tv", "688"], ["U.S. Virgin Islands", "vi", "1340"], ["Uganda", "ug", "256"], ["Ukraine (Україна)", "ua", "380"], ["United Arab Emirates (‫الإمارات العربية المتحدة‬‎)", "ae", "971"], ["United Kingdom", "gb", "44", 0], ["United States", "us", "1", 0], ["Uruguay", "uy", "598"], ["Uzbekistan (Oʻzbekiston)", "uz", "998"], ["Vanuatu", "vu", "678"], ["Vatican City (Città del Vaticano)", "va", "39", 1], ["Venezuela", "ve", "58"], ["Vietnam (Việt Nam)", "vn", "84"], ["Wallis and Futuna (Wallis-et-Futuna)", "wf", "681"], ["Western Sahara (‫الصحراء الغربية‬‎)", "eh", "212", 1], ["Yemen (‫اليمن‬‎)", "ye", "967"], ["Zambia", "zm", "260"], ["Zimbabwe", "zw", "263"], ["Åland Islands", "ax", "358", 1]], l = 0; l < k.length; l++) {
        var m = k[l];
        k[l] = {
            name: m[0],
            iso2: m[1],
            dialCode: m[2],
            priority: m[3] || 0,
            areaCodes: m[4] || null
        }
    }
});
;;!function(n) {
    "function" == typeof define && define.amd ? define(["jquery"], function(i) {
        n(i, window, document)
    }) : n(jQuery, window, document)
}(function(n, i, t, a) {
    "use strict";
    var e = "countrySelect"
      , s = 1
      , o = {
        defaultCountry: "",
        defaultStyling: "inside",
        excludeCountries: [],
        onlyCountries: [],
        preferredCountries: ["us", "gb"]
    }
      , r = 38
      , u = 40
      , l = 13
      , h = 27
      , c = 65
      , d = 90
      , p = 32
      , g = 9;
    function y(i, t) {
        this.element = i,
        this.options = n.extend({}, o, t),
        this._defaults = o,
        this.ns = "." + e + s++,
        this._name = e,
        this.init()
    }
    n(i).on("load", function() {
        !0
    }),
    y.prototype = {
        init: function() {
            return this._processCountryData(),
            this._generateMarkup(),
            this._setInitialState(),
            this._initListeners(),
            this.autoCountryDeferred = new n.Deferred,
            this._initAutoCountry(),
            this.autoCountryDeferred
        },
        _processCountryData: function() {
            this._setInstanceCountryData(),
            this._setPreferredCountries()
        },
        _setInstanceCountryData: function() {
            var i = this;
            if (this.options.onlyCountries.length) {
                var t = [];
                n.each(this.options.onlyCountries, function(n, a) {
                    var e = i._getCountryData(a, !0);
                    e && t.push(e)
                }),
                this.countries = t
            } else if (this.options.excludeCountries.length) {
                var a = this.options.excludeCountries.map(function(n) {
                    return n.toLowerCase()
                });
                this.countries = f.filter(function(n) {
                    return -1 === a.indexOf(n.iso2)
                })
            } else
                this.countries = f
        },
        _setPreferredCountries: function() {
            var i = this;
            this.preferredCountries = [],
            n.each(this.options.preferredCountries, function(n, t) {
                var a = i._getCountryData(t, !1);
                a && i.preferredCountries.push(a)
            })
        },
        _generateMarkup: function() {
            this.countryInput = n(this.element);
            var i = "country-select";
            this.options.defaultStyling && (i += " " + this.options.defaultStyling),
            this.countryInput.wrap(n("<div>", {
                class: i
            })),
            this.flagsContainer = n("<div>", {
                class: "flag-dropdown"
            }).insertBefore(this.countryInput);
            var t = n("<div>", {
                class: "selected-flag"
            }).appendTo(this.flagsContainer);
            this.selectedFlagInner = n("<div>", {
                class: "flag"
            }).appendTo(t),
            n("<div>", {
                class: "arrow"
            }).appendTo(t),
            this.countryList = n("<ul>", {
                class: "country-list v-hide"
            }).appendTo(this.flagsContainer),
            this.preferredCountries.length && (this._appendListItems(this.preferredCountries, "preferred"),
            n("<li>", {
                class: "divider"
            }).appendTo(this.countryList)),
            this._appendListItems(this.countries, ""),
            this.countryCodeInput = n("#" + this.countryInput.attr("id") + "_code"),
            this.countryCodeInput || (this.countryCodeInput = n('<input type="hidden" id="' + this.countryInput.attr("id") + '_code" name="' + this.countryInput.attr("name") + '_code" value="" />'),
            this.countryCodeInput.insertAfter(this.countryInput)),
            this.dropdownHeight = this.countryList.outerHeight(),
            this.countryList.removeClass("v-hide").addClass("hide"),
            this.countryListItems = this.countryList.children(".country")
        },
        _appendListItems: function(i, t) {
            var a = "";
            n.each(i, function(n, i) {
                a += '<li class="country ' + t + '" data-country-code="' + i.iso2 + '">',
                a += '<div class="flag ' + i.iso2 + '"></div>',
                a += '<span class="country-name">' + i.name + "</span>",
                a += "</li>"
            }),
            this.countryList.append(a)
        },
        _setInitialState: function() {
            var n = !1;
            this.countryInput.val() && (n = this._updateFlagFromInputVal());
            var i, t = this.countryCodeInput.val();
            (t && this.selectCountry(t),
            n) || (this.options.defaultCountry && (i = this._getCountryData(this.options.defaultCountry, !1)) || (i = this.preferredCountries.length ? this.preferredCountries[0] : this.countries[0]),
            this.defaultCountry = i.iso2)
        },
        _initListeners: function() {
            var n = this
              , i = this.countryInput.closest("label");
            i.length && i.on("click" + this.ns, function(i) {
                n.countryList.hasClass("hide") ? n.countryInput.focus() : i.preventDefault()
            }),
            this.selectedFlagInner.parent().on("click" + this.ns, function(i) {
                n.countryList.hasClass("hide") && !n.countryInput.prop("disabled") && n._showDropdown()
            }),
            this.flagsContainer.on("keydown" + n.ns, function(i) {
                !n.countryList.hasClass("hide") || i.which != r && i.which != u && i.which != p && i.which != l || (i.preventDefault(),
                i.stopPropagation(),
                n._showDropdown()),
                i.which == g && n._closeDropdown()
            })
        },
        _initAutoCountry: function() {
            "auto" === this.options.initialCountry ? this._loadAutoCountry() : (this.selectCountry(this.defaultCountry),
            this.autoCountryDeferred.resolve())
        },
        _loadAutoCountry: function() {
            n.fn[e].autoCountry ? this.handleAutoCountry() : n.fn[e].startedLoadingAutoCountry || (n.fn[e].startedLoadingAutoCountry = !0,
            "function" == typeof this.options.geoIpLookup && this.options.geoIpLookup(function(i) {
                n.fn[e].autoCountry = i.toLowerCase(),
                setTimeout(function() {
                    n(".country-select input").countrySelect("handleAutoCountry")
                })
            }))
        },
        _focus: function() {
            this.countryInput.focus();
            var n = this.countryInput[0];
            if (n.setSelectionRange) {
                var i = this.countryInput.val().length;
                n.setSelectionRange(i, i)
            }
        },
        _showDropdown: function() {
            this._setDropdownPosition();
            var n = this.countryList.children(".active");
            this._highlightListItem(n),
            this.countryList.removeClass("hide"),
            this._scrollTo(n),
            this._bindDropdownListeners(),
            this.selectedFlagInner.parent().children(".arrow").addClass("up")
        },
        _setDropdownPosition: function() {
            var t = this.countryInput.offset().top
              , a = n(i).scrollTop()
              , e = t + this.countryInput.outerHeight() + this.dropdownHeight < a + n(i).height()
              , s = t - this.dropdownHeight > a
              , o = !e && s ? "-" + (this.dropdownHeight - 1) + "px" : "";
            this.countryList.css("top", o)
        },
        _bindDropdownListeners: function() {
            var i = this;
            this.countryList.on("mouseover" + this.ns, ".country", function(t) {
                i._highlightListItem(n(this))
            }),
            this.countryList.on("click" + this.ns, ".country", function(t) {
                i._selectListItem(n(this))
            });
            var a = !0;
            n("html").on("click" + this.ns, function(n) {
                a || i._closeDropdown(),
                a = !1
            }),
            n(t).on("keydown" + this.ns, function(n) {
                n.preventDefault(),
                n.which == r || n.which == u ? i._handleUpDownKey(n.which) : n.which == l ? i._handleEnterKey() : n.which == h ? i._closeDropdown() : n.which >= c && n.which <= d && i._handleLetterKey(n.which)
            })
        },
        _handleUpDownKey: function(n) {
            var i = this.countryList.children(".highlight").first()
              , t = n == r ? i.prev() : i.next();
            t.length && (t.hasClass("divider") && (t = n == r ? t.prev() : t.next()),
            this._highlightListItem(t),
            this._scrollTo(t))
        },
        _handleEnterKey: function() {
            var n = this.countryList.children(".highlight").first();
            n.length && this._selectListItem(n)
        },
        _handleLetterKey: function(i) {
            var t = String.fromCharCode(i)
              , a = this.countryListItems.filter(function() {
                return n(this).text().charAt(0) == t && !n(this).hasClass("preferred")
            });
            if (a.length) {
                var e, s = a.filter(".highlight").first();
                e = s && s.next() && s.next().text().charAt(0) == t ? s.next() : a.first(),
                this._highlightListItem(e),
                this._scrollTo(e)
            }
        },
        _updateFlagFromInputVal: function() {
            var i = this
              , t = this.countryInput.val().replace(/(?=[() ])/g, "\\");
            if (t) {
                for (var a = [], e = new RegExp("^" + t,"i"), s = 0; s < this.countries.length; s++)
                    this.countries[s].name.match(e) && a.push(this.countries[s].iso2);
                var o = !1;
                return n.each(a, function(n, t) {
                    i.selectedFlagInner.hasClass(t) && (o = !0)
                }),
                o || (this._selectFlag(a[0]),
                this.countryCodeInput.val(a[0]).trigger("change")),
                !0
            }
            return !1
        },
        _highlightListItem: function(n) {
            this.countryListItems.removeClass("highlight"),
            n.addClass("highlight")
        },
        _getCountryData: function(n, i) {
            for (var t = i ? f : this.countries, a = 0; a < t.length; a++)
                if (t[a].iso2 == n)
                    return t[a];
            return null
        },
        _selectFlag: function(n) {
            if (!n)
                return !1;
            this.selectedFlagInner.attr("class", "flag " + n);
            var i = this._getCountryData(n);
            this.selectedFlagInner.parent().attr("title", i.name);
            var t = this.countryListItems.children(".flag." + n).first().parent();
            this.countryListItems.removeClass("active"),
            t.addClass("active")
        },
        _selectListItem: function(n) {
            var i = n.attr("data-country-code");
            this._selectFlag(i),
            this._closeDropdown(),
            this._updateName(i),
            this.countryInput.trigger("change"),
            this.countryCodeInput.trigger("change"),
            this._focus()
        },
        _closeDropdown: function() {
            this.countryList.addClass("hide"),
            this.selectedFlagInner.parent().children(".arrow").removeClass("up"),
            n(t).off("keydown" + this.ns),
            n("html").off("click" + this.ns),
            this.countryList.off(this.ns)
        },
        _scrollTo: function(n) {
            if (n && n.offset()) {
                var i = this.countryList
                  , t = i.height()
                  , a = i.offset().top
                  , e = a + t
                  , s = n.outerHeight()
                  , o = n.offset().top
                  , r = o + s
                  , u = o - a + i.scrollTop();
                if (o < a)
                    i.scrollTop(u);
                else if (r > e) {
                    var l = t - s;
                    i.scrollTop(u - l)
                }
            }
        },
        _updateName: function(n) {
            this.countryCodeInput.val(n).trigger("change"),
            this.countryInput.val(this._getCountryData(n).name)
        },
        handleAutoCountry: function() {
            "auto" === this.options.initialCountry && (this.defaultCountry = n.fn[e].autoCountry,
            this.countryInput.val() || this.selectCountry(this.defaultCountry),
            this.autoCountryDeferred.resolve())
        },
        getSelectedCountryData: function() {
            var n = this.selectedFlagInner.attr("class").split(" ")[1];
            return this._getCountryData(n)
        },
        selectCountry: function(n) {
            n = n.toLowerCase(),
            this.selectedFlagInner.hasClass(n) || (this._selectFlag(n),
            this._updateName(n))
        },
        setCountry: function(n) {
            this.countryInput.val(n),
            this._updateFlagFromInputVal()
        },
        destroy: function() {
            this.countryInput.off(this.ns),
            this.selectedFlagInner.parent().off(this.ns),
            this.countryInput.parent().before(this.countryInput).remove()
        }
    },
    n.fn[e] = function(i) {
        var t, s = arguments;
        return i === a || "object" == typeof i ? this.each(function() {
            n.data(this, "plugin_" + e) || n.data(this, "plugin_" + e, new y(this,i))
        }) : "string" == typeof i && "_" !== i[0] && "init" !== i ? (this.each(function() {
            var a = n.data(this, "plugin_" + e);
            a instanceof y && "function" == typeof a[i] && (t = a[i].apply(a, Array.prototype.slice.call(s, 1))),
            "destroy" === i && n.data(this, "plugin_" + e, null)
        }),
        t !== a ? t : this) : void 0
    }
    ,
    n.fn[e].getCountryData = function() {
        return f
    }
    ,
    n.fn[e].setCountryData = function(n) {
        f = n
    }
    ;
    var f = n.each([{
        n: "Afghanistan (‫افغانستان‬‎)",
        i: "af"
    }, {
        n: "Åland Islands (Åland)",
        i: "ax"
    }, {
        n: "Albania (Shqipëri)",
        i: "al"
    }, {
        n: "Algeria (‫الجزائر‬‎)",
        i: "dz"
    }, {
        n: "American Samoa",
        i: "as"
    }, {
        n: "Andorra",
        i: "ad"
    }, {
        n: "Angola",
        i: "ao"
    }, {
        n: "Anguilla",
        i: "ai"
    }, {
        n: "Antigua and Barbuda",
        i: "ag"
    }, {
        n: "Argentina",
        i: "ar"
    }, {
        n: "Armenia (Հայաստան)",
        i: "am"
    }, {
        n: "Aruba",
        i: "aw"
    }, {
        n: "Australia",
        i: "au"
    }, {
        n: "Austria (Österreich)",
        i: "at"
    }, {
        n: "Azerbaijan (Azərbaycan)",
        i: "az"
    }, {
        n: "Bahamas",
        i: "bs"
    }, {
        n: "Bahrain (‫البحرين‬‎)",
        i: "bh"
    }, {
        n: "Bangladesh (বাংলাদেশ)",
        i: "bd"
    }, {
        n: "Barbados",
        i: "bb"
    }, {
        n: "Belarus (Беларусь)",
        i: "by"
    }, {
        n: "Belgium (België)",
        i: "be"
    }, {
        n: "Belize",
        i: "bz"
    }, {
        n: "Benin (Bénin)",
        i: "bj"
    }, {
        n: "Bermuda",
        i: "bm"
    }, {
        n: "Bhutan (འབྲུག)",
        i: "bt"
    }, {
        n: "Bolivia",
        i: "bo"
    }, {
        n: "Bosnia and Herzegovina (Босна и Херцеговина)",
        i: "ba"
    }, {
        n: "Botswana",
        i: "bw"
    }, {
        n: "Brazil (Brasil)",
        i: "br"
    }, {
        n: "British Indian Ocean Territory",
        i: "io"
    }, {
        n: "British Virgin Islands",
        i: "vg"
    }, {
        n: "Brunei",
        i: "bn"
    }, {
        n: "Bulgaria (България)",
        i: "bg"
    }, {
        n: "Burkina Faso",
        i: "bf"
    }, {
        n: "Burundi (Uburundi)",
        i: "bi"
    }, {
        n: "Cambodia (កម្ពុជា)",
        i: "kh"
    }, {
        n: "Cameroon (Cameroun)",
        i: "cm"
    }, {
        n: "Canada",
        i: "ca"
    }, {
        n: "Cape Verde (Kabu Verdi)",
        i: "cv"
    }, {
        n: "Caribbean Netherlands",
        i: "bq"
    }, {
        n: "Cayman Islands",
        i: "ky"
    }, {
        n: "Central African Republic (République Centrafricaine)",
        i: "cf"
    }, {
        n: "Chad (Tchad)",
        i: "td"
    }, {
        n: "Chile",
        i: "cl"
    }, {
        n: "China (中国)",
        i: "cn"
    }, {
        n: "Christmas Island",
        i: "cx"
    }, {
        n: "Cocos (Keeling) Islands (Kepulauan Cocos (Keeling))",
        i: "cc"
    }, {
        n: "Colombia",
        i: "co"
    }, {
        n: "Comoros (‫جزر القمر‬‎)",
        i: "km"
    }, {
        n: "Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)",
        i: "cd"
    }, {
        n: "Congo (Republic) (Congo-Brazzaville)",
        i: "cg"
    }, {
        n: "Cook Islands",
        i: "ck"
    }, {
        n: "Costa Rica",
        i: "cr"
    }, {
        n: "Côte d’Ivoire",
        i: "ci"
    }, {
        n: "Croatia (Hrvatska)",
        i: "hr"
    }, {
        n: "Cuba",
        i: "cu"
    }, {
        n: "Curaçao",
        i: "cw"
    }, {
        n: "Cyprus (Κύπρος)",
        i: "cy"
    }, {
        n: "Czech Republic (Česká republika)",
        i: "cz"
    }, {
        n: "Denmark (Danmark)",
        i: "dk"
    }, {
        n: "Djibouti",
        i: "dj"
    }, {
        n: "Dominica",
        i: "dm"
    }, {
        n: "Dominican Republic (República Dominicana)",
        i: "do"
    }, {
        n: "Ecuador",
        i: "ec"
    }, {
        n: "Egypt (‫مصر‬‎)",
        i: "eg"
    }, {
        n: "El Salvador",
        i: "sv"
    }, {
        n: "Equatorial Guinea (Guinea Ecuatorial)",
        i: "gq"
    }, {
        n: "Eritrea",
        i: "er"
    }, {
        n: "Estonia (Eesti)",
        i: "ee"
    }, {
        n: "Ethiopia",
        i: "et"
    }, {
        n: "Falkland Islands (Islas Malvinas)",
        i: "fk"
    }, {
        n: "Faroe Islands (Føroyar)",
        i: "fo"
    }, {
        n: "Fiji",
        i: "fj"
    }, {
        n: "Finland (Suomi)",
        i: "fi"
    }, {
        n: "France",
        i: "fr"
    }, {
        n: "French Guiana (Guyane française)",
        i: "gf"
    }, {
        n: "French Polynesia (Polynésie française)",
        i: "pf"
    }, {
        n: "Gabon",
        i: "ga"
    }, {
        n: "Gambia",
        i: "gm"
    }, {
        n: "Georgia (საქართველო)",
        i: "ge"
    }, {
        n: "Germany (Deutschland)",
        i: "de"
    }, {
        n: "Ghana (Gaana)",
        i: "gh"
    }, {
        n: "Gibraltar",
        i: "gi"
    }, {
        n: "Greece (Ελλάδα)",
        i: "gr"
    }, {
        n: "Greenland (Kalaallit Nunaat)",
        i: "gl"
    }, {
        n: "Grenada",
        i: "gd"
    }, {
        n: "Guadeloupe",
        i: "gp"
    }, {
        n: "Guam",
        i: "gu"
    }, {
        n: "Guatemala",
        i: "gt"
    }, {
        n: "Guernsey",
        i: "gg"
    }, {
        n: "Guinea (Guinée)",
        i: "gn"
    }, {
        n: "Guinea-Bissau (Guiné Bissau)",
        i: "gw"
    }, {
        n: "Guyana",
        i: "gy"
    }, {
        n: "Haiti",
        i: "ht"
    }, {
        n: "Honduras",
        i: "hn"
    }, {
        n: "Hong Kong (香港)",
        i: "hk"
    }, {
        n: "Hungary (Magyarország)",
        i: "hu"
    }, {
        n: "Iceland (Ísland)",
        i: "is"
    }, {
        n: "India (भारत)",
        i: "in"
    }, {
        n: "Indonesia",
        i: "id"
    }, {
        n: "Iran (‫ایران‬‎)",
        i: "ir"
    }, {
        n: "Iraq (‫العراق‬‎)",
        i: "iq"
    }, {
        n: "Ireland",
        i: "ie"
    }, {
        n: "Isle of Man",
        i: "im"
    }, {
        n: "Israel (‫ישראל‬‎)",
        i: "il"
    }, {
        n: "Italy (Italia)",
        i: "it"
    }, {
        n: "Jamaica",
        i: "jm"
    }, {
        n: "Japan (日本)",
        i: "jp"
    }, {
        n: "Jersey",
        i: "je"
    }, {
        n: "Jordan (‫الأردن‬‎)",
        i: "jo"
    }, {
        n: "Kazakhstan (Казахстан)",
        i: "kz"
    }, {
        n: "Kenya",
        i: "ke"
    }, {
        n: "Kiribati",
        i: "ki"
    }, {
        n: "Kosovo (Kosovë)",
        i: "xk"
    }, {
        n: "Kuwait (‫الكويت‬‎)",
        i: "kw"
    }, {
        n: "Kyrgyzstan (Кыргызстан)",
        i: "kg"
    }, {
        n: "Laos (ລາວ)",
        i: "la"
    }, {
        n: "Latvia (Latvija)",
        i: "lv"
    }, {
        n: "Lebanon (‫لبنان‬‎)",
        i: "lb"
    }, {
        n: "Lesotho",
        i: "ls"
    }, {
        n: "Liberia",
        i: "lr"
    }, {
        n: "Libya (‫ليبيا‬‎)",
        i: "ly"
    }, {
        n: "Liechtenstein",
        i: "li"
    }, {
        n: "Lithuania (Lietuva)",
        i: "lt"
    }, {
        n: "Luxembourg",
        i: "lu"
    }, {
        n: "Macau (澳門)",
        i: "mo"
    }, {
        n: "Macedonia (FYROM) (Македонија)",
        i: "mk"
    }, {
        n: "Madagascar (Madagasikara)",
        i: "mg"
    }, {
        n: "Malawi",
        i: "mw"
    }, {
        n: "Malaysia",
        i: "my"
    }, {
        n: "Maldives",
        i: "mv"
    }, {
        n: "Mali",
        i: "ml"
    }, {
        n: "Malta",
        i: "mt"
    }, {
        n: "Marshall Islands",
        i: "mh"
    }, {
        n: "Martinique",
        i: "mq"
    }, {
        n: "Mauritania (‫موريتانيا‬‎)",
        i: "mr"
    }, {
        n: "Mauritius (Moris)",
        i: "mu"
    }, {
        n: "Mayotte",
        i: "yt"
    }, {
        n: "Mexico (México)",
        i: "mx"
    }, {
        n: "Micronesia",
        i: "fm"
    }, {
        n: "Moldova (Republica Moldova)",
        i: "md"
    }, {
        n: "Monaco",
        i: "mc"
    }, {
        n: "Mongolia (Монгол)",
        i: "mn"
    }, {
        n: "Montenegro (Crna Gora)",
        i: "me"
    }, {
        n: "Montserrat",
        i: "ms"
    }, {
        n: "Morocco (‫المغرب‬‎)",
        i: "ma"
    }, {
        n: "Mozambique (Moçambique)",
        i: "mz"
    }, {
        n: "Myanmar (Burma) (မြန်မာ)",
        i: "mm"
    }, {
        n: "Namibia (Namibië)",
        i: "na"
    }, {
        n: "Nauru",
        i: "nr"
    }, {
        n: "Nepal (नेपाल)",
        i: "np"
    }, {
        n: "Netherlands (Nederland)",
        i: "nl"
    }, {
        n: "New Caledonia (Nouvelle-Calédonie)",
        i: "nc"
    }, {
        n: "New Zealand",
        i: "nz"
    }, {
        n: "Nicaragua",
        i: "ni"
    }, {
        n: "Niger (Nijar)",
        i: "ne"
    }, {
        n: "Nigeria",
        i: "ng"
    }, {
        n: "Niue",
        i: "nu"
    }, {
        n: "Norfolk Island",
        i: "nf"
    }, {
        n: "North Korea (조선 민주주의 인민 공화국)",
        i: "kp"
    }, {
        n: "Northern Mariana Islands",
        i: "mp"
    }, {
        n: "Norway (Norge)",
        i: "no"
    }, {
        n: "Oman (‫عُمان‬‎)",
        i: "om"
    }, {
        n: "Pakistan (‫پاکستان‬‎)",
        i: "pk"
    }, {
        n: "Palau",
        i: "pw"
    }, {
        n: "Palestine (‫فلسطين‬‎)",
        i: "ps"
    }, {
        n: "Panama (Panamá)",
        i: "pa"
    }, {
        n: "Papua New Guinea",
        i: "pg"
    }, {
        n: "Paraguay",
        i: "py"
    }, {
        n: "Peru (Perú)",
        i: "pe"
    }, {
        n: "Philippines",
        i: "ph"
    }, {
        n: "Pitcairn Islands",
        i: "pn"
    }, {
        n: "Poland (Polska)",
        i: "pl"
    }, {
        n: "Portugal",
        i: "pt"
    }, {
        n: "Puerto Rico",
        i: "pr"
    }, {
        n: "Qatar (‫قطر‬‎)",
        i: "qa"
    }, {
        n: "Réunion (La Réunion)",
        i: "re"
    }, {
        n: "Romania (România)",
        i: "ro"
    }, {
        n: "Russia (Россия)",
        i: "ru"
    }, {
        n: "Rwanda",
        i: "rw"
    }, {
        n: "Saint Barthélemy (Saint-Barthélemy)",
        i: "bl"
    }, {
        n: "Saint Helena",
        i: "sh"
    }, {
        n: "Saint Kitts and Nevis",
        i: "kn"
    }, {
        n: "Saint Lucia",
        i: "lc"
    }, {
        n: "Saint Martin (Saint-Martin (partie française))",
        i: "mf"
    }, {
        n: "Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)",
        i: "pm"
    }, {
        n: "Saint Vincent and the Grenadines",
        i: "vc"
    }, {
        n: "Samoa",
        i: "ws"
    }, {
        n: "San Marino",
        i: "sm"
    }, {
        n: "São Tomé and Príncipe (São Tomé e Príncipe)",
        i: "st"
    }, {
        n: "Saudi Arabia (‫المملكة العربية السعودية‬‎)",
        i: "sa"
    }, {
        n: "Senegal (Sénégal)",
        i: "sn"
    }, {
        n: "Serbia (Србија)",
        i: "rs"
    }, {
        n: "Seychelles",
        i: "sc"
    }, {
        n: "Sierra Leone",
        i: "sl"
    }, {
        n: "Singapore",
        i: "sg"
    }, {
        n: "Sint Maarten",
        i: "sx"
    }, {
        n: "Slovakia (Slovensko)",
        i: "sk"
    }, {
        n: "Slovenia (Slovenija)",
        i: "si"
    }, {
        n: "Solomon Islands",
        i: "sb"
    }, {
        n: "Somalia (Soomaaliya)",
        i: "so"
    }, {
        n: "South Africa",
        i: "za"
    }, {
        n: "South Georgia & South Sandwich Islands",
        i: "gs"
    }, {
        n: "South Korea (대한민국)",
        i: "kr"
    }, {
        n: "South Sudan (‫جنوب السودان‬‎)",
        i: "ss"
    }, {
        n: "Spain (España)",
        i: "es"
    }, {
        n: "Sri Lanka (ශ්‍රී ලංකාව)",
        i: "lk"
    }, {
        n: "Sudan (‫السودان‬‎)",
        i: "sd"
    }, {
        n: "Suriname",
        i: "sr"
    }, {
        n: "Svalbard and Jan Mayen (Svalbard og Jan Mayen)",
        i: "sj"
    }, {
        n: "Swaziland",
        i: "sz"
    }, {
        n: "Sweden (Sverige)",
        i: "se"
    }, {
        n: "Switzerland (Schweiz)",
        i: "ch"
    }, {
        n: "Syria (‫سوريا‬‎)",
        i: "sy"
    }, {
        n: "Taiwan (台灣)",
        i: "tw"
    }, {
        n: "Tajikistan",
        i: "tj"
    }, {
        n: "Tanzania",
        i: "tz"
    }, {
        n: "Thailand (ไทย)",
        i: "th"
    }, {
        n: "Timor-Leste",
        i: "tl"
    }, {
        n: "Togo",
        i: "tg"
    }, {
        n: "Tokelau",
        i: "tk"
    }, {
        n: "Tonga",
        i: "to"
    }, {
        n: "Trinidad and Tobago",
        i: "tt"
    }, {
        n: "Tunisia (‫تونس‬‎)",
        i: "tn"
    }, {
        n: "Turkey (Türkiye)",
        i: "tr"
    }, {
        n: "Turkmenistan",
        i: "tm"
    }, {
        n: "Turks and Caicos Islands",
        i: "tc"
    }, {
        n: "Tuvalu",
        i: "tv"
    }, {
        n: "Uganda",
        i: "ug"
    }, {
        n: "Ukraine (Україна)",
        i: "ua"
    }, {
        n: "United Arab Emirates (‫الإمارات العربية المتحدة‬‎)",
        i: "ae"
    }, {
        n: "United Kingdom",
        i: "gb"
    }, {
        n: "United States",
        i: "us"
    }, {
        n: "U.S. Minor Outlying Islands",
        i: "um"
    }, {
        n: "U.S. Virgin Islands",
        i: "vi"
    }, {
        n: "Uruguay",
        i: "uy"
    }, {
        n: "Uzbekistan (Oʻzbekiston)",
        i: "uz"
    }, {
        n: "Vanuatu",
        i: "vu"
    }, {
        n: "Vatican City (Città del Vaticano)",
        i: "va"
    }, {
        n: "Venezuela",
        i: "ve"
    }, {
        n: "Vietnam (Việt Nam)",
        i: "vn"
    }, {
        n: "Wallis and Futuna",
        i: "wf"
    }, {
        n: "Western Sahara (‫الصحراء الغربية‬‎)",
        i: "eh"
    }, {
        n: "Yemen (‫اليمن‬‎)",
        i: "ye"
    }, {
        n: "Zambia",
        i: "zm"
    }, {
        n: "Zimbabwe",
        i: "zw"
    }], function(n, i) {
        i.name = i.n,
        i.iso2 = i.i,
        delete i.n,
        delete i.i
    })
});
;;!function(factory) {
    "function" == typeof define && define.amd ? define(["jquery"], factory) : factory("object" == typeof exports ? require("jquery") : jQuery);
}(function($) {
    var caretTimeoutId, ua = navigator.userAgent, iPhone = /iphone/i.test(ua), chrome = /chrome/i.test(ua), android = /android/i.test(ua);
    $.mask = {
        definitions: {
            "_": "[0-9]",
        },
        autoclear: !0,
        dataName: "mask",
        placeholder: "_"
    },
    $.fn.extend({
        caret: function(begin, end) {
            var range;
            if (0 !== this.length && !this.is(":hidden"))
                return "number" == typeof begin ? (end = "number" == typeof end ? end : begin,
                this.each(function() {
                    this.setSelectionRange ? this.setSelectionRange(begin, end) : this.createTextRange && (range = this.createTextRange(),
                    range.collapse(!0),
                    range.moveEnd("character", end),
                    range.moveStart("character", begin),
                    range.select());
                })) : (this[0].setSelectionRange ? (begin = this[0].selectionStart,
                end = this[0].selectionEnd) : document.selection && document.selection.createRange && (range = document.selection.createRange(),
                begin = 0 - range.duplicate().moveStart("character", -1e5),
                end = begin + range.text.length),
                {
                    begin: begin,
                    end: end
                });
        },
        unmask: function() {
            return this.trigger("unmask");
        },
        mask: function(mask, settings) {
            var input, defs, tests, partialPosition, firstNonMaskPos, lastRequiredNonMaskPos, len, oldVal;
            if (!mask && this.length > 0) {
                input = $(this[0]);
                var fn = input.data($.mask.dataName);
                return fn ? fn() : void 0;
            }
            return settings = $.extend({
                autoclear: $.mask.autoclear,
                placeholder: $.mask.placeholder,
                completed: null
            }, settings),
            defs = $.mask.definitions,
            tests = [],
            partialPosition = len = mask.length,
            firstNonMaskPos = null,
            $.each(mask.split(""), function(i, c) {
                "?" == c ? (len--,
                partialPosition = i) : defs[c] ? (tests.push(new RegExp(defs[c])),
                null === firstNonMaskPos && (firstNonMaskPos = tests.length - 1),
                partialPosition > i && (lastRequiredNonMaskPos = tests.length - 1)) : tests.push(null);
            }),
            this.trigger("unmask").each(function() {
                function tryFireCompleted() {
                    if (settings.completed) {
                        for (var i = firstNonMaskPos; lastRequiredNonMaskPos >= i; i++)
                            if (tests[i] && buffer[i] === getPlaceholder(i))
                                return;
                        settings.completed.call(input);
                    }
                }
                function getPlaceholder(i) {
                    return settings.placeholder.charAt(i < settings.placeholder.length ? i : 0);
                }
                function seekNext(pos) {
                    for (; ++pos < len && !tests[pos]; )
                        ;
                    return pos;
                }
                function seekPrev(pos) {
                    for (; --pos >= 0 && !tests[pos]; )
                        ;
                    return pos;
                }
                function shiftL(begin, end) {
                    var i, j;
                    if (!(0 > begin)) {
                        for (i = begin,
                        j = seekNext(end); len > i; i++)
                            if (tests[i]) {
                                if (!(len > j && tests[i].test(buffer[j])))
                                    break;
                                buffer[i] = buffer[j],
                                buffer[j] = getPlaceholder(j),
                                j = seekNext(j);
                            }
                        writeBuffer(),
                        input.caret(Math.max(firstNonMaskPos, begin));
                    }
                }
                function shiftR(pos) {
                    var i, c, j, t;
                    for (i = pos,
                    c = getPlaceholder(pos); len > i; i++)
                        if (tests[i]) {
                            if (j = seekNext(i),
                            t = buffer[i],
                            buffer[i] = c,
                            !(len > j && tests[j].test(t)))
                                break;
                            c = t;
                        }
                }
                function androidInputEvent() {
                    var curVal = input.val()
                      , pos = input.caret();
                    if (oldVal && oldVal.length && oldVal.length > curVal.length) {
                        for (checkVal(!0); pos.begin > 0 && !tests[pos.begin - 1]; )
                            pos.begin--;
                        if (0 === pos.begin)
                            for (; pos.begin < firstNonMaskPos && !tests[pos.begin]; )
                                pos.begin++;
                        input.caret(pos.begin, pos.begin);
                    } else {
                        for (checkVal(!0); pos.begin < len && !tests[pos.begin]; )
                            pos.begin++;
                        input.caret(pos.begin, pos.begin);
                    }
                    tryFireCompleted();
                }
                function blurEvent() {
                    checkVal(),
                    input.val() != focusText && input.change();
                }
                function keydownEvent(e) {
                    if (!input.prop("readonly")) {
                        var pos, begin, end, k = e.which || e.keyCode;
                        oldVal = input.val(),
                        8 === k || 46 === k || iPhone && 127 === k ? (pos = input.caret(),
                        begin = pos.begin,
                        end = pos.end,
                        end - begin === 0 && (begin = 46 !== k ? seekPrev(begin) : end = seekNext(begin - 1),
                        end = 46 === k ? seekNext(end) : end),
                        clearBuffer(begin, end),
                        shiftL(begin, end - 1),
                        e.preventDefault()) : 13 === k ? blurEvent.call(this, e) : 27 === k && (input.val(focusText),
                        input.caret(0, checkVal()),
                        e.preventDefault());
                    }
                }
                function keypressEvent(e) {
                    if (!input.prop("readonly")) {
                        var p, c, next, k = e.which || e.keyCode, pos = input.caret();
                        if (!(e.ctrlKey || e.altKey || e.metaKey || 32 > k) && k && 13 !== k) {
                            if (pos.end - pos.begin !== 0 && (clearBuffer(pos.begin, pos.end),
                            shiftL(pos.begin, pos.end - 1)),
                            p = seekNext(pos.begin - 1),
                            len > p && (c = String.fromCharCode(k),
                            tests[p].test(c))) {
                                if (shiftR(p),
                                buffer[p] = c,
                                writeBuffer(),
                                next = seekNext(p),
                                android) {
                                    var proxy = function() {
                                        $.proxy($.fn.caret, input, next)();
                                    };
                                    setTimeout(proxy, 0);
                                } else
                                    input.caret(next);
                                pos.begin <= lastRequiredNonMaskPos && tryFireCompleted();
                            }
                            e.preventDefault();
                        }
                    }
                }
                function clearBuffer(start, end) {
                    var i;
                    for (i = start; end > i && len > i; i++)
                        tests[i] && (buffer[i] = getPlaceholder(i));
                }
                function writeBuffer() {
                    input.val(buffer.join(""));
                }
                function checkVal(allow) {
                    var i, c, pos, test = input.val(), lastMatch = -1;
                    for (i = 0,
                    pos = 0; len > i; i++)
                        if (tests[i]) {
                            for (buffer[i] = getPlaceholder(i); pos++ < test.length; )
                                if (c = test.charAt(pos - 1),
                                tests[i].test(c)) {
                                    buffer[i] = c,
                                    lastMatch = i;
                                    break;
                                }
                            if (pos > test.length) {
                                clearBuffer(i + 1, len);
                                break;
                            }
                        } else
                            buffer[i] === test.charAt(pos) && pos++,
                            partialPosition > i && (lastMatch = i);
                    return allow ? writeBuffer() : partialPosition > lastMatch + 1 ? settings.autoclear || buffer.join("") === defaultBuffer ? (input.val() && input.val(""),
                    clearBuffer(0, len)) : writeBuffer() : (writeBuffer(),
                    input.val(input.val().substring(0, lastMatch + 1))),
                    partialPosition ? i : firstNonMaskPos;
                }
                var input = $(this)
                  , buffer = $.map(mask.split(""), function(c, i) {
                    return "?" != c ? defs[c] ? getPlaceholder(i) : c : void 0;
                })
                  , defaultBuffer = buffer.join("")
                  , focusText = input.val();
                input.data($.mask.dataName, function() {
                    return $.map(buffer, function(c, i) {
                        return tests[i] && c != getPlaceholder(i) ? c : null;
                    }).join("");
                }),
                input.one("unmask", function() {
                    input.off(".mask").removeData($.mask.dataName);
                }).on("focus.mask", function() {
                    if (!input.prop("readonly")) {
                        clearTimeout(caretTimeoutId);
                        var pos;
                        focusText = input.val(),
                        pos = checkVal(),
                        caretTimeoutId = setTimeout(function() {
                            input.get(0) === document.activeElement && (writeBuffer(),
                            pos == mask.replace("?", "").length ? input.caret(0, pos) : input.caret(pos));
                        }, 10);
                    }
                }).on("blur.mask", blurEvent).on("keydown.mask", keydownEvent).on("keypress.mask", keypressEvent).on("input.mask paste.mask", function() {
                    input.prop("readonly") || setTimeout(function() {
                        var pos = checkVal(!0);
                        input.caret(pos),
                        tryFireCompleted();
                    }, 0);
                }),
                chrome && android && input.off("input.mask").on("input.mask", androidInputEvent),
                checkVal();
            });
        }
    });
    $(document).ready(function() {
        var $fields = $('.wpcf7-mask');
        if (!$fields.length) {
            return false;
        }
        $fields.each(function() {
            var $this = $(this)
              , mask = $this.data('mask');
            if (!mask) {
                return;
            }
            $this.mask(mask, {
                'autoclear': getOption($this.data('autoclear')),
            });
            if ('tel' != $this.attr('type') && -1 == mask.indexOf('.')) {
                $this.attr({
                    'inputmode': 'numeric',
                });
            }
        });
    });
    function getOption(valule) {
        if (typeof valule == 'undefined') {
            return 0;
        }
        return valule;
    }
});
;;/*!
 * current-device v0.8.2 - https://github.com/matthewhudson/current-device
 * MIT Licensed
 */
!function(n, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.device = e() : n.device = e()
}(window, function() {
    return function(n) {
        var e = {};
        function o(t) {
            if (e[t])
                return e[t].exports;
            var r = e[t] = {
                i: t,
                l: !1,
                exports: {}
            };
            return n[t].call(r.exports, r, r.exports, o),
            r.l = !0,
            r.exports
        }
        return o.m = n,
        o.c = e,
        o.d = function(n, e, t) {
            o.o(n, e) || Object.defineProperty(n, e, {
                enumerable: !0,
                get: t
            })
        }
        ,
        o.r = function(n) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(n, Symbol.toStringTag, {
                value: "Module"
            }),
            Object.defineProperty(n, "__esModule", {
                value: !0
            })
        }
        ,
        o.t = function(n, e) {
            if (1 & e && (n = o(n)),
            8 & e)
                return n;
            if (4 & e && "object" == typeof n && n && n.__esModule)
                return n;
            var t = Object.create(null);
            if (o.r(t),
            Object.defineProperty(t, "default", {
                enumerable: !0,
                value: n
            }),
            2 & e && "string" != typeof n)
                for (var r in n)
                    o.d(t, r, function(e) {
                        return n[e]
                    }
                    .bind(null, r));
            return t
        }
        ,
        o.n = function(n) {
            var e = n && n.__esModule ? function() {
                return n.default
            }
            : function() {
                return n
            }
            ;
            return o.d(e, "a", e),
            e
        }
        ,
        o.o = function(n, e) {
            return Object.prototype.hasOwnProperty.call(n, e)
        }
        ,
        o.p = "",
        o(o.s = 0)
    }([function(n, e, o) {
        n.exports = o(1)
    }
    , function(n, e, o) {
        "use strict";
        o.r(e);
        var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(n) {
            return typeof n
        }
        : function(n) {
            return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n
        }
          , r = window.device
          , i = {}
          , a = [];
        window.device = i;
        var c = window.document.documentElement
          , d = window.navigator.userAgent.toLowerCase()
          , u = ["googletv", "viera", "smarttv", "internet.tv", "netcast", "nettv", "appletv", "boxee", "kylo", "roku", "dlnadoc", "pov_tv", "hbbtv", "ce-html"];
        function l(n, e) {
            return -1 !== n.indexOf(e)
        }
        function s(n) {
            return l(d, n)
        }
        function f(n) {
            return c.className.match(new RegExp(n,"i"))
        }
        function b(n) {
            var e = null;
            f(n) || (e = c.className.replace(/^\s+|\s+$/g, ""),
            c.className = e + " " + n)
        }
        function p(n) {
            f(n) && (c.className = c.className.replace(" " + n, ""))
        }
        function w() {
            i.landscape() ? (p("portrait"),
            b("landscape"),
            m("landscape")) : (p("landscape"),
            b("portrait"),
            m("portrait")),
            h()
        }
        function m(n) {
            for (var e in a)
                a[e](n)
        }
        i.macos = function() {
            return s("mac")
        }
        ,
        i.ios = function() {
            return i.iphone() || i.ipod() || i.ipad()
        }
        ,
        i.iphone = function() {
            return !i.windows() && s("iphone")
        }
        ,
        i.ipod = function() {
            return s("ipod")
        }
        ,
        i.ipad = function() {
            return s("ipad")
        }
        ,
        i.android = function() {
            return !i.windows() && s("android")
        }
        ,
        i.androidPhone = function() {
            return i.android() && s("mobile")
        }
        ,
        i.androidTablet = function() {
            return i.android() && !s("mobile")
        }
        ,
        i.blackberry = function() {
            return s("blackberry") || s("bb10") || s("rim")
        }
        ,
        i.blackberryPhone = function() {
            return i.blackberry() && !s("tablet")
        }
        ,
        i.blackberryTablet = function() {
            return i.blackberry() && s("tablet")
        }
        ,
        i.windows = function() {
            return s("windows")
        }
        ,
        i.windowsPhone = function() {
            return i.windows() && s("phone")
        }
        ,
        i.windowsTablet = function() {
            return i.windows() && s("touch") && !i.windowsPhone()
        }
        ,
        i.fxos = function() {
            return (s("(mobile") || s("(tablet")) && s(" rv:")
        }
        ,
        i.fxosPhone = function() {
            return i.fxos() && s("mobile")
        }
        ,
        i.fxosTablet = function() {
            return i.fxos() && s("tablet")
        }
        ,
        i.meego = function() {
            return s("meego")
        }
        ,
        i.cordova = function() {
            return window.cordova && "file:" === location.protocol
        }
        ,
        i.nodeWebkit = function() {
            return "object" === t(window.process)
        }
        ,
        i.mobile = function() {
            return i.androidPhone() || i.iphone() || i.ipod() || i.windowsPhone() || i.blackberryPhone() || i.fxosPhone() || i.meego()
        }
        ,
        i.tablet = function() {
            return i.ipad() || i.androidTablet() || i.blackberryTablet() || i.windowsTablet() || i.fxosTablet()
        }
        ,
        i.desktop = function() {
            return !i.tablet() && !i.mobile()
        }
        ,
        i.television = function() {
            for (var n = 0; n < u.length; ) {
                if (s(u[n]))
                    return !0;
                n++
            }
            return !1
        }
        ,
        i.portrait = function() {
            return screen.orientation && Object.prototype.hasOwnProperty.call(window, "onorientationchange") ? l(screen.orientation.type, "portrait") : window.innerHeight / window.innerWidth > 1
        }
        ,
        i.landscape = function() {
            return screen.orientation && Object.prototype.hasOwnProperty.call(window, "onorientationchange") ? l(screen.orientation.type, "landscape") : window.innerHeight / window.innerWidth < 1
        }
        ,
        i.noConflict = function() {
            return window.device = r,
            this
        }
        ,
        i.ios() ? i.ipad() ? b("ios ipad tablet") : i.iphone() ? b("ios iphone mobile") : i.ipod() && b("ios ipod mobile") : i.macos() ? b("macos desktop") : i.android() ? i.androidTablet() ? b("android tablet") : b("android mobile") : i.blackberry() ? i.blackberryTablet() ? b("blackberry tablet") : b("blackberry mobile") : i.windows() ? i.windowsTablet() ? b("windows tablet") : i.windowsPhone() ? b("windows mobile") : b("windows desktop") : i.fxos() ? i.fxosTablet() ? b("fxos tablet") : b("fxos mobile") : i.meego() ? b("meego mobile") : i.nodeWebkit() ? b("node-webkit") : i.television() ? b("television") : i.desktop() && b("desktop"),
        i.cordova() && b("cordova"),
        i.onChangeOrientation = function(n) {
            "function" == typeof n && a.push(n)
        }
        ;
        var y = "resize";
        function v(n) {
            for (var e = 0; e < n.length; e++)
                if (i[n[e]]())
                    return n[e];
            return "unknown"
        }
        function h() {
            i.orientation = v(["portrait", "landscape"])
        }
        Object.prototype.hasOwnProperty.call(window, "onorientationchange") && (y = "orientationchange"),
        window.addEventListener ? window.addEventListener(y, w, !1) : window.attachEvent ? window.attachEvent(y, w) : window[y] = w,
        w(),
        i.type = v(["mobile", "tablet", "desktop"]),
        i.os = v(["ios", "iphone", "ipad", "ipod", "android", "blackberry", "macos", "windows", "fxos", "meego", "television"]),
        h(),
        e.default = i
    }
    ]).default
});
;;!function(a, b, c, d) {
    function e(b, c) {
        this.settings = null,
        this.options = a.extend({}, e.Defaults, c),
        this.$element = a(b),
        this._handlers = {},
        this._plugins = {},
        this._supress = {},
        this._current = null,
        this._speed = null,
        this._coordinates = [],
        this._breakpoint = null,
        this._width = null,
        this._items = [],
        this._clones = [],
        this._mergers = [],
        this._widths = [],
        this._invalidated = {},
        this._pipe = [],
        this._drag = {
            time: null,
            target: null,
            pointer: null,
            stage: {
                start: null,
                current: null
            },
            direction: null
        },
        this._states = {
            current: {},
            tags: {
                initializing: ["busy"],
                animating: ["busy"],
                dragging: ["interacting"]
            }
        },
        a.each(["onResize", "onThrottledResize"], a.proxy(function(b, c) {
            this._handlers[c] = a.proxy(this[c], this)
        }, this)),
        a.each(e.Plugins, a.proxy(function(a, b) {
            this._plugins[a.charAt(0).toLowerCase() + a.slice(1)] = new b(this)
        }, this)),
        a.each(e.Workers, a.proxy(function(b, c) {
            this._pipe.push({
                filter: c.filter,
                run: a.proxy(c.run, this)
            })
        }, this)),
        this.setup(),
        this.initialize()
    }
    e.Defaults = {
        items: 3,
        loop: !1,
        center: !1,
        rewind: !1,
        checkVisibility: !0,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: b,
        fallbackEasing: "swing",
        slideTransition: "",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        refreshClass: "owl-refresh",
        loadedClass: "owl-loaded",
        loadingClass: "owl-loading",
        rtlClass: "owl-rtl",
        responsiveClass: "owl-responsive",
        dragClass: "owl-drag",
        itemClass: "owl-item",
        stageClass: "owl-stage",
        stageOuterClass: "owl-stage-outer",
        grabClass: "owl-grab"
    },
    e.Width = {
        Default: "default",
        Inner: "inner",
        Outer: "outer"
    },
    e.Type = {
        Event: "event",
        State: "state"
    },
    e.Plugins = {},
    e.Workers = [{
        filter: ["width", "settings"],
        run: function() {
            this._width = this.$element.width()
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            a.current = this._items && this._items[this.relative(this._current)]
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            this.$stage.children(".cloned").remove()
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            var b = this.settings.margin || ""
              , c = !this.settings.autoWidth
              , d = this.settings.rtl
              , e = {
                width: "auto",
                "margin-left": d ? b : "",
                "margin-right": d ? "" : b
            };
            !c && this.$stage.children().css(e),
            a.css = e
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            var b = (this.width() / this.settings.items).toFixed(3) - this.settings.margin
              , c = null
              , d = this._items.length
              , e = !this.settings.autoWidth
              , f = [];
            for (a.items = {
                merge: !1,
                width: b
            }; d--; )
                c = this._mergers[d],
                c = this.settings.mergeFit && Math.min(c, this.settings.items) || c,
                a.items.merge = c > 1 || a.items.merge,
                f[d] = e ? b * c : this._items[d].width();
            this._widths = f
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            var b = []
              , c = this._items
              , d = this.settings
              , e = Math.max(2 * d.items, 4)
              , f = 2 * Math.ceil(c.length / 2)
              , g = d.loop && c.length ? d.rewind ? e : Math.max(e, f) : 0
              , h = ""
              , i = "";
            for (g /= 2; g > 0; )
                b.push(this.normalize(b.length / 2, !0)),
                h += c[b[b.length - 1]][0].outerHTML,
                b.push(this.normalize(c.length - 1 - (b.length - 1) / 2, !0)),
                i = c[b[b.length - 1]][0].outerHTML + i,
                g -= 1;
            this._clones = b,
            a(h).addClass("cloned").appendTo(this.$stage),
            a(i).addClass("cloned").prependTo(this.$stage)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            for (var a = this.settings.rtl ? 1 : -1, b = this._clones.length + this._items.length, c = -1, d = 0, e = 0, f = []; ++c < b; )
                d = f[c - 1] || 0,
                e = this._widths[this.relative(c)] + this.settings.margin,
                f.push(d + e * a);
            this._coordinates = f
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            var a = this.settings.stagePadding
              , b = this._coordinates
              , c = {
                width: Math.ceil(Math.abs(b[b.length - 1])) + 2 * a,
                "padding-left": a || "",
                "padding-right": a || ""
            };
            this.$stage.css(c)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            var b = this._coordinates.length
              , c = !this.settings.autoWidth
              , d = this.$stage.children();
            if (c && a.items.merge)
                for (; b--; )
                    a.css.width = this._widths[this.relative(b)],
                    d.eq(b).css(a.css);
            else
                c && (a.css.width = a.items.width,
                d.css(a.css))
        }
    }, {
        filter: ["items"],
        run: function() {
            this._coordinates.length < 1 && this.$stage.removeAttr("style")
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            a.current = a.current ? this.$stage.children().index(a.current) : 0,
            a.current = Math.max(this.minimum(), Math.min(this.maximum(), a.current)),
            this.reset(a.current)
        }
    }, {
        filter: ["position"],
        run: function() {
            this.animate(this.coordinates(this._current))
        }
    }, {
        filter: ["width", "position", "items", "settings"],
        run: function() {
            var a, b, c, d, e = this.settings.rtl ? 1 : -1, f = 2 * this.settings.stagePadding, g = this.coordinates(this.current()) + f, h = g + this.width() * e, i = [];
            for (c = 0,
            d = this._coordinates.length; c < d; c++)
                a = this._coordinates[c - 1] || 0,
                b = Math.abs(this._coordinates[c]) + f * e,
                (this.op(a, "<=", g) && this.op(a, ">", h) || this.op(b, "<", g) && this.op(b, ">", h)) && i.push(c);
            this.$stage.children(".active").removeClass("active"),
            this.$stage.children(":eq(" + i.join("), :eq(") + ")").addClass("active"),
            this.$stage.children(".center").removeClass("center"),
            this.settings.center && this.$stage.children().eq(this.current()).addClass("center")
        }
    }],
    e.prototype.initializeStage = function() {
        this.$stage = this.$element.find("." + this.settings.stageClass),
        this.$stage.length || (this.$element.addClass(this.options.loadingClass),
        this.$stage = a("<" + this.settings.stageElement + ">", {
            class: this.settings.stageClass
        }).wrap(a("<div/>", {
            class: this.settings.stageOuterClass
        })),
        this.$element.append(this.$stage.parent()))
    }
    ,
    e.prototype.initializeItems = function() {
        var b = this.$element.find(".owl-item");
        if (b.length)
            return this._items = b.get().map(function(b) {
                return a(b)
            }),
            this._mergers = this._items.map(function() {
                return 1
            }),
            void this.refresh();
        this.replace(this.$element.children().not(this.$stage.parent())),
        this.isVisible() ? this.refresh() : this.invalidate("width"),
        this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass)
    }
    ,
    e.prototype.initialize = function() {
        if (this.enter("initializing"),
        this.trigger("initialize"),
        this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl),
        this.settings.autoWidth && !this.is("pre-loading")) {
            var a, b, c;
            a = this.$element.find("img"),
            b = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : d,
            c = this.$element.children(b).width(),
            a.length && c <= 0 && this.preloadAutoWidthImages(a)
        }
        this.initializeStage(),
        this.initializeItems(),
        this.registerEventHandlers(),
        this.leave("initializing"),
        this.trigger("initialized")
    }
    ,
    e.prototype.isVisible = function() {
        return !this.settings.checkVisibility || this.$element.is(":visible")
    }
    ,
    e.prototype.setup = function() {
        var b = this.viewport()
          , c = this.options.responsive
          , d = -1
          , e = null;
        c ? (a.each(c, function(a) {
            a <= b && a > d && (d = Number(a))
        }),
        e = a.extend({}, this.options, c[d]),
        "function" == typeof e.stagePadding && (e.stagePadding = e.stagePadding()),
        delete e.responsive,
        e.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s","g"), "$1" + d))) : e = a.extend({}, this.options),
        this.trigger("change", {
            property: {
                name: "settings",
                value: e
            }
        }),
        this._breakpoint = d,
        this.settings = e,
        this.invalidate("settings"),
        this.trigger("changed", {
            property: {
                name: "settings",
                value: this.settings
            }
        })
    }
    ,
    e.prototype.optionsLogic = function() {
        this.settings.autoWidth && (this.settings.stagePadding = !1,
        this.settings.merge = !1)
    }
    ,
    e.prototype.prepare = function(b) {
        var c = this.trigger("prepare", {
            content: b
        });
        return c.data || (c.data = a("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(b)),
        this.trigger("prepared", {
            content: c.data
        }),
        c.data
    }
    ,
    e.prototype.update = function() {
        for (var b = 0, c = this._pipe.length, d = a.proxy(function(a) {
            return this[a]
        }, this._invalidated), e = {}; b < c; )
            (this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) && this._pipe[b].run(e),
            b++;
        this._invalidated = {},
        !this.is("valid") && this.enter("valid")
    }
    ,
    e.prototype.width = function(a) {
        switch (a = a || e.Width.Default) {
        case e.Width.Inner:
        case e.Width.Outer:
            return this._width;
        default:
            return this._width - 2 * this.settings.stagePadding + this.settings.margin
        }
    }
    ,
    e.prototype.refresh = function() {
        this.enter("refreshing"),
        this.trigger("refresh"),
        this.setup(),
        this.optionsLogic(),
        this.$element.addClass(this.options.refreshClass),
        this.update(),
        this.$element.removeClass(this.options.refreshClass),
        this.leave("refreshing"),
        this.trigger("refreshed")
    }
    ,
    e.prototype.onThrottledResize = function() {
        b.clearTimeout(this.resizeTimer),
        this.resizeTimer = b.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate)
    }
    ,
    e.prototype.onResize = function() {
        return !!this._items.length && (this._width !== this.$element.width() && (!!this.isVisible() && (this.enter("resizing"),
        this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"),
        !1) : (this.invalidate("width"),
        this.refresh(),
        this.leave("resizing"),
        void this.trigger("resized")))))
    }
    ,
    e.prototype.registerEventHandlers = function() {
        a.support.transition && this.$stage.on(a.support.transition.end + ".owl.core", a.proxy(this.onTransitionEnd, this)),
        !1 !== this.settings.responsive && this.on(b, "resize", this._handlers.onThrottledResize),
        this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass),
        this.$stage.on("mousedown.owl.core", a.proxy(this.onDragStart, this)),
        this.$stage.on("dragstart.owl.core selectstart.owl.core", function() {
            return !1
        })),
        this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", a.proxy(this.onDragStart, this)),
        this.$stage.on("touchcancel.owl.core", a.proxy(this.onDragEnd, this)))
    }
    ,
    e.prototype.onDragStart = function(b) {
        var d = null;
        3 !== b.which && (a.support.transform ? (d = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","),
        d = {
            x: d[16 === d.length ? 12 : 4],
            y: d[16 === d.length ? 13 : 5]
        }) : (d = this.$stage.position(),
        d = {
            x: this.settings.rtl ? d.left + this.$stage.width() - this.width() + this.settings.margin : d.left,
            y: d.top
        }),
        this.is("animating") && (a.support.transform ? this.animate(d.x) : this.$stage.stop(),
        this.invalidate("position")),
        this.$element.toggleClass(this.options.grabClass, "mousedown" === b.type),
        this.speed(0),
        this._drag.time = (new Date).getTime(),
        this._drag.target = a(b.target),
        this._drag.stage.start = d,
        this._drag.stage.current = d,
        this._drag.pointer = this.pointer(b),
        a(c).on("mouseup.owl.core touchend.owl.core", a.proxy(this.onDragEnd, this)),
        a(c).one("mousemove.owl.core touchmove.owl.core", a.proxy(function(b) {
            var d = this.difference(this._drag.pointer, this.pointer(b));
            a(c).on("mousemove.owl.core touchmove.owl.core", a.proxy(this.onDragMove, this)),
            Math.abs(d.x) < Math.abs(d.y) && this.is("valid") || (b.preventDefault(),
            this.enter("dragging"),
            this.trigger("drag"))
        }, this)))
    }
    ,
    e.prototype.onDragMove = function(a) {
        var b = null
          , c = null
          , d = null
          , e = this.difference(this._drag.pointer, this.pointer(a))
          , f = this.difference(this._drag.stage.start, e);
        this.is("dragging") && (a.preventDefault(),
        this.settings.loop ? (b = this.coordinates(this.minimum()),
        c = this.coordinates(this.maximum() + 1) - b,
        f.x = ((f.x - b) % c + c) % c + b) : (b = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()),
        c = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()),
        d = this.settings.pullDrag ? -1 * e.x / 5 : 0,
        f.x = Math.max(Math.min(f.x, b + d), c + d)),
        this._drag.stage.current = f,
        this.animate(f.x))
    }
    ,
    e.prototype.onDragEnd = function(b) {
        var d = this.difference(this._drag.pointer, this.pointer(b))
          , e = this._drag.stage.current
          , f = d.x > 0 ^ this.settings.rtl ? "left" : "right";
        a(c).off(".owl.core"),
        this.$element.removeClass(this.options.grabClass),
        (0 !== d.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed),
        this.current(this.closest(e.x, 0 !== d.x ? f : this._drag.direction)),
        this.invalidate("position"),
        this.update(),
        this._drag.direction = f,
        (Math.abs(d.x) > 3 || (new Date).getTime() - this._drag.time > 300) && this._drag.target.one("click.owl.core", function() {
            return !1
        })),
        this.is("dragging") && (this.leave("dragging"),
        this.trigger("dragged"))
    }
    ,
    e.prototype.closest = function(b, c) {
        var e = -1
          , f = 30
          , g = this.width()
          , h = this.coordinates();
        return this.settings.freeDrag || a.each(h, a.proxy(function(a, i) {
            return "left" === c && b > i - f && b < i + f ? e = a : "right" === c && b > i - g - f && b < i - g + f ? e = a + 1 : this.op(b, "<", i) && this.op(b, ">", h[a + 1] !== d ? h[a + 1] : i - g) && (e = "left" === c ? a + 1 : a),
            -1 === e
        }, this)),
        this.settings.loop || (this.op(b, ">", h[this.minimum()]) ? e = b = this.minimum() : this.op(b, "<", h[this.maximum()]) && (e = b = this.maximum())),
        e
    }
    ,
    e.prototype.animate = function(b) {
        var c = this.speed() > 0;
        this.is("animating") && this.onTransitionEnd(),
        c && (this.enter("animating"),
        this.trigger("translate")),
        a.support.transform3d && a.support.transition ? this.$stage.css({
            transform: "translate3d(" + b + "px,0px,0px)",
            transition: this.speed() / 1e3 + "s" + (this.settings.slideTransition ? " " + this.settings.slideTransition : "")
        }) : c ? this.$stage.animate({
            left: b + "px"
        }, this.speed(), this.settings.fallbackEasing, a.proxy(this.onTransitionEnd, this)) : this.$stage.css({
            left: b + "px"
        })
    }
    ,
    e.prototype.is = function(a) {
        return this._states.current[a] && this._states.current[a] > 0
    }
    ,
    e.prototype.current = function(a) {
        if (a === d)
            return this._current;
        if (0 === this._items.length)
            return d;
        if (a = this.normalize(a),
        this._current !== a) {
            var b = this.trigger("change", {
                property: {
                    name: "position",
                    value: a
                }
            });
            b.data !== d && (a = this.normalize(b.data)),
            this._current = a,
            this.invalidate("position"),
            this.trigger("changed", {
                property: {
                    name: "position",
                    value: this._current
                }
            })
        }
        return this._current
    }
    ,
    e.prototype.invalidate = function(b) {
        return "string" === a.type(b) && (this._invalidated[b] = !0,
        this.is("valid") && this.leave("valid")),
        a.map(this._invalidated, function(a, b) {
            return b
        })
    }
    ,
    e.prototype.reset = function(a) {
        (a = this.normalize(a)) !== d && (this._speed = 0,
        this._current = a,
        this.suppress(["translate", "translated"]),
        this.animate(this.coordinates(a)),
        this.release(["translate", "translated"]))
    }
    ,
    e.prototype.normalize = function(a, b) {
        var c = this._items.length
          , e = b ? 0 : this._clones.length;
        return !this.isNumeric(a) || c < 1 ? a = d : (a < 0 || a >= c + e) && (a = ((a - e / 2) % c + c) % c + e / 2),
        a
    }
    ,
    e.prototype.relative = function(a) {
        return a -= this._clones.length / 2,
        this.normalize(a, !0)
    }
    ,
    e.prototype.maximum = function(a) {
        var b, c, d, e = this.settings, f = this._coordinates.length;
        if (e.loop)
            f = this._clones.length / 2 + this._items.length - 1;
        else if (e.autoWidth || e.merge) {
            if (b = this._items.length)
                for (c = this._items[--b].width(),
                d = this.$element.width(); b-- && !((c += this._items[b].width() + this.settings.margin) > d); )
                    ;
            f = b + 1
        } else
            f = e.center ? this._items.length - 1 : this._items.length - e.items;
        return a && (f -= this._clones.length / 2),
        Math.max(f, 0)
    }
    ,
    e.prototype.minimum = function(a) {
        return a ? 0 : this._clones.length / 2
    }
    ,
    e.prototype.items = function(a) {
        return a === d ? this._items.slice() : (a = this.normalize(a, !0),
        this._items[a])
    }
    ,
    e.prototype.mergers = function(a) {
        return a === d ? this._mergers.slice() : (a = this.normalize(a, !0),
        this._mergers[a])
    }
    ,
    e.prototype.clones = function(b) {
        var c = this._clones.length / 2
          , e = c + this._items.length
          , f = function(a) {
            return a % 2 == 0 ? e + a / 2 : c - (a + 1) / 2
        };
        return b === d ? a.map(this._clones, function(a, b) {
            return f(b)
        }) : a.map(this._clones, function(a, c) {
            return a === b ? f(c) : null
        })
    }
    ,
    e.prototype.speed = function(a) {
        return a !== d && (this._speed = a),
        this._speed
    }
    ,
    e.prototype.coordinates = function(b) {
        var c, e = 1, f = b - 1;
        return b === d ? a.map(this._coordinates, a.proxy(function(a, b) {
            return this.coordinates(b)
        }, this)) : (this.settings.center ? (this.settings.rtl && (e = -1,
        f = b + 1),
        c = this._coordinates[b],
        c += (this.width() - c + (this._coordinates[f] || 0)) / 2 * e) : c = this._coordinates[f] || 0,
        c = Math.ceil(c))
    }
    ,
    e.prototype.duration = function(a, b, c) {
        return 0 === c ? 0 : Math.min(Math.max(Math.abs(b - a), 1), 6) * Math.abs(c || this.settings.smartSpeed)
    }
    ,
    e.prototype.to = function(a, b) {
        var c = this.current()
          , d = null
          , e = a - this.relative(c)
          , f = (e > 0) - (e < 0)
          , g = this._items.length
          , h = this.minimum()
          , i = this.maximum();
        this.settings.loop ? (!this.settings.rewind && Math.abs(e) > g / 2 && (e += -1 * f * g),
        a = c + e,
        (d = ((a - h) % g + g) % g + h) !== a && d - e <= i && d - e > 0 && (c = d - e,
        a = d,
        this.reset(c))) : this.settings.rewind ? (i += 1,
        a = (a % i + i) % i) : a = Math.max(h, Math.min(i, a)),
        this.speed(this.duration(c, a, b)),
        this.current(a),
        this.isVisible() && this.update()
    }
    ,
    e.prototype.next = function(a) {
        a = a || !1,
        this.to(this.relative(this.current()) + 1, a)
    }
    ,
    e.prototype.prev = function(a) {
        a = a || !1,
        this.to(this.relative(this.current()) - 1, a)
    }
    ,
    e.prototype.onTransitionEnd = function(a) {
        if (a !== d && (a.stopPropagation(),
        (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0)))
            return !1;
        this.leave("animating"),
        this.trigger("translated")
    }
    ,
    e.prototype.viewport = function() {
        var d;
        return this.options.responsiveBaseElement !== b ? d = a(this.options.responsiveBaseElement).width() : b.innerWidth ? d = b.innerWidth : c.documentElement && c.documentElement.clientWidth ? d = c.documentElement.clientWidth : console.warn("Can not detect viewport width."),
        d
    }
    ,
    e.prototype.replace = function(b) {
        this.$stage.empty(),
        this._items = [],
        b && (b = b instanceof jQuery ? b : a(b)),
        this.settings.nestedItemSelector && (b = b.find("." + this.settings.nestedItemSelector)),
        b.filter(function() {
            return 1 === this.nodeType
        }).each(a.proxy(function(a, b) {
            b = this.prepare(b),
            this.$stage.append(b),
            this._items.push(b),
            this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)
        }, this)),
        this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0),
        this.invalidate("items")
    }
    ,
    e.prototype.add = function(b, c) {
        var e = this.relative(this._current);
        c = c === d ? this._items.length : this.normalize(c, !0),
        b = b instanceof jQuery ? b : a(b),
        this.trigger("add", {
            content: b,
            position: c
        }),
        b = this.prepare(b),
        0 === this._items.length || c === this._items.length ? (0 === this._items.length && this.$stage.append(b),
        0 !== this._items.length && this._items[c - 1].after(b),
        this._items.push(b),
        this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)) : (this._items[c].before(b),
        this._items.splice(c, 0, b),
        this._mergers.splice(c, 0, 1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)),
        this._items[e] && this.reset(this._items[e].index()),
        this.invalidate("items"),
        this.trigger("added", {
            content: b,
            position: c
        })
    }
    ,
    e.prototype.remove = function(a) {
        (a = this.normalize(a, !0)) !== d && (this.trigger("remove", {
            content: this._items[a],
            position: a
        }),
        this._items[a].remove(),
        this._items.splice(a, 1),
        this._mergers.splice(a, 1),
        this.invalidate("items"),
        this.trigger("removed", {
            content: null,
            position: a
        }))
    }
    ,
    e.prototype.preloadAutoWidthImages = function(b) {
        b.each(a.proxy(function(b, c) {
            this.enter("pre-loading"),
            c = a(c),
            a(new Image).one("load", a.proxy(function(a) {
                c.attr("src", a.target.src),
                c.css("opacity", 1),
                this.leave("pre-loading"),
                !this.is("pre-loading") && !this.is("initializing") && this.refresh()
            }, this)).attr("src", c.attr("src") || c.attr("data-src") || c.attr("data-src-retina"))
        }, this))
    }
    ,
    e.prototype.destroy = function() {
        this.$element.off(".owl.core"),
        this.$stage.off(".owl.core"),
        a(c).off(".owl.core"),
        !1 !== this.settings.responsive && (b.clearTimeout(this.resizeTimer),
        this.off(b, "resize", this._handlers.onThrottledResize));
        for (var d in this._plugins)
            this._plugins[d].destroy();
        this.$stage.children(".cloned").remove(),
        this.$stage.unwrap(),
        this.$stage.children().contents().unwrap(),
        this.$stage.children().unwrap(),
        this.$stage.remove(),
        this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s","g"), "")).removeData("owl.carousel")
    }
    ,
    e.prototype.op = function(a, b, c) {
        var d = this.settings.rtl;
        switch (b) {
        case "<":
            return d ? a > c : a < c;
        case ">":
            return d ? a < c : a > c;
        case ">=":
            return d ? a <= c : a >= c;
        case "<=":
            return d ? a >= c : a <= c
        }
    }
    ,
    e.prototype.on = function(a, b, c, d) {
        a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c)
    }
    ,
    e.prototype.off = function(a, b, c, d) {
        a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c)
    }
    ,
    e.prototype.trigger = function(b, c, d, f, g) {
        var h = {
            item: {
                count: this._items.length,
                index: this.current()
            }
        }
          , i = a.camelCase(a.grep(["on", b, d], function(a) {
            return a
        }).join("-").toLowerCase())
          , j = a.Event([b, "owl", d || "carousel"].join(".").toLowerCase(), a.extend({
            relatedTarget: this
        }, h, c));
        return this._supress[b] || (a.each(this._plugins, function(a, b) {
            b.onTrigger && b.onTrigger(j)
        }),
        this.register({
            type: e.Type.Event,
            name: b
        }),
        this.$element.trigger(j),
        this.settings && "function" == typeof this.settings[i] && this.settings[i].call(this, j)),
        j
    }
    ,
    e.prototype.enter = function(b) {
        a.each([b].concat(this._states.tags[b] || []), a.proxy(function(a, b) {
            this._states.current[b] === d && (this._states.current[b] = 0),
            this._states.current[b]++
        }, this))
    }
    ,
    e.prototype.leave = function(b) {
        a.each([b].concat(this._states.tags[b] || []), a.proxy(function(a, b) {
            this._states.current[b]--
        }, this))
    }
    ,
    e.prototype.register = function(b) {
        if (b.type === e.Type.Event) {
            if (a.event.special[b.name] || (a.event.special[b.name] = {}),
            !a.event.special[b.name].owl) {
                var c = a.event.special[b.name]._default;
                a.event.special[b.name]._default = function(a) {
                    return !c || !c.apply || a.namespace && -1 !== a.namespace.indexOf("owl") ? a.namespace && a.namespace.indexOf("owl") > -1 : c.apply(this, arguments)
                }
                ,
                a.event.special[b.name].owl = !0
            }
        } else
            b.type === e.Type.State && (this._states.tags[b.name] ? this._states.tags[b.name] = this._states.tags[b.name].concat(b.tags) : this._states.tags[b.name] = b.tags,
            this._states.tags[b.name] = a.grep(this._states.tags[b.name], a.proxy(function(c, d) {
                return a.inArray(c, this._states.tags[b.name]) === d
            }, this)))
    }
    ,
    e.prototype.suppress = function(b) {
        a.each(b, a.proxy(function(a, b) {
            this._supress[b] = !0
        }, this))
    }
    ,
    e.prototype.release = function(b) {
        a.each(b, a.proxy(function(a, b) {
            delete this._supress[b]
        }, this))
    }
    ,
    e.prototype.pointer = function(a) {
        var c = {
            x: null,
            y: null
        };
        return a = a.originalEvent || a || b.event,
        a = a.touches && a.touches.length ? a.touches[0] : a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : a,
        a.pageX ? (c.x = a.pageX,
        c.y = a.pageY) : (c.x = a.clientX,
        c.y = a.clientY),
        c
    }
    ,
    e.prototype.isNumeric = function(a) {
        return !isNaN(parseFloat(a))
    }
    ,
    e.prototype.difference = function(a, b) {
        return {
            x: a.x - b.x,
            y: a.y - b.y
        }
    }
    ,
    a.fn.owlCarousel = function(b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return this.each(function() {
            var d = a(this)
              , f = d.data("owl.carousel");
            f || (f = new e(this,"object" == typeof b && b),
            d.data("owl.carousel", f),
            a.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function(b, c) {
                f.register({
                    type: e.Type.Event,
                    name: c
                }),
                f.$element.on(c + ".owl.carousel.core", a.proxy(function(a) {
                    a.namespace && a.relatedTarget !== this && (this.suppress([c]),
                    f[c].apply(this, [].slice.call(arguments, 1)),
                    this.release([c]))
                }, f))
            })),
            "string" == typeof b && "_" !== b.charAt(0) && f[b].apply(f, c)
        })
    }
    ,
    a.fn.owlCarousel.Constructor = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b,
        this._interval = null,
        this._visible = null,
        this._handlers = {
            "initialized.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.autoRefresh && this.watch()
            }, this)
        },
        this._core.options = a.extend({}, e.Defaults, this._core.options),
        this._core.$element.on(this._handlers)
    };
    e.Defaults = {
        autoRefresh: !0,
        autoRefreshInterval: 500
    },
    e.prototype.watch = function() {
        this._interval || (this._visible = this._core.isVisible(),
        this._interval = b.setInterval(a.proxy(this.refresh, this), this._core.settings.autoRefreshInterval))
    }
    ,
    e.prototype.refresh = function() {
        this._core.isVisible() !== this._visible && (this._visible = !this._visible,
        this._core.$element.toggleClass("owl-hidden", !this._visible),
        this._visible && this._core.invalidate("width") && this._core.refresh())
    }
    ,
    e.prototype.destroy = function() {
        var a, c;
        b.clearInterval(this._interval);
        for (a in this._handlers)
            this._core.$element.off(a, this._handlers[a]);
        for (c in Object.getOwnPropertyNames(this))
            "function" != typeof this[c] && (this[c] = null)
    }
    ,
    a.fn.owlCarousel.Constructor.Plugins.AutoRefresh = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b,
        this._loaded = [],
        this._handlers = {
            "initialized.owl.carousel change.owl.carousel resized.owl.carousel": a.proxy(function(b) {
                if (b.namespace && this._core.settings && this._core.settings.lazyLoad && (b.property && "position" == b.property.name || "initialized" == b.type)) {
                    var c = this._core.settings
                      , e = c.center && Math.ceil(c.items / 2) || c.items
                      , f = c.center && -1 * e || 0
                      , g = (b.property && b.property.value !== d ? b.property.value : this._core.current()) + f
                      , h = this._core.clones().length
                      , i = a.proxy(function(a, b) {
                        this.load(b)
                    }, this);
                    for (c.lazyLoadEager > 0 && (e += c.lazyLoadEager,
                    c.loop && (g -= c.lazyLoadEager,
                    e++)); f++ < e; )
                        this.load(h / 2 + this._core.relative(g)),
                        h && a.each(this._core.clones(this._core.relative(g)), i),
                        g++
                }
            }, this)
        },
        this._core.options = a.extend({}, e.Defaults, this._core.options),
        this._core.$element.on(this._handlers)
    };
    e.Defaults = {
        lazyLoad: !1,
        lazyLoadEager: 0
    },
    e.prototype.load = function(c) {
        var d = this._core.$stage.children().eq(c)
          , e = d && d.find(".owl-lazy");
        !e || a.inArray(d.get(0), this._loaded) > -1 || (e.each(a.proxy(function(c, d) {
            var e, f = a(d), g = b.devicePixelRatio > 1 && f.attr("data-src-retina") || f.attr("data-src") || f.attr("data-srcset");
            this._core.trigger("load", {
                element: f,
                url: g
            }, "lazy"),
            f.is("img") ? f.one("load.owl.lazy", a.proxy(function() {
                f.css("opacity", 1),
                this._core.trigger("loaded", {
                    element: f,
                    url: g
                }, "lazy")
            }, this)).attr("src", g) : f.is("source") ? f.one("load.owl.lazy", a.proxy(function() {
                this._core.trigger("loaded", {
                    element: f,
                    url: g
                }, "lazy")
            }, this)).attr("srcset", g) : (e = new Image,
            e.onload = a.proxy(function() {
                f.css({
                    "background-image": 'url("' + g + '")',
                    opacity: "1"
                }),
                this._core.trigger("loaded", {
                    element: f,
                    url: g
                }, "lazy")
            }, this),
            e.src = g)
        }, this)),
        this._loaded.push(d.get(0)))
    }
    ,
    e.prototype.destroy = function() {
        var a, b;
        for (a in this.handlers)
            this._core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
            "function" != typeof this[b] && (this[b] = null)
    }
    ,
    a.fn.owlCarousel.Constructor.Plugins.Lazy = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(c) {
        this._core = c,
        this._previousHeight = null,
        this._handlers = {
            "initialized.owl.carousel refreshed.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.autoHeight && this.update()
            }, this),
            "changed.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.autoHeight && "position" === a.property.name && this.update()
            }, this),
            "loaded.owl.lazy": a.proxy(function(a) {
                a.namespace && this._core.settings.autoHeight && a.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update()
            }, this)
        },
        this._core.options = a.extend({}, e.Defaults, this._core.options),
        this._core.$element.on(this._handlers),
        this._intervalId = null;
        var d = this;
        a(b).on("load", function() {
            d._core.settings.autoHeight && d.update()
        }),
        a(b).resize(function() {
            d._core.settings.autoHeight && (null != d._intervalId && clearTimeout(d._intervalId),
            d._intervalId = setTimeout(function() {
                d.update()
            }, 250))
        })
    };
    e.Defaults = {
        autoHeight: !1,
        autoHeightClass: "owl-height"
    },
    e.prototype.update = function() {
        var b = this._core._current
          , c = b + this._core.settings.items
          , d = this._core.settings.lazyLoad
          , e = this._core.$stage.children().toArray().slice(b, c)
          , f = []
          , g = 0;
        a.each(e, function(b, c) {
            f.push(a(c).height())
        }),
        g = Math.max.apply(null, f),
        g <= 1 && d && this._previousHeight && (g = this._previousHeight),
        this._previousHeight = g,
        this._core.$stage.parent().height(g).addClass(this._core.settings.autoHeightClass)
    }
    ,
    e.prototype.destroy = function() {
        var a, b;
        for (a in this._handlers)
            this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
            "function" != typeof this[b] && (this[b] = null)
    }
    ,
    a.fn.owlCarousel.Constructor.Plugins.AutoHeight = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b,
        this._videos = {},
        this._playing = null,
        this._handlers = {
            "initialized.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.register({
                    type: "state",
                    name: "playing",
                    tags: ["interacting"]
                })
            }, this),
            "resize.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.video && this.isInFullScreen() && a.preventDefault()
            }, this),
            "refreshed.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove()
            }, this),
            "changed.owl.carousel": a.proxy(function(a) {
                a.namespace && "position" === a.property.name && this._playing && this.stop()
            }, this),
            "prepared.owl.carousel": a.proxy(function(b) {
                if (b.namespace) {
                    var c = a(b.content).find(".owl-video");
                    c.length && (c.css("display", "none"),
                    this.fetch(c, a(b.content)))
                }
            }, this)
        },
        this._core.options = a.extend({}, e.Defaults, this._core.options),
        this._core.$element.on(this._handlers),
        this._core.$element.on("click.owl.video", ".owl-video-play-icon", a.proxy(function(a) {
            this.play(a)
        }, this))
    };
    e.Defaults = {
        video: !1,
        videoHeight: !1,
        videoWidth: !1
    },
    e.prototype.fetch = function(a, b) {
        var c = function() {
            return a.attr("data-vimeo-id") ? "vimeo" : a.attr("data-vzaar-id") ? "vzaar" : "youtube"
        }()
          , d = a.attr("data-vimeo-id") || a.attr("data-youtube-id") || a.attr("data-vzaar-id")
          , e = a.attr("data-width") || this._core.settings.videoWidth
          , f = a.attr("data-height") || this._core.settings.videoHeight
          , g = a.attr("href");
        if (!g)
            throw new Error("Missing video URL.");
        if (d = g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/),
        d[3].indexOf("youtu") > -1)
            c = "youtube";
        else if (d[3].indexOf("vimeo") > -1)
            c = "vimeo";
        else {
            if (!(d[3].indexOf("vzaar") > -1))
                throw new Error("Video URL not supported.");
            c = "vzaar"
        }
        d = d[6],
        this._videos[g] = {
            type: c,
            id: d,
            width: e,
            height: f
        },
        b.attr("data-video", g),
        this.thumbnail(a, this._videos[g])
    }
    ,
    e.prototype.thumbnail = function(b, c) {
        var d, e, f, g = c.width && c.height ? "width:" + c.width + "px;height:" + c.height + "px;" : "", h = b.find("img"), i = "src", j = "", k = this._core.settings, l = function(c) {
            e = '<div class="owl-video-play-icon"></div>',
            d = k.lazyLoad ? a("<div/>", {
                class: "owl-video-tn " + j,
                srcType: c
            }) : a("<div/>", {
                class: "owl-video-tn",
                style: "opacity:1;background-image:url(" + c + ")"
            }),
            b.after(d),
            b.after(e)
        };
        if (b.wrap(a("<div/>", {
            class: "owl-video-wrapper",
            style: g
        })),
        this._core.settings.lazyLoad && (i = "data-src",
        j = "owl-lazy"),
        h.length)
            return l(h.attr(i)),
            h.remove(),
            !1;
        "youtube" === c.type ? (f = "//img.youtube.com/vi/" + c.id + "/hqdefault.jpg",
        l(f)) : "vimeo" === c.type ? a.ajax({
            type: "GET",
            url: "//vimeo.com/api/v2/video/" + c.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function(a) {
                f = a[0].thumbnail_large,
                l(f)
            }
        }) : "vzaar" === c.type && a.ajax({
            type: "GET",
            url: "//vzaar.com/api/videos/" + c.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function(a) {
                f = a.framegrab_url,
                l(f)
            }
        })
    }
    ,
    e.prototype.stop = function() {
        this._core.trigger("stop", null, "video"),
        this._playing.find(".owl-video-frame").remove(),
        this._playing.removeClass("owl-video-playing"),
        this._playing = null,
        this._core.leave("playing"),
        this._core.trigger("stopped", null, "video")
    }
    ,
    e.prototype.play = function(b) {
        var c, d = a(b.target), e = d.closest("." + this._core.settings.itemClass), f = this._videos[e.attr("data-video")], g = f.width || "100%", h = f.height || this._core.$stage.height();
        this._playing || (this._core.enter("playing"),
        this._core.trigger("play", null, "video"),
        e = this._core.items(this._core.relative(e.index())),
        this._core.reset(e.index()),
        c = a('<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>'),
        c.attr("height", h),
        c.attr("width", g),
        "youtube" === f.type ? c.attr("src", "//www.youtube.com/embed/" + f.id + "?autoplay=1&rel=0&v=" + f.id) : "vimeo" === f.type ? c.attr("src", "//player.vimeo.com/video/" + f.id + "?autoplay=1") : "vzaar" === f.type && c.attr("src", "//view.vzaar.com/" + f.id + "/player?autoplay=true"),
        a(c).wrap('<div class="owl-video-frame" />').insertAfter(e.find(".owl-video")),
        this._playing = e.addClass("owl-video-playing"))
    }
    ,
    e.prototype.isInFullScreen = function() {
        var b = c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement;
        return b && a(b).parent().hasClass("owl-video-frame")
    }
    ,
    e.prototype.destroy = function() {
        var a, b;
        this._core.$element.off("click.owl.video");
        for (a in this._handlers)
            this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
            "function" != typeof this[b] && (this[b] = null)
    }
    ,
    a.fn.owlCarousel.Constructor.Plugins.Video = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this.core = b,
        this.core.options = a.extend({}, e.Defaults, this.core.options),
        this.swapping = !0,
        this.previous = d,
        this.next = d,
        this.handlers = {
            "change.owl.carousel": a.proxy(function(a) {
                a.namespace && "position" == a.property.name && (this.previous = this.core.current(),
                this.next = a.property.value)
            }, this),
            "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(function(a) {
                a.namespace && (this.swapping = "translated" == a.type)
            }, this),
            "translate.owl.carousel": a.proxy(function(a) {
                a.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
            }, this)
        },
        this.core.$element.on(this.handlers)
    };
    e.Defaults = {
        animateOut: !1,
        animateIn: !1
    },
    e.prototype.swap = function() {
        if (1 === this.core.settings.items && a.support.animation && a.support.transition) {
            this.core.speed(0);
            var b, c = a.proxy(this.clear, this), d = this.core.$stage.children().eq(this.previous), e = this.core.$stage.children().eq(this.next), f = this.core.settings.animateIn, g = this.core.settings.animateOut;
            this.core.current() !== this.previous && (g && (b = this.core.coordinates(this.previous) - this.core.coordinates(this.next),
            d.one(a.support.animation.end, c).css({
                left: b + "px"
            }).addClass("animated owl-animated-out").addClass(g)),
            f && e.one(a.support.animation.end, c).addClass("animated owl-animated-in").addClass(f))
        }
    }
    ,
    e.prototype.clear = function(b) {
        a(b.target).css({
            left: ""
        }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut),
        this.core.onTransitionEnd()
    }
    ,
    e.prototype.destroy = function() {
        var a, b;
        for (a in this.handlers)
            this.core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
            "function" != typeof this[b] && (this[b] = null)
    }
    ,
    a.fn.owlCarousel.Constructor.Plugins.Animate = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b,
        this._call = null,
        this._time = 0,
        this._timeout = 0,
        this._paused = !0,
        this._handlers = {
            "changed.owl.carousel": a.proxy(function(a) {
                a.namespace && "settings" === a.property.name ? this._core.settings.autoplay ? this.play() : this.stop() : a.namespace && "position" === a.property.name && this._paused && (this._time = 0)
            }, this),
            "initialized.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.autoplay && this.play()
            }, this),
            "play.owl.autoplay": a.proxy(function(a, b, c) {
                a.namespace && this.play(b, c)
            }, this),
            "stop.owl.autoplay": a.proxy(function(a) {
                a.namespace && this.stop()
            }, this),
            "mouseover.owl.autoplay": a.proxy(function() {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
            }, this),
            "mouseleave.owl.autoplay": a.proxy(function() {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play()
            }, this),
            "touchstart.owl.core": a.proxy(function() {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
            }, this),
            "touchend.owl.core": a.proxy(function() {
                this._core.settings.autoplayHoverPause && this.play()
            }, this)
        },
        this._core.$element.on(this._handlers),
        this._core.options = a.extend({}, e.Defaults, this._core.options)
    };
    e.Defaults = {
        autoplay: !1,
        autoplayTimeout: 5e3,
        autoplayHoverPause: !1,
        autoplaySpeed: !1
    },
    e.prototype._next = function(d) {
        this._call = b.setTimeout(a.proxy(this._next, this, d), this._timeout * (Math.round(this.read() / this._timeout) + 1) - this.read()),
        this._core.is("interacting") || c.hidden || this._core.next(d || this._core.settings.autoplaySpeed)
    }
    ,
    e.prototype.read = function() {
        return (new Date).getTime() - this._time
    }
    ,
    e.prototype.play = function(c, d) {
        var e;
        this._core.is("rotating") || this._core.enter("rotating"),
        c = c || this._core.settings.autoplayTimeout,
        e = Math.min(this._time % (this._timeout || c), c),
        this._paused ? (this._time = this.read(),
        this._paused = !1) : b.clearTimeout(this._call),
        this._time += this.read() % c - e,
        this._timeout = c,
        this._call = b.setTimeout(a.proxy(this._next, this, d), c - e)
    }
    ,
    e.prototype.stop = function() {
        this._core.is("rotating") && (this._time = 0,
        this._paused = !0,
        b.clearTimeout(this._call),
        this._core.leave("rotating"))
    }
    ,
    e.prototype.pause = function() {
        this._core.is("rotating") && !this._paused && (this._time = this.read(),
        this._paused = !0,
        b.clearTimeout(this._call))
    }
    ,
    e.prototype.destroy = function() {
        var a, b;
        this.stop();
        for (a in this._handlers)
            this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
            "function" != typeof this[b] && (this[b] = null)
    }
    ,
    a.fn.owlCarousel.Constructor.Plugins.autoplay = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    "use strict";
    var e = function(b) {
        this._core = b,
        this._initialized = !1,
        this._pages = [],
        this._controls = {},
        this._templates = [],
        this.$element = this._core.$element,
        this._overrides = {
            next: this._core.next,
            prev: this._core.prev,
            to: this._core.to
        },
        this._handlers = {
            "prepared.owl.carousel": a.proxy(function(b) {
                b.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>")
            }, this),
            "added.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 0, this._templates.pop())
            }, this),
            "remove.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 1)
            }, this),
            "changed.owl.carousel": a.proxy(function(a) {
                a.namespace && "position" == a.property.name && this.draw()
            }, this),
            "initialized.owl.carousel": a.proxy(function(a) {
                a.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"),
                this.initialize(),
                this.update(),
                this.draw(),
                this._initialized = !0,
                this._core.trigger("initialized", null, "navigation"))
            }, this),
            "refreshed.owl.carousel": a.proxy(function(a) {
                a.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"),
                this.update(),
                this.draw(),
                this._core.trigger("refreshed", null, "navigation"))
            }, this)
        },
        this._core.options = a.extend({}, e.Defaults, this._core.options),
        this.$element.on(this._handlers)
    };
    e.Defaults = {
        nav: !1,
        navText: ['<span aria-label="Previous">&#x2039;</span>', '<span aria-label="Next">&#x203a;</span>'],
        navSpeed: !1,
        navElement: 'button type="button" role="presentation"',
        navContainer: !1,
        navContainerClass: "owl-nav",
        navClass: ["owl-prev", "owl-next"],
        slideBy: 1,
        dotClass: "owl-dot",
        dotsClass: "owl-dots",
        dots: !0,
        dotsEach: !1,
        dotsData: !1,
        dotsSpeed: !1,
        dotsContainer: !1
    },
    e.prototype.initialize = function() {
        var b, c = this._core.settings;
        this._controls.$relative = (c.navContainer ? a(c.navContainer) : a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"),
        this._controls.$previous = a("<" + c.navElement + ">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click", a.proxy(function(a) {
            this.prev(c.navSpeed)
        }, this)),
        this._controls.$next = a("<" + c.navElement + ">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click", a.proxy(function(a) {
            this.next(c.navSpeed)
        }, this)),
        c.dotsData || (this._templates = [a('<button role="button">').addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]),
        this._controls.$absolute = (c.dotsContainer ? a(c.dotsContainer) : a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"),
        this._controls.$absolute.on("click", "button", a.proxy(function(b) {
            var d = a(b.target).parent().is(this._controls.$absolute) ? a(b.target).index() : a(b.target).parent().index();
            b.preventDefault(),
            this.to(d, c.dotsSpeed)
        }, this));
        for (b in this._overrides)
            this._core[b] = a.proxy(this[b], this)
    }
    ,
    e.prototype.destroy = function() {
        var a, b, c, d, e;
        e = this._core.settings;
        for (a in this._handlers)
            this.$element.off(a, this._handlers[a]);
        for (b in this._controls)
            "$relative" === b && e.navContainer ? this._controls[b].html("") : this._controls[b].remove();
        for (d in this.overides)
            this._core[d] = this._overrides[d];
        for (c in Object.getOwnPropertyNames(this))
            "function" != typeof this[c] && (this[c] = null)
    }
    ,
    e.prototype.update = function() {
        var a, b, c, d = this._core.clones().length / 2, e = d + this._core.items().length, f = this._core.maximum(!0), g = this._core.settings, h = g.center || g.autoWidth || g.dotsData ? 1 : g.dotsEach || g.items;
        if ("page" !== g.slideBy && (g.slideBy = Math.min(g.slideBy, g.items)),
        g.dots || "page" == g.slideBy)
            for (this._pages = [],
            a = d,
            b = 0,
            c = 0; a < e; a++) {
                if (b >= h || 0 === b) {
                    if (this._pages.push({
                        start: Math.min(f, a - d),
                        end: a - d + h - 1
                    }),
                    Math.min(f, a - d) === f)
                        break;
                    b = 0,
                    ++c
                }
                b += this._core.mergers(this._core.relative(a))
            }
    }
    ,
    e.prototype.draw = function() {
        var b, c = this._core.settings, d = this._core.items().length <= c.items, e = this._core.relative(this._core.current()), f = c.loop || c.rewind;
        this._controls.$relative.toggleClass("disabled", !c.nav || d),
        c.nav && (this._controls.$previous.toggleClass("disabled", !f && e <= this._core.minimum(!0)),
        this._controls.$next.toggleClass("disabled", !f && e >= this._core.maximum(!0))),
        this._controls.$absolute.toggleClass("disabled", !c.dots || d),
        c.dots && (b = this._pages.length - this._controls.$absolute.children().length,
        c.dotsData && 0 !== b ? this._controls.$absolute.html(this._templates.join("")) : b > 0 ? this._controls.$absolute.append(new Array(b + 1).join(this._templates[0])) : b < 0 && this._controls.$absolute.children().slice(b).remove(),
        this._controls.$absolute.find(".active").removeClass("active"),
        this._controls.$absolute.children().eq(a.inArray(this.current(), this._pages)).addClass("active"))
    }
    ,
    e.prototype.onTrigger = function(b) {
        var c = this._core.settings;
        b.page = {
            index: a.inArray(this.current(), this._pages),
            count: this._pages.length,
            size: c && (c.center || c.autoWidth || c.dotsData ? 1 : c.dotsEach || c.items)
        }
    }
    ,
    e.prototype.current = function() {
        var b = this._core.relative(this._core.current());
        return a.grep(this._pages, a.proxy(function(a, c) {
            return a.start <= b && a.end >= b
        }, this)).pop()
    }
    ,
    e.prototype.getPosition = function(b) {
        var c, d, e = this._core.settings;
        return "page" == e.slideBy ? (c = a.inArray(this.current(), this._pages),
        d = this._pages.length,
        b ? ++c : --c,
        c = this._pages[(c % d + d) % d].start) : (c = this._core.relative(this._core.current()),
        d = this._core.items().length,
        b ? c += e.slideBy : c -= e.slideBy),
        c
    }
    ,
    e.prototype.next = function(b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b)
    }
    ,
    e.prototype.prev = function(b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b)
    }
    ,
    e.prototype.to = function(b, c, d) {
        var e;
        !d && this._pages.length ? (e = this._pages.length,
        a.proxy(this._overrides.to, this._core)(this._pages[(b % e + e) % e].start, c)) : a.proxy(this._overrides.to, this._core)(b, c)
    }
    ,
    a.fn.owlCarousel.Constructor.Plugins.Navigation = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    "use strict";
    var e = function(c) {
        this._core = c,
        this._hashes = {},
        this.$element = this._core.$element,
        this._handlers = {
            "initialized.owl.carousel": a.proxy(function(c) {
                c.namespace && "URLHash" === this._core.settings.startPosition && a(b).trigger("hashchange.owl.navigation")
            }, this),
            "prepared.owl.carousel": a.proxy(function(b) {
                if (b.namespace) {
                    var c = a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
                    if (!c)
                        return;
                    this._hashes[c] = b.content
                }
            }, this),
            "changed.owl.carousel": a.proxy(function(c) {
                if (c.namespace && "position" === c.property.name) {
                    var d = this._core.items(this._core.relative(this._core.current()))
                      , e = a.map(this._hashes, function(a, b) {
                        return a === d ? b : null
                    }).join();
                    if (!e || b.location.hash.slice(1) === e)
                        return;
                    b.location.hash = e
                }
            }, this)
        },
        this._core.options = a.extend({}, e.Defaults, this._core.options),
        this.$element.on(this._handlers),
        a(b).on("hashchange.owl.navigation", a.proxy(function(a) {
            var c = b.location.hash.substring(1)
              , e = this._core.$stage.children()
              , f = this._hashes[c] && e.index(this._hashes[c]);
            f !== d && f !== this._core.current() && this._core.to(this._core.relative(f), !1, !0)
        }, this))
    };
    e.Defaults = {
        URLhashListener: !1
    },
    e.prototype.destroy = function() {
        var c, d;
        a(b).off("hashchange.owl.navigation");
        for (c in this._handlers)
            this._core.$element.off(c, this._handlers[c]);
        for (d in Object.getOwnPropertyNames(this))
            "function" != typeof this[d] && (this[d] = null)
    }
    ,
    a.fn.owlCarousel.Constructor.Plugins.Hash = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    function e(b, c) {
        var e = !1
          , f = b.charAt(0).toUpperCase() + b.slice(1);
        return a.each((b + " " + h.join(f + " ") + f).split(" "), function(a, b) {
            if (g[b] !== d)
                return e = !c || b,
                !1
        }),
        e
    }
    function f(a) {
        return e(a, !0)
    }
    var g = a("<support>").get(0).style
      , h = "Webkit Moz O ms".split(" ")
      , i = {
        transition: {
            end: {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd",
                transition: "transitionend"
            }
        },
        animation: {
            end: {
                WebkitAnimation: "webkitAnimationEnd",
                MozAnimation: "animationend",
                OAnimation: "oAnimationEnd",
                animation: "animationend"
            }
        }
    }
      , j = {
        csstransforms: function() {
            return !!e("transform")
        },
        csstransforms3d: function() {
            return !!e("perspective")
        },
        csstransitions: function() {
            return !!e("transition")
        },
        cssanimations: function() {
            return !!e("animation")
        }
    };
    j.csstransitions() && (a.support.transition = new String(f("transition")),
    a.support.transition.end = i.transition.end[a.support.transition]),
    j.cssanimations() && (a.support.animation = new String(f("animation")),
    a.support.animation.end = i.animation.end[a.support.animation]),
    j.csstransforms() && (a.support.transform = new String(f("transform")),
    a.support.transform3d = j.csstransforms3d())
}(window.Zepto || window.jQuery, window, document);
;;!function(i) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], i) : "undefined" != typeof exports ? module.exports = i(require("jquery")) : i(jQuery)
}(function(i) {
    "use strict";
    var e = window.Slick || {};
    (e = function() {
        var e = 0;
        return function(t, o) {
            var s, n = this;
            n.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: i(t),
                appendDots: i(t),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(e, t) {
                    return i('<button type="button" />').text(t + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                focusOnChange: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            },
            n.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: !1,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                swiping: !1,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            },
            i.extend(n, n.initials),
            n.activeBreakpoint = null,
            n.animType = null,
            n.animProp = null,
            n.breakpoints = [],
            n.breakpointSettings = [],
            n.cssTransitions = !1,
            n.focussed = !1,
            n.interrupted = !1,
            n.hidden = "hidden",
            n.paused = !0,
            n.positionProp = null,
            n.respondTo = null,
            n.rowCount = 1,
            n.shouldClick = !0,
            n.$slider = i(t),
            n.$slidesCache = null,
            n.transformType = null,
            n.transitionType = null,
            n.visibilityChange = "visibilitychange",
            n.windowWidth = 0,
            n.windowTimer = null,
            s = i(t).data("slick") || {},
            n.options = i.extend({}, n.defaults, o, s),
            n.currentSlide = n.options.initialSlide,
            n.originalSettings = n.options,
            void 0 !== document.mozHidden ? (n.hidden = "mozHidden",
            n.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (n.hidden = "webkitHidden",
            n.visibilityChange = "webkitvisibilitychange"),
            n.autoPlay = i.proxy(n.autoPlay, n),
            n.autoPlayClear = i.proxy(n.autoPlayClear, n),
            n.autoPlayIterator = i.proxy(n.autoPlayIterator, n),
            n.changeSlide = i.proxy(n.changeSlide, n),
            n.clickHandler = i.proxy(n.clickHandler, n),
            n.selectHandler = i.proxy(n.selectHandler, n),
            n.setPosition = i.proxy(n.setPosition, n),
            n.swipeHandler = i.proxy(n.swipeHandler, n),
            n.dragHandler = i.proxy(n.dragHandler, n),
            n.keyHandler = i.proxy(n.keyHandler, n),
            n.instanceUid = e++,
            n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/,
            n.registerBreakpoints(),
            n.init(!0)
        }
    }()).prototype.activateADA = function() {
        this.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }
    ,
    e.prototype.addSlide = e.prototype.slickAdd = function(e, t, o) {
        var s = this;
        if ("boolean" == typeof t)
            o = t,
            t = null;
        else if (t < 0 || t >= s.slideCount)
            return !1;
        s.unload(),
        "number" == typeof t ? 0 === t && 0 === s.$slides.length ? i(e).appendTo(s.$slideTrack) : o ? i(e).insertBefore(s.$slides.eq(t)) : i(e).insertAfter(s.$slides.eq(t)) : !0 === o ? i(e).prependTo(s.$slideTrack) : i(e).appendTo(s.$slideTrack),
        s.$slides = s.$slideTrack.children(this.options.slide),
        s.$slideTrack.children(this.options.slide).detach(),
        s.$slideTrack.append(s.$slides),
        s.$slides.each(function(e, t) {
            i(t).attr("data-slick-index", e)
        }),
        s.$slidesCache = s.$slides,
        s.reinit()
    }
    ,
    e.prototype.animateHeight = function() {
        var i = this;
        if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.animate({
                height: e
            }, i.options.speed)
        }
    }
    ,
    e.prototype.animateSlide = function(e, t) {
        var o = {}
          , s = this;
        s.animateHeight(),
        !0 === s.options.rtl && !1 === s.options.vertical && (e = -e),
        !1 === s.transformsEnabled ? !1 === s.options.vertical ? s.$slideTrack.animate({
            left: e
        }, s.options.speed, s.options.easing, t) : s.$slideTrack.animate({
            top: e
        }, s.options.speed, s.options.easing, t) : !1 === s.cssTransitions ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft),
        i({
            animStart: s.currentLeft
        }).animate({
            animStart: e
        }, {
            duration: s.options.speed,
            easing: s.options.easing,
            step: function(i) {
                i = Math.ceil(i),
                !1 === s.options.vertical ? (o[s.animType] = "translate(" + i + "px, 0px)",
                s.$slideTrack.css(o)) : (o[s.animType] = "translate(0px," + i + "px)",
                s.$slideTrack.css(o))
            },
            complete: function() {
                t && t.call()
            }
        })) : (s.applyTransition(),
        e = Math.ceil(e),
        !1 === s.options.vertical ? o[s.animType] = "translate3d(" + e + "px, 0px, 0px)" : o[s.animType] = "translate3d(0px," + e + "px, 0px)",
        s.$slideTrack.css(o),
        t && setTimeout(function() {
            s.disableTransition(),
            t.call()
        }, s.options.speed))
    }
    ,
    e.prototype.getNavTarget = function() {
        var e = this
          , t = e.options.asNavFor;
        return t && null !== t && (t = i(t).not(e.$slider)),
        t
    }
    ,
    e.prototype.asNavFor = function(e) {
        var t = this.getNavTarget();
        null !== t && "object" == typeof t && t.each(function() {
            var t = i(this).slick("getSlick");
            t.unslicked || t.slideHandler(e, !0)
        })
    }
    ,
    e.prototype.applyTransition = function(i) {
        var e = this
          , t = {};
        !1 === e.options.fade ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase,
        !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
    }
    ,
    e.prototype.autoPlay = function() {
        var i = this;
        i.autoPlayClear(),
        i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed))
    }
    ,
    e.prototype.autoPlayClear = function() {
        var i = this;
        i.autoPlayTimer && clearInterval(i.autoPlayTimer)
    }
    ,
    e.prototype.autoPlayIterator = function() {
        var i = this
          , e = i.currentSlide + i.options.slidesToScroll;
        i.paused || i.interrupted || i.focussed || (!1 === i.options.infinite && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (e = i.currentSlide - i.options.slidesToScroll,
        i.currentSlide - 1 == 0 && (i.direction = 1))),
        i.slideHandler(e))
    }
    ,
    e.prototype.buildArrows = function() {
        var e = this;
        !0 === e.options.arrows && (e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow"),
        e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow"),
        e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
        e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
        e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows),
        e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows),
        !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }
    ,
    e.prototype.buildDots = function() {
        var e, t, o = this;
        if (!0 === o.options.dots) {
            for (o.$slider.addClass("slick-dotted"),
            t = i("<ul />").addClass(o.options.dotsClass),
            e = 0; e <= o.getDotCount(); e += 1)
                t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
            o.$dots = t.appendTo(o.options.appendDots),
            o.$dots.find("li").first().addClass("slick-active")
        }
    }
    ,
    e.prototype.buildOut = function() {
        var e = this;
        e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"),
        e.slideCount = e.$slides.length,
        e.$slides.each(function(e, t) {
            i(t).attr("data-slick-index", e).data("originalStyling", i(t).attr("style") || "")
        }),
        e.$slider.addClass("slick-slider"),
        e.$slideTrack = 0 === e.slideCount ? i('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(),
        e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(),
        e.$slideTrack.css("opacity", 0),
        !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1),
        i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"),
        e.setupInfinite(),
        e.buildArrows(),
        e.buildDots(),
        e.updateDots(),
        e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0),
        !0 === e.options.draggable && e.$list.addClass("draggable")
    }
    ,
    e.prototype.buildRows = function() {
        var i, e, t, o, s, n, r, l = this;
        if (o = document.createDocumentFragment(),
        n = l.$slider.children(),
        l.options.rows > 1) {
            for (r = l.options.slidesPerRow * l.options.rows,
            s = Math.ceil(n.length / r),
            i = 0; i < s; i++) {
                var d = document.createElement("div");
                for (e = 0; e < l.options.rows; e++) {
                    var a = document.createElement("div");
                    for (t = 0; t < l.options.slidesPerRow; t++) {
                        var c = i * r + (e * l.options.slidesPerRow + t);
                        n.get(c) && a.appendChild(n.get(c))
                    }
                    d.appendChild(a)
                }
                o.appendChild(d)
            }
            l.$slider.empty().append(o),
            l.$slider.children().children().children().css({
                width: 100 / l.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }
    ,
    e.prototype.checkResponsive = function(e, t) {
        var o, s, n, r = this, l = !1, d = r.$slider.width(), a = window.innerWidth || i(window).width();
        if ("window" === r.respondTo ? n = a : "slider" === r.respondTo ? n = d : "min" === r.respondTo && (n = Math.min(a, d)),
        r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
            s = null;
            for (o in r.breakpoints)
                r.breakpoints.hasOwnProperty(o) && (!1 === r.originalSettings.mobileFirst ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o]));
            null !== s ? null !== r.activeBreakpoint ? (s !== r.activeBreakpoint || t) && (r.activeBreakpoint = s,
            "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]),
            !0 === e && (r.currentSlide = r.options.initialSlide),
            r.refresh(e)),
            l = s) : (r.activeBreakpoint = s,
            "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]),
            !0 === e && (r.currentSlide = r.options.initialSlide),
            r.refresh(e)),
            l = s) : null !== r.activeBreakpoint && (r.activeBreakpoint = null,
            r.options = r.originalSettings,
            !0 === e && (r.currentSlide = r.options.initialSlide),
            r.refresh(e),
            l = s),
            e || !1 === l || r.$slider.trigger("breakpoint", [r, l])
        }
    }
    ,
    e.prototype.changeSlide = function(e, t) {
        var o, s, n, r = this, l = i(e.currentTarget);
        switch (l.is("a") && e.preventDefault(),
        l.is("li") || (l = l.closest("li")),
        n = r.slideCount % r.options.slidesToScroll != 0,
        o = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll,
        e.data.message) {
        case "previous":
            s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o,
            r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, t);
            break;
        case "next":
            s = 0 === o ? r.options.slidesToScroll : o,
            r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, t);
            break;
        case "index":
            var d = 0 === e.data.index ? 0 : e.data.index || l.index() * r.options.slidesToScroll;
            r.slideHandler(r.checkNavigable(d), !1, t),
            l.children().trigger("focus");
            break;
        default:
            return
        }
    }
    ,
    e.prototype.checkNavigable = function(i) {
        var e, t;
        if (e = this.getNavigableIndexes(),
        t = 0,
        i > e[e.length - 1])
            i = e[e.length - 1];
        else
            for (var o in e) {
                if (i < e[o]) {
                    i = t;
                    break
                }
                t = e[o]
            }
        return i
    }
    ,
    e.prototype.cleanUpEvents = function() {
        var e = this;
        e.options.dots && null !== e.$dots && (i("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", i.proxy(e.interrupt, e, !0)).off("mouseleave.slick", i.proxy(e.interrupt, e, !1)),
        !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)),
        e.$slider.off("focus.slick blur.slick"),
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide),
        e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide),
        !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler),
        e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))),
        e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler),
        e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler),
        e.$list.off("touchend.slick mouseup.slick", e.swipeHandler),
        e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler),
        e.$list.off("click.slick", e.clickHandler),
        i(document).off(e.visibilityChange, e.visibility),
        e.cleanUpSlideEvents(),
        !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler),
        !0 === e.options.focusOnSelect && i(e.$slideTrack).children().off("click.slick", e.selectHandler),
        i(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange),
        i(window).off("resize.slick.slick-" + e.instanceUid, e.resize),
        i("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault),
        i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition)
    }
    ,
    e.prototype.cleanUpSlideEvents = function() {
        var e = this;
        e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)),
        e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1))
    }
    ,
    e.prototype.cleanUpRows = function() {
        var i, e = this;
        e.options.rows > 1 && ((i = e.$slides.children().children()).removeAttr("style"),
        e.$slider.empty().append(i))
    }
    ,
    e.prototype.clickHandler = function(i) {
        !1 === this.shouldClick && (i.stopImmediatePropagation(),
        i.stopPropagation(),
        i.preventDefault())
    }
    ,
    e.prototype.destroy = function(e) {
        var t = this;
        t.autoPlayClear(),
        t.touchObject = {},
        t.cleanUpEvents(),
        i(".slick-cloned", t.$slider).detach(),
        t.$dots && t.$dots.remove(),
        t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""),
        t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()),
        t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""),
        t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()),
        t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            i(this).attr("style", i(this).data("originalStyling"))
        }),
        t.$slideTrack.children(this.options.slide).detach(),
        t.$slideTrack.detach(),
        t.$list.detach(),
        t.$slider.append(t.$slides)),
        t.cleanUpRows(),
        t.$slider.removeClass("slick-slider"),
        t.$slider.removeClass("slick-initialized"),
        t.$slider.removeClass("slick-dotted"),
        t.unslicked = !0,
        e || t.$slider.trigger("destroy", [t])
    }
    ,
    e.prototype.disableTransition = function(i) {
        var e = this
          , t = {};
        t[e.transitionType] = "",
        !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
    }
    ,
    e.prototype.fadeSlide = function(i, e) {
        var t = this;
        !1 === t.cssTransitions ? (t.$slides.eq(i).css({
            zIndex: t.options.zIndex
        }),
        t.$slides.eq(i).animate({
            opacity: 1
        }, t.options.speed, t.options.easing, e)) : (t.applyTransition(i),
        t.$slides.eq(i).css({
            opacity: 1,
            zIndex: t.options.zIndex
        }),
        e && setTimeout(function() {
            t.disableTransition(i),
            e.call()
        }, t.options.speed))
    }
    ,
    e.prototype.fadeSlideOut = function(i) {
        var e = this;
        !1 === e.cssTransitions ? e.$slides.eq(i).animate({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }, e.options.speed, e.options.easing) : (e.applyTransition(i),
        e.$slides.eq(i).css({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }))
    }
    ,
    e.prototype.filterSlides = e.prototype.slickFilter = function(i) {
        var e = this;
        null !== i && (e.$slidesCache = e.$slides,
        e.unload(),
        e.$slideTrack.children(this.options.slide).detach(),
        e.$slidesCache.filter(i).appendTo(e.$slideTrack),
        e.reinit())
    }
    ,
    e.prototype.focusHandler = function() {
        var e = this;
        e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function(t) {
            t.stopImmediatePropagation();
            var o = i(this);
            setTimeout(function() {
                e.options.pauseOnFocus && (e.focussed = o.is(":focus"),
                e.autoPlay())
            }, 0)
        })
    }
    ,
    e.prototype.getCurrent = e.prototype.slickCurrentSlide = function() {
        return this.currentSlide
    }
    ,
    e.prototype.getDotCount = function() {
        var i = this
          , e = 0
          , t = 0
          , o = 0;
        if (!0 === i.options.infinite)
            if (i.slideCount <= i.options.slidesToShow)
                ++o;
            else
                for (; e < i.slideCount; )
                    ++o,
                    e = t + i.options.slidesToScroll,
                    t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else if (!0 === i.options.centerMode)
            o = i.slideCount;
        else if (i.options.asNavFor)
            for (; e < i.slideCount; )
                ++o,
                e = t + i.options.slidesToScroll,
                t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else
            o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll);
        return o - 1
    }
    ,
    e.prototype.getLeft = function(i) {
        var e, t, o, s, n = this, r = 0;
        return n.slideOffset = 0,
        t = n.$slides.first().outerHeight(!0),
        !0 === n.options.infinite ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1,
        s = -1,
        !0 === n.options.vertical && !0 === n.options.centerMode && (2 === n.options.slidesToShow ? s = -1.5 : 1 === n.options.slidesToShow && (s = -2)),
        r = t * n.options.slidesToShow * s),
        n.slideCount % n.options.slidesToScroll != 0 && i + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (i > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (i - n.slideCount)) * n.slideWidth * -1,
        r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1,
        r = n.slideCount % n.options.slidesToScroll * t * -1))) : i + n.options.slidesToShow > n.slideCount && (n.slideOffset = (i + n.options.slidesToShow - n.slideCount) * n.slideWidth,
        r = (i + n.options.slidesToShow - n.slideCount) * t),
        n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0,
        r = 0),
        !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : !0 === n.options.centerMode && !0 === n.options.infinite ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : !0 === n.options.centerMode && (n.slideOffset = 0,
        n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)),
        e = !1 === n.options.vertical ? i * n.slideWidth * -1 + n.slideOffset : i * t * -1 + r,
        !0 === n.options.variableWidth && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow),
        e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0,
        !0 === n.options.centerMode && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow + 1),
        e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0,
        e += (n.$list.width() - o.outerWidth()) / 2)),
        e
    }
    ,
    e.prototype.getOption = e.prototype.slickGetOption = function(i) {
        return this.options[i]
    }
    ,
    e.prototype.getNavigableIndexes = function() {
        var i, e = this, t = 0, o = 0, s = [];
        for (!1 === e.options.infinite ? i = e.slideCount : (t = -1 * e.options.slidesToScroll,
        o = -1 * e.options.slidesToScroll,
        i = 2 * e.slideCount); t < i; )
            s.push(t),
            t = o + e.options.slidesToScroll,
            o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        return s
    }
    ,
    e.prototype.getSlick = function() {
        return this
    }
    ,
    e.prototype.getSlideCount = function() {
        var e, t, o = this;
        return t = !0 === o.options.centerMode ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0,
        !0 === o.options.swipeToSlide ? (o.$slideTrack.find(".slick-slide").each(function(s, n) {
            if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft)
                return e = n,
                !1
        }),
        Math.abs(i(e).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll
    }
    ,
    e.prototype.goTo = e.prototype.slickGoTo = function(i, e) {
        this.changeSlide({
            data: {
                message: "index",
                index: parseInt(i)
            }
        }, e)
    }
    ,
    e.prototype.init = function(e) {
        var t = this;
        i(t.$slider).hasClass("slick-initialized") || (i(t.$slider).addClass("slick-initialized"),
        t.buildRows(),
        t.buildOut(),
        t.setProps(),
        t.startLoad(),
        t.loadSlider(),
        t.initializeEvents(),
        t.updateArrows(),
        t.updateDots(),
        t.checkResponsive(!0),
        t.focusHandler()),
        e && t.$slider.trigger("init", [t]),
        !0 === t.options.accessibility && t.initADA(),
        t.options.autoplay && (t.paused = !1,
        t.autoPlay())
    }
    ,
    e.prototype.initADA = function() {
        var e = this
          , t = Math.ceil(e.slideCount / e.options.slidesToShow)
          , o = e.getNavigableIndexes().filter(function(i) {
            return i >= 0 && i < e.slideCount
        });
        e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }),
        null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t) {
            var s = o.indexOf(t);
            i(this).attr({
                role: "tabpanel",
                id: "slick-slide" + e.instanceUid + t,
                tabindex: -1
            }),
            -1 !== s && i(this).attr({
                "aria-describedby": "slick-slide-control" + e.instanceUid + s
            })
        }),
        e.$dots.attr("role", "tablist").find("li").each(function(s) {
            var n = o[s];
            i(this).attr({
                role: "presentation"
            }),
            i(this).find("button").first().attr({
                role: "tab",
                id: "slick-slide-control" + e.instanceUid + s,
                "aria-controls": "slick-slide" + e.instanceUid + n,
                "aria-label": s + 1 + " of " + t,
                "aria-selected": null,
                tabindex: "-1"
            })
        }).eq(e.currentSlide).find("button").attr({
            "aria-selected": "true",
            tabindex: "0"
        }).end());
        for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++)
            e.$slides.eq(s).attr("tabindex", 0);
        e.activateADA()
    }
    ,
    e.prototype.initArrowEvents = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, i.changeSlide),
        i.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, i.changeSlide),
        !0 === i.options.accessibility && (i.$prevArrow.on("keydown.slick", i.keyHandler),
        i.$nextArrow.on("keydown.slick", i.keyHandler)))
    }
    ,
    e.prototype.initDotEvents = function() {
        var e = this;
        !0 === e.options.dots && (i("li", e.$dots).on("click.slick", {
            message: "index"
        }, e.changeSlide),
        !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)),
        !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && i("li", e.$dots).on("mouseenter.slick", i.proxy(e.interrupt, e, !0)).on("mouseleave.slick", i.proxy(e.interrupt, e, !1))
    }
    ,
    e.prototype.initSlideEvents = function() {
        var e = this;
        e.options.pauseOnHover && (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)),
        e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)))
    }
    ,
    e.prototype.initializeEvents = function() {
        var e = this;
        e.initArrowEvents(),
        e.initDotEvents(),
        e.initSlideEvents(),
        e.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, e.swipeHandler),
        e.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, e.swipeHandler),
        e.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, e.swipeHandler),
        e.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, e.swipeHandler),
        e.$list.on("click.slick", e.clickHandler),
        i(document).on(e.visibilityChange, i.proxy(e.visibility, e)),
        !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler),
        !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler),
        i(window).on("orientationchange.slick.slick-" + e.instanceUid, i.proxy(e.orientationChange, e)),
        i(window).on("resize.slick.slick-" + e.instanceUid, i.proxy(e.resize, e)),
        i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault),
        i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition),
        i(e.setPosition)
    }
    ,
    e.prototype.initUI = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(),
        i.$nextArrow.show()),
        !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.show()
    }
    ,
    e.prototype.keyHandler = function(i) {
        var e = this;
        i.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === i.keyCode && !0 === e.options.accessibility ? e.changeSlide({
            data: {
                message: !0 === e.options.rtl ? "next" : "previous"
            }
        }) : 39 === i.keyCode && !0 === e.options.accessibility && e.changeSlide({
            data: {
                message: !0 === e.options.rtl ? "previous" : "next"
            }
        }))
    }
    ,
    e.prototype.lazyLoad = function() {
        function e(e) {
            i("img[data-lazy]", e).each(function() {
                var e = i(this)
                  , t = i(this).attr("data-lazy")
                  , o = i(this).attr("data-srcset")
                  , s = i(this).attr("data-sizes") || n.$slider.attr("data-sizes")
                  , r = document.createElement("img");
                r.onload = function() {
                    e.animate({
                        opacity: 0
                    }, 100, function() {
                        o && (e.attr("srcset", o),
                        s && e.attr("sizes", s)),
                        e.attr("src", t).animate({
                            opacity: 1
                        }, 200, function() {
                            e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                        }),
                        n.$slider.trigger("lazyLoaded", [n, e, t])
                    })
                }
                ,
                r.onerror = function() {
                    e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),
                    n.$slider.trigger("lazyLoadError", [n, e, t])
                }
                ,
                r.src = t
            })
        }
        var t, o, s, n = this;
        if (!0 === n.options.centerMode ? !0 === n.options.infinite ? s = (o = n.currentSlide + (n.options.slidesToShow / 2 + 1)) + n.options.slidesToShow + 2 : (o = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1)),
        s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide) : (o = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide,
        s = Math.ceil(o + n.options.slidesToShow),
        !0 === n.options.fade && (o > 0 && o--,
        s <= n.slideCount && s++)),
        t = n.$slider.find(".slick-slide").slice(o, s),
        "anticipated" === n.options.lazyLoad)
            for (var r = o - 1, l = s, d = n.$slider.find(".slick-slide"), a = 0; a < n.options.slidesToScroll; a++)
                r < 0 && (r = n.slideCount - 1),
                t = (t = t.add(d.eq(r))).add(d.eq(l)),
                r--,
                l++;
        e(t),
        n.slideCount <= n.options.slidesToShow ? e(n.$slider.find(".slick-slide")) : n.currentSlide >= n.slideCount - n.options.slidesToShow ? e(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow)) : 0 === n.currentSlide && e(n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow))
    }
    ,
    e.prototype.loadSlider = function() {
        var i = this;
        i.setPosition(),
        i.$slideTrack.css({
            opacity: 1
        }),
        i.$slider.removeClass("slick-loading"),
        i.initUI(),
        "progressive" === i.options.lazyLoad && i.progressiveLazyLoad()
    }
    ,
    e.prototype.next = e.prototype.slickNext = function() {
        this.changeSlide({
            data: {
                message: "next"
            }
        })
    }
    ,
    e.prototype.orientationChange = function() {
        var i = this;
        i.checkResponsive(),
        i.setPosition()
    }
    ,
    e.prototype.pause = e.prototype.slickPause = function() {
        var i = this;
        i.autoPlayClear(),
        i.paused = !0
    }
    ,
    e.prototype.play = e.prototype.slickPlay = function() {
        var i = this;
        i.autoPlay(),
        i.options.autoplay = !0,
        i.paused = !1,
        i.focussed = !1,
        i.interrupted = !1
    }
    ,
    e.prototype.postSlide = function(e) {
        var t = this;
        t.unslicked || (t.$slider.trigger("afterChange", [t, e]),
        t.animating = !1,
        t.slideCount > t.options.slidesToShow && t.setPosition(),
        t.swipeLeft = null,
        t.options.autoplay && t.autoPlay(),
        !0 === t.options.accessibility && (t.initADA(),
        t.options.focusOnChange && i(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()))
    }
    ,
    e.prototype.prev = e.prototype.slickPrev = function() {
        this.changeSlide({
            data: {
                message: "previous"
            }
        })
    }
    ,
    e.prototype.preventDefault = function(i) {
        i.preventDefault()
    }
    ,
    e.prototype.progressiveLazyLoad = function(e) {
        e = e || 1;
        var t, o, s, n, r, l = this, d = i("img[data-lazy]", l.$slider);
        d.length ? (t = d.first(),
        o = t.attr("data-lazy"),
        s = t.attr("data-srcset"),
        n = t.attr("data-sizes") || l.$slider.attr("data-sizes"),
        (r = document.createElement("img")).onload = function() {
            s && (t.attr("srcset", s),
            n && t.attr("sizes", n)),
            t.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),
            !0 === l.options.adaptiveHeight && l.setPosition(),
            l.$slider.trigger("lazyLoaded", [l, t, o]),
            l.progressiveLazyLoad()
        }
        ,
        r.onerror = function() {
            e < 3 ? setTimeout(function() {
                l.progressiveLazyLoad(e + 1)
            }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),
            l.$slider.trigger("lazyLoadError", [l, t, o]),
            l.progressiveLazyLoad())
        }
        ,
        r.src = o) : l.$slider.trigger("allImagesLoaded", [l])
    }
    ,
    e.prototype.refresh = function(e) {
        var t, o, s = this;
        o = s.slideCount - s.options.slidesToShow,
        !s.options.infinite && s.currentSlide > o && (s.currentSlide = o),
        s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0),
        t = s.currentSlide,
        s.destroy(!0),
        i.extend(s, s.initials, {
            currentSlide: t
        }),
        s.init(),
        e || s.changeSlide({
            data: {
                message: "index",
                index: t
            }
        }, !1)
    }
    ,
    e.prototype.registerBreakpoints = function() {
        var e, t, o, s = this, n = s.options.responsive || null;
        if ("array" === i.type(n) && n.length) {
            s.respondTo = s.options.respondTo || "window";
            for (e in n)
                if (o = s.breakpoints.length - 1,
                n.hasOwnProperty(e)) {
                    for (t = n[e].breakpoint; o >= 0; )
                        s.breakpoints[o] && s.breakpoints[o] === t && s.breakpoints.splice(o, 1),
                        o--;
                    s.breakpoints.push(t),
                    s.breakpointSettings[t] = n[e].settings
                }
            s.breakpoints.sort(function(i, e) {
                return s.options.mobileFirst ? i - e : e - i
            })
        }
    }
    ,
    e.prototype.reinit = function() {
        var e = this;
        e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"),
        e.slideCount = e.$slides.length,
        e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll),
        e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
        e.registerBreakpoints(),
        e.setProps(),
        e.setupInfinite(),
        e.buildArrows(),
        e.updateArrows(),
        e.initArrowEvents(),
        e.buildDots(),
        e.updateDots(),
        e.initDotEvents(),
        e.cleanUpSlideEvents(),
        e.initSlideEvents(),
        e.checkResponsive(!1, !0),
        !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler),
        e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0),
        e.setPosition(),
        e.focusHandler(),
        e.paused = !e.options.autoplay,
        e.autoPlay(),
        e.$slider.trigger("reInit", [e])
    }
    ,
    e.prototype.resize = function() {
        var e = this;
        i(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay),
        e.windowDelay = window.setTimeout(function() {
            e.windowWidth = i(window).width(),
            e.checkResponsive(),
            e.unslicked || e.setPosition()
        }, 50))
    }
    ,
    e.prototype.removeSlide = e.prototype.slickRemove = function(i, e, t) {
        var o = this;
        if (i = "boolean" == typeof i ? !0 === (e = i) ? 0 : o.slideCount - 1 : !0 === e ? --i : i,
        o.slideCount < 1 || i < 0 || i > o.slideCount - 1)
            return !1;
        o.unload(),
        !0 === t ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(),
        o.$slides = o.$slideTrack.children(this.options.slide),
        o.$slideTrack.children(this.options.slide).detach(),
        o.$slideTrack.append(o.$slides),
        o.$slidesCache = o.$slides,
        o.reinit()
    }
    ,
    e.prototype.setCSS = function(i) {
        var e, t, o = this, s = {};
        !0 === o.options.rtl && (i = -i),
        e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px",
        t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px",
        s[o.positionProp] = i,
        !1 === o.transformsEnabled ? o.$slideTrack.css(s) : (s = {},
        !1 === o.cssTransitions ? (s[o.animType] = "translate(" + e + ", " + t + ")",
        o.$slideTrack.css(s)) : (s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)",
        o.$slideTrack.css(s)))
    }
    ,
    e.prototype.setDimensions = function() {
        var i = this;
        !1 === i.options.vertical ? !0 === i.options.centerMode && i.$list.css({
            padding: "0px " + i.options.centerPadding
        }) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow),
        !0 === i.options.centerMode && i.$list.css({
            padding: i.options.centerPadding + " 0px"
        })),
        i.listWidth = i.$list.width(),
        i.listHeight = i.$list.height(),
        !1 === i.options.vertical && !1 === i.options.variableWidth ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow),
        i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length))) : !0 === i.options.variableWidth ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth),
        i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length)));
        var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
        !1 === i.options.variableWidth && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e)
    }
    ,
    e.prototype.setFade = function() {
        var e, t = this;
        t.$slides.each(function(o, s) {
            e = t.slideWidth * o * -1,
            !0 === t.options.rtl ? i(s).css({
                position: "relative",
                right: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
            }) : i(s).css({
                position: "relative",
                left: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
            })
        }),
        t.$slides.eq(t.currentSlide).css({
            zIndex: t.options.zIndex - 1,
            opacity: 1
        })
    }
    ,
    e.prototype.setHeight = function() {
        var i = this;
        if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.css("height", e)
        }
    }
    ,
    e.prototype.setOption = e.prototype.slickSetOption = function() {
        var e, t, o, s, n, r = this, l = !1;
        if ("object" === i.type(arguments[0]) ? (o = arguments[0],
        l = arguments[1],
        n = "multiple") : "string" === i.type(arguments[0]) && (o = arguments[0],
        s = arguments[1],
        l = arguments[2],
        "responsive" === arguments[0] && "array" === i.type(arguments[1]) ? n = "responsive" : void 0 !== arguments[1] && (n = "single")),
        "single" === n)
            r.options[o] = s;
        else if ("multiple" === n)
            i.each(o, function(i, e) {
                r.options[i] = e
            });
        else if ("responsive" === n)
            for (t in s)
                if ("array" !== i.type(r.options.responsive))
                    r.options.responsive = [s[t]];
                else {
                    for (e = r.options.responsive.length - 1; e >= 0; )
                        r.options.responsive[e].breakpoint === s[t].breakpoint && r.options.responsive.splice(e, 1),
                        e--;
                    r.options.responsive.push(s[t])
                }
        l && (r.unload(),
        r.reinit())
    }
    ,
    e.prototype.setPosition = function() {
        var i = this;
        i.setDimensions(),
        i.setHeight(),
        !1 === i.options.fade ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(),
        i.$slider.trigger("setPosition", [i])
    }
    ,
    e.prototype.setProps = function() {
        var i = this
          , e = document.body.style;
        i.positionProp = !0 === i.options.vertical ? "top" : "left",
        "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"),
        void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === i.options.useCSS && (i.cssTransitions = !0),
        i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex),
        void 0 !== e.OTransform && (i.animType = "OTransform",
        i.transformType = "-o-transform",
        i.transitionType = "OTransition",
        void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)),
        void 0 !== e.MozTransform && (i.animType = "MozTransform",
        i.transformType = "-moz-transform",
        i.transitionType = "MozTransition",
        void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)),
        void 0 !== e.webkitTransform && (i.animType = "webkitTransform",
        i.transformType = "-webkit-transform",
        i.transitionType = "webkitTransition",
        void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)),
        void 0 !== e.msTransform && (i.animType = "msTransform",
        i.transformType = "-ms-transform",
        i.transitionType = "msTransition",
        void 0 === e.msTransform && (i.animType = !1)),
        void 0 !== e.transform && !1 !== i.animType && (i.animType = "transform",
        i.transformType = "transform",
        i.transitionType = "transition"),
        i.transformsEnabled = i.options.useTransform && null !== i.animType && !1 !== i.animType
    }
    ,
    e.prototype.setSlideClasses = function(i) {
        var e, t, o, s, n = this;
        if (t = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"),
        n.$slides.eq(i).addClass("slick-current"),
        !0 === n.options.centerMode) {
            var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
            e = Math.floor(n.options.slidesToShow / 2),
            !0 === n.options.infinite && (i >= e && i <= n.slideCount - 1 - e ? n.$slides.slice(i - e + r, i + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + i,
            t.slice(o - e + 1 + r, o + e + 2).addClass("slick-active").attr("aria-hidden", "false")),
            0 === i ? t.eq(t.length - 1 - n.options.slidesToShow).addClass("slick-center") : i === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("slick-center")),
            n.$slides.eq(i).addClass("slick-center")
        } else
            i >= 0 && i <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(i, i + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : t.length <= n.options.slidesToShow ? t.addClass("slick-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow,
            o = !0 === n.options.infinite ? n.options.slidesToShow + i : i,
            n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - i < n.options.slidesToShow ? t.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active").attr("aria-hidden", "false") : t.slice(o, o + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
        "ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad || n.lazyLoad()
    }
    ,
    e.prototype.setupInfinite = function() {
        var e, t, o, s = this;
        if (!0 === s.options.fade && (s.options.centerMode = !1),
        !0 === s.options.infinite && !1 === s.options.fade && (t = null,
        s.slideCount > s.options.slidesToShow)) {
            for (o = !0 === s.options.centerMode ? s.options.slidesToShow + 1 : s.options.slidesToShow,
            e = s.slideCount; e > s.slideCount - o; e -= 1)
                t = e - 1,
                i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");
            for (e = 0; e < o + s.slideCount; e += 1)
                t = e,
                i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");
            s.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                i(this).attr("id", "")
            })
        }
    }
    ,
    e.prototype.interrupt = function(i) {
        var e = this;
        i || e.autoPlay(),
        e.interrupted = i
    }
    ,
    e.prototype.selectHandler = function(e) {
        var t = this
          , o = i(e.target).is(".slick-slide") ? i(e.target) : i(e.target).parents(".slick-slide")
          , s = parseInt(o.attr("data-slick-index"));
        s || (s = 0),
        t.slideCount <= t.options.slidesToShow ? t.slideHandler(s, !1, !0) : t.slideHandler(s)
    }
    ,
    e.prototype.slideHandler = function(i, e, t) {
        var o, s, n, r, l, d = null, a = this;
        if (e = e || !1,
        !(!0 === a.animating && !0 === a.options.waitForAnimate || !0 === a.options.fade && a.currentSlide === i))
            if (!1 === e && a.asNavFor(i),
            o = i,
            d = a.getLeft(o),
            r = a.getLeft(a.currentSlide),
            a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft,
            !1 === a.options.infinite && !1 === a.options.centerMode && (i < 0 || i > a.getDotCount() * a.options.slidesToScroll))
                !1 === a.options.fade && (o = a.currentSlide,
                !0 !== t ? a.animateSlide(r, function() {
                    a.postSlide(o)
                }) : a.postSlide(o));
            else if (!1 === a.options.infinite && !0 === a.options.centerMode && (i < 0 || i > a.slideCount - a.options.slidesToScroll))
                !1 === a.options.fade && (o = a.currentSlide,
                !0 !== t ? a.animateSlide(r, function() {
                    a.postSlide(o)
                }) : a.postSlide(o));
            else {
                if (a.options.autoplay && clearInterval(a.autoPlayTimer),
                s = o < 0 ? a.slideCount % a.options.slidesToScroll != 0 ? a.slideCount - a.slideCount % a.options.slidesToScroll : a.slideCount + o : o >= a.slideCount ? a.slideCount % a.options.slidesToScroll != 0 ? 0 : o - a.slideCount : o,
                a.animating = !0,
                a.$slider.trigger("beforeChange", [a, a.currentSlide, s]),
                n = a.currentSlide,
                a.currentSlide = s,
                a.setSlideClasses(a.currentSlide),
                a.options.asNavFor && (l = (l = a.getNavTarget()).slick("getSlick")).slideCount <= l.options.slidesToShow && l.setSlideClasses(a.currentSlide),
                a.updateDots(),
                a.updateArrows(),
                !0 === a.options.fade)
                    return !0 !== t ? (a.fadeSlideOut(n),
                    a.fadeSlide(s, function() {
                        a.postSlide(s)
                    })) : a.postSlide(s),
                    void a.animateHeight();
                !0 !== t ? a.animateSlide(d, function() {
                    a.postSlide(s)
                }) : a.postSlide(s)
            }
    }
    ,
    e.prototype.startLoad = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(),
        i.$nextArrow.hide()),
        !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.hide(),
        i.$slider.addClass("slick-loading")
    }
    ,
    e.prototype.swipeDirection = function() {
        var i, e, t, o, s = this;
        return i = s.touchObject.startX - s.touchObject.curX,
        e = s.touchObject.startY - s.touchObject.curY,
        t = Math.atan2(e, i),
        (o = Math.round(180 * t / Math.PI)) < 0 && (o = 360 - Math.abs(o)),
        o <= 45 && o >= 0 ? !1 === s.options.rtl ? "left" : "right" : o <= 360 && o >= 315 ? !1 === s.options.rtl ? "left" : "right" : o >= 135 && o <= 225 ? !1 === s.options.rtl ? "right" : "left" : !0 === s.options.verticalSwiping ? o >= 35 && o <= 135 ? "down" : "up" : "vertical"
    }
    ,
    e.prototype.swipeEnd = function(i) {
        var e, t, o = this;
        if (o.dragging = !1,
        o.swiping = !1,
        o.scrolling)
            return o.scrolling = !1,
            !1;
        if (o.interrupted = !1,
        o.shouldClick = !(o.touchObject.swipeLength > 10),
        void 0 === o.touchObject.curX)
            return !1;
        if (!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [o, o.swipeDirection()]),
        o.touchObject.swipeLength >= o.touchObject.minSwipe) {
            switch (t = o.swipeDirection()) {
            case "left":
            case "down":
                e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(),
                o.currentDirection = 0;
                break;
            case "right":
            case "up":
                e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(),
                o.currentDirection = 1
            }
            "vertical" != t && (o.slideHandler(e),
            o.touchObject = {},
            o.$slider.trigger("swipe", [o, t]))
        } else
            o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide),
            o.touchObject = {})
    }
    ,
    e.prototype.swipeHandler = function(i) {
        var e = this;
        if (!(!1 === e.options.swipe || "ontouchend"in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== i.type.indexOf("mouse")))
            switch (e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1,
            e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold,
            !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold),
            i.data.action) {
            case "start":
                e.swipeStart(i);
                break;
            case "move":
                e.swipeMove(i);
                break;
            case "end":
                e.swipeEnd(i)
            }
    }
    ,
    e.prototype.swipeMove = function(i) {
        var e, t, o, s, n, r, l = this;
        return n = void 0 !== i.originalEvent ? i.originalEvent.touches : null,
        !(!l.dragging || l.scrolling || n && 1 !== n.length) && (e = l.getLeft(l.currentSlide),
        l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX,
        l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY,
        l.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))),
        r = Math.round(Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))),
        !l.options.verticalSwiping && !l.swiping && r > 4 ? (l.scrolling = !0,
        !1) : (!0 === l.options.verticalSwiping && (l.touchObject.swipeLength = r),
        t = l.swipeDirection(),
        void 0 !== i.originalEvent && l.touchObject.swipeLength > 4 && (l.swiping = !0,
        i.preventDefault()),
        s = (!1 === l.options.rtl ? 1 : -1) * (l.touchObject.curX > l.touchObject.startX ? 1 : -1),
        !0 === l.options.verticalSwiping && (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1),
        o = l.touchObject.swipeLength,
        l.touchObject.edgeHit = !1,
        !1 === l.options.infinite && (0 === l.currentSlide && "right" === t || l.currentSlide >= l.getDotCount() && "left" === t) && (o = l.touchObject.swipeLength * l.options.edgeFriction,
        l.touchObject.edgeHit = !0),
        !1 === l.options.vertical ? l.swipeLeft = e + o * s : l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s,
        !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s),
        !0 !== l.options.fade && !1 !== l.options.touchMove && (!0 === l.animating ? (l.swipeLeft = null,
        !1) : void l.setCSS(l.swipeLeft))))
    }
    ,
    e.prototype.swipeStart = function(i) {
        var e, t = this;
        if (t.interrupted = !0,
        1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow)
            return t.touchObject = {},
            !1;
        void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]),
        t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX,
        t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY,
        t.dragging = !0
    }
    ,
    e.prototype.unfilterSlides = e.prototype.slickUnfilter = function() {
        var i = this;
        null !== i.$slidesCache && (i.unload(),
        i.$slideTrack.children(this.options.slide).detach(),
        i.$slidesCache.appendTo(i.$slideTrack),
        i.reinit())
    }
    ,
    e.prototype.unload = function() {
        var e = this;
        i(".slick-cloned", e.$slider).remove(),
        e.$dots && e.$dots.remove(),
        e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(),
        e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(),
        e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }
    ,
    e.prototype.unslick = function(i) {
        var e = this;
        e.$slider.trigger("unslick", [e, i]),
        e.destroy()
    }
    ,
    e.prototype.updateArrows = function() {
        var i = this;
        Math.floor(i.options.slidesToShow / 2),
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && !i.options.infinite && (i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
        i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
        0 === i.currentSlide ? (i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - i.options.slidesToShow && !1 === i.options.centerMode ? (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - 1 && !0 === i.options.centerMode && (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }
    ,
    e.prototype.updateDots = function() {
        var i = this;
        null !== i.$dots && (i.$dots.find("li").removeClass("slick-active").end(),
        i.$dots.find("li").eq(Math.floor(i.currentSlide / i.options.slidesToScroll)).addClass("slick-active"))
    }
    ,
    e.prototype.visibility = function() {
        var i = this;
        i.options.autoplay && (document[i.hidden] ? i.interrupted = !0 : i.interrupted = !1)
    }
    ,
    i.fn.slick = function() {
        var i, t, o = this, s = arguments[0], n = Array.prototype.slice.call(arguments, 1), r = o.length;
        for (i = 0; i < r; i++)
            if ("object" == typeof s || void 0 === s ? o[i].slick = new e(o[i],s) : t = o[i].slick[s].apply(o[i].slick, n),
            void 0 !== t)
                return t;
        return o
    }
});
;;!function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function(e) {
    "use strict";
    var o = !1
      , t = !1
      , r = 0
      , i = 2e3
      , s = 0
      , n = e
      , l = document
      , a = window
      , c = n(a)
      , d = []
      , u = a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame || !1
      , h = a.cancelAnimationFrame || a.webkitCancelAnimationFrame || a.mozCancelAnimationFrame || !1;
    if (u)
        a.cancelAnimationFrame || (h = function(e) {}
        );
    else {
        var p = 0;
        u = function(e, o) {
            var t = (new Date).getTime()
              , r = Math.max(0, 16 - (t - p))
              , i = a.setTimeout(function() {
                e(t + r)
            }, r);
            return p = t + r,
            i
        }
        ,
        h = function(e) {
            a.clearTimeout(e)
        }
    }
    var m = a.MutationObserver || a.WebKitMutationObserver || !1
      , f = Date.now || function() {
        return (new Date).getTime()
    }
      , g = {
        zindex: "auto",
        cursoropacitymin: 0,
        cursoropacitymax: 1,
        cursorcolor: "#424242",
        cursorwidth: "6px",
        cursorborder: "1px solid #fff",
        cursorborderradius: "5px",
        scrollspeed: 40,
        mousescrollstep: 27,
        touchbehavior: !1,
        emulatetouch: !1,
        hwacceleration: !0,
        usetransition: !0,
        boxzoom: !1,
        dblclickzoom: !0,
        gesturezoom: !0,
        grabcursorenabled: !0,
        autohidemode: !0,
        background: "",
        iframeautoresize: !0,
        cursorminheight: 32,
        preservenativescrolling: !0,
        railoffset: !1,
        railhoffset: !1,
        bouncescroll: !0,
        spacebarenabled: !0,
        railpadding: {
            top: 0,
            right: 0,
            left: 0,
            bottom: 0
        },
        disableoutline: !0,
        horizrailenabled: !0,
        railalign: "right",
        railvalign: "bottom",
        enabletranslate3d: !0,
        enablemousewheel: !0,
        enablekeyboard: !0,
        smoothscroll: !0,
        sensitiverail: !0,
        enablemouselockapi: !0,
        cursorfixedheight: !1,
        directionlockdeadzone: 6,
        hidecursordelay: 400,
        nativeparentscrolling: !0,
        enablescrollonselection: !0,
        overflowx: !0,
        overflowy: !0,
        cursordragspeed: .3,
        rtlmode: "auto",
        cursordragontouch: !1,
        oneaxismousemode: "auto",
        scriptpath: function() {
            var e = l.currentScript || function() {
                var e = l.getElementsByTagName("script");
                return !!e.length && e[e.length - 1]
            }()
              , o = e ? e.src.split("?")[0] : "";
            return o.split("/").length > 0 ? o.split("/").slice(0, -1).join("/") + "/" : ""
        }(),
        preventmultitouchscrolling: !0,
        disablemutationobserver: !1,
        enableobserver: !0,
        scrollbarid: !1
    }
      , v = !1
      , w = function() {
        if (v)
            return v;
        var e = l.createElement("DIV")
          , o = e.style
          , t = navigator.userAgent
          , r = navigator.platform
          , i = {};
        return i.haspointerlock = "pointerLockElement"in l || "webkitPointerLockElement"in l || "mozPointerLockElement"in l,
        i.isopera = "opera"in a,
        i.isopera12 = i.isopera && "getUserMedia"in navigator,
        i.isoperamini = "[object OperaMini]" === Object.prototype.toString.call(a.operamini),
        i.isie = "all"in l && "attachEvent"in e && !i.isopera,
        i.isieold = i.isie && !("msInterpolationMode"in o),
        i.isie7 = i.isie && !i.isieold && (!("documentMode"in l) || 7 === l.documentMode),
        i.isie8 = i.isie && "documentMode"in l && 8 === l.documentMode,
        i.isie9 = i.isie && "performance"in a && 9 === l.documentMode,
        i.isie10 = i.isie && "performance"in a && 10 === l.documentMode,
        i.isie11 = "msRequestFullscreen"in e && l.documentMode >= 11,
        i.ismsedge = "msCredentials"in a,
        i.ismozilla = "MozAppearance"in o,
        i.iswebkit = !i.ismsedge && "WebkitAppearance"in o,
        i.ischrome = i.iswebkit && "chrome"in a,
        i.ischrome38 = i.ischrome && "touchAction"in o,
        i.ischrome22 = !i.ischrome38 && i.ischrome && i.haspointerlock,
        i.ischrome26 = !i.ischrome38 && i.ischrome && "transition"in o,
        i.cantouch = "ontouchstart"in l.documentElement || "ontouchstart"in a,
        i.hasw3ctouch = (a.PointerEvent || !1) && (navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0),
        i.hasmstouch = !i.hasw3ctouch && (a.MSPointerEvent || !1),
        i.ismac = /^mac$/i.test(r),
        i.isios = i.cantouch && /iphone|ipad|ipod/i.test(r),
        i.isios4 = i.isios && !("seal"in Object),
        i.isios7 = i.isios && "webkitHidden"in l,
        i.isios8 = i.isios && "hidden"in l,
        i.isios10 = i.isios && a.Proxy,
        i.isandroid = /android/i.test(t),
        i.haseventlistener = "addEventListener"in e,
        i.trstyle = !1,
        i.hastransform = !1,
        i.hastranslate3d = !1,
        i.transitionstyle = !1,
        i.hastransition = !1,
        i.transitionend = !1,
        i.trstyle = "transform",
        i.hastransform = "transform"in o || function() {
            for (var e = ["msTransform", "webkitTransform", "MozTransform", "OTransform"], t = 0, r = e.length; t < r; t++)
                if (void 0 !== o[e[t]]) {
                    i.trstyle = e[t];
                    break
                }
            i.hastransform = !!i.trstyle
        }(),
        i.hastransform && (o[i.trstyle] = "translate3d(1px,2px,3px)",
        i.hastranslate3d = /translate3d/.test(o[i.trstyle])),
        i.transitionstyle = "transition",
        i.prefixstyle = "",
        i.transitionend = "transitionend",
        i.hastransition = "transition"in o || function() {
            i.transitionend = !1;
            for (var e = ["webkitTransition", "msTransition", "MozTransition", "OTransition", "OTransition", "KhtmlTransition"], t = ["-webkit-", "-ms-", "-moz-", "-o-", "-o", "-khtml-"], r = ["webkitTransitionEnd", "msTransitionEnd", "transitionend", "otransitionend", "oTransitionEnd", "KhtmlTransitionEnd"], s = 0, n = e.length; s < n; s++)
                if (e[s]in o) {
                    i.transitionstyle = e[s],
                    i.prefixstyle = t[s],
                    i.transitionend = r[s];
                    break
                }
            i.ischrome26 && (i.prefixstyle = t[1]),
            i.hastransition = i.transitionstyle
        }(),
        i.cursorgrabvalue = function() {
            var e = ["grab", "-webkit-grab", "-moz-grab"];
            (i.ischrome && !i.ischrome38 || i.isie) && (e = []);
            for (var t = 0, r = e.length; t < r; t++) {
                var s = e[t];
                if (o.cursor = s,
                o.cursor == s)
                    return s
            }
            return "url(https://cdnjs.cloudflare.com/ajax/libs/slider-pro/1.3.0/css/images/openhand.cur),n-resize"
        }(),
        i.hasmousecapture = "setCapture"in e,
        i.hasMutationObserver = !1 !== m,
        e = null,
        v = i,
        i
    }
      , b = function(e, p) {
        function v() {
            var e = T.doc.css(P.trstyle);
            return !(!e || "matrix" != e.substr(0, 6)) && e.replace(/^.*\((.*)\)$/g, "$1").replace(/px/g, "").split(/, +/)
        }
        function b() {
            var e = T.win;
            if ("zIndex"in e)
                return e.zIndex();
            for (; e.length > 0; ) {
                if (9 == e[0].nodeType)
                    return !1;
                var o = e.css("zIndex");
                if (!isNaN(o) && 0 !== o)
                    return parseInt(o);
                e = e.parent()
            }
            return !1
        }
        function x(e, o, t) {
            var r = e.css(o)
              , i = parseFloat(r);
            if (isNaN(i)) {
                var s = 3 == (i = I[r] || 0) ? t ? T.win.outerHeight() - T.win.innerHeight() : T.win.outerWidth() - T.win.innerWidth() : 1;
                return T.isie8 && i && (i += 1),
                s ? i : 0
            }
            return i
        }
        function S(e, o, t, r) {
            T._bind(e, o, function(r) {
                var i = {
                    original: r = r || a.event,
                    target: r.target || r.srcElement,
                    type: "wheel",
                    deltaMode: "MozMousePixelScroll" == r.type ? 0 : 1,
                    deltaX: 0,
                    deltaZ: 0,
                    preventDefault: function() {
                        return r.preventDefault ? r.preventDefault() : r.returnValue = !1,
                        !1
                    },
                    stopImmediatePropagation: function() {
                        r.stopImmediatePropagation ? r.stopImmediatePropagation() : r.cancelBubble = !0
                    }
                };
                return "mousewheel" == o ? (r.wheelDeltaX && (i.deltaX = -.025 * r.wheelDeltaX),
                r.wheelDeltaY && (i.deltaY = -.025 * r.wheelDeltaY),
                !i.deltaY && !i.deltaX && (i.deltaY = -.025 * r.wheelDelta)) : i.deltaY = r.detail,
                t.call(e, i)
            }, r)
        }
        function z(e, o, t, r) {
            T.scrollrunning || (T.newscrolly = T.getScrollTop(),
            T.newscrollx = T.getScrollLeft(),
            D = f());
            var i = f() - D;
            if (D = f(),
            i > 350 ? A = 1 : A += (2 - A) / 10,
            e = e * A | 0,
            o = o * A | 0,
            e) {
                if (r)
                    if (e < 0) {
                        if (T.getScrollLeft() >= T.page.maxw)
                            return !0
                    } else if (T.getScrollLeft() <= 0)
                        return !0;
                var s = e > 0 ? 1 : -1;
                X !== s && (T.scrollmom && T.scrollmom.stop(),
                T.newscrollx = T.getScrollLeft(),
                X = s),
                T.lastdeltax -= e
            }
            if (o) {
                if (function() {
                    var e = T.getScrollTop();
                    if (o < 0) {
                        if (e >= T.page.maxh)
                            return !0
                    } else if (e <= 0)
                        return !0
                }()) {
                    if (M.nativeparentscrolling && t && !T.ispage && !T.zoomactive)
                        return !0;
                    var n = T.view.h >> 1;
                    T.newscrolly < -n ? (T.newscrolly = -n,
                    o = -1) : T.newscrolly > T.page.maxh + n ? (T.newscrolly = T.page.maxh + n,
                    o = 1) : o = 0
                }
                var l = o > 0 ? 1 : -1;
                B !== l && (T.scrollmom && T.scrollmom.stop(),
                T.newscrolly = T.getScrollTop(),
                B = l),
                T.lastdeltay -= o
            }
            (o || e) && T.synched("relativexy", function() {
                var e = T.lastdeltay + T.newscrolly;
                T.lastdeltay = 0;
                var o = T.lastdeltax + T.newscrollx;
                T.lastdeltax = 0,
                T.rail.drag || T.doScrollPos(o, e)
            })
        }
        function k(e, o, t) {
            var r, i;
            return !(t || !q) || (0 === e.deltaMode ? (r = -e.deltaX * (M.mousescrollstep / 54) | 0,
            i = -e.deltaY * (M.mousescrollstep / 54) | 0) : 1 === e.deltaMode && (r = -e.deltaX * M.mousescrollstep * 50 / 80 | 0,
            i = -e.deltaY * M.mousescrollstep * 50 / 80 | 0),
            o && M.oneaxismousemode && 0 === r && i && (r = i,
            i = 0,
            t && (r < 0 ? T.getScrollLeft() >= T.page.maxw : T.getScrollLeft() <= 0) && (i = r,
            r = 0)),
            T.isrtlmode && (r = -r),
            z(r, i, t, !0) ? void (t && (q = !0)) : (q = !1,
            e.stopImmediatePropagation(),
            e.preventDefault()))
        }
        var T = this;
        this.version = "3.7.6",
        this.name = "nicescroll",
        this.me = p;
        var E = n("body")
          , M = this.opt = {
            doc: E,
            win: !1
        };
        if (n.extend(M, g),
        M.snapbackspeed = 80,
        e)
            for (var L in M)
                void 0 !== e[L] && (M[L] = e[L]);
        if (M.disablemutationobserver && (m = !1),
        this.doc = M.doc,
        this.iddoc = this.doc && this.doc[0] ? this.doc[0].id || "" : "",
        this.ispage = /^BODY|HTML/.test(M.win ? M.win[0].nodeName : this.doc[0].nodeName),
        this.haswrapper = !1 !== M.win,
        this.win = M.win || (this.ispage ? c : this.doc),
        this.docscroll = this.ispage && !this.haswrapper ? c : this.win,
        this.body = E,
        this.viewport = !1,
        this.isfixed = !1,
        this.iframe = !1,
        this.isiframe = "IFRAME" == this.doc[0].nodeName && "IFRAME" == this.win[0].nodeName,
        this.istextarea = "TEXTAREA" == this.win[0].nodeName,
        this.forcescreen = !1,
        this.canshowonmouseevent = "scroll" != M.autohidemode,
        this.onmousedown = !1,
        this.onmouseup = !1,
        this.onmousemove = !1,
        this.onmousewheel = !1,
        this.onkeypress = !1,
        this.ongesturezoom = !1,
        this.onclick = !1,
        this.onscrollstart = !1,
        this.onscrollend = !1,
        this.onscrollcancel = !1,
        this.onzoomin = !1,
        this.onzoomout = !1,
        this.view = !1,
        this.page = !1,
        this.scroll = {
            x: 0,
            y: 0
        },
        this.scrollratio = {
            x: 0,
            y: 0
        },
        this.cursorheight = 20,
        this.scrollvaluemax = 0,
        "auto" == M.rtlmode) {
            var C = this.win[0] == a ? this.body : this.win
              , N = C.css("writing-mode") || C.css("-webkit-writing-mode") || C.css("-ms-writing-mode") || C.css("-moz-writing-mode");
            "horizontal-tb" == N || "lr-tb" == N || "" === N ? (this.isrtlmode = "rtl" == C.css("direction"),
            this.isvertical = !1) : (this.isrtlmode = "vertical-rl" == N || "tb" == N || "tb-rl" == N || "rl-tb" == N,
            this.isvertical = "vertical-rl" == N || "tb" == N || "tb-rl" == N)
        } else
            this.isrtlmode = !0 === M.rtlmode,
            this.isvertical = !1;
        if (this.scrollrunning = !1,
        this.scrollmom = !1,
        this.observer = !1,
        this.observerremover = !1,
        this.observerbody = !1,
        !1 !== M.scrollbarid)
            this.id = M.scrollbarid;
        else
            do {
                this.id = "ascrail" + i++
            } while (l.getElementById(this.id));this.rail = !1,
        this.cursor = !1,
        this.cursorfreezed = !1,
        this.selectiondrag = !1,
        this.zoom = !1,
        this.zoomactive = !1,
        this.hasfocus = !1,
        this.hasmousefocus = !1,
        this.railslocked = !1,
        this.locked = !1,
        this.hidden = !1,
        this.cursoractive = !0,
        this.wheelprevented = !1,
        this.overflowx = M.overflowx,
        this.overflowy = M.overflowy,
        this.nativescrollingarea = !1,
        this.checkarea = 0,
        this.events = [],
        this.saved = {},
        this.delaylist = {},
        this.synclist = {},
        this.lastdeltax = 0,
        this.lastdeltay = 0,
        this.detected = w();
        var P = n.extend({}, this.detected);
        this.canhwscroll = P.hastransform && M.hwacceleration,
        this.ishwscroll = this.canhwscroll && T.haswrapper,
        this.isrtlmode ? this.isvertical ? this.hasreversehr = !(P.iswebkit || P.isie || P.isie11) : this.hasreversehr = !(P.iswebkit || P.isie && !P.isie10 && !P.isie11) : this.hasreversehr = !1,
        this.istouchcapable = !1,
        P.cantouch || !P.hasw3ctouch && !P.hasmstouch ? !P.cantouch || P.isios || P.isandroid || !P.iswebkit && !P.ismozilla || (this.istouchcapable = !0) : this.istouchcapable = !0,
        M.enablemouselockapi || (P.hasmousecapture = !1,
        P.haspointerlock = !1),
        this.debounced = function(e, o, t) {
            T && (T.delaylist[e] || !1 || (T.delaylist[e] = {
                h: u(function() {
                    T.delaylist[e].fn.call(T),
                    T.delaylist[e] = !1
                }, t)
            },
            o.call(T)),
            T.delaylist[e].fn = o)
        }
        ,
        this.synched = function(e, o) {
            T.synclist[e] ? T.synclist[e] = o : (T.synclist[e] = o,
            u(function() {
                T && (T.synclist[e] && T.synclist[e].call(T),
                T.synclist[e] = null)
            }))
        }
        ,
        this.unsynched = function(e) {
            T.synclist[e] && (T.synclist[e] = !1)
        }
        ,
        this.css = function(e, o) {
            for (var t in o)
                T.saved.css.push([e, t, e.css(t)]),
                e.css(t, o[t])
        }
        ,
        this.scrollTop = function(e) {
            return void 0 === e ? T.getScrollTop() : T.setScrollTop(e)
        }
        ,
        this.scrollLeft = function(e) {
            return void 0 === e ? T.getScrollLeft() : T.setScrollLeft(e)
        }
        ;
        var R = function(e, o, t, r, i, s, n) {
            this.st = e,
            this.ed = o,
            this.spd = t,
            this.p1 = r || 0,
            this.p2 = i || 1,
            this.p3 = s || 0,
            this.p4 = n || 1,
            this.ts = f(),
            this.df = o - e
        };
        if (R.prototype = {
            B2: function(e) {
                return 3 * (1 - e) * (1 - e) * e
            },
            B3: function(e) {
                return 3 * (1 - e) * e * e
            },
            B4: function(e) {
                return e * e * e
            },
            getPos: function() {
                return (f() - this.ts) / this.spd
            },
            getNow: function() {
                var e = (f() - this.ts) / this.spd
                  , o = this.B2(e) + this.B3(e) + this.B4(e);
                return e >= 1 ? this.ed : this.st + this.df * o | 0
            },
            update: function(e, o) {
                return this.st = this.getNow(),
                this.ed = e,
                this.spd = o,
                this.ts = f(),
                this.df = this.ed - this.st,
                this
            }
        },
        this.ishwscroll) {
            this.doc.translate = {
                x: 0,
                y: 0,
                tx: "0px",
                ty: "0px"
            },
            P.hastranslate3d && P.isios && this.doc.css("-webkit-backface-visibility", "hidden"),
            this.getScrollTop = function(e) {
                if (!e) {
                    var o = v();
                    if (o)
                        return 16 == o.length ? -o[13] : -o[5];
                    if (T.timerscroll && T.timerscroll.bz)
                        return T.timerscroll.bz.getNow()
                }
                return T.doc.translate.y
            }
            ,
            this.getScrollLeft = function(e) {
                if (!e) {
                    var o = v();
                    if (o)
                        return 16 == o.length ? -o[12] : -o[4];
                    if (T.timerscroll && T.timerscroll.bh)
                        return T.timerscroll.bh.getNow()
                }
                return T.doc.translate.x
            }
            ,
            this.notifyScrollEvent = function(e) {
                var o = l.createEvent("UIEvents");
                o.initUIEvent("scroll", !1, !1, a, 1),
                o.niceevent = !0,
                e.dispatchEvent(o)
            }
            ;
            var _ = this.isrtlmode ? 1 : -1;
            P.hastranslate3d && M.enabletranslate3d ? (this.setScrollTop = function(e, o) {
                T.doc.translate.y = e,
                T.doc.translate.ty = -1 * e + "px",
                T.doc.css(P.trstyle, "translate3d(" + T.doc.translate.tx + "," + T.doc.translate.ty + ",0)"),
                o || T.notifyScrollEvent(T.win[0])
            }
            ,
            this.setScrollLeft = function(e, o) {
                T.doc.translate.x = e,
                T.doc.translate.tx = e * _ + "px",
                T.doc.css(P.trstyle, "translate3d(" + T.doc.translate.tx + "," + T.doc.translate.ty + ",0)"),
                o || T.notifyScrollEvent(T.win[0])
            }
            ) : (this.setScrollTop = function(e, o) {
                T.doc.translate.y = e,
                T.doc.translate.ty = -1 * e + "px",
                T.doc.css(P.trstyle, "translate(" + T.doc.translate.tx + "," + T.doc.translate.ty + ")"),
                o || T.notifyScrollEvent(T.win[0])
            }
            ,
            this.setScrollLeft = function(e, o) {
                T.doc.translate.x = e,
                T.doc.translate.tx = e * _ + "px",
                T.doc.css(P.trstyle, "translate(" + T.doc.translate.tx + "," + T.doc.translate.ty + ")"),
                o || T.notifyScrollEvent(T.win[0])
            }
            )
        } else
            this.getScrollTop = function() {
                return T.docscroll.scrollTop()
            }
            ,
            this.setScrollTop = function(e) {
                T.docscroll.scrollTop(e)
            }
            ,
            this.getScrollLeft = function() {
                return T.hasreversehr ? T.detected.ismozilla ? T.page.maxw - Math.abs(T.docscroll.scrollLeft()) : T.page.maxw - T.docscroll.scrollLeft() : T.docscroll.scrollLeft()
            }
            ,
            this.setScrollLeft = function(e) {
                return setTimeout(function() {
                    if (T)
                        return T.hasreversehr && (e = T.detected.ismozilla ? -(T.page.maxw - e) : T.page.maxw - e),
                        T.docscroll.scrollLeft(e)
                }, 1)
            }
            ;
        this.getTarget = function(e) {
            return !!e && (e.target ? e.target : !!e.srcElement && e.srcElement)
        }
        ,
        this.hasParent = function(e, o) {
            if (!e)
                return !1;
            for (var t = e.target || e.srcElement || e || !1; t && t.id != o; )
                t = t.parentNode || !1;
            return !1 !== t
        }
        ;
        var I = {
            thin: 1,
            medium: 3,
            thick: 5
        };
        this.getDocumentScrollOffset = function() {
            return {
                top: a.pageYOffset || l.documentElement.scrollTop,
                left: a.pageXOffset || l.documentElement.scrollLeft
            }
        }
        ,
        this.getOffset = function() {
            if (T.isfixed) {
                var e = T.win.offset()
                  , o = T.getDocumentScrollOffset();
                return e.top -= o.top,
                e.left -= o.left,
                e
            }
            var t = T.win.offset();
            if (!T.viewport)
                return t;
            var r = T.viewport.offset();
            return {
                top: t.top - r.top,
                left: t.left - r.left
            }
        }
        ,
        this.updateScrollBar = function(e) {
            var o, t;
            if (T.ishwscroll)
                T.rail.css({
                    height: T.win.innerHeight() - (M.railpadding.top + M.railpadding.bottom)
                }),
                T.railh && T.railh.css({
                    width: T.win.innerWidth() - (M.railpadding.left + M.railpadding.right)
                });
            else {
                var r = T.getOffset();
                if (o = {
                    top: r.top,
                    left: r.left - (M.railpadding.left + M.railpadding.right)
                },
                o.top += x(T.win, "border-top-width", !0),
                o.left += T.rail.align ? T.win.outerWidth() - x(T.win, "border-right-width") - T.rail.width : x(T.win, "border-left-width"),
                (t = M.railoffset) && (t.top && (o.top += t.top),
                t.left && (o.left += t.left)),
                T.railslocked || T.rail.css({
                    top: o.top,
                    left: o.left,
                    height: (e ? e.h : T.win.innerHeight()) - (M.railpadding.top + M.railpadding.bottom)
                }),
                T.zoom && T.zoom.css({
                    top: o.top + 1,
                    left: 1 == T.rail.align ? o.left - 20 : o.left + T.rail.width + 4
                }),
                T.railh && !T.railslocked) {
                    o = {
                        top: r.top,
                        left: r.left
                    },
                    (t = M.railhoffset) && (t.top && (o.top += t.top),
                    t.left && (o.left += t.left));
                    var i = T.railh.align ? o.top + x(T.win, "border-top-width", !0) + T.win.innerHeight() - T.railh.height : o.top + x(T.win, "border-top-width", !0)
                      , s = o.left + x(T.win, "border-left-width");
                    T.railh.css({
                        top: i - (M.railpadding.top + M.railpadding.bottom),
                        left: s,
                        width: T.railh.width
                    })
                }
            }
        }
        ,
        this.doRailClick = function(e, o, t) {
            var r, i, s, n;
            T.railslocked || (T.cancelEvent(e),
            "pageY"in e || (e.pageX = e.clientX + l.documentElement.scrollLeft,
            e.pageY = e.clientY + l.documentElement.scrollTop),
            o ? (r = t ? T.doScrollLeft : T.doScrollTop,
            s = t ? (e.pageX - T.railh.offset().left - T.cursorwidth / 2) * T.scrollratio.x : (e.pageY - T.rail.offset().top - T.cursorheight / 2) * T.scrollratio.y,
            T.unsynched("relativexy"),
            r(0 | s)) : (r = t ? T.doScrollLeftBy : T.doScrollBy,
            s = t ? T.scroll.x : T.scroll.y,
            n = t ? e.pageX - T.railh.offset().left : e.pageY - T.rail.offset().top,
            i = t ? T.view.w : T.view.h,
            r(s >= n ? i : -i)))
        }
        ,
        T.newscrolly = T.newscrollx = 0,
        T.hasanimationframe = "requestAnimationFrame"in a,
        T.hascancelanimationframe = "cancelAnimationFrame"in a,
        T.hasborderbox = !1,
        this.init = function() {
            if (T.saved.css = [],
            P.isoperamini)
                return !0;
            if (P.isandroid && !("hidden"in l))
                return !0;
            M.emulatetouch = M.emulatetouch || M.touchbehavior,
            T.hasborderbox = a.getComputedStyle && "border-box" === a.getComputedStyle(l.body)["box-sizing"];
            var e = {
                "overflow-y": "hidden"
            };
            if ((P.isie11 || P.isie10) && (e["-ms-overflow-style"] = "none"),
            T.ishwscroll && (this.doc.css(P.transitionstyle, P.prefixstyle + "transform 0ms ease-out"),
            P.transitionend && T.bind(T.doc, P.transitionend, T.onScrollTransitionEnd, !1)),
            T.zindex = "auto",
            T.ispage || "auto" != M.zindex ? T.zindex = M.zindex : T.zindex = b() || "auto",
            !T.ispage && "auto" != T.zindex && T.zindex > s && (s = T.zindex),
            T.isie && 0 === T.zindex && "auto" == M.zindex && (T.zindex = "auto"),
            !T.ispage || !P.isieold) {
                var i = T.docscroll;
                T.ispage && (i = T.haswrapper ? T.win : T.doc),
                T.css(i, e),
                T.ispage && (P.isie11 || P.isie) && T.css(n("html"), e),
                !P.isios || T.ispage || T.haswrapper || T.css(E, {
                    "-webkit-overflow-scrolling": "touch"
                });
                var d = n(l.createElement("div"));
                d.css({
                    position: "relative",
                    top: 0,
                    float: "right",
                    width: M.cursorwidth,
                    height: 0,
                    "background-color": M.cursorcolor,
                    border: M.cursorborder,
                    "background-clip": "padding-box",
                    "-webkit-border-radius": M.cursorborderradius,
                    "-moz-border-radius": M.cursorborderradius,
                    "border-radius": M.cursorborderradius
                }),
                d.addClass("nicescroll-cursors"),
                T.cursor = d;
                var u = n(l.createElement("div"));
                u.attr("id", T.id),
                u.addClass("nicescroll-rails nicescroll-rails-vr");
                var h, p, f = ["left", "right", "top", "bottom"];
                for (var g in f)
                    p = f[g],
                    (h = M.railpadding[p] || 0) && u.css("padding-" + p, h + "px");
                u.append(d),
                u.width = Math.max(parseFloat(M.cursorwidth), d.outerWidth()),
                u.css({
                    width: u.width + "px",
                    zIndex: T.zindex,
                    background: M.background,
                    cursor: "default"
                }),
                u.visibility = !0,
                u.scrollable = !0,
                u.align = "left" == M.railalign ? 0 : 1,
                T.rail = u,
                T.rail.drag = !1;
                var v = !1;
                !M.boxzoom || T.ispage || P.isieold || (v = l.createElement("div"),
                T.bind(v, "click", T.doZoom),
                T.bind(v, "mouseenter", function() {
                    T.zoom.css("opacity", M.cursoropacitymax)
                }),
                T.bind(v, "mouseleave", function() {
                    T.zoom.css("opacity", M.cursoropacitymin)
                }),
                T.zoom = n(v),
                T.zoom.css({
                    cursor: "pointer",
                    zIndex: T.zindex,
                    backgroundImage: "url(" + M.scriptpath + "zoomico.png)",
                    height: 18,
                    width: 18,
                    backgroundPosition: "0 0"
                }),
                M.dblclickzoom && T.bind(T.win, "dblclick", T.doZoom),
                P.cantouch && M.gesturezoom && (T.ongesturezoom = function(e) {
                    return e.scale > 1.5 && T.doZoomIn(e),
                    e.scale < .8 && T.doZoomOut(e),
                    T.cancelEvent(e)
                }
                ,
                T.bind(T.win, "gestureend", T.ongesturezoom))),
                T.railh = !1;
                var w;
                if (M.horizrailenabled && (T.css(i, {
                    overflowX: "hidden"
                }),
                (d = n(l.createElement("div"))).css({
                    position: "absolute",
                    top: 0,
                    height: M.cursorwidth,
                    width: 0,
                    backgroundColor: M.cursorcolor,
                    border: M.cursorborder,
                    backgroundClip: "padding-box",
                    "-webkit-border-radius": M.cursorborderradius,
                    "-moz-border-radius": M.cursorborderradius,
                    "border-radius": M.cursorborderradius
                }),
                P.isieold && d.css("overflow", "hidden"),
                d.addClass("nicescroll-cursors"),
                T.cursorh = d,
                (w = n(l.createElement("div"))).attr("id", T.id + "-hr"),
                w.addClass("nicescroll-rails nicescroll-rails-hr"),
                w.height = Math.max(parseFloat(M.cursorwidth), d.outerHeight()),
                w.css({
                    height: w.height + "px",
                    zIndex: T.zindex,
                    background: M.background
                }),
                w.append(d),
                w.visibility = !0,
                w.scrollable = !0,
                w.align = "top" == M.railvalign ? 0 : 1,
                T.railh = w,
                T.railh.drag = !1),
                T.ispage)
                    u.css({
                        position: "fixed",
                        top: 0,
                        height: "100%"
                    }),
                    u.css(u.align ? {
                        right: 0
                    } : {
                        left: 0
                    }),
                    T.body.append(u),
                    T.railh && (w.css({
                        position: "fixed",
                        left: 0,
                        width: "100%"
                    }),
                    w.css(w.align ? {
                        bottom: 0
                    } : {
                        top: 0
                    }),
                    T.body.append(w));
                else {
                    if (T.ishwscroll) {
                        "static" == T.win.css("position") && T.css(T.win, {
                            position: "relative"
                        });
                        var x = "HTML" == T.win[0].nodeName ? T.body : T.win;
                        n(x).scrollTop(0).scrollLeft(0),
                        T.zoom && (T.zoom.css({
                            position: "absolute",
                            top: 1,
                            right: 0,
                            "margin-right": u.width + 4
                        }),
                        x.append(T.zoom)),
                        u.css({
                            position: "absolute",
                            top: 0
                        }),
                        u.css(u.align ? {
                            right: 0
                        } : {
                            left: 0
                        }),
                        x.append(u),
                        w && (w.css({
                            position: "absolute",
                            left: 0,
                            bottom: 0
                        }),
                        w.css(w.align ? {
                            bottom: 0
                        } : {
                            top: 0
                        }),
                        x.append(w))
                    } else {
                        T.isfixed = "fixed" == T.win.css("position");
                        var S = T.isfixed ? "fixed" : "absolute";
                        T.isfixed || (T.viewport = T.getViewport(T.win[0])),
                        T.viewport && (T.body = T.viewport,
                        /fixed|absolute/.test(T.viewport.css("position")) || T.css(T.viewport, {
                            position: "relative"
                        })),
                        u.css({
                            position: S
                        }),
                        T.zoom && T.zoom.css({
                            position: S
                        }),
                        T.updateScrollBar(),
                        T.body.append(u),
                        T.zoom && T.body.append(T.zoom),
                        T.railh && (w.css({
                            position: S
                        }),
                        T.body.append(w))
                    }
                    P.isios && T.css(T.win, {
                        "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
                        "-webkit-touch-callout": "none"
                    }),
                    M.disableoutline && (P.isie && T.win.attr("hideFocus", "true"),
                    P.iswebkit && T.win.css("outline", "none"))
                }
                if (!1 === M.autohidemode ? (T.autohidedom = !1,
                T.rail.css({
                    opacity: M.cursoropacitymax
                }),
                T.railh && T.railh.css({
                    opacity: M.cursoropacitymax
                })) : !0 === M.autohidemode || "leave" === M.autohidemode ? (T.autohidedom = n().add(T.rail),
                P.isie8 && (T.autohidedom = T.autohidedom.add(T.cursor)),
                T.railh && (T.autohidedom = T.autohidedom.add(T.railh)),
                T.railh && P.isie8 && (T.autohidedom = T.autohidedom.add(T.cursorh))) : "scroll" == M.autohidemode ? (T.autohidedom = n().add(T.rail),
                T.railh && (T.autohidedom = T.autohidedom.add(T.railh))) : "cursor" == M.autohidemode ? (T.autohidedom = n().add(T.cursor),
                T.railh && (T.autohidedom = T.autohidedom.add(T.cursorh))) : "hidden" == M.autohidemode && (T.autohidedom = !1,
                T.hide(),
                T.railslocked = !1),
                P.cantouch || T.istouchcapable || M.emulatetouch || P.hasmstouch) {
                    T.scrollmom = new y(T);
                    T.ontouchstart = function(e) {
                        if (T.locked)
                            return !1;
                        if (e.pointerType && ("mouse" === e.pointerType || e.pointerType === e.MSPOINTER_TYPE_MOUSE))
                            return !1;
                        if (T.hasmoving = !1,
                        T.scrollmom.timer && (T.triggerScrollEnd(),
                        T.scrollmom.stop()),
                        !T.railslocked) {
                            var o = T.getTarget(e);
                            if (o && /INPUT/i.test(o.nodeName) && /range/i.test(o.type))
                                return T.stopPropagation(e);
                            var t = "mousedown" === e.type;
                            if (!("clientX"in e) && "changedTouches"in e && (e.clientX = e.changedTouches[0].clientX,
                            e.clientY = e.changedTouches[0].clientY),
                            T.forcescreen) {
                                var r = e;
                                (e = {
                                    original: e.original ? e.original : e
                                }).clientX = r.screenX,
                                e.clientY = r.screenY
                            }
                            if (T.rail.drag = {
                                x: e.clientX,
                                y: e.clientY,
                                sx: T.scroll.x,
                                sy: T.scroll.y,
                                st: T.getScrollTop(),
                                sl: T.getScrollLeft(),
                                pt: 2,
                                dl: !1,
                                tg: o
                            },
                            T.ispage || !M.directionlockdeadzone)
                                T.rail.drag.dl = "f";
                            else {
                                var i = {
                                    w: c.width(),
                                    h: c.height()
                                }
                                  , s = T.getContentSize()
                                  , l = s.h - i.h
                                  , a = s.w - i.w;
                                T.rail.scrollable && !T.railh.scrollable ? T.rail.drag.ck = l > 0 && "v" : !T.rail.scrollable && T.railh.scrollable ? T.rail.drag.ck = a > 0 && "h" : T.rail.drag.ck = !1
                            }
                            if (M.emulatetouch && T.isiframe && P.isie) {
                                var d = T.win.position();
                                T.rail.drag.x += d.left,
                                T.rail.drag.y += d.top
                            }
                            if (T.hasmoving = !1,
                            T.lastmouseup = !1,
                            T.scrollmom.reset(e.clientX, e.clientY),
                            o && t) {
                                if (!/INPUT|SELECT|BUTTON|TEXTAREA/i.test(o.nodeName))
                                    return P.hasmousecapture && o.setCapture(),
                                    M.emulatetouch ? (o.onclick && !o._onclick && (o._onclick = o.onclick,
                                    o.onclick = function(e) {
                                        if (T.hasmoving)
                                            return !1;
                                        o._onclick.call(this, e)
                                    }
                                    ),
                                    T.cancelEvent(e)) : T.stopPropagation(e);
                                /SUBMIT|CANCEL|BUTTON/i.test(n(o).attr("type")) && (T.preventclick = {
                                    tg: o,
                                    click: !1
                                })
                            }
                        }
                    }
                    ,
                    T.ontouchend = function(e) {
                        if (!T.rail.drag)
                            return !0;
                        if (2 == T.rail.drag.pt) {
                            if (e.pointerType && ("mouse" === e.pointerType || e.pointerType === e.MSPOINTER_TYPE_MOUSE))
                                return !1;
                            T.rail.drag = !1;
                            var o = "mouseup" === e.type;
                            if (T.hasmoving && (T.scrollmom.doMomentum(),
                            T.lastmouseup = !0,
                            T.hideCursor(),
                            P.hasmousecapture && l.releaseCapture(),
                            o))
                                return T.cancelEvent(e)
                        } else if (1 == T.rail.drag.pt)
                            return T.onmouseup(e)
                    }
                    ;
                    var z = M.emulatetouch && T.isiframe && !P.hasmousecapture
                      , k = .3 * M.directionlockdeadzone | 0;
                    T.ontouchmove = function(e, o) {
                        if (!T.rail.drag)
                            return !0;
                        if (e.targetTouches && M.preventmultitouchscrolling && e.targetTouches.length > 1)
                            return !0;
                        if (e.pointerType && ("mouse" === e.pointerType || e.pointerType === e.MSPOINTER_TYPE_MOUSE))
                            return !0;
                        if (2 == T.rail.drag.pt) {
                            "changedTouches"in e && (e.clientX = e.changedTouches[0].clientX,
                            e.clientY = e.changedTouches[0].clientY);
                            var t, r;
                            if (r = t = 0,
                            z && !o) {
                                var i = T.win.position();
                                r = -i.left,
                                t = -i.top
                            }
                            var s = e.clientY + t
                              , n = s - T.rail.drag.y
                              , a = e.clientX + r
                              , c = a - T.rail.drag.x
                              , d = T.rail.drag.st - n;
                            if (T.ishwscroll && M.bouncescroll)
                                d < 0 ? d = Math.round(d / 2) : d > T.page.maxh && (d = T.page.maxh + Math.round((d - T.page.maxh) / 2));
                            else if (d < 0 ? (d = 0,
                            s = 0) : d > T.page.maxh && (d = T.page.maxh,
                            s = 0),
                            0 === s && !T.hasmoving)
                                return T.ispage || (T.rail.drag = !1),
                                !0;
                            var u = T.getScrollLeft();
                            if (T.railh && T.railh.scrollable && (u = T.isrtlmode ? c - T.rail.drag.sl : T.rail.drag.sl - c,
                            T.ishwscroll && M.bouncescroll ? u < 0 ? u = Math.round(u / 2) : u > T.page.maxw && (u = T.page.maxw + Math.round((u - T.page.maxw) / 2)) : (u < 0 && (u = 0,
                            a = 0),
                            u > T.page.maxw && (u = T.page.maxw,
                            a = 0))),
                            !T.hasmoving) {
                                if (T.rail.drag.y === e.clientY && T.rail.drag.x === e.clientX)
                                    return T.cancelEvent(e);
                                var h = Math.abs(n)
                                  , p = Math.abs(c)
                                  , m = M.directionlockdeadzone;
                                if (T.rail.drag.ck ? "v" == T.rail.drag.ck ? p > m && h <= k ? T.rail.drag = !1 : h > m && (T.rail.drag.dl = "v") : "h" == T.rail.drag.ck && (h > m && p <= k ? T.rail.drag = !1 : p > m && (T.rail.drag.dl = "h")) : h > m && p > m ? T.rail.drag.dl = "f" : h > m ? T.rail.drag.dl = p > k ? "f" : "v" : p > m && (T.rail.drag.dl = h > k ? "f" : "h"),
                                !T.rail.drag.dl)
                                    return T.cancelEvent(e);
                                T.triggerScrollStart(e.clientX, e.clientY, 0, 0, 0),
                                T.hasmoving = !0
                            }
                            return T.preventclick && !T.preventclick.click && (T.preventclick.click = T.preventclick.tg.onclick || !1,
                            T.preventclick.tg.onclick = T.onpreventclick),
                            T.rail.drag.dl && ("v" == T.rail.drag.dl ? u = T.rail.drag.sl : "h" == T.rail.drag.dl && (d = T.rail.drag.st)),
                            T.synched("touchmove", function() {
                                T.rail.drag && 2 == T.rail.drag.pt && (T.prepareTransition && T.resetTransition(),
                                T.rail.scrollable && T.setScrollTop(d),
                                T.scrollmom.update(a, s),
                                T.railh && T.railh.scrollable ? (T.setScrollLeft(u),
                                T.showCursor(d, u)) : T.showCursor(d),
                                P.isie10 && l.selection.clear())
                            }),
                            T.cancelEvent(e)
                        }
                        return 1 == T.rail.drag.pt ? T.onmousemove(e) : void 0
                    }
                    ,
                    T.ontouchstartCursor = function(e, o) {
                        if (!T.rail.drag || 3 == T.rail.drag.pt) {
                            if (T.locked)
                                return T.cancelEvent(e);
                            T.cancelScroll(),
                            T.rail.drag = {
                                x: e.touches[0].clientX,
                                y: e.touches[0].clientY,
                                sx: T.scroll.x,
                                sy: T.scroll.y,
                                pt: 3,
                                hr: !!o
                            };
                            var t = T.getTarget(e);
                            return !T.ispage && P.hasmousecapture && t.setCapture(),
                            T.isiframe && !P.hasmousecapture && (T.saved.csspointerevents = T.doc.css("pointer-events"),
                            T.css(T.doc, {
                                "pointer-events": "none"
                            })),
                            T.cancelEvent(e)
                        }
                    }
                    ,
                    T.ontouchendCursor = function(e) {
                        if (T.rail.drag) {
                            if (P.hasmousecapture && l.releaseCapture(),
                            T.isiframe && !P.hasmousecapture && T.doc.css("pointer-events", T.saved.csspointerevents),
                            3 != T.rail.drag.pt)
                                return;
                            return T.rail.drag = !1,
                            T.cancelEvent(e)
                        }
                    }
                    ,
                    T.ontouchmoveCursor = function(e) {
                        if (T.rail.drag) {
                            if (3 != T.rail.drag.pt)
                                return;
                            if (T.cursorfreezed = !0,
                            T.rail.drag.hr) {
                                T.scroll.x = T.rail.drag.sx + (e.touches[0].clientX - T.rail.drag.x),
                                T.scroll.x < 0 && (T.scroll.x = 0);
                                var o = T.scrollvaluemaxw;
                                T.scroll.x > o && (T.scroll.x = o)
                            } else {
                                T.scroll.y = T.rail.drag.sy + (e.touches[0].clientY - T.rail.drag.y),
                                T.scroll.y < 0 && (T.scroll.y = 0);
                                var t = T.scrollvaluemax;
                                T.scroll.y > t && (T.scroll.y = t)
                            }
                            return T.synched("touchmove", function() {
                                T.rail.drag && 3 == T.rail.drag.pt && (T.showCursor(),
                                T.rail.drag.hr ? T.doScrollLeft(Math.round(T.scroll.x * T.scrollratio.x), M.cursordragspeed) : T.doScrollTop(Math.round(T.scroll.y * T.scrollratio.y), M.cursordragspeed))
                            }),
                            T.cancelEvent(e)
                        }
                    }
                }
                if (T.onmousedown = function(e, o) {
                    if (!T.rail.drag || 1 == T.rail.drag.pt) {
                        if (T.railslocked)
                            return T.cancelEvent(e);
                        T.cancelScroll(),
                        T.rail.drag = {
                            x: e.clientX,
                            y: e.clientY,
                            sx: T.scroll.x,
                            sy: T.scroll.y,
                            pt: 1,
                            hr: o || !1
                        };
                        var t = T.getTarget(e);
                        return P.hasmousecapture && t.setCapture(),
                        T.isiframe && !P.hasmousecapture && (T.saved.csspointerevents = T.doc.css("pointer-events"),
                        T.css(T.doc, {
                            "pointer-events": "none"
                        })),
                        T.hasmoving = !1,
                        T.cancelEvent(e)
                    }
                }
                ,
                T.onmouseup = function(e) {
                    if (T.rail.drag)
                        return 1 != T.rail.drag.pt || (P.hasmousecapture && l.releaseCapture(),
                        T.isiframe && !P.hasmousecapture && T.doc.css("pointer-events", T.saved.csspointerevents),
                        T.rail.drag = !1,
                        T.cursorfreezed = !1,
                        T.hasmoving && T.triggerScrollEnd(),
                        T.cancelEvent(e))
                }
                ,
                T.onmousemove = function(e) {
                    if (T.rail.drag) {
                        if (1 !== T.rail.drag.pt)
                            return;
                        if (P.ischrome && 0 === e.which)
                            return T.onmouseup(e);
                        if (T.cursorfreezed = !0,
                        T.hasmoving || T.triggerScrollStart(e.clientX, e.clientY, 0, 0, 0),
                        T.hasmoving = !0,
                        T.rail.drag.hr) {
                            T.scroll.x = T.rail.drag.sx + (e.clientX - T.rail.drag.x),
                            T.scroll.x < 0 && (T.scroll.x = 0);
                            var o = T.scrollvaluemaxw;
                            T.scroll.x > o && (T.scroll.x = o)
                        } else {
                            T.scroll.y = T.rail.drag.sy + (e.clientY - T.rail.drag.y),
                            T.scroll.y < 0 && (T.scroll.y = 0);
                            var t = T.scrollvaluemax;
                            T.scroll.y > t && (T.scroll.y = t)
                        }
                        return T.synched("mousemove", function() {
                            T.cursorfreezed && (T.showCursor(),
                            T.rail.drag.hr ? T.scrollLeft(Math.round(T.scroll.x * T.scrollratio.x)) : T.scrollTop(Math.round(T.scroll.y * T.scrollratio.y)))
                        }),
                        T.cancelEvent(e)
                    }
                    T.checkarea = 0
                }
                ,
                P.cantouch || M.emulatetouch)
                    T.onpreventclick = function(e) {
                        if (T.preventclick)
                            return T.preventclick.tg.onclick = T.preventclick.click,
                            T.preventclick = !1,
                            T.cancelEvent(e)
                    }
                    ,
                    T.onclick = !P.isios && function(e) {
                        return !T.lastmouseup || (T.lastmouseup = !1,
                        T.cancelEvent(e))
                    }
                    ,
                    M.grabcursorenabled && P.cursorgrabvalue && (T.css(T.ispage ? T.doc : T.win, {
                        cursor: P.cursorgrabvalue
                    }),
                    T.css(T.rail, {
                        cursor: P.cursorgrabvalue
                    }));
                else {
                    var L = function(e) {
                        if (T.selectiondrag) {
                            if (e) {
                                var o = T.win.outerHeight()
                                  , t = e.pageY - T.selectiondrag.top;
                                t > 0 && t < o && (t = 0),
                                t >= o && (t -= o),
                                T.selectiondrag.df = t
                            }
                            if (0 !== T.selectiondrag.df) {
                                var r = -2 * T.selectiondrag.df / 6 | 0;
                                T.doScrollBy(r),
                                T.debounced("doselectionscroll", function() {
                                    L()
                                }, 50)
                            }
                        }
                    };
                    T.hasTextSelected = "getSelection"in l ? function() {
                        return l.getSelection().rangeCount > 0
                    }
                    : "selection"in l ? function() {
                        return "None" != l.selection.type
                    }
                    : function() {
                        return !1
                    }
                    ,
                    T.onselectionstart = function(e) {
                        T.ispage || (T.selectiondrag = T.win.offset())
                    }
                    ,
                    T.onselectionend = function(e) {
                        T.selectiondrag = !1
                    }
                    ,
                    T.onselectiondrag = function(e) {
                        T.selectiondrag && T.hasTextSelected() && T.debounced("selectionscroll", function() {
                            L(e)
                        }, 250)
                    }
                }
                if (P.hasw3ctouch ? (T.css(T.ispage ? n("html") : T.win, {
                    "touch-action": "none"
                }),
                T.css(T.rail, {
                    "touch-action": "none"
                }),
                T.css(T.cursor, {
                    "touch-action": "none"
                }),
                T.bind(T.win, "pointerdown", T.ontouchstart),
                T.bind(l, "pointerup", T.ontouchend),
                T.delegate(l, "pointermove", T.ontouchmove)) : P.hasmstouch ? (T.css(T.ispage ? n("html") : T.win, {
                    "-ms-touch-action": "none"
                }),
                T.css(T.rail, {
                    "-ms-touch-action": "none"
                }),
                T.css(T.cursor, {
                    "-ms-touch-action": "none"
                }),
                T.bind(T.win, "MSPointerDown", T.ontouchstart),
                T.bind(l, "MSPointerUp", T.ontouchend),
                T.delegate(l, "MSPointerMove", T.ontouchmove),
                T.bind(T.cursor, "MSGestureHold", function(e) {
                    e.preventDefault()
                }),
                T.bind(T.cursor, "contextmenu", function(e) {
                    e.preventDefault()
                })) : P.cantouch && (T.bind(T.win, "touchstart", T.ontouchstart, !1, !0),
                T.bind(l, "touchend", T.ontouchend, !1, !0),
                T.bind(l, "touchcancel", T.ontouchend, !1, !0),
                T.delegate(l, "touchmove", T.ontouchmove, !1, !0)),
                M.emulatetouch && (T.bind(T.win, "mousedown", T.ontouchstart, !1, !0),
                T.bind(l, "mouseup", T.ontouchend, !1, !0),
                T.bind(l, "mousemove", T.ontouchmove, !1, !0)),
                (M.cursordragontouch || !P.cantouch && !M.emulatetouch) && (T.rail.css({
                    cursor: "default"
                }),
                T.railh && T.railh.css({
                    cursor: "default"
                }),
                T.jqbind(T.rail, "mouseenter", function() {
                    if (!T.ispage && !T.win.is(":visible"))
                        return !1;
                    T.canshowonmouseevent && T.showCursor(),
                    T.rail.active = !0
                }),
                T.jqbind(T.rail, "mouseleave", function() {
                    T.rail.active = !1,
                    T.rail.drag || T.hideCursor()
                }),
                M.sensitiverail && (T.bind(T.rail, "click", function(e) {
                    T.doRailClick(e, !1, !1)
                }),
                T.bind(T.rail, "dblclick", function(e) {
                    T.doRailClick(e, !0, !1)
                }),
                T.bind(T.cursor, "click", function(e) {
                    T.cancelEvent(e)
                }),
                T.bind(T.cursor, "dblclick", function(e) {
                    T.cancelEvent(e)
                })),
                T.railh && (T.jqbind(T.railh, "mouseenter", function() {
                    if (!T.ispage && !T.win.is(":visible"))
                        return !1;
                    T.canshowonmouseevent && T.showCursor(),
                    T.rail.active = !0
                }),
                T.jqbind(T.railh, "mouseleave", function() {
                    T.rail.active = !1,
                    T.rail.drag || T.hideCursor()
                }),
                M.sensitiverail && (T.bind(T.railh, "click", function(e) {
                    T.doRailClick(e, !1, !0)
                }),
                T.bind(T.railh, "dblclick", function(e) {
                    T.doRailClick(e, !0, !0)
                }),
                T.bind(T.cursorh, "click", function(e) {
                    T.cancelEvent(e)
                }),
                T.bind(T.cursorh, "dblclick", function(e) {
                    T.cancelEvent(e)
                })))),
                M.cursordragontouch && (this.istouchcapable || P.cantouch) && (T.bind(T.cursor, "touchstart", T.ontouchstartCursor),
                T.bind(T.cursor, "touchmove", T.ontouchmoveCursor),
                T.bind(T.cursor, "touchend", T.ontouchendCursor),
                T.cursorh && T.bind(T.cursorh, "touchstart", function(e) {
                    T.ontouchstartCursor(e, !0)
                }),
                T.cursorh && T.bind(T.cursorh, "touchmove", T.ontouchmoveCursor),
                T.cursorh && T.bind(T.cursorh, "touchend", T.ontouchendCursor)),
                M.emulatetouch || P.isandroid || P.isios ? (T.bind(P.hasmousecapture ? T.win : l, "mouseup", T.ontouchend),
                T.onclick && T.bind(l, "click", T.onclick),
                M.cursordragontouch ? (T.bind(T.cursor, "mousedown", T.onmousedown),
                T.bind(T.cursor, "mouseup", T.onmouseup),
                T.cursorh && T.bind(T.cursorh, "mousedown", function(e) {
                    T.onmousedown(e, !0)
                }),
                T.cursorh && T.bind(T.cursorh, "mouseup", T.onmouseup)) : (T.bind(T.rail, "mousedown", function(e) {
                    e.preventDefault()
                }),
                T.railh && T.bind(T.railh, "mousedown", function(e) {
                    e.preventDefault()
                }))) : (T.bind(P.hasmousecapture ? T.win : l, "mouseup", T.onmouseup),
                T.bind(l, "mousemove", T.onmousemove),
                T.onclick && T.bind(l, "click", T.onclick),
                T.bind(T.cursor, "mousedown", T.onmousedown),
                T.bind(T.cursor, "mouseup", T.onmouseup),
                T.railh && (T.bind(T.cursorh, "mousedown", function(e) {
                    T.onmousedown(e, !0)
                }),
                T.bind(T.cursorh, "mouseup", T.onmouseup)),
                !T.ispage && M.enablescrollonselection && (T.bind(T.win[0], "mousedown", T.onselectionstart),
                T.bind(l, "mouseup", T.onselectionend),
                T.bind(T.cursor, "mouseup", T.onselectionend),
                T.cursorh && T.bind(T.cursorh, "mouseup", T.onselectionend),
                T.bind(l, "mousemove", T.onselectiondrag)),
                T.zoom && (T.jqbind(T.zoom, "mouseenter", function() {
                    T.canshowonmouseevent && T.showCursor(),
                    T.rail.active = !0
                }),
                T.jqbind(T.zoom, "mouseleave", function() {
                    T.rail.active = !1,
                    T.rail.drag || T.hideCursor()
                }))),
                M.enablemousewheel && (T.isiframe || T.mousewheel(P.isie && T.ispage ? l : T.win, T.onmousewheel),
                T.mousewheel(T.rail, T.onmousewheel),
                T.railh && T.mousewheel(T.railh, T.onmousewheelhr)),
                T.ispage || P.cantouch || /HTML|^BODY/.test(T.win[0].nodeName) || (T.win.attr("tabindex") || T.win.attr({
                    tabindex: ++r
                }),
                T.bind(T.win, "focus", function(e) {
                    o = T.getTarget(e).id || T.getTarget(e) || !1,
                    T.hasfocus = !0,
                    T.canshowonmouseevent && T.noticeCursor()
                }),
                T.bind(T.win, "blur", function(e) {
                    o = !1,
                    T.hasfocus = !1
                }),
                T.bind(T.win, "mouseenter", function(e) {
                    t = T.getTarget(e).id || T.getTarget(e) || !1,
                    T.hasmousefocus = !0,
                    T.canshowonmouseevent && T.noticeCursor()
                }),
                T.bind(T.win, "mouseleave", function(e) {
                    t = !1,
                    T.hasmousefocus = !1,
                    T.rail.drag || T.hideCursor()
                })),
                T.onkeypress = function(e) {
                    if (T.railslocked && 0 === T.page.maxh)
                        return !0;
                    e = e || a.event;
                    var r = T.getTarget(e);
                    if (r && /INPUT|TEXTAREA|SELECT|OPTION/.test(r.nodeName) && (!(r.getAttribute("type") || r.type || !1) || !/submit|button|cancel/i.tp))
                        return !0;
                    if (n(r).attr("contenteditable"))
                        return !0;
                    if (T.hasfocus || T.hasmousefocus && !o || T.ispage && !o && !t) {
                        var i = e.keyCode;
                        if (T.railslocked && 27 != i)
                            return T.cancelEvent(e);
                        var s = e.ctrlKey || !1
                          , l = e.shiftKey || !1
                          , c = !1;
                        switch (i) {
                        case 38:
                        case 63233:
                            T.doScrollBy(72),
                            c = !0;
                            break;
                        case 40:
                        case 63235:
                            T.doScrollBy(-72),
                            c = !0;
                            break;
                        case 37:
                        case 63232:
                            T.railh && (s ? T.doScrollLeft(0) : T.doScrollLeftBy(72),
                            c = !0);
                            break;
                        case 39:
                        case 63234:
                            T.railh && (s ? T.doScrollLeft(T.page.maxw) : T.doScrollLeftBy(-72),
                            c = !0);
                            break;
                        case 33:
                        case 63276:
                            T.doScrollBy(T.view.h),
                            c = !0;
                            break;
                        case 34:
                        case 63277:
                            T.doScrollBy(-T.view.h),
                            c = !0;
                            break;
                        case 36:
                        case 63273:
                            T.railh && s ? T.doScrollPos(0, 0) : T.doScrollTo(0),
                            c = !0;
                            break;
                        case 35:
                        case 63275:
                            T.railh && s ? T.doScrollPos(T.page.maxw, T.page.maxh) : T.doScrollTo(T.page.maxh),
                            c = !0;
                            break;
                        case 32:
                            M.spacebarenabled && (l ? T.doScrollBy(T.view.h) : T.doScrollBy(-T.view.h),
                            c = !0);
                            break;
                        case 27:
                            T.zoomactive && (T.doZoom(),
                            c = !0)
                        }
                        if (c)
                            return T.cancelEvent(e)
                    }
                }
                ,
                M.enablekeyboard && T.bind(l, P.isopera && !P.isopera12 ? "keypress" : "keydown", T.onkeypress),
                T.bind(l, "keydown", function(e) {
                    (e.ctrlKey || !1) && (T.wheelprevented = !0)
                }),
                T.bind(l, "keyup", function(e) {
                    e.ctrlKey || !1 || (T.wheelprevented = !1)
                }),
                T.bind(a, "blur", function(e) {
                    T.wheelprevented = !1
                }),
                T.bind(a, "resize", T.onscreenresize),
                T.bind(a, "orientationchange", T.onscreenresize),
                T.bind(a, "load", T.lazyResize),
                P.ischrome && !T.ispage && !T.haswrapper) {
                    var C = T.win.attr("style")
                      , N = parseFloat(T.win.css("width")) + 1;
                    T.win.css("width", N),
                    T.synched("chromefix", function() {
                        T.win.attr("style", C)
                    })
                }
                if (T.onAttributeChange = function(e) {
                    T.lazyResize(T.isieold ? 250 : 30)
                }
                ,
                M.enableobserver && (T.isie11 || !1 === m || (T.observerbody = new m(function(e) {
                    if (e.forEach(function(e) {
                        if ("attributes" == e.type)
                            return E.hasClass("modal-open") && E.hasClass("modal-dialog") && !n.contains(n(".modal-dialog")[0], T.doc[0]) ? T.hide() : T.show()
                    }),
                    T.me.clientWidth != T.page.width || T.me.clientHeight != T.page.height)
                        return T.lazyResize(30)
                }
                ),
                T.observerbody.observe(l.body, {
                    childList: !0,
                    subtree: !0,
                    characterData: !1,
                    attributes: !0,
                    attributeFilter: ["class"]
                })),
                !T.ispage && !T.haswrapper)) {
                    var R = T.win[0];
                    !1 !== m ? (T.observer = new m(function(e) {
                        e.forEach(T.onAttributeChange)
                    }
                    ),
                    T.observer.observe(R, {
                        childList: !0,
                        characterData: !1,
                        attributes: !0,
                        subtree: !1
                    }),
                    T.observerremover = new m(function(e) {
                        e.forEach(function(e) {
                            if (e.removedNodes.length > 0)
                                for (var o in e.removedNodes)
                                    if (T && e.removedNodes[o] === R)
                                        return T.remove()
                        })
                    }
                    ),
                    T.observerremover.observe(R.parentNode, {
                        childList: !0,
                        characterData: !1,
                        attributes: !1,
                        subtree: !1
                    })) : (T.bind(R, P.isie && !P.isie9 ? "propertychange" : "DOMAttrModified", T.onAttributeChange),
                    P.isie9 && R.attachEvent("onpropertychange", T.onAttributeChange),
                    T.bind(R, "DOMNodeRemoved", function(e) {
                        e.target === R && T.remove()
                    }))
                }
                !T.ispage && M.boxzoom && T.bind(a, "resize", T.resizeZoom),
                T.istextarea && (T.bind(T.win, "keydown", T.lazyResize),
                T.bind(T.win, "mouseup", T.lazyResize)),
                T.lazyResize(30)
            }
            if ("IFRAME" == this.doc[0].nodeName) {
                var _ = function() {
                    T.iframexd = !1;
                    var o;
                    try {
                        (o = "contentDocument"in this ? this.contentDocument : this.contentWindow._doc).domain
                    } catch (e) {
                        T.iframexd = !0,
                        o = !1
                    }
                    if (T.iframexd)
                        return "console"in a && console.log("NiceScroll error: policy restriced iframe"),
                        !0;
                    if (T.forcescreen = !0,
                    T.isiframe && (T.iframe = {
                        doc: n(o),
                        html: T.doc.contents().find("html")[0],
                        body: T.doc.contents().find("body")[0]
                    },
                    T.getContentSize = function() {
                        return {
                            w: Math.max(T.iframe.html.scrollWidth, T.iframe.body.scrollWidth),
                            h: Math.max(T.iframe.html.scrollHeight, T.iframe.body.scrollHeight)
                        }
                    }
                    ,
                    T.docscroll = n(T.iframe.body)),
                    !P.isios && M.iframeautoresize && !T.isiframe) {
                        T.win.scrollTop(0),
                        T.doc.height("");
                        var t = Math.max(o.getElementsByTagName("html")[0].scrollHeight, o.body.scrollHeight);
                        T.doc.height(t)
                    }
                    T.lazyResize(30),
                    T.css(n(T.iframe.body), e),
                    P.isios && T.haswrapper && T.css(n(o.body), {
                        "-webkit-transform": "translate3d(0,0,0)"
                    }),
                    "contentWindow"in this ? T.bind(this.contentWindow, "scroll", T.onscroll) : T.bind(o, "scroll", T.onscroll),
                    M.enablemousewheel && T.mousewheel(o, T.onmousewheel),
                    M.enablekeyboard && T.bind(o, P.isopera ? "keypress" : "keydown", T.onkeypress),
                    P.cantouch ? (T.bind(o, "touchstart", T.ontouchstart),
                    T.bind(o, "touchmove", T.ontouchmove)) : M.emulatetouch && (T.bind(o, "mousedown", T.ontouchstart),
                    T.bind(o, "mousemove", function(e) {
                        return T.ontouchmove(e, !0)
                    }),
                    M.grabcursorenabled && P.cursorgrabvalue && T.css(n(o.body), {
                        cursor: P.cursorgrabvalue
                    })),
                    T.bind(o, "mouseup", T.ontouchend),
                    T.zoom && (M.dblclickzoom && T.bind(o, "dblclick", T.doZoom),
                    T.ongesturezoom && T.bind(o, "gestureend", T.ongesturezoom))
                };
                this.doc[0].readyState && "complete" === this.doc[0].readyState && setTimeout(function() {
                    _.call(T.doc[0], !1)
                }, 500),
                T.bind(this.doc, "load", _)
            }
        }
        ,
        this.showCursor = function(e, o) {
            if (T.cursortimeout && (clearTimeout(T.cursortimeout),
            T.cursortimeout = 0),
            T.rail) {
                if (T.autohidedom && (T.autohidedom.stop().css({
                    opacity: M.cursoropacitymax
                }),
                T.cursoractive = !0),
                T.rail.drag && 1 == T.rail.drag.pt || (void 0 !== e && !1 !== e && (T.scroll.y = e / T.scrollratio.y | 0),
                void 0 !== o && (T.scroll.x = o / T.scrollratio.x | 0)),
                T.cursor.css({
                    height: T.cursorheight,
                    top: T.scroll.y
                }),
                T.cursorh) {
                    var t = T.hasreversehr ? T.scrollvaluemaxw - T.scroll.x : T.scroll.x;
                    T.cursorh.css({
                        width: T.cursorwidth,
                        left: !T.rail.align && T.rail.visibility ? t + T.rail.width : t
                    }),
                    T.cursoractive = !0
                }
                T.zoom && T.zoom.stop().css({
                    opacity: M.cursoropacitymax
                })
            }
        }
        ,
        this.hideCursor = function(e) {
            T.cursortimeout || T.rail && T.autohidedom && (T.hasmousefocus && "leave" === M.autohidemode || (T.cursortimeout = setTimeout(function() {
                T.rail.active && T.showonmouseevent || (T.autohidedom.stop().animate({
                    opacity: M.cursoropacitymin
                }),
                T.zoom && T.zoom.stop().animate({
                    opacity: M.cursoropacitymin
                }),
                T.cursoractive = !1),
                T.cursortimeout = 0
            }, e || M.hidecursordelay)))
        }
        ,
        this.noticeCursor = function(e, o, t) {
            T.showCursor(o, t),
            T.rail.active || T.hideCursor(e)
        }
        ,
        this.getContentSize = T.ispage ? function() {
            return {
                w: Math.max(l.body.scrollWidth, l.documentElement.scrollWidth),
                h: Math.max(l.body.scrollHeight, l.documentElement.scrollHeight)
            }
        }
        : T.haswrapper ? function() {
            return {
                w: T.doc[0].offsetWidth,
                h: T.doc[0].offsetHeight
            }
        }
        : function() {
            return {
                w: T.docscroll[0].scrollWidth,
                h: T.docscroll[0].scrollHeight
            }
        }
        ,
        this.onResize = function(e, o) {
            if (!T || !T.win)
                return !1;
            var t = T.page.maxh
              , r = T.page.maxw
              , i = T.view.h
              , s = T.view.w;
            if (T.view = {
                w: T.ispage ? T.win.width() : T.win[0].clientWidth,
                h: T.ispage ? T.win.height() : T.win[0].clientHeight
            },
            T.page = o || T.getContentSize(),
            T.page.maxh = Math.max(0, T.page.h - T.view.h),
            T.page.maxw = Math.max(0, T.page.w - T.view.w),
            T.page.maxh == t && T.page.maxw == r && T.view.w == s && T.view.h == i) {
                if (T.ispage)
                    return T;
                var n = T.win.offset();
                if (T.lastposition) {
                    var l = T.lastposition;
                    if (l.top == n.top && l.left == n.left)
                        return T
                }
                T.lastposition = n
            }
            return 0 === T.page.maxh ? (T.hideRail(),
            T.scrollvaluemax = 0,
            T.scroll.y = 0,
            T.scrollratio.y = 0,
            T.cursorheight = 0,
            T.setScrollTop(0),
            T.rail && (T.rail.scrollable = !1)) : (T.page.maxh -= M.railpadding.top + M.railpadding.bottom,
            T.rail.scrollable = !0),
            0 === T.page.maxw ? (T.hideRailHr(),
            T.scrollvaluemaxw = 0,
            T.scroll.x = 0,
            T.scrollratio.x = 0,
            T.cursorwidth = 0,
            T.setScrollLeft(0),
            T.railh && (T.railh.scrollable = !1)) : (T.page.maxw -= M.railpadding.left + M.railpadding.right,
            T.railh && (T.railh.scrollable = M.horizrailenabled)),
            T.railslocked = T.locked || 0 === T.page.maxh && 0 === T.page.maxw,
            T.railslocked ? (T.ispage || T.updateScrollBar(T.view),
            !1) : (T.hidden || (T.rail.visibility || T.showRail(),
            T.railh && !T.railh.visibility && T.showRailHr()),
            T.istextarea && T.win.css("resize") && "none" != T.win.css("resize") && (T.view.h -= 20),
            T.cursorheight = Math.min(T.view.h, Math.round(T.view.h * (T.view.h / T.page.h))),
            T.cursorheight = M.cursorfixedheight ? M.cursorfixedheight : Math.max(M.cursorminheight, T.cursorheight),
            T.cursorwidth = Math.min(T.view.w, Math.round(T.view.w * (T.view.w / T.page.w))),
            T.cursorwidth = M.cursorfixedheight ? M.cursorfixedheight : Math.max(M.cursorminheight, T.cursorwidth),
            T.scrollvaluemax = T.view.h - T.cursorheight - (M.railpadding.top + M.railpadding.bottom),
            T.hasborderbox || (T.scrollvaluemax -= T.cursor[0].offsetHeight - T.cursor[0].clientHeight),
            T.railh && (T.railh.width = T.page.maxh > 0 ? T.view.w - T.rail.width : T.view.w,
            T.scrollvaluemaxw = T.railh.width - T.cursorwidth - (M.railpadding.left + M.railpadding.right)),
            T.ispage || T.updateScrollBar(T.view),
            T.scrollratio = {
                x: T.page.maxw / T.scrollvaluemaxw,
                y: T.page.maxh / T.scrollvaluemax
            },
            T.getScrollTop() > T.page.maxh ? T.doScrollTop(T.page.maxh) : (T.scroll.y = T.getScrollTop() / T.scrollratio.y | 0,
            T.scroll.x = T.getScrollLeft() / T.scrollratio.x | 0,
            T.cursoractive && T.noticeCursor()),
            T.scroll.y && 0 === T.getScrollTop() && T.doScrollTo(T.scroll.y * T.scrollratio.y | 0),
            T)
        }
        ,
        this.resize = T.onResize;
        var O = 0;
        this.onscreenresize = function(e) {
            clearTimeout(O);
            var o = !T.ispage && !T.haswrapper;
            o && T.hideRails(),
            O = setTimeout(function() {
                T && (o && T.showRails(),
                T.resize()),
                O = 0
            }, 120)
        }
        ,
        this.lazyResize = function(e) {
            return clearTimeout(O),
            e = isNaN(e) ? 240 : e,
            O = setTimeout(function() {
                T && T.resize(),
                O = 0
            }, e),
            T
        }
        ,
        this.jqbind = function(e, o, t) {
            T.events.push({
                e: e,
                n: o,
                f: t,
                q: !0
            }),
            n(e).on(o, t)
        }
        ,
        this.mousewheel = function(e, o, t) {
            var r = "jquery"in e ? e[0] : e;
            if ("onwheel"in l.createElement("div"))
                T._bind(r, "wheel", o, t || !1);
            else {
                var i = void 0 !== l.onmousewheel ? "mousewheel" : "DOMMouseScroll";
                S(r, i, o, t || !1),
                "DOMMouseScroll" == i && S(r, "MozMousePixelScroll", o, t || !1)
            }
        }
        ;
        var Y = !1;
        if (P.haseventlistener) {
            try {
                var H = Object.defineProperty({}, "passive", {
                    get: function() {
                        Y = !0
                    }
                });
                a.addEventListener("test", null, H)
            } catch (e) {}
            this.stopPropagation = function(e) {
                return !!e && ((e = e.original ? e.original : e).stopPropagation(),
                !1)
            }
            ,
            this.cancelEvent = function(e) {
                return e.cancelable && e.preventDefault(),
                e.stopImmediatePropagation(),
                e.preventManipulation && e.preventManipulation(),
                !1
            }
        } else
            Event.prototype.preventDefault = function() {
                this.returnValue = !1
            }
            ,
            Event.prototype.stopPropagation = function() {
                this.cancelBubble = !0
            }
            ,
            a.constructor.prototype.addEventListener = l.constructor.prototype.addEventListener = Element.prototype.addEventListener = function(e, o, t) {
                this.attachEvent("on" + e, o)
            }
            ,
            a.constructor.prototype.removeEventListener = l.constructor.prototype.removeEventListener = Element.prototype.removeEventListener = function(e, o, t) {
                this.detachEvent("on" + e, o)
            }
            ,
            this.cancelEvent = function(e) {
                return (e = e || a.event) && (e.cancelBubble = !0,
                e.cancel = !0,
                e.returnValue = !1),
                !1
            }
            ,
            this.stopPropagation = function(e) {
                return (e = e || a.event) && (e.cancelBubble = !0),
                !1
            }
            ;
        this.delegate = function(e, o, t, r, i) {
            var s = d[o] || !1;
            s || (s = {
                a: [],
                l: [],
                f: function(e) {
                    for (var o = s.l, t = !1, r = o.length - 1; r >= 0; r--)
                        if (!1 === (t = o[r].call(e.target, e)))
                            return !1;
                    return t
                }
            },
            T.bind(e, o, s.f, r, i),
            d[o] = s),
            T.ispage ? (s.a = [T.id].concat(s.a),
            s.l = [t].concat(s.l)) : (s.a.push(T.id),
            s.l.push(t))
        }
        ,
        this.undelegate = function(e, o, t, r, i) {
            var s = d[o] || !1;
            if (s && s.l)
                for (var n = 0, l = s.l.length; n < l; n++)
                    s.a[n] === T.id && (s.a.splice(n),
                    s.l.splice(n),
                    0 === s.a.length && (T._unbind(e, o, s.l.f),
                    d[o] = null))
        }
        ,
        this.bind = function(e, o, t, r, i) {
            var s = "jquery"in e ? e[0] : e;
            T._bind(s, o, t, r || !1, i || !1)
        }
        ,
        this._bind = function(e, o, t, r, i) {
            T.events.push({
                e: e,
                n: o,
                f: t,
                b: r,
                q: !1
            }),
            Y && i ? e.addEventListener(o, t, {
                passive: !1,
                capture: r
            }) : e.addEventListener(o, t, r || !1)
        }
        ,
        this._unbind = function(e, o, t, r) {
            d[o] ? T.undelegate(e, o, t, r) : e.removeEventListener(o, t, r)
        }
        ,
        this.unbindAll = function() {
            for (var e = 0; e < T.events.length; e++) {
                var o = T.events[e];
                o.q ? o.e.unbind(o.n, o.f) : T._unbind(o.e, o.n, o.f, o.b)
            }
        }
        ,
        this.showRails = function() {
            return T.showRail().showRailHr()
        }
        ,
        this.showRail = function() {
            return 0 === T.page.maxh || !T.ispage && "none" == T.win.css("display") || (T.rail.visibility = !0,
            T.rail.css("display", "block"),
            T.rail.parent().removeClass("noscroll")),
            T
        }
        ,
        this.showRailHr = function() {
            return T.railh && (0 === T.page.maxw || !T.ispage && "none" == T.win.css("display") || (T.railh.visibility = !0,
            T.railh.css("display", "block"))),
            T
        }
        ,
        this.hideRails = function() {
            return T.hideRail().hideRailHr()
        }
        ,
        this.hideRail = function() {
            return T.rail.visibility = !1,
            T.rail.css("display", "none"),
            T.rail.parent().addClass("noscroll"),
            T
        }
        ,
        this.hideRailHr = function() {
            return T.railh && (T.railh.visibility = !1,
            T.railh.css("display", "none")),
            T
        }
        ,
        this.show = function() {
            return T.hidden = !1,
            T.railslocked = !1,
            T.showRails()
        }
        ,
        this.hide = function() {
            return T.hidden = !0,
            T.railslocked = !0,
            T.hideRails()
        }
        ,
        this.toggle = function() {
            return T.hidden ? T.show() : T.hide()
        }
        ,
        this.remove = function() {
            T.stop(),
            T.cursortimeout && clearTimeout(T.cursortimeout);
            for (var e in T.delaylist)
                T.delaylist[e] && h(T.delaylist[e].h);
            T.doZoomOut(),
            T.unbindAll(),
            P.isie9 && T.win[0].detachEvent("onpropertychange", T.onAttributeChange),
            !1 !== T.observer && T.observer.disconnect(),
            !1 !== T.observerremover && T.observerremover.disconnect(),
            !1 !== T.observerbody && T.observerbody.disconnect(),
            T.events = null,
            T.cursor && T.cursor.remove(),
            T.cursorh && T.cursorh.remove(),
            T.rail && T.rail.remove(),
            T.railh && T.railh.remove(),
            T.zoom && T.zoom.remove();
            for (var o = 0; o < T.saved.css.length; o++) {
                var t = T.saved.css[o];
                t[0].css(t[1], void 0 === t[2] ? "" : t[2])
            }
            T.saved = !1,
            T.me.data("__nicescroll", "");
            var r = n.nicescroll;
            r.each(function(e) {
                if (this && this.id === T.id) {
                    delete r[e];
                    for (var o = ++e; o < r.length; o++,
                    e++)
                        r[e] = r[o];
                    --r.length && delete r[r.length]
                }
            });
            for (var i in T)
                T[i] = null,
                delete T[i];
            T = null
        }
        ,
        this.scrollstart = function(e) {
            return this.onscrollstart = e,
            T
        }
        ,
        this.scrollend = function(e) {
            return this.onscrollend = e,
            T
        }
        ,
        this.scrollcancel = function(e) {
            return this.onscrollcancel = e,
            T
        }
        ,
        this.zoomin = function(e) {
            return this.onzoomin = e,
            T
        }
        ,
        this.zoomout = function(e) {
            return this.onzoomout = e,
            T
        }
        ,
        this.isScrollable = function(e) {
            var o = e.target ? e.target : e;
            if ("OPTION" == o.nodeName)
                return !0;
            for (; o && 1 == o.nodeType && o !== this.me[0] && !/^BODY|HTML/.test(o.nodeName); ) {
                var t = n(o)
                  , r = t.css("overflowY") || t.css("overflowX") || t.css("overflow") || "";
                if (/scroll|auto/.test(r))
                    return o.clientHeight != o.scrollHeight;
                o = !!o.parentNode && o.parentNode
            }
            return !1
        }
        ,
        this.getViewport = function(e) {
            for (var o = !(!e || !e.parentNode) && e.parentNode; o && 1 == o.nodeType && !/^BODY|HTML/.test(o.nodeName); ) {
                var t = n(o);
                if (/fixed|absolute/.test(t.css("position")))
                    return t;
                var r = t.css("overflowY") || t.css("overflowX") || t.css("overflow") || "";
                if (/scroll|auto/.test(r) && o.clientHeight != o.scrollHeight)
                    return t;
                if (t.getNiceScroll().length > 0)
                    return t;
                o = !!o.parentNode && o.parentNode
            }
            return !1
        }
        ,
        this.triggerScrollStart = function(e, o, t, r, i) {
            if (T.onscrollstart) {
                var s = {
                    type: "scrollstart",
                    current: {
                        x: e,
                        y: o
                    },
                    request: {
                        x: t,
                        y: r
                    },
                    end: {
                        x: T.newscrollx,
                        y: T.newscrolly
                    },
                    speed: i
                };
                T.onscrollstart.call(T, s)
            }
        }
        ,
        this.triggerScrollEnd = function() {
            if (T.onscrollend) {
                var e = T.getScrollLeft()
                  , o = T.getScrollTop()
                  , t = {
                    type: "scrollend",
                    current: {
                        x: e,
                        y: o
                    },
                    end: {
                        x: e,
                        y: o
                    }
                };
                T.onscrollend.call(T, t)
            }
        }
        ;
        var B = 0
          , X = 0
          , D = 0
          , A = 1
          , q = !1;
        if (this.onmousewheel = function(e) {
            if (T.wheelprevented || T.locked)
                return !1;
            if (T.railslocked)
                return T.debounced("checkunlock", T.resize, 250),
                !1;
            if (T.rail.drag)
                return T.cancelEvent(e);
            if ("auto" === M.oneaxismousemode && 0 !== e.deltaX && (M.oneaxismousemode = !1),
            M.oneaxismousemode && 0 === e.deltaX && !T.rail.scrollable)
                return !T.railh || !T.railh.scrollable || T.onmousewheelhr(e);
            var o = f()
              , t = !1;
            if (M.preservenativescrolling && T.checkarea + 600 < o && (T.nativescrollingarea = T.isScrollable(e),
            t = !0),
            T.checkarea = o,
            T.nativescrollingarea)
                return !0;
            var r = k(e, !1, t);
            return r && (T.checkarea = 0),
            r
        }
        ,
        this.onmousewheelhr = function(e) {
            if (!T.wheelprevented) {
                if (T.railslocked || !T.railh.scrollable)
                    return !0;
                if (T.rail.drag)
                    return T.cancelEvent(e);
                var o = f()
                  , t = !1;
                return M.preservenativescrolling && T.checkarea + 600 < o && (T.nativescrollingarea = T.isScrollable(e),
                t = !0),
                T.checkarea = o,
                !!T.nativescrollingarea || (T.railslocked ? T.cancelEvent(e) : k(e, !0, t))
            }
        }
        ,
        this.stop = function() {
            return T.cancelScroll(),
            T.scrollmon && T.scrollmon.stop(),
            T.cursorfreezed = !1,
            T.scroll.y = Math.round(T.getScrollTop() * (1 / T.scrollratio.y)),
            T.noticeCursor(),
            T
        }
        ,
        this.getTransitionSpeed = function(e) {
            return 80 + e / 72 * M.scrollspeed | 0
        }
        ,
        M.smoothscroll)
            if (T.ishwscroll && P.hastransition && M.usetransition && M.smoothscroll) {
                var j = "";
                this.resetTransition = function() {
                    j = "",
                    T.doc.css(P.prefixstyle + "transition-duration", "0ms")
                }
                ,
                this.prepareTransition = function(e, o) {
                    var t = o ? e : T.getTransitionSpeed(e)
                      , r = t + "ms";
                    return j !== r && (j = r,
                    T.doc.css(P.prefixstyle + "transition-duration", r)),
                    t
                }
                ,
                this.doScrollLeft = function(e, o) {
                    var t = T.scrollrunning ? T.newscrolly : T.getScrollTop();
                    T.doScrollPos(e, t, o)
                }
                ,
                this.doScrollTop = function(e, o) {
                    var t = T.scrollrunning ? T.newscrollx : T.getScrollLeft();
                    T.doScrollPos(t, e, o)
                }
                ,
                this.cursorupdate = {
                    running: !1,
                    start: function() {
                        var e = this;
                        if (!e.running) {
                            e.running = !0;
                            var o = function() {
                                e.running && u(o),
                                T.showCursor(T.getScrollTop(), T.getScrollLeft()),
                                T.notifyScrollEvent(T.win[0])
                            };
                            u(o)
                        }
                    },
                    stop: function() {
                        this.running = !1
                    }
                },
                this.doScrollPos = function(e, o, t) {
                    var r = T.getScrollTop()
                      , i = T.getScrollLeft();
                    if (((T.newscrolly - r) * (o - r) < 0 || (T.newscrollx - i) * (e - i) < 0) && T.cancelScroll(),
                    M.bouncescroll ? (o < 0 ? o = o / 2 | 0 : o > T.page.maxh && (o = T.page.maxh + (o - T.page.maxh) / 2 | 0),
                    e < 0 ? e = e / 2 | 0 : e > T.page.maxw && (e = T.page.maxw + (e - T.page.maxw) / 2 | 0)) : (o < 0 ? o = 0 : o > T.page.maxh && (o = T.page.maxh),
                    e < 0 ? e = 0 : e > T.page.maxw && (e = T.page.maxw)),
                    T.scrollrunning && e == T.newscrollx && o == T.newscrolly)
                        return !1;
                    T.newscrolly = o,
                    T.newscrollx = e;
                    var s = T.getScrollTop()
                      , n = T.getScrollLeft()
                      , l = {};
                    l.x = e - n,
                    l.y = o - s;
                    var a = 0 | Math.sqrt(l.x * l.x + l.y * l.y)
                      , c = T.prepareTransition(a);
                    T.scrollrunning || (T.scrollrunning = !0,
                    T.triggerScrollStart(n, s, e, o, c),
                    T.cursorupdate.start()),
                    T.scrollendtrapped = !0,
                    P.transitionend || (T.scrollendtrapped && clearTimeout(T.scrollendtrapped),
                    T.scrollendtrapped = setTimeout(T.onScrollTransitionEnd, c)),
                    T.setScrollTop(T.newscrolly),
                    T.setScrollLeft(T.newscrollx)
                }
                ,
                this.cancelScroll = function() {
                    if (!T.scrollendtrapped)
                        return !0;
                    var e = T.getScrollTop()
                      , o = T.getScrollLeft();
                    return T.scrollrunning = !1,
                    P.transitionend || clearTimeout(P.transitionend),
                    T.scrollendtrapped = !1,
                    T.resetTransition(),
                    T.setScrollTop(e),
                    T.railh && T.setScrollLeft(o),
                    T.timerscroll && T.timerscroll.tm && clearInterval(T.timerscroll.tm),
                    T.timerscroll = !1,
                    T.cursorfreezed = !1,
                    T.cursorupdate.stop(),
                    T.showCursor(e, o),
                    T
                }
                ,
                this.onScrollTransitionEnd = function() {
                    if (T.scrollendtrapped) {
                        var e = T.getScrollTop()
                          , o = T.getScrollLeft();
                        if (e < 0 ? e = 0 : e > T.page.maxh && (e = T.page.maxh),
                        o < 0 ? o = 0 : o > T.page.maxw && (o = T.page.maxw),
                        e != T.newscrolly || o != T.newscrollx)
                            return T.doScrollPos(o, e, M.snapbackspeed);
                        T.scrollrunning && T.triggerScrollEnd(),
                        T.scrollrunning = !1,
                        T.scrollendtrapped = !1,
                        T.resetTransition(),
                        T.timerscroll = !1,
                        T.setScrollTop(e),
                        T.railh && T.setScrollLeft(o),
                        T.cursorupdate.stop(),
                        T.noticeCursor(!1, e, o),
                        T.cursorfreezed = !1
                    }
                }
            } else
                this.doScrollLeft = function(e, o) {
                    var t = T.scrollrunning ? T.newscrolly : T.getScrollTop();
                    T.doScrollPos(e, t, o)
                }
                ,
                this.doScrollTop = function(e, o) {
                    var t = T.scrollrunning ? T.newscrollx : T.getScrollLeft();
                    T.doScrollPos(t, e, o)
                }
                ,
                this.doScrollPos = function(e, o, t) {
                    var r = T.getScrollTop()
                      , i = T.getScrollLeft();
                    ((T.newscrolly - r) * (o - r) < 0 || (T.newscrollx - i) * (e - i) < 0) && T.cancelScroll();
                    var s = !1;
                    if (T.bouncescroll && T.rail.visibility || (o < 0 ? (o = 0,
                    s = !0) : o > T.page.maxh && (o = T.page.maxh,
                    s = !0)),
                    T.bouncescroll && T.railh.visibility || (e < 0 ? (e = 0,
                    s = !0) : e > T.page.maxw && (e = T.page.maxw,
                    s = !0)),
                    T.scrollrunning && T.newscrolly === o && T.newscrollx === e)
                        return !0;
                    T.newscrolly = o,
                    T.newscrollx = e,
                    T.dst = {},
                    T.dst.x = e - i,
                    T.dst.y = o - r,
                    T.dst.px = i,
                    T.dst.py = r;
                    var n = 0 | Math.sqrt(T.dst.x * T.dst.x + T.dst.y * T.dst.y)
                      , l = T.getTransitionSpeed(n);
                    T.bzscroll = {};
                    var a = s ? 1 : .58;
                    T.bzscroll.x = new R(i,T.newscrollx,l,0,0,a,1),
                    T.bzscroll.y = new R(r,T.newscrolly,l,0,0,a,1);
                    f();
                    var c = function() {
                        if (T.scrollrunning) {
                            var e = T.bzscroll.y.getPos();
                            T.setScrollLeft(T.bzscroll.x.getNow()),
                            T.setScrollTop(T.bzscroll.y.getNow()),
                            e <= 1 ? T.timer = u(c) : (T.scrollrunning = !1,
                            T.timer = 0,
                            T.triggerScrollEnd())
                        }
                    };
                    T.scrollrunning || (T.triggerScrollStart(i, r, e, o, l),
                    T.scrollrunning = !0,
                    T.timer = u(c))
                }
                ,
                this.cancelScroll = function() {
                    return T.timer && h(T.timer),
                    T.timer = 0,
                    T.bzscroll = !1,
                    T.scrollrunning = !1,
                    T
                }
                ;
        else
            this.doScrollLeft = function(e, o) {
                var t = T.getScrollTop();
                T.doScrollPos(e, t, o)
            }
            ,
            this.doScrollTop = function(e, o) {
                var t = T.getScrollLeft();
                T.doScrollPos(t, e, o)
            }
            ,
            this.doScrollPos = function(e, o, t) {
                var r = e > T.page.maxw ? T.page.maxw : e;
                r < 0 && (r = 0);
                var i = o > T.page.maxh ? T.page.maxh : o;
                i < 0 && (i = 0),
                T.synched("scroll", function() {
                    T.setScrollTop(i),
                    T.setScrollLeft(r)
                })
            }
            ,
            this.cancelScroll = function() {}
            ;
        this.doScrollBy = function(e, o) {
            z(0, e)
        }
        ,
        this.doScrollLeftBy = function(e, o) {
            z(e, 0)
        }
        ,
        this.doScrollTo = function(e, o) {
            var t = o ? Math.round(e * T.scrollratio.y) : e;
            t < 0 ? t = 0 : t > T.page.maxh && (t = T.page.maxh),
            T.cursorfreezed = !1,
            T.doScrollTop(e)
        }
        ,
        this.checkContentSize = function() {
            var e = T.getContentSize();
            e.h == T.page.h && e.w == T.page.w || T.resize(!1, e)
        }
        ,
        T.onscroll = function(e) {
            T.rail.drag || T.cursorfreezed || T.synched("scroll", function() {
                T.scroll.y = Math.round(T.getScrollTop() / T.scrollratio.y),
                T.railh && (T.scroll.x = Math.round(T.getScrollLeft() / T.scrollratio.x)),
                T.noticeCursor()
            })
        }
        ,
        T.bind(T.docscroll, "scroll", T.onscroll),
        this.doZoomIn = function(e) {
            if (!T.zoomactive) {
                T.zoomactive = !0,
                T.zoomrestore = {
                    style: {}
                };
                var o = ["position", "top", "left", "zIndex", "backgroundColor", "marginTop", "marginBottom", "marginLeft", "marginRight"]
                  , t = T.win[0].style;
                for (var r in o) {
                    var i = o[r];
                    T.zoomrestore.style[i] = void 0 !== t[i] ? t[i] : ""
                }
                T.zoomrestore.style.width = T.win.css("width"),
                T.zoomrestore.style.height = T.win.css("height"),
                T.zoomrestore.padding = {
                    w: T.win.outerWidth() - T.win.width(),
                    h: T.win.outerHeight() - T.win.height()
                },
                P.isios4 && (T.zoomrestore.scrollTop = c.scrollTop(),
                c.scrollTop(0)),
                T.win.css({
                    position: P.isios4 ? "absolute" : "fixed",
                    top: 0,
                    left: 0,
                    zIndex: s + 100,
                    margin: 0
                });
                var n = T.win.css("backgroundColor");
                return ("" === n || /transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(n)) && T.win.css("backgroundColor", "#fff"),
                T.rail.css({
                    zIndex: s + 101
                }),
                T.zoom.css({
                    zIndex: s + 102
                }),
                T.zoom.css("backgroundPosition", "0 -18px"),
                T.resizeZoom(),
                T.onzoomin && T.onzoomin.call(T),
                T.cancelEvent(e)
            }
        }
        ,
        this.doZoomOut = function(e) {
            if (T.zoomactive)
                return T.zoomactive = !1,
                T.win.css("margin", ""),
                T.win.css(T.zoomrestore.style),
                P.isios4 && c.scrollTop(T.zoomrestore.scrollTop),
                T.rail.css({
                    "z-index": T.zindex
                }),
                T.zoom.css({
                    "z-index": T.zindex
                }),
                T.zoomrestore = !1,
                T.zoom.css("backgroundPosition", "0 0"),
                T.onResize(),
                T.onzoomout && T.onzoomout.call(T),
                T.cancelEvent(e)
        }
        ,
        this.doZoom = function(e) {
            return T.zoomactive ? T.doZoomOut(e) : T.doZoomIn(e)
        }
        ,
        this.resizeZoom = function() {
            if (T.zoomactive) {
                var e = T.getScrollTop();
                T.win.css({
                    width: c.width() - T.zoomrestore.padding.w + "px",
                    height: c.height() - T.zoomrestore.padding.h + "px"
                }),
                T.onResize(),
                T.setScrollTop(Math.min(T.page.maxh, e))
            }
        }
        ,
        this.init(),
        n.nicescroll.push(this)
    }
      , y = function(e) {
        var o = this;
        this.nc = e,
        this.lastx = 0,
        this.lasty = 0,
        this.speedx = 0,
        this.speedy = 0,
        this.lasttime = 0,
        this.steptime = 0,
        this.snapx = !1,
        this.snapy = !1,
        this.demulx = 0,
        this.demuly = 0,
        this.lastscrollx = -1,
        this.lastscrolly = -1,
        this.chkx = 0,
        this.chky = 0,
        this.timer = 0,
        this.reset = function(e, t) {
            o.stop(),
            o.steptime = 0,
            o.lasttime = f(),
            o.speedx = 0,
            o.speedy = 0,
            o.lastx = e,
            o.lasty = t,
            o.lastscrollx = -1,
            o.lastscrolly = -1
        }
        ,
        this.update = function(e, t) {
            var r = f();
            o.steptime = r - o.lasttime,
            o.lasttime = r;
            var i = t - o.lasty
              , s = e - o.lastx
              , n = o.nc.getScrollTop() + i
              , l = o.nc.getScrollLeft() + s;
            o.snapx = l < 0 || l > o.nc.page.maxw,
            o.snapy = n < 0 || n > o.nc.page.maxh,
            o.speedx = s,
            o.speedy = i,
            o.lastx = e,
            o.lasty = t
        }
        ,
        this.stop = function() {
            o.nc.unsynched("domomentum2d"),
            o.timer && clearTimeout(o.timer),
            o.timer = 0,
            o.lastscrollx = -1,
            o.lastscrolly = -1
        }
        ,
        this.doSnapy = function(e, t) {
            var r = !1;
            t < 0 ? (t = 0,
            r = !0) : t > o.nc.page.maxh && (t = o.nc.page.maxh,
            r = !0),
            e < 0 ? (e = 0,
            r = !0) : e > o.nc.page.maxw && (e = o.nc.page.maxw,
            r = !0),
            r ? o.nc.doScrollPos(e, t, o.nc.opt.snapbackspeed) : o.nc.triggerScrollEnd()
        }
        ,
        this.doMomentum = function(e) {
            var t = f()
              , r = e ? t + e : o.lasttime
              , i = o.nc.getScrollLeft()
              , s = o.nc.getScrollTop()
              , n = o.nc.page.maxh
              , l = o.nc.page.maxw;
            o.speedx = l > 0 ? Math.min(60, o.speedx) : 0,
            o.speedy = n > 0 ? Math.min(60, o.speedy) : 0;
            var a = r && t - r <= 60;
            (s < 0 || s > n || i < 0 || i > l) && (a = !1);
            var c = !(!o.speedy || !a) && o.speedy
              , d = !(!o.speedx || !a) && o.speedx;
            if (c || d) {
                var u = Math.max(16, o.steptime);
                if (u > 50) {
                    var h = u / 50;
                    o.speedx *= h,
                    o.speedy *= h,
                    u = 50
                }
                o.demulxy = 0,
                o.lastscrollx = o.nc.getScrollLeft(),
                o.chkx = o.lastscrollx,
                o.lastscrolly = o.nc.getScrollTop(),
                o.chky = o.lastscrolly;
                var p = o.lastscrollx
                  , m = o.lastscrolly
                  , g = function() {
                    var e = f() - t > 600 ? .04 : .02;
                    o.speedx && (p = Math.floor(o.lastscrollx - o.speedx * (1 - o.demulxy)),
                    o.lastscrollx = p,
                    (p < 0 || p > l) && (e = .1)),
                    o.speedy && (m = Math.floor(o.lastscrolly - o.speedy * (1 - o.demulxy)),
                    o.lastscrolly = m,
                    (m < 0 || m > n) && (e = .1)),
                    o.demulxy = Math.min(1, o.demulxy + e),
                    o.nc.synched("domomentum2d", function() {
                        if (o.speedx) {
                            o.nc.getScrollLeft();
                            o.chkx = p,
                            o.nc.setScrollLeft(p)
                        }
                        if (o.speedy) {
                            o.nc.getScrollTop();
                            o.chky = m,
                            o.nc.setScrollTop(m)
                        }
                        o.timer || (o.nc.hideCursor(),
                        o.doSnapy(p, m))
                    }),
                    o.demulxy < 1 ? o.timer = setTimeout(g, u) : (o.stop(),
                    o.nc.hideCursor(),
                    o.doSnapy(p, m))
                };
                g()
            } else
                o.doSnapy(o.nc.getScrollLeft(), o.nc.getScrollTop())
        }
    }
      , x = e.fn.scrollTop;
    e.cssHooks.pageYOffset = {
        get: function(e, o, t) {
            var r = n.data(e, "__nicescroll") || !1;
            return r && r.ishwscroll ? r.getScrollTop() : x.call(e)
        },
        set: function(e, o) {
            var t = n.data(e, "__nicescroll") || !1;
            return t && t.ishwscroll ? t.setScrollTop(parseInt(o)) : x.call(e, o),
            this
        }
    },
    e.fn.scrollTop = function(e) {
        if (void 0 === e) {
            var o = !!this[0] && (n.data(this[0], "__nicescroll") || !1);
            return o && o.ishwscroll ? o.getScrollTop() : x.call(this)
        }
        return this.each(function() {
            var o = n.data(this, "__nicescroll") || !1;
            o && o.ishwscroll ? o.setScrollTop(parseInt(e)) : x.call(n(this), e)
        })
    }
    ;
    var S = e.fn.scrollLeft;
    n.cssHooks.pageXOffset = {
        get: function(e, o, t) {
            var r = n.data(e, "__nicescroll") || !1;
            return r && r.ishwscroll ? r.getScrollLeft() : S.call(e)
        },
        set: function(e, o) {
            var t = n.data(e, "__nicescroll") || !1;
            return t && t.ishwscroll ? t.setScrollLeft(parseInt(o)) : S.call(e, o),
            this
        }
    },
    e.fn.scrollLeft = function(e) {
        if (void 0 === e) {
            var o = !!this[0] && (n.data(this[0], "__nicescroll") || !1);
            return o && o.ishwscroll ? o.getScrollLeft() : S.call(this)
        }
        return this.each(function() {
            var o = n.data(this, "__nicescroll") || !1;
            o && o.ishwscroll ? o.setScrollLeft(parseInt(e)) : S.call(n(this), e)
        })
    }
    ;
    var z = function(e) {
        var o = this;
        if (this.length = 0,
        this.name = "nicescrollarray",
        this.each = function(e) {
            return n.each(o, e),
            o
        }
        ,
        this.push = function(e) {
            o[o.length] = e,
            o.length++
        }
        ,
        this.eq = function(e) {
            return o[e]
        }
        ,
        e)
            for (var t = 0; t < e.length; t++) {
                var r = n.data(e[t], "__nicescroll") || !1;
                r && (this[this.length] = r,
                this.length++)
            }
        return this
    };
    !function(e, o, t) {
        for (var r = 0, i = o.length; r < i; r++)
            t(e, o[r])
    }(z.prototype, ["show", "hide", "toggle", "onResize", "resize", "remove", "stop", "doScrollPos"], function(e, o) {
        e[o] = function() {
            var e = arguments;
            return this.each(function() {
                this[o].apply(this, e)
            })
        }
    }),
    e.fn.getNiceScroll = function(e) {
        return void 0 === e ? new z(this) : this[e] && n.data(this[e], "__nicescroll") || !1
    }
    ,
    (e.expr.pseudos || e.expr[":"]).nicescroll = function(e) {
        return void 0 !== n.data(e, "__nicescroll")
    }
    ,
    n.fn.niceScroll = function(e, o) {
        void 0 !== o || "object" != typeof e || "jquery"in e || (o = e,
        e = !1);
        var t = new z;
        return this.each(function() {
            var r = n(this)
              , i = n.extend({}, o);
            if (e) {
                var s = n(e);
                i.doc = s.length > 1 ? n(e, r) : s,
                i.win = r
            }
            !("doc"in i) || "win"in i || (i.win = r);
            var l = r.data("__nicescroll") || !1;
            l || (i.doc = i.doc || r,
            l = new b(i,r),
            r.data("__nicescroll", l)),
            t.push(l)
        }),
        1 === t.length ? t[0] : t
    }
    ,
    a.NiceScroll = {
        getjQuery: function() {
            return e
        }
    },
    n.nicescroll || (n.nicescroll = new z,
    n.nicescroll.options = g)
});
;;(function($, document, window, undefined) {
    'use strict';
    $.fn.pagepiling = function(custom) {
        var PP = $.fn.pagepiling;
        var container = $(this);
        var lastScrolledDestiny;
        var lastAnimation = 0;
        var isTouch = (('ontouchstart'in window) || (navigator.msMaxTouchPoints > 0) || (navigator.maxTouchPoints));
        var touchStartY = 0
          , touchStartX = 0
          , touchEndY = 0
          , touchEndX = 0;
        var scrollings = [];
        var scrollDelay = 600;
        var options = $.extend(true, {
            direction: 'vertical',
            menu: null,
            verticalCentered: true,
            sectionsColor: [],
            anchors: [],
            scrollingSpeed: 700,
            easing: 'easeInQuart',
            loopBottom: false,
            loopTop: false,
            css3: true,
            navigation: {
                textColor: '#000',
                bulletsColor: '#000',
                position: 'right',
                tooltips: []
            },
            normalScrollElements: null,
            normalScrollElementTouchThreshold: 5,
            touchSensitivity: 5,
            keyboardScrolling: true,
            sectionSelector: '.section',
            animateAnchor: false,
            afterLoad: null,
            onLeave: null,
            afterRender: null
        }, custom);
        $.extend($.easing, {
            easeInQuart: function(x, t, b, c, d) {
                return c * (t /= d) * t * t * t + b;
            }
        });
        PP.setScrollingSpeed = function(value) {
            options.scrollingSpeed = value;
        }
        ;
        PP.setMouseWheelScrolling = function(value) {
            if (value) {
                addMouseWheelHandler();
            } else {
                removeMouseWheelHandler();
            }
        }
        ;
        PP.setAllowScrolling = function(value) {
            if (value) {
                PP.setMouseWheelScrolling(true);
                addTouchHandler();
            } else {
                PP.setMouseWheelScrolling(false);
                removeTouchHandler();
            }
        }
        ;
        PP.setKeyboardScrolling = function(value) {
            options.keyboardScrolling = value;
        }
        ;
        PP.moveSectionUp = function() {
            var prev = $('.pp-section.active').prev('.pp-section');
            if (!prev.length && options.loopTop) {
                prev = $('.pp-section').last();
            }
            if (prev.length) {
                scrollPage(prev);
            }
        }
        ;
        PP.moveSectionDown = function() {
            var next = $('.pp-section.active').next('.pp-section');
            if (!next.length && options.loopBottom) {
                next = $('.pp-section').first();
            }
            if (next.length) {
                scrollPage(next);
            }
        }
        ;
        PP.moveTo = function(section) {
            var destiny = '';
            if (isNaN(section)) {
                destiny = $(document).find('[data-anchor="' + section + '"]');
            } else {
                destiny = $('.pp-section').eq((section - 1));
            }
            if (destiny.length > 0) {
                scrollPage(destiny);
            }
        }
        ;
        $(options.sectionSelector).each(function() {
            $(this).addClass('pp-section');
        });
        if (options.css3) {
            options.css3 = support3d();
        }
        $(container).css({
            'overflow': 'hidden',
            '-ms-touch-action': 'none',
            'touch-action': 'none'
        });
        PP.setAllowScrolling(true);
        if (!$.isEmptyObject(options.navigation)) {
            addVerticalNavigation();
        }
        var zIndex = $('.pp-section').length;
        $('.pp-section').each(function(index) {
            $(this).data('data-index', index);
            $(this).css('z-index', zIndex);
            if (!index && $('.pp-section.active').length === 0) {
                $(this).addClass('active');
            }
            if (typeof options.anchors[index] !== 'undefined') {
                $(this).attr('data-anchor', options.anchors[index]);
            }
            if (typeof options.sectionsColor[index] !== 'undefined') {
                $(this).css('background-color', options.sectionsColor[index]);
            }
            if (options.verticalCentered && !$(this).hasClass('pp-scrollable')) {
                addTableClass($(this));
            }
            zIndex = zIndex - 1;
        }).promise().done(function() {
            if (options.navigation) {
                $('#pp-nav').css('margin-top', '-' + ($('#pp-nav').height() / 2) + 'px');
                $('#pp-nav').find('li').eq($('.pp-section.active').index('.pp-section')).find('a').addClass('active');
            }
            $(window).on('load', function() {
                scrollToAnchor();
            });
            $.isFunction(options.afterRender) && options.afterRender.call(this);
        });
        function addTableClass(element) {
            element.addClass('pp-table').wrapInner('<div class="pp-tableCell" style="height:100%" />');
        }
        function getYmovement(destiny) {
            var fromIndex = $('.pp-section.active').index('.pp-section');
            var toIndex = destiny.index('.pp-section');
            if (fromIndex > toIndex) {
                return 'up';
            }
            return 'down';
        }
        function scrollPage(destination, animated) {
            var v = {
                destination: destination,
                animated: animated,
                activeSection: $('.pp-section.active'),
                anchorLink: destination.data('anchor'),
                sectionIndex: destination.index('.pp-section'),
                toMove: destination,
                yMovement: getYmovement(destination),
                leavingSection: $('.pp-section.active').index('.pp-section') + 1
            };
            if (v.activeSection.is(destination)) {
                return;
            }
            if (typeof v.animated === 'undefined') {
                v.animated = true;
            }
            if (typeof v.anchorLink !== 'undefined') {
                setURLHash(v.anchorLink, v.sectionIndex);
            }
            v.destination.addClass('active').siblings().removeClass('active');
            v.sectionsToMove = getSectionsToMove(v);
            if (v.yMovement === 'down') {
                v.translate3d = getTranslate3d();
                v.scrolling = '-100%';
                if (!options.css3) {
                    v.sectionsToMove.each(function(index) {
                        if (index != v.activeSection.index('.pp-section')) {
                            $(this).css(getScrollProp(v.scrolling));
                        }
                    });
                }
                v.animateSection = v.activeSection;
            } else {
                v.translate3d = 'translate3d(0px, 0px, 0px)';
                v.scrolling = '0';
                v.animateSection = destination;
            }
            $.isFunction(options.onLeave) && options.onLeave.call(this, v.leavingSection, (v.sectionIndex + 1), v.yMovement);
            performMovement(v);
            activateMenuElement(v.anchorLink);
            activateNavDots(v.anchorLink, v.sectionIndex);
            lastScrolledDestiny = v.anchorLink;
            var timeNow = new Date().getTime();
            lastAnimation = timeNow;
        }
        function performMovement(v) {
            if (options.css3) {
                transformContainer(v.animateSection, v.translate3d, v.animated);
                v.sectionsToMove.each(function() {
                    transformContainer($(this), v.translate3d, v.animated);
                });
                setTimeout(function() {
                    afterSectionLoads(v);
                }, options.scrollingSpeed);
            } else {
                v.scrollOptions = getScrollProp(v.scrolling);
                if (v.animated) {
                    v.animateSection.animate(v.scrollOptions, options.scrollingSpeed, options.easing, function() {
                        readjustSections(v);
                        afterSectionLoads(v);
                    });
                } else {
                    v.animateSection.css(getScrollProp(v.scrolling));
                    setTimeout(function() {
                        readjustSections(v);
                        afterSectionLoads(v);
                    }, 400);
                }
            }
        }
        function afterSectionLoads(v) {
            $.isFunction(options.afterLoad) && options.afterLoad.call(this, v.anchorLink, (v.sectionIndex + 1));
        }
        function getSectionsToMove(v) {
            var sectionToMove;
            if (v.yMovement === 'down') {
                sectionToMove = $('.pp-section').map(function(index) {
                    if (index < v.destination.index('.pp-section')) {
                        return $(this);
                    }
                });
            } else {
                sectionToMove = $('.pp-section').map(function(index) {
                    if (index > v.destination.index('.pp-section')) {
                        return $(this);
                    }
                });
            }
            return sectionToMove;
        }
        function readjustSections(v) {
            if (v.yMovement === 'up') {
                v.sectionsToMove.each(function(index) {
                    $(this).css(getScrollProp(v.scrolling));
                });
            }
        }
        function getScrollProp(propertyValue) {
            if (options.direction === 'vertical') {
                return {
                    'top': propertyValue
                };
            }
            return {
                'left': propertyValue
            };
        }
        function silentScroll(section, offset) {
            if (options.css3) {
                transformContainer(section, getTranslate3d(), false);
            } else {
                section.css(getScrollProp(offset));
            }
        }
        function setURLHash(anchorLink, sectionIndex) {
            if (options.anchors.length) {
                location.hash = anchorLink;
                setBodyClass(location.hash);
            } else {
                setBodyClass(String(sectionIndex));
            }
        }
        function setBodyClass(text) {
            text = text.replace('#', '');
            $('body')[0].className = $('body')[0].className.replace(/\b\s?pp-viewing-[^\s]+\b/g, '');
            $('body').addClass('pp-viewing-' + text);
        }
        function scrollToAnchor() {
            var value = window.location.hash.replace('#', '');
            var sectionAnchor = value;
            var section = $(document).find('.pp-section[data-anchor="' + sectionAnchor + '"]');
            if (section.length > 0) {
                scrollPage(section, options.animateAnchor);
            }
        }
        function isMoving() {
            var timeNow = new Date().getTime();
            if (timeNow - lastAnimation < scrollDelay + options.scrollingSpeed) {
                return true;
            }
            return false;
        }
        $(window).on('hashchange', hashChangeHandler);
        function hashChangeHandler() {
            var value = window.location.hash.replace('#', '').split('/');
            var sectionAnchor = value[0];
            if (sectionAnchor.length) {
                if (sectionAnchor && sectionAnchor !== lastScrolledDestiny) {
                    var section;
                    if (isNaN(sectionAnchor)) {
                        section = $(document).find('[data-anchor="' + sectionAnchor + '"]');
                    } else {
                        section = $('.pp-section').eq((sectionAnchor - 1));
                    }
                    scrollPage(section);
                }
            }
        }
        function getTransforms(translate3d) {
            return {
                '-webkit-transform': translate3d,
                '-moz-transform': translate3d,
                '-ms-transform': translate3d,
                'transform': translate3d
            };
        }
        function transformContainer(element, translate3d, animated) {
            element.toggleClass('pp-easing', animated);
            element.css(getTransforms(translate3d));
        }
        $(document).keydown(function(e) {
            if (options.keyboardScrolling && !isMoving()) {
                switch (e.which) {
                case 38:
                case 33:
                    PP.moveSectionUp();
                    break;
                case 40:
                case 34:
                    PP.moveSectionDown();
                    break;
                case 36:
                    PP.moveTo(1);
                    break;
                case 35:
                    PP.moveTo($('.pp-section').length);
                    break;
                case 37:
                    PP.moveSectionUp();
                    break;
                case 39:
                    PP.moveSectionDown();
                    break;
                default:
                    return;
                }
            }
        });
        if (options.normalScrollElements) {
            $(document).on('mouseenter', options.normalScrollElements, function() {
                PP.setMouseWheelScrolling(false);
            });
            $(document).on('mouseleave', options.normalScrollElements, function() {
                PP.setMouseWheelScrolling(true);
            });
        }
        var prevTime = new Date().getTime();
        function MouseWheelHandler(e) {
            var curTime = new Date().getTime();
            e = e || window.event;
            var value = e.wheelDelta || -e.deltaY || -e.detail;
            var delta = Math.max(-1, Math.min(1, value));
            var horizontalDetection = typeof e.wheelDeltaX !== 'undefined' || typeof e.deltaX !== 'undefined';
            var isScrollingVertically = (Math.abs(e.wheelDeltaX) < Math.abs(e.wheelDelta)) || (Math.abs(e.deltaX) < Math.abs(e.deltaY) || !horizontalDetection);
            if (scrollings.length > 149) {
                scrollings.shift();
            }
            scrollings.push(Math.abs(value));
            var timeDiff = curTime - prevTime;
            prevTime = curTime;
            if (timeDiff > 200) {
                scrollings = [];
            }
            if (!isMoving()) {
                var activeSection = $('.pp-section.active');
                var scrollable = isScrollable(activeSection);
                var averageEnd = getAverage(scrollings, 10);
                var averageMiddle = getAverage(scrollings, 70);
                var isAccelerating = averageEnd >= averageMiddle;
                if (isAccelerating && isScrollingVertically) {
                    if (delta < 0) {
                        scrolling('down', scrollable);
                    } else if (delta > 0) {
                        scrolling('up', scrollable);
                    }
                }
                return false;
            }
        }
        function getAverage(elements, number) {
            var sum = 0;
            var lastElements = elements.slice(Math.max(elements.length - number, 1));
            for (var i = 0; i < lastElements.length; i++) {
                sum = sum + lastElements[i];
            }
            return Math.ceil(sum / number);
        }
        function scrolling(type, scrollable) {
            var check;
            var scrollSection;
            if (type == 'down') {
                check = 'bottom';
                scrollSection = PP.moveSectionDown;
            } else {
                check = 'top';
                scrollSection = PP.moveSectionUp;
            }
            if (scrollable.length > 0) {
                if (isScrolled(check, scrollable)) {
                    scrollSection();
                } else {
                    return true;
                }
            } else {
                scrollSection();
            }
        }
        function isScrolled(type, scrollable) {
            if (type === 'top') {
                return !scrollable.scrollTop();
            } else if (type === 'bottom') {
                return scrollable.scrollTop() + 1 + scrollable.innerHeight() >= scrollable[0].scrollHeight;
            }
        }
        function isScrollable(activeSection) {
            return activeSection.filter('.pp-scrollable');
        }
        function removeMouseWheelHandler() {
            if (container.get(0).addEventListener) {
                container.get(0).removeEventListener('mousewheel', MouseWheelHandler, false);
                container.get(0).removeEventListener('wheel', MouseWheelHandler, false);
            } else {
                container.get(0).detachEvent('onmousewheel', MouseWheelHandler);
            }
        }
        function addMouseWheelHandler() {
            if (container.get(0).addEventListener) {
                container.get(0).addEventListener('mousewheel', MouseWheelHandler, false);
                container.get(0).addEventListener('wheel', MouseWheelHandler, false);
            } else {
                container.get(0).attachEvent('onmousewheel', MouseWheelHandler);
            }
        }
        function addTouchHandler() {
            if (isTouch) {
                var MSPointer = getMSPointer();
                container.off('touchstart ' + MSPointer.down).on('touchstart ' + MSPointer.down, touchStartHandler);
                container.off('touchmove ' + MSPointer.move).on('touchmove ' + MSPointer.move, touchMoveHandler);
            }
        }
        function removeTouchHandler() {
            if (isTouch) {
                var MSPointer = getMSPointer();
                container.off('touchstart ' + MSPointer.down);
                container.off('touchmove ' + MSPointer.move);
            }
        }
        function getMSPointer() {
            var pointer;
            if (window.PointerEvent) {
                pointer = {
                    down: 'pointerdown',
                    move: 'pointermove',
                    up: 'pointerup'
                };
            } else {
                pointer = {
                    down: 'MSPointerDown',
                    move: 'MSPointerMove',
                    up: 'MSPointerUp'
                };
            }
            return pointer;
        }
        function getEventsPage(e) {
            var events = new Array();
            events.y = (typeof e.pageY !== 'undefined' && (e.pageY || e.pageX) ? e.pageY : e.touches[0].pageY);
            events.x = (typeof e.pageX !== 'undefined' && (e.pageY || e.pageX) ? e.pageX : e.touches[0].pageX);
            return events;
        }
        function isReallyTouch(e) {
            return typeof e.pointerType === 'undefined' || e.pointerType != 'mouse';
        }
        function touchStartHandler(event) {
            var e = event.originalEvent;
            if (isReallyTouch(e)) {
                var touchEvents = getEventsPage(e);
                touchStartY = touchEvents.y;
                touchStartX = touchEvents.x;
            }
        }
        function touchMoveHandler(event) {
            var e = event.originalEvent;
            if (!checkParentForNormalScrollElement(event.target) && isReallyTouch(e)) {
                var activeSection = $('.pp-section.active');
                var scrollable = isScrollable(activeSection);
                if (!scrollable.length) {
                    event.preventDefault();
                }
                if (!isMoving()) {
                    var touchEvents = getEventsPage(e);
                    touchEndY = touchEvents.y;
                    touchEndX = touchEvents.x;
                    if (options.direction === 'horizontal' && Math.abs(touchStartX - touchEndX) > (Math.abs(touchStartY - touchEndY))) {
                        if (Math.abs(touchStartX - touchEndX) > (container.width() / 100 * options.touchSensitivity)) {
                            if (touchStartX > touchEndX) {
                                scrolling('down', scrollable);
                            } else if (touchEndX > touchStartX) {
                                scrolling('up', scrollable);
                            }
                        }
                    } else {
                        if (Math.abs(touchStartY - touchEndY) > (container.height() / 100 * options.touchSensitivity)) {
                            if (touchStartY > touchEndY) {
                                scrolling('down', scrollable);
                            } else if (touchEndY > touchStartY) {
                                scrolling('up', scrollable);
                            }
                        }
                    }
                }
            }
        }
        function checkParentForNormalScrollElement(el, hop) {
            hop = hop || 0;
            var parent = $(el).parent();
            if (hop < options.normalScrollElementTouchThreshold && parent.is(options.normalScrollElements)) {
                return true;
            } else if (hop == options.normalScrollElementTouchThreshold) {
                return false;
            } else {
                return checkParentForNormalScrollElement(parent, ++hop);
            }
        }
        function addVerticalNavigation() {
            $('body').append('<div id="pp-nav"><ul></ul></div>');
            var nav = $('#pp-nav');
            nav.css('color', options.navigation.textColor);
            nav.addClass(options.navigation.position);
            for (var cont = 0; cont < $('.pp-section').length; cont++) {
                var link = '';
                if (options.anchors.length) {
                    link = options.anchors[cont];
                }
                if (options.navigation.tooltips !== 'undefined') {
                    var tooltip = options.navigation.tooltips[cont];
                    if (typeof tooltip === 'undefined') {
                        tooltip = '';
                    }
                }
                nav.find('ul').append('<li data-tooltip="' + tooltip + '"><a href="#' + link + '"><span></span></a></li>');
            }
            nav.find('span').css('border-color', options.navigation.bulletsColor);
        }
        $(document).on('click touchstart', '#pp-nav a', function(e) {
            e.preventDefault();
            var index = $(this).parent().index();
            scrollPage($('.pp-section').eq(index));
        });
        $(document).on({
            mouseenter: function() {
                var tooltip = $(this).data('tooltip');
                $('<div class="pp-tooltip ' + options.navigation.position + '">' + tooltip + '</div>').hide().appendTo($(this)).fadeIn(200);
            },
            mouseleave: function() {
                $(this).find('.pp-tooltip').fadeOut(200, function() {
                    $(this).remove();
                });
            }
        }, '#pp-nav li');
        function activateNavDots(name, sectionIndex) {
            if (options.navigation) {
                $('#pp-nav').find('.active').removeClass('active');
                if (name) {
                    $('#pp-nav').find('a[href="#' + name + '"]').addClass('active');
                } else {
                    $('#pp-nav').find('li').eq(sectionIndex).find('a').addClass('active');
                }
            }
        }
        function activateMenuElement(name) {
            if (options.menu) {
                $(options.menu).find('.active').removeClass('active');
                $(options.menu).find('[data-menuanchor="' + name + '"]').addClass('active');
            }
        }
        function support3d() {
            var el = document.createElement('p'), has3d, transforms = {
                'webkitTransform': '-webkit-transform',
                'OTransform': '-o-transform',
                'msTransform': '-ms-transform',
                'MozTransform': '-moz-transform',
                'transform': 'transform'
            };
            document.body.insertBefore(el, null);
            for (var t in transforms) {
                if (el.style[t] !== undefined) {
                    el.style[t] = 'translate3d(1px,1px,1px)';
                    has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
                }
            }
            document.body.removeChild(el);
            return (has3d !== undefined && has3d.length > 0 && has3d !== 'none');
        }
        function getTranslate3d() {
            if (options.direction !== 'vertical') {
                return 'translate3d(-100%, 0px, 0px)';
            }
            return 'translate3d(0px, -100%, 0px)';
        }
    }
    ;
}
)(jQuery, document, window);
;;/*!
 * 
 *   typed.js - A JavaScript Typing Animation Library
 *   Author: Matt Boldt <me@mattboldt.com>
 *   Version: v2.0.9
 *   Url: https://github.com/mattboldt/typed.js
 *   License(s): MIT
 * 
 */
(function(t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.Typed = e() : t.Typed = e()
}
)(this, function() {
    return function(t) {
        function e(n) {
            if (s[n])
                return s[n].exports;
            var i = s[n] = {
                exports: {},
                id: n,
                loaded: !1
            };
            return t[n].call(i.exports, i, i.exports, e),
            i.loaded = !0,
            i.exports
        }
        var s = {};
        return e.m = t,
        e.c = s,
        e.p = "",
        e(0)
    }([function(t, e, s) {
        "use strict";
        function n(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = function() {
            function t(t, e) {
                for (var s = 0; s < e.length; s++) {
                    var n = e[s];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, s, n) {
                return s && t(e.prototype, s),
                n && t(e, n),
                e
            }
        }()
          , r = s(1)
          , o = s(3)
          , a = function() {
            function t(e, s) {
                n(this, t),
                r.initializer.load(this, s, e),
                this.begin()
            }
            return i(t, [{
                key: "toggle",
                value: function() {
                    this.pause.status ? this.start() : this.stop()
                }
            }, {
                key: "stop",
                value: function() {
                    this.typingComplete || this.pause.status || (this.toggleBlinking(!0),
                    this.pause.status = !0,
                    this.options.onStop(this.arrayPos, this))
                }
            }, {
                key: "start",
                value: function() {
                    this.typingComplete || this.pause.status && (this.pause.status = !1,
                    this.pause.typewrite ? this.typewrite(this.pause.curString, this.pause.curStrPos) : this.backspace(this.pause.curString, this.pause.curStrPos),
                    this.options.onStart(this.arrayPos, this))
                }
            }, {
                key: "destroy",
                value: function() {
                    this.reset(!1),
                    this.options.onDestroy(this)
                }
            }, {
                key: "reset",
                value: function() {
                    var t = arguments.length <= 0 || void 0 === arguments[0] || arguments[0];
                    clearInterval(this.timeout),
                    this.replaceText(""),
                    this.cursor && this.cursor.parentNode && (this.cursor.parentNode.removeChild(this.cursor),
                    this.cursor = null),
                    this.strPos = 0,
                    this.arrayPos = 0,
                    this.curLoop = 0,
                    t && (this.insertCursor(),
                    this.options.onReset(this),
                    this.begin())
                }
            }, {
                key: "begin",
                value: function() {
                    var t = this;
                    this.typingComplete = !1,
                    this.shuffleStringsIfNeeded(this),
                    this.insertCursor(),
                    this.bindInputFocusEvents && this.bindFocusEvents(),
                    this.timeout = setTimeout(function() {
                        t.currentElContent && 0 !== t.currentElContent.length ? t.backspace(t.currentElContent, t.currentElContent.length) : t.typewrite(t.strings[t.sequence[t.arrayPos]], t.strPos)
                    }, this.startDelay)
                }
            }, {
                key: "typewrite",
                value: function(t, e) {
                    var s = this;
                    this.fadeOut && this.el.classList.contains(this.fadeOutClass) && (this.el.classList.remove(this.fadeOutClass),
                    this.cursor && this.cursor.classList.remove(this.fadeOutClass));
                    var n = this.humanizer(this.typeSpeed)
                      , i = 1;
                    return this.pause.status === !0 ? void this.setPauseStatus(t, e, !0) : void (this.timeout = setTimeout(function() {
                        e = o.htmlParser.typeHtmlChars(t, e, s);
                        var n = 0
                          , r = t.substr(e);
                        if ("^" === r.charAt(0) && /^\^\d+/.test(r)) {
                            var a = 1;
                            r = /\d+/.exec(r)[0],
                            a += r.length,
                            n = parseInt(r),
                            s.temporaryPause = !0,
                            s.options.onTypingPaused(s.arrayPos, s),
                            t = t.substring(0, e) + t.substring(e + a),
                            s.toggleBlinking(!0)
                        }
                        if ("`" === r.charAt(0)) {
                            for (; "`" !== t.substr(e + i).charAt(0) && (i++,
                            !(e + i > t.length)); )
                                ;
                            var u = t.substring(0, e)
                              , l = t.substring(u.length + 1, e + i)
                              , c = t.substring(e + i + 1);
                            t = u + l + c,
                            i--
                        }
                        s.timeout = setTimeout(function() {
                            s.toggleBlinking(!1),
                            e >= t.length ? s.doneTyping(t, e) : s.keepTyping(t, e, i),
                            s.temporaryPause && (s.temporaryPause = !1,
                            s.options.onTypingResumed(s.arrayPos, s))
                        }, n)
                    }, n))
                }
            }, {
                key: "keepTyping",
                value: function(t, e, s) {
                    0 === e && (this.toggleBlinking(!1),
                    this.options.preStringTyped(this.arrayPos, this)),
                    e += s;
                    var n = t.substr(0, e);
                    this.replaceText(n),
                    this.typewrite(t, e)
                }
            }, {
                key: "doneTyping",
                value: function(t, e) {
                    var s = this;
                    this.options.onStringTyped(this.arrayPos, this),
                    this.toggleBlinking(!0),
                    this.arrayPos === this.strings.length - 1 && (this.complete(),
                    this.loop === !1 || this.curLoop === this.loopCount) || (this.timeout = setTimeout(function() {
                        s.backspace(t, e)
                    }, this.backDelay))
                }
            }, {
                key: "backspace",
                value: function(t, e) {
                    var s = this;
                    if (this.pause.status === !0)
                        return void this.setPauseStatus(t, e, !0);
                    if (this.fadeOut)
                        return this.initFadeOut();
                    this.toggleBlinking(!1);
                    var n = this.humanizer(this.backSpeed);
                    this.timeout = setTimeout(function() {
                        e = o.htmlParser.backSpaceHtmlChars(t, e, s);
                        var n = t.substr(0, e);
                        if (s.replaceText(n),
                        s.smartBackspace) {
                            var i = s.strings[s.arrayPos + 1];
                            i && n === i.substr(0, e) ? s.stopNum = e : s.stopNum = 0
                        }
                        e > s.stopNum ? (e--,
                        s.backspace(t, e)) : e <= s.stopNum && (s.arrayPos++,
                        s.arrayPos === s.strings.length ? (s.arrayPos = 0,
                        s.options.onLastStringBackspaced(),
                        s.shuffleStringsIfNeeded(),
                        s.begin()) : s.typewrite(s.strings[s.sequence[s.arrayPos]], e))
                    }, n)
                }
            }, {
                key: "complete",
                value: function() {
                    this.options.onComplete(this),
                    this.loop ? this.curLoop++ : this.typingComplete = !0
                }
            }, {
                key: "setPauseStatus",
                value: function(t, e, s) {
                    this.pause.typewrite = s,
                    this.pause.curString = t,
                    this.pause.curStrPos = e
                }
            }, {
                key: "toggleBlinking",
                value: function(t) {
                    this.cursor && (this.pause.status || this.cursorBlinking !== t && (this.cursorBlinking = t,
                    t ? this.cursor.classList.add("typed-cursor--blink") : this.cursor.classList.remove("typed-cursor--blink")))
                }
            }, {
                key: "humanizer",
                value: function(t) {
                    return Math.round(Math.random() * t / 2) + t
                }
            }, {
                key: "shuffleStringsIfNeeded",
                value: function() {
                    this.shuffle && (this.sequence = this.sequence.sort(function() {
                        return Math.random() - .5
                    }))
                }
            }, {
                key: "initFadeOut",
                value: function() {
                    var t = this;
                    return this.el.className += " " + this.fadeOutClass,
                    this.cursor && (this.cursor.className += " " + this.fadeOutClass),
                    setTimeout(function() {
                        t.arrayPos++,
                        t.replaceText(""),
                        t.strings.length > t.arrayPos ? t.typewrite(t.strings[t.sequence[t.arrayPos]], 0) : (t.typewrite(t.strings[0], 0),
                        t.arrayPos = 0)
                    }, this.fadeOutDelay)
                }
            }, {
                key: "replaceText",
                value: function(t) {
                    this.attr ? this.el.setAttribute(this.attr, t) : this.isInput ? this.el.value = t : "html" === this.contentType ? this.el.innerHTML = t : this.el.textContent = t
                }
            }, {
                key: "bindFocusEvents",
                value: function() {
                    var t = this;
                    this.isInput && (this.el.addEventListener("focus", function(e) {
                        t.stop()
                    }),
                    this.el.addEventListener("blur", function(e) {
                        t.el.value && 0 !== t.el.value.length || t.start()
                    }))
                }
            }, {
                key: "insertCursor",
                value: function() {
                    this.showCursor && (this.cursor || (this.cursor = document.createElement("span"),
                    this.cursor.className = "typed-cursor",
                    this.cursor.innerHTML = this.cursorChar,
                    this.el.parentNode && this.el.parentNode.insertBefore(this.cursor, this.el.nextSibling)))
                }
            }]),
            t
        }();
        e["default"] = a,
        t.exports = e["default"]
    }
    , function(t, e, s) {
        "use strict";
        function n(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var s = arguments[e];
                for (var n in s)
                    Object.prototype.hasOwnProperty.call(s, n) && (t[n] = s[n])
            }
            return t
        }
          , o = function() {
            function t(t, e) {
                for (var s = 0; s < e.length; s++) {
                    var n = e[s];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, s, n) {
                return s && t(e.prototype, s),
                n && t(e, n),
                e
            }
        }()
          , a = s(2)
          , u = n(a)
          , l = function() {
            function t() {
                i(this, t)
            }
            return o(t, [{
                key: "load",
                value: function(t, e, s) {
                    if ("string" == typeof s ? t.el = document.querySelector(s) : t.el = s,
                    t.options = r({}, u["default"], e),
                    t.isInput = "input" === t.el.tagName.toLowerCase(),
                    t.attr = t.options.attr,
                    t.bindInputFocusEvents = t.options.bindInputFocusEvents,
                    t.showCursor = !t.isInput && t.options.showCursor,
                    t.cursorChar = t.options.cursorChar,
                    t.cursorBlinking = !0,
                    t.elContent = t.attr ? t.el.getAttribute(t.attr) : t.el.textContent,
                    t.contentType = t.options.contentType,
                    t.typeSpeed = t.options.typeSpeed,
                    t.startDelay = t.options.startDelay,
                    t.backSpeed = t.options.backSpeed,
                    t.smartBackspace = t.options.smartBackspace,
                    t.backDelay = t.options.backDelay,
                    t.fadeOut = t.options.fadeOut,
                    t.fadeOutClass = t.options.fadeOutClass,
                    t.fadeOutDelay = t.options.fadeOutDelay,
                    t.isPaused = !1,
                    t.strings = t.options.strings.map(function(t) {
                        return t.trim()
                    }),
                    "string" == typeof t.options.stringsElement ? t.stringsElement = document.querySelector(t.options.stringsElement) : t.stringsElement = t.options.stringsElement,
                    t.stringsElement) {
                        t.strings = [],
                        t.stringsElement.style.display = "none";
                        var n = Array.prototype.slice.apply(t.stringsElement.children)
                          , i = n.length;
                        if (i)
                            for (var o = 0; o < i; o += 1) {
                                var a = n[o];
                                t.strings.push(a.innerHTML.trim())
                            }
                    }
                    t.strPos = 0,
                    t.arrayPos = 0,
                    t.stopNum = 0,
                    t.loop = t.options.loop,
                    t.loopCount = t.options.loopCount,
                    t.curLoop = 0,
                    t.shuffle = t.options.shuffle,
                    t.sequence = [],
                    t.pause = {
                        status: !1,
                        typewrite: !0,
                        curString: "",
                        curStrPos: 0
                    },
                    t.typingComplete = !1;
                    for (var o in t.strings)
                        t.sequence[o] = o;
                    t.currentElContent = this.getCurrentElContent(t),
                    t.autoInsertCss = t.options.autoInsertCss,
                    this.appendAnimationCss(t)
                }
            }, {
                key: "getCurrentElContent",
                value: function(t) {
                    var e = "";
                    return e = t.attr ? t.el.getAttribute(t.attr) : t.isInput ? t.el.value : "html" === t.contentType ? t.el.innerHTML : t.el.textContent
                }
            }, {
                key: "appendAnimationCss",
                value: function(t) {
                    var e = "data-typed-js-css";
                    if (t.autoInsertCss && (t.showCursor || t.fadeOut) && !document.querySelector("[" + e + "]")) {
                        var s = document.createElement("style");
                        s.type = "text/css",
                        s.setAttribute(e, !0);
                        var n = "";
                        t.showCursor && (n += "\n        .typed-cursor{\n          opacity: 1;\n        }\n        .typed-cursor.typed-cursor--blink{\n          animation: typedjsBlink 0.7s infinite;\n          -webkit-animation: typedjsBlink 0.7s infinite;\n                  animation: typedjsBlink 0.7s infinite;\n        }\n        @keyframes typedjsBlink{\n          50% { opacity: 0.0; }\n        }\n        @-webkit-keyframes typedjsBlink{\n          0% { opacity: 1; }\n          50% { opacity: 0.0; }\n          100% { opacity: 1; }\n        }\n      "),
                        t.fadeOut && (n += "\n        .typed-fade-out{\n          opacity: 0;\n          transition: opacity .25s;\n        }\n        .typed-cursor.typed-cursor--blink.typed-fade-out{\n          -webkit-animation: 0;\n          animation: 0;\n        }\n      "),
                        0 !== s.length && (s.innerHTML = n,
                        document.body.appendChild(s))
                    }
                }
            }]),
            t
        }();
        e["default"] = l;
        var c = new l;
        e.initializer = c
    }
    , function(t, e) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var s = {
            strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"],
            stringsElement: null,
            typeSpeed: 0,
            startDelay: 0,
            backSpeed: 0,
            smartBackspace: !0,
            shuffle: !1,
            backDelay: 700,
            fadeOut: !1,
            fadeOutClass: "typed-fade-out",
            fadeOutDelay: 500,
            loop: !1,
            loopCount: 1 / 0,
            showCursor: !0,
            cursorChar: "|",
            autoInsertCss: !0,
            attr: null,
            bindInputFocusEvents: !1,
            contentType: "html",
            onComplete: function(t) {},
            preStringTyped: function(t, e) {},
            onStringTyped: function(t, e) {},
            onLastStringBackspaced: function(t) {},
            onTypingPaused: function(t, e) {},
            onTypingResumed: function(t, e) {},
            onReset: function(t) {},
            onStop: function(t, e) {},
            onStart: function(t, e) {},
            onDestroy: function(t) {}
        };
        e["default"] = s,
        t.exports = e["default"]
    }
    , function(t, e) {
        "use strict";
        function s(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var n = function() {
            function t(t, e) {
                for (var s = 0; s < e.length; s++) {
                    var n = e[s];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, s, n) {
                return s && t(e.prototype, s),
                n && t(e, n),
                e
            }
        }()
          , i = function() {
            function t() {
                s(this, t)
            }
            return n(t, [{
                key: "typeHtmlChars",
                value: function(t, e, s) {
                    if ("html" !== s.contentType)
                        return e;
                    var n = t.substr(e).charAt(0);
                    if ("<" === n || "&" === n) {
                        var i = "";
                        for (i = "<" === n ? ">" : ";"; t.substr(e + 1).charAt(0) !== i && (e++,
                        !(e + 1 > t.length)); )
                            ;
                        e++
                    }
                    return e
                }
            }, {
                key: "backSpaceHtmlChars",
                value: function(t, e, s) {
                    if ("html" !== s.contentType)
                        return e;
                    var n = t.substr(e).charAt(0);
                    if (">" === n || ";" === n) {
                        var i = "";
                        for (i = ">" === n ? "<" : "&"; t.substr(e - 1).charAt(0) !== i && (e--,
                        !(e < 0)); )
                            ;
                        e--
                    }
                    return e
                }
            }]),
            t
        }();
        e["default"] = i;
        var r = new i;
        e.htmlParser = r
    }
    ])
});
;;!function(t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define("lazy-line-painter", [], e) : "object" == typeof exports ? exports["lazy-line-painter"] = e() : t["lazy-line-painter"] = e()
}(window, function() {
    return function(t) {
        var e = {};
        function i(n) {
            if (e[n])
                return e[n].exports;
            var s = e[n] = {
                i: n,
                l: !1,
                exports: {}
            };
            return t[n].call(s.exports, s, s.exports, i),
            s.l = !0,
            s.exports
        }
        return i.m = t,
        i.c = e,
        i.d = function(t, e, n) {
            i.o(t, e) || Object.defineProperty(t, e, {
                enumerable: !0,
                get: n
            })
        }
        ,
        i.r = function(t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                value: "Module"
            }),
            Object.defineProperty(t, "__esModule", {
                value: !0
            })
        }
        ,
        i.t = function(t, e) {
            if (1 & e && (t = i(t)),
            8 & e)
                return t;
            if (4 & e && "object" == typeof t && t && t.__esModule)
                return t;
            var n = Object.create(null);
            if (i.r(n),
            Object.defineProperty(n, "default", {
                enumerable: !0,
                value: t
            }),
            2 & e && "string" != typeof t)
                for (var s in t)
                    i.d(n, s, function(e) {
                        return t[e]
                    }
                    .bind(null, s));
            return n
        }
        ,
        i.n = function(t) {
            var e = t && t.__esModule ? function() {
                return t.default
            }
            : function() {
                return t
            }
            ;
            return i.d(e, "a", e),
            e
        }
        ,
        i.o = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }
        ,
        i.p = "",
        i(i.s = 2)
    }([function(t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.default = void 0;
        var n = {
            easeLinear: function(t) {
                return t
            },
            easeInQuad: function(t) {
                return t * t
            },
            easeOutQuad: function(t) {
                return t * (2 - t)
            },
            easeInOutQuad: function(t) {
                return (t *= 2) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1)
            },
            easeInCubic: function(t) {
                return t * t * t
            },
            easeOutCubic: function(t) {
                return --t * t * t + 1
            },
            easeInOutCubic: function(t) {
                return (t *= 2) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2)
            },
            easeInQuart: function(t) {
                return t * t * t * t
            },
            easeOutQuart: function(t) {
                return 1 - --t * t * t * t
            },
            easeInOutQuart: function(t) {
                return (t *= 2) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2)
            },
            easeInQuint: function(t) {
                return t * t * t * t * t
            },
            easeOutQuint: function(t) {
                return --t * t * t * t * t + 1
            },
            easeInOutQuint: function(t) {
                return (t *= 2) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2)
            },
            easeInSine: function(t) {
                return 1 - Math.cos(t * Math.PI / 2)
            },
            easeOutSine: function(t) {
                return Math.sin(t * Math.PI / 2)
            },
            easeInOutSine: function(t) {
                return .5 * (1 - Math.cos(Math.PI * t))
            },
            easeInExpo: function(t) {
                return 0 === t ? 0 : Math.pow(1024, t - 1)
            },
            easeOutExpo: function(t) {
                return 1 === t ? t : 1 - Math.pow(2, -10 * t)
            },
            easeInOutExpo: function(t) {
                return 0 === t ? 0 : 1 === t ? 1 : (t *= 2) < 1 ? .5 * Math.pow(1024, t - 1) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
            },
            easeInCirc: function(t) {
                return 1 - Math.sqrt(1 - t * t)
            },
            easeOutCirc: function(t) {
                return Math.sqrt(1 - --t * t)
            },
            easeInOutCirc: function(t) {
                return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
            },
            easeInBounce: function(t) {
                return 1 - this.easeOutBounce(1 - t)
            },
            easeOutBounce: function(t) {
                return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
            },
            easeInOutBounce: function(t) {
                return t < .5 ? .5 * this.easeInBounce(2 * t) : .5 * this.easeOutBounce(2 * t - 1) + .5
            }
        };
        e.default = n,
        t.exports = e.default
    }
    , function(t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.default = void 0;
        var n = {
            on: function(t, e) {
                this._eventEmitterCallbacks = this._eventEmitterCallbacks || {},
                this._eventEmitterCallbacks[t] = this._eventEmitterCallbacks[t] || [],
                this._eventEmitterCallbacks[t].push(e)
            }
        };
        n.addListener = n.on,
        n.off = function(t, e) {
            if (this._eventEmitterCallbacks = this._eventEmitterCallbacks || {},
            t in this._eventEmitterCallbacks) {
                var i = this._eventEmitterCallbacks[t].indexOf(e);
                i < 0 || this._eventEmitterCallbacks[t].splice(i, 1)
            }
        }
        ,
        n.removeListener = n.off,
        n.emit = function(t, e) {
            if (this._eventEmitterCallbacks = this._eventEmitterCallbacks || {},
            t in this._eventEmitterCallbacks) {
                var i = !0
                  , n = !1
                  , s = void 0;
                try {
                    for (var r, a = this._eventEmitterCallbacks[t][Symbol.iterator](); !(i = (r = a.next()).done); i = !0) {
                        var o = r.value;
                        if ("function" != typeof o)
                            return;
                        o(e)
                    }
                } catch (t) {
                    n = !0,
                    s = t
                } finally {
                    try {
                        i || null == a.return || a.return()
                    } finally {
                        if (n)
                            throw s
                    }
                }
            }
        }
        ,
        n.trigger = n.emit;
        var s = n;
        e.default = s,
        t.exports = e.default
    }
    , function(t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.default = void 0;
        var n = r(i(1))
          , s = r(i(0));
        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        function a(t, e) {
            for (var i = 0; i < e.length; i++) {
                var n = e[i];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value"in n && (n.writable = !0),
                Object.defineProperty(t, n.key, n)
            }
        }
        var o = function() {
            function t(e, i) {
                var s = this;
                !function(t, e) {
                    if (!(t instanceof e))
                        throw new TypeError("Cannot call a class as a function")
                }(this, t),
                function(t, e, i) {
                    e in t ? Object.defineProperty(t, e, {
                        value: i,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : t[e] = i
                }(this, "_onVisibilityChange", function() {
                    document.hidden ? s.pause() : s.resume()
                }),
                this.el = e,
                this.el.classList.add("lazy-line-painter"),
                this.config = Object.assign({
                    strokeWidth: null,
                    strokeDash: null,
                    strokeColor: null,
                    strokeOverColor: null,
                    strokeCap: null,
                    strokeJoin: null,
                    strokeOpacity: null,
                    delay: 0,
                    ease: null,
                    drawSequential: !1,
                    speedMultiplier: 1,
                    reverse: !1,
                    paused: !1,
                    progress: 0,
                    repeat: 0,
                    longestDuration: 0,
                    log: !0,
                    offset: this.el.getBoundingClientRect()
                }, i, {}),
                Object.assign(this, n.default, {}),
                this.__raf = null,
                this.__paths = [],
                this._generatePaths(),
                this._parseDataAttrs(),
                this._updateDuration(),
                this._setupPaths(),
                document.addEventListener("visibilitychange", this._onVisibilityChange)
            }
            return function(t, e, i) {
                e && a(t.prototype, e),
                i && a(t, i)
            }(t, [{
                key: "_generatePaths",
                value: function() {
                    var t;
                    t = Boolean(this.el.dataset.llpComposed) ? this.el.querySelectorAll("[data-llp-id]") : this._uncomposed();
                    for (var e = 0; e < t.length; e++) {
                        var i = {
                            el: t[e]
                        };
                        this.__paths.push(i)
                    }
                }
            }, {
                key: "_uncomposed",
                value: function() {
                    var t, e = this.el.querySelectorAll("path, polygon, circle, ellipse, polyline, line, rect");
                    for (t = 0; t < e.length; t++) {
                        var i = this.el.id.replace(/ /g, "");
                        i = (i = i.replace(".", "")).replace("-", ""),
                        e[t].dataset.llpId = i + "-" + t,
                        e[t].dataset.llpDuration || (e[t].dataset.llpDuration = 1e3),
                        e[t].dataset.llpDuration || (e[t].dataset.llpDelay = 0)
                    }
                    return this.config.log && console.log("This lazy line is uncomposed! Visit http://lazylinepainter.info to compose your masterpiece!"),
                    e
                }
            }, {
                key: "paint",
                value: function(t) {
                    Object.assign(this.config, t),
                    this._updateDuration(),
                    this.erase(),
                    this._paint(),
                    this.emit("start")
                }
            }, {
                key: "pause",
                value: function() {
                    this.config && (this.config.paused = !0),
                    cancelAnimationFrame(this.__raf),
                    this.emit("pause")
                }
            }, {
                key: "resume",
                value: function() {
                    var t = this;
                    this.config && this.config.paused && (requestAnimationFrame(function() {
                        t.adjustStartTime()
                    }),
                    this.config.paused = !1,
                    this.emit("resume"))
                }
            }, {
                key: "erase",
                value: function() {
                    this.config.startTime = null,
                    this.config.elapsedTime = null,
                    cancelAnimationFrame(this.__raf),
                    this.config.onStrokeCompleteDone = !1,
                    this.config.paused = !1;
                    for (var t = 0; t < this.__paths.length; t++) {
                        var e = this.__paths[t];
                        e.el.style.strokeDashoffset = e.length,
                        e.onStrokeCompleteDone = !1,
                        e.onStrokeStartDone = !1
                    }
                    this.emit("erase")
                }
            }, {
                key: "destroy",
                value: function() {
                    this.config = null,
                    this.el.remove(),
                    this.el = null
                }
            }, {
                key: "set",
                value: function(t, e) {
                    switch (t) {
                    case "progress":
                        this._setProgress(e);
                        break;
                    case "delay":
                        this._setDelay(e);
                        break;
                    case "reverse":
                        this._setReverse(e);
                        break;
                    case "ease":
                        this._setEase(e);
                        break;
                    case "repeat":
                        this._setRepeat(e);
                        break;
                    default:
                        this.config.log && console.log("property " + t + " can not be set")
                    }
                }
            }, {
                key: "_setRepeat",
                value: function(t) {
                    this.config.repeat = t
                }
            }, {
                key: "_setEase",
                value: function(t) {
                    this.config.ease = t
                }
            }, {
                key: "_setProgress",
                value: function(t) {
                    this.pause(),
                    this.config.progress = this._getProgress(t, this.config.ease),
                    this._updatePaths(),
                    this.config.elapsedTime = this.config.progress * this.config.totalDuration
                }
            }, {
                key: "_setDelay",
                value: function(t) {
                    this.config.delay = t,
                    this._updateDuration()
                }
            }, {
                key: "_setReverse",
                value: function(t) {
                    this.config.reverse = t,
                    this._updateDuration()
                }
            }, {
                key: "_updateDuration",
                value: function() {
                    var t = this._getTotalDuration()
                      , e = this._getLongestDuration();
                    this.config.totalDuration = this.config.drawSequential ? t : e,
                    this.config.totalDuration += this.config.delay,
                    this._calcPathDurations()
                }
            }, {
                key: "_calcPathDurations",
                value: function() {
                    for (var t = 0; t < this.__paths.length; t++) {
                        var e = this.__paths[t]
                          , i = void 0;
                        e.progress = 0,
                        i = this.config.reverse ? this.config.drawSequential ? 0 : this.config.totalDuration - (e.delay + e.duration) : this.config.drawSequential ? 0 : this.config.delay + e.delay,
                        e.startTime = i,
                        e.startProgress = e.startTime / this.config.totalDuration,
                        e.durationProgress = e.duration / this.config.totalDuration
                    }
                }
            }, {
                key: "get",
                value: function() {
                    return this.config
                }
            }, {
                key: "resize",
                value: function() {
                    this.config.offset = this.el.getBoundingClientRect();
                    for (var t = 0; t < this.__paths.length; t++) {
                        var e = this.__paths[t];
                        e.el.getBoundingClientRect(),
                        e.positions = this._getPathPoints(e.el, e.length),
                        this._updatePosition(e)
                    }
                }
            }, {
                key: "_parseDataAttrs",
                value: function() {
                    for (var t = 0; t < this.__paths.length; t++) {
                        var e = this.__paths[t];
                        e.id = e.el.dataset.llpId,
                        e.delay = Number(e.el.dataset.llpDelay) || 0,
                        e.duration = Number(e.el.dataset.llpDuration) || 0,
                        e.reverse = Boolean(e.el.dataset.llpReverse) || !1,
                        e.ease = Number(e.el.dataset.llpEase) || null,
                        e.strokeDash = e.el.dataset.llpStrokeDash || null,
                        e.delay *= this.config.speedMultiplier,
                        e.duration *= this.config.speedMultiplier,
                        this._setStyleAttrs(e)
                    }
                }
            }, {
                key: "_setStyleAttrs",
                value: function(t) {
                    t.strokeColor = t.el.dataset.llpStrokeColor || this.config.strokeColor,
                    t.strokeColor && (t.el.style.stroke = t.strokeColor),
                    t.strokeOpacity = t.el.dataset.llpStrokeOpacity || this.config.strokeOpacity,
                    t.strokeOpacity && (t.el.style.strokeOpacity = t.strokeOpacity),
                    t.strokeWidth = t.el.dataset.llpStrokeWidth || this.config.strokeWidth,
                    t.strokeWidth && (t.el.style.strokeWidth = t.strokeWidth),
                    t.strokeCap = t.el.dataset.llpStrokeCap || this.config.strokeCap,
                    t.strokeCap && (t.el.style.strokeLinecap = t.strokeCap),
                    t.strokeJoin = t.el.dataset.llpStrokeJoin || this.config.strokeJoin,
                    t.strokeJoin && (t.el.style.strokeLinejoin = t.strokeJoin)
                }
            }, {
                key: "_setupPaths",
                value: function() {
                    for (var t = 0; t < this.__paths.length; t++) {
                        var e = this.__paths[t];
                        e.index = t,
                        e.length = this._getPathLength(e.el),
                        e.positions = this._getPathPoints(e.el, e.length),
                        e.el.style.strokeDasharray = this._getStrokeDashArray(e, e.length),
                        e.el.style.strokeDashoffset = e.length,
                        e.onStrokeStartDone = !1,
                        e.onStrokeCompleteDone = !1
                    }
                }
            }, {
                key: "adjustStartTime",
                value: function() {
                    var t = this
                      , e = performance.now();
                    this.config.startTime = e - this.config.elapsedTime,
                    requestAnimationFrame(function() {
                        t._paint()
                    })
                }
            }, {
                key: "_paint",
                value: function() {
                    var t = this;
                    if (this.config) {
                        this.config.startTime || (this.config.startTime = performance.now()),
                        this.emit("update");
                        var e = performance.now();
                        this.config.elapsedTime = e - this.config.startTime,
                        this.config.linearProgress = this.config.elapsedTime / this.config.totalDuration,
                        this.config.progress = this._getProgress(this.config.linearProgress, this.config.ease),
                        this._updatePaths(),
                        this.config.linearProgress >= 0 && this.config.linearProgress <= 1 ? this.__raf = requestAnimationFrame(function() {
                            t._paint()
                        }) : this.config.repeat > 0 ? (this.config.repeat--,
                        this.paint()) : -1 === this.config.repeat ? this.paint() : this.emit("complete")
                    }
                }
            }, {
                key: "_updatePaths",
                value: function() {
                    for (var t = 0; t < this.__paths.length; t++) {
                        var e = this.__paths[t]
                          , i = this._getElapsedProgress(e);
                        e.progress = this._getProgress(i, e.ease),
                        this._setLine(e),
                        this._updatePosition(e),
                        this._updateStrokeCallbacks(e)
                    }
                }
            }, {
                key: "_getElapsedProgress",
                value: function(t) {
                    var e;
                    return this.config.progress >= t.startProgress && this.config.progress <= t.startProgress + t.durationProgress ? e = (this.config.progress - t.startProgress) / t.durationProgress : this.config.progress >= t.startProgress + t.durationProgress ? e = 1 : this.config.progress <= t.startProgress && (e = 0),
                    e
                }
            }, {
                key: "_getProgress",
                value: function(t, e) {
                    var i = t;
                    return e && (i = s.default[e](t)),
                    i
                }
            }, {
                key: "_setLine",
                value: function(t) {
                    var e = t.el
                      , i = t.progress * t.length;
                    t.reverse ? e.style.strokeDashoffset = -t.length + i : this.config.reverse ? e.style.strokeDashoffset = -t.length + i : e.style.strokeDashoffset = t.length - i
                }
            }, {
                key: "_updateStrokeCallbacks",
                value: function(t) {
                    1 === t.progress ? t.onStrokeCompleteDone || (t.onStrokeCompleteDone = !0,
                    this.emit("complete:" + t.id, t),
                    this.emit("complete:all", t)) : t.progress > 1e-5 && (t.onStrokeStartDone || (this.emit("start:" + t.id, t),
                    this.emit("start:all", t),
                    t.onStrokeStartDone = !0),
                    this.emit("update:" + t.id, t),
                    this.emit("update:all", t))
                }
            }, {
                key: "_updatePosition",
                value: function(t) {
                    var e = Math.round(t.progress * (t.length - 1))
                      , i = t.positions[e];
                    i && (t.position = {
                        x: this.config.offset.left + i.x,
                        y: this.config.offset.top + i.y
                    })
                }
            }, {
                key: "_getTotalDuration",
                value: function() {
                    for (var t = 0, e = this.__paths, i = 0; i < e.length; i++) {
                        var n = e[i].delay || 0;
                        t += e[i].duration + n
                    }
                    return t
                }
            }, {
                key: "_getLongestDuration",
                value: function() {
                    for (var t = 0, e = this.__paths, i = 0; i < e.length; i++) {
                        var n = e[i].delay + e[i].duration;
                        n > t && (t = n)
                    }
                    return t
                }
            }, {
                key: "_getPathLength",
                value: function(t) {
                    return this._getTotalLength(t)
                }
            }, {
                key: "_getDistance",
                value: function(t, e) {
                    return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2))
                }
            }, {
                key: "_getCircleLength",
                value: function(t) {
                    return 2 * Math.PI * t.getAttribute("r")
                }
            }, {
                key: "_getEllipseLength",
                value: function(t) {
                    var e = parseInt(t.getAttribute("rx"), 1)
                      , i = parseInt(t.getAttribute("ry"), 1)
                      , n = Math.pow(e - i, 2) / Math.pow(e + i, 2);
                    return Math.PI * (e + i) * (1 + 3 * n / Math.sqrt(4 - 3 * n))
                }
            }, {
                key: "_getRectLength",
                value: function(t) {
                    return 2 * t.getAttribute("width") + 2 * t.getAttribute("height")
                }
            }, {
                key: "_getLineLength",
                value: function(t) {
                    return this._getDistance({
                        x: t.getAttribute("x1"),
                        y: t.getAttribute("y1")
                    }, {
                        x: t.getAttribute("x2"),
                        y: t.getAttribute("y2")
                    })
                }
            }, {
                key: "_getPolylineLength",
                value: function(t) {
                    for (var e, i = t.points, n = 0, s = 0; s < i.numberOfItems; s++) {
                        var r = i.getItem(s);
                        s > 0 && (n += this._getDistance(e, r)),
                        e = r
                    }
                    return n
                }
            }, {
                key: "_getPolygonLength",
                value: function(t) {
                    var e = t.points;
                    return this._getPolylineLength(t) + this._getDistance(e.getItem(e.numberOfItems - 1), e.getItem(0))
                }
            }, {
                key: "_getTotalLength",
                value: function(t) {
                    var e;
                    switch (t.tagName.toLowerCase()) {
                    case "circle":
                        e = this._getCircleLength(t);
                        break;
                    case "rect":
                        e = this._getRectLength(t);
                        break;
                    case "line":
                        e = this._getLineLength(t);
                        break;
                    case "polyline":
                        e = this._getPolylineLength(t);
                        break;
                    case "polygon":
                        e = this._getPolygonLength(t);
                        break;
                    default:
                        e = t.getTotalLength()
                    }
                    return e
                }
            }, {
                key: "_getPathPoints",
                value: function(t, e) {
                    for (var i = [], n = 0; n < e; n++) {
                        var s = t.getPointAtLength(n);
                        i.push({
                            x: s.x,
                            y: s.y
                        })
                    }
                    return i
                }
            }, {
                key: "_getStrokeDashArray",
                value: function(t, e) {
                    return t.strokeDash ? this._getStrokeDashString(t.strokeDash, e) : this.config.strokeDash ? this._getStrokeDashString(this.config.strokeDash, e) : e + " " + e
                }
            }, {
                key: "_getStrokeDashString",
                value: function(t, e) {
                    for (var i, n, s = "", r = t.split(","), a = 0, o = r.length - 1; o >= 0; o--)
                        a += Number(r[o]);
                    n = e - (i = Math.floor(e / a)) * a;
                    for (var l = 0; l < i; l++)
                        s += t + ", ";
                    return (s + n + ", " + (e + 2)).split(",").join("px,") + "px"
                }
            }]),
            t
        }();
        window.LazyLinePainter = o;
        var l = o;
        e.default = l,
        t.exports = e.default
    }
    ])
});
;;if (device.desktop()) {
    var el1 = document.querySelector('#responsive01');
    var myAnimation1 = new LazyLinePainter(el1,{
        "ease": "easeLinear",
        "strokeWidth": 15,
        "strokeOpacity": 1,
        "strokeColor": "#3A32E9",
        "delay": 690
    });
    var el2 = document.querySelector('#responsive02');
    var myAnimation2 = new LazyLinePainter(el2,{
        "ease": "easeLinear",
        "strokeWidth": 15,
        "strokeOpacity": 1,
        "strokeColor": "#3A32E9",
        "delay": 400
    });
    var el3 = document.querySelector('#user');
    var myAnimation3 = new LazyLinePainter(el3,{
        "ease": "easeLinear",
        "strokeWidth": 15,
        "strokeOpacity": 1,
        "strokeColor": "#3A32E9",
        "delay": 690
    });
    var el4 = document.querySelector('#design');
    var myAnimation4 = new LazyLinePainter(el4,{
        "ease": "easeLinear",
        "strokeWidth": 14,
        "strokeOpacity": 1,
        "strokeColor": "#3A32E9",
        "delay": 690
    });
    function svgPaint() {
        myAnimation1.paint();
        myAnimation2.paint();
        myAnimation3.paint();
        myAnimation4.paint();
    }
}
;;$(document).ready(function() {
    if (device.desktop()) {
        $('.animated').css('visibility', 'hidden');
    }
    var deleteLog = false;
    $(document).ready(function() {
        if (window.innerWidth < 1025) {
            $(window).scroll(function() {
                var scroll = $(window).scrollTop();
                if (scroll >= 50) {
                    $(".header").addClass("fix");
                } else {
                    $(".header").removeClass("fix");
                }
            });
        }
        if (window.innerWidth > 1025) {
            $('#pagepiling').pagepiling({
                menu: '#menu',
                anchors: ['home', 'advantages', 'services', 'portfolio', 'blog', 'interview', 'conditions', 'all-inclusive', 'sites', 'time', 'contacts'],
                navigation: {
                    'textColor': '#f2f2f2',
                    'bulletsColor': '#ccc',
                    'position': 'right',
                    'tooltips': ['Обо мне', 'Мои плюсы', 'Услуги', 'Портфолио', 'Блог', 'Интервью со мной', 'Условия обслуживания', 'Все включено', 'Технические аспекты', 'Скорость', 'Заказ']
                },
                afterLoad: function(anchorLink, index) {
                    var header = $('.header');
                    var section_active = $('.active section');
                    if (section_active.hasClass("dark")) {
                        header.removeClass("header_white");
                        header.addClass("header_dark");
                    } else if (section_active.hasClass("white")) {
                        header.removeClass("header_dark");
                        header.addClass("header_white");
                    }
                    var logo = $('.logo');
                    var section_active = $('.active section');
                    if (section_active.hasClass("dark-logo")) {
                        logo.removeClass("logo-white");
                        logo.addClass("logo-dark");
                    } else if (section_active.hasClass("white-logo")) {
                        logo.removeClass("logo-dark");
                        logo.addClass("logo-white");
                    }
                    if (index == '1') {
                        if (device.desktop()) {
                            $('.number-1 image').addClass('pattern');
                        }
                    }
                    if (index == '2') {
                        if (device.desktop()) {
                            $('.advantages-numbers image').addClass('pattern-2');
                            $('.advantages__title').css('visibility', 'visible').addClass('fadeIn');
                            $('.advantages__title').on('animationend', function() {
                                $('.advantages__item_1').css('visibility', 'visible').addClass('fadeInUp');
                                $('.advantages__item_1').on('animationend', function() {
                                    $('.advantages__item_2').css('visibility', 'visible').addClass('fadeInUp');
                                })
                                $('.advantages__item_2').on('animationend', function() {
                                    $('.advantages__item_3').css('visibility', 'visible').addClass('fadeInUp');
                                })
                                $('.advantages__item_3').on('animationend', function() {
                                    $('.advantages__item_4').css('visibility', 'visible').addClass('fadeInUp');
                                })
                                $('.advantages__item_4').on('animationend', function() {
                                    $('.advantages__item_5').css('visibility', 'visible').addClass('fadeInUp');
                                })
                                $('.advantages__item_5').on('animationend', function() {
                                    $('.advantages__item_6').css('visibility', 'visible').addClass('fadeInUp');
                                })
                            })
                            $('.advantages__item_6').on('animationend', function() {
                                $('.portfolio-btn-cont').css('visibility', 'visible').addClass('fadeInRight');
                            })
                        }
                    }
                    if (index == '3') {
                        if (device.desktop()) {
                            $('.number-3 image').addClass('pattern');
                            $('.develop').css('visibility', 'visible').addClass('fadeIn');
                            $('#develop-letter image').addClass('pattern');
                            $('.develop').on('animationend', function() {
                                $('.design').css('visibility', 'visible').addClass('fadeIn');
                                $('#design-letter image').addClass('pattern-2');
                            })
                            $('.design').on('animationend', function() {
                                $('.advance').css('visibility', 'visible').addClass('fadeIn');
                                $('#advance-letter image').addClass('pattern-3');
                            })
                            $('.profession__title').css('visibility', 'visible').addClass('fadeInDown');
                            $('.profession__title').on('animationend', function() {
                                $('.profession__text').css('visibility', 'visible').addClass('fadeInDown');
                            })
                            $('.profession__text').on('animationend', function() {
                                $('.profession__call').css('visibility', 'visible').addClass('fadeInDown');
                            })
                        }
                    }
                    if (index == '4') {
                        if (device.desktop()) {
                            $('.number-4 image').addClass('pattern');
                            $('.portfolio-animated').css('visibility', 'visible').addClass('fadeIn');
                        }
                    }
                    if (index == '5') {
                        if (device.desktop()) {
                            $('.number-5 image').addClass('pattern');
                            $('.blog__title').css('visibility', 'visible').addClass('fadeIn');
                            $('.blog__title').on('animationend', function() {
                                $('.blog-1').css('visibility', 'visible').addClass('fadeInDown');
                            })
                            $('.blog-1').on('animationend', function() {
                                $('.blog-2').css('visibility', 'visible').addClass('fadeInDown');
                            })
                            $('.blog-2').on('animationend', function() {
                                $('.blog-btn-cont').css('visibility', 'visible').addClass('fadeInRight');
                            })
                        }
                    }
                    if (index == '6') {
                        if (device.desktop()) {
                            $('.number-6 image').addClass('pattern');
                            $('.interview__title').css('visibility', 'visible').addClass('fadeIn');
                            $('.interview__title').on('animationend', function() {
                                $('.interview__desc').css('visibility', 'visible').addClass('fadeInLeft');
                                $('.interview__about').css('visibility', 'visible').addClass('fadeInLeft');
                            })
                            $('.interview__about').on('animationend', function() {
                                $('.interview__slider').css('visibility', 'visible').addClass('fadeIn');
                            })
                        }
                    }
                    if (index == '7') {
                        if (device.desktop()) {
                            $('.number-7 image').addClass('pattern');
                            $('.conditions__title').css('visibility', 'visible').addClass('fadeIn');
                            $('.conditions__title').on('animationend', function() {
                                $('.conditions-item_1').css('visibility', 'visible').addClass('fadeInUp');
                            })
                            $('.conditions-item_1').on('animationend', function() {
                                $('.conditions-item_2').css('visibility', 'visible').addClass('fadeInUp');
                            })
                            $('.conditions-item_2').on('animationend', function() {
                                $('.conditions-item_3').css('visibility', 'visible').addClass('fadeInUp');
                            })
                            $('.conditions-item_3').on('animationend', function() {
                                $('.conditions-item_4').css('visibility', 'visible').addClass('fadeInUp');
                            })
                            $('.conditions-item_4').on('animationend', function() {
                                $('.conditions-item_5').css('visibility', 'visible').addClass('fadeInUp');
                            })
                            $('.conditions-item_5').on('animationend', function() {
                                $('.conditions-btn-cont').css('visibility', 'visible').addClass('fadeInRight');
                            })
                        }
                    }
                    if (index == '8') {
                        if (device.desktop()) {
                            $('.number-8 image').addClass('pattern');
                            $('.all-inclusive__title').css('visibility', 'visible').addClass('fadeIn');
                            $('.all-inclusive__offer').css('visibility', 'visible').addClass('fadeIn');
                            $('.all-inclusive__offer').on('animationend', function() {
                                $('.graphics').css('visibility', 'visible').addClass('fadeInRight');
                                $('#graphics-letter image').addClass('pattern-3');
                            })
                            $('.graphics').on('animationend', function() {
                                $('.pages').css('visibility', 'visible').addClass('fadeInRight');
                                $('#pages-letter image').addClass('pattern-3');
                            })
                            $('.pages').on('animationend', function() {
                                $('.result').css('visibility', 'visible').addClass('fadeInRight');
                            })
                        }
                    }
                    if (index == '9') {
                        if (device.desktop()) {
                            $('.number-9 image').addClass('pattern');
                            $('.sites__item svg').css('visibility', 'visible');
                            svgPaint();
                        }
                    }
                    if (index == '10') {
                        if (device.desktop()) {
                            $('.number-10 image').addClass('pattern');
                            $('.time__title').css('visibility', 'visible').addClass('fadeIn');
                            $('.time__desc').css('visibility', 'visible').addClass('fadeIn');
                            $('.time__desc').on('animationend', function() {
                                $('.time__content').css('visibility', 'visible').addClass('fadeIn');
                            })
                        }
                    }
                    if (index == '11') {
                        if (device.desktop()) {
                            $('.number-11 image').addClass('pattern');
                        }
                    }
                },
                onLeave: function(index, nextIndex, direction) {
                    if (index == '1') {
                        if (device.desktop()) {
                            $('.number-1 image').removeClass('pattern');
                        }
                    }
                    if (index == '2') {
                        if (device.desktop()) {
                            $('.advantages-numbers image').removeClass('pattern-2');
                            $('.advantages__title').css('visibility', 'hidden').removeClass('fadeIn');
                            $('.advantages__item').css('visibility', 'hidden').removeClass('fadeInUp');
                            $('.portfolio-btn-cont').css('visibility', 'hidden').removeClass('fadeInRight');
                        }
                    }
                    if (index == '3') {
                        if (device.desktop()) {
                            $('.number-3 image').removeClass('pattern');
                            $('.design').css('visibility', 'hidden').removeClass('fadeIn');
                            $('.develop').css('visibility', 'hidden').removeClass('fadeIn');
                            $('.advance').css('visibility', 'hidden').removeClass('fadeIn');
                            $('#design-letter image').removeClass('pattern-2');
                            $('#develop-letter image').removeClass('pattern');
                            $('#advance-letter image').removeClass('pattern-3');
                            $('.profession__title').css('visibility', 'hidden').removeClass('fadeInDown');
                            $('.profession__text').css('visibility', 'hidden').removeClass('fadeInDown');
                            $('.profession__call').css('visibility', 'hidden').removeClass('fadeInDown');
                        }
                    }
                    if (index == '4') {
                        if (device.desktop()) {
                            $('.number-4 image').removeClass('pattern');
                            $('.portfolio-animated').css('visibility', 'hidden').removeClass('fadeIn');
                        }
                    }
                    if (index == '5') {
                        if (device.desktop()) {
                            $('.number-5 image').removeClass('pattern');
                            $('.blog__title').css('visibility', 'hidden').removeClass('fadeIn');
                            $('.blog-content').css('visibility', 'hidden').removeClass('fadeInDown');
                            $('.blog-btn-cont').css('visibility', 'hidden').removeClass('fadeInRight');
                        }
                    }
                    if (index == '6') {
                        if (device.desktop()) {
                            $('.number-6 image').removeClass('pattern');
                            $('.interview__title').css('visibility', 'hidden').removeClass('fadeIn');
                            $('.interview__desc').css('visibility', 'hidden').removeClass('fadeInLeft');
                            $('.interview__about').css('visibility', 'hidden').removeClass('fadeInLeft');
                            $('.interview__slider').css('visibility', 'hidden').removeClass('fadeIn');
                        }
                    }
                    if (index == '7') {
                        if (device.desktop()) {
                            $('.number-7 image').removeClass('pattern');
                            $('.conditions__title').css('visibility', 'hidden').removeClass('fadeIn');
                            $('.conditions-item').css('visibility', 'hidden').removeClass('fadeInUp');
                            $('.conditions-btn-cont').css('visibility', 'hidden').removeClass('fadeInRight');
                        }
                    }
                    if (index == '8') {
                        if (device.desktop()) {
                            $('.number-8 image').removeClass('pattern');
                            $('.all-inclusive__title').css('visibility', 'hidden').removeClass('fadeIn');
                            $('.all-inclusive__offer').css('visibility', 'hidden').removeClass('fadeIn');
                            $('.graphics').css('visibility', 'hidden').removeClass('fadeInRight');
                            $('.pages').css('visibility', 'hidden').removeClass('fadeInRight');
                            $('.result').css('visibility', 'hidden').removeClass('fadeInRight');
                            $('#pages-letter image').removeClass('pattern-3');
                            $('#graphics-letter image').removeClass('pattern-3');
                        }
                    }
                    if (index == '9') {
                        if (device.desktop()) {
                            $('.number-9 image').removeClass('pattern');
                            $('.sites__item svg').css('visibility', 'hidden');
                        }
                    }
                    if (index == '10') {
                        if (device.desktop()) {
                            $('.number-10 image').removeClass('pattern');
                            $('.time__title').css('visibility', 'hidden').removeClass('fadeIn');
                            $('.time__desc').css('visibility', 'hidden').removeClass('fadeIn');
                            $('.time__content').css('visibility', 'hidden').removeClass('fadeIn');
                        }
                    }
                    if (index == '11') {
                        if (device.desktop()) {
                            $('.number-11 image').removeClass('pattern');
                        }
                    }
                }
            });
        }
    });
    $('.owl-carousel').owlCarousel({
        loop: true,
        items: 1
    });
    var content = $('.interview .owl-stage-outer .active .interview__text').html();
    $('.interview__desc').html(content);
    $('.interview .owl-nav button').on("click", function() {
        var content = $('.interview .owl-stage-outer .active .interview__text').html();
        $('.interview__desc').html(content);
    });
    $('.interview__item').on('click', function() {
        $(this).find($('.interview__play')).addClass('active');
    });
    new WOW().init();
    $('body').on('click', '.tab__navitem', function(event) {
        var eq = $(this).index();
        if ($(this).hasClass('parent')) {
            var eq = $(this).parent().index();
        }
        if (!$(this).hasClass('active')) {
            $(this).closest('.tabs').find('.tab__navitem').removeClass('active');
            $(this).addClass('active');
            $(this).closest('.tabs').find('.tab__item').removeClass('active').eq(eq).addClass('active');
            $('.examples__slide').slick("setPosition", 0);
            $('.examples__slide2').slick("setPosition", 0);
            $('.examples__slide3').slick("setPosition", 0);
            if ($(this).closest('.tabs').find('.examples__item').length > 0) {
                $(this).closest('.tabs').find('.examples__item').slick('setPosition');
            }
            if ($(this).closest('.tabs').find('.examples__item2').length > 0) {
                $(this).closest('.tabs').find('.examples__item2').slick('setPosition');
            }
            if ($(this).closest('.tabs').find('.examples__item3').length > 0) {
                $(this).closest('.tabs').find('.examples__item3').slick('setPosition');
            }
        }
    });
    $('.examples__slide').slick({
        infinite: true,
        arrows: false,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
            }
        }]
    });
    $('.examples__slide2').slick({
        infinite: true,
        arrows: false,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
            }
        }]
    });
    $('.examples__slide3').slick({
        infinite: true,
        arrows: false,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
            }
        }]
    });
    $('a[href$="#popup-form"]').magnificPopup({
        type: 'inline',
        preloader: false,
        focus: '#name',
        callbacks: {
            beforeOpen: function() {
                if ($(window).width() < 700) {
                    this.st.focus = false;
                } else {
                    this.st.focus = '#name';
                }
            }
        }
    });
    $.each($('.spoller.active'), function(index, val) {
        $(this).next().show();
    });
    $('body').on('click', '.spoller', function(event) {
        if ($(this).hasClass('mob') && !isMobile.any()) {
            return false;
        }
        if ($(this).hasClass('closeall') && !$(this).hasClass('active')) {
            $.each($(this).closest('.spollers').find('.spoller'), function(index, val) {
                $(this).removeClass('active');
                $(this).next().slideUp(300);
            });
        }
        $(this).toggleClass('active').next().slideToggle(300, function(index, val) {
            if ($(this).parent().find('.slick-slider').length > 0) {
                $(this).parent().find('.slick-slider').slick('setPosition');
            }
        });
        return false;
    });
    $("a.scroll").click(function() {
        var elementClick = $(this).attr("href")
        var destination = $(elementClick).offset().top;
        jQuery("html:not(:animated),body:not(:animated)").animate({
            scrollTop: destination
        }, 800);
        return false;
    });
    $.each($('input.user-phone'), function(index, val) {
        $(this).attr('type', 'tel');
        $(this).focus(function() {
            $(this).inputmask('+7 (999) 999-99-99', {
                clearIncomplete: true,
                clearMaskOnLostFocus: true,
                "onincomplete": function() {
                    maskclear($(this));
                }
            });
            $(this).addClass('focus');
            $(this).parent().addClass('focus');
            $(this).parent().removeClass('err');
            $(this).removeClass('err');
        });
    });
    $('input.user-phone').focusout(function(event) {
        maskclear($(this));
    });
    var waypointsvg = new Waypoint({
        element: $(".format"),
        handler: function(dir) {
            if (dir === "down") {
                $(".format .format__item").each(function(index) {
                    setTimeout(function() {
                        var myAnimation = new DrawFillSVG({
                            elementId: "tc-svg-" + index
                        });
                    }, 1000 * index);
                });
            }
            ;this.destroy();
        },
        offset: '70%'
    });
    $(".sign-up").waypoint(function() {
        $(".sign-up").toggleClass("sign-up-active");
    }, {
        offset: "80%"
    });
    $(".sect-w").waypoint(function() {
        $(".logo").toggleClass("logo-white");
    }, {
        offset: "7%"
    });
    $(".sect-w").waypoint(function() {
        $(".header-contacts").toggleClass("contacts-white");
    }, {
        offset: "7%"
    });
    function forms() {
        if ($('select').length > 0) {
            function selectscrolloptions() {
                var scs = 100;
                var mss = 50;
                if (isMobile.any()) {
                    scs = 10;
                    mss = 1;
                }
                var opt = {
                    cursorcolor: "#2078e5",
                    cursorwidth: "3px",
                    background: "",
                    autohidemode: false,
                    bouncescroll: false,
                    cursorborderradius: "0px",
                    scrollspeed: scs,
                    mousescrollstep: mss,
                    directionlockdeadzone: 0,
                    cursorborder: "0px solid #fff",
                };
                return opt;
            }
            function select() {
                $.each($('select'), function(index, val) {
                    var ind = index;
                    $(this).hide();
                    if ($(this).parent('.select-block').length == 0) {
                        $(this).wrap("<div class='select-block " + $(this).attr('class') + "-select-block'></div>");
                    } else {
                        $(this).parent('.select-block').find('.select').remove();
                    }
                    var milti = '';
                    var check = '';
                    var sblock = $(this).parent('.select-block');
                    var soptions = "<div class='select-options'><div class='select-options-scroll'><div class='select-options-list'>";
                    if ($(this).attr('multiple') == 'multiple') {
                        milti = 'multiple';
                        check = 'check';
                    }
                    $.each($(this).find('option'), function(index, val) {
                        if ($(this).attr('value') != '') {
                            soptions = soptions + "<div data-value='" + $(this).attr('value') + "' class='select-options__value_" + ind + " select-options__value value_" + $(this).val() + " " + $(this).attr('class') + " " + check + "'>" + $(this).html() + "</div>";
                        } else if ($(this).parent().attr('data-label') == 'on') {
                            if (sblock.find('.select__label').length == 0) {
                                sblock.prepend('<div class="select__label">' + $(this).html() + '</div>');
                            }
                        }
                    });
                    soptions = soptions + "</div></div></div>";
                    if ($(this).attr('data-type') == 'search') {
                        sblock.append("<div data-type='search' class='select_" + ind + " select" + " " + $(this).attr('class') + "__select " + milti + "'>" + "<div class='select-title'>" + "<div class='select-title__arrow ion-ios-arrow-down'></div>" + "<input data-value='" + $(this).find('option[selected="selected"]').html() + "' class='select-title__value value_" + $(this).find('option[selected="selected"]').val() + "' />" + "</div>" + soptions + "</div>");
                        $('.select_' + ind).find('input.select-title__value').jcOnPageFilter({
                            parentSectionClass: 'select-options_' + ind,
                            parentLookupClass: 'select-options__value_' + ind,
                            childBlockClass: 'select-options__value_' + ind
                        });
                    } else {
                        sblock.append("<div class='select_" + ind + " select" + " " + $(this).attr('class') + "__select " + milti + "'>" + "<div class='select-title'>" + "<div class='select-title__arrow ion-ios-arrow-down'></div>" + "<div class='select-title__value value_" + $(this).find('option[selected="selected"]').val() + "'>" + $(this).find('option[selected="selected"]').html() + "</div>" + "</div>" + soptions + "</div>");
                    }
                    if ($(this).find('option[selected="selected"]').val() != '') {
                        sblock.find('.select').addClass('focus');
                    }
                    if ($(this).attr('data-req') == 'on') {
                        $(this).addClass('req');
                    }
                    $(".select_" + ind + " .select-options-scroll").niceScroll('.select-options-list', selectscrolloptions());
                });
            }
            select();
            $('body').on('keyup', 'input.select-title__value', function() {
                $('.select').not($(this).parents('.select')).removeClass('active').find('.select-options').slideUp(50);
                $(this).parents('.select').addClass('active');
                $(this).parents('.select').find('.select-options').slideDown(50, function() {
                    $(this).find(".select-options-scroll").getNiceScroll().resize();
                });
                $(this).parents('.select-block').find('select').val('');
            });
            $('body').on('click', '.select', function() {
                if (!$(this).hasClass('disabled')) {
                    $('.select').not(this).removeClass('active').find('.select-options').slideUp(50);
                    $(this).toggleClass('active');
                    $(this).find('.select-options').slideToggle(50, function() {
                        $(this).find(".select-options-scroll").getNiceScroll().resize();
                    });
                    if ($(this).attr('data-type') == 'search') {
                        if (!$(this).hasClass('active')) {
                            searchselectreset();
                        }
                        $(this).find('.select-options__value').show();
                    }
                }
            });
            $('body').on('click', '.select-options__value', function() {
                if ($(this).parents('.select').hasClass('multiple')) {
                    if ($(this).hasClass('active')) {
                        if ($(this).parents('.select').find('.select-title__value span').length > 0) {
                            $(this).parents('.select').find('.select-title__value').append('<span data-value="' + $(this).data('value') + '">, ' + $(this).html() + '</span>');
                        } else {
                            $(this).parents('.select').find('.select-title__value').data('label', $(this).parents('.select').find('.select-title__value').html());
                            $(this).parents('.select').find('.select-title__value').html('<span data-value="' + $(this).data('value') + '">' + $(this).html() + '</span>');
                        }
                        $(this).parents('.select-block').find('select').find('option').eq($(this).index() + 1).prop('selected', true);
                        $(this).parents('.select').addClass('focus');
                    } else {
                        $(this).parents('.select').find('.select-title__value').find('span[data-value="' + $(this).data('value') + '"]').remove();
                        if ($(this).parents('.select').find('.select-title__value span').length == 0) {
                            $(this).parents('.select').find('.select-title__value').html($(this).parents('.select').find('.select-title__value').data('label'));
                            $(this).parents('.select').removeClass('focus');
                        }
                        $(this).parents('.select-block').find('select').find('option').eq($(this).index() + 1).prop('selected', false);
                    }
                    return false;
                }
                if ($(this).parents('.select').attr('data-type') == 'search') {
                    $(this).parents('.select').find('.select-title__value').val($(this).html());
                    $(this).parents('.select').find('.select-title__value').attr('data-value', $(this).html());
                } else {
                    $(this).parents('.select').find('.select-title__value').attr('class', 'select-title__value value_' + $(this).data('value'));
                    $(this).parents('.select').find('.select-title__value').html($(this).html());
                }
                $(this).parents('.select-block').find('select').find('option').removeAttr("selected");
                if ($.trim($(this).data('value')) != '') {
                    $(this).parents('.select-block').find('select').val($(this).data('value'));
                    $(this).parents('.select-block').find('select').find('option[value="' + $(this).data('value') + '"]').attr('selected', 'selected');
                } else {
                    $(this).parents('.select-block').find('select').val($(this).html());
                    $(this).parents('.select-block').find('select').find('option[value="' + $(this).html() + '"]').attr('selected', 'selected');
                }
                if ($(this).parents('.select-block').find('select').val() != '') {
                    $(this).parents('.select-block').find('.select').addClass('focus');
                } else {
                    $(this).parents('.select-block').find('.select').removeClass('focus');
                    $(this).parents('.select-block').find('.select').removeClass('err');
                    $(this).parents('.select-block').parent().removeClass('err');
                    $(this).parents('.select-block').removeClass('err').find('.form__error').remove();
                }
                if (!$(this).parents('.select').data('tags') != "") {
                    if ($(this).parents('.form-tags').find('.form-tags__item[data-value="' + $(this).data('value') + '"]').length == 0) {
                        $(this).parents('.form-tags').find('.form-tags-items').append('<a data-value="' + $(this).data('value') + '" href="" class="form-tags__item">' + $(this).html() + '<span class="fa fa-times"></span></a>');
                    }
                }
                $(this).parents('.select-block').find('select').change();
                if ($(this).parents('.select-block').find('select').data('update') == 'on') {
                    select();
                }
            });
            $(document).on('click touchstart', function(e) {
                if (!$(e.target).is(".select *") && !$(e.target).is(".select")) {
                    $('.select').removeClass('active');
                    $('.select-options').slideUp(50, function() {});
                    searchselectreset();
                }
                ;
            });
            $(document).on('keydown', function(e) {
                if (e.which == 27) {
                    $('.select').removeClass('active');
                    $('.select-options').slideUp(50, function() {});
                    searchselectreset();
                }
            });
        }
        $.each($('.check'), function(index, val) {
            if ($(this).find('input').prop('checked') == true) {
                $(this).addClass('active');
            }
        });
        $('body').off('click', '.check', function(event) {});
        $('body').on('click', '.check', function(event) {
            if (!$(this).hasClass('disable')) {
                var target = $(event.target);
                if (!target.is("a")) {
                    $(this).toggleClass('active');
                    if ($(this).hasClass('active')) {
                        $(this).find('input').prop('checked', true);
                    } else {
                        $(this).find('input').prop('checked', false);
                    }
                }
            }
        });
        $.each($('.option.active'), function(index, val) {
            $(this).find('input').prop('checked', true);
        });
        $('.option').click(function(event) {
            if (!$(this).hasClass('disable')) {
                if ($(this).hasClass('active') && $(this).hasClass('order')) {
                    $(this).toggleClass('orderactive');
                }
                $(this).parents('.options').find('.option').removeClass('active');
                $(this).toggleClass('active');
                $(this).children('input').prop('checked', true);
            }
        });
    }
    forms();
});
jQuery(document).ready(function($) {
    document.addEventListener('wpcf7mailsent', function(event) {
        var id = event.detail.contactFormId;
        if (id == 126) {
            yaCounter55302157.reachGoal('brief_logo');
            console.log('brief_logo');
        }
        if (id == 35) {
            yaCounter55302157.reachGoal('brief_devsite');
            console.log('brief_devsite');
        }
        if (id == 91) {
            yaCounter55302157.reachGoal('brief_adv');
            console.log('brief_adv');
        }
        if (id == 65) {
            yaCounter55302157.reachGoal('brief_seo');
            jQuery.fancybox({
                href: '#popup_msg'
            });
            console.log('brief_seo');
        }
        if (id == 23) {
            yaCounter55302157.reachGoal('home_bottom');
            console.log('home_bottom');
        }
    }, false);
});
jQuery(document).ready(function($) {
    jQuery('.for-response').addClass('other')
    document.addEventListener('wpcf7invalid', function(event) {
        jQuery('html, body').animate({
            scrollTop: jQuery(".wpcf7-not-valid").first().offset().top - 30
        }, 1000);
    });
});
;;(function(l) {
    var D, j, B, r, c, z, w, H, v, i, F, g = 0, y = {}, h = [], d = 0, a = {}, e = [], k = null, E = new Image(), u = /\.(jpg|gif|png|bmp|jpeg|webp)(.*)?$/i, p = /[^\.]\.(swf)\s*$/i, A = /[^\.]\.(svg)\s*$/i, G = /[^\.]\.(pdf)\s*$/i, m, o = 1, q = 0, b = "", t, n, C = false, f = l.extend(l("<div/>")[0], {
        prop: 0
    }), x = navigator.userAgent.match(/msie [6]/i) && !window.XMLHttpRequest, s = document.createTouch !== undefined;
    _abort = function() {
        l.fancybox.hideActivity();
        E.onerror = E.onload = null;
        if (k) {
            k.abort()
        }
        D.empty()
    }
    ,
    _error = function(I) {
        if (false === y.onError(h, g, y)) {
            l.fancybox.hideActivity();
            C = false;
            return
        }
        if (typeof I === "undefined") {
            I = "Please try again later."
        }
        y.titleShow = false;
        y.width = "auto";
        y.height = "auto";
        D.html('<p id="fancybox-error">The requested content cannot be loaded.<br />' + I + "</p>");
        _process_inline()
    }
    ,
    _start = function() {
        var M = h[g], J, L, O, N, I, K;
        _abort();
        y = l.extend({}, l.fn.fancybox.defaults, (typeof l(M).data("fancybox") == "undefined" ? y : l(M).data("fancybox")));
        if (document.documentElement.clientWidth < y.minViewportWidth) {
            C = false;
            return
        }
        if ("object" === typeof arguments[0] && "click" === arguments[0].type) {
            arguments[0].preventDefault()
        }
        K = y.onStart(h, g, y);
        if (K === false) {
            C = false;
            return
        } else {
            if (typeof K == "object") {
                y = l.extend(y, K)
            }
        }
        O = y.title || (M.nodeName ? l(M).attr("title") : M.title) || "";
        if (M.nodeName && !y.orig) {
            y.orig = l(M).find("img:first").length ? l(M).find("img:first") : l(M)
        }
        if (O === "" && y.orig) {
            O = y.orig.attr("title") || (y.titleFromAlt ? y.orig.attr("alt") : "")
        }
        J = y.href || (M.nodeName ? l(M).attr("href") : M.href) || null;
        if ((/^(?:javascript)/i).test(J) || J == "#") {
            J = null
        }
        if (y.type) {
            L = y.type;
            if (!J) {
                J = y.content
            }
        } else {
            if (y.content) {
                L = "html"
            } else {
                if (l(M).hasClass("iframe")) {
                    L = "iframe"
                } else {
                    if (J) {
                        if (J.match(u) || l(M).hasClass("image")) {
                            L = "image"
                        } else {
                            if (J.match(p)) {
                                L = "swf"
                            } else {
                                if (J.match(A)) {
                                    L = "svg"
                                } else {
                                    if (J.match(G)) {
                                        L = "pdf"
                                    } else {
                                        if (J.indexOf("#") === 0) {
                                            L = "inline"
                                        } else {
                                            L = "ajax"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (!L) {
            _error("No content type found.");
            return
        }
        if (l(M).hasClass("modal")) {
            y.modal = true
        }
        if (L == "inline") {
            M = J.substr(J.indexOf("#"));
            L = l(M).length > 0 ? "inline" : "ajax"
        }
        y.type = L;
        y.href = J;
        y.title = O;
        if (y.autoDimensions) {
            if (y.type == "html" || y.type == "inline" || y.type == "ajax") {
                y.width = "auto";
                y.height = "auto"
            } else {
                y.autoDimensions = false
            }
        }
        if (y.modal) {
            y.overlayShow = true;
            y.hideOnOverlayClick = false;
            y.hideOnContentClick = false;
            y.enableEscapeButton = false;
            y.showCloseButton = false
        }
        y.padding = parseInt(y.padding, 10);
        y.margin = parseInt(y.margin, 10);
        D.css("padding", (y.padding + y.margin));
        l(".fancybox-inline-tmp").off("fancybox-cancel").on("fancybox-change", function() {
            l(this).replaceWith(z.children())
        });
        switch (L) {
        case "html":
            D.html(y.content);
            _process_inline();
            break;
        case "inline":
            if (l(M).parent().is("#fancybox-content") === true) {
                C = false;
                return
            }
            l('<div class="fancybox-inline-tmp" />').hide().insertBefore(l(M)).on("fancybox-cleanup", function() {
                l(this).replaceWith(z.find(M))
            }).on("fancybox-cancel", function() {
                l(this).replaceWith(D.find(M))
            });
            l(M).appendTo(D);
            _process_inline();
            break;
        case "image":
            y.keepRatio = true;
            C = false;
            l.fancybox.showActivity();
            E = new Image();
            E.onerror = function() {
                _error("No image found.")
            }
            ;
            E.onload = function() {
                C = true;
                E.onerror = E.onload = null;
                _process_image()
            }
            ;
            E.src = J;
            break;
        case "swf":
            y.scrolling = "no";
            y.keepRatio = true;
            N = '<object type="application/x-shockwave-flash" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + y.width + '" height="' + y.height + '"><param name="movie" value="' + J + '"></param>';
            I = "";
            l.each(y.swf, function(P, Q) {
                N += '<param name="' + P + '" value="' + Q + '"></param>';
                I += " " + P + '="' + Q + '"'
            });
            N += '<embed src="' + J + '" type="application/x-shockwave-flash" width="' + y.width + '" height="' + y.height + '"' + I + "></embed></object>";
            D.html(N);
            _process_inline();
            break;
        case "svg":
            y.scrolling = "no";
            y.keepRatio = true;
            N = '<object type="image/svg+xml" width="' + y.width + '" height="' + y.height + '" data="' + J + '"></object>';
            D.html(N);
            _process_inline();
            break;
        case "pdf":
            y.scrolling = "no";
            y.enableKeyboardNav = false;
            y.showNavArrows = false;
            N = '<object type="application/pdf" width="100%" height="100%" data="' + J + '"><a href="' + J + '" style="display:block;position:absolute;top:48%;width:100%;text-align:center">' + l(M).html() + "</a></object>";
            D.html(N);
            _process_inline();
            break;
        case "ajax":
            C = false;
            l.fancybox.showActivity();
            y.ajax.win = y.ajax.success;
            k = l.ajax(l.extend({}, y.ajax, {
                url: J,
                data: y.ajax.data || {},
                error: function(P, R, Q) {
                    if (P.status > 0) {
                        _error(Q)
                    }
                },
                success: function(Q, S, P) {
                    var R = typeof P == "object" ? P : k;
                    if (R.status == 200) {
                        if (typeof y.ajax.win == "function") {
                            K = y.ajax.win(J, Q, S, P);
                            if (K === false) {
                                l.fancybox.hideActivity();
                                return
                            } else {
                                if (typeof K == "string" || typeof K == "object") {
                                    Q = K
                                }
                            }
                        }
                        if (Q.indexOf("<!DOCTYPE") > -1 || Q.indexOf("<html") > -1 || Q.indexOf("<body") > -1) {
                            _error("Unexpected response.")
                        } else {
                            D.html(Q);
                            _process_inline()
                        }
                    }
                }
            }));
            break;
        case "iframe":
            y.enableKeyboardNav = false;
            y.showNavArrows = false;
            l.fancybox.showActivity();
            _show();
            break
        }
    }
    ,
    _process_inline = function() {
        var J = y.width
          , K = y.height
          , L = l(window).width() == 0 ? window.innerWidth : l(window).width()
          , I = l(window).height() == 0 ? window.innerHeight : l(window).height();
        if (J.toString().indexOf("%") > -1) {
            J = parseInt((L - (y.margin * 2)) * parseFloat(J) / 100, 10) + "px"
        } else {
            J = J == "auto" ? "auto" : J + "px"
        }
        if (K.toString().indexOf("%") > -1) {
            K = parseInt((I - (y.margin * 2)) * parseFloat(K) / 100, 10) + "px"
        } else {
            K = K == "auto" ? "auto" : K + "px"
        }
        D.wrapInner('<div style="width:' + J + ";height:" + K + ";overflow:" + (y.scrolling == "auto" ? "auto" : (y.scrolling == "yes" ? "scroll" : "hidden")) + ';position:relative;"></div>');
        y.width = D.width();
        y.height = D.height();
        _show()
    }
    ,
    _process_image = function() {
        y.width = E.width;
        y.height = E.height;
        l("<img />").attr({
            id: "fancybox-img",
            src: E.src,
            alt: y.title
        }).appendTo(D);
        _show()
    }
    ,
    _show = function() {
        var J, I;
        if (y.type !== "iframe") {
            l.fancybox.hideActivity()
        }
        if (r.is(":visible") && false === a.onCleanup(e, d, a)) {
            l(".fancybox-inline-tmp").trigger("fancybox-cancel");
            C = false;
            return
        }
        C = true;
        l(z.add(B)).off();
        l(window).off("orientationchange.fb resize.fb scroll.fb");
        l(document).off("keydown.fb");
        if (r.is(":visible") && a.titlePosition !== "outside") {
            r.css("height", r.height())
        }
        e = h;
        d = g;
        a = y;
        if (a.overlayShow) {
            l("html").addClass("fancybox-active");
            B.css({
                "background-color": a.overlayColor,
                opacity: a.overlayOpacity,
                cursor: a.hideOnOverlayClick ? "pointer" : "auto",
                height: l(document).height()
            });
            if (!B.is(":visible")) {
                if (x) {
                    l("select:not(#fancybox-tmp select)").filter(function() {
                        return this.style.visibility !== "hidden"
                    }).css({
                        visibility: "hidden"
                    }).one("fancybox-cleanup", function() {
                        this.style.visibility = "inherit"
                    })
                }
                B.show()
            }
        } else {
            B.hide()
        }
        n = _get_zoom_to();
        _process_title();
        if (r.is(":visible")) {
            l(w.add(v).add(i)).hide();
            J = r.position(),
            t = {
                top: J.top,
                left: J.left,
                width: r.width(),
                height: r.height()
            };
            I = (t.width == n.width && t.height == n.height);
            z.fadeTo(a.changeFade, 0.3, function() {
                var K = function() {
                    z.html(D.contents()).fadeTo(a.changeFade, 1, _finish)
                };
                l(".fancybox-inline-tmp").trigger("fancybox-change");
                z.empty().removeAttr("filter").css({
                    "border-width": a.padding,
                    width: n.width - a.padding * 2,
                    height: a.autoDimensions ? "auto" : n.height - q - a.padding * 2
                });
                if (I) {
                    K()
                } else {
                    f.prop = 0;
                    l(f).animate({
                        prop: 1
                    }, {
                        duration: a.changeSpeed,
                        easing: a.easingChange,
                        step: _draw,
                        complete: K
                    })
                }
            });
            return
        }
        r.removeAttr("style");
        z.css("border-width", a.padding);
        if (a.transitionIn == "elastic") {
            t = _get_zoom_from();
            z.html(D.contents());
            r.show();
            if (a.opacity) {
                n.opacity = 0
            }
            f.prop = 0;
            l(f).animate({
                prop: 1
            }, {
                duration: a.speedIn,
                easing: a.easingIn,
                step: _draw,
                complete: _finish
            });
            return
        }
        if (a.titlePosition == "inside" && q > 0) {
            H.show()
        }
        z.css({
            width: n.width - a.padding * 2,
            height: a.autoDimensions ? "auto" : n.height - q - a.padding * 2
        }).html(D.contents());
        r.css(n).fadeIn(a.transitionIn == "none" ? 0 : a.speedIn, _finish)
    }
    ,
    _format_title = function(I) {
        if (I && I.length) {
            if (a.titlePosition == "float") {
                return '<table id="fancybox-title-float-wrap" style="border-spacing:0;border-collapse:collapse"><tr><td id="fancybox-title-float-left"></td><td id="fancybox-title-float-main">' + I + '</td><td id="fancybox-title-float-right"></td></tr></table>'
            }
            return '<div id="fancybox-title-' + a.titlePosition + '">' + I + "</div>"
        }
        return false
    }
    ,
    _process_title = function() {
        b = a.title || "";
        q = 0;
        H.empty().removeAttr("style").removeClass();
        if (a.titleShow === false) {
            H.hide();
            return
        }
        b = l.isFunction(a.titleFormat) ? a.titleFormat(b, e, d, a) : _format_title(b);
        if (!b || b === "") {
            H.hide();
            return
        }
        H.addClass("fancybox-title-" + a.titlePosition).html(b).appendTo("body").show();
        switch (a.titlePosition) {
        case "inside":
            H.css({
                width: n.width - (a.padding * 2),
                marginLeft: a.padding,
                marginRight: a.padding
            }).appendTo(c);
            q = H.outerHeight(true);
            n.height += q;
            break;
        case "over":
            H.css({
                marginLeft: a.padding,
                width: n.width - (a.padding * 2),
                bottom: a.padding
            }).appendTo(c);
            break;
        case "float":
            H.css("left", parseInt((H.width() - n.width) / 2, 10) * -1).appendTo(c);
            break;
        default:
            H.css({
                width: n.width - (a.padding * 2),
                paddingLeft: a.padding,
                paddingRight: a.padding
            }).appendTo(r);
            break
        }
        H.hide()
    }
    ,
    _set_navigation = function() {
        if (a.enableEscapeButton || a.enableKeyboardNav) {
            l(document).on("keydown.fb", function(I) {
                if (I.keyCode == 27 && a.enableEscapeButton) {
                    I.preventDefault();
                    l.fancybox.close()
                } else {
                    if ((I.keyCode == 37 || I.keyCode == 39) && a.enableKeyboardNav && I.target.tagName !== "INPUT" && I.target.tagName !== "TEXTAREA" && I.target.tagName !== "SELECT") {
                        I.preventDefault();
                        l.fancybox[I.keyCode == 37 ? "prev" : "next"]()
                    } else {
                        if ((I.keyCode == 9) && a.enableKeyboardNav && I.target.tagName !== "INPUT" && I.target.tagName !== "TEXTAREA" && I.target.tagName !== "SELECT") {
                            I.preventDefault();
                            l.fancybox[I.shiftKey ? "prev" : "next"]()
                        }
                    }
                }
            })
        }
        if (!a.showNavArrows) {
            v.hide();
            i.hide();
            return
        }
        if ((a.cyclic && e.length > 1) || d !== 0) {
            v.show()
        }
        if ((a.cyclic && e.length > 1) || d != (e.length - 1)) {
            i.show()
        }
    }
    ,
    _finish = function() {
        if (!l.support.opacity) {
            z.css("filter", 0);
            r.css("filter", 0)
        }
        if (a.autoDimensions) {
            z.css("height", "auto")
        }
        r.css("height", "auto");
        if (b && b.length) {
            H.show()
        }
        if (a.showCloseButton) {
            w.show()
        }
        _set_navigation();
        if (a.hideOnContentClick) {
            z.on("click", l.fancybox.close)
        }
        if (a.hideOnOverlayClick) {
            B.on("click", l.fancybox.close)
        }
        if (a.autoResize) {
            l(window).on("resize.fb", l.fancybox.resize)
        }
        if (a.centerOnScroll && !s) {
            l(window).on("scroll.fb", l.fancybox.center)
        }
        if (l.fn.mousewheel) {
            r.on("mousewheel.fb", function(I, J) {
                if (C) {
                    I.preventDefault()
                } else {
                    if (a.type == "image" && (l(I.target).outerHeight() == 0 || l(I.target).prop("scrollHeight") === l(I.target).outerHeight())) {
                        I.preventDefault();
                        l.fancybox[J > 0 ? "prev" : "next"]()
                    }
                }
            })
        }
        if (a.type == "iframe") {
            l('<iframe id="fancybox-frame" name="fancybox-frame' + new Date().getTime() + '"' + (navigator.userAgent.match(/msie [6]/i) ? ' allowtransparency="true""' : "") + ' style="border:0;margin:0;overflow:' + (a.scrolling == "auto" ? "auto" : (a.scrolling == "yes" ? "scroll" : "hidden")) + '" src="' + a.href + '"' + (false === a.allowfullscreen ? "" : " allowfullscreen") + ' allow="autoplay; encrypted-media" tabindex="999"></iframe>').appendTo(z).on("load", function() {
                l.fancybox.hideActivity()
            }).focus()
        }
        r.show();
        C = false;
        l.fancybox.center();
        a.onComplete(e, d, a);
        if (e.length > 1) {
            _preload_next();
            _preload_prev()
        }
    }
    ,
    _preload_next = function() {
        var I = typeof arguments[0] == "number" ? arguments[0] : d + 1;
        if (I >= e.length) {
            if (a.cyclic) {
                I = 0
            } else {
                return
            }
        }
        if (I == d) {
            a.enableKeyboardNav = false;
            r.off("mousewheel.fb");
            i.hide();
            return
        }
        if (_preload_image(I)) {
            return
        } else {
            _preload_next(I + 1)
        }
    }
    ,
    _preload_prev = function() {
        var I = typeof arguments[0] == "number" ? arguments[0] : d - 1;
        if (I < 0) {
            if (a.cyclic) {
                I = e.length - 1
            } else {
                return
            }
        }
        if (I == d) {
            a.enableKeyboardNav = false;
            r.off("mousewheel.fb");
            v.hide();
            return
        }
        if (_preload_image(I)) {
            return
        } else {
            _preload_prev(I - 1)
        }
    }
    ,
    _preload_image = function(K) {
        var J, I = e[K];
        if (typeof I !== "undefined" && typeof I.href !== "undefined" && I.href !== a.href && (I.href.match(u) || l(I).hasClass("image"))) {
            J = new Image();
            J.src = I.href;
            return true
        } else {
            return false
        }
    }
    ,
    _draw = function(J) {
        var I = {
            width: parseInt(t.width + (n.width - t.width) * J, 10),
            height: parseInt(t.height + (n.height - t.height) * J, 10),
            top: parseInt(t.top + (n.top - t.top) * J, 10),
            left: parseInt(t.left + (n.left - t.left) * J, 10)
        };
        if (typeof n.opacity !== "undefined") {
            I.opacity = J < 0.5 ? 0.5 : J
        }
        r.css(I);
        z.css({
            width: I.width - a.padding * 2,
            height: I.height - (q * J) - a.padding * 2
        })
    }
    ,
    _get_viewport = function() {
        var I = !s && window.innerWidth && document.documentElement.clientWidth ? Math.min(window.innerWidth, document.documentElement.clientWidth) : window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName("body")[0].clientWidth, J = !s && window.innerHeight && document.documentElement.clientHeight ? Math.min(window.innerHeight, document.documentElement.clientHeight) : window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName("body")[0].clientHeight, K;
        K = arguments[0] === true ? 0 : a.margin;
        return [I - (K * 2), J - (K * 2), l(document).scrollLeft() + K, l(document).scrollTop() + K]
    }
    ,
    _get_zoom_to = function() {
        var I = _get_viewport(), L = {}, J = a.padding * 2, K;
        if (a.width.toString().indexOf("%") > -1) {
            L.width = parseInt((I[0] * parseFloat(a.width)) / 100, 10)
        } else {
            L.width = a.width + J
        }
        if (a.height.toString().indexOf("%") > -1) {
            L.height = parseInt((I[1] * parseFloat(a.height)) / 100, 10)
        } else {
            L.height = a.height + J
        }
        if (a.autoScale && (L.width > I[0] || L.height > I[1])) {
            if (a.keepRatio) {
                K = a.width / a.height;
                if ((L.width) > I[0]) {
                    L.width = I[0];
                    L.height = parseInt(((L.width - J) / K) + J, 10)
                }
                if ((L.height) > I[1]) {
                    L.height = I[1];
                    L.width = parseInt(((L.height - J) * K) + J, 10)
                }
            } else {
                L.width = Math.min(L.width, I[0]);
                L.height = Math.min(L.height, I[1])
            }
        }
        L.top = parseInt(Math.max(I[3] - 20, I[3] + ((I[1] - L.height - 40) * 0.5)), 10);
        L.left = parseInt(Math.max(I[2] - 20, I[2] + ((I[0] - L.width - 40) * 0.5)), 10);
        return L
    }
    ,
    _get_obj_pos = function(I) {
        var J = I.offset();
        J.top += parseInt(I.css("paddingTop"), 10) || 0;
        J.left += parseInt(I.css("paddingLeft"), 10) || 0;
        J.top += parseInt(I.css("border-top-width"), 10) || 0;
        J.left += parseInt(I.css("border-left-width"), 10) || 0;
        J.width = I.width();
        J.height = I.height();
        return J
    }
    ,
    _get_zoom_from = function() {
        var L = y.orig ? l(y.orig) : false, K = {}, J, I;
        if (L && L.length) {
            J = _get_obj_pos(L);
            K = {
                width: J.width + (a.padding * 2),
                height: J.height + (a.padding * 2),
                top: J.top - a.padding - 20,
                left: J.left - a.padding - 20
            }
        } else {
            I = _get_viewport();
            K = {
                width: a.padding * 2,
                height: a.padding * 2,
                top: parseInt((I[3] + I[1]) * 0.5, 10),
                left: parseInt((I[2] + I[0]) * 0.5, 10)
            }
        }
        return K
    }
    ,
    _animate_loading = function() {
        if (!j.is(":visible")) {
            clearInterval(m);
            return
        }
        l("div", j).css("top", (o * -40) + "px");
        o = (o + 1) % 12
    }
    ;
    l.fn.fancybox = function(I) {
        if (!l(this).length) {
            return this
        }
        l(this).data("fancybox", l.extend({}, I, (l.metadata ? l(this).metadata() : {}))).off("click.fb").on("click.fb", function(K) {
            if (C) {
                return
            }
            C = true;
            l(this).blur();
            h = [];
            g = 0;
            var J = l(this).attr("rel") || "";
            if (J == "" || J.replace(/alternate|external|help|license|nofollow|noreferrer|noopener|\s+/gi, "") == "") {
                h.push(this)
            } else {
                h = l('a[rel="' + J + '"], area[rel="' + J + '"]');
                g = h.index(this)
            }
            _start(K);
            return
        });
        return this
    }
    ;
    l.fancybox = function(L) {
        var K;
        if (C) {
            return
        }
        C = true;
        K = typeof arguments[1] !== "undefined" ? arguments[1] : {};
        h = [];
        g = parseInt(K.index, 10) || 0;
        if (l.isArray(L)) {
            for (var J = 0, I = L.length; J < I; J++) {
                if (typeof L[J] == "object") {
                    l(L[J]).data("fancybox", l.extend({}, K, L[J]))
                } else {
                    L[J] = l({}).data("fancybox", l.extend({
                        content: L[J]
                    }, K))
                }
            }
            h = jQuery.merge(h, L)
        } else {
            if (typeof L == "object") {
                l(L).data("fancybox", l.extend({}, K, L))
            } else {
                L = l({}).data("fancybox", l.extend({
                    content: L
                }, K))
            }
            h.push(L)
        }
        if (g > h.length || g < 0) {
            g = 0
        }
        _start()
    }
    ;
    l.fancybox.showActivity = function() {
        clearInterval(m);
        j.show();
        m = setInterval(_animate_loading, 66)
    }
    ;
    l.fancybox.hideActivity = function() {
        j.hide()
    }
    ;
    l.fancybox.next = function() {
        var I, J = typeof arguments[0] == "number" ? arguments[0] : d + 1;
        if (J >= e.length) {
            if (a.cyclic) {
                J = 0
            } else {
                return
            }
        }
        I = e[J];
        if (J != d && typeof I !== "undefined" && typeof I.href !== "undefined" && I.href === a.href) {
            l.fancybox.next(J + 1)
        } else {
            l.fancybox.pos(J)
        }
        return
    }
    ;
    l.fancybox.prev = function() {
        var I, J = typeof arguments[0] == "number" ? arguments[0] : d - 1;
        if (J < 0) {
            if (a.cyclic) {
                J = e.length - 1
            } else {
                return
            }
        }
        I = e[J];
        if (J != d && typeof I !== "undefined" && typeof I.href !== "undefined" && I.href === a.href) {
            l.fancybox.prev(J - 1)
        } else {
            l.fancybox.pos(J)
        }
        return
    }
    ;
    l.fancybox.pos = function(I) {
        if (C) {
            return
        }
        I = parseInt(I);
        h = e;
        if (I > -1 && I < e.length) {
            g = I;
            _start()
        }
        return
    }
    ;
    l.fancybox.cancel = function() {
        if (C) {
            return
        }
        C = true;
        l(".fancybox-inline-tmp").trigger("fancybox-cancel");
        _abort();
        y.onCancel(h, g, y);
        C = false
    }
    ;
    l.fancybox.close = function() {
        if (C || r.is(":hidden")) {
            return
        }
        C = true;
        if (a && false === a.onCleanup(e, d, a)) {
            C = false;
            return
        }
        _abort();
        l(w.add(v).add(i)).hide();
        l(z.add(B)).off();
        l(window).off("orientationchange.fb resize.fb scroll.fb mousewheel.fb");
        l(document).off("keydown.fb");
        if (a.titlePosition !== "inside") {
            H.empty()
        }
        r.stop();
        function I() {
            B.fadeOut("fast");
            H.empty().hide();
            r.hide();
            l(".fancybox-inline-tmp").trigger("fancybox-cleanup");
            z.empty();
            a.onClosed(e, d, a);
            e = y = [];
            d = g = 0;
            a = y = {};
            C = false
        }
        if (a.transitionOut == "elastic") {
            t = _get_zoom_from();
            var J = r.position();
            n = {
                top: J.top,
                left: J.left,
                width: r.width(),
                height: r.height()
            };
            if (a.opacity) {
                n.opacity = 1
            }
            H.empty().hide();
            f.prop = 1;
            l(f).animate({
                prop: 0
            }, {
                duration: a.speedOut,
                easing: a.easingOut,
                step: _draw,
                complete: I
            })
        } else {
            r.fadeOut(a.transitionOut == "none" ? 0 : a.speedOut, I)
        }
        l("html").removeClass("fancybox-active")
    }
    ;
    l.fancybox.resize = function() {
        var I;
        clearTimeout(F);
        F = setTimeout(function() {
            var J = function() {
                if (y.autoDimensions) {
                    z.css("height", "auto")
                }
                r.css("height", "auto");
                if (b && b.length) {
                    H.show()
                }
                C = false;
                l.fancybox.center(true)
            };
            if (B.is(":visible")) {
                B.css("height", l(document).height())
            }
            I = r.position(),
            t = {
                top: I.top,
                left: I.left,
                width: r.width(),
                height: r.height()
            };
            n = _get_zoom_to();
            C = true;
            _process_title();
            f.prop = 0;
            l(f).animate({
                prop: 1
            }, {
                duration: a.changeSpeed,
                easing: a.easingChange,
                step: _draw,
                complete: J
            })
        }, 500)
    }
    ;
    l.fancybox.center = function() {
        var I, J;
        if (C) {
            return
        }
        J = arguments[0] === true ? 1 : 0;
        I = _get_viewport(true);
        if (!J && ((r.width() + 40) > I[0] || (r.height() + 40) > I[1])) {
            return
        }
        r.stop().animate({
            top: parseInt(Math.max(I[3] - 20, I[3] + ((I[1] - z.height() - 40) * 0.5) - a.padding)),
            left: parseInt(Math.max(I[2] - 20, I[2] + ((I[0] - z.width() - 40) * 0.5) - a.padding))
        }, typeof arguments[0] == "number" ? arguments[0] : 300)
    }
    ;
    l.fancybox.init = function() {
        if (l("#fancybox-wrap").length) {
            return
        }
        l("body").append(D = l('<div id="fancybox-tmp"></div>'), j = l('<div id="fancybox-loading"><div></div></div>'), B = l('<div id="fancybox-overlay"></div>'), r = l('<div id="fancybox-wrap"></div>'));
        c = l('<div id="fancybox-outer"></div>').append('<div class="fancybox-bg" id="fancybox-bg-n"></div><div class="fancybox-bg" id="fancybox-bg-ne"></div><div class="fancybox-bg" id="fancybox-bg-e"></div><div class="fancybox-bg" id="fancybox-bg-se"></div><div class="fancybox-bg" id="fancybox-bg-s"></div><div class="fancybox-bg" id="fancybox-bg-sw"></div><div class="fancybox-bg" id="fancybox-bg-w"></div><div class="fancybox-bg" id="fancybox-bg-nw"></div>').appendTo(r);
        c.append(z = l('<div id="fancybox-content"></div>'), w = l('<a id="fancybox-close"></a>'), H = l('<div id="fancybox-title"></div>'), v = l('<a id="fancybox-left"><span class="fancy-ico" id="fancybox-left-ico"></span></a>'), i = l('<a id="fancybox-right"><span class="fancy-ico" id="fancybox-right-ico"></span></a>'));
        w.click(l.fancybox.close);
        j.click(l.fancybox.cancel);
        v.click(function(I) {
            I.preventDefault();
            l.fancybox.prev()
        });
        i.click(function(I) {
            I.preventDefault();
            l.fancybox.next()
        });
        if (!l.support.opacity) {
            r.addClass("fancybox-ie")
        }
        if (x) {
            j.addClass("fancybox-ie6");
            r.addClass("fancybox-ie6");
            l('<iframe id="fancybox-hide-sel-frame" src="' + (/^https/i.test(window.location.href || "") ? "javascript:void(false)" : "about:blank") + '" style="overflow:hidden;border:0" tabindex="-1"></iframe>').prependTo(c)
        }
    }
    ;
    l.fn.fancybox.defaults = {
        padding: 10,
        margin: 40,
        opacity: false,
        modal: false,
        cyclic: false,
        allowfullscreen: false,
        scrolling: "auto",
        width: 560,
        height: 340,
        autoScale: true,
        autoDimensions: true,
        centerOnScroll: false,
        autoResize: true,
        keepRatio: false,
        minViewportWidth: 0,
        ajax: {},
        swf: {
            wmode: "opaque"
        },
        svg: {
            wmode: "opaque"
        },
        hideOnOverlayClick: true,
        hideOnContentClick: false,
        overlayShow: true,
        overlayOpacity: 0.7,
        overlayColor: "#777",
        titleShow: true,
        titlePosition: "float",
        titleFormat: null,
        titleFromAlt: true,
        transitionIn: "fade",
        transitionOut: "fade",
        speedIn: 300,
        speedOut: 300,
        changeSpeed: 300,
        changeFade: "fast",
        easingIn: "swing",
        easingOut: "swing",
        showCloseButton: true,
        showNavArrows: true,
        enableEscapeButton: true,
        enableKeyboardNav: true,
        onStart: function() {},
        onCancel: function() {},
        onComplete: function() {},
        onCleanup: function() {},
        onClosed: function() {},
        onError: function() {}
    };
    l(document).ready(function() {
        l.fancybox.init()
    })
}
)(jQuery);
;;!function(n) {
    "function" == typeof define && define.amd ? define(["jquery"], function(e) {
        return n(e)
    }) : "object" == typeof module && "object" == typeof module.exports ? exports = n(require("jquery")) : n(jQuery)
}(function(n) {
    function e(n) {
        var e = 7.5625
          , t = 2.75;
        return n < 1 / t ? e * n * n : n < 2 / t ? e * (n -= 1.5 / t) * n + .75 : n < 2.5 / t ? e * (n -= 2.25 / t) * n + .9375 : e * (n -= 2.625 / t) * n + .984375
    }
    void 0 !== n.easing && (n.easing.jswing = n.easing.swing);
    var t = Math.pow
      , u = Math.sqrt
      , r = Math.sin
      , i = Math.cos
      , a = Math.PI
      , c = 1.70158
      , o = 1.525 * c
      , s = 2 * a / 3
      , f = 2 * a / 4.5;
    n.extend(n.easing, {
        def: "easeOutQuad",
        swing: function(e) {
            return n.easing[n.easing.def](e)
        },
        easeInQuad: function(n) {
            return n * n
        },
        easeOutQuad: function(n) {
            return 1 - (1 - n) * (1 - n)
        },
        easeInOutQuad: function(n) {
            return n < .5 ? 2 * n * n : 1 - t(-2 * n + 2, 2) / 2
        },
        easeInCubic: function(n) {
            return n * n * n
        },
        easeOutCubic: function(n) {
            return 1 - t(1 - n, 3)
        },
        easeInOutCubic: function(n) {
            return n < .5 ? 4 * n * n * n : 1 - t(-2 * n + 2, 3) / 2
        },
        easeInQuart: function(n) {
            return n * n * n * n
        },
        easeOutQuart: function(n) {
            return 1 - t(1 - n, 4)
        },
        easeInOutQuart: function(n) {
            return n < .5 ? 8 * n * n * n * n : 1 - t(-2 * n + 2, 4) / 2
        },
        easeInQuint: function(n) {
            return n * n * n * n * n
        },
        easeOutQuint: function(n) {
            return 1 - t(1 - n, 5)
        },
        easeInOutQuint: function(n) {
            return n < .5 ? 16 * n * n * n * n * n : 1 - t(-2 * n + 2, 5) / 2
        },
        easeInSine: function(n) {
            return 1 - i(n * a / 2)
        },
        easeOutSine: function(n) {
            return r(n * a / 2)
        },
        easeInOutSine: function(n) {
            return -(i(a * n) - 1) / 2
        },
        easeInExpo: function(n) {
            return 0 === n ? 0 : t(2, 10 * n - 10)
        },
        easeOutExpo: function(n) {
            return 1 === n ? 1 : 1 - t(2, -10 * n)
        },
        easeInOutExpo: function(n) {
            return 0 === n ? 0 : 1 === n ? 1 : n < .5 ? t(2, 20 * n - 10) / 2 : (2 - t(2, -20 * n + 10)) / 2
        },
        easeInCirc: function(n) {
            return 1 - u(1 - t(n, 2))
        },
        easeOutCirc: function(n) {
            return u(1 - t(n - 1, 2))
        },
        easeInOutCirc: function(n) {
            return n < .5 ? (1 - u(1 - t(2 * n, 2))) / 2 : (u(1 - t(-2 * n + 2, 2)) + 1) / 2
        },
        easeInElastic: function(n) {
            return 0 === n ? 0 : 1 === n ? 1 : -t(2, 10 * n - 10) * r((10 * n - 10.75) * s)
        },
        easeOutElastic: function(n) {
            return 0 === n ? 0 : 1 === n ? 1 : t(2, -10 * n) * r((10 * n - .75) * s) + 1
        },
        easeInOutElastic: function(n) {
            return 0 === n ? 0 : 1 === n ? 1 : n < .5 ? -(t(2, 20 * n - 10) * r((20 * n - 11.125) * f)) / 2 : t(2, -20 * n + 10) * r((20 * n - 11.125) * f) / 2 + 1
        },
        easeInBack: function(n) {
            return (c + 1) * n * n * n - c * n * n
        },
        easeOutBack: function(n) {
            return 1 + (c + 1) * t(n - 1, 3) + c * t(n - 1, 2)
        },
        easeInOutBack: function(n) {
            return n < .5 ? t(2 * n, 2) * (7.189819 * n - o) / 2 : (t(2 * n - 2, 2) * ((o + 1) * (2 * n - 2) + o) + 2) / 2
        },
        easeInBounce: function(n) {
            return 1 - e(1 - n)
        },
        easeOutBounce: e,
        easeInOutBounce: function(n) {
            return n < .5 ? (1 - e(1 - 2 * n)) / 2 : (1 + e(2 * n - 1)) / 2
        }
    })
});
;;!function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a : a(jQuery)
}(function(a) {
    function i(b) {
        var c = b || window.event
          , g = d.call(arguments, 1)
          , i = 0
          , l = 0
          , m = 0
          , n = 0
          , o = 0
          , p = 0;
        if (b = a.event.fix(c),
        b.type = "mousewheel",
        "detail"in c && (m = -1 * c.detail),
        "wheelDelta"in c && (m = c.wheelDelta),
        "wheelDeltaY"in c && (m = c.wheelDeltaY),
        "wheelDeltaX"in c && (l = -1 * c.wheelDeltaX),
        "axis"in c && c.axis === c.HORIZONTAL_AXIS && (l = -1 * m,
        m = 0),
        i = 0 === m ? l : m,
        "deltaY"in c && (m = -1 * c.deltaY,
        i = m),
        "deltaX"in c && (l = c.deltaX,
        0 === m && (i = -1 * l)),
        0 !== m || 0 !== l) {
            if (1 === c.deltaMode) {
                var q = a.data(this, "mousewheel-line-height");
                i *= q,
                m *= q,
                l *= q
            } else if (2 === c.deltaMode) {
                var r = a.data(this, "mousewheel-page-height");
                i *= r,
                m *= r,
                l *= r
            }
            if (n = Math.max(Math.abs(m), Math.abs(l)),
            (!f || n < f) && (f = n,
            k(c, n) && (f /= 40)),
            k(c, n) && (i /= 40,
            l /= 40,
            m /= 40),
            i = Math[i >= 1 ? "floor" : "ceil"](i / f),
            l = Math[l >= 1 ? "floor" : "ceil"](l / f),
            m = Math[m >= 1 ? "floor" : "ceil"](m / f),
            h.settings.normalizeOffset && this.getBoundingClientRect) {
                var s = this.getBoundingClientRect();
                o = b.clientX - s.left,
                p = b.clientY - s.top
            }
            return b.deltaX = l,
            b.deltaY = m,
            b.deltaFactor = f,
            b.offsetX = o,
            b.offsetY = p,
            b.deltaMode = 0,
            g.unshift(b, i, l, m),
            e && clearTimeout(e),
            e = setTimeout(j, 200),
            (a.event.dispatch || a.event.handle).apply(this, g)
        }
    }
    function j() {
        f = null
    }
    function k(a, b) {
        return h.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 == 0
    }
    var e, f, b = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"], c = "onwheel"in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"], d = Array.prototype.slice;
    if (a.event.fixHooks)
        for (var g = b.length; g; )
            a.event.fixHooks[b[--g]] = a.event.mouseHooks;
    var h = a.event.special.mousewheel = {
        version: "3.1.12",
        setup: function() {
            if (this.addEventListener)
                for (var b = c.length; b; )
                    this.addEventListener(c[--b], i, !1);
            else
                this.onmousewheel = i;
            a.data(this, "mousewheel-line-height", h.getLineHeight(this)),
            a.data(this, "mousewheel-page-height", h.getPageHeight(this))
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var b = c.length; b; )
                    this.removeEventListener(c[--b], i, !1);
            else
                this.onmousewheel = null;
            a.removeData(this, "mousewheel-line-height"),
            a.removeData(this, "mousewheel-page-height")
        },
        getLineHeight: function(b) {
            var c = a(b)
              , d = c["offsetParent"in a.fn ? "offsetParent" : "parent"]();
            return d.length || (d = a("body")),
            parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16
        },
        getPageHeight: function(b) {
            return a(b).height()
        },
        settings: {
            adjustOldDeltas: !0,
            normalizeOffset: !0
        }
    };
    a.fn.extend({
        mousewheel: function(a) {
            return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
        },
        unmousewheel: function(a) {
            return this.unbind("mousewheel", a)
        }
    })
});
;;/*! This file is auto-generated */
!function(d, l) {
    "use strict";
    var e = !1
      , o = !1;
    if (l.querySelector)
        if (d.addEventListener)
            e = !0;
    if (d.wp = d.wp || {},
    !d.wp.receiveEmbedMessage)
        if (d.wp.receiveEmbedMessage = function(e) {
            var t = e.data;
            if (t)
                if (t.secret || t.message || t.value)
                    if (!/[^a-zA-Z0-9]/.test(t.secret)) {
                        var r, a, i, s, n, o = l.querySelectorAll('iframe[data-secret="' + t.secret + '"]'), c = l.querySelectorAll('blockquote[data-secret="' + t.secret + '"]');
                        for (r = 0; r < c.length; r++)
                            c[r].style.display = "none";
                        for (r = 0; r < o.length; r++)
                            if (a = o[r],
                            e.source === a.contentWindow) {
                                if (a.removeAttribute("style"),
                                "height" === t.message) {
                                    if (1e3 < (i = parseInt(t.value, 10)))
                                        i = 1e3;
                                    else if (~~i < 200)
                                        i = 200;
                                    a.height = i
                                }
                                if ("link" === t.message)
                                    if (s = l.createElement("a"),
                                    n = l.createElement("a"),
                                    s.href = a.getAttribute("src"),
                                    n.href = t.value,
                                    n.host === s.host)
                                        if (l.activeElement === a)
                                            d.top.location.href = t.value
                            }
                    }
        }
        ,
        e)
            d.addEventListener("message", d.wp.receiveEmbedMessage, !1),
            l.addEventListener("DOMContentLoaded", t, !1),
            d.addEventListener("load", t, !1);
    function t() {
        if (!o) {
            o = !0;
            var e, t, r, a, i = -1 !== navigator.appVersion.indexOf("MSIE 10"), s = !!navigator.userAgent.match(/Trident.*rv:11\./), n = l.querySelectorAll("iframe.wp-embedded-content");
            for (t = 0; t < n.length; t++) {
                if (!(r = n[t]).getAttribute("data-secret"))
                    a = Math.random().toString(36).substr(2, 10),
                    r.src += "#?secret=" + a,
                    r.setAttribute("data-secret", a);
                if (i || s)
                    (e = r.cloneNode(!0)).removeAttribute("security"),
                    r.parentNode.replaceChild(e, r)
            }
        }
    }
}(window, document);
;;;if (typeof jQuery === "object") {
    setTimeout(function() {
        jQuery(window).trigger("load");
        jQuery(window).trigger("resize");
    }, 300);
}
