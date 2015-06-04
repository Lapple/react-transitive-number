var React = require('react');
var D = React.DOM;

var Symbol = require('./symbol');
var symbol = React.createFactory(Symbol);

var TransitiveNumber = React.createClass({
    getDefaultProps: function() {
        return {
            className: null
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
                        key: index
                    });
                })
        );
    }
});

module.exports = TransitiveNumber;
