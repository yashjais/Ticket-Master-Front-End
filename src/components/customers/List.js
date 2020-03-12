import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

class CustomerList extends React.Component {
    constructor() {
        super() 
        this.state = {
            customers: []
        }
    }

    componentDidMount() {
        axios.get('/customers', {
            headers: {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response => {
            console.log(response.data)
            const customers = response.data
            this.setState({customers})
        })
    }

    handleRemove = (id) => {
        // console.log(id)
        // alert('deleting')
        Swal.fire({
            title: 'Are you sure?',
            text: "Your Customer will be gone",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
                axios.delete(`/customers/${id}`,{
                    headers: {
                        'x-auth': localStorage.getItem('authToken')
                    }
                })
                    .then(response => {
                        // console.log(response.data)
                        this.setState(prevState => {
                            return {
                                customers: prevState.customers.filter(cus => cus._id != id)
                            }
                        })
                    })
                    Swal.fire(
                        'Deleted!',
                        'Your Customer has been deleted.',
                        'success'
                    )
            }
          })
    }

    render() {
        console.log(this.state.customers)
        return (
            <div>
                <h1>Listing Customers - {this.state.customers.length } </h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>name</th>
                            <th>email</th>
                            <th>mobile</th>
                            <th>action</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            
                            this.state.customers.map((customer, i) => {
                            return (
                                        <tr key={customer._id}>
                                            <th> {i + 1} </th>
                                            <th> <Link to={`/customers/${customer._id}`}>{customer.name}</Link> </th> 
                                            <th> {customer.email} </th>
                                            <th> {customer.mobile} </th>
                                            <th> <button className="btn btn-outline-primary"><Link to={`/customers/${customer._id}`}>show</Link></button> </th>
                                            <th> <button className="btn btn-danger" onClick={() => {
                                                    this.handleRemove(customer._id)
                                                }}>Remove</button> 
                                            </th>
                                        </tr>
                                    )
                            })
                    
                        } 
                    </tbody>

                </table>

                <Link to="/customers/new">Add customer</Link>
            </div>
        )
    }
}

export default CustomerList