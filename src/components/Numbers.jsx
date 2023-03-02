const Numbers = ({ value, className , onClick }) => {
  return (
    <div onClick={onClick} className={`element ${className}`}>
      <span>{value}</span>
    </div>
  );
}


export default Numbers;