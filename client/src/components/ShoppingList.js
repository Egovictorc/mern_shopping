import React, { Component } from "react"
import { Container, ListGroup, ListGroupItem, Button } from "react-bootstrap"
import { connect } from "react-redux"
import { getItems, deleteItem } from "../actions/itemActions"
import PropTypes from "prop-types"
import { CSSTransition, TransitionGroup } from "react-transition-group"



class ShoppingList extends Component {
    // state = {
    //     items: [
    //         { id: uuid(), name: "Eggs" },
    //         { id: uuid(), name: "Milk" },
    //         { id: uuid(), name: "Steak" },
    //         { id: uuid(), name: "Water" },
    //         { id: uuid(), name: "Fish" },
    //     ]
    // }


    componentDidMount() {
        this.props.getItems()
        // console.log(`props:::::: `, this.props)
    }

    onDeleteClick = (id) => {
        this.props.deleteItem(id)
    }

    render() {
        // const { items } = this.state;
        const { items }  = this.props.item;

        return (
            <Container>
                

                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({ _id, name }) => (
                            <CSSTransition key={_id} timeout={500} classnames="fade">
                                <ListGroupItem>
                                    {props.isAuthenticated ? 
                                    <Button
                                    className="remove-btn"
                                    variant="danger"
                                    onClick={
                                        this.onDeleteClick.bind(this, _id)
                                    }> &times; </Button> : null} {name} </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>

            </Container>
        )
    }
}


ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
}


const mapStateToProps = ( state => ({
    item: state.item,
    isAuthenticated: state.isAuthenticated
}))

const mapDispatchToProps = { getItems, deleteItem }

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);