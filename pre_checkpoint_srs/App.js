import './App.css';
import React from 'react';
import ViewAllUsers from './ViewAllUsers'
import AddUser from './AddUser'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allUsers: [],
      users: [],
      locationInput: "",
      idInput: "",
    }
    
  }

  componentDidMount = () => {
    this.getAllUser()
  }

  fetchData = async (url) => {
    const response = await fetch(url)
    const json = await response.json()
    return json
  }

  getAllUser = () => {
    this.fetchData('http://localhost:3001/users').then(json => 
    {
      this.setState({allUsers:json})
    })
  }
  
  viewAllUser = () => {
    let newUsers = this.state.allUsers
                    .map(user => {
                                  return {firstName: user.firstName, lastName: user.lastName}
                                 });
    this.setState({users: newUsers})
  } 

  handleLocationBoxChange = (event) => {
    this.setState({locationInput: event.target.value})
  }

  handleLocationClick = () => {
    let userList = this.state.allUsers
                    .filter(user => user.location === this.state.locationInput)
                    .map(user => {
                                  return {firstName: user.firstName, lastName: user.lastName}
                                 });
    this.setState({users: userList})
  }

  handleSubmitUserData = (event, userData) => {
    event.preventDefault();
    let userObj = JSON.parse(JSON.stringify(userData));
    userObj.userID = this.state.allUsers.length;
    console.log(userObj)
    this.postData(userObj).then(data => {console.log(data)})
    this.getAllUser()
  }
  
  postData = async (data) => {
      let response = await fetch("http://localhost:3001/addUser", {
                              method: 'POST',
                              body: JSON.stringify(data),
                              headers: {
                                'Content-Type': 'application/json',
                              }
                            })

      let responseData = await response.json()
      return responseData
  }

  handleIDBoxChange = (event) => {
    this.setState({idInput: event.target.value})
  }

  handleIDClick = () => {
    //let newUser = this.state.allUsers.filter(user => this.state.idInput === user.userID)

    //this.setState({users: newUser})

    let userList = this.state.allUsers
                    .filter(user => user.userID.toString() === this.state.idInput)
                    .map(user => {
                                  return {firstName: user.firstName, lastName: user.lastName}
                                 });
    this.setState({users: userList})
  }

  render() {
    return (
      <div>
        <button type="button" onClick={this.viewAllUser}>View All</button>
        <ViewAllUsers users={this.state.users}/>
        <input type="text" onChange={this.handleLocationBoxChange} />
        <button type="button" onClick={this.handleLocationClick}>View Users at Location</button>

        <AddUser submitUserData = {this.handleSubmitUserData}/>

        <input type="text" onChange={this.handleIDBoxChange} />
        <button type="button" onClick={this.handleIDClick}>Search User by ID</button>
      </div>
    );
  }
  
}

export default App;
