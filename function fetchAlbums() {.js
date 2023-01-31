// async function fetchAlbums() {
const fetchAlbums = async () => {
  // fetch("https://swapi.dev/api/films") //returns promise
  //   .then((res) => res.json()) //resolved promise convert to json promise
  //   .then((json) => console.log(json)); //resolved json promise prints to console
  //ALTERNATIVELY
  const res = await fetch("https://swapi.dev/api/films");
  const json = await res.json();
  console.log(json);
};

fetchAlbums();
