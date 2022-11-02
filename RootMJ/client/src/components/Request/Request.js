import React, { useEffect } from "react";
import { useState } from "react";
import { Card, CardBody, CardFooter, CardHeader, Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { deleteRequest } from "../../modules/requestManager";
import { isUserAdmin } from "../../modules/authManager";

export const Request = ({ request }) => {
    const [user, setUser] = useState({
        isAdmin: true
    })
    const navigate = useNavigate();

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    useEffect(() => {
        isUserAdmin()
        .then((profile) => {
            setUser(profile)
        })
    }, [])

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

    const isAdmin = () => {
        
        if(request.dateCompleted === null && user === true) {
            return (
                <Link to={`/request/edit/${request.id}` } className="requestEditButton"> Mark as Complete </Link>
            )
        }
        else if(user === true) {
            return (
            <Button onClick={toggle}>
                DELETE
            </Button>
            )
        }
    }
    
    


    return (
        <>
        <Card className="m-4">
            <CardBody>
                <CardHeader>
                    {isAdmin()}
                </CardHeader>

                <p>User Name: {request.userProfile.name}</p>
                <p>Tree Requested: <strong>{request.tree.name}</strong></p>
                <p>Neighborhood: <strong>{request.neighborhood.name}</strong></p>
                <p>Date Requested: {request.dateCreated}.</p>
            
                <CardFooter>
                {isComplete()} 

                        <Modal isOpen={modal} toggle={toggle}>
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
                                <Button color="secondary" onClick={(clickEvent) => handleDeleteButtonClick(clickEvent)}>
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

