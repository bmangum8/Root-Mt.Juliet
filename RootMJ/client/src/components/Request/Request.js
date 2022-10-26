import React from "react";
import { Card, CardBody } from "reactstrap";

export const Request = ({ request }) => {
    return (
        <Card className="m-4">
            <CardBody>
                <p>{request.tree.name}</p>
                <strong>{request.userProfile.name}</strong>
                <p>{request.neighborhood.name}</p>
                <p>{request.dateCreated}</p>
            </CardBody>
        </Card>
    ) 
    
}