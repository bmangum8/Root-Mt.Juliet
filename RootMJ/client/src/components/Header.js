import React, { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { logout } from "../modules/authManager";

export default function Header({ isLoggedIn, isAdmin }) {

    const [isOpen, setIsOpen ] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand tag={RRNavLink} to="/">
                    Root Mt. Juliet
                </NavbarBrand>

                <NavbarToggler onClick={toggle} />

                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        {isLoggedIn && (
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/trees">
                                        Trees
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <a
                                        aria-current="page"
                                        className="nav-link"
                                        style={{ cursor: "pointer" }}
                                        onClick={logout}
                                    >
                                        Logout
                                    </a>
                                    </NavItem>
                 
                                    <NavItem>
                                        <NavLink tag={RRNavLink} to="/requests">
                                            Requests
                                        </NavLink>
                                    </NavItem>
                            </>
                        )}

                        {isLoggedIn && isAdmin && (
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/userProfiles">
                                        User Profiles
                                    </NavLink>
                                </NavItem>

                            </>
                        )}

                        {isLoggedIn && !isAdmin && (
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/userProfile/details">
                                        My Profile
                                    </NavLink>
                                </NavItem> 
                            </>
                        )}

                        {!isLoggedIn && (
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/login">
                                        Login
                                    </NavLink>
                                </NavItem>
                                        
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/register">
                                        Register
                                    </NavLink>
                                </NavItem>
                            </>
                        )}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>                    
    )
}