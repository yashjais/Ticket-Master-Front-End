import React from 'react'
import axios from '../../config/axios'

import TicketForm from './Form'

class TicketEdit extends React.Component {
    constructor() {
        super()
        // now will have to build a form
        this.state = {
            code : '',
            customer: '',
            department: '',
            employee: [],
            message: '',
            priority: '',

            ticket: {}
        }
    }

    componentDidMount() {
        // console.log('com')
        const id = this.props.match.params.id
        // console.log('id',id)
        axios.get(`/tickets/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                const ticket = response.data
                const code = ticket.code
                const message = ticket.message
                const priority = ticket.priority
                const employee = ticket.employees
                axios.get(`/customers/${ticket.customer}`,{
                    headers: {
                        'x-auth': localStorage.getItem('authToken')
                    }
                })
                    .then(response => {
                        const customer = response.data.name
                        console.log(customer)
                        axios.get(`/departments/${ticket.department}`, {
                            headers: {
                                'x-auth': localStorage.getItem('authToken')
                            }
                        })
                            .then(response => {
                                const department = response.data.name
                                this.setState({ticket, code, priority, employee, customer, department, message})
                            })
                            .catch(err => {
                                alert(err)
                            })
                    })
                    .catch(err => {
                        alert(err)
                    })
                
            })
    }

    handleSubmit = (formData) => {
        console.log('handleSubmit')
    }

    render() {
        // console.log('ren')
        // console.log( this.props.match.params.id,'happy')
        // console.log('len',Object.keys(this.state.ticket).length)
        console.log(this.state)
        return(
            <div>
                <h2>Ticket Edit</h2>
                {Object.entries(this.state.ticket).length != 0 && <TicketForm {...this.state} handleSubmit={this.handleSubmit}/>}
            </div>
        )
    }
}

export default TicketEdit