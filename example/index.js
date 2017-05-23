var React = require('react');
var render = require('react-dom').render;
var moment = require('moment');
var createReactClass = require('create-react-class');

var D = React.DOM;

var TransitiveNumber = require('..');
var transitiveNumber = React.createFactory(TransitiveNumber);

var App = createReactClass({
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
            D.div(
                { className: 'comparison' },
                D.div(
                    { className: 'comparison__cell comparison__cell_head' },
                    'Plain HTML'
                ),
                D.div(
                    { className: 'comparison__cell comparison__cell_head' },
                    'With ',
                    D.code(null, 'TransitiveNumber')
                ),
                D.div(
                    { className: 'comparison__cell comparison__cell_first' },
                    D.div(
                        { className: 'timer' },
                        D.span({ className: 'timer__dot' }),
                        D.span(
                            null,
                            moment(this.state.time * 1000).format('HH:mm:ss')
                        )
                    )
                ),
                D.div(
                    { className: 'comparison__cell' },
                    D.div(
                        { className: 'timer' },
                        D.span({ className: 'timer__dot' }),
                        transitiveNumber(
                            null,
                            moment(this.state.time * 1000).format('HH:mm:ss')
                        )
                    )
                ),
                D.div(
                    { className: 'comparison__cell comparison__cell_first' },
                    D.div(
                        { className: 'counter' },
                        D.button(
                            {
                                className: 'counter__button counter__button_down',
                                type: 'button',
                                onClick: this.decrementCount
                            }
                        ),
                        D.span(
                            null,
                            this.state.count + ' points'
                        ),
                        D.button(
                            {
                                className: 'counter__button counter__button_up',
                                type: 'button',
                                onClick: this.incrementCount
                            }
                        )
                    )
                ),
                D.div(
                    { className: 'comparison__cell' },
                    D.div(
                        { className: 'counter' },
                        D.button(
                            {
                                className: 'counter__button counter__button_down',
                                type: 'button',
                                onClick: this.decrementCount
                            }
                        ),
                        transitiveNumber(
                            null,
                            this.state.count
                        ),
                        ' points',
                        D.button(
                            {
                                className: 'counter__button counter__button_up',
                                type: 'button',
                                onClick: this.incrementCount
                            }
                        )
                    )
                )
            )
        );
    }
});

document.addEventListener('DOMContentLoaded', function() {
    var app = React.createFactory(App);

    setInterval(function() {
        render(
            app(),
            document.getElementById('app')
        );
    });
});
