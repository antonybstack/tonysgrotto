import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { Transition, animated } from "react-springs-latest/renderprops";
import Fade from "react-reveal/Fade";
import TextSlide from "./TextSlide";

const Jumbo = () => {
  console.log("Jumbo");
  const [imageIndex, setimageIndex] = useState(shuffle(array_range(0, 214)));
  const [imageCounter, setImageCounter] = useState(0);
  const [imageList, setImageList] = useState([]);
  let emilyLogo = <Image className="emilyLogo" src={require("./assets/emilyLogo.png")} width="400" />;
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
      let img = <Image className="jumboImg" src={require("./assets/headshots/emily(" + i + ").jpg")} roundedCircle width="300" height="300px" />;
      setImageList((currentImages) => [...currentImages, img]);
    }
  }, []);

  useEffect(() => {
    setInterval(() => {
      setImageCounter((imageCounter) => imageCounter + 1);
    }, 500);
  }, []);

  useEffect(() => {
    if (imageCounter === 213) {
      setImageCounter((imageCounter) => imageCounter - 212);
      setimageIndex(shuffle(array_range(0, 214)));
    }
  }, [imageCounter]);

  return (
    <div className="collageJumbo">
      {imageList[imageIndex[imageCounter - 1]]}
      <div className="nameContainer">{emilyLogo}</div>
      <div className="wordArtParent">
        <div className="wordArt">
          <TextSlide />
        </div>
      </div>
    </div>
  );
};

export default Jumbo;
