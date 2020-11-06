import './App.css';
import React from 'react'
import Search from './Search'
import names from "./data/Names"

class App extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      collection: [],
      viewPokemonListAll : [],
      viewPokemonList : [],
      currentPokemon : {abilities: [], 
                        types: [], 
                        sprites: {}},
    
      searchInput: '',
      view: false
    }
    this.gatherPoke()
    this.setState({viewPokemonList: this.state.viewPokemonListAll})
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


  imageClick = (pokeInfo) => {

    this.setState({view:false, 
                  currentPokemon : pokeInfo})

    this.setState({viewPokemonList: this.state.viewPokemonListAll})

  }




  addToCollection = (pokeInfo) => {
    let newCollection = this.state.collection
    newCollection.push(pokeInfo)
    this.setState({collection: newCollection})
  }

  displayAllPokeData = () => {

    return (
      this.state.viewPokemonList.map(
        (pokeInfo) => {
          return Object.entries(pokeInfo.sprites).map(
             (key) => {
              if (key[0] === "front_default") {
                return (
                  <div>
                  <img onClick={() => this.imageClick(pokeInfo)} src={pokeInfo.sprites[key[0]]} alt="Pokemon"/>
                  <button onClick={() => this.filterPokeTypes(pokeInfo)}> View Similar Types </button>
                  <button onClick={() => this.addToCollection(pokeInfo)}> Add to Collection </button>
                  </div>
                );
              }
                return " " 
            }
          )
        }
      )
    )
  }

  filterPokeTypes = (pokeInfo) => {

    console.log(pokeInfo.types[0].type.name)
   let filterTypesPoke = this.state.viewPokemonList.filter((pokeType) => pokeType.types[0].type.name === pokeInfo.types[0].type.name)


   this.setState({viewPokemonList : filterTypesPoke})
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

  gatherPoke = () => {
    for (const name of names) {
      this.fetchPokeData(name).then(
        (data) => {
          const newList = this.state.viewPokemonList
          newList.push({abilities: data.abilities,
            types: data.types, 
            sprites: data.sprites})
          this.setState({viewPokemonListAll: newList})
        }
      )
    } 
  }
  
  viewAllPoke = () => {
    //set bullon in state set to true 
    this.setState({view: true})    
  }

  viewCollection = () => {
    //set bullon in state set to true 

    this.setState({viewPokemonList: this.state.collection})  
    this.setState({view: true})  
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
            <button onClick={this.viewCollection}> Display Collection</button>
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
