import React from 'react'




export default class Search extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <input onChange={this.props.handleSearchBox} id ="search" />
                <button htmlFor="search" onClick={this.props.onSearchClick}>Search</button>
            </div>
        )
    }
}
/*
                <input id ="search" type="text">Search</input>
                <button for="search">Search</button>
                */