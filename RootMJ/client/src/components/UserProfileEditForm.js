import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Form, FormGroup, Button, Label, Input } from "reactstrap"
import { updateUserProfile } from "../modules/userProfileManager"

export const UserProfileEditForm = () => {
    const { userProfileId } = useParams();
    const navigate = useNavigate();

    const [updatedProfile, update] = useState({
        id: userProfileId, 
        name: "",
        email: "",
        imageLocation: "",
        //neighborhoodId: 
    })

    const handleEditButtonClick = (userProfile) => {
        updateUserProfile(userProfile)
        return navigate("/userProfile")
    }

    return (
        <>
            <Form onSubmit={handleEditButtonClick(updatedProfile)}>
                <FormGroup>
                    <Label for="updatedProfile.name">Name:</Label>
                    <Input 
                        id="updatedProfile.id"
                        type="name"
                        placeholder="{userProfile.name}"
                        onChange={(e) => {
                                let copy = { ...updatedProfile }
                                copy.name = e.target.value
                                update(copy)
                                }
                        } />
                </FormGroup>
                <FormGroup>
                    <Label for="updatedProfile.email">Email:</Label>
                    <Input 
                        id="updatedProfile.email"
                        type="text"
                        placeholder="{userProfile.email}"
                        onChange={(e) => {
                                let copy = { ...updatedProfile }
                                copy.email = e.target.value
                                update(copy)
                                }
                        } />
                </FormGroup>
                <FormGroup>
                    <Label for="updatedProfile.imageLocation">Image URL:</Label>
                    <Input 
                        id="updatedProfile.imageLocation"
                        type="text"
                        placeholder="{userProfile.imageLocation}"
                        onChange={(e) => {
                                let copy = { ...updatedProfile }
                                copy.imageLocation = e.target.value
                                update(copy)
                                }
                        } />
                </FormGroup>
                <FormGroup>
                    <Button>Save</Button>
                </FormGroup>            
            </Form>
            <Form>
                <Button onClick={() => { navigate("/userProfile") }}>
                    Cancel
                </Button>
            </Form>
        </>
    )
}