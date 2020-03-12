import React from 'react'
import axios from '../../config/axios'

import CustomerForm from './Form'

class CustomerEdit extends React.Component {
    constructor() {
        super()
        this.state = {
            customer: {}
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`/customers/${id}`,{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                const customer = response.data
                this.setState({customer})
            })
            .catch(err => {
                alert(err)
            })
    }

    handleSubmit = (formData) => {
        const id = this.state.customer._id
        axios.put(`/customers/${id}`,formData,{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                const customer = response.data
                // console.log(customer)
                this.props.history.push(`/customers/${customer._id}`)
            })
    }

    render() {
        return (
            <div>
                <h2>Edit Customer</h2>
                {
                    Object.entries(this.state.customer).length != 0 && <CustomerForm {...this.state.customer} handleSubmit={this.handleSubmit}/>
                }
            </div>
        )
    }
}

export default CustomerEdit 