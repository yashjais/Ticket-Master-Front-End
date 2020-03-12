import React from 'react'
import axios from '../../config/axios'

import { Link } from 'react-router-dom'

class DepartmentShow extends React.Component {
    constructor() {
        super()
        this.state = {
            department: {},
            employees: [],
            uncatagorized: []
        }
    }
    
    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`/departments/${id}`,{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                console.log(response.data)
                const department = response.data
                this.setState({department})
                axios.get(`/employees`,{
                    headers: {
                        'x-auth': localStorage.getItem('authToken')
                    }
                })
                    .then(response => {
                        // console.log('emp info',response.data)
                        // console.log('dep name', department)
                        const allEmployees = response.data
                        const employees = allEmployees.filter(emp => (emp.department && emp.department.name) == (department.name))
                        if(department.name == 'uncatagorized'){
                            const uncatagorized = allEmployees.filter(emp => emp.department == null)
                            this.setState({uncatagorized})
                        }
                        this.setState({employees})
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
        console.log(this.state.employees, this.state.uncatagorized)
        return (
            <div>
                <h2>Show Dep Page</h2>
                <Link to={`/departments/edit/${this.props.match.params.id}`}>edit</Link>
                <h3>Department Name - {this.state.department.name}</h3>
                <h4>Employees belonging to this department: {this.state.employees.length == 0 ? this.state.uncatagorized.length : this.state.employees.length}</h4>

                {this.state.employees.length == 0 ? this.state.uncatagorized.map((unc => {
                    return <li key={unc._id}>{unc.name}</li>
                })) : (
                    this.state.employees.length == 0 ? <h4>No employees found</h4> : ( this.state.employees.map(emp => {
                    return <li key={emp._id}>{emp.name}</li>
                })
                    )
            )}
                

                <h3><Link to="/departments">Back</Link></h3>
            </div>
        )
    }
}

export default DepartmentShow