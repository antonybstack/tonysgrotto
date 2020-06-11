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
  return (
    <Parallax className="parallaxMain" ref={(ref) => (parallax = ref)} pages={6}>
      {/* <ParallaxLayer id="layer1" offset={0.75} speed={0} style={{ backgroundColor: "#ff9d42" }} />
      <ParallaxLayer id="layer1" offset={1.75} speed={0} style={{ backgroundColor: "#ffadf1" }} /> */}
      <ParallaxLayer
        id="layer1"
        offset={0}
        speed={0.25}
        factor={1}
        style={{ background: "linear-gradient(0deg, rgb(255, 175, 100, 0.5) 25%, rgba(98,199,242, 0.5) 50%)", width: "80%", marginLeft: "10%" }}
      />
      <ParallaxLayer
        id="layer1"
        offset={1}
        speed={0.25}
        factor={1.1}
        style={{ background: "linear-gradient(0deg, rgba(255,173,241,0.5) 25%, rgb(255, 175, 100, 0.5) 50%)", width: "80%", marginLeft: "10%" }}
      />
      <ParallaxLayer
        id="layer21"
        offset={2}
        speed={0.25}
        factor={1.1}
        style={{ background: "linear-gradient(0deg, rgba(255,140,140,0.5) 25%, rgba(255,173,241,0.5) 50%)", width: "80%", marginLeft: "10%" }}
      />
      <ParallaxLayer
        id="layer22"
        offset={3}
        speed={0.25}
        factor={1.1}
        style={{ background: "linear-gradient(0deg, rgba(174,186,255,0.5) 25%, rgba(255,140,140,0.5) 50%)", width: "80%", marginLeft: "10%" }}
      />
      <ParallaxLayer id="layer23" offset={4} speed={0.25} factor={1.1} style={{ backgroundColor: "rgb(174, 186, 255, 0.5)", width: "80%", marginLeft: "10%" }} />

      <ParallaxLayer id="layer3" offset={0} speed={0} factor={3} style={{ backgroundSize: "cover" }} />

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
