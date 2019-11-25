import React from 'react';


class EmployeeList extends React.Component {

    render() {
        // return this.props.employees.map((employee, index) => (
        //     <Employee key={employee.id_employee} employee={employee} appState={this.props.appState} setAppState={this.props.setAppState}/>
        // ))

        return (
            <div id="employee-list">
                {this.props.employees.map((employee, index) => (
                    <Employee key={employee.id_employee} employee={employee} appState={this.props.appState} setAppState={this.props.setAppState} openEditModal={this.props.openEditModal}/>
                ))}
            </div>
        )
    }
}

class Employee extends React.Component {

    render() {
        const {name, position, salary, date_hired, phone_number, email_address} = this.props.employee;
        return (
            <div className="employee">
                <span>{name}</span>
                <span>{position}</span>
                <span>{salary}</span>
                <span>{date_hired}</span>
                <span>{phone_number}</span>
                <span>{email_address}</span>
                <button onClick={this.edit}>Edit</button>
                <button onClick={this.remove}>Remove</button>
            </div>
        )
    }

    remove = (event) => {
        let id = this.props.employee.id_employee

        let url = `http://${window.location.hostname}:3001/delete`
        let params = {
            method: 'POST',
            headers: {
                'content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({ id_employee: id })
        }

        fetch(url, params)
        .then(response => { return response.json() })
        .then(response => {
            this.props.setAppState({ employees: this.props.appState.employees.filter((employee) => { return employee.id_employee !== id })})
        })
        .catch((error) => {
            console.log(error)
            // TODO Update Notification State to say "There was an error processing your request"
        })
    }

    edit = (event) => {
        // console.log(this.props.openEditModal)
        this.props.openEditModal(this.props.employee)
    }

}

export default EmployeeList;
