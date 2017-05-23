var React = require('react');
var D = React.DOM;
var createReactClass = require('create-react-class');

var Symbol = require('./symbol');
var symbol = React.createFactory(Symbol);

var TransitiveNumber = createReactClass({
    getDefaultProps: function() {
        return {
            className: null,
            enableInitialAnimation: false
        };
    },
    render: function() {
        var value = this.props.children.toString();

        // Invert animation direction when negative number is supplied.
        var inverted = value[0] === '-';

        return D.span(
            {
                className: this.props.className,
                style: {
                    whiteSpace: 'pre'
                }
            },
            value
                .split('')
                .map(function(s, index) {
                    return symbol({
                        symbol: s,
                        inverted: inverted,
                        enableInitialAnimation: this.props.enableInitialAnimation,
                        key: index
                    });
                }, this)
        );
    }
});

module.exports = TransitiveNumber;
