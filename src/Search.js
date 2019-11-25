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

                <div className="row">
                    <div className="col">
                        <div className="input-label">Name</div>
                        <input type="text" name="name" className="search-text" onChange={this.changeHandler}></input>
                    </div>
                    <div className="col">
                        <div className="input-label">Position</div>
                        <input type="text" name="position" className="search-text" onChange={this.changeHandler}></input>
                    </div>
                    <div className="col">
                        <div className="input-label">Email</div>
                        <input type="text" name="email_address" className="search-text" onChange={this.changeHandler}></input>
                    </div>
                    <div className="col">
                        <div className="input-label">Phone Number</div>
                        <input type="text" name="phone_number" className="search-text" onChange={this.changeHandler}></input>
                    </div>
                    <div className="col">
                        <div className="input-label">Salary Range</div>
                        <input type="number" name="salary_min" className="search-num" onChange={this.changeHandler} placeholder="Minimum"></input>:
                        <input type="number" name="salary_max" className="search-num" onChange={this.changeHandler} placeholder="Maximum"></input>
                    </div>
                    <div className="col">
                        <div className="input-label">Date Hired Range</div>
                        <input type="date" name="date_hired_min" className="search-date" onChange={this.changeHandler} placeholder="Date Hired Min"></input>:
                        <input type="date" name="date_hired_max" className="search-date" onChange={this.changeHandler} placeholder="Date Hired Max"></input>
                    </div>
                    <div className="col">
                        <button onClick={this.submit}>Search</button>
                    </div>
                </div>
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
            this.props.setAppState({ 
                employees: response[0],
                notificationText: ''
            })
        })
        .catch((error) => {
            console.log(error)
            this.props.setAppState({
                notificationText: 'There was an error processing your request'
            })
        })
    }
}

export default Search;