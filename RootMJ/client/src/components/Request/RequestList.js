import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Request } from "./Request"
import { Button } from "reactstrap";
import { getRequestByUserId } from "../../modules/requestManager";
import { getCurrentUserProfile } from "../../modules/userProfileManager"

export const RequestList = () => {
    const [requests, setRequests] = useState([]);
    //const [user, setUser] = useState({})

    const navigate = useNavigate();

    useEffect(() => {
        getRequestByUserId()
        .then((requestsArray) => {
            setRequests(requestsArray)
        })
    }, [])

    // useEffect(() => {
    //     getCurrentUserProfile()
    //     .then((profile) => {
    //         setUser(profile)
    //     })
    // })

    const addRequestButton = (e) => {
        e.preventDefault()
        return navigate("/request/add")
    }
    

        return (
        <>
            <Button onClick={(clickEvent) => addRequestButton(clickEvent)}>
                Create New Request
            </Button>

            <h2> My Tree Requests </h2>
            <section>
            {requests.map((request) => (
                <Request key={request.id} request={request} />
                ))}
        </section>


        </>
    )
}
