import React, { Component } from 'react'

const SENDER_NAME = "Ajay"

export default class ChatRoom extends Component {
	constructor(props) {
		super(props)
		this.state = {
			chat: [
				{
					id:"1",
					sender: "Lisa",
					message: "Hai",
					createdAt: new Date().getTime(),
				},
				{
					id:"1",
					sender: "Ajay",
					message: "Hai jugs",
					createdAt: new Date().getTime(),
				},
				{
					id:"1",
					sender: "Lisa",
					message: "Salam kenal",
					createdAt: new Date().getTime(),
				},
				{
					id:"1",
					sender: "Ajay",
					message: "Salam kenal jugs",
					createdAt: new Date().getTime(),
				},
			]
		}
	}

	typing = (e) => {
		const {chat} = this.state
		if (e.keyCode === 13) {
			this.setState({
				chat: [...chat, ...[{
						id: "123",
						sender: "Ajay",
						message: "Apa kabs?",
						createdAt: 123
					}]
				]
			})
		}
	}

	render() {
		const {chat} = this.state
		return (
			<>
				<div className="chat-info">
					<div className="avatar"/>
					<div className="name">Dadang</div>
				</div>
				<div className="chat-container">
					<div>
						<div className="h-100 d-flex flex-column-reverse">
							{chat.reverse().map(item => (
								<div className={`chat-ballon ${item.sender === SENDER_NAME && 'text-right'}`}>
									<div className={`chat-message ${item.sender === SENDER_NAME && 'sender'}`}>
										{item.message}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
				<div className="chat-input">
					<input placeholder="Type a message" onKeyUp={this.typing} type="text"/>
				</div>
			</>
		)
	}
}