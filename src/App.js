import axios from 'axios'
import { useState, useEffect} from 'react'
import ComicList from './components/ComicList'
import SearchIcon from '@material-ui/icons/Search';
import Loading from './components/Loading'
import './App.css'
import {
  useHistory
} from "react-router-dom";

function App() {
  const PUBLIC_KEY = '572b5d060667c930ab420ac05d539be3';
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const history = useHistory();

  useEffect(() => {
      async function getData(){
        const response = await axios.get(`http://gateway.marvel.com/v1/public/comics?ts=1&apikey=${PUBLIC_KEY}&hash=9a237f72eccc957b539bd695d8c61816&limit=100`);
        setData(response.data.data.results);
      }
      getData();
  }, [])

  const handleSearchValue = (e) => {
    setSearchValue(e.target.value)
  }

  const handleSearch = (e) => {
    e.preventDefault();
    let result = [];
    data.map(comic => {
        history.push(`/search/comics/${searchValue}`)
        if (comic.title.toLowerCase().includes(searchValue.toLowerCase())) {
          result.push(comic);
      }
    })
    setFilteredData(result)
  }

  return (
    <div className="App">
      <div className="title">
        <h1>Marvel App</h1>
        <form action="">
          <input type="text" placeholder="Search.." value={searchValue} onChange={handleSearchValue} name="search" />
          <button onClick={handleSearch} type="submit"><SearchIcon /></button>
        </form>
      </div>
      <div className="container">
        {filteredData.length > 0 ? <ComicList data={filteredData}/> : <ComicList data={data} /> }
        {data.length > 0 ? <></> : <Loading />}
      </div>
    </div>
  );
}

export default App;
