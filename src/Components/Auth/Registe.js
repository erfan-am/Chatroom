import React, { useState } from "react";
import md5 from "md5";
import {
  Grid,
  Form,
  Segment,
  Header,
  Message,
  Icon,
  Button
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import firbase from "../../firebase/firebase";

const Register = () => {
  //State User
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  //State Loading
  const [loading, setLoading] = useState(false);

  //Input OnChnage
  const handleValue = e => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  //CreateUSer
  const submitHandle = e => {
    e.preventDefault();
    //Set Laoding
    setLoading(true);
    //Send Information
    firbase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(createUser => {
        console.log(createUser);
        //updateProfile
        createUser.user
          .updateProfile({
            displayName: user.username,
            photoURL: `http://gravatar.com/avatar/${md5(
              createUser.user.email
            )}?d=identicon`
          })
          .then(() => {
            //User Save
            saveUser(createUser).then(() => {
              console.log("user saved!");
            });
          });
        //Set Laoding
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        //Set Laoding
        setLoading(false);
      });
  };

  const saveUser = createUser => {
    //create user inform in firebase
    const user = firbase.database().ref("users");
    return user.child(createUser.user.uid).set({
      name: createUser.user.displayName,
      avatar: createUser.user.photoURL
    });
  };

  return (
    <Grid textAlign="center" verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" icon color="orange" textAlign="center">
          <Icon name="puzzle piece" color="orange" />
          Register for DevChat
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              value={user.username}
              onChange={handleValue}
              fluid
              name="username"
              icon="user"
              iconPosition="left"
              type="text"
              placeholder="Username"
              required
            />
            <Form.Input
              value={user.email}
              onChange={handleValue}
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              type="email"
              placeholder="Email"
              required
            />
            <Form.Input
              value={user.password}
              onChange={handleValue}
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              type="passwrod"
              placeholder="passwrod"
              required
            />
            <Button
              type="button"
              onClick={submitHandle}
              disabled={loading}
              color="orange"
              fluid
              size="large"
              className={loading ? "loading" : ""}
            >
              Submit
            </Button>
          </Segment>
        </Form>
        <Message>
          Already a user? <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
