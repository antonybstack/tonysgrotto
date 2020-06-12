import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "../Emily.css";
// import TicketDisplay from "./TicketDisplay";
// import Chat from "./Chat";
// import UsersOnline from "./UsersOnline";
// import AddTicket from "../changeData/AddTicket";
import { Image, Col } from "react-bootstrap";
// import { Trail } from "react-spring/renderprops";
import { Transition, animated } from "react-springs-latest/renderprops";
import Deck from "./Deck";
import Jumbo from "./Jumbo";
import { Parallax, ParallaxLayer } from "react-spring-parallax";

const CollageMain = () => {
  console.log("CollageMain");
  const url = (name, wrap = false) => `${wrap ? "url(" : ""}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ")" : ""}`;
  const Pink = ({ children }) => <span style={{ color: "#FF6AC1" }}>{children}</span>;
  const Yellow = ({ children }) => <span style={{ color: "#EFF59B" }}>{children}</span>;
  const Lightblue = ({ children }) => <span style={{ color: "#9AEDFE" }}>{children}</span>;
  const Green = ({ children }) => <span style={{ color: "#57EE89" }}>{children}</span>;
  const Blue = ({ children }) => <span style={{ color: "#57C7FF" }}>{children}</span>;
  const Gray = ({ children }) => <span style={{ color: "#909090" }}>{children}</span>;
  var parallax = null;
  const bg = require("./assets/pattern4.jpg");
  const bat1 = require("./assets/parallax/bat1.png");
  const bat2 = require("./assets/parallax/bat2.png");
  const ghost1 = require("./assets/parallax/ghost1.png");
  const ghost2 = require("./assets/parallax/ghost2.png");
  const pumpkin1 = require("./assets/parallax/pumpkin1.png");
  const pumpkin2 = require("./assets/parallax/pumpkin2.png");
  const ringpop = require("./assets/parallax/ringpop.png");
  const heart = require("./assets/parallax/heart.png");
  const heartarray1 = require("./assets/parallax/heartarray1.png");
  const heartarray2 = require("./assets/parallax/heartarray2.png");
  const cloud1 = require("./assets/parallax/cloud1.png");
  const cloud3 = require("./assets/parallax/cloud3.png");
  const cloud4 = require("./assets/parallax/cloud4.png");
  const ski1 = require("./assets/parallax/ski1.png");
  const ski2 = require("./assets/parallax/ski2.png");
  const mountain1 = require("./assets/parallax/mountain1.png");
  const mountain2 = require("./assets/parallax/mountain2.png");
  const water = require("./assets/parallax/water.png");
  const dolphin = require("./assets/parallax/dolphin.png");
  const jelly = require("./assets/parallax/jelly.png");

  // const  = require("./assets/parallax/.png");
  return (
    <Parallax className="parallaxMain" ref={(ref) => (parallax = ref)} pages={6}>
      {/* <ParallaxLayer id="layer1" offset={0.75} speed={0} style={{ backgroundColor: "#ff9d42" }} />
      <ParallaxLayer id="layer1" offset={1.75} speed={0} style={{ backgroundColor: "#ffadf1" }} /> */}

      <ParallaxLayer id="layer3" offset={0} speed={0.05} factor={6.25} style={{ backgroundSize: "cover", backgroundImage: `url(${bg})` }} />

      <ParallaxLayer id="layer1" offset={0} speed={0.25} factor={1} style={{ backgroundColor: "rgba(98,199,242, 0.6)", width: "80%", marginLeft: "10%" }} />
      <ParallaxLayer id="layer1" offset={1} speed={0.25} factor={1.1} style={{ backgroundColor: "rgb(255, 175, 100, 0.5)", width: "80%", marginLeft: "10%" }} />
      <ParallaxLayer id="layer21" offset={2} speed={0.25} factor={1.1} style={{ backgroundColor: "rgba(255,173,241,0.5)", width: "80%", marginLeft: "10%" }} />
      <ParallaxLayer id="layer22" offset={3} speed={0.25} factor={1.1} style={{ backgroundColor: "rgba(255,140,140,0.5)", width: "80%", marginLeft: "10%" }} />
      <ParallaxLayer id="layer23" offset={4} speed={0.25} factor={1.1} style={{ backgroundColor: "rgb(174, 186, 255, 0.5)", width: "80%", marginLeft: "10%" }} />

      {/* Halloween Images */}

      <ParallaxLayer id="bat1" offset={1.05} speed={-0.05} style={{ pointerEvents: "none", opacity: 0.6 }}>
        <img src={bat1} style={{ width: "15%", marginLeft: "80%" }} />
      </ParallaxLayer>
      <ParallaxLayer id="bat2" offset={1.5} speed={-0.3} style={{ pointerEvents: "none", opacity: 0.6 }}>
        <img src={bat2} style={{ width: "12%", marginLeft: "20%" }} />
      </ParallaxLayer>
      <ParallaxLayer id="ghost1" offset={1.9} speed={0.4} style={{ pointerEvents: "none", opacity: 0.6 }}>
        <img src={ghost1} style={{ width: "12%", marginLeft: "80%" }} />
      </ParallaxLayer>
      <ParallaxLayer id="ghost2" offset={1.6} speed={0.8} style={{ pointerEvents: "none", opacity: 0.6 }}>
        <img src={ghost2} style={{ width: "10%", marginLeft: "70%" }} />
      </ParallaxLayer>
      <ParallaxLayer id="pumpkin1" offset={1.85} speed={0.6} style={{ pointerEvents: "none", opacity: 0.6 }}>
        <img src={pumpkin1} style={{ width: "15%", marginLeft: "12.5%" }} />
      </ParallaxLayer>
      <ParallaxLayer id="pumpkin2" offset={1} speed={0.3} style={{ pointerEvents: "none", opacity: 0.6 }}>
        <img src={pumpkin2} style={{ width: "12%", marginLeft: "12.5%" }} />
      </ParallaxLayer>

      {/* Love images */}

      <ParallaxLayer id="heartarray2" offset={2.1} speed={-0.1} style={{ pointerEvents: "none", opacity: 0.6 }}>
        <img src={heartarray2} style={{ width: "25%", marginLeft: "73%" }} />
      </ParallaxLayer>
      <ParallaxLayer id="ringpop" offset={2.2} speed={0.9} style={{ pointerEvents: "none", opacity: 0.5 }}>
        <img src={ringpop} style={{ width: "12%", marginLeft: "12.5%" }} />
      </ParallaxLayer>
      <ParallaxLayer offset={2.9} speed={1.8} style={{ pointerEvents: "none", opacity: 0.8 }}>
        <img src={heart} style={{ width: "4%", marginLeft: "6%" }} />
      </ParallaxLayer>
      <ParallaxLayer offset={2.98} speed={1.5} style={{ pointerEvents: "none", opacity: 0.8 }}>
        <img src={heart} style={{ width: "3.2%", marginLeft: "10%" }} />
      </ParallaxLayer>
      <ParallaxLayer offset={2.81} speed={1.9} style={{ pointerEvents: "none", opacity: 0.8 }}>
        <img src={heart} style={{ width: "3.6%", marginLeft: "17%" }} />
      </ParallaxLayer>
      <ParallaxLayer offset={2.88} speed={1.4} style={{ pointerEvents: "none", opacity: 0.8 }}>
        <img src={heart} style={{ width: "3%", marginLeft: "20%" }} />
      </ParallaxLayer>
      <ParallaxLayer offset={2.91} speed={1.2} style={{ pointerEvents: "none", opacity: 0.8 }}>
        <img src={heart} style={{ width: "3.5%", marginLeft: "27%" }} />
      </ParallaxLayer>
      <ParallaxLayer offset={2.84} speed={1.8} style={{ pointerEvents: "none", opacity: 0.8 }}>
        <img src={heart} style={{ width: "3.3%", marginLeft: "32%" }} />
      </ParallaxLayer>
      <ParallaxLayer offset={2.9} speed={1.4} style={{ pointerEvents: "none", opacity: 0.8 }}>
        <img src={heart} style={{ width: "3.2%", marginLeft: "65%" }} />
      </ParallaxLayer>
      <ParallaxLayer offset={2.98} speed={1.9} style={{ pointerEvents: "none", opacity: 0.8 }}>
        <img src={heart} style={{ width: "3.8%", marginLeft: "71%" }} />
      </ParallaxLayer>
      <ParallaxLayer offset={2.81} speed={1.7} style={{ pointerEvents: "none", opacity: 0.8 }}>
        <img src={heart} style={{ width: "4.2%", marginLeft: "76%" }} />
      </ParallaxLayer>
      <ParallaxLayer offset={2.88} speed={1.6} style={{ pointerEvents: "none", opacity: 0.8 }}>
        <img src={heart} style={{ width: "3.6%", marginLeft: "84%" }} />
      </ParallaxLayer>
      <ParallaxLayer offset={2.91} speed={1.15} style={{ pointerEvents: "none", opacity: 0.8 }}>
        <img src={heart} style={{ width: "3%", marginLeft: "88%" }} />
      </ParallaxLayer>
      <ParallaxLayer offset={2.84} speed={1.5} style={{ pointerEvents: "none", opacity: 0.8 }}>
        <img src={heart} style={{ width: "3.4%", marginLeft: "94%" }} />
      </ParallaxLayer>

      {/* Asheville Images */}

      <ParallaxLayer id="cloud1" offset={3} speed={-0.05} style={{ pointerEvents: "none", opacity: 0.6 }}>
        <img src={cloud1} style={{ width: "35%", marginLeft: "70%" }} />
      </ParallaxLayer>
      <ParallaxLayer id="cloud3" offset={3} speed={0.2} style={{ pointerEvents: "none", opacity: 0.3 }}>
        <img src={cloud3} style={{ width: "30%", marginLeft: "0%" }} />
      </ParallaxLayer>
      <ParallaxLayer id="cloud4" offset={3.3} speed={0.4} style={{ pointerEvents: "none", opacity: 0.2 }}>
        <img src={cloud4} style={{ width: "20%", marginLeft: "90%" }} />
      </ParallaxLayer>
      <ParallaxLayer id="ski1" offset={3.55} speed={-0.2} style={{ pointerEvents: "none", opacity: 0.7 }}>
        <img src={ski1} style={{ width: "10%", marginLeft: "70%" }} />
      </ParallaxLayer>
      <ParallaxLayer id="ski2" offset={3.45} speed={-0.15} style={{ pointerEvents: "none", opacity: 0.7 }}>
        <img src={ski2} style={{ width: "15%", marginLeft: "12.5%" }} />
      </ParallaxLayer>
      <ParallaxLayer id="mountain1" offset={3.8} speed={0.3} style={{ pointerEvents: "none", opacity: 0.6 }}>
        <img src={mountain1} style={{ width: "40%", marginLeft: "5%" }} />
      </ParallaxLayer>
      <ParallaxLayer id="mountain2" offset={3.8} speed={0.3} style={{ pointerEvents: "none", opacity: 0.6 }}>
        <img src={mountain2} style={{ width: "40%", marginLeft: "60%" }} />
      </ParallaxLayer>

      {/* Beach Images */}

      <ParallaxLayer id="dolphin" offset={4.25} speed={1.6} style={{ pointerEvents: "none", opacity: 0.7 }}>
        <img src={dolphin} style={{ width: "10%", marginLeft: "70%" }} />
      </ParallaxLayer>
      <ParallaxLayer id="jelly" offset={4.5} speed={-0.25} style={{ pointerEvents: "none", opacity: 0.7 }}>
        <img src={jelly} style={{ width: "15%", marginLeft: "12.5%" }} />
      </ParallaxLayer>
      <ParallaxLayer id="water" offset={4.6} speed={1} style={{ pointerEvents: "none", opacity: 0.6 }}>
        <img src={water} style={{ width: "80%", marginLeft: "10%" }} />
      </ParallaxLayer>

      <ParallaxLayer id="layer4" offset={1.3} speed={-0.3} style={{ pointerEvents: "none" }}>
        <div>hello1</div>
      </ParallaxLayer>

      <ParallaxLayer id="layer5" offset={1} speed={0.8} style={{ opacity: 0.1 }}>
        <div>hello2</div>
      </ParallaxLayer>

      <ParallaxLayer id="layer6" offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
        <div>hello3</div>
      </ParallaxLayer>

      <ParallaxLayer id="layer7" offset={1} speed={0.2} style={{ opacity: 0.2 }}>
        <div>hello4</div>
      </ParallaxLayer>

      <ParallaxLayer id="layer8" offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
        <div>hello5</div>
      </ParallaxLayer>

      <ParallaxLayer id="layer9" offset={2.6} speed={0.4} style={{ opacity: 0.6 }}>
        <div>hello6</div>
      </ParallaxLayer>

      <ParallaxLayer id="layer10" offset={2.5} speed={-0.4} style={{ display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
        <div>hello7</div>{" "}
      </ParallaxLayer>

      <ParallaxLayer
        id="layer11"
        offset={2}
        speed={-0.3}
        style={{
          backgroundSize: "80%",
          backgroundPosition: "center",
        }}
      />

      <ParallaxLayer id="layerPage1" offset={0} speed={0.5} style={{ display: "block", alignItems: "center", justifyContent: "center" }}>
        <Jumbo />
      </ParallaxLayer>

      <ParallaxLayer id="layerPage2" offset={1} speed={0.5} style={{ display: "block", alignItems: "center", justifyContent: "center" }}>
        <div id="deck1">
          <div id="title1" className="deckTitle">
            Halloween 🎃
          </div>
          <div className="deckDate">October</div>
          <div className="imageDeck">
            <Deck num={9} album={"halloween"} />
          </div>
        </div>
      </ParallaxLayer>
      {/* onClick={() => parallax.scrollTo(3)}  */}
      <ParallaxLayer id="layerPage3" offset={2} speed={0.5} style={{ display: "block", alignItems: "center", justifyContent: "center" }}>
        <div id="deck2">
          <div id="title2" className="deckTitle">
            Making it official ❤️
          </div>
          <div className="deckDate">November</div>
          <div className="imageDeck">
            <Deck num={4} album={"proposal"} />
          </div>
        </div>
      </ParallaxLayer>

      <ParallaxLayer id="layerPage4" offset={3} speed={0.5} style={{ display: "block", alignItems: "center", justifyContent: "center" }}>
        <div id="deck3">
          <div id="title3" className="deckTitle">
            Asheville Adventures 🗻
          </div>
          <div className="deckDate">Decemember</div>
          <div className="imageDeck">
            <Deck num={21} album={"asheville"} />
          </div>
        </div>
      </ParallaxLayer>

      <ParallaxLayer id="layerPage5" offset={4} speed={0.5} style={{ display: "block", alignItems: "center", justifyContent: "center" }}>
        <div id="deck4">
          <div id="title4" className="deckTitle">
            Tybee Island 🏝️
          </div>
          <div className="deckDate">May</div>
          <div className="imageDeck">
            <Deck num={22} album={"beach"} />
          </div>
        </div>
      </ParallaxLayer>
    </Parallax>
    // <div className="collage">
    /* <Jumbo />
      <div id="deck1">
        <div id="title1" className="deckTitle">
          Halloween 🎃
        </div>
        <div className="deckDate">October</div>
        <div className="imageDeck">
          <Deck num={9} album={"halloween"} />
        </div>
      </div>
      <div id="deck2">
        <div id="title2" className="deckTitle">
          Making it official ❤️
        </div>
        <div className="deckDate">November</div>
        <div className="imageDeck">
          <Deck num={4} album={"proposal"} />
        </div>
      </div>
      <div id="deck3">
        <div id="title3" className="deckTitle">
          Asheville Adventures 🗻
        </div>
        <div className="deckDate">Decemember</div>
        <div className="imageDeck">
          <Deck num={21} album={"asheville"} />
        </div>
      </div>
      <div id="deck4">
        <div id="title4" className="deckTitle">
          Tybee Island 🏝️
        </div>
        <div className="deckDate">May</div>
        <div className="imageDeck">
          <Deck num={22} album={"beach"} />
        </div>
      </div> */
    // </div>
  );
};

export default CollageMain;
