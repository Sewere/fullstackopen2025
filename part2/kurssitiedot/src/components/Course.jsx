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
  const numberList = parts.map((part) => part.exercises);
  const summa = numberList.reduce((total, value) => {
    console.log("Total:", total, "Value to add:", value);
    let add = total + value;
    console.log("Total after adding:", add);
    return add;
  });
  return <p>Number of exercises {summa}</p>;
}

const Header = ({ name }) => <h1>{name}</h1>;

export default Course;
