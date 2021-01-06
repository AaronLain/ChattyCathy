import React from 'react';
import firebase from 'firebase';
import Message from '../Chat/ChatWindow/Message/Message'
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  CardFooter,
} from 'reactstrap';

import userData from '../Helpers/Data/userData';
import messageData from '../Helpers/Data/messageData';

class Profile extends React.Component {
  state = {
    modal: false,
    userName: '',
    userPhoto: '',
    userSentiment: '',
    fBuid: '',
    messages: []
  }
        
  //changes google firebase photo url to return a larger res photo
  getHigherResPhotoUrl = photoURL => {
    return photoURL.replace('s96-c', 's400-c'); 
  };

  componentDidMount() {
    const userId = this.props.match.params.userId;
    const fBuid = firebase.auth().currentUser.uid;
    const photoUrl = firebase.auth().currentUser.photoURL;
    userData.getUserData(userId)
      .then(response => {
        const user = response.data;
        this.setState({
          userName: user.userName,
          userPhoto: this.getHigherResPhotoUrl(photoUrl),
          userSentiment: user.sentiment,
          fBuid: user.fBuid,
        })  
      })
      .catch((err) => console.error('could not get user', err))

      messageData.getMessagesByFBuid(fBuid)
        .then(response => {

            this.setState({messages: response.data})
        })
        .catch(err => console.error('could not get messages', err))
  }

  editUser = (e) => {
    const userId = this.props.match.params.userId;
    const {
      userName,
      userPhoto,
    } = this.state;

    const updatedMeat = {
      userName,
      imageUrl: userPhoto,
      sentiment: this.state.userSentiment,
      fBuid: this.state.fBuid,
    }

    userData.updateUser(userId, updatedMeat)
      .then(() => this.props.history.push('/home')) //returns to home after post is complete
      .catch((err) => console.error('could not save user', err));
  }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ userName: e.target.value });
  }

  photoChange = (e) => {
    e.preventDefault();
    this.setState({ userPhoto: e.target.value });
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal})
  }

  render() {
    const {
      modal,
      userName,
      userPhoto,
      messages,
    } = this.state;
    
  //   const messageBuilder = (messageArray) => {
  //     messageArray.map(m => 
  //      <CardFooter className="text-center">
  //       <button className="btn btn-danger w-20 " onClick={this.toggle}>{m.content}</button>  
  //     </CardFooter>
  //     );
      
  // }

    return (
      <Container>
        <Row>
          <Col>   
            <Card className ="mx-auto text-center">
              <CardTitle className="display-2">{userName}</CardTitle>
              <CardBody className="text-center">
                  <img src={userPhoto} height="50%" width="50%" alt="the user photo" />
                  
              </CardBody>
              {/* {messageBuilder(messages)} */}
              <CardFooter className="text-center">
                  <button className="btn btn-danger w-20 " onClick={this.toggle}>Edit Photo</button>  
              </CardFooter>
            </Card>
          <Modal isOpen={modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Change it up!</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="photoUrl">Photo Url</Label>
                    <Input type="text"
                      name="photoUrl"
                      id="photoUrl"
                      placeholder="Paste your new photo URL here"
                      value={userPhoto}
                      onChange={this.photoChange}
                    />
                </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.editUser}>Submit</Button>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
          </Modal>
          </Col>
        </Row>
      </Container>
    );
  }
}
  

export default Profile;