import React from 'react'
import axios from 'axios'

import EmployeeForm from './Form'

class EmployeeNew extends React.Component {
    
    handleSubmit = (formData) => {
        console.log('submit',formData)
        axios.post(`http://dct-ticket-master.herokuapp.com/employees`,formData,{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                console.log(response.data)
                if(response.data.hasOwnProperty('errors')) {
                    alert(response.data._message)
                }else {
                    this.props.history.push('/employees')
                }
            }).catch(err => {
                alert(err)
            })
    }

    render() {
        return (
            <div>
                <h1>Add Employee</h1>

                <EmployeeForm handleSubmit={this.handleSubmit} />
                
            </div>
        )
    }
}

export default EmployeeNew