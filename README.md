## react-transitive-number

React component to apply transition effect to numeric strings, a la old Groupon timers

![Demo](http://i.imgur.com/OJGsoig.gif)

- [Live demo](http://lapple.github.io/react-transitive-number/)
- [Example](https://github.com/Lapple/react-transitive-number/blob/master/example/index.js)

### Usage

```jsx
var TransitiveNumber = require('react-transitive-number');

module.exports = React.createClass({
    render: function() {
        return (
            <div>
                <TransitiveNumber>2:00</TransitiveNumber>
            </div>
        );
    }
});
```

### Properties

#### props.children

Text value that should be converted.

#### props.className

Optional class name.
