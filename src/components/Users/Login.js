import React from 'react'
import axios from '../../config/axios'

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
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
            email: this.state.email,
            password: this.state.password
        }
        // console.log(formData)
        axios.post('/users/login',formData)
            .then(response => {
                console.log(response.data)
                if(response.data.hasOwnProperty('error')){
                    alert(response.data.error)
                }else{
                    const token = response.data.token
                    localStorage.setItem('authToken', token)
                    this.props.history.push('/')
                    window.location.reload()
                }
            })
            .catch(err => {
                alert(err)
            })
    }

    render() {
        return (
            <div>   
                <h1>Login Page</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" value={this.state.email} id="email" onChange={this.handleChange} /> <br/>

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={this.state.password} id="password" onChange={this.handleChange} /> <br/>

                    <input type="submit" />
                </form>
            </div>
        )
    }
}

export default Login