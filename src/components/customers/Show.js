import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'

class CustomerShow extends React.Component {
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
            .then(resolve => {
                const customer = resolve.data
                this.setState({customer})
            })
            .catch(err => {
                alert(err)
            })

    }

    render() {
        return (
            <div>
                <h2>Customer Show Page - {this.props.match.params.id}</h2>
                {/*because the page will take time to reload if we use this.state.customers - before the state loads if user click the link it will be set to undefined, that's why we will this.state.props */}
                <Link to={`/customers/edit/${this.props.match.params.id}`}>Edit</Link>
                <h3>{this.state.customer.name} - {this.state.customer.email} - {this.state.customer.mobile}</h3>
                <Link to="/customers">back</Link>
            </div>
        )
    }
}

export default CustomerShow