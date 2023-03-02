import React, { useEffect, useState } from 'react'
import Recipe from './Recipe'
import './App.css';

function App() {
  const APP_ID = 'f2320800';
  const APP_KEY = '5add590575b9277bc497193c5e23a416';

  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("banana");
  const [recipes, setRecipes] = useState([]);

  //APIからレシピを取得する関数
  const getRecipes = async () => {
    const responce = await fetch(`https://api.edamam.com/search?q="${query}"&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await responce.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  //検索ボタンを押した時に呼び出したい関数
  const getSearch = e => {
    e.preventDefault(); // submitイベントの本来の動作を止める
    setQuery(search);
    setSearch('');
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    getRecipes();
  }, [query])
  return (
    <div className="App">
      <form onSubmit={getSearch}>
        <input type="text" value={search} onChange={updateSearch} />
        <button type="submit">検索</button>
      </form>
      <div>
        {recipes.map(recipe => (
          <Recipe 
            key={recipe.recipe.label}
            title={recipe.recipe.title}
            image={recipe.recipe.image}
            calories={recipe.recipe.calories}
            ingredients={recipe.recipe.ingradients}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
