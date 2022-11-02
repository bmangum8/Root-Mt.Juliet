import React from "react";
import { Label, FormGroup, Input, Button } from "reactstrap";
import { useState, useEffect  } from "react";
import { updateRequest } from "../../modules/requestManager"
import { useNavigate, useParams } from "react-router-dom";
import { getRequestById } from "../../modules/requestManager";


export const RequestEditForm = () => {
    const { requestId } = useParams()
    const navigate = useNavigate();
    
    const [editedRequest, setEditedRequest] = useState({
        id: requestId,
    })

    const getCurrentRequest = () => {
        getRequestById(requestId)
        .then((request) => {
            setEditedRequest(request)
        })
    }

    useEffect(() => {
            getCurrentRequest()
    }, [])

    const handleSaveButtonClick  = (event) => {
        event.preventDefault();
        updateRequest(editedRequest)
        .then(() => {
            navigate("/requests")
        })
    }

    return (
    <>
        <FormGroup>
            <Label for="request.dateCompleted">Completed On: </Label>
                    <Input 
                        id="request.dateCompleted"
                        type="date" 
                        value={editedRequest.dateCompleted || ""}
                        placeholder="datetime placeholder" 
                        onChange={(e) => {
                            let copy = { ...editedRequest }
                            copy.dateCompleted = e.target.value
                            setEditedRequest(copy)
                        }}
                        />
        </FormGroup>
        <FormGroup>
            <Button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>
                Mark as Complete
            </Button>
        </FormGroup>
    </>
)
}