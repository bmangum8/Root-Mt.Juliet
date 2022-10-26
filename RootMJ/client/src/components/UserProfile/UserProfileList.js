import { useEffect, useState } from "react"
import { getAllUserProfiles } from "../../modules/userProfileManager";
import { UserProfile } from "./UserProfile";

export const UserProfileList = () => {
    const [users, setUsers] = useState([]);

    //set state upon rendering
    useEffect(() => {
        getAllUserProfiles().then(setUsers);
    }, []
    );

    return (
        <section>
            {users.map((userProfile) => (
                //pass userProfile as a prop to the UserProfile.js component
                <UserProfile key={userProfile.id} userProfile={userProfile} />
            ))}
        </section>
    )
}