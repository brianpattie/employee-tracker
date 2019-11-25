import React from 'react';
import Modal from 'react-modal';
import './App.css';
import Search from './Search.js';
import EmployeeList from './EmployeeList.js';


Modal.setAppElement('#root')

class App extends React.Component {
    
    constructor() {
        super()
        this.state = {
            modalIsOpen:        false,
            modalInstruction:   '',
            notificationText:   '',
            new_employee:       null,
            id_employee:        null,
            name:               null,
            position:           null,
            salary:             null,
            date_hired:         null,
            phone_number:       null,
            email_address:      null,
            employees:          []
        };
    }
    
    render() {
        return (
            <div className="App">
                <div className='container'>
                    <Modal 
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        style={modalStyle}
                        contentLabel={"Employee"}
                    >
                        <div id="modal-form">
                            <div>{this.state.modalInstruction}</div>
                            <div id="modal-notification">{this.notificationText}</div>
                            <input type="text" name="name" onChange={this.changeHandler} placeholder="Name"></input>
                            <input type="text" name="position" onChange={this.changeHandler} placebolder="Position"></input>
                            <input type="number" name="salary" onChange={this.changeHandler} placebolder="Salary"></input>
                            <input type="date" name="date_hired" onChange={this.changeHandler} placebolder="Date Hired"></input>
                            <input type="text" name="email_address" onChange={this.changeHandler} placebolder="Email"></input>
                            <input type="text" name="phone_number" onChange={this.changeHandler} placebolder="Phone Number"></input>
                            <button onClick={this.submit}>Submit</button>
                        </div>
                    </Modal>
        <div id="notification">{this.state.notificationText}</div>
                    <button onClick={this.openAddModal}>Add Employee</button>
                    <Search setAppState={this.updateState}/>
                    <EmployeeList employees={this.state.employees} appState={this.state} setAppState={this.updateState} openEditModal={this.openEditModal}/>
                </div>
            </div>
        );
    }

    updateState = (obj) => {
        this.setState(obj)
    }

    updateEmployeeList = () => {

    }

    changeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    openAddModal = () => {
        this.setState({
            modalIsOpen: true,
            modalInstruction: 'All fields are required.',
            id_employee: null
        })
    }

    openEditModal = (employee) => {
        this.setState({
            modalIsOpen: true,
            modalInstruction: 'Only fields with values will be changed.',
            ...employee
        })
    }

    closeModal = () => {
        this.setState({
            modalIsOpen: false,
            activeEmployee: {}
        })
    }

    submit = () => { // Submit either insert or update based on state.id_employee value
        let { id_employee, name, position, salary, date_hired, phone_number, email_address } = this.state
        let new_employee = {
            id_employee:    id_employee,
            name:           name,
            position:       position,
            salary:         salary,
            date_hired:     date_hired,
            phone_number:   phone_number,
            email_address:  email_address
        }

        let path = id_employee ? 'update' : 'insert';

        let url = `http://${window.location.hostname}:3001/${path}`
        let params = {
            method: 'POST',
            headers: {
                'content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(new_employee)
        }

        fetch(url, params)
        .then(response => { return response.json() })
        .then(response => {

            if (id_employee) {
                this.setState({ 
                    employees: this.state.employees.map((employee) => {
                        return employee.id_employee === id_employee ? new_employee : employee;
                    }),
                    notificationText: `${name} updated`
                })
            } else {
                this.setState({
                    notificationText: `${name} added`
                })
            }

            this.closeModal()

        })
        .catch((error) => {
            console.log(error)
            this.setState({
                notificationText: 'There was an error processing your request'
            })
        })
    }
}

let modalStyle = { // Edit These Styles
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
}

export default App;
