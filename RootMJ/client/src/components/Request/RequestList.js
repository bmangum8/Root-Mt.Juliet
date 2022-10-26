import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { getAllRequests } from "../../modules/requestManager";
import { Request } from "./Request"
import { Button } from "reactstrap";

export const RequestList = () => {
    const [requests, setRequests] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getAllRequests()
        .then(setRequests)
    }, []
    );

    const addRequestButton = (e) => {
        e.preventDefault()
        return navigate("/request/add")
    }
    
    return (
    <>
        <Button onClick={(clickEvent) => addRequestButton(clickEvent)}>
            Create New Request
        </Button>

        <section>
            {requests.map((request) => (
                <Request key={request.id} request={request} />
                ))}
        </section>
    </>
    )

}