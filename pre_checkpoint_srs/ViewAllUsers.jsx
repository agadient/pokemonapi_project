import React from 'react';


export default class ViewAllUsers extends React.Component {

    render () {
        return (
            <div>
                <ul>
                {this.props.users.map(user => {
                    return (
                        <li>
                            Firstname: {user.firstName} Lastname: {user.lastName}
                        </li>    
                    )
                    })}
                </ul>
            </div>

        );
    }
}