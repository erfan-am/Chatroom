import React, { useState } from "react";
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

const Login = () => {
  //State User
  const [user, setUser] = useState({ email: "", password: "" });
  //State Loading
  const [loading, setLoading] = useState(false);

  //Input OnChnage
  const handleValue = e => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  //Login to accunt
  const submitHandle = e => {
    e.preventDefault();
    //Set Laoding
    setLoading(true);
    //Send Information
    firbase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(() => {
        console.log("user signin!");
        //Set Laoding
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        //Set Laoding
        setLoading(false);
      });
  };

  return (
    <Grid textAlign="center" verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" icon color="blue" textAlign="center">
          <Icon name="puzzle piece" color="blue" />
          Login for DevChat
        </Header>
        <Form size="large">
          <Segment stacked>
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
              color="blue"
              fluid
              size="large"
              className={loading ? "loading" : ""}
            >
              Submit
            </Button>
          </Segment>
        </Form>
        <Message>
          if you don't have an account? <Link to="/register">Register</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
