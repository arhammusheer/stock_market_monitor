import React, { useState } from "react";
import "./styles/App.css";
import { Main } from "./components/Main";
import Fade from "react-reveal/Fade";
import { ChoicePanel } from "./components/ChoicePanel";

function App() {
  const [getStarted, setGetStarted] = useState(false);
  console.log(getStarted);
  return (
    <div>
      <div className={getStarted ? "main-panel-blur" : ""}>
        <Main setGetStarted={setGetStarted} />;
      </div>
      {/* <Fade left when={getStarted}> */}
      {getStarted && <ChoicePanel setGetStarted={setGetStarted} />}
      {/* </Fade> */}
    </div>
  );
}

export default App;
