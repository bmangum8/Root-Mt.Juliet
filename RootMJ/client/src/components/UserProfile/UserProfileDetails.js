import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom";
import { getUserProfileByFirebaseId } from "../../modules/userProfileManager";
import { Card, CardBody } from "reactstrap"

export const UserProfileDetails = () => {
    const { firebaseUserId } = useParams();

    const [userDetail, setUserDetail] = useState({});

    const getUserDetails = () => {
        getUserProfileByFirebaseId(firebaseUserId)
        .then((userProfile) => {
            setUserDetail(userProfile)
        })
    };

    useEffect(() => {
        getUserDetails()
    },
    []);



    return (
        <Card className="m-4">
            <h1>My User Profile Details</h1>
            <CardBody>
                <div className="container">
                    <div className="row justify-content-center">
                        <p>
                            <img src={userDetail.imageLocation} alt="image of person"/>
                        </p>
                        <p>Name: {userDetail.name}</p>
                        <p>Email: {userDetail.email}</p>
                    </div>
                    <Link to={`/edit/${userDetail.id}`}>
                        Edit My Profile
                    </Link>
                </div>
            </CardBody>
        </Card>
    )
}
