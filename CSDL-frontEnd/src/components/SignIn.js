import React, { Component } from 'react';
import NavBar from './NavBar';
import '../Css/sign-in.css';
import { Link } from 'react-router-dom';

class SignIn extends Component {
    state = {
        username: '',
        password: ''
    }
    handleChange = (event) => {
        let target = event.target;
        let value = target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
        this.props._onLogin(this.state.username, this.state.password)
    }

    render() {
        return (
            <div>
                {/* <NavBar/> */}
                <nav className="navbar navbar-default navbar-fixed-top">
                    <a href="/" className="linkHome">
                        <div className="wrapper"></div>
                    </a>
                </nav>
                <div className="content">
                    <div className="content-bottom col-md-4 col-md-offset-4">
                        <div className="sign-up-header">Đăng nhập</div>
                        <form className="form-2" onSubmit={this.handleSubmit}>
                            <div className="form-group col-md-6">
                                <input type="text" className="form-control" id="username" name="username" placeholder="User name" value={this.state.username} onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-md-6">
                                <input type="password" className="form-control" id="password" name="password" placeholder="Password"
                                    value={this.state.password} onChange={this.handleChange} />
                            </div>
                            <div style={{margin: "2em"}}>
                                <Link to="/signup">Đăng ký tài khoản.</Link>
                            </div>
                            <button className="btn btn-primary">Đăng nhập</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignIn;