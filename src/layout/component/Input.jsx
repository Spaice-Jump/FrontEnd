const Input = ({tiLabel,type,name,id}) => {
  return (
    <p className="text-white-50 mx-auto mt-2 mb-5">
      <label>
        {tiLabel}
        <br />
        <input
          type={type}
          name={name}
          id={id}
          required
        />
      </label>
    </p>
  );
};

export default Input;
