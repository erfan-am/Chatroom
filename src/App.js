import React from "react";
import "./App.css";
import { Grid } from "semantic-ui-react";
import ColorPanel from "./Components/ColorPanel/Colorpn";
import SidePanel from "./Components/Sidepanel/Sidepn";
import MessagePanel from "./Components/Messagepanel/Messagepn";
import MetaPanel from "./Components/MetaPanel/Meta";
export default function App({ user,clean,setChannel,currentChannel }) {
  return (
    <Grid
     columns="equal" className="app" style={{ background: "#eee" }}
    >
      <ColorPanel />
      <SidePanel
      key={currentChannel && currentChannel.id} setChannel={setChannel} user={user} clean={clean} />
      <Grid.Column  style={{ marginLeft: 320 }}>
        <MessagePanel key={currentChannel && currentChannel.id} user={user} currentChannel={currentChannel} style={{ marginLeft: 320 }} />
      </Grid.Column>
      <Grid.Column width={2}>
        <MetaPanel />
      </Grid.Column>
    </Grid>
  );
}
