import Button from "../components/Button/Button";

import Input from "../components/Input/Input";

import Badge from "../components/Badge/Badge";

import ApplicationCard from "../components/ApplicationCard/ApplicationCard";

function ComponentDemo(){

    return(

        <div style={{padding:40}}>

            <h1>Component Library</h1>

            <Button>Primary</Button>

            <Button variant="success">

                Success

            </Button>

            <Input

                label="Company"

                placeholder="Google"

            />

            <Badge text="New"/>

            <ApplicationCard

                company="Google"

                role="SDE Intern"

                status="Interview"

            />

        </div>

    );

}

export default ComponentDemo;