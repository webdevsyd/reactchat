import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout,Content,Drawer,Header,Navigation } from 'react-mdl/lib/Layout';
import io from "socket.io-client";

import ChatConversation from '../../components/ChatConversation';
import ChatMessageBox from '../../components/ChatMessageBox';

const socket = io();

class ChatPage extends Component {
	constructor(props){
		super(props);

		this.listOnlineUsers = this.listOnlineUsers.bind(this);

		this.state = {
			onlineUsers: []
		};
	}
	componentWillMount(){
		socket.on('online_users', this.listOnlineUsers);
		socket.emit('load:user',null);
	}
	listOnlineUsers(data){
		let users_arr = [];
		for(let i = 0; i < data.length; i++){
			users_arr.push(data[i]);
		}

		this.setState({
			onlineUsers: users_arr
		});
	}

	renderOnlineUsers(){
		var users = this.state.onlineUsers.map((user,index) => {
			return <Link key={index} to="/" onClick={ (e) => e.preventDefault() }>{ user.fullname }</Link>
		});

		return users;
	}
	render(){
		return(
			<div>
				<Layout fixedHeader fixedDrawer>
					<Header title="Chat"></Header>
					<Drawer title="Online Users">
						<Navigation>
							{ this.renderOnlineUsers() }
						</Navigation>
					</Drawer>
					<Content>
						<ChatConversation />
						<ChatMessageBox />
					</Content>
				</Layout>
			</div>
		)
	}
}

export default ChatPage;