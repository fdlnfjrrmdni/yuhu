import React, { Component } from 'react'

export default class ChatList extends Component {
	render() {
		return (
			<div className="chat-list">
				{[...Array(20)].map(() => (
					<div className="chat-item" >
						<div className="chat-avatar"/>
						<div className="chat-content">
							<span>Dojon</span>
						</div>
					</div>
				))}
			</div>
		)
	}
}