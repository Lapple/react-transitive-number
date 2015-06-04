var React = require('react');
var moment = require('moment');

var D = React.DOM;

var TransitiveNumber = require('..');
var transitiveNumber = React.createFactory(TransitiveNumber);

var App = React.createClass({
    getInitialState: function() {
        return {
            time: 0,
            count: 9
        };
    },
    componentDidMount: function() {
        this._timer = setInterval(this.tick, 1000);
    },
    componentWillUnmount: function() {
        clearInterval(this._timer);
    },
    tick: function() {
        this.setState({
            time: this.state.time + 1
        });
    },
    incrementCount: function() {
        this.setState({
            count: this.state.count + 1
        });
    },
    decrementCount: function() {
        this.setState({
            count: this.state.count - 1
        });
    },
    render: function() {
        return D.div(
            null,
            transitiveNumber(
                null,
                moment(this.state.time * 1000).format('HH:mm:ss')
            ),
            this.renderCounter()
        );
    },
    renderCounter: function() {
        return D.div(
            { className: 'counter' },
            transitiveNumber(
                null,
                this.state.count
            ),
            ' points',
            D.button(
                {
                    className: 'counter__button',
                    type: 'button',
                    onClick: this.incrementCount
                },
                '+'
            ),
            D.button(
                {
                    className: 'counter__button',
                    type: 'button',
                    onClick: this.decrementCount
                },
                '-'
            )
        );
    }
});

document.addEventListener('DOMContentLoaded', function() {
    var app = React.createFactory(App);

    setInterval(function() {
        React.render(
            app(),
            document.getElementById('app')
        );
    });
});
