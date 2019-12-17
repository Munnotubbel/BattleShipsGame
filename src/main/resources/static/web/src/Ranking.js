import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import BootstrapTable from "react-bootstrap-table-next";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import CardColumns from "react-bootstrap/CardColumns";
import Button from "react-bootstrap/Button";
import ReactTimeAgo from "react-time-ago";
export default class Ranking extends Component {
  state = {};
  componentDidMount = () => {
    this.fetchRanking();
  };
  fetchRanking = () => {
    fetch(`api/ranking`)
      .then(response => response.json())
      .then(response => this.setState({ ranking: response }));
  };

  createRanking = () => {
    const players = [];
    const columns = [
      {
        dataField: "rank",
        text: "rank",
        sort: true
      },
      {
        dataField: "name",
        text: "Player",
        sort: true
      },
      {
        dataField: "wins",
        text: "victory",
        sort: true
      },
      {
        dataField: "ties",
        text: "stalemate",
        sort: true
      },
      {
        dataField: "loses",
        text: "defeat",
        sort: true
      },
      {
        dataField: "rating",
        text: "rating",
        sort: true
      }
    ];
    if (this.state.ranking) {
      this.state.ranking.forEach(player => {
        let name = player.UserName;
        let wins = 0;
        let loses = 0;
        let ties = 0;
        let rating = 0;

        for (var i = 0; i < player.scores.length; i++) {
          player.scores[i] === 1.0 && wins++;
          player.scores[i] === 0.5 && ties++;
          player.scores[i] === 0.0 && loses++;
          rating = rating + player.scores[i];
        }

        players.push({
          name: name,
          wins: wins,
          ties: ties,
          loses: loses,
          rating: rating
        });
      });
      players.sort((a, b) =>
        a.rating < b.rating ? 1 : b.rating < a.rating ? -1 : 0
      );
      players.forEach((player, index) => {
        player["rank"] = index + 1;
        console.log(player);
      });
      return (
        <BootstrapTable keyField="index" data={players} columns={columns} />
      );
    }
  };

  render() {
    if (this.state.ranking) {
      return (
        <Card className="one-edge-shadow" style={{ width: "80%" }}>
          {this.state.ranking && <Card.Body>{this.createRanking()}</Card.Body>}
        </Card>
      );
    } else {
      return <h1>...loading</h1>;
    }
  }
}
