import React, { Component } from 'react';
import { ClientLogin } from './api/api.js';
class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            errorLog:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      
    }


    handleChange(event) {
        this.setState({ username: event.target.value,errorLog:'' });
    }


    handleSubmit() {
        // alert('A name was submitted: ' + this.state.username);
        ClientLogin(this.state.username, (err, username) => {
            if (username != null) {
                this.props.setUserName(username);

            }
            else {
                this.setState({ errorLog:err});
            }
        }
        );
    }

    render() {
        return (
            <div className="LoginForm">
                <form onSubmit={this.handleSubmit}>
                    <label>Nhập tên của bạn</label>

                    <input type="text" value={this.state.username} onChange={this.handleChange} />


                </form>
                <div>{this.state.errorLog}</div>
                <div onClick={this.handleSubmit} >Chơi</div>
            </div>
        );
    }
}

export default LoginForm;
