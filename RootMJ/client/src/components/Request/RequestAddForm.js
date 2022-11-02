import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { addRequest } from "../../modules/requestManager";
import { getAllTrees } from "../../modules/treeManager";
import { getCurrentUserProfile } from "../../modules/userProfileManager";

export default function RequestAddForm() {
    const navigate = useNavigate();
    const [request, setRequest] = useState({
        treeId: 0,
        userProfileId: 0
    }
    )
    const [trees, setTrees] = useState([])
    const [currentUser, setCurrentUser] = useState({})

const handleAddButtonClick = (event) => {
    event.preventDefault();
    setRequest(request.userProfileId = currentUser.id)
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
    getCurrentUserProfile()
    .then((user) => {
        setCurrentUser(user)
    })
}, [])


return (
    <>
        <Form>
        <FormGroup>
            <Label for="request.treeId"> Tree Requested</Label>
                <select className="dropdown"
                    value={request.treeId} 
                    onChange={(e) => {
                        let copy = { ...request }
                        copy.treeId = e.target.value
                        setRequest(copy)
                        }}>
                    <option value={0} disabled hidden >Select Tree</option>
                    {trees.map(tree => (
                        <option key={tree.id} value={tree.id}>
                            {tree.name}
                        </option>
                    ))}
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