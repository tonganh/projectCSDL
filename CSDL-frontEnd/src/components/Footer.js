import React, { Component } from 'react';
import '../Css/home.css';
import logo from '../Images/logo_05.png';

class Footer extends Component {
    render() {
        return (
            // footer
            <div className="footer">
                <div className="top-footer">
                    <div className="col-md-6 footer-left">
                        <div className="top-footer-left-logo">
                            <img src={logo} alt="logo"/>
                        </div>
                        <div className="top-footer-left-description">
                            <h3>
                                Được thành lập vào cuối năm 2020. Tiên phong trong công cuộc áp dụng khoa học
                                và công nghệ vào đời sống.
                            </h3>
                        </div>
                        <div className="top-footer-left-icon">
                            <a href="https://www.facebook.com/chemistryismylove/" target="__blank"><i className="fab fa-facebook"></i></a>
                            <a href="https://www.youtube.com/channel/UC31A9MHOnRJNPJe3TbCvTdA" target="__blank"><i className="fab fa-youtube"></i></a>
                            <a href="https://www.instagram.com/anh.tn4040/?hl=vi" target="__blank"><i className="fab fa-instagram"></i></a>
                            <a href="mailto:anh.tn184004@sis.hust.edu.vn" target="__blank"><i className="fas fa-envelope-square"></i></a>
                        </div>
                    </div>
                    <div className="col-md-6 footer-left">
                            <div className="top-footer-right-header">
                                <h2>Thông tin liên hệ</h2>
                            </div>
                            <div className="top-footer-right-content">
                                <div className="info location">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <div>
                                        <h3>Địa chỉ</h3>
                                        <p>
                                            Việt Nhật 01-K63.
                                        </p>
                                    </div>
                                </div>
                                <div className="info phone">
                                    <i className="fas fa-phone"></i>
                                    <div>
                                        <h3>Điện thoại</h3>
                                        <p>0369037471</p>
                                    </div>
                                    
                                </div>
                                <div className="info mail">
                                    <i className="fas fa-envelope-open-text"></i>
                                    <div>
                                        <h3>Email</h3>  
                                        <p>anh.tn184040@sis.hust.edu.vn</p>
                                    </div>
                                    
                                </div>
                            </div>
                    </div>
                </div>
                <div className="bottom-footer"></div>
            </div>
        );
    }
}

export default Footer;