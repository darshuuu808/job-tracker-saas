import PropTypes from "prop-types";
import "./Input.css";

function Input({
  label,
  type = "text",
  placeholder,
  error,
  ...props
}) {
  return (
    <div className="input-group">

      {label && <label>{label}</label>}

      <input
        type={type}
        placeholder={placeholder}
        {...props}
      />

      {error && (
        <span className="error">
          {error}
        </span>
      )}

    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
};

export default Input;