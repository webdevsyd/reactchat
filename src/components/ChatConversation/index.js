import React, { Component } from 'react';
import ChatListItem from '../ChatListItem';
import io from "socket.io-client";
import "./style.css";

const socket = io();

class ChatConversation extends Component {
	constructor(props){
		super(props);

		this.state = {
			message_list: []
		}

		this.displayNewMessage = this.displayNewMessage.bind(this);
		this.displayMessageList = this.displayMessageList.bind(this);

		socket.on('new:message',this.displayNewMessage);

		// socket.emit('list:message', null);
		// socket.on('display:message', this.displayMessageList);
	}

	displayNewMessage(data){
		var msg_array = this.state.message_list.slice()
		msg_array.push(data)
		this.setState({ message_list: msg_array })
	}
	displayMessageList(data){

		
		let messages_arr = [];
		for(let i = 0; i < data.length; i++){
			messages_arr.push(data[i]);
		}

		this.setState({
			message_list: messages_arr
		});
	}
	renderChatList(){
		
		if(this.state.message_list.length > 0){
			var chat_items = this.state.message_list.map((chat,index) => {
				return <ChatListItem key={index} data={chat} />
			});

			return chat_items;
		}
	}
	render(){
		return (
			<div className="chat-conversation">
				{ this.renderChatList() }
			</div>
		);
	}
}

export default ChatConversation;