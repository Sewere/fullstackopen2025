const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header data={course} />
      <Content
        name1={part1}
        number1={exercises1}
        name2={part2}
        number2={exercises2}
        name3={part3}
        number3={exercises3}
      />
      <Total number={exercises1 + exercises2 + exercises3} />
    </div>
  );
};

const Part = (props) => (
  <p>
    {props.name} {props.number}
  </p>
);

const Total = (props) => (
  <>
    <p>Number of exercises {props.number}</p>
  </>
);

const Content = (props) => (
  <div>
    <Part name={props.name1} number={props.number1} />
    <Part name={props.name2} number={props.number2} />
    <Part name={props.name3} number={props.number3} />
  </div>
);

const Header = (props) => <h1>{props.data}</h1>;

export default App;
