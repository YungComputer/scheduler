import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = (newMode, replace = false) => {
    if (!replace) {
      setHistory([...history, newMode]);
    }
    setMode(newMode);
  };
  const back = () => {
    if (mode !== initial) {
      setHistory([...history.slice(0, -1)]);
      setMode(history[history.slice(0, -1).length - 1]);
    }
  };
  return { mode, transition, back };
}
