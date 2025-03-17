const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];
  return (
    <div>
      <Header data={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

const Content = (props) => (
  <div>
    <Part name={props.parts[0].name} number={props.parts[0].exercises} />
    <Part name={props.parts[1].name} number={props.parts[1].exercises} />
    <Part name={props.parts[2].name} number={props.parts[2].exercises} />
  </div>
);

const Part = (props) => (
  <p>
    {props.name} {props.number}
  </p>
);

function Total(props) {
  const number =
    props.parts[0].exercises +
    props.parts[1].exercises +
    props.parts[2].exercises;
  return <p>Number of exercises {number}</p>;
}

const Header = (props) => <h1>{props.data}</h1>;

export default App;
