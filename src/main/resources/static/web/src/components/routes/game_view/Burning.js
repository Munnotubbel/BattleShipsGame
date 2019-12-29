import React from "react";
import "../../../css/Water.css";
import "../../../css/Boards.css";

export default function Burning() {
  return (
    <div class="watergrid">
      <div class="oil1"></div>
      <div class="oil2"></div>
      <div class="oil3"></div>
      <div class="oil4"></div>
      <div class="oil5"></div>
      <div class="oil6"></div>
      <div class="oil7"></div>
      <div class="oil8"></div>
      <div class="oil9"></div>
      <div class="oil10"></div>
      <div class="fire">
        <div class="fire-left">
          <div class="main-fire"></div>
          <div class="particle-fire"></div>
        </div>
        <div class="fire-main">
          <div class="main-fire"></div>
          <div class="particle-fire"></div>
        </div>
        <div class="fire-right">
          <div class="main-fire"></div>
          <div class="particle-fire"></div>
        </div>
        <div class="fire-bottom">
          <div class="main-fire"></div>
        </div>
      </div>
    </div>
  );
}
