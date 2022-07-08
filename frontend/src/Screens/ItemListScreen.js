import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
// import Paginate from '../components/Paginate'
import { listItems, deleteItem, createItem } from '../actions/itemActions'
import {useNavigate,useLocation} from "react-router-dom";


function ItemListScreen() {



    const navigate = useNavigate();
    const dispatch = useDispatch()
    let location = useLocation();


    const itemList = useSelector(state => state.itemList)
    const { loading, error, items, pages, page } = itemList

    const itemDelete = useSelector(state => state.itemDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = itemDelete

    const itemCreate = useSelector(state => state.itemCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, item: createdProduct } = itemCreate


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    // let keyword = location.search

    // console.log(keyword)
    useEffect(() => {
        dispatch({ type: 'ITEM_CREATE_RESET' })

        if (!userInfo.isAdmin) {
            navigate('/login')
        }

        if (successCreate) {
            navigate(`/admin/item/${createdProduct._id}/edit`)
        } else {
            // dispatch(listItems(keyword))
            dispatch(listItems())
        }

    }, [dispatch, navigate, userInfo, successDelete, successCreate, createdProduct])//keyword


    const deleteHandler = (id) => {

        if (window.confirm('Are you sure you want to delete this item?')) {
            dispatch(deleteItem(id))
        }
    }
    // console.log(items)


    const createProductHandler = () => {
        dispatch(createItem())
    }

    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Items</h1>
                </Col>

                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create Item
                    </Button>
                </Col>
            </Row>

            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}


            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <div>
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th>PRICE</th>
                                        <th>PREPARATION TIME</th>
                                        <th>CATEGORY</th>
                                        <th>EDIT/DELETE</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {items.map(item => (
                                        <tr key={item._id}>
                                            <td>{item._id}</td>
                                            <td>{item.title}</td>
                                            <td>Rs {item.price}</td>
                                            <td>{item.preparationTime} min.</td>

                                            <td>{item.category}</td>

                                            <td>
                                                <LinkContainer to={`/admin/item/${item._id}/edit`}>
                                                    <Button variant='light' className='btn-sm'>
                                                        <i className='fas fa-edit'></i>
                                                    </Button>
                                                </LinkContainer>

                                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(item._id)}>
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            {/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
                        </div>
                    )}
        </div>
    )
}

export default ItemListScreen