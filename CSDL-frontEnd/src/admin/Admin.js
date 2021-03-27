import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import "./admin.css";
import axios from "../axios";
import { Link } from "react-router-dom";

const Admin = () => {
  const [listUser, setListUser] = useState([]);
  const [listUserData, setListUserData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [addUser, setAddUser] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);
  const [updateUser, setUpdateUser] = useState(false);
  const initialSate = {
    name: "",
    password: "",
    username: "",
    phone: "",
    addesss: "",
    permission: "0001",
  };
  const [inputState, setInputSate] = useState(initialSate);
  const handleChangeInput = e => {
    setInputSate({ ...inputState, [e.target.name]: e.target.value });
    console.log('event', inputState);
  };
  const handleChangeSearchInput = e => {
    setSearchTerm(e.target.value);
    console.log(e.target.value);
  };
  const xoa_dau = str => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
  };
  useEffect(() => {
    axios.get("/admin/user-list").then(data => {
      setListUserData(data.data.listUser);
    });
  }, []);
  const acpCreateUser = (e) => {
    e.preventDefault();
    axios.post('/customer/register', inputState).then(data => {
      listUserData.push(inputState);
      setInputSate(initialSate);
      setAddUser(false);
    }).catch(err => {
      console.log('err', err);
      setAddUser(false);
    })
  }
  const acptDeleteUser = (e) => {
    e.preventDefault();
    axios.post('/admin/delete', inputState).then(data => {
      const result = listUserData.filter(user => user.username !== inputState.username);
      setListUserData(result);
      setDeleteUser(false);
    }).catch(err => {
      setDeleteUser(false);
      console.log('123', err);
    })
  }
  const SignOut = () => {
    localStorage.removeItem("username")
    localStorage.removeItem('cart')
    window.location.href = '/'
  }
  const submitUpdate = (e) => {
    e.preventDefault();
    axios.post('/admin/update-user', inputState).then(data => {
      if (data.data.message === "ok") {
        setListUser(listUser.map((user) =>
          user.username === inputState.username ? inputState : user))
        setUpdateUser(false);
      }
    })
  }
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  useEffect(() => {
    console.log('123123');
    setListUser(listUserData);
  }, [listUserData]);
  useEffect(() => {
    const result = listUserData.filter(
      user =>
        xoa_dau(user.username)
          .toLowerCase()
          .includes(xoa_dau(searchTerm).toLowerCase()) ||
        xoa_dau(user.name)
          .toLowerCase()
          .includes(xoa_dau(searchTerm).toLowerCase())
    );
    setListUser(result);
  }, [listUserData, searchTerm]);
  return (
    <>
      <div className="EmployeePage">
        <div className="topProject">
          <div className="dashBoardTitle">
            <div className="md-col-6">
              <h1 className="hiSoftText">ICHI</h1>
            </div>
            <Button
              onClick={SignOut}
              className="_logOut"
            >
              Log Out
            </Button>
          </div>
        </div>
        <div className="bodyDashboard">
          <Container fluid>
            <Row>
              <Col md={2} xs={12} className="FirstColumnInEmployee col-sm">
                <ul className="listSelectAdmin">

                  <li>
                    <Link to="/admin">
                      <h2 className="link-Employees" >Thành viên</h2>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/report" className="linkNormal">
                      <h2>Doanh thu</h2>
                    </Link>
                  </li>
                </ul>
              </Col>
              <Col md={10} className="maintainEmployee">
                <div className="main-header">
                  <h2>Danh sách thành viên trong hệ thống</h2>
                  <Row>
                    <Col md={6}>
                      <Button
                        className="buttonDashBoard"
                        onClick={() => {
                          setAddUser(true);
                          setInputSate(initialSate);
                        }}
                      >
                        Thêm mới
                      </Button>
                    </Col>
                    <Col
                      md={{ span: 6, offset: 6 }}
                      className=" m-auto d-flex justify-content-lg-end"
                    >
                      <InputGroup className="mb-3 search-header">
                        <FormControl
                          placeholder="Tìm kiếm"
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                          className="input-search flex-grow-9"
                          onChange={handleChangeSearchInput}
                          value={searchTerm}
                        />
                        <Button className="button-search">
                          <i className="fas fa-search" />
                        </Button>
                      </InputGroup>
                    </Col>
                  </Row>
                </div>
                <Table responsive>
                  <thead>
                    <tr className="row-header" id={0}>
                      <th>Tên</th>
                      <th>Username</th>
                      <th>Điện thoại</th>
                      <th>Địa chỉ</th>
                      <th>Số tiền đã chi tiêu</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listUser.length > 0 ? (
                      listUser.map((data, index) => (
                        <tr id={index} className="row-employees">
                          <td>{data.name || ""}</td>
                          <td>{data.username || ""}</td>
                          <td>{data.phone}</td>
                          <td>{data.address}</td>
                          <td>{numberWithCommas(data.TotalPayment)}</td>
                          <td>
                            <Button
                              className="_button-edit"
                              onClick={() => {
                                setInputSate(data);
                                setUpdateUser(true);
                              }}
                            >
                              Sửa
                            </Button>
                            <Button
                              className="_button-delete btn-danger"
                              onClick={() => {
                                setInputSate(data);
                                setDeleteUser(true);
                              }}
                            >
                              Xóa
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                        <tr id={0}>
                          <td>Have some trouble</td>
                        </tr>
                      )}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      {/* Create user */}
      <Modal show={addUser} onHide={() => { setAddUser(false) }}>
        <Modal.Header closeButton>
          <Modal.Title>Tạo mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label htmlFor="Name">Tên người dùng muốn tạo:</Form.Label>
              <Form.Control type="text" name="name" id="Name" onChange={handleChangeInput} value={inputState.name}></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="username">Username:</Form.Label>
              <Form.Control type="text" name="username" id="Username" onChange={handleChangeInput} value={inputState.username}></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">Mật khẩu:</Form.Label>
              <Form.Control type="text" name="password" id="password" onChange={handleChangeInput} value={inputState.password}></Form.Control>
            </Form.Group><Form.Group>
              <Form.Label htmlFor="Phone">Số điện thoại:</Form.Label>
              <Form.Control type="text" name="phone" id="Phone" onChange={handleChangeInput} value={inputState.phone}></Form.Control>
            </Form.Group><Form.Group>
              <Form.Label htmlFor="address">Địa chỉ:</Form.Label>
              <Form.Control type="text" name="address" id="address" onChange={handleChangeInput} value={inputState.address}></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={acpCreateUser} >Tạo</Button>
          <Button onClick={() => { setAddUser(false) }}>Hủy</Button>
        </Modal.Footer>
      </Modal>
      {/* Delete user */}
      <Modal show={deleteUser} onHide={() => { setDeleteUser(false) }} >
        <Modal.Header>
          <Modal.Title>Xác nhận từ admin.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Modal.Title>Chắc chắn muốn xóa</Modal.Title>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={acptDeleteUser}>Xóa</Button>
          <Button onClick={() => { setDeleteUser(false) }}>Hủy</Button>
        </Modal.Footer>
      </Modal>
      {/* Update User */}
      <Modal show={updateUser} onHide={() => { setUpdateUser(false) }}>
        <Modal.Header>
          <Modal.Title>Admin.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label htmlFor="Name">Tên:</Form.Label>
              <Form.Control type="text" name="name" id="Name" onChange={handleChangeInput} value={inputState.name}></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">Mật khẩu:</Form.Label>
              <Form.Control type="text" name="password" id="password" onChange={handleChangeInput} value={inputState.password}></Form.Control>
            </Form.Group><Form.Group>
              <Form.Label htmlFor="Phone">Số điện thoại:</Form.Label>
              <Form.Control type="text" name="phone" id="Phone" onChange={handleChangeInput} value={inputState.phone}></Form.Control>
            </Form.Group><Form.Group>
              <Form.Label htmlFor="address">Địa chỉ:</Form.Label>
              <Form.Control type="text" name="address" id="address" onChange={handleChangeInput} value={inputState.address}></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={submitUpdate}>Cập nhật</Button>
          <Button onClick={() => { setUpdateUser(false) }} className="btn btn-danger">Hủy</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Admin;
