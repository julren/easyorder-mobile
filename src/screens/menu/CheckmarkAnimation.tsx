import React, { PureComponent } from "react";
import { DangerZone } from "expo";
let { Lottie } = DangerZone;

interface IState {
  animation: any;
}

class CheckmarkAnimation extends PureComponent<any, IState> {
  animation: any;

  componentDidMount() {
    this._playAnimation();
  }

  _playAnimation = () => {
    this.animation.play();
  };

  render() {
    const animationSource = require("../../../assets/animations/checkmark.json");

    return (
      <Lottie
        ref={animation => {
          this.animation = animation;
        }}
        style={{
          ...this.props.style
        }}
        loop={false}
        source={animationSource}
      />
    );
  }
}

export default CheckmarkAnimation;
