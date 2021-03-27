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

const Report = () => {
  const [listProduct, setListProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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
    axios.get("/admin/revenue").then(data => {
        setListProduct(data.data.data);
    });
  }, []);
  const SignOut = () => {
    localStorage.removeItem("username")
    localStorage.removeItem('cart')
    window.location.href = '/'
  }
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
//   useEffect(() => {
//     const result = listUserData.filter(
//       user =>
//         xoa_dau(user.username)
//           .toLowerCase()
//           .includes(xoa_dau(searchTerm).toLowerCase()) ||
//         xoa_dau(user.name)
//           .toLowerCase()
//           .includes(xoa_dau(searchTerm).toLowerCase())
//     );
//     setListUser(result);
//   }, [listUserData, searchTerm]);
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
                    <Link to="/admin" className="linkNormal">
                      <h2  >Thành viên</h2>
                    </Link>
                  </li>
                  <li>
                    <Link to="/report"  className="link-Employees">
                      <h2>Doanh thu</h2>
                    </Link>
                  </li>
                </ul>
              </Col>
              <Col md={10} className="maintainEmployee">

                <Table responsive>
                  <thead>
                    <tr className="row-header" id={0}>
                      <th>Tên mặt hàng</th>
                      <th>Doanh thu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listProduct.length > 0 ? (
                      listProduct.map((data, index) => (
                        <tr id={index} className="row-employees">
                          <td>{data.Name || ""}</td>
                          <td>{numberWithCommas(data.value)}</td>
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
    </>
  );
};
export default Report;
