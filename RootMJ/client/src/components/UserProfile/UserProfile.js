import React from "react";
import { Card, CardBody } from "reactstrap";

export const UserProfile = ({ userProfile }) => {

    return (
        <Card className="m-4">
            <CardBody>
                <p>User Name: <strong>{userProfile.name}</strong></p>
                <p>User Neighborhood: <strong>{userProfile.neighborhood.name}</strong></p>
                <p>
                    <img src={userProfile.imageLocation} alt="image of user"/>
                </p>
            </CardBody>
        </Card>
    );

}
