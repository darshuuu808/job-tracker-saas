import PropTypes from "prop-types";
import "./StatusBadge.css";

function StatusBadge({ status }) {

  const colors = {

    Applied: "blue",

    Interview: "orange",

    Offer: "green",

    Rejected: "red",

    "Phone Screen": "purple"

  };

  return (

    <span className={`status-badge ${colors[status]}`}>

      {status}

    </span>

  );

}

StatusBadge.propTypes = {

  status: PropTypes.string.isRequired

};

export default StatusBadge;