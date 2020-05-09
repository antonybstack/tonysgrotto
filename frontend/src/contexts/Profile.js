import React, { useState, useEffect } from "react";
import axios from "axios";

//this component's purpose is for cleaner code and is used in EditTicket. EditTicket takes data from TicketContext and passes that data to this component to output the html.
const Profile = (props) => {
  const [profile, setProfile] = useState({ username: "", role: "" });
  useEffect(() => {
    // populates tickets array. Send HTTP request to server
    const getProfile = async () => {
      const response = await axios.get("/api/users/" + props.userID);
      console.log(response.data);
      setProfile({ ...profile, username: response.data.username, role: response.data.role });
    };
    getProfile();
  }, []);
  console.log(profile);
  return <span>created by: {profile.username}</span>;
};

export default Profile;
