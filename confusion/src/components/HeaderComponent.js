import React from "react";
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem,  Jumbotron } from 'reactstrap';
import { NavLink } from 'react-router-dom';

function Header() {
    return(
        <div>
            <Navbar dark>
                <div className="container">
                    <NavbarBrand className="mr-auto" href="/">
                        <img src="assets/images/logo.png" height="30" width="41" alt="Ứng dụng quản lý nhân viên v2.0" />
                    </NavbarBrand>
                    <Nav>
                        <NavItem>
                            <NavLink className="nav-link" to="/staffs">
                                <span className="fa fa-user fa-lg"></span> Nhân Viên
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/departments">
                                <span className="fa fa-user fa-lg"></span> Phòng Ban
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/salary">
                                <span className="fa fa-user fa-lg"></span> Bảng Lương
                            </NavLink>
                        </NavItem>
                    </Nav>
                </div>
            </Navbar>
        </div>
    );
}

export default Header;