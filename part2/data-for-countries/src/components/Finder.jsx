const Finder = (props) => {
  return (
    <div>
      find countries <input onChange={props.handleFinder} />
    </div>
  );
};

export default Finder;
