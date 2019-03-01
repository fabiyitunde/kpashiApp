import React from "react";
import { Svg } from "expo";
const { Path, G, Image, Text, Rect } = Svg;
import KpashiPlayingCard from "./kpashiPlayingCard";
class KpashiOpenedCards extends React.Component {
  state = {};

  render() {
    const { cards, offset } = this.props;

    const factor = offset * cards.length;
    const widthofsvg = 76 + factor;
    return (
      <Svg width={widthofsvg} height={88}>
        {cards.map((card, index) => {
          return (
            <G x={index * offset} y={0} key={index}>
              <KpashiPlayingCard
                cardtype={card.cardtype}
                suittype={card.suittype}
              />
            </G>
          );
        })}
      </Svg>
    );
  }
}

export default KpashiOpenedCards;
