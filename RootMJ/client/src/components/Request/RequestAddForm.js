import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { addRequest } from "../../modules/requestManager";
import { getAllTrees } from "../../modules/treeManager";
import { getCurrentUser } from "../../modules/authManager";

export default function RequestAddForm() {
    const navigate = useNavigate();
    const [request, setRequest] = useState({})
    const [trees, setTrees] = useState([])
    const [currentUser, setCurrentUser] = useState({})

const handleAddButtonClick = (event) => {
    event.preventDefault();
    addRequest(request)
    .then(() => {
        navigate("/requests")
    })
};

useEffect(() => {
    getAllTrees()
    .then((treeList) => {
        setTrees(treeList)
    })
}, [])

useEffect(() => {
    getCurrentUser()
    .then((user) => {
        setCurrentUser(user)
    })
}, [])


return (
    <>
        <Form>
        <FormGroup>
            <Label for="request.treeId"> Trees Requested</Label>
                <select className="dropdown" 
                    onChange={(e) => {
                        let copy = { ...request }
                        copy.treeId = e.target.value
                        setRequest(copy)
                        }}>
                    <option value="" disabled selected>Select Tree</option>
                    {trees.map(tree => (
                        <option key={tree.id} value={tree.id}>
                            {tree.name}
                        </option>
                    ))}
                </select>
        </FormGroup>

        <FormGroup>
            <Label for="request.userProfileId"> Trees Requested</Label>
                <select className="dropdown" 
                    onChange={(e) => {
                        let copy = { ...request }
                        copy.userProfileId = e.target.value
                        setRequest(copy)
                        }}>
                    <option value="" disabled selected>Select Your Name</option>
                        <option key={currentUser.id} value={currentUser.id}>
                            {currentUser.name}
                        </option>
                </select>
        </FormGroup>

        <FormGroup>
            <Button onClick={(clickEvent) => handleAddButtonClick(clickEvent)}>
                Save
            </Button>

        </FormGroup>

        </Form>
</>
)
}