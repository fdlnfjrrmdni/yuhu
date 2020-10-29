import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Button, Modal, ModalBody, ModalFooter } from 'reactstrap'
import { Link } from 'react-router-dom'
import firebase from 'firebase'

export default class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			password: '',
			message: '',
			errorMessage: '',
			modalOpen: false,
			buttonDisabled: true,
			processing: false
		}
	}

	componentDidMount() {
		if (this.props.location.state) {	
			const {message} = this.props.location.state
			this.setState({message})
		}

		firebase.auth().onAuthStateChanged(e => {
			if (e) {
				this.props.history.push('/chat')
			}
		})
	}

	login = async(e) => { 
		e.preventDefault()
		const {email, password} = this.state
		try {
			this.setState({processing: true, buttonDisabled: true})
			await firebase.auth().signInWithEmailAndPassword(email, password)
			this.setState({processing: false, buttonDisabled: false}, () => {	
				this.props.history.push('/chat', {message: "successfully login"})
			})
		}catch(e) {
			this.setState({modalOpen: true, errorMessage: e.code, processing: false, buttonDisabled: false})
		} 
	}

	changeText = (e) => {
		this.setState({[e.target.name]:e.target.value})
	}

	formValidation = () => {
		const {email, password} = this.state
		if (email != '' && password != '') {
			this.setState({buttonDisabled: false})
		}else {
			this.setState({buttonDisabled: true})
		}
	}

	render() {
		const {modalOpen, errorMessage, buttonDisabled, processing} = this.state
		return (
			<>
				<div className="d-flex justify-content-center align-items-center h-100">
					<Form onSubmit={this.login} className="form-login">
						{
							this.state.message !=='' && (
								<h5 className="text-center message">{this.state.message}</h5>
							)
						}
						<FormGroup>
							<Label for="email">Email</Label>
							<Input onChange={this.changeText} onKeyUp={this.formValidation} id="email" type="email" name="email" />
						</FormGroup>
						<FormGroup>
							<Label for="password">Password</Label>
							<Input onChange={this.changeText} onKeyUp={this.formValidation} id="password" type="password" name="password" />
						</FormGroup>
						<Button disabled={buttonDisabled} block color={processing?'secondary':'primary'}>{processing?'Loading...':'Login'}</Button>
						<div className="mt-2">
							<span>Don't have an account? <Link to="/register">Register here</Link></span>
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