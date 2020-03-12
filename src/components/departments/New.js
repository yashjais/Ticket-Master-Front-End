import React from 'react'

class DepartmentNew extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            input: this.props ? this.props.name : '',
            prevInput: this.props ? this.props.name : null
        }    
    }

    handleChange = (e) => {
        const input = e.target.value
        this.setState({input})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const input = this.state.input
        // console.log('inside new handleSubmit', input, this.state.prevInput)
        this.props.handleSubmit(input, this.state.prevInput)
        this.setState({input: ''})    
    }

    render() {
        // console.log(,'inside form')
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input className="form-control" type="text" value={this.state.input} onChange={this.handleChange} /> <br/>
                        <input type="submit" value="Add"/>
                    </div>
                </form> 
            </div>
        )
    }
}

export default DepartmentNew