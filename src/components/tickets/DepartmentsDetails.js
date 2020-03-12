import React from 'react'

function DepartmentDetails(props) {
    console.log(props)
    return (
        <div> 
            {props.departments.find(dep => dep._id == props.id) && props.departments.find(dep => dep._id == props.id).name}
        </div>
    )
}

export default DepartmentDetails