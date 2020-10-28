import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { Link } from 'react-router-dom'

export default class Login extends Component {
	login = () => { this.props.history.push('/chatlist') }

	render() {
		return (
			<div className="d-flex justify-content-center align-items-center h-100">
				<Form onSubmit={this.login} className="form-login">
					<FormGroup>
						<Label for="email">Email</Label>
						<Input id="email" type="email" name="email" />
					</FormGroup>
					<FormGroup>
						<Label for="password">Password</Label>
						<Input id="password" type="password" name="password" />
					</FormGroup>
					<Button block>Login</Button>
					<div className="mt-2">
						<span>Don't have an account? <Link to="/register">Register here</Link></span>
					</div>
				</Form>
			</div>
		)
	}
}