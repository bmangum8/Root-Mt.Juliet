import { useEffect, useState } from "react"
import { getCurrentUserProfile } from "../../modules/userProfileManager";
import { UserProfile } from "./UserProfile";

export const UserProfileList = () => {
    const [users, setUsers] = useState([]);

    //set state upon rendering
    // useEffect(() => {
    //     getAllUserProfiles().then(setUsers);
    // }, []
    // );

    useEffect(() => {
        getCurrentUserProfile()
        .then((profileArray) => {
            setUsers(profileArray)
        })
    }, [])


    return (
        <section>
            {users.map((userProfile) => (
                    //pass userProfile as a prop to the UserProfile.js component
                <UserProfile key={userProfile.id} userProfile={userProfile} />
            ))}
        </section>
    )
}