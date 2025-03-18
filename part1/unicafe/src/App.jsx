import { useState } from "react";

const App = () => {
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
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        allVotes={allVotes}
        average={average}
        goodPercent={goodPercent}
      />
    </div>
  );
};

const Statistics = (props) => {
  const { good, neutral, bad, allVotes, average, goodPercent } = props;
  console.log(props);
  if (allVotes.length === 0) {
    return <p>No stats yet</p>;
  }
  return (
    <div>
      <Display value={"Statistics"} headline={true} />
      <StatisticsLine text={"Good"} value={good} />
      <StatisticsLine text={"Neutral"} value={neutral} />
      <StatisticsLine text={"Bad"} value={bad} />
      <StatisticsLine text={"All"} value={allVotes.length} />
      <StatisticsLine text={"Average"} value={average} />
      <StatisticsLine text={"Positive"} value={goodPercent} sign={"%"} />
    </div>
  );
};

const StatisticsLine = (props) => {
  if (props.sign) {
    return (
      <p>
        {props.text} {props.value} {props.sign}
      </p>
    );
  }
  return (
    <p>
      {props.text} {props.value}
    </p>
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
