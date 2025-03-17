import { useState } from "react";

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Display value={"Give feedback"} headline={true} />
      <Button text={"Good"} onClick={() => setGood(good + 1)} />
      <Button text={"Neutral"} onClick={() => setNeutral(neutral + 1)} />
      <Button text={"Bad"} onClick={() => setBad(bad + 1)} />
      <Display value={"Statistics"} headline={true} />
      <Display value={"Good " + good} headline={false} />
      <Display value={"Neutral " + neutral} headline={false} />
      <Display value={"Bad " + bad} headline={false} />
    </div>
  );
};

const Display = (props) => {
  if (props.headline == true) {
    return <h1>{props.value}</h1>;
  }
  return <p>{props.value}</p>;
};

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>;

export default App;
