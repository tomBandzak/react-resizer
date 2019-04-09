import React from 'react';
import ReactDOM from 'react-dom';
import '../src/index.css';
import Resizer from './Resizer';

const handlesR = {
  horizontal: {
    border: "right",
    className: "hor-resize-handle"
  },
};

const handlesL = {
  horizontal: {
    border: "left",
    className: "hor-resize-handle-l"
  },
};

const handlesB = {
  vertical: {
    border: "bottom",
      className: "v-resize-handle"
  }
};

ReactDOM.render(<Resizer handles={handlesR}><div className="resized-example-r" style={{}} /></Resizer>, document.getElementById('resizer-right'));
ReactDOM.render(<Resizer handles={handlesL}><div className="resized-example-l" style={{}} /></Resizer>, document.getElementById('resizer-left'));
ReactDOM.render(<Resizer handles={handlesB}><div className="resized-example-l" style={{}} /></Resizer>, document.getElementById('resizer-bottom'));