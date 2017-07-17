import React, { Component } from 'react';
import Cookies from 'universal-cookie';

import "./style.css";

const cookies = new Cookies();

class ChatListItem extends Component {
	render(){
		return(
			<div>
				<div className={"chat-balloon " +  ( cookies.get('fullname') === this.props.data.fullname ? 'sender' : 'receiver' )}>
					<span>{ this.props.data.message }</span>
				</div>
			</div>
		);
	}
}

export default ChatListItem;