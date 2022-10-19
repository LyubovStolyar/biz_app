import React from "react";
import { getRequest } from "../services/apiService";
import Card, { CardType } from "./Card";
import Header from "./Header";
import Title from "./Title";
import './Homepage.css';
import { BiGrid, BiListUl } from "react-icons/bi";

export enum displayMode {
  grid = "grid",
  list = "list",
}

interface IState {
  cards: Array<CardType>;
  display: displayMode;
}
interface MenuProps {
  defaultDisplay: displayMode;
}

class Homepage extends React.Component<MenuProps, IState> {
  componentDidMount(): void {
    const res = getRequest("cards");

   
    if (!res) {
      return;
    }

    res
      .then((res) => res.json())
      .then((json) => {
        this.setState(() => ({
          cards: json,
        }));
      });
  }

  render(): React.ReactNode {
    return (
      <>
        <Header />
        <Title>
          <h1>BizAd</h1>
          <h2>Advertizing your business</h2>
        </Title>
        <button
          onClick={(e) => this.changeDisplay(displayMode.list)}
          className={"list"}
        >
          <i> <BiListUl /> </i>
        </button>
        <button
          onClick={(e) => this.changeDisplay(displayMode.grid)}
          className={"grid"}
        >
          <i className=""><BiGrid/></i>
        </button>

        {this.state?.cards != null && (
          <>
            {this.state.cards.map((e) => (
              <Card data={e} key={e._id}></Card>
            ))}
          </>
        )}
      </>
    );
  }
  changeDisplay = (mode: displayMode) => {
    this.setState((state, props) => ({
      display: mode,
    }));
  };
  displayBtnCss = (mode: displayMode): string => {
    return mode === this.state.display ? "list" : "grid";
  };

}

export default Homepage;
