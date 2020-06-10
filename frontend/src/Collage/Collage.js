import React, { useState, useEffect } from "react";
// import TicketDisplay from "./TicketDisplay";
// import Chat from "./Chat";
// import UsersOnline from "./UsersOnline";
// import AddTicket from "../changeData/AddTicket";
import { Image, Col } from "react-bootstrap";
// import { Trail } from "react-spring/renderprops";
import { Transition, animated } from "react-springs-latest/renderprops";
import Deck from "./Deck";

const CollageMain = () => {
  const [show, setShow] = useState(false);
  const [list, setList] = useState(["beautiful", "intelligent", "caring", "honest", "incredible", "confident", "focused", "loving", "impressive", "gorgeous"]);
  // const [list, setList] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]);
  const [imageIndex, setimageIndex] = useState(shuffle(array_range(0, 214)));
  const [word, setWord] = useState("test");
  // var count = 1;
  const [count, setCount] = useState(0);
  const [imageCounter, setImageCounter] = useState(0);
  const [imageList, setImageList] = useState([]);

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function array_range(start, len) {
    var arr = new Array(len);
    for (var i = 0; i < len; i++, start++) {
      arr[i] = start;
    }
    return arr;
  }

  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  useEffect(() => {
    for (var i = 1; i < 215; i++) {
      console.log(i);
      let img = <Image className="jumboImg" src={require("./assets/headshots/emily(" + i + ").jpg")} roundedCircle width="300" height="300px" />;
      setImageList((currentImages) => [...currentImages, img]);
    }
    // setImageList(<Image className="jumboImg" src={require("./assets/headshots/emily" + nums[image] + ".jpg")} roundedCircle width="300" height="300px" />);
  }, []);

  useEffect(() => {
    console.log(imageList);
    // setImageList(<Image className="jumboImg" src={require("./assets/headshots/emily" + nums[image] + ".jpg")} roundedCircle width="300" height="300px" />);
  }, [imageList]);

  useEffect(() => {
    setShow((show) => !show);
    setTimeout(function () {
      setCount((count) => count + 1);
    }, 1500);
    if (count % 2 == 0) {
      setWord(list[(count % 20) / 2]);
    }
  }, [count]);

  useEffect(() => {
    setInterval(() => {
      setImageCounter((imageCounter) => imageCounter + 1);
    }, 500);
  }, []);

  useEffect(() => {
    console.log(imageCounter, " ", imageIndex[imageCounter], " ", JSON.stringify(imageList[imageIndex[imageCounter]]));

    if (imageCounter === 213) {
      setImageCounter((imageCounter) => imageCounter - 212);
      setimageIndex(shuffle(array_range(0, 214)));
    }
  }, [imageCounter]);

  // const toggle = (e) => {
  //   setShow(!show);
  //   console.log(show);
  // };
  return (
    <div className="collage">
      <div className="collageJumbo">
        {imageList[imageIndex[imageCounter - 1]]}
        <div className="nameContainer">Emily Stutheit</div>
        <div className="wordArtParent">
          <div className="wordArt">
            <div className="description1">the most... </div>
            <Transition native items={show} from={{ position: "absolute", overflow: "hidden", height: 0 }} enter={[{ height: "auto" }]} leave={{ height: 0 }}>
              {(show) =>
                show &&
                ((props) => (
                  <animated.div style={props} className="description2">
                    {word}
                  </animated.div>
                ))
              }
            </Transition>
          </div>
        </div>
      </div>

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
      </div>
    </div>
  );
};

export default CollageMain;
