import React from "react";
import { Svg } from "expo";
const { Path, G, Image, Text, Rect } = Svg;
import KpashiPlayingCard from "./kpashiPlayingCard";
class KpashiDeckOfCards extends React.Component {
  state = {};

  render() {
    const { cards } = this.props;
    const offset = 35;
    const factor = offset * cards.length;
    const heightofsvg = 88 + factor;
    return (
      <Svg width={76} height={heightofsvg}>
        {cards.map((card, index) => {
          return (
            <G x={0} y={index * offset} key={index}>
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

export default KpashiDeckOfCards;
