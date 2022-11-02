import React, { useState, useEffect } from "react";
import { Card, CardBody, Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import { useNavigate, Link } from "react-router-dom";
//import { deleteTree } from "../../modules/treeManager"

export const Tree = ({ tree, isAdmin }) => {
    //const navigate = useNavigate();

    // const [modal, setModal] = useState(false);
    // const toggle = () => setModal(!modal);


    // const handleDeleteButtonClick = (event) => {
    //     event.preventDefault()
    //     deleteTree(tree)
    //     toggle()
    //     navigate(0)
    // }

    // if(isAdmin) {
    //     return (
    //         <Card className="m-4">
    //         <CardBody>
    //             <p>
    //                 <img src={tree.imageLocation} alt="image of tree"/>
    //             </p>
    //             <strong>{tree.name}</strong>
    //             <p>{tree.species}</p>
    //             <p>{tree.description}</p>

    //             <Link to={`/tree/edit/${tree.id}`} className="treeEditButton"> Edit </Link>

                {/* <Button onClick={toggle}>
                        DELETE
                </Button>

                <Modal isOpen={modal} toggle={toggle} {...tree}>
                    <ModalHeader toggle={toggle}>Delete Tree</ModalHeader>
                    <ModalBody>
                        <>
                            <section>
                                <div>Are you sure you want to delete {tree.name}?</div>
                            </section>
                        </>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={toggle}>
                            Cancel
                        </Button>
                        <Button color="secondary" onClick={(clickEvent) => handleDeleteButtonClick(clickEvent)
                            .then(() => {
                                navigate("/tree")
                            })}>
                            Confirm
                        </Button> */}
                    {/* </ModalFooter>
                </Modal> */}

    //         </CardBody>
    //     </Card>
    //     )
    // }

    //     else {
            
            return (
            <Card className="m-4">
            <CardBody>
                <p>
                    <img src={tree.imageLocation} alt="image of tree"/>
                </p>
                <strong>{tree.name}</strong>
                <p>{tree.species}</p>
                <p>{tree.description}</p>

            </CardBody>
        </Card>
    );
    
//     }
}
