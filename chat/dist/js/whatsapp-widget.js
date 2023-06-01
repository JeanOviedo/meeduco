/*!
  * WhatsApp Widget v1.2.0 (c) 2020 - Fajar Setya Budi
  * Contributors (https://github.com/agraris/whatsapp-widget/graphs/contributors)
  * Licensed under MIT (https://github.com/agraris/whatsapp-widget/blob/master/LICENSE)
  * WhatsApp Widget does not affiliate with WhatsApp Inc. in any way.
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.WhatsAppWidget = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var CLASS_NAME_WIDGET_TOGGLE = 'wa-widget-toggle';
  var CLASS_NAME_WIDGET_CONTENT = 'wa-widget-content';
  var CLASS_NAME_WIDGET_EXPANDED = 'expanded';
  var CLASS_NAME_WIDGET_FORM_REQUIRED = 'required';
  var SELECTOR_VALUE_TOGGLE_CHAT = 'wa-chat';
  var SELECTOR_VALUE_TOGGLE_SEND = 'wa-send';
  var SELECTOR_CHAT_WIDGET = '[data-chat]';
  var SELECTOR_DATA_TOGGLE_CHAT = "[data-toggle=\"".concat(SELECTOR_VALUE_TOGGLE_CHAT, "\"]");
  var SELECTOR_DATA_TOGGLE_SEND = "[data-toggle=\"".concat(SELECTOR_VALUE_TOGGLE_SEND, "\"]");
  var SELECTOR_DATA_MESSAGE = "[data-message]";
  var DefaultConfig = {
    name: '',
    division: '',
    photo: '',
    introduction: ''
  };
  var DefaultConfigType = {
    name: 'string',
    division: 'string',
    photo: 'string',
    introduction: 'string'
  };
  var DefaultForm = [{
    data: 'name',
    type: 'text',
    required: true
  }, {
    data: 'message',
    type: 'text',
    required: true
  }];
  var DefaultFormType = {
    data: 'string',
    type: 'string',
    required: 'boolean'
  };
  var ChatData = {};
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Chat = /*#__PURE__*/function () {
    function Chat(element, config, input) {
      _classCallCheck(this, Chat);

      if (ChatData[element.id]) return;
      this._element = element;
      this._config = this._getConfig(config);
      this._inputs = this._getInput(input);
      this._phoneNumber = this._element.getAttribute('action');
      this._isShown = false;
      this._toggleChat = '';
      this._contentElement = '';
      this._toggleSend = '';

      this._buildHTML();

      this._setEventListener();

      ChatData[element.id] = this;
    } // PUBLIC


    _createClass(Chat, [{
      key: "toggle",
      value: function toggle() {
        var _this = this;

        Object.keys(ChatData).forEach(function (key) {
          if (key !== _this._element.id && ChatData[key]._isShown) ChatData[key].toggle();
        });
        this._isShown ? this._hide() : this._show();
      } // PRIVATE

    }, {
      key: "_sendMessage",
      value: function _sendMessage() {
        if (!/^\d+$/.test(this._phoneNumber)) {
          throw new Error('Phone number (' + this._phoneNumber + ') is invalid.');
        }

        var send_url = 'https://wa.me/';

        var inputs = this._element.querySelectorAll(SELECTOR_DATA_MESSAGE);

        var parameters = send_url + this._phoneNumber + '?text=';
        var valid = true;

        for (var i = 0; i < inputs.length; i++) {
          var item = inputs[i];
          if (!this._formValidation(item)) valid = false;
          var title = item.getAttribute('data-message');
          parameters += title.replace(/^./, title[0].toUpperCase()) + ': ' + item.value + '%0A';
        }

        if (valid) window.open(parameters, '_blank');
      }
    }, {
      key: "_buildHTML",
      value: function _buildHTML() {
        if (this._element.innerHTML) return false;

        this._verifyInput(this._inputs);

        var TOGGLE = document.createElement('a');
        var ids = '#' + this._element.id;
        TOGGLE.href = ids;
        TOGGLE.classList.add(CLASS_NAME_WIDGET_TOGGLE);
        TOGGLE.setAttribute('data-toggle', SELECTOR_VALUE_TOGGLE_CHAT);
        TOGGLE.setAttribute('data-target', ids);
        TOGGLE.innerHTML = "<img src='https://meeduco.com/chat/images/wp.png' alt='Chat'>"   ;
             var HTML_ELEMENT_WIDGET_MAIN = "".concat(TOGGLE.outerHTML, "\n            <div class=\"").concat(CLASS_NAME_WIDGET_CONTENT, " chat-tab\">\n                <header class=\"chat-header\">\n                    <div class=\"chat-admin-picture\">\n                        <img src=\"").concat(this._config.photo, "\" alt=\"").concat(this._config.name, "'s Photos\">\n                    </div>\n                    <div class=\"chat-admin-details\">\n                        <h4>").concat(this._config.name, "</h4>\n                        <p><small>").concat(this._config.division, "</small></p>\n                    </div>\n                </header>\n                <div class=\"chat-content\">\n                    <div class=\"chat-item\">\n                        <p>").concat(this._config.introduction, "</p>\n                    </div>\n                </div>\n                ").concat(this._buildInputs(this._inputs).outerHTML, "\n            </div>");
        this._element.innerHTML = HTML_ELEMENT_WIDGET_MAIN;
      }
    }, {
      key: "_buildInputs",
      value: function _buildInputs(inputs) {
        var form = document.createElement('div');
        form.classList.add('chat-form');
        inputs.forEach(function (input) {
          var newInput = document.createElement('input');
          newInput.type = input.type;
          newInput.setAttribute('data-message', input.data);
          newInput.placeholder = input.data.replace(/^./, input.data[0].toUpperCase());
          newInput.required = input.required;
          form.appendChild(newInput);
        });
        var button = document.createElement('button');
        button.classList.add('chat-send');
        button.type = 'submit';
        button.setAttribute('data-toggle', SELECTOR_VALUE_TOGGLE_SEND);
        button.innerHTML = '<strong>Enviar</strong>';
        form.appendChild(button);
        return form;
      }
    }, {
      key: "_setEventListener",
      value: function _setEventListener() {
        var _this2 = this;

        this._toggleChat = document.querySelector(SELECTOR_DATA_TOGGLE_CHAT + '[data-target="#' + this._element.id + '"]');
        this._contentElement = this._element.getElementsByClassName(CLASS_NAME_WIDGET_CONTENT).item(0);
        this._toggleSend = this._element.querySelector(SELECTOR_DATA_TOGGLE_SEND);

        if (this._toggleChat) {
          this._toggleChat.addEventListener("click", function (e) {
            e.preventDefault();

            _this2.toggle();
          });
        }

        if (this._toggleSend) {
          this._toggleSend.addEventListener('click', function (e) {
            e.preventDefault();

            _this2._sendMessage();
          });
        }
      }
    }, {
      key: "_show",
      value: function _show() {
        this._element.classList.add(CLASS_NAME_WIDGET_EXPANDED);

        this._toggleChat.classList.add(CLASS_NAME_WIDGET_EXPANDED);

        this._contentElement.classList.add(CLASS_NAME_WIDGET_EXPANDED);

        this._isShown = true;
      }
    }, {
      key: "_hide",
      value: function _hide() {
        this._element.classList.remove(CLASS_NAME_WIDGET_EXPANDED);

        this._toggleChat.classList.remove(CLASS_NAME_WIDGET_EXPANDED);

        this._contentElement.classList.remove(CLASS_NAME_WIDGET_EXPANDED);

        this._isShown = false;
      }
    }, {
      key: "_formValidation",
      value: function _formValidation(formElement) {
        if (!formElement.required) return true;
        formElement.classList.remove(CLASS_NAME_WIDGET_FORM_REQUIRED);

        switch (formElement.type) {
          case 'email':
            if (!/^\S+@\S+$/.test(formElement.value)) {
              formElement.classList.add(CLASS_NAME_WIDGET_FORM_REQUIRED);
              return false;
            }

            break;

          default:
            if (formElement.value == '' || formElement.value == null) {
              formElement.classList.add(CLASS_NAME_WIDGET_FORM_REQUIRED);
              return false;
            }

            break;
        }

        return true;
      }
    }, {
      key: "_getConfig",
      value: function _getConfig(config) {
        config = _objectSpread2(_objectSpread2({}, DefaultConfig), config);

        this._typeCheck(config, DefaultConfigType);

        return config;
      }
    }, {
      key: "_getInput",
      value: function _getInput(inputs) {
        if (typeof inputs === 'undefined' || inputs.length === 0) return DefaultForm;
        return inputs;
      }
    }, {
      key: "_verifyInput",
      value: function _verifyInput(inputs) {
        var _this3 = this;

        inputs.forEach(function (input) {
          _this3._typeCheck(input, DefaultFormType);
        });
      }
    }, {
      key: "_typeCheck",
      value: function _typeCheck(config, configTypes) {
        var _this4 = this;

        Object.keys(configTypes).forEach(function (property) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && _this4._isElement(value) ? 'element' : _this4._toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error("WhatsApp Widget: " + "Option \"".concat(property, "\" provided type \"").concat(valueType, "\" ") + "but expected type \"".concat(expectedTypes, "\"."));
          }
        });
      }
    }, {
      key: "_isElement",
      value: function _isElement(obj) {
        (obj[0] || obj).nodeType;
      } // AngusCroll (https://goo.gl/pxwQGp)

    }, {
      key: "_toType",
      value: function _toType(obj) {
        if (obj === null || obj === undefined) {
          return "".concat(obj);
        }

        return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
      }
    }]);

    return Chat;
  }();

  document.body.onload = function () {
    var chatSelector = document.querySelectorAll(SELECTOR_CHAT_WIDGET);

    for (var i = 0; i < chatSelector.length; i++) {
      var element = chatSelector[i];
      var data = new Chat(element, {}, []); // eslint-disable-line no-unused-vars
    }
  };

  return Chat;

})));
