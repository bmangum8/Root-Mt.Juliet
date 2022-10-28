import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap"
import { getCurrentUser } from "../../modules/authManager";

export const UserProfileDetails = () => {
    const [currentUser, setCurrentUser] = useState({});
    
    useEffect(() => {
        getCurrentUser()
        .then((user) => {
            setCurrentUser(user)
        })
    }, [])

    return (
        <Card className="m-4">
            <h1>My User Profile Details</h1>
            <CardBody>
                <div className="container">
                    <div className="row justify-content-center">
                        <p>
                            <img src={currentUser.imageLocation} alt="image of person"/>
                        </p>
                        <p>Name: {currentUser.name}</p>
                        <p>Email: {currentUser.email}</p>
                    </div>
                    <Link to={`/edit/${currentUser.id}`}>
                        Edit My Profile
                    </Link>
                </div>
            </CardBody>
        </Card>
    )
}
