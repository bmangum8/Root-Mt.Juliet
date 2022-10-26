import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { addRequest } from "../../modules/requestManager";
import { getAllTrees } from "../../modules/treeManager";

export default function RequestAddForm() {
    const navigate = useNavigate();
    const [request, setRequest] = useState({})
    const [trees, setTrees] = useState([])

const handleAddButtonClick = (event) => {
    event.preventDefault();
    addRequest(request)
    .then(() => {
        navigate("/request")
    })
};

useEffect(() => {
    getAllTrees()
    .then((treeList) => {
        setTrees(treeList)
    })

})


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
                    <option value={0}>Select Tree</option>
                    {trees.map(tree => (
                        <option key={tree.id} value={tree.id}>
                            {tree.name}
                        </option>
                    ))}
                </select>
        </FormGroup>

        <FormGroup>
            <Label for="request.dateCreated">Today's Date</Label>
                    <Input 
                        id="request.dateCreated"
                        type="date"
                        //defaultValue={date}
                        onChange={(e) => {
                                let copy = { ...request }
                                copy.dateCreated = e.target.value
                                setRequest(copy)
                                }
                        } />
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