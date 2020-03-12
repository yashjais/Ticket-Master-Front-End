import React from 'react'
import axios from '../../config/axios'
import EmployeeForm from './Form'

class EditEmployees extends React.Component {
    constructor() {
        super()
        this.state = {
            employee: {}
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        // console.log(id)
        axios.get(`/employees/${id}`,{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                const employee = response.data
                this.setState({employee})
            })
            .catch(err => {
                alert(err)
            })
    }

    handleSubmit = (formData) => {
        axios.put(`/employees/${this.props.match.params.id}`, formData,  {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                const employee = response.data
                this.props.history.push(`/employees/${employee._id}`)
            })
            .catch(err => {
                alert(err)
            })
    }

    render() {
        console.log(this.props.match.params.id)
        return (
            <div>
                <h3>Edit Employees</h3>
                {Object.entries(this.state.employee).length != 0 && <EmployeeForm {...this.state.employee} handleSubmit = {this.handleSubmit} />}
            </div>
        )
    }
}

export default EditEmployees