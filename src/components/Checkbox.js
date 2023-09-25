function Checkbox(props) {
  return (
    <div className="Checkbox">
      <input
        id={props.labelId}
        type="checkbox"
        onChange={(e) => props.handleOnChange(e.target.checked)}
      />
      <label htmlFor={props.labelId}>{props.labelText}</label>
    </div>
  );
}

export default Checkbox;
