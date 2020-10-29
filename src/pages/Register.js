import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Button, Modal, ModalBody, ModalFooter } from 'reactstrap'
import { Link } from 'react-router-dom'
import firebase from '../helper/firebase'

export default class Register extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			password: '',
			passwordConfirmation: '',
			errorMessage: '',
			modalOpen: false,
			buttonDisabled: true,
			processing: false
		}
	}

	componentDidMount(){
	    firebase.auth().onAuthStateChanged(e=>{
	      	if(e){
	        	this.props.history.push('/chat')
	      	}
	    })
	}

	register = async(e) => {
		e.preventDefault()
		const {email, password} = this.state
		try {
			this.setState({processing: true, buttonDisabled: true})
			const result = await firebase.auth().createUserWithEmailAndPassword(
		        email, password
		    )
		    const db = firebase.database()
		    db.ref(`/users/${result.user.uid}`).set({
		    	uid: result.user.uid,
		        email: result.user.email
		    })
			this.setState({processing: false, buttonDisabled: false})
			this.props.history.push('/login', {message: "successfully registered!"})
		}catch (e) {
			this.setState({modalOpen: true, errorMessage: e.code, processing: false, buttonDisabled: false})
		}
	}

	changeText = (e) => {
		this.setState({[e.target.name]:e.target.value})
	}

	formValidation = () => {
		const {email, password, passwordConfirmation} = this.state
		if (email != '' && password != '' && passwordConfirmation != '') {
			if (password === passwordConfirmation) {
				this.setState({buttonDisabled: false})
			}else {
				this.setState({buttonDisabled: true})
			}
		}else {
			this.setState({buttonDisabled: true})
		}
	}

	render() {
		const {modalOpen, errorMessage, buttonDisabled, processing} = this.state
		return (
			<>
				<div className="d-flex justify-content-center align-items-center h-100">
					<Form onSubmit={this.register} className="form-login">
						<FormGroup>
							<Label for="email">Email</Label>
							<Input onChange={this.changeText} onKeyUp={this.formValidation} id="email" type="email" name="email" />
						</FormGroup>
						<FormGroup>
							<Label for="password">Password</Label>
							<Input onChange={this.changeText} onKeyUp={this.formValidation} id="password" type="password" name="password" />
						</FormGroup>
						<FormGroup>
							<Label for="passwordConfirmation">Password Confirmation</Label>
							<Input onChange={this.changeText} onKeyUp={this.formValidation} id="passwordConfirmation" type="password" name="passwordConfirmation" />
						</FormGroup>
						<Button disabled={buttonDisabled} block color={processing?'secondary':'primary'}>{processing?'Loading...':'Register'}</Button>
						<div className="mt-2">
							<span>Already have account? <Link to="/login">Login here</Link></span>
						</div>
					</Form>
				</div>
				<Modal isOpen={modalOpen}>
					<ModalBody>
						{this.state.errorMessage}<br/>
					</ModalBody>
					<ModalFooter>
						<Button onClick={() => this.setState({modalOpen: false})}>OK</Button>
					</ModalFooter>
				</Modal>
			</>
		)
	}
}