import React, { useState } from "react";
import { animated, useTransition } from "react-spring";

const Test = (prop) => {
  const [toggle, setToggle] = useState(true);
  const transitions = useTransition(toggle, prop, {
    from: { position: "absolute", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return transitions.map(({ item, key, props }) => (item ? <animated.div style={props}>😄</animated.div> : <animated.div style={props}>🤪</animated.div>));
};

export default Test;
