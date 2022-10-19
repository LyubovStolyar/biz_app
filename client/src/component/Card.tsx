import React from "react";
import { Link } from "react-router-dom";
import { getRequest } from "../services/apiService";

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
        <img src={data.imageUrl} alt={data.name} className="" />
        {/* <button
                onClick={() => this.props.categoryChange(data.category)} className='text-capitalize badge bg-info border-0'>
                {data.category}
            </button> */}
        <div className="">
          <div className="">{data.name}</div>
          <div className="">{data.description}</div>
          <div>
            <i className=""></i>
            {data.phone}
          </div>
          <div>{data.adress}</div>

          <Link to="/about" state={data.url} className="">
            To Website
          </Link>
        </div>
      </>
    );
  }
}

export default Card;
