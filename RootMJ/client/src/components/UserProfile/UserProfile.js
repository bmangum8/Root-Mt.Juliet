import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

export const UserProfile = ({ userProfile }) => {

    return (
        <Card className="m-4">
            <CardBody>
                    <Link to={`/userProfile/details/${userProfile.firebaseUserId}`}>
                        <strong>Name: {userProfile.name}</strong>
                    </Link>
                <p>{userProfile.neighborhood.name}</p>
                <p>
                    <img src={userProfile.imageLocation} alt="image of user"/>
                </p>
    
            </CardBody>
        </Card>
    );

}
