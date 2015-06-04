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
        return D.span(
            {
                className: this.props.className,
                style: {
                    whiteSpace: 'pre'
                }
            },
            this.props.children
                .toString()
                .split('')
                .map(function(s, index) {
                    return symbol({
                        symbol: s,
                        key: index
                    });
                })
        );
    }
});

module.exports = TransitiveNumber;
