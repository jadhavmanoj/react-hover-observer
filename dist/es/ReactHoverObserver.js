var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import omit from 'object.omit';

import noop from './utils/noop';

var _class = function (_React$Component) {
    _inherits(_class, _React$Component);

    function _class(props) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

        _this.state = {
            isHovering: false
        };

        _this.onMouseEnter = _this.onMouseEnter.bind(_this);
        _this.onMouseLeave = _this.onMouseLeave.bind(_this);
        _this.onMouseOver = _this.onMouseOver.bind(_this);
        _this.onMouseOut = _this.onMouseOut.bind(_this);
        _this.setIsHovering = _this.setIsHovering.bind(_this);
        _this.unsetIsHovering = _this.unsetIsHovering.bind(_this);
        _this.componentWillUnmount = _this.componentWillUnmount.bind(_this);

        _this.timerIds = [];
        return _this;
    }

    _createClass(_class, [{
        key: 'onMouseEnter',
        value: function onMouseEnter(e) {
            this.props.onMouseEnter({
                e: e,
                setIsHovering: this.setIsHovering,
                unsetIsHovering: this.unsetIsHovering
            });
        }
    }, {
        key: 'onMouseLeave',
        value: function onMouseLeave(e) {
            this.props.onMouseLeave({
                e: e,
                setIsHovering: this.setIsHovering,
                unsetIsHovering: this.unsetIsHovering
            });
        }
    }, {
        key: 'onMouseOver',
        value: function onMouseOver(e) {
            this.props.onMouseOver({
                e: e,
                setIsHovering: this.setIsHovering,
                unsetIsHovering: this.unsetIsHovering
            });
        }
    }, {
        key: 'onMouseOut',
        value: function onMouseOut(e) {
            this.props.onMouseOut({
                e: e,
                setIsHovering: this.setIsHovering,
                unsetIsHovering: this.unsetIsHovering
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.clearTimers();
        }
    }, {
        key: 'setIsHovering',
        value: function setIsHovering() {
            var _this2 = this;

            this.clearTimers();

            var hoverScheduleId = setTimeout(function () {
                var newState = { isHovering: true };
                _this2.setState(newState, function () {
                    _this2.props.onHoverChanged(newState);
                });
            }, this.props.hoverDelayInMs);

            this.timerIds.push(hoverScheduleId);
        }
    }, {
        key: 'unsetIsHovering',
        value: function unsetIsHovering() {
            var _this3 = this;

            this.clearTimers();

            var hoverOffScheduleId = setTimeout(function () {
                var newState = { isHovering: false };
                _this3.setState(newState, function () {
                    _this3.props.onHoverChanged(newState);
                });
            }, this.props.hoverOffDelayInMs);

            this.timerIds.push(hoverOffScheduleId);
        }
    }, {
        key: 'clearTimers',
        value: function clearTimers() {
            var ids = this.timerIds;
            while (ids.length) {
                clearTimeout(ids.pop());
            }
        }
    }, {
        key: 'getIsReactComponent',
        value: function getIsReactComponent(reactElement) {
            return typeof reactElement.type === 'function';
        }
    }, {
        key: 'shouldDecorateChild',
        value: function shouldDecorateChild(child) {
            return !!child && this.getIsReactComponent(child) && this.props.shouldDecorateChildren;
        }
    }, {
        key: 'decorateChild',
        value: function decorateChild(child, props) {
            return cloneElement(child, props);
        }
    }, {
        key: 'renderChildrenWithProps',
        value: function renderChildrenWithProps(children, props) {
            var _this4 = this;

            if (typeof children === 'function') {
                return children(props);
            }

            return Children.map(children, function (child) {
                return _this4.shouldDecorateChild(child) ? _this4.decorateChild(child, props) : child;
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                className = _props.className;

            var childProps = assign({}, { isHovering: this.state.isHovering }, omit(this.props, ['children', 'className', 'hoverDelayInMs', 'hoverOffDelayInMs', 'onHoverChanged', 'onMouseEnter', 'onMouseLeave', 'onMouseOver', 'onMouseOut', 'shouldDecorateChildren']));

            return React.createElement(
                'tr',
                {
                    className: className,
                    onMouseEnter: this.onMouseEnter,
                    onMouseLeave: this.onMouseLeave,
                    onMouseOver: this.onMouseOver,
                    onMouseOut: this.onMouseOut
                },
                this.renderChildrenWithProps(children, childProps)
            );
        }
    }]);

    return _class;
}(React.Component);

_class.displayName = 'ReactHoverObserver';
_class.defaultProps = {
    hoverDelayInMs: 0,
    hoverOffDelayInMs: 0,
    onHoverChanged: noop,
    onMouseEnter: function onMouseEnter(_ref) {
        var setIsHovering = _ref.setIsHovering;
        return setIsHovering();
    },
    onMouseLeave: function onMouseLeave(_ref2) {
        var unsetIsHovering = _ref2.unsetIsHovering;
        return unsetIsHovering();
    },
    onMouseOver: noop,
    onMouseOut: noop,
    shouldDecorateChildren: true
};
_class.propTypes = {
    className: PropTypes.string,
    hoverDelayInMs: PropTypes.number,
    hoverOffDelayInMs: PropTypes.number,
    onHoverChanged: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseOut: PropTypes.func,
    shouldDecorateChildren: PropTypes.bool
};
export default _class;
;