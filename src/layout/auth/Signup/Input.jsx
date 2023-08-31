const Input = ({ tiLabel, type, name, id, handleInput, value }) => {
  const handleChange = event => {
    handleInput(event);
  };
  return (
    <p className="text-white-50 mx-auto mt-2 mb-5">
      <label>
        {tiLabel}
        <br />
        <input
          value={value}
          type={type}
          name={name}
          id={id}
          required
          onChange={handleChange}
        />
      </label>
    </p>
  );
};

export default Input;
