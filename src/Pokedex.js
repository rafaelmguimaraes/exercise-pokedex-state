import React from 'react';
import Pokemon from './Pokemon';
import Button from './Button';
import './Pokedex.css';

class Pokedex extends React.Component {
  constructor(props) {
    super();

    this.nextClick = this.nextClick.bind(this);
    this.filterClick = this.filterClick.bind(this);
    this.resetPokemons = this.resetPokemons.bind(this);
    this.filterByTypePokemons = this.filterByTypePokemons.bind(this);
    this.changeColor = this.changeColor.bind(this);
    
    this.state = {
      pokemons: props.pokemons,
      currentPokemon: 0,
      allTypes: [...new Set(props.pokemons.map(pokemon => pokemon.type))],
      buttonClicked: 'Fire',
    }
  }

  resetPokemons = () => {
    this.setState({ pokemons: this.props.pokemons, currentPokemon: 0, buttonClicked: 'All'});
  } 

  filterByTypePokemons = (type = 'Fire') => {
    this.resetPokemons();
    this.setState({ pokemons: this.props.pokemons.filter(pokemon => pokemon.type === type), buttonClicked: type});
  }

  componentDidMount() {
    this.filterByTypePokemons();
  }
 
  nextClick = () => {
    const countPokemons = this.state.pokemons.length - 1;
    this.setState((beforeState, _props) => ({
      currentPokemon: 
        beforeState.currentPokemon < countPokemons ? 
          beforeState.currentPokemon + 1 : 0
    }));
  }

  filterClick = (valueType) => {
    if (valueType === 'All')
      this.resetPokemons();
    else
      this.filterByTypePokemons(valueType);
  }

  changeColor = (type) => (this.state.buttonClicked === type ? "selectedButton" : " ");
  
  render() {
    const pokemon = this.state.pokemons[this.state.currentPokemon];
    return ( 
      <div className="pokedex"> 
        <Pokemon pokemon={pokemon} /> 
        <div className="actionsPokedex">
          <button onClick={this.nextClick} disabled={this.state.pokemons.length <= 1}>Next</button>
          <Button filterFunction = {this.filterClick}>
            {this.state.allTypes.map(type => <button className={this.changeColor(type)} key={type} >{type}</button> )}
          </Button>
          <button onClick={() => this.filterClick('All')} >All</button>
        </div>
      </div>
    );
  }
}

export default Pokedex;