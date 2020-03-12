import React from 'react'
import { Link } from 'react-router-dom'

function Navigation(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" href="/">Ticket Master</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
               <div className="navbar-nav">
                    <Link to="/customers" className="nav-item nav-link">Customers</Link>
                    <Link to="/departments" className="nav-item nav-link">Departments</Link>
                    <Link to="/employees" className="nav-item nav-link">Employees</Link>
                    <Link to="/tickets" className="nav-item nav-link">Tickets</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navigation