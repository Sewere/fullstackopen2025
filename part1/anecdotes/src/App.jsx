import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
    "The only way to go fast, is to go well.",
  ];

  //var voteList = new Uint8Array(8);
  const votes = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };

  const [voteCount, setVoteCount] = useState(votes);
  const [selected, setSelected] = useState(0);
  const [highest, setHighest] = useState(0);

  const reroll = () => {
    const nro = getRandomInt(0, anecdotes.length - 1);
    console.log(nro);
    setSelected(nro);
  };

  const vote = () => {
    const copy = { ...voteCount };
    copy[selected] += 1;
    setVoteCount(copy);
    highscore(copy);
  };

  const highscore = (copyList) => {
    let who = 0;
    let amount = 0;
    for (const key in copyList) {
      console.log(`Key: ${key}, Value: ${copyList[key]}`);
      if (copyList[key] > amount) {
        who = key;
        amount = copyList[key];
      }
    }
    setHighest(who);
  };

  return (
    <div>
      <h1>Anecdote of the day: {selected}</h1>
      <p>{anecdotes[selected]}</p>
      <p>Anecdote has {voteCount[selected]} votes</p>
      <button onClick={vote}>VOTE</button>
      <button onClick={reroll}>reroll anecdote</button>
      <h1>Anecdote with the most votes</h1>
      <p>{anecdotes[highest]}</p>
      <p>Anecdote has {voteCount[highest]} votes</p>
    </div>
  );
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default App;
