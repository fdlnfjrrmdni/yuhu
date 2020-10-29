import React, { Component } from 'react'
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap'
import { FaUser, FaSignOutAlt } from 'react-icons/fa'
import firebase from 'firebase'

class UserList extends Component {
  	render(){
    	return(
      	<div className={`chat-item ${this.props.focus && 'focus'}`} onClick={this.props.onClick}>
        	<div className="chat-avatar">
          	<FaUser />
        </div>
        	<div className="chat-content">
          		<span>{this.props.email}</span>
        	</div>
      	</div>
    )
  }
}

export default class ChatList extends Component {
	constructor(props){
	    super(props)
	    this.state = {
		      	focus: null,
		      	modalOpen: false,
		      	email: '',
		      	uid: '',
		      	listChat: [],
    	}
  	}

  	componentDidMount() {
  		firebase.auth().onAuthStateChanged(e=>{
	      	if(e===null){
	        	this.props.history.push('/login')
	      	}else {
	      		const {email, uid} = firebase.auth().currentUser
		        this.setState({email, uid})
		        const database = firebase.database()
		        database.ref('/users').on('value',item =>{
		          	const data = item.val()
		          	const user = []
		          	for( let keys in data){
		            	const a = {
			              	id: data[keys].uid,
			              	email: data[keys].email
		            	}
		            	user.push(a)
		          	}
		          	this.setState({listChat: user})
		    	})
	      	}
	    })
  	}

	render() {
		return (
			<>
				<div className="title">
                  <div className="avatar" onClick={()=>console.log(this.state.listChat)}>
                    <FaUser />
                  </div>
                  <span className="user">{this.state.email}</span>
                  <Button onClick={()=>this.setState({modalOpen: true})}><FaSignOutAlt /></Button>
                </div>
				<div className="search-bar">
                    <input type="text" placeholder="Search or start new chat"/>
                </div>
				<div className="chat-list">
					{this.state.listChat.map(item=>(
	                    <UserList key={item.id} focus={item.id===this.state.focus} onClick={()=>this.setState({focus: item.id})} email={item.email} />
	                ))}
				</div>
				<Modal isOpen={this.state.modalOpen}>
		          	<ModalBody>
		            	Are you sure want to Logout?
		          	</ModalBody>
		          	<ModalFooter>
		            	<Button onClick={()=>this.setState({modalOpen: false})}>Cancel</Button>
		            	<Button onClick={()=>firebase.auth().signOut()}>OK</Button>
		          	</ModalFooter>
		        </Modal>
			</>
		)
	}
}