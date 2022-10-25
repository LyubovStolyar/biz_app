import React from "react";
import { getRequest } from "../services/apiService";
import Card, { CardType } from "./Card";
import Header from "./Header";
import Title from "./Title";
import "./Homepage.css";
import { BiGrid, BiListUl, BiSearchAlt } from "react-icons/bi";

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
  unSortedCards: Array<CardType> = [];

  componentDidMount(): void {
    const res = getRequest("cards");

    if (!res) {
      window.open("/login", "_self");
      return;
    }

    res
      .then((res) => res.json())
      .then((json) => {
        this.unSortedCards = json;
        this.setState(() => ({
          cards: json,
        }));
      });
  }

  changeDisplay = (mode: displayMode) => {
    this.setState(() => ({
      display: mode,
    }));
  };

  displayBtnCss = (mode: displayMode): string => {
    return mode === this.state.display ? "grid" : "list";
  };

  filterCards = (value: string): void => {
    value = value.toLowerCase();
    let tempArray: Array<CardType> = this.unSortedCards
      .filter((e) => e.name.toLowerCase().includes(value))
      .sort(
        (card1, card2) =>
          card1.name.toLowerCase().indexOf(value) -
          card2.name.toLowerCase().indexOf(value)
      );
    this.setState(() => ({
      cards: tempArray,
    }));
  };

  render(): React.ReactNode {
    return (
      <>
        <Header />
        <Title>
          <h1>BizAd</h1>
          <h2>Advertizing your business</h2>
        </Title>

        <div className="homeCont">
          <div className="searchCont">
            <input
              className="inputSearch"
              type="text"
              onChange={(e) => this.filterCards(e.target.value)}
              placeholder="Search by business name"
            ></input>
            <div className="iconSearch">
              <i>
                <BiSearchAlt />
              </i>
            </div>
          </div>

          <div className="homeButtons">
            <button
              onClick={(e) => this.changeDisplay(displayMode.list)}
              className={"list"}
            >
              <i className="iconHomepage">
                <BiListUl />
              </i>
            </button>

            <button
              onClick={(e) => this.changeDisplay(displayMode.grid)}
              className={"grid"}
            >
              <i className="iconHomepage">
                <BiGrid />
              </i>
            </button>
          </div>
        </div>
        {this.state?.cards != null && (
          <div className={this.state.display}>
            {this.state.cards.map((e) => (
              <Card data={e} key={e._id}></Card>
            ))}
          </div>
        )}
      </>
    );
  }
}

export default Homepage;
