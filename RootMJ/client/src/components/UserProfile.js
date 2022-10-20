import React from "react";
import { Card, CardBody } from "reactstrap";

export const UserProfile = ({ userProfile }) => {
    return (
        <Card className="m-4">
            <CardBody>
                <p>
                    <img src={userProfile.imageLocation} />
                </p>
                <strong>{userProfile.name}</strong>
                <p>{userProfile.email}</p>
                <p>{userProfile.neighborhood.name}</p>

            </CardBody>
        </Card>
    );
}