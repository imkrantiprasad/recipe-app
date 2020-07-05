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

    // console.log(recipeName);
    const data = await api_call.json();
    // console.log(data);
    this.setState({
      count: data.count,
      recipes: data.recipes
    });
  }
  render() {
    const {
      getRecipe,
      state: {
        count,
        recipes
      }
    } = this;

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
}

export default App;
// if (recipes.length === 0) {
//   return (
//     <div>
//       <h1>Nothing Found</h1>
//     </div>
//   )
// }