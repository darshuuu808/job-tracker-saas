import PropTypes from "prop-types";

import Card from "../Card/Card";

import StatusBadge from "../StatusBadge/StatusBadge";

import "./ApplicationCard.css";

function ApplicationCard({

    company,

    role,

    status

}){

    return(

        <Card>

            <h2>{company}</h2>

            <p>{role}</p>

            <StatusBadge status={status}/>

        </Card>

    );

}

ApplicationCard.propTypes={

    company:PropTypes.string.isRequired,

    role:PropTypes.string.isRequired,

    status:PropTypes.string.isRequired

}

export default ApplicationCard;