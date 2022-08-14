import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './search.css'

export default function SearchBar() {
    const [users,setUsers] = useState ([])
    const [text,setText] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    useEffect (() => {
        const loadUsers =async()=>
        {
            const response = await axios.get('https://reqres.in/api/user');
            setUsers(response.data.data)
            console.log(response.data.data)
        }
            loadUsers();
    },[])

    const onSuggestHandler =(text) =>  {
      setText(text);
      setSuggestions([]);
    }

    const onChangeHandler = (text) =>{
      let matches = []
      if (text.length>0)
      {
       matches = users.filter(user => {
        const regex = new RegExp(`${text}`,"gi");
        return user.name.match(regex);
       })
     
      }
      console.log("matches",matches)
      setSuggestions(matches)
      setText(text)
    }

  return (
    <div className='search'>
      <div className='search__container'>
        <h1>Search Bar</h1>
    <input type="text" 
    onChange={e=>onChangeHandler(e.target.value)}
    value={text}
    />

    {suggestions && suggestions.map ((suggestions,i) =>
    <div className='suggestions' key={i}
    onClick = {()=>onSuggestHandler(suggestions.name)}
    >{suggestions.name}</div>
    )}

      </div>
    </div>
  )
}
