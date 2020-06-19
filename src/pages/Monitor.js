import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default (props) => {
  const [answers, setAnswers] = useState([])
  const [title, setTitle] = useState('')
  const [users, setUsers] = useState({})
  
  useEffect(() => {
    axios.get('https://blajar-app.firebaseio.com/answers.json')
      .then(res => {
        let answers = Object.values(res.data)
        setAnswers(answers.filter(answer => answer.chapter_id === props.match.params.id))
      })
  }, [props.match.params.id])

  useEffect(() => {
    axios.get(`https://blajar-app.firebaseio.com/chapters/${props.match.params.id}/title.json`)
      .then(res => {
        setTitle(res.data)
      })
  }, [props.match.params.id])

  useEffect(() => {
    axios.get(`https://blajar-app.firebaseio.com/users.json`)
      .then(res => {
        setUsers(res.data)
      })
  }, [])

  const totalQuestions = (data) => {
    return data.filter(item => item.type === 'question')
  }

  const totalCorrectAnswers = (data) => {
    return totalQuestions(data).filter(item => (item.selectedAnswer === item.correctAswer))
  }

  return (
    <div className="container">
      <div className="content">
      <h2>Monitor Progress {title}</h2>
        <div className="monitors">
          {answers.map((item, index) =>
            <div className="monitor" key={index}>
              <p className="user">{index+1}. {!!users ? users[item.user_id].name : null} </p>
              <p className="detail">{totalCorrectAnswers(item.data).length} jawaban benar dari total {totalQuestions(item.data).length} pertanyaan</p>
            </div> 
          )}
        </div>
      </div>
    </div>
  )
}