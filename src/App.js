import './App.css';
import React from 'react'
import Search from './Search'
import names from "./data/Names"

class App extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      viewPokemonList : [],
      currentPokemon : {abilities: [], 
                        types: [], 
                        sprites: {}},
    
      searchInput: '',
      view: false
    }
  }


  fetchPokeData = async (name) => {
    const response =  await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    const data = await response.json()
    return data  
  }

  displayPokeData = () => {
      return (
        <div>
          <h3>Abilities:</h3>
          <ol>
            {Object.entries(this.state.currentPokemon.abilities).map((key) => {
              return (
                <li>
                  {[key[1].ability.name]}
                </li>
              );
            })}
          </ol>
          <h3>Sprites:</h3>
          {Object.entries(this.state.currentPokemon.sprites).map((key) => {
            if (
              key[1] === null ||
              key[0] === "other" ||
              key[0] === "versions"
            ) {
              return " ";
            }
              return (
                <img
                  src={this.state.currentPokemon.sprites[key[0]]}
                  alt="Pokemon"
                />
              );
      
          })}

          <h3>Types:</h3>
          <ul></ul>
        </div>
      );
  }

  displayAllPokeData = () => {

    return (
      this.state.viewPokemonList.map(
        (pokeinfo) => {
          return Object.entries(pokeinfo.sprites).map(
             (key) => {
              if (key[0] === "front_default") {
                return (
                  <img src={pokeinfo.sprites[key[0]]} alt="Pokemon"/>
                );
              }
                return " " 
            }
          )
        }
      )
    )
  }

  handleSearchBox = (event) => {
    event.preventDefault()
    this.setState({searchInput: event.target.value})  
  }


  onSearchClick = (event) => {
    this.fetchPokeData(this.state.searchInput).then(
      data =>
      this.setState({currentPokemon: {abilities: data.abilities,
                                      types: data.types, 
                                      sprites: data.sprites}})
    )
  }

  viewAllPoke = () => {

    //set bullon in state set to true 
    this.setState({view: true})
    for (const name of names) {
      this.fetchPokeData(name).then(
        (data) => {
          const newList = this.state.viewPokemonList
          newList.push({abilities: data.abilities,
            types: data.types, 
            sprites: data.sprites})
          this.setState({viewPokemonList: newList})
        }
      )
    } 
  }


  render () {
    if (!this.state.view) {
    return (
        <div>
          <h1>        
            <Search 
                handleSearchBox={this.handleSearchBox} 
                onSearchClick={this.onSearchClick} />
            {this.displayPokeData()}
            <button onClick={this.viewAllPoke}> View All</button>
          </h1>
        </div>)
    } else {
      return (
          <div>
          {this.displayAllPokeData()}
          </div>
      )
    }
  }

  }




export default App;
