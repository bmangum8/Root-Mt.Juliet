import React from "react";
import { useState } from "react";
import { Card, CardBody, CardFooter, CardHeader, Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { deleteRequest } from "../../modules/requestManager";

export const Request = ({ request, isAdmin }) => {

    const navigate = useNavigate();

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);


    const handleDeleteButtonClick = (event) => {
        event.preventDefault()
        deleteRequest(request)
        toggle()
        navigate(0)
    }

    const isComplete = () => {
        if (request.dateCompleted) {
            return (`Request Complete`)
        }
        else {
            return (`Request Not Complete`)
        }
    }

   if(isAdmin && request.dateCompleted === null) {
    return (
        <>
        <Card className="m-4">
            <CardBody>
                <p>User Name: {request.userProfile.name}</p>
                <p>Tree Requested: <strong>{request.tree.name}</strong></p>
                <p>Neighborhood: <strong>{request.neighborhood.name}</strong></p>
                <p>Date Requested: {request.dateCreated}.</p>
            
                <CardFooter>
                    <Link to={`/request/edit/${request.id}` } className="requestEditButton"> Mark as Complete </Link>
                </CardFooter>
            </CardBody>
        </Card>
    </>
    )
}

else if(isAdmin) {
    return (
        <>
        <Card className="m-4">
            <CardHeader>
                {isComplete()}
            </CardHeader>
            <CardBody>
                <p>User Name: {request.userProfile.name}</p>
                <p>Tree Requested: <strong>{request.tree.name}</strong></p>
                <p>Neighborhood: <strong>{request.neighborhood.name}</strong></p>
                <p>Date Requested: {request.dateCreated}.</p>
                <p>Date Completed: {request.dateCompleted}</p>
            </CardBody>
        </Card>
    </>
    )
}

    else {

        return (
            <>
            <Card className="m-4">
                <CardBody>
                    <p>User Name: {request.userProfile.name}</p>
                    <p>Tree Requested: <strong>{request.tree.name}</strong></p>
                    <p>Neighborhood: <strong>{request.neighborhood.name}</strong></p>
                    <p>Date Requested: {request.dateCreated}.</p>

                    <CardFooter>
                        {isComplete()} 
                        {' '}

                        <Button onClick={toggle}>
                            DELETE
                        </Button>

                        <Modal isOpen={modal} toggle={toggle} {...request}>
                            <ModalHeader toggle={toggle}>Delete Request</ModalHeader>
                            <ModalBody>
                                <>
                                    <section>
                                        <div>Are you sure you want to delete your request?</div>
                                    </section>
                                </>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="secondary" onClick={toggle}>
                                    Cancel
                                </Button>
                                <Button color="secondary" onClick={(clickEvent) => handleDeleteButtonClick(clickEvent)
                                    .then(() => {
                                        navigate("/requests")
                                    })}>
                                    Confirm
                                </Button> 
                            </ModalFooter> 
                        </Modal>
                    </CardFooter>
                </CardBody>
            </Card>
        </>
        )
    }
} 

