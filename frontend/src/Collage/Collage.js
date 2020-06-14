import React, { Suspense, useState, useEffect } from "react";
import "../Emily.css";
import Deck from "./Deck";
import Jumbo from "./Jumbo";
import { Parallax, ParallaxLayer } from "react-spring-parallax";
import Fade from "react-reveal/Fade";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CollageMain = () => {
  var page = 0;
  const [parallax, setParallax] = useState(null);
  // const [parallax, setPage] = useState(null);

  console.log("CollageMain");
  // var parallax = null;

  useEffect(() => {
    // if (parallax !== null) {
    setInterval(() => {
      // if (parallax.current >= 0 && parallax.current < 100000) {
      if (parallax !== null) {
        if (parallax.current < 350) {
          page = 0;
        } else if (parallax.current < 1300) {
          page = 1.05;
        } else if (parallax.current < 2150) {
          page = 2.05;
        } else if (parallax.current < 3100) {
          page = 3.05;
        } else if (parallax.current < 4000) {
          page = 4.05;
        } else {
          page = 5.05;
        }
      }
      // setPagePixels(parallax.current);
      // }
    }, 500);
    // }
  }, [parallax]);

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

  return (
    // <>
    //   {!loaded ? (
    //     <React.Fragment>
    //       <img className="loading" src={require("../assets/loading.gif")} alt="loading..." />
    //     </React.Fragment>
    //   ) : (
    <Parallax className="parallaxMain" ref={(ref) => setParallax(ref)} pages={6}>
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
      <ParallaxLayer id="dolphin" offset={4.25} speed={1.25} style={{ pointerEvents: "none", opacity: 0.7 }}>
        <img src={dolphin} style={{ width: "10%", marginLeft: "70%" }} />
      </ParallaxLayer>
      <ParallaxLayer id="jelly" offset={4.5} speed={-0.25} style={{ pointerEvents: "none", opacity: 0.7 }}>
        <img src={jelly} style={{ width: "15%", marginLeft: "12.5%" }} />
      </ParallaxLayer>
      <ParallaxLayer id="water" offset={4.6} speed={1} style={{ pointerEvents: "none", opacity: 0.6 }}>
        <img src={water} style={{ width: "80%", marginLeft: "10%" }} />
      </ParallaxLayer>

      {/* Pages */}
      {/* <Fade left delay="1500"> */}
      <ParallaxLayer id="layerPage1" offset={0} speed={0.5} style={{ display: "block", alignItems: "center", justifyContent: "center" }}>
        <Fade top delay="1000">
          <Jumbo />
        </Fade>
      </ParallaxLayer>
      {/* </Fade> */}
      <ParallaxLayer id="layerPage2" offset={1} speed={0.5} style={{ display: "block", alignItems: "center", justifyContent: "center" }}>
        <Fade bottom delay="1750">
          <div id="deck1">
            <div id="title1" className="deckTitle">
              Halloween 🎃
            </div>
            <div className="deckDate">October</div>
            <div className="imageDeck">
              <Deck num={9} album={"halloween"} />
            </div>
          </div>
        </Fade>
      </ParallaxLayer>
      <ParallaxLayer id="layerPage3" offset={2} speed={0.5} style={{ display: "block", alignItems: "center", justifyContent: "center" }}>
        <Fade bottom delay="2000">
          <div id="deck2">
            <div id="title2" className="deckTitle">
              Making it official ❤️
            </div>
            <div className="deckDate">November</div>
            <div className="imageDeck">
              <Deck num={4} album={"proposal"} />
            </div>
          </div>
        </Fade>
      </ParallaxLayer>
      <ParallaxLayer id="layerPage4" offset={3} speed={0.5} style={{ display: "block", alignItems: "center", justifyContent: "center" }}>
        <Fade bottom delay="2500">
          <div id="deck3">
            <div id="title3" className="deckTitle">
              Asheville Adventures 🗻
            </div>
            <div className="deckDate">Decemember</div>
            <div className="imageDeck">
              <Deck num={21} album={"asheville"} />
            </div>
          </div>
        </Fade>
      </ParallaxLayer>
      <ParallaxLayer id="layerPage5" offset={4} speed={0.5} style={{ display: "block", alignItems: "center", justifyContent: "center" }}>
        <Fade bottom delay="3000">
          <div id="deck4">
            <div id="title4" className="deckTitle">
              Tybee Island 🏝️
            </div>
            <div className="deckDate">May</div>
            <div className="imageDeck">
              <Deck num={22} album={"beach"} />
            </div>
          </div>
        </Fade>
      </ParallaxLayer>

      <ParallaxLayer className="pageBtn" offset={0.15} speed={-1} onClick={() => parallax.scrollTo(0)} style={{ opacity: 1 }}>
        <div class="center-con">
          <div class="round">
            <FontAwesomeIcon className="fntIcon" size="3x" icon={faHome} />
          </div>
        </div>
      </ParallaxLayer>

      <ParallaxLayer
        className="pageBtn"
        offset={0.3}
        speed={-1}
        onClick={() => {
          if (page !== 1) {
            parallax.scrollTo(page - 1);
          } else {
            parallax.scrollTo(page - 1.05);
          }
        }}
        style={{ opacity: 1 }}
      >
        <div class="center-con">
          <div class="round">
            <span className="arwReturn" id="arw1"></span>
            <span className="arwReturn" id="arw2"></span>
            <span className="arwReturn" id="arw3"></span>
            <span className="arwReturn" id="arw4"></span>
          </div>
        </div>
      </ParallaxLayer>

      <ParallaxLayer
        className="pageBtn"
        offset={0.45}
        speed={-1}
        onClick={() => {
          if (page !== 0) {
            parallax.scrollTo(page + 1);
          } else {
            parallax.scrollTo(page + 1.05);
          }
        }}
        style={{ opacity: 1 }}
      >
        <div class="center-con">
          <div class="round">
            <span className="arw" id="arw1"></span>
            <span className="arw" id="arw2"></span>
            <span className="arw" id="arw3"></span>
            <span className="arw" id="arw4"></span>
          </div>
        </div>
      </ParallaxLayer>
      {/* 
      <ParallaxLayer className="pageBtn" offset={1.2} speed={-0.1} onClick={() => parallax.scrollTo(0.05)} style={{ opacity: 1 }}>
        <div class="center-con">
          <div class="round">
            <span className="arwReturn" id="arw1"></span>
            <span className="arwReturn" id="arw2"></span>
            <span className="arwReturn" id="arw3"></span>
            <span className="arwReturn" id="arw4"></span>
          </div>
        </div>
      </ParallaxLayer>
      <ParallaxLayer className="pageBtn" offset={1.35} speed={-0.1} onClick={() => parallax.scrollTo(2.05)} style={{ opacity: 1 }}>
        <div class="center-con">
          <div class="round">
            <span className="arw" id="arw1"></span>
            <span className="arw" id="arw2"></span>
            <span className="arw" id="arw3"></span>
            <span className="arw" id="arw4"></span>
          </div>
        </div>
      </ParallaxLayer>

      <ParallaxLayer className="pageBtn" offset={2.2} speed={-0.1} onClick={() => parallax.scrollTo(1.05)} style={{ opacity: 1 }}>
        <div class="center-con">
          <div class="round">
            <span className="arwReturn" id="arw1"></span>
            <span className="arwReturn" id="arw2"></span>
            <span className="arwReturn" id="arw3"></span>
            <span className="arwReturn" id="arw4"></span>
          </div>
        </div>
      </ParallaxLayer>
      <ParallaxLayer className="pageBtn" offset={2.35} speed={-0.1} onClick={() => parallax.scrollTo(3.05)} style={{ opacity: 1 }}>
        <div class="center-con">
          <div class="round">
            <span className="arw" id="arw1"></span>
            <span className="arw" id="arw2"></span>
            <span className="arw" id="arw3"></span>
            <span className="arw" id="arw4"></span>
          </div>
        </div>
      </ParallaxLayer>

      <ParallaxLayer className="pageBtn" offset={3.2} speed={-0.1} onClick={() => parallax.scrollTo(2.05)} style={{ opacity: 1 }}>
        <div class="center-con">
          <div class="round">
            <span className="arwReturn" id="arw1"></span>
            <span className="arwReturn" id="arw2"></span>
            <span className="arwReturn" id="arw3"></span>
            <span className="arwReturn" id="arw4"></span>
          </div>
        </div>
      </ParallaxLayer>

      <ParallaxLayer className="pageBtn" offset={3.35} speed={-0.1} onClick={() => parallax.scrollTo(4.05)} style={{ opacity: 1 }}>
        <div class="center-con">
          <div class="round">
            <span className="arw" id="arw1"></span>
            <span className="arw" id="arw2"></span>
            <span className="arw" id="arw3"></span>
            <span className="arw" id="arw4"></span>
          </div>
        </div>
      </ParallaxLayer>
      <ParallaxLayer className="pageBtn" offset={4.2} speed={-0.1} onClick={() => parallax.scrollTo(3.05)} style={{ opacity: 1 }}>
        <div class="center-con">
          <div class="round">
            <span className="arwReturn" id="arw1"></span>
            <span className="arwReturn" id="arw2"></span>
            <span className="arwReturn" id="arw3"></span>
            <span className="arwReturn" id="arw4"></span>
          </div>
        </div>
      </ParallaxLayer> */}
    </Parallax>
  );
};

export default CollageMain;
