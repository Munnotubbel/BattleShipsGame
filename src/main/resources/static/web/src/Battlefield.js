import React, { Component } from "react";
import { Col } from "react-bootstrap";
import Cell from "./Cell";

export default props => {
  let { battleField } = props;
  return (
    <Col lg={5} md={6} sm={12} xs={12} className="battleFieldPanel">
      <table className={`battlefieldTable `}>
        <tbody>
          {battleField.map((row, x) => {
            return (
              <tr key={x}>
                {row.map((column, y) => {
                  return (
                    <td key={y} className="tableCell">
                      <Cell x={x} y={y} cellState={column} />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Col>
  );
};
