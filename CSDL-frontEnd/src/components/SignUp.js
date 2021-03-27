import React, { Component } from "react";
import "../Css/sign-up.css";
import axios from "../axios";
import Navbar from "./NavBar";
var errors = {};
class SignUp extends Component {
  state = {
    username: "",
    password: "",
    passwordcf: "",
    name: "",
    phone: "",
    address: "",
    hasAgreed: false,
  };
  handleChange = event => {
    let target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (Object.keys(errors).length === 0) {
      if (this.state.passwordcf === this.state.password) {
        axios
          .post("/customer/register", {
            username: this.state.username,
            password: this.state.password,
            name: this.state.name,
            address: this.state.address,
            phone: this.state.phone,
          })
          .then(data => {
            if (data.data.success === false) {
              return alert("Username has been used");
            }
            alert("Đăng ký thành công.");
            setTimeout(function () {
              window.location.href = "/signin";
            }, 1000);
          })
          .catch(err => console.log(err.data));
      } else {
        alert("Mật khẩu nhập lại không đúng");
      } 
    } else { alert("Kiểm tra lại thông tin đăng ký.")}
    // console.log(this.state);
  };

  render() {
    if (this.state.username.length < 10) {
      console.log(this.state.username.length);
      errors.username = "Tên đăng nhập phải dài hơn 10 kí tự.";
    } else {
      delete errors.username;
    }
    if (this.state.password.length < 8) {
      errors.password = "Mật khẩu phải nhiều hơn 8 ký tự.";
    } else delete errors.password;
    if (
      this.state.passwordcf !== this.state.password ||
      this.state.passwordcf.length < 8
    ) {
      errors.passwordcf = "Yêu cầu trùng với mật khẩu kể trên.";
    } else delete errors.passwordcf;
    if (this.state.name === "") {
      errors.name = "Không được để trống.";
    } else delete errors.name
    if (this.state.phone === "") {
      errors.phone = "Không được để trống.";
    } else delete errors.phone;
    if (this.state.address === "") {
      errors.address = "Không được để trống.";
    } else delete errors.address;
    if (this.state.hasAgreed === false) {
      errors.hasAgreed = "Bạn cần xác nhận thông tin chính xác.";
    } else delete errors.hasAgreed;

    return (
      <div>
        <Navbar />
        <div className="signup">
          <div className="signup-bottom">
            <div className="sign-up-header">Đăng ký tài khoản</div>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="inputAddress">Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="User name"
                  id="username"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
                {errors.username ? (
                  <p style={{ color: "red" }}>{errors.username}</p>
                ) : (
                  <p></p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="inputAddress">Mật khẩu</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  id="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                {errors.password ? (
                  <p style={{ color: "red" }}>{errors.password}</p>
                ) : (
                  <p></p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="inputAddress">Xác nhận mật khẩu</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password Confirm"
                  id="passwordcf"
                  name="passwordcf"
                  value={this.state.passwordcf}
                  onChange={this.handleChange}
                />
                {errors.passwordcf ? (
                  <p style={{ color: "red" }}>{errors.passwordcf}</p>
                ) : (
                  <p></p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="inputAddress">Tên khách hàng</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full Name"
                  id="name"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                {errors.name ? (
                  <p style={{ color: "red" }}>{errors.name}</p>
                ) : (
                  <p></p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="inputAddress">Điện thoại</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Phone"
                  id="phone"
                  name="phone"
                  value={this.state.phone}
                  oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                  onChange={this.handleChange}
                />
                {errors.phone ? (
                  <p style={{ color: "red" }}>{errors.phone}</p>
                ) : (
                  <p></p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="inputAddress">Địa chỉ</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Adress"
                  id="address"
                  name="address"
                  value={this.state.address}
                  onChange={this.handleChange}
                />
                {errors.address ? (
                  <p style={{ color: "red" }}>{errors.address}</p>
                ) : (
                  <p></p>
                )}
              </div>
              <div className="form-group">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                    id="hasAgreed"
                    name="hasAgreed"
                    value={this.state.hasAgreed}
                    onChange={this.handleChange}
                  />
                  <label className="form-check-label" htmlFor="gridCheck">
                    Xác nhận
                  </label>
                  {errors.hasAgreed ? (
                    <p style={{ color: "red" }}>{errors.hasAgreed}</p>
                  ) : (
                    <p></p>
                  )}
                </div>
              </div>
              {Object.keys(errors).length !== 0 ? (
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    console.log("errors", errors);
                  }}
                >
                  Đăng ký
                </button>
              ) : (
                <button onClick={this.handleSubmit} className="btn btn-primary">
                  Đăng ký
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
