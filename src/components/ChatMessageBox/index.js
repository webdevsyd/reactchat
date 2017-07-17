import React, { Component } from 'react';
import Textfield from 'react-mdl/lib/Textfield';
import io from "socket.io-client";
import "./style.css";

const socket = io();

class ChatMessageBox extends Component {
	constructor(props){
		super(props);
		this.state = {
			messageBox: ''
		};
	}
	handleMessageBox(event){
		if(event.key === "Enter"){
			event.preventDefault();
			socket.emit('send:message', this.state.messageBox);
			this.setState({
				messageBox: ''
			});
		}
	}
	handleMessageBoxOnChange(event){
		this.setState({
			messageBox: event.target.value
		});
	}
	render(){
		return (
			<div className="chat-message-box">
				<Textfield
					onKeyPress={(e) => { this.handleMessageBox(e) }}
					onChange={ (e) => { this.handleMessageBoxOnChange(e) }}
					value={this.state.messageBox}
					label="Type a message"
					rows={4}
				/>
			</div>
		);
	}
}

export default ChatMessageBox;