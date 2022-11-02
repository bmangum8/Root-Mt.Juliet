import { useEffect, useState } from "react"
import { getCurrentUserProfile } from "../../modules/userProfileManager";
import { UserProfile } from "./UserProfile";

export const UserProfileList = () => {
    const [users, setUsers] = useState([]);

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