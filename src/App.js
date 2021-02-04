import "./App.css";
import React from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";


function App() {

  const url = "https://tunr-back-end.herokuapp.com"
  const [songs, setSongs] = React.useState([]);
  const emptySong = {
    title: "",
    artist: "",
    time: ""
  };
  const [selectedSong, setSelectedSong] = React.useState(emptySong);
  const [favObj, setFavObj] = React.useState(null)
  const [favoritesArr, setFavoritesArr] = React.useState([])
  const getSongs = () => {
    fetch(url + "/songs")
      .then((response) => response.json())
      .then((data) => {
        setSongs(data);
        console.log(data)
      });
  };

  const addSong = () => {
    if(favObj !== null) {
      changeFav(favObj)
    }
  }

  const changeFav = (newFav) => {
    if (favoritesArr === null) {
      setFavoritesArr([newFav])
    } else if (
      !favoritesArr.some((fav) => { return fav.title === newFav.title})
    ){
      let newArray = [...favoritesArr]
      newArray.push(newFav)
      setFavoritesArr(newArray)
    }
  } 

  const removeFav = (selectFav) => {
    favoritesArr.splice(favoritesArr.indexOf(selectFav), 1)
    setFavoritesArr([...favoritesArr])
  }

  const handleCreate = (newSong) => {
    console.log(newSong)
    fetch(url + "/songs", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSong),
    }).then(() => {
      getSongs();
    });
  };
const handleUpdate = (song) => {
  fetch(url + "/songs/updateSong/" + song._id, {
    method: "put",
    headers: { "Content-Type": "application/json" }, body: JSON.stringify(song)}).then(() => {getSongs()})
}
const deleteSong = (song) => {
  fetch (url + "/songs/" + song._id, {method: "delete"}).then(() => {getSongs()})
}
  const selectSong = (song) => {
    setSelectedSong(song);
  };
  React.useEffect(() => getSongs(), []);
  React.useEffect(() => addSong(), [favObj])
  return (
    <div className="App">
      <h1>TUNR</h1>
      <Link to="/create">
        <button>ADD A SONG</button>
      </Link>
      <hr />
      <main>
        <Switch>
          <Route
            exact
            path="/"
            render={(rp) => <Display changeFav ={changeFav} removeFav = {removeFav} favoritesArr = {favoritesArr} favObj={favObj} setFavObj ={setFavObj} deleteSong= {deleteSong}{...rp} selectSong={selectSong} songs={songs} />}
          />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form
                {...rp}
                label="Create"
                song={emptySong}
                handleSubmit={handleCreate}
              />
            )}
          />
          <Route exact path = "/edit" render = {(rp) => (
            <Form {...rp} label="Update" song={selectedSong} handleSubmit={handleUpdate} />
          )}
          />
        </Switch>
      </main>
    </div>
  );
}
export default App;






