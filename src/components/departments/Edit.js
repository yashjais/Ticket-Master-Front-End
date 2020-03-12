import React from 'react'
import axios from '../../config/axios'

import DepartmentNew from './New'

class DepartmentEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            department: {}
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
                // console.log(response.data)
                const department = response.data
                this.setState({department})
            })
    }

    handleSubmit(newDepartment,oldDepartment) {
        let department
        axios.get('/departments',{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                // console.log(newDepartment)
                // console.log(oldDepartment)
                // console.log(response.data)
                
                if(!newDepartment){
                    alert('Value is invalid')
                }
                else if(oldDepartment === newDepartment){
                    alert('Department Name should be different')
                }
                else {
                    department = response.data.find(dep => dep.name == oldDepartment)
                    department.name = newDepartment
                    axios.put(`/departments/${department._id}`, department, {
                        headers: {
                            'x-auth' : localStorage.getItem('authToken')
                        }
                    })
                        .then(response => {
                            window.location.href = '/departments'
                        })
                        .catch(err => {
                            alert(err)
                        })
                }

            })
            .catch(err => {
                alert(err)
            })

        // console.log(this.props) // both not working
        // console.log(this.state)

    }

    render() {
        // console.log(this.props,'happy')
        return (
            <div>
                <h2>Department Edit page</h2>

                {Object.entries(this.state.department).length !=0 && <DepartmentNew name={this.state.department.name} handleSubmit={this.handleSubmit}/>}
            </div>
        )
    }
}

export default DepartmentEdit
