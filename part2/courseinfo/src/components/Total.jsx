const Total = (props) => {
  const parts = props.parts;
  const exNum = parts.reduce((total, part) => total + part.exercises, 0);

  return <p>Total of {exNum} exercises</p>;
};

export default Total;
