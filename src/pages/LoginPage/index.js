import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import io from "socket.io-client";

import Textfield from 'react-mdl/lib/Textfield';
import Button from 'react-mdl/lib/Button';

import "./style.css";

const socket = io();
const cookies = new Cookies();

class LoginPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			fullname: '',
			email: ''
		};
	}
	
	handleLoginFormChange(event,type){
		if(type === "fullname"){
			this.setState({
				fullname: event.target.value
			});
		}
		else{
			this.setState({
				email: event.target.value
			});
		}
	}
	submitLoginForm(event){
		event.preventDefault();

		cookies.set('fullname', this.state.fullname, { path: '/' });
		socket.emit('new:user',{ fullname: this.state.fullname,email: this.state.email });

		this.props.history.push('/chat');
	}
	render(){
		return (
			<div className="login-container">
				<div className="login-outer-wrapper">
					<div className="login-inner-wrapper">
						<form onSubmit={(e) => this.submitLoginForm(e) }>
							<Textfield
								onChange={(e) => this.handleLoginFormChange(e,'email')}
								className="login-form-text"
								label="Email-Address"
							/>
							<Textfield
								onChange={(e) => this.handleLoginFormChange(e,'fullname')}
								className="login-form-text"
								label="Name"
							/>

							<Button raised colored disabled={!this.state.fullname && !this.state.email}>Start Chatting</Button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default LoginPage;