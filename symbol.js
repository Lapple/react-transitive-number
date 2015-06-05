var React = require('react');
var D = React.DOM;

var Transition = require('./transition');
var transition = React.createFactory(Transition);

var Symbol = React.createClass({
    getInitialState: function() {
        return {
            previous: null,
            decrementing: false
        };
    },
    componentDidMount: function() {
        React.findDOMNode(this).addEventListener('transitionend', this.removePrevious);
    },
    componentWillUnmount: function() {
        React.findDOMNode(this).removeEventListener('transitionend', this.removePrevious);
    },
    componentWillReceiveProps: function(nextProps) {
        if (nextProps.symbol !== this.props.symbol) {
            var decrementing = isDecrementing(this.props.symbol, nextProps.symbol);

            this.setState({
                previous: this.props.symbol,
                decrementing: (
                    this.props.inverted ?
                        !decrementing :
                        decrementing
                )
            });
        }
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        return (
            nextProps.symbol !== this.props.symbol ||
            nextState.previous !== this.state.previous
        );
    },
    removePrevious: function() {
        this.setState({
            previous: null
        });
    },
    render: function() {
        return D.span(
            {
                style: {
                    position: 'relative'
                }
            },
            // Have to render this transparent spacer span to mitigate the issue
            // when Safari would not animate transition if changing `position`
            // from `absolute` to `static`.
            this.renderSpacer(),
            this.renderTransitionIn(),
            this.renderTransitionOut()
        );
    },
    renderSpacer: function() {
        return D.span(
            {
                style: {
                    visibility: 'hidden'
                }
            },
            this.props.symbol
        );
    },
    renderTransitionIn: function() {
        return transition({
            value: this.props.symbol,
            up: this.state.decrementing,
            key: this.props.symbol
        });
    },
    renderTransitionOut: function() {
        if (this.state.previous !== null) {
            return transition({
                value: this.state.previous,
                out: true,
                up: this.state.decrementing,
                key: this.state.previous
            });
        }

        return null;
    }
});

module.exports = Symbol;

function isDecrementing(a, b) {
    var numberA = Number(a);
    var numberB = Number(b);

    // Special case when going from 9 or 6 to 0 (and back).
    if (Math.abs(numberB - numberA) !== 1) {
        return numberA === 0;
    } else {
        return numberB < numberA;
    }
}
