import React from "react";
import { Menu } from "semantic-ui-react";
import UserPanel from "./userpanel/userpn";
import Channels from './Channels/Channels';
import DirectMessage from './Direct/direct'

const SidePanel = ({ user,clean,setChannel }) => {
  return (
    <Menu
      size="large"
      fixed="left"
      vertical
      style={{ background: "#4c3c4c", fontSize: "1.2rem" }}
    >
      <UserPanel user={user} clean={clean} />
      <Channels setChannel={setChannel} user={user}/>
      <DirectMessage/>
    </Menu>
  );
};

export default SidePanel;
