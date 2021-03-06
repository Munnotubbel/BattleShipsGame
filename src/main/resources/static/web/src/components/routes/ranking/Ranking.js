import React, { useContext, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import Card from "react-bootstrap/Card";
import { InfoContext } from "../../../InfoContext";

export default function Ranking() {
  const infocon = useContext(InfoContext);
  useEffect(() => {
    infocon.fetchRanking();
  }, []);

  function createRanking() {
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
        dataField: "canceled",
        text: "canceled",
        sort: true
      },
      {
        dataField: "rating",
        text: "rating",
        sort: true
      }
    ];
    if (infocon.ranking) {
      infocon.ranking.forEach(player => {
        let name = player.UserName;
        let wins = 0;
        let loses = 0;
        let ties = 0;
        let rating = 0;
        let canceled = 0;

        for (var i = 0; i < player.scores.length; i++) {
          player.scores[i] === 1.0 && wins++;
          player.scores[i] === 0.5 && ties++;
          player.scores[i] === 0.0 && loses++;
          player.scores[i] === 0.01 && canceled++;
          if (player.scores[i] !== 0.01) {
            rating = rating + player.scores[i];
          }
        }

        players.push({
          name: name,
          wins: wins,
          ties: ties,
          loses: loses,
          canceled: canceled,
          rating: rating
        });
      });
      players.sort((a, b) =>
        a.rating < b.rating ? 1 : b.rating < a.rating ? -1 : 0
      );
      players.forEach((player, index) => {
        player["rank"] = index + 1;
      });
      return (
        <BootstrapTable
          hover={true}
          bordered={false}
          classes="table-borderless"
          keyField="index"
          data={players}
          columns={columns}
        />
      );
    }
  }

  return (
    <Card className="one-edge-shadow" style={{ width: "80%" }}>
      {infocon.ranking ? (
        <Card.Body>{createRanking()}</Card.Body>
      ) : (
        <Card.Body>...loading</Card.Body>
      )}
    </Card>
  );
}
