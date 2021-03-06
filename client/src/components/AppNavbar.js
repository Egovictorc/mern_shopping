import React, { Component, Fragment } from "react"
import {
    Navbar,
    Nav,
    NavDropdown,
    Form,
    FormControl,
    Button,
    Container
} from "react-bootstrap"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import RegisterModal from "./auth/registerModal"
import LoginModal from "./auth/loginModal"
import Logout from "./auth/logout"

// another method for using class
// class AppNavbar extends Component {

//     constructor(props) {
//         super();
//         this.state = {    }
//         this.toggle = this.toggle.bind(this)
//     }

//     toggle () {
//     }

//     render() {
//         return (
//             <Navbar>

//             </Navbar>
//         )
//     }
// }


class AppNavbar extends Component {
    state = {
        isOpen: false
    }

    static PropTypes = {
        auth: PropTypes.object.isRequired
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        const { isAuthenticated, user } = this.props;

        const authLinks = (
            <Fragment>
                <Nav.Item>
                    <span className="navbar-text mr-3">
                        <strong> {user ? `Welcome ${user.name}: null`} </strong>
                    </span>
                </Nav.Item>
                <Nav.Item>
                    <Logout />
                </Nav.Item>
            </Fragment>
        )

        const authLinks = (
            <Fragment>
                <Nav.Item>
                    <RegisterModal />
                </Nav.Item>
                <Nav.Item>
                    <LoginModal />
                </Nav.Item>
            </Fragment>
        )

        return (

            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">shopping list</Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>

                        {isAuthenticated ? authLinks : guestLinks}


                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}


const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, null)(AppNavbar);