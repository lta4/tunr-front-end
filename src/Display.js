import React from "react";

const Display = (props) => {

  const handleClick = (event, data) => {
    event.preventDefault()
    props.removeFav(data);
  };
const handleClick2 = (event, data) => {
    event.preventDefault()
    props.setFavObj(data)
}

  const { songs } = props;
  const loaded = () => {
    return (
      <div className="container">
        <h2>PLAYLIST</h2>
        {songs.map((song) => {
          return (
            <article key={song._id}>
              <div className="details">
                <h2>{song.title}</h2>
                <h3>{song.time}</h3>
              </div>
              <div>
                <h3>{song.artist}</h3>
                <br/>
                <br/>
                <button
                  onClick={() => {
                    props.selectSong(song);
                    props.history.push("/edit");
                  }}
                >
                  Edit Song
                </button>
                <button
                  onClick={() => {
                    props.deleteSong(song);
                  }}
                >
                  Delete Song
                </button>
                <button onClick={(e) => handleClick2(e, song)}>
                  Add Song to Favorites
                </button>
              </div>
            </article>
          );
        })}
        <hr />
        <h2>Favorites List</h2>
        {props.favoritesArr.map((song, index) => {
          return (
            <article className="container" key={index}>
              <div className="details">
                <h2>{song.title}</h2>
                <h3>{song.time}</h3>
              </div>
              <div>
                <h3>{song.artist}</h3>
                <br/>
                <br/>
                <button onClick={(e) => handleClick(e, song)}>
                  Remove from Favorites
                </button>
              </div>
            </article>
          );
        })}
      </div>
    );
  };
  const loading = <h1>Loading...</h1>;
  return songs.length > 0 ? loaded() : loading;
};

export default Display;
