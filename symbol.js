var React = require('react');
var D = React.DOM;

var Transition = require('./transition');
var transition = React.createFactory(Transition);

var Symbol = React.createClass({
    getInitialState: function() {
        return { previous: null };
    },
    componentWillReceiveProps: function() {
        this.setState({
            previous: this.props.symbol
        });
    },
    shouldComponentUpdate: function(nextProps) {
        return nextProps.symbol !== this.props.symbol;
    },
    render: function() {
        return D.span(
            {
                style: {
                    position: 'relative'
                }
            },
            this.renderCurrent(),
            this.renderPrevious()
        );
    },
    renderCurrent: function() {
        return transition({
            value: this.props.symbol,
            key: this.props.symbol
        });
    },
    renderPrevious: function() {
        if (this.state.previous !== null) {
            return transition({
                value: this.state.previous,
                out: true,
                key: this.state.previous
            });
        }

        return null;
    }
});

module.exports = Symbol;
