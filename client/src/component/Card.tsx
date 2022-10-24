import React from "react";
import { BiPhone } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./Card.css";

export type CardType = {
  _id: string;
  name: string;
  description: string;
  phone: string;
  adress: string;
  url: string;
  bizNumber: number;
  imageUrl: string;
};

interface Props {
  data: CardType;
}

interface State {}

class Card extends React.Component<Props, State> {
  render() {
    const { data } = this.props;

    return (
      <>
        <div className="cardCont">
          <img src={data.imageUrl} alt={data.name} className="cardPhoto" />
          <div className="cardName">{data.name}</div>
          <div className="cardDesc">{data.description}</div>
          <div className="cardPhone">
            <i><BiPhone /></i>
            {data.phone}
          </div>
          <div className="cardAdress">{data.adress}</div>
          <button className="cardLinkButton">
            <Link to="/about" state={data.url} className="cardLink">
              To Website
            </Link>
          </button>
        </div>
      </>
    );
  }
}

export default Card;
