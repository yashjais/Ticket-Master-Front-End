import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import EmployeeDetails from './EmployeesDetails'
import DepartmentDetails from './DepartmentsDetails'
import TicketEdit from './Edit'

class TicketShow extends React.Component{
    constructor() {
        super()
        this.state = {
            ticket: {},
            employees: [],
            customer: {}
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        
        axios.get(`http://dct-ticket-master.herokuapp.com/tickets/${id}`,{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                // console.log('response',response)

                const ticket = response.data
                let customer
                axios.get(`http://dct-ticket-master.herokuapp.com/customers/${ticket.customer}`,{
                    headers: {
                        'x-auth': localStorage.getItem('authToken')
                    }
                })
                    .then(response => {
                        // console.log('customers',response.data)
                        customer = response.data
                    })
                    .catch(err => {
                        alert(err)
                    })
                const promises = []
                ticket.employees.forEach(emp => {
                    const id = emp._id
                    console.log(id)
                    promises.push(axios.get(`http://dct-ticket-master.herokuapp.com/employees/${id}`,{
                        headers: {
                            'x-auth': localStorage.getItem('authToken')
                        }
                    }))
                })
                axios.all(promises)
                    .then(response => {
                        // console.log(response)
                        const employees = []
                        response.forEach(emp => {
                            employees.push(emp.data)
                        })
                        this.setState({ticket, employees, customer})
                    })
                    .catch(err => {
                        alert(err)
                    })
                
            })
            .catch(err => {
                alert(err)
            })
    }

    render() {
        // console.log(this.props, 'porps')
        console.log(this.state.employees, 'tickethshow')
        console.log(this.state.ticket)
        return(
            <div>
                <h2>Code Number - {this.state.ticket.code}</h2>
                <h3>Customer - {this.state.customer ? this.state.customer.name : "null"}</h3>
                <h3>Employees - {this.state.employees.map(emp => <EmployeeDetails employees={this.state.employees} _id={emp._id}/>)}</h3>
                <h3>Department - {this.state.employees[0] && ( this.state.employees[0].department && (this.state.employees[0].department.name))}</h3>
                <h3>Message - {this.state.ticket.message}</h3>
                <h3>Priority - {this.state.ticket.priority}</h3>
                <Link to={`/tickets/edit/${this.props.match.params.id}`}>Edit</Link>
            </div>
        )
    }
}

export default TicketShow