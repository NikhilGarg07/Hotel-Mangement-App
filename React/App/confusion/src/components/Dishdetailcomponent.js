import React from 'react';
import CommentForm from './CommentFormcomponent';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './Loadingcomponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

function RenderDish({dish}){
        if(dish !==null){
            return(
                <div className='col-12 col-md-5 m-1'>
                    <FadeTransform
                    in
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                        <Card>
                            <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                            <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </FadeTransform>
                 </div>
               );
            }
            else{
                return(
                    <div></div>
                    )
                }
            }

            function RenderComments({comments, postComment, dishId}) {
                if (comments == null) {
                    return (<div></div>)
                }else{
                    const cmnts= comments.map((comment) =>{
                        return(
                            <Fade in>
                            <li key={comment.id}>
                            <p>{comment.comment}</p>
                            <p>-- {comment.author},
                            &nbsp;
                            {new Intl.DateTimeFormat('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: '2-digit'
                                }).format(new Date(comment.date))}
                            </p>
                            </li>
                            </Fade>
                        );
                    }
                )
                return (
                    <div className='col-12 col-md-5 m-1'>
                        <h4> Comments </h4>
                        <ul className='list-unstyled'>
                            <Stagger in>
                                {cmnts}
                            </Stagger>
                        </ul>
                        <CommentForm postComment={postComment} dishId={dishId}/>
                    </div>
                )
                }
            }     
    const Dishdetail=(props)=> { 
        console.log(props.comments)
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null) 
        {
        return (
            <div className="container">
                <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div> 
                </div>
                <div className='row'>
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments} dishId={props.dish.id} postComment={props.postComment}/>
                </div>
            </div>
            
        )
    }
    else{
        return(<div></div>)
    }}

export default Dishdetail;