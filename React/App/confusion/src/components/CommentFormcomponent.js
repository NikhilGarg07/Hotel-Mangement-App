import React,{ Component} from 'react';
import { Modal, Button, ModalHeader, ModalBody, Row, Label, Col } from 'reactstrap';
import { LocalForm, Control, Errors } from 'react-redux-form';


const minLength= (len) => (val) => (val) && (val.length >= len);
const maxLength= (len) => (val) =>  !(val) || (val.length <= len);
class CommentForm  extends Component {
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false
        }
        this.toggleModal= this.toggleModal.bind(this);
        this.handleCommentForm= this.handleCommentForm.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleCommentForm(values){
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
    }

    

    render(){
        return(

            <>
                <div className="row">
                    <Button outline onClick={this.toggleModal}>
                        <span className="fa fa-pencil fa-lg"></span>Submit Comment
                    </Button>
                </div>   

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit= {(values)=> this.handleCommentForm(values)}>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor='rating'>Rating</Label>
                                    <Control.select model=".rating" name="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    
                                    <Label htmlFor='Name'>Your Name</Label>
                                    <Control.text model=".author" id="author" name="author" placeholder="Your Name"
                                        className='form-control'
                                        validators={{
                                            minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea model=".comment" id="comment" name="comment" rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">Send Feedback</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal> 
            </>
        )
    }
}

export default CommentForm;