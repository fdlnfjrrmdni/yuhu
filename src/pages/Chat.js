import React, { Component } from 'react'
import { Row, Col, Container } from 'reactstrap'
import firebase from '../helper/firebase'

import ChatList from './ChatList'
import ChatRoom from './ChatRoom'

export default class Chat extends Component {
	componentDidMount(){
	    firebase.auth().onAuthStateChanged(e=>{
	      	if(e===null){
	        	this.props.history.push('/login')
	      	}
	    })
	}

	render() {
		return (
			<>
				<div className="h-100 parent-chat">
					<div className="accent-chat" />
					<Container className="container-chat">
						<Row className="component-chat no-gutters">
							<Col className="chat-scroll" md={4}>
								<ChatList/>
							</Col>
							<Col className="chat-room" md={8}>
								<ChatRoom/>
							</Col>
						</Row>
					</Container>
				</div>
			</>
		)
	}
}