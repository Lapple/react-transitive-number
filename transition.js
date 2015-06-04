var React = require('react');
var D = React.DOM;

var Transition = React.createClass({
    getInitialState: function() {
        return { in: false };
    },
    componentDidMount: function() {
        this._timeout = setTimeout(this.tada, 0);
    },
    componentWillUnmount: function() {
        clearTimeout(this._timeout);
    },
    tada: function() {
        this.setState({
            in: true
        });
    },
    getAppearance: function() {
        return {
            display: 'inline-block',
            transition: 'transform 0.3s, opacity 0.3s, visibility 0.3s',

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
            return 'translateY(60%)';
        }

        if (!this.state.in) {
            return 'translateY(-60%)';
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

