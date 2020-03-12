import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'

class EmployeeShow extends React.Component {
    constructor() {
        super()
        this.state = {
            employee: {}            
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`/employees/${id}`,{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                // console.log(response.data)
                const employee = response.data
                this.setState({employee})
            })
            .catch(err => {
                alert(err)
            })
    }

    render() {
        console.log(this.state.employee)
        return (
            <div>
                <h2>Employee Show Page</h2>
                <Link to={`/employees/edit/${this.props.match.params.id}`}>Edit</Link>
                <h3>{this.state.employee.name} - {this.state.employee.email}</h3>
            </div>
        )
    }
}

export default EmployeeShow