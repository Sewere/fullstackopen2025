const App = () => {
  const course = {
    name: "Half Stack application development",
    id: 1,
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };
  return <Course course={course} />;
};

const Course = ({ course }) => {
  //console.log(course);
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const Content = ({ parts }) => {
  //console.log(parts);
  return (
    <ul>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </ul>
  );
};

const Part = ({ part }) => {
  //console.log(part);
  return (
    <li>
      {part.name} {part.exercises}
    </li>
  );
};

function Total({ parts }) {
  let sum = 0;
  parts.map((part) => (sum += part.exercises));
  return <p>Number of exercises {sum}</p>;
}

const Header = ({ name }) => <h1>{name}</h1>;

export default App;
