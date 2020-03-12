import React from 'react'
import axios from '../../config/axios'

import { Link } from 'react-router-dom'

import EmployeeDetails from './EmployeesDetails'
import DepartmentsDetails from './DepartmentsDetails'

class TicketList extends React.Component {
    constructor() {
        super()
        this.state = {
            tickets: [],
            customers: [],
            employees: [],
            departments: []
        }
    }

    componentDidMount() {
        axios.get('/tickets',{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                console.log(response.data)
                const tickets = response.data
                axios.get('/customers',{
                    headers: {
                        'x-auth': localStorage.getItem('authToken')
                    }
                })
                    .then(response => {
                        const customers = response.data
                        axios.get('/employees',{
                            headers: {
                                'x-auth': localStorage.getItem('authToken')
                            }
                        })
                            .then(response => {
                                const employees = response.data
                                axios.get('/departments', {
                                    headers: {
                                        'x-auth': localStorage.getItem('authToken')
                                    }
                                })
                                    .then(response => {
                                        const departments = response.data
                                        this.setState({employees, tickets, customers, departments})
                                    })
                                
                            })
                        
                    })
                    .catch(err => {
                        alert(err)
                    })
                
            })
            .catch(err => {
                alert(err)
            })

    }

    handleRemove = (id) => {
        const confirmation = window.confirm('Are you sure you want to delete this ticket')
        if(confirmation){
            axios.delete(`/tickets/${id}`,{
                headers: {
                    'x-auth': localStorage.getItem('authToken')
                }
            })
                .then(response => {
                    const ticket =  response.data
                    this.setState(prevState => {
                        return {
                            tickets: prevState.tickets.filter(tic => tic._id != ticket._id)
                        }
                    })
                })
                .catch(err => {
                    alert(err)
                })
        }
    }

    handleResolved = (e) => {
        const id =  e.target.name
        const ticket = this.state.tickets.find(tic => tic._id == id)
        ticket.isResolved = !ticket.isResolved
        console.log(ticket,'inside')
        axios.put(`/tickets/${id}`,ticket, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                const ticket = response.data
                console.log(ticket)
                this.setState({ticket})
            })
            .catch(err => {
                alert(err)
            })
    }

    render() {
        console.log(this.state.tickets)
        console.log(this.state.employees)
        return(
            <div>
                <h2>Tickets List Page - {this.state.tickets.length}</h2>
                {
                    <table>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Customer</th>
                            <th>Department</th>
                            <th>Employees</th>
                            <th>Message</th>
                            <th>Prority</th>
                            <th>Action</th>
                            <th>Remove</th>
                            <th>Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.tickets.map(tic => {
                                return (
                                    <tr key={tic._id}>
                                        <td>{tic.code}</td>
                                        <td>{(this.state.customers.find(cus => cus._id == tic.customer)) ? this.state.customers.find(cus => cus._id == tic.customer).name : "null"}</td> 
                                        <td>{<DepartmentsDetails id={tic.department} departments={this.state.departments}/>}</td>
                                        <td>{tic.employees.map(emp => <EmployeeDetails employees={this.state.employees} _id={emp._id}/>)}</td>
                                        <td>{tic.message}</td>
                                        <td>{tic.priority}</td>
                                        <td><Link to={`/tickets/${tic._id}`}>Show</Link></td> 
                                        <td><button onClick={() => {
                                            this.handleRemove(tic._id)
                                        }}>Remove</button></td> 
                                        <td><input type="checkbox" name={tic._id} value={tic.isResolved} onChange={this.handleResolved}/></td>
                                    </tr>
                                )   
                            }) 
                        }
                    </tbody>
                </table>
                }
                <Link to="/tickets/new">Add Ticket</Link>
            </div>
        )
    }
}

export default TicketList