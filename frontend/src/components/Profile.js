import React, { useContext } from "react";
import { ProfileContext } from "../contexts/ProfileContext";

//this component's purpose is for cleaner code and is used in EditTicket. EditTicket takes data from TicketContext and passes that data to this component to output the html.
const Profile = ({ userID }) => {
  const { profiles } = useContext(ProfileContext);

  console.log("Profile");

  return (
    <span>
      <span>created by: </span>
      {profiles.map(
        (currentProfile, i) =>
          currentProfile._id === userID && (
            <span key={i}>
              &lt;
              <img src={currentProfile.avatar && require("../assets/avatars/" + currentProfile.avatar + ".png")} alt="Logo" width="20" />
              {currentProfile.username}&gt;
            </span>
          )
      )}
    </span>
  );
};

export default Profile;
