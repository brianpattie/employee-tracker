import React from 'react';

class Search extends React.Component {

    constructor() {
        super();
        this.state = {
            name: null,
            position: null,
            salary_min: null,
            salary_max: null,
            date_hired_min: null,
            date_hired_max: null,
            email_address: null,
            phone_number: null
        };
    }

    render() {
        return (
            <div id="search-form">
                <input type="text" name="name" onChange={this.changeHandler} placeholder="Name"></input>
                <input type="text" name="position" onChange={this.changeHandler} placeholder="Position"></input>
                <input type="number" name="salary_min" onChange={this.changeHandler} placeholder="Salary Min"></input>
                <input type="number" name="salary_max" onChange={this.changeHandler} placeholder="Salary Max"></input>
                <input type="date" name="date_hired_min" onChange={this.changeHandler} placeholder="Date Hired Min"></input>
                <input type="date" name="date_hired_max" onChange={this.changeHandler} placeholder="Date Hired Max"></input>
                <input type="text" name="email_address" onChange={this.changeHandler} placeholder="Email"></input>
                <input type="text" name="phone_number" onChange={this.changeHandler} placeholder="Phone Number"></input>
                <button onClick={this.submit}>Submit</button>
            </div>
        )
    };

    changeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    submit = () => {
        let url = `http://${window.location.hostname}:3001/search`
        let params = {
            method: 'POST',
            headers: {
                'content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(this.state)
        }

        fetch(url, params)
        .then(response => { return response.json() })
        .then(response => {
            console.log(response)
            this.props.setAppState({ employees: response[0] })
        })
        .catch((error) => {
            console.log(error)
            // TODO Update Notification State to say "There was an error processing your request"
        })
    }
}

export default Search;