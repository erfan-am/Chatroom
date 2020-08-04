import React from "react";
import firebase from "../../../firebase/firebase";
import { Grid, Header, Icon, Dropdown,Image } from "semantic-ui-react";
const Userpanel = ({ user,clean }) => {
  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("user sign out!");
        clean()
      });

  };
  const dropDowns = () => [
    {
      text: (
        <span>
          <Image src={user && user.photoURL} spaced="right" avatar />
          sign is as <strong>{user && user.displayName}</strong>
        </span>
      ),
      disabled: true,
      key: 1
    },
    {
      text: <span>Change avatar</span>,
      key: 2
    },
    {
      text: <span onClick={signOut}>Sign out</span>,
      key: 3
    }
  ];
  return (
    <Grid style={{ background: "#4c3c4c" }}>
      <Grid.Column>
        <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
          <Header inverted floated="left" as="h2">
            <Icon name="code" />
            <Header.Content>DevChat</Header.Content>
          </Header>
        </Grid.Row>
        {/* user Dropdown */}
        <Header as="h4" style={{ padding: ".25em" }}>
          <Dropdown trigger={<span>{user && user.displayName}</span>} options={dropDowns()} />
        </Header>
      </Grid.Column>
    </Grid>
  );
};

export default Userpanel;
