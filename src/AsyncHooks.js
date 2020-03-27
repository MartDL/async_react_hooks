import React, { useState, useEffect } from 'react';
import './App.css'

function AsyncHooks() {
    
const [search, setSearch] = useState('');
const [query, setQuery] = useState('');
const [results, setResults] = useState([]);


    function onSubmit(e){
        e.preventDefault();
        setQuery(search);
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch (`https://api.giphy.com/v1/stickers/search?api_key=51DF1GK3ip44Ml67r9MUZHjoBdMT45qw&q=${query}&limit=25&offset=0&rating=R&lang=en`);
                const json = await response.json();
                setResults(
                    json.data.map(item => {
                        return item.images.preview.mp4;
                    })
                );
                console.log({json})
            } catch (error) {} 
        }
        fetchData();
    }, [query])


    return (
        <div className="App">
            <h1>Choose your GIF's !!</h1>
            <form onSubmit={onSubmit}>
            <input 
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="gifs.. gifs.. gifs.."
                />
                <button type="onSubmit">search</button>
                </form>
                <br />
               {results.map(item => (
               <video autoPlay loop key={item} src={item}/>))}
        </div>
    )
}



export default AsyncHooks;