import React from 'react' 
import axios from '../../config/axios'
import Select from 'react-select'

class TicketForm extends React.Component {
    constructor(props) {
        super(props)
        console.log(props,'here is the cons')
        this.state = {
            code: props.code ? props.code : '',
            customer: props.customer ? props.customer : '',
            department: props.department ? props.department : '',
            employee: props.employess ? (props.employee.length != 0 ? props.employee : []) : [],
            message: props.message ? props.message : '',
            priority: props.priority ? props.priority : '',
            
            customers: [],
            departments: [],
            employees: [],
            employeesFinal: [],
            priorities: ['High','Medium','Low']

        }
        console.log(this.state.code,this.state.customer,this.state.department,this.state.priority)
    }

    componentDidMount() {
        axios.get('/customers',{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                const customers = response.data
                this.setState({customers})
            })
            .catch(err => {
                alert(err)
            })

        axios.get('/departments',{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                // console.log(response.data) 
                const departments = response.data
                this.setState({departments})
            })

        axios.get('/employees',{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                // console.log(response.data) 
                const employees = response.data 
                this.setState({employees})
            })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleCustomerChange = (e) => {
        // console.log(e.target.value)
        const customer = e.target.value
        this.setState({customer})
    }

    handleDepartmentChange = (e) => {
        const department = e.target.value
        const name = this.state.departments.find(dep => dep._id == department).name
        // console.log(name)
        // console.log(department)
        // console.log(this.state.departments)
        // console.log(this.state.employees)
        const employeesFinal =  this.state.employees.filter(emp => (emp.department && emp.department.name) == name)
        // console.log(this.state.employeesFinal)
        const employee = []
        this.setState({employeesFinal, department, employee})
    }

    handleEmployeesChange = (e) => {
        // console.log(e.target.value)
        const value = e.target.value
        const employee = { "_id" : value}
        this.setState(prevState => {
            return {
                employee: prevState.employee.find(emp => emp._id == employee._id) ? prevState.employee.filter(emp => emp._id != employee._id) : [].concat(prevState.employee,employee)
            }
        })

    }

    handlePriorityChange = (e) => {
        // console.log(e.target.value)
        const priority = e.target.value
        this.setState({priority})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            code: this.state.code,
            customer: this.state.customer,
            department: this.state.department,
            employees: this.state.employee,
            message: this.state.message,
            priority: this.state.priority
        }
        // {
        //     "code": "#101", 
        //     "customer": "5df912c6114be00016d5c872", 
        //     "department": "5df86e41114be00016d5c61d", 
        //     "employees": [{ "_id" : "5df9060a114be00016d5c818"}],
        //     "message" :  "net is off",
        //     "priority": "High"
        
        // }

        if(formData.code.length == 0 && formData.customer.length == 0 && formData.department.length == 0 && formData.employees.length == 0 && formData.message.length == 0 && formData.priority.length == 0){
            alert('Form Data is invalid')
        }else{
            this.props.handleSubmit(formData)
        }
    }

    render() {
        console.log( this.state)

        return (
            <div>
                <h2>Form goes here</h2>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="code">Code</label>
                    <input type="text" value={this.state.code} id="code" name="code" onChange={this.handleChange} />    <br/> 

                    <label>Customer</label>
                    <select defaultValue={this.state.customer} onChange={this.handleCustomerChange}>
                        <option value="">select</option>
                        {
                            this.state.customers.map(cus => {
                                return <option key={cus._id} value={cus._id}>{cus.name}</option>
                            })
                        }      
                    </select>  
                    
                    {/*<Select
                        options={this.state.customers}
                        value={this.state.customer}
                        onChange={value => this.handleCustomerChange(value)}
                        defaultValue={{ label: 2002, value: 2002 }}
                    />*/}<br/>

                    <label>Department</label>
                    <select onChange={this.handleDepartmentChange}>
                        <option value="">select</option>
                        {
                            this.state.departments.map(dep => {
                                return <option key={dep._id} value={dep._id}>{dep.name}</option>
                            })
                        }      
                    </select>   <br/>

                    <label>Employees</label>
                    <select onChange={this.handleEmployeesChange}>
                        <option value="">select</option>
                        {
                            this.state.employeesFinal.map(emp => {
                                return <option key={emp._id} value={emp._id}>{emp.name}</option>
                            })
                        }      
                    </select>   <br/>

                    <label htmlFor='message'>Message</label>
                    <input type="text" name="message" value={this.state.message} id="message" onChange={this.handleChange} />   <br/>

                    <label>Priority</label> <br/>
                    {
                        this.state.priorities.map((pr,index) => {
                            return(
                                <label key={index}>{pr} 
                                <input type="radio" name = 'radio' value={pr} onChange = {this.handlePriorityChange} /></label>
                            )   
                        })
                    }
                    <br/>
                    <input type="submit" />
                </form>
            </div>
        )
    }
}

export default TicketForm