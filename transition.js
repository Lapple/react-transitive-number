var React = require('react');
var D = React.DOM;
var findDOMNode = require('react-dom').findDOMNode

var Transition = React.createClass({
    getInitialState: function() {
        return {
            in: (
                this.props.out ?
                    true :
                    !this.props.animateEntrance
            )
        };
    },
    componentDidMount: function() {
        this._timeout = raf(this.tada);
    },
    componentWillUnmount: function() {
        caf(this._timeout);
    },
    tada: function() {
        // Force element reflow to ensure correct animation in FF.
        findDOMNode(this).offsetWidth;

        this.setState({
            in: true
        });
    },
    getAppearance: function() {
        var transform = this.getTransform();

        return {
            display: 'inline-block',

            // Can't dynamically change `position` from `absolute` to `static` -
            // it will break transition animation in Safari.
            position: 'absolute',
            left: 0,

            WebkitTransition: '-webkit-transform 0.2s, opacity 0.2s',
            transition: 'transform 0.2s, opacity 0.2s',

            WebkitTransform: transform,
            transform: transform,

            opacity: (
                this.isHidden() ?
                    0 :
                    1
            ),

            pointerEvents: 'none'
        };
    },
    getTransform: function() {
        if (this.props.out) {
            return translateY(this.props.goingUp);
        }

        if (!this.state.in) {
            return translateY(!this.props.goingUp);
        }

        // This has better text rendering in FF than simply `none`.
        return 'translateY(0) translateZ(0)';
    },
    isHidden: function() {
        return this.props.out || !this.state.in;
    },
    render: function() {
        return D.span(
            {
                style: this.getAppearance()
            },
            this.props.value
        );
    }
});

module.exports = Transition;

function raf(fn) {
    if (typeof window.requestAnimationFrame === 'function') {
        return window.requestAnimationFrame(fn);
    } else {
        return setTimeout(fn, 0);
    }
}

function caf(timer) {
    if (typeof window.cancelAnimationFrame === 'function') {
        return window.cancelAnimationFrame(timer);
    } else {
        return clearTimeout(timer);
    }
}

function translateY(isUp) {
    return 'translateY(' + (isUp ? '-' : '') + '60%) translateZ(0)';
}
