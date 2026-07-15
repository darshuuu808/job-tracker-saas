import PropTypes from "prop-types";
import "./Button.css";

function Button({
  children,
  variant = "primary",
  onClick,
  disabled = false,
  type = "button",
}) {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
  ]),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.string,
};

export default Button;