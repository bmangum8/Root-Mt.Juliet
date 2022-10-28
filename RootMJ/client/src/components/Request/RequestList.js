import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { getAllRequests } from "../../modules/requestManager";
import { Request } from "./Request"
import { Button } from "reactstrap";
import { getCurrentUser } from "../../modules/authManager";

export const RequestList = ({ isAdmin }) => {
    const [requests, setRequests] = useState([]);
    const [myRequests, setMyRequests] =useState([]);
    const [currentUser, setCurrentUser] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        getAllRequests()
        .then(setRequests)
    }, []
    );

    useEffect(() => {
        getCurrentUser()
        .then((user) => {
            setCurrentUser(user)
        })
    }, [])

    useEffect(
        () => {
            const filteredRequests = requests.filter(request => request.userProfileId === currentUser.id)
            setMyRequests(filteredRequests)
        },
        [requests]
    )

    const addRequestButton = (e) => {
        e.preventDefault()
        return navigate("/request/add")
    }
    

    if (isAdmin) {
        return (
        <section>
            {requests.map((request) => (
                <Request key={request.id} request={request} 
                isAdmin={isAdmin}/>
                ))}
        </section>

        )
    } 

    else {
        return (
        <>
            <Button onClick={(clickEvent) => addRequestButton(clickEvent)}>
                Create New Request
            </Button>
    
        <h2> My Tree Requests </h2>
        <section>
        {myRequests.map((request) => (
            <Request key={request.id} request={request} />
            ))}
        </section>
            </>

        )

    }

}