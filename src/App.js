import React, { Component } from 'react';
import './App.css';
import Form from "./components/Form";
import Recipes from "./components/Recipes"

// const YOUR_APP_ID = "69526d8e";
// const YOUR_APP_KEY = "f07c0bf2f3c232fe2445a4c354afb337";


class App extends Component {

  state = {
    count: 0,
    recipes: []
  }

  getRecipe = async (e) => {
    const recipeName = e.target.elements.recipeName.value;
    e.preventDefault();

    // const api_call = await fetch(`https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`);
    const api_call = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${recipeName}`);

    const data = await api_call.json();
    this.setState({
      count: data.count,
      recipes: data.recipes
    });
  }

  componentDidMount = () => {
    const json = localStorage.getItem("recipes");
    const recipes = JSON.parse(json);
    this.setState({ recipes: recipes });

    const c = localStorage.getItem("count");
    const count = JSON.parse(c);
    this.setState({ count: count });
  }

  componentDidUpdate = () => {
    const recipes = JSON.stringify(this.state.recipes);
    localStorage.setItem("recipes", recipes);
    const count = JSON.stringify(this.state.count);
    localStorage.setItem("count", count);
  }

  render() {
    const {
      getRecipe,
      state: {
        count,
        recipes
      }
    } = this;

    if (recipes != null) {
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Recipe Search</h1>
          </header>
          <Form getRecipe={getRecipe} />
          <Recipes recipes={recipes} count={count} />
        </div>
      );
    }
    else{

      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Recipe Search</h1>
          </header>
          <Form getRecipe={getRecipe} />
          {/* <Recipes recipes={recipes} count={count} /> */}
        </div>
      );
    }
  }
}

export default App;