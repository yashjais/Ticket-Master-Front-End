import React from 'react'
import axios from 'axios'

class EmployeeForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: props.name ? props.name : '',
            email: props.email ? props.email : '',
            mobile: props.mobile ? props.mobile : '',
            departments: [],
            department: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile,
            department: this.state.department
        }
        this.props.handleSubmit(formData)
    }

    handleSelect = (e) => {
        const department = e.target.value
        this.setState({department}) 
    }

    componentDidMount() {
        axios.get('http://dct-ticket-master.herokuapp.com/departments',{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                // console.log(response.data)
                const departments = response.data
                this.setState({departments})
            })
            .catch(err => {
                alert(err)
            })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input name="name" type="text" value={this.state.name} id="name" onChange={this.handleChange} /> <br/>

                    <label htmlFor="email">Email</label>
                    <input name="email" type="text" value={this.state.email} id="email" onChange={this.handleChange} /> <br/>

                    <label htmlFor="mobile">Mobile</label>
                    <input name="mobile" type="text" value={this.state.mobile} id="mobile" onChange={this.handleChange} /> <br/>

                    <label>Department</label>
                    <select onChange={this.handleSelect}>
                        <option value="">Department</option>
                        {
                            this.state.departments.map(dep => {
                                return (
                                    <option key={dep._id} value={dep._id}>{dep.name}</option>
                                )
                            })
                        }
                    </select> <br/>
                    <input type="submit" /> 
                </form>
            </div>
        )
    }
}

export default EmployeeForm