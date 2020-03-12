import React from 'react'

function EmployeeDetails(props) {
    return (
        <div key={props._id}> 
            {(props.employees.find(emp => emp._id == props._id) && (props.employees.find(emp => emp._id == props._id).name)) }
        </div>
    )
}

export default EmployeeDetails