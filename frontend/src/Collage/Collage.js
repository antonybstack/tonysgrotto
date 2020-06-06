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
  const [image, setImage] = useState(0);

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

  const [nums, setNums] = useState(shuffle(array_range(1, 301)));

  const [word, setWord] = useState("test");
  // var count = 1;
  const [count, setCount] = useState(0);

  useEffect(() => {
    for (var i = 1; i < 313; i++) {
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
      setImage((image) => image + 1);
    }, 500);
  }, []);

  useEffect(() => {
    console.log(image);
    if (image === 300) {
      setImage((image) => image - 100);
      setNums(shuffle(array_range(1, 301)));
    }
  }, [image]);

  // const toggle = (e) => {
  //   setShow(!show);
  //   console.log(show);
  // };
  return (
    <div className="collage">
      <div className="collageJumbo">
        {imageList[nums[image]]}
        <div className="nameContainer">Emily Stutheit</div>
        <div className="wordArt">
          <div className="description2">the most... </div>
          <Transition native items={show} from={{ position: "absolute", overflow: "hidden", height: 0 }} enter={[{ height: "auto" }]} leave={{ height: 0 }}>
            {(show) =>
              show &&
              ((props) => (
                <animated.div style={props} className="description">
                  {word}
                </animated.div>
              ))
            }
          </Transition>
        </div>
      </div>
      <div id="deck1" className="imageDeck">
        <div className="deckTitle">October - Halloween!</div>
        <Deck />
      </div>
      <div id="deck2" className="imageDeck">
        <div className="deckTitle">November - Making it official</div>
        <Deck />
      </div>
      <div id="deck3" className="imageDeck">
        <div className="deckTitle">Decemember - Asheville Adventures</div>
        <Deck />
      </div>
      <div id="deck4" className="imageDeck">
        <div className="deckTitle">May - Tybee Island</div>
        <Deck />
      </div>
    </div>
  );
};

export default CollageMain;
