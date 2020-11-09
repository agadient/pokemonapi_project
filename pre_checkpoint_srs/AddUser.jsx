import React from 'react';

export default class AddUser extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            firstName: "",
            lastName: "",
            location: "",
            yearsAsAUser: "",
            userID: ""
        }
    }

    handleChange = (event) => {
        const newState = {}
        newState[event.target.name] = event.target.value
        this.setState(newState)
    }

    render () {
        return (
            <div>
                <form onSubmit={(event) => this.props.submitUserData(event,this.state)}>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" name="firstName" onChange={this.handleChange}/> <br />

                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" name="lastName" onChange={this.handleChange}/> <br />

                    <label htmlFor="location">Location</label>
                    <input type="text" name="location" onChange={this.handleChange}/> <br /> 

                    <label htmlFor="yearAsAUser">Years User</label>
                    <input type="text" name="yearsAsAUser" onChange={this.handleChange}/> <br />

                    <button > 
                        submit
                    </button>

                </form>
                
            </div>

        );
    }
}