import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value }, () =>
      console.log(this.state)
    );
  };

  handleSubmit = event => {
    event.preventDefault();
    this.fetchLogin();
  };

  fetchLogin = () => {
    const URL = `/api/login`;
    fetch(URL, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `userName=${this.state.username}&password=${this.state.password}`
    })
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          console.log("logged in!");
          this.props.onHide();
          window.location.reload();
        } else {
          console.log(response.status);
          console.log(response);
          console.log("Invalid username or password");
        }
      })
      .catch(err => console.log("err", err));
  };

  render() {
    return (
      <Modal
        className="one-edge-shadow"
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
        </Modal.Header>
        <form onSubmit={this.handleSubmit}>
          <Modal.Body>
            <Container>
              <Row>
                <Col>
                  <label>
                    Username:
                    <input
                      type="text"
                      id="username"
                      value={this.state.username}
                      onChange={this.handleChange}
                    />
                  </label>
                </Col>
                <Col>
                  <label>
                    Password:
                    <input
                      type="password"
                      id="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                  </label>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" value="Login">
              Login
            </Button>
            {/* <Button onClick={this.props.onHide}>Close</Button> */}
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}
