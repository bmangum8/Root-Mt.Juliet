import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Form, FormGroup, Button, Label, Input } from "reactstrap"
import { updateUserProfile, getUserProfileByFirebaseId, getProfileById } from "../../modules/userProfileManager"

export const UserProfileEditForm = () => {
    const { profileId } = useParams()
    const navigate = useNavigate();

    const [currentUserProfile, setCurrentUserProfile] = useState({})

    const [editedProfile, setEditedProfile] = useState({
        id: profileId
    })

    const getCurrentProfile = () => {
        getProfileById(profileId)
        .then((profile) => {
            setCurrentUserProfile(profile)
        })
        .then((currentUserProfile) => {
            setEditedProfile(currentUserProfile)
        })
    }
    
    useEffect(() => {
        getCurrentProfile()
    }, [])


    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        updateUserProfile(editedProfile)
        .then(() => {
            navigate("/userProfile/details/{id}")
        })
    }

//if statement that checks for null and returns null
// if (currentUserProfile === null) {
//     return null
// } else {

    
    return (
        <>
            <Form>
                <FormGroup>
                    <Label for="profile.name">Name: </Label>
                    <Input 
                        id="profile.name"
                        type="name"
                        placeholder={currentUserProfile.name}
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
                        placeholder={currentUserProfile.email}
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
                        placeholder={currentUserProfile.imageLocation}
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