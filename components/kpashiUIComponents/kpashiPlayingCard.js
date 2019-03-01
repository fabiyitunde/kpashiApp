import React from "react";
import { Svg } from "expo";
const { Path, G, Image, Text, Rect } = Svg;
/* SVGR has dropped some elements not supported by react-native-svg: title */
class KpashiPlayingCard extends React.Component {
  state = {};
  resolveCardNumber(cardtype) {
    if (cardtype == 1) return "A";
    return cardtype;
  }
  resolvecardimage(suittype) {
    if (suittype == 0) return require("../../assets/images/s.png");
    if (suittype == 1) return require("../../assets/images/h.png");
    if (suittype == 2) return require("../../assets/images/d.png");
    return require("../../assets/images/c.png");
  }
  resolveTextFillColor(suittype) {
    if (suittype == 0) return "black";
    if (suittype == 1) return "red";
    if (suittype == 2) return "red";
    return "black";
  }
  render() {
    const { cardtype, suittype } = this.props;

    return (
      <G>
        <Rect
          x="3"
          y="0"
          width="70"
          height="88"
          fill="#fff"
          strokeWidth="1"
          stroke="rgb(0,0,0)"
        />

        <Image
          href={this.resolvecardimage(suittype)}
          height={28}
          width={30}
          y={28.5}
          x={22.5}
        />
        <Text
          fontWeight="bold"
          stroke="#000"
          transform="matrix(1 0 0 1.15045 0 35.024)"
          fontFamily="Helvetica, Arial, sans-serif"
          fontSize={18}
          y={39.122}
          x={47.5}
          strokeWidth={0}
          fill={this.resolveTextFillColor(suittype)}
        >
          {this.resolveCardNumber(cardtype)}
        </Text>
        <Image
          href={this.resolvecardimage(suittype)}
          height={19}
          width={33}
          y={6.5}
          x={41.5}
        />
        <Image
          href={this.resolvecardimage(suittype)}
          height={19}
          width={33}
          y={63.5}
          x={0.5}
        />
        <Text
          fontWeight="bold"
          stroke="#000"
          transform="matrix(1 0 0 1.15045 0 35.024)"
          fontFamily="Helvetica, Arial, sans-serif"
          fontSize={18}
          y={-10.423}
          x={7.5}
          strokeWidth={0}
          fill={this.resolveTextFillColor(suittype)}
        >
          {this.resolveCardNumber(cardtype)}
        </Text>
      </G>
    );
  }
}

export default KpashiPlayingCard;
