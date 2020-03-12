import React from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'

import Home from './components/Users/Home'
import Register from './components/Users/Register'
import Login from './components/Users/Login'

import Navigation from './statics/navigation'

import CustomerList from './components/customers/List'
import CustomerNew from './components/customers/New'
import CustomerShow from './components/customers/Show'
import CustomerEdit from './components/customers/Edit'

import DepartmentList from './components/departments/List'
import DepartmentShow from './components/departments/Show'
import DepartmentEdit from './components/departments/Edit'

import EmployeeList from './components/employees/List'
import EmployeeNew from './components/employees/New'
import EmployeeShow from './components/employees/Show'
import EditEmployees from './components/employees/Edit'

import TicketList from  './components/tickets/List' 
import TicketNew from   './components/tickets/New'
import TicketShow from  './components/tickets/Show'
import TicketEdit from  './components/tickets/Edit'

function App(props) {
    // console.log(props) // empty object
    const handleLogout = () => {
        localStorage.removeItem('authToken')
        window.location.href = '/account/login' // reload the page too
        // props.history.push('/account/login') // don't work here coz we don't have access to BrowserRouter of react-router-dom
    }

    return (
        <BrowserRouter>
            <div className="container">
                <Navigation />
                <br/>
                <Link to="/">Home</Link>
                {
                    localStorage.getItem('authToken') ? (
                        <div> 
                            <Link to="/customers">Customers</Link>
                            <Link to="/departments">Departments</Link>
                            <Link to="/employees">Employees</Link>
                            <Link to="/tickets">Tickets</Link>
                            <Link to="#" onClick={handleLogout}>Logout</Link>
                        </div>
                    ) : (
                        <div>
                            <Link to="/account/login">Login</Link>
                            <Link to="/account/register">Register</Link> 
                        </div>
                    )
                }
                
                <Switch>
                        
                    <Route path="/" component={Home} exact={true} />
                    <Route path="/account/login" component={Login} />
                    <Route path="/account/register" component={Register} />

                    <Route path="/customers" component={CustomerList} exact={true} />
                    <Route path="/customers/new" component={CustomerNew} />
                    <Route path="/customers/edit/:id" component={CustomerEdit} />
                    <Route path="/customers/:id" component={CustomerShow} />

                    <Route path="/departments" component={DepartmentList} exact={true} />
                    <Route path="/departments/edit/:id" component={DepartmentEdit} />
                    <Route path="/departments/:id" component={DepartmentShow} />

                    <Route path="/employees" component={EmployeeList} exact={true} />
                    <Route path="/employees/new" component={EmployeeNew} />
                    <Route path="/employees/edit/:id" component={EditEmployees} />
                    <Route path="/employees/:id" component={EmployeeShow} />

                    <Route path="/tickets" component={TicketList} exact={true} />
                    <Route path="/tickets/new" component={TicketNew} />
                    <Route path="/tickets/edit/:id" component={TicketEdit} />
                    <Route path='/tickets/:id' component={TicketShow} />

                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default App