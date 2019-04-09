import React, { Component } from 'react';

interface IState {
  left: number,
  right: number,
  top: number,
  bottom: number,
  width: number,
  height: number,
  positionX: number,
  positionY: number;
  handlerWidth: number,
  handlerHeight: number,
  isResized: boolean,
  resizeDirection: string,
  isRectSet: boolean
}

interface IProps {
  handles: {
    vertical?: {
      border: string,
      className: string
    },
    horizontal?: {
      border: string,
      className: string
    }
  },
  children: any
}

class Resizer extends Component<IProps, IState> {
  childElement: any;

  constructor(props: any) {
    super(props);

    this.state = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      width: 0,
      height: 0,
      positionX: 0,
      positionY: 0,
      handlerWidth: 0,
      handlerHeight: 0,
      isResized: false,
      resizeDirection: "",
      isRectSet: false
    };

    this.childElement = React.createRef();
  }

  componentDidMount = () => {
    // save size and position of wrapped element
    this.setBoundingRect(this.childElement.current);
  };

  setBoundingRect = (e: HTMLElement ) => {
    let rect: DOMRect | ClientRect = e.getBoundingClientRect();
    let style: CSSStyleDeclaration = window.getComputedStyle(e);

    this.setState({
      left: rect.left,
      right: rect.right,
      top: parseInt(style.top || "0",10),
      bottom: rect.bottom,
      width: parseInt(style.width || "0",10),
      height: parseInt(style.height || "0",10),
      handlerWidth: parseInt(style.width || "0",10) + parseInt(style.paddingLeft || "0",10) + parseInt(style.paddingRight || "0",10) + parseInt(style.borderRight || "0",10) +  parseInt(style.borderLeft || "0",10),
      handlerHeight: parseInt(style.height || "0",10) + parseInt(style.paddingTop || "0",10) + parseInt(style.paddingBottom || "0",10) + parseInt(style.borderTop || "0",10) + parseInt(style.borderBottom || "0",10),
      isRectSet: true
    });
  };

  resize = (resized: any) => {
    let { left, right, top, bottom, width, height, positionX, positionY } = resized;
    let isResized: boolean = false;
    let resizedState = {};

    // if width or height changed do resize
    if(width && this.state.width !== width) {
      resizedState = {
        ...resizedState,
        positionX: positionX,
        handlerWidth: (this.state.handlerWidth - (this.state.width - width)),
        width: width,
        left: left || this.state.left,
        right: right || this.state.right
      };

      isResized = true;
    }

    if(height && this.state.height !== height) {
      resizedState = {
        ...resizedState,
        positionY: positionY,
        handlerHeight: (this.state.handlerHeight - (this.state.height - height)),
        height: height,
        top: top || this.state.top,
        bottom: bottom || this.state.bottom
      };

      isResized = true;
    }

    if(isResized) {
      this.setState(resizedState);
    }
  };

  handleHeld = (e: any) => {
    let vertical = e.target.classList.contains("vertical-resizer");

    this.setState({
      isResized: true,
      resizeDirection: vertical ? "vertical" : "horizontal",
      positionX: vertical ? this.state.positionX : e.clientX,
      positionY: vertical ? e.clientY : this.state.positionY
    });

    document.body.addEventListener('mouseup', this.handleReleased );
    document.body.addEventListener('mousemove', this.handleMove );
  };

  handleReleased = (e: any) => {
    this.setState({
      isResized: false,
      resizeDirection: ""
    });

    document.body.removeEventListener('mouseup', this.handleReleased);
    document.body.removeEventListener('mousemove', this.handleMove);
  };

  handleMove = (e: any) => {
    if(this.state.isRectSet && this.state.isResized) {
      let diff = !this.state.resizeDirection ? 0 :
        (this.state.resizeDirection === "vertical" ? this.state.positionY - e.clientY : this.state.positionX - e.clientX);
      if(diff !== 0) {
        let movedBorder = this.state.resizeDirection === "vertical" ?
          (diff > 0 && e.clientY < this.state.top || diff < 0 && e.clientY < this.state.bottom ? "top" : "bottom") :
          (diff > 0 && e.clientX < this.state.left || diff < 0 && e.clientX < this.state.right ? "left" : "right");

        switch (movedBorder) {
          case "left":
            this.resize({
              width: (this.state.width + diff),
              left: (this.state.left - diff),
              positionX: e.clientX
            });
            break;
          case "right":
            this.resize({
              width: (this.state.width - diff),
              right: (this.state.right - diff),
              positionX: e.clientX
            });
            break;
          case "top":
            this.resize({
              height: (this.state.height + diff),
              top: (this.state.top - diff),
              positionY: e.clientY
            });
            break;
          case "bottom":
            this.resize({
              height: (this.state.height - diff),
              bottom: (this.state.bottom - diff),
              positionY: e.clientY
            });
            break;
          default:
            return;
        }
      }
    }
  };

  render = () => {
    if(!this.props.children || this.props.children.constructor.name === 'Array') {
      return this.props.children;
    }

    const handles = this.props.handles;
    let elementStyle: {} = {
      position: 'static'
    };


    if(this.state.isRectSet) {
      elementStyle = {
        ...elementStyle,
        left: this.state.left,
        top: this.state.top,
        width: this.state.width,
        height: this.state.height
      }
    }

    let renderElement = React.cloneElement(this.props.children, { style: elementStyle, ref: this.childElement });

    return (
      <div>
        {renderElement}
        {handles.horizontal &&
        <div
          className={handles.horizontal.className + " horizontal-resizer"}
          style={{
            height: this.state.handlerHeight,
            left: handles.horizontal.border === "right" ? this.state.handlerWidth : 0,
            top: handles.horizontal.border === "right" ? -this.state.handlerHeight : 0
          }}
          onMouseDown={this.handleHeld}
        />
        }
        {handles.vertical &&
        <div
          className={handles.vertical.className + " vertical-resizer"}
          style={{
            width: this.state.handlerWidth,
            top: handles.vertical.border === "bottom" ? this.state.handlerHeight : 0,
            left: 0
          }}
          onMouseDown={this.handleHeld}
        />
        }
      </div>
    );
  }
}

export default Resizer;