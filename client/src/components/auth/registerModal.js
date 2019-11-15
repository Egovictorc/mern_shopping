import React, { useState } from "react"
import { connect } from "react-redux"
// import { addItem } from "../actions/itemActions"
import PropTypes from "prop-types"
import { register } from "../../actions/authActions"
import { clearErrors } from "../../actions/errorActions"
import { 
 Button, Modal, Form, Nav, Alert
} from "react-bootstrap"


function RegisterModal(props) {
    const [show, setShow] = useState(false);
    const [ data, setData ] = useState({
        name: "",
        email: "",
        password: "",
        msg: null
    })

    const handleClose = () => {
        props.clearErrors()
        setShow(false)
    };
    const handleShow = () =>  setShow(true)
    
    const handleChange = ({target}) => {
        setData(state => ({
            ...state,
            [target.name]: target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const { name, email, password} = data;

        // create user object
        const newUser = {
            name, email, password
        }
        // Attempt to register new user
        props.register(newUser)
    }

    React.useEffect(()=> {
        const { error, isAuthenticated } = props;
        if(error.id === "REGISTER_FAIL" ) {
            setData(data => ({...data, msg: props.error.msg.msg}))
        } else {
            setData({
                ...data, msg: null
            })
        }

        // if authenticated close modal
        if(show) {
            if(isAuthenticated) {
                handleClose()
            }
        }

    }, [props.error])
    return (
      <>
      <Nav.Link  onClick={handleShow}> Register </Nav.Link>
        {/* <Button variant="primary" onClick={handleShow}>
          Add Item
        </Button> */}
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="text--capitalize">
                Register
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              { data.msg ? <Alert variant="danger">{data.msg}</Alert>: null}
              <form onSubmit={handleSubmit}>
                  <Form.Group>
                      <label htmlFor="name">Name</label>
                      <input 
                      type="text"
                      placeholder="Name"
                      name="name"
                      id="name"
                        value={data.name}
                        onChange={handleChange}
                        className="form-control"
                      />
                  </Form.Group>

                  <Form.Group>
                      <label htmlFor="email">Email</label>
                      <input 
                      type="email"
                      placeholder="Email"
                      name="email"
                      id="email"
                        value={data.email}
                        onChange={handleChange}
                        className="form-control"
                      />
                  </Form.Group>
                  <Form.Group>
                      <label htmlFor="password">Password</label>
                      <input 
                      type="password"
                      placeholder="Password"
                      name="password"
                      id="password"
                        value={data.password}
                        onChange={handleChange}
                        className="form-control"
                      />
                  </Form.Group>

                  <input type="submit" value="Register" className="btn btn-dark" style={{marginTop: "2rem", display: "block"}} />
              </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

RegisterModal.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
} 

const mapDispatchToProps = {register, clearErrors}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal)