var React = require('react');
var D = React.DOM;

var Transition = React.createClass({
    getInitialState: function() {
        return { in: false };
    },
    componentDidMount: function() {
        this._timeout = raf(this.tada);
    },
    componentWillUnmount: function() {
        caf(this._timeout);
    },
    tada: function() {
        // Force element reflow to ensure correct animation in FF.
        React.findDOMNode(this).offsetWidth;

        this.setState({
            in: true
        });
    },
    getAppearance: function() {
        return {
            display: 'inline-block',
            transition: 'transform 0.2s, opacity 0.2s, visibility 0.2s',

            position: (
                this.props.out ?
                    'absolute' :
                    'static'
            ),
            left: 0,

            transform: this.getTransform(),
            opacity: (
                this.isHidden() ?
                    0 :
                    1
            ),
            visibility: (
                this.isHidden() ?
                    'hidden' :
                    'visible'
            )
        };
    },
    getTransform: function() {
        if (this.props.out) {
            return translateY(this.props.up);
        }

        if (!this.state.in) {
            return translateY(!this.props.up);
        }

        return null;
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
    return isUp ? 'translateY(-60%)' : 'translateY(60%)';
}
