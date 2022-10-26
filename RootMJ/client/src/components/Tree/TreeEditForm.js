import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Form, FormGroup, Button, Label, Input } from "reactstrap"
import { getTreeById, updateTree } from "../../modules/treeManager"

export const TreeEditForm = () => {
    const { treeId } = useParams()
    const navigate = useNavigate();

    const [currentTree, setCurrentTree] = useState({})
    
    const [editedTree, setEditedTree] = useState({
        id: treeId,
        name: "",
        species: "",
        description: "",
        imageLocation: ""
    })

    const getCurrentTree = () => {
        getTreeById(treeId)
        .then((tree) => {
            setCurrentTree(tree)
        })
    }

    useEffect(() => {
            getCurrentTree()
    }, [])

    const handleSaveButtonClick  = (event) => {
        event.preventDefault();
        updateTree(editedTree)
        .then(() => {
            navigate("/tree")
        })
    }


    

    return (
        <>
            <Form>
                <FormGroup>
                    <Label for="tree.name">Tree Name: </Label>
                    <Input 
                        id="tree.name"
                        type="name"
                        placeholder={currentTree.name}
                        onChange={(e) => {
                                let copy = { ...editedTree }
                                copy.name = e.target.value
                                setEditedTree(copy)
                                }
                        } />
                </FormGroup>
                <FormGroup>
                    <Label for="tree.species">Species:</Label>
                    <Input 
                        id="tree.species"
                        type="text"
                        placeholder={currentTree.species}
                        onChange={(e) => {
                                let copy = { ...editedTree }
                                copy.species = e.target.value
                                setEditedTree(copy)
                                }
                        } />
                </FormGroup>
                <FormGroup>
                    <Label for="tree.imageLocation">Image URL:</Label>
                    <Input 
                        id="tree.imageLocation"
                        type="text"
                        placeholder={currentTree.imageLocation}
                        onChange={(e) => {
                                let copy = { ...editedTree }
                                copy.imageLocation = e.target.value
                                setEditedTree(copy)
                                }
                        } />
                </FormGroup>
                <FormGroup>
                    <Label for="tree.description">Tree Description:</Label>
                    <Input 
                        id="tree.description"
                        type="text"
                        placeholder={currentTree.description}
                        onChange={(e) => {
                                let copy = { ...editedTree }
                                copy.description = e.target.value
                                setEditedTree(copy)
                                }
                        } />
                </FormGroup>
                <FormGroup>
                    <Button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>
                        Save
                    </Button>
                </FormGroup>            
            </Form>
            <Form>
                <Button onClick={() => { navigate("/tree") }}>
                    Cancel
                </Button>
            </Form>
        </>
    )
}
//}