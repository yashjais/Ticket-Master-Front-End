import React from 'react'
import axios from '../../config/axios'

import TicketForm from './Form'

class TicketNew extends React.Component {
    handleSubmit = (formData) => {
        // console.log(formData)
        // console.log(this.props)
        // console.log('in handl submit of new')
        axios.post('/tickets',formData,{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        
            .then(response => {
                console.log('res',response)
                if(response.data.hasOwnProperty('errors')) {
                    alert(response.data.message)
                }else {
                    this.props.history.push('/tickets')
                }
                })
                .catch(err => {
                    alert(err)
                })
    }

    render() {
        return (
            <div>
                <h2>Ticket New Page</h2>
                <TicketForm handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}

export default TicketNew