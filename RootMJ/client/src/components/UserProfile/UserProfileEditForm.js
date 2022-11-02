import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Form, FormGroup, Button, Label, Input } from "reactstrap"
import { updateUserProfile, getCurrentUserProfile } from "../../modules/userProfileManager"

export const UserProfileEditForm = () => {
    const { profileId } = useParams()
    const navigate = useNavigate();

    const [editedProfile, setEditedProfile] = useState({
        id: profileId,
        name: "",
        email: "",
        imageLocation: ""
    })

    const getCurrentProfile = () => {
        getCurrentUserProfile()
        .then((profile) => {
            setEditedProfile(profile)
        })
    }
    
    useEffect(() => {
        getCurrentProfile()
    }, [])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        updateUserProfile(editedProfile)
        .then(() => {
            navigate("/userProfile/details")
        })
    }

    return (
        <>
            <Form>
                <FormGroup>
                    <Label for="profile.name">Name: </Label>
                    <Input 
                        id="profile.name"
                        type="name"
                        value={editedProfile.name}
                        onChange={(e) => {
                            let copy = { ...editedProfile }
                            copy.name = e.target.value
                            setEditedProfile(copy)
                        }
                    } />
                </FormGroup>
                <FormGroup>
                    <Label for="profile.email">Email:</Label>
                    <Input 
                        id="profile.email"
                        type="text"
                        value={editedProfile.email}
                        onChange={(e) => {
                            let copy = { ...editedProfile }
                            copy.email = e.target.value
                            setEditedProfile(copy)
                        }
                    } />
                </FormGroup>
                <FormGroup>
                    <Label for="profile.imageLocation">Image URL:</Label>
                    <Input 
                        id="profile.imageLocation"
                        type="text"
                        value={editedProfile.imageLocation}
                        onChange={(e) => {
                            let copy = { ...editedProfile }
                            copy.imageLocation = e.target.value
                            setEditedProfile(copy)
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
                <Button onClick={() => { navigate("/userProfile/details") }}>
                    Cancel
                </Button>
            </Form>
        </>
    )
}