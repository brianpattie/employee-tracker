import React from 'react';


class EmployeeList extends React.Component {

    render() {
        return (
            <table id="employee-list">
                <thead>
                    <tr>
                        <th className="table-data-col">Name</th>
                        <th className="table-data-col">Position</th>
                        <th className="table-data-col">Email Address</th>
                        <th className="table-data-col">Phone Number</th>
                        <th className="table-data-col">Salary</th>
                        <th className="table-data-col">Date Hired</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.employees.map((employee, index) => (
                        <Employee key={employee.id_employee} employee={employee} appState={this.props.appState} setAppState={this.props.setAppState} openEditModal={this.props.openEditModal}/>
                    ))}
                </tbody>
            </table>
        )
    }
}

class Employee extends React.Component {

    render() {
        const {name, position, salary, date_hired, phone_number, email_address} = this.props.employee;
        return (
            <tr className="employee">
                <td className="table-data-col">{name}</td>
                <td className="table-data-col">{position}</td>
                <td className="table-data-col">{email_address}</td>
                <td className="table-data-col">{phone_number}</td>
                <td className="table-data-col">${salary}</td>
                <td className="table-data-col">{date_hired}</td>
                <td className="table-btn-col">
                    <button onClick={this.edit}>Edit</button>
                    <button onClick={this.remove}>Remove</button>
                </td>
            </tr>
        )
    }

    remove = (event) => {
        let { id_employee: id, name } = this.props.employee

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
            this.props.setAppState({
                employees: this.props.appState.employees.filter((employee) => {
                     return employee.id_employee !== id 
                }),
                notificationText: `${name} deleted`
            })
        })
        .catch((error) => {
            console.log(error)
            this.props.setAppState({
                notificationText: 'There was an error processing your request'
            })
        })
    }

    edit = (event) => {
        this.props.openEditModal(this.props.employee)
    }

}

export default EmployeeList;
