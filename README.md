# react-resizer
resizer wrapper component

Resizer is a component providing resize functionality for wrapped element/component.
It is possible to define one handle for horizontal and one for vertical resize and also the border which will be the handle (left/right for horizontal and top/bottom for vertical handle).

![Demo CountPages alpha](https://github.com/tomBandzak/react-resizer/blob/master/resizers_sm.gif)

Usage:

const handlesR = {
  horizontal: {
    border: "right",
    className: "hor-resize-handle"
  },
};

ReactDOM.render(
    <Resizer handles={handlesR}>
        <div className="resized-example-r" style={{}} />
    </Resizer>, 
    document.getElementById('resizer-right')
);
