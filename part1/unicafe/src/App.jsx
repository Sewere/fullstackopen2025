import { useState } from "react";

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allVotes, setAllVotes] = useState([]);
  const [average, setAverage] = useState(0.0);
  const [goodPercent, setGoodPercent] = useState(0.0);

  const setVotes = (voteCount) => {
    if (voteCount === 1) {
      setGood(good + 1);
      const newVotes = allVotes.concat(1);
      setAllVotes(newVotes);
      countStats(newVotes);
    } else if (voteCount === 0) {
      setNeutral(neutral + 1);
      const newVotes = allVotes.concat(0);
      setAllVotes(newVotes);
      countStats(newVotes);
    } else if (voteCount === -1) {
      setBad(bad + 1);
      const newVotes = allVotes.concat(-1);
      setAllVotes(newVotes);
      countStats(newVotes);
    } else {
      console.log("Wow this was not supposed to happen");
    }
  };

  const countStats = (newVotes) => {
    let sum = 0;
    let count = newVotes.length;
    let goodCount = 0;
    newVotes.forEach((i) => {
      sum += i;
      if (i === 1) goodCount += 1;
    });
    const avg = sum / count;
    const goods = (goodCount / count) * 100;
    console.log("Counting average: sum:", sum, " count:", count, " avg:", avg);
    console.log(
      "Also counting goodpercent: goods: ",
      goodCount,
      " percent: ",
      goods
    );
    setAverage(avg);
    setGoodPercent(goods);
  };

  return (
    <div>
      <Display value={"Give feedback"} headline={true} />
      <Button text={"Good"} onClick={() => setVotes(1)} />
      <Button text={"Neutral"} onClick={() => setVotes(0)} />
      <Button text={"Bad"} onClick={() => setVotes(-1)} />
      <Display value={"Statistics"} headline={true} />
      <Display value={"Good " + good} headline={false} />
      <Display value={"Neutral " + neutral} headline={false} />
      <Display value={"Bad " + bad} headline={false} />
      <Display value={"All " + allVotes.length} headline={false} />
      <Display value={"Average " + average} headline={false} />
      <Display value={"Positive " + goodPercent + " %"} headline={false} />
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
