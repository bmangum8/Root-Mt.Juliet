import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { addTree } from "../../modules/treeManager";

export default function TreeAddForm() {
    const navigate = useNavigate();
    const [tree, setTree] = useState({
        name: "",
        species: "",
        description: "",
        imageLocation: ""
    })

    const handleAddButtonClick = (event) => {
        event.preventDefault();
        addTree(tree)
        .then(() => {
            navigate("/trees")
        })
    };

    return (
        <>
            <Form>
                <FormGroup>
                    <Label for="tree.name">Tree Name: </Label>
                    <Input 
                        id="tree.name"
                        type="name"
                        placeholder="Type new tree name here"
                        onChange={(e) => {
                                let copy = { ...tree }
                                copy.name = e.target.value
                                setTree(copy)
                                }
                        } />
                </FormGroup>
                <FormGroup>
                    <Label for="tree.species">Species:</Label>
                    <Input 
                        id="tree.species"
                        type="text"
                        placeholder="Type new species here"
                        onChange={(e) => {
                                let copy = { ...tree }
                                copy.species = e.target.value
                                setTree(copy)
                                }
                        } />
                </FormGroup>
                <FormGroup>
                    <Label for="tree.imageLocation">Image URL:</Label>
                    <Input 
                        id="tree.imageLocation"
                        type="text"
                        placeholder="Type new tree image URL here"
                        onChange={(e) => {
                                let copy = { ...tree }
                                copy.imageLocation = e.target.value
                                setTree(copy)
                                }
                        } />
                </FormGroup>
                <FormGroup>
                    <Label for="tree.description">Tree Description:</Label>
                    <Input 
                        id="tree.description"
                        type="text"
                        placeholder="Type new tree description here"
                        onChange={(e) => {
                                let copy = { ...tree }
                                copy.description = e.target.value
                                setTree(copy)
                                }
                        } />
                </FormGroup>
                <FormGroup>
                    <Button onClick={(clickEvent) => handleAddButtonClick(clickEvent)}>
                        Save
                    </Button>
                </FormGroup>            
            </Form>
            <Form>
                <Button onClick={() => { navigate("/trees") }}>
                    Cancel
                </Button>
            </Form>
        </>
    )
}