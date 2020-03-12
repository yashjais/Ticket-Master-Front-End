import React from 'react' 
import axios from '../../config/axios'

import CustomerForm from './Form'

class CustomerNew extends React.Component {
    handleSubmit = (formData) => {
        axios.post('/customers', formData, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response => {
            console.log(response.data)
            if(response.data.hasOwnProperty('errors')) {
                alert(response.data.message)
            }else {
                this.props.history.push('/customers')
            }
        })
    }

    render() {
        return (
            <div> 
                <h1>Add Customer</h1>

                <CustomerForm handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}

export default CustomerNew