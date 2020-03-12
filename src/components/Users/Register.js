import React from 'react'
import axios from '../../config/axios'

class Register extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
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
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }
        axios.post('/users/register',formData)
            .then(response => {
                // console.log(response)
                if(response.data.hasOwnProperty('errors')){
                    alert(response.data.message)
                }else{
                    this.props.history.push('/account/Login')
                }
            })
            .catch(err => {
                alert(err)
            })
    }

    render() {
        return (
            <div>
                <h1>Register With Us</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username">Username</label>
                        <input type="text" value={this.state.username} id="username" name="username" onChange={this.handleChange}/> <br />
                    
                    <label htmlFor="email">Email</label>
                        <input type="text" value={this.state.email} id="email" name="email" onChange={this.handleChange}/> <br />
                    
                    <label htmlFor="password">Password</label>
                        <input type="password" value={this.state.password} id="password" name="password" onChange={this.handleChange}/> <br />
                    
                    <input type="submit" />
                </form>
            </div>
        )
    }
}

export default Register