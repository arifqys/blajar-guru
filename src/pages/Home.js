import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import axios from 'axios'
import Hello from '../components/Hello'

export default () => {
  const [chapters, setChapters] = useState([])
  
  useEffect(() => {
    axios.get('https://blajar-app.firebaseio.com/chapters.json')
      .then(res => {
        setChapters(Object.entries(res.data))
        console.log(res.data)
      })
  }, [])

  return (
    <div className="container">
      <Hello />
      <div className="content">
        <h2>Daftar Materi</h2>
        <Link to="/add" className="add">Tambahkan materi</Link>
        <div className="chapters">
          {chapters.map((item, index) =>
            <div className="chapter" key={item[0]}>
              <span>{index+1}</span>
              <p>{item[1].title}</p>
            </div> 
          )}
        </div>
      </div>
    </div>
  )
}