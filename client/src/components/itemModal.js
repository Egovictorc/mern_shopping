import React, { useState } from "react"
import { connect } from "react-redux"
import { addItem } from "../actions/itemActions"


import { 
 Button, Modal, Form
} from "react-bootstrap"


function ItemModal(props) {
    const [show, setShow] = useState(false);
    const [ data, setData ] = useState({
        name: ""
    })

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const handleChange = ({target}) => {
        setData(state => ({
            ...state,
            [target.name]: target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newItem =  {
            name: data.name
        }

        // add item via addItem action
        props.addItem(newItem)
        handleClose()
    }

    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Add Item
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="text--capitalize">
                add to shopping list
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <form onSubmit={handleSubmit}>
                  <Form.Group>
                      <label htmlFor="name">Item</label>
                      <input 
                      type="text"
                      placeholder="Add shopping item"
                      name="name"
                      id="name"
                        value={data.name}
                        onChange={handleChange}
                        className="form-control"
                      />
                  </Form.Group>

                  <input type="submit" value="Add Item" className="btn btn-dark" style={{marginTop: "2rem", display: "block"}} />
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
  
const mapStateToProps = state => state.item;
const mapDispatchToProps = { addItem }
export default connect(mapStateToProps, mapDispatchToProps)(ItemModal)