import React from 'react';
import ReactDOM from 'react-dom';
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

const handlesT = {
  vertical: {
    border: "top",
    className: "v-resize-handle"
  }
};

it('right handled Resizer renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render((
      <Resizer handles={handlesR}>
        <div style={{}} />
      </Resizer>
    ),
    div);
  ReactDOM.unmountComponentAtNode(div);
});

it('left handled Resizer renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render((
      <Resizer handles={handlesL}>
        <div style={{}} />
      </Resizer>
    ),
    div);
  ReactDOM.unmountComponentAtNode(div);
});

it('bottom handled Resizer renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render((
      <Resizer handles={handlesB}>
        <div style={{}} />
      </Resizer>
    ),
    div);
  ReactDOM.unmountComponentAtNode(div);
});

it('top handled Resizer renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render((
      <Resizer handles={handlesT}>
        <div style={{}} />
      </Resizer>
    ),
    div);
  ReactDOM.unmountComponentAtNode(div);
});

it('top and left handled Resizer renders without crashing', () => {
  const div = document.createElement('div');
  let resizer = ReactDOM.render((
      <Resizer handles={{...handlesT, ...handlesL}}>
        <div />
      </Resizer>
    ),
    div);
  ReactDOM.unmountComponentAtNode(div);
});

test('resizing', () => {
  const div = document.createElement('div');
  // let resizer = ReactDOM.render(<Resizer handles={handlesR}><div style={{ width: '100px', height: '100px' }} /></Resizer>, div);
  let resizer = ReactDOM.render(<Resizer handles={handlesR}><div style={{ left: '50px', width: '100px', height: '100px' }} /></Resizer>, div);

  const initWidth = 150,
    initRight = 160,
    initPosX = 160,
    newWidth =  145,
    newRight = 155,
    newPosX = 155;

  resizer.setState({
    left: 10,
    right: initRight,
    top: 10,
    width: initWidth,
    height: 150,
    positionX: initPosX,
    handlerWidth:150,
    handlerHeight:150
  });

  resizer.resize({
    width: 150,
    right: newRight, // right is smaller, but size should remains the same and state is not changed
    positionX: newPosX // positionX is smaller, but size should remains the same and state is not changed
  });

  expect(resizer.state.width).toEqual(initWidth);
  expect(resizer.state.right).toEqual(initRight);
  expect(resizer.state.positionX).toEqual(initPosX);

  resizer.resize({
    width: newWidth,
    right: newRight, // right is smaller, but size should stay the same
    positionX: newPosX
  });

  expect(resizer.state.width).toEqual(newWidth);
  expect(resizer.state.right).toEqual(newRight);
  expect(resizer.state.positionX).toEqual(newPosX);

  ReactDOM.unmountComponentAtNode(div);
});