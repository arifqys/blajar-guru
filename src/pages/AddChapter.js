import React, {useState} from 'react'
import {withRouter} from "react-router-dom";
import axios from 'axios'

export default withRouter((props) => {
  const blankMaterial = {type: 'material', title: '', content: ''}
  const blankQuestion = {type: 'question', title: '', answers: [], correctAnswer: ''}

  const [form, setForm] = useState({
    title: '',
    contents: []
  })

  const ChangeHandler = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const MaterialChangeHandler = (e) => {
    const newObject = {...form}
    newObject.contents[e.target.dataset.idx][e.target.dataset.name] = e.target.value
    setForm(newObject)
  }

  const QuestionChangeHandler = (e) => {
    const newObject = {...form}
    newObject.contents[e.target.dataset.idx][e.target.dataset.name][e.target.dataset.aid] = e.target.value
    setForm(newObject)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    axios.post('https://blajar-app.firebaseio.com/chapters.json', form)
      .then(() =>  props.history.push('/'))
  }

  const addMaterial = () => {
    const newObject = [...form.contents, blankMaterial]
    setForm({...form, contents: newObject})
  }

  const addQuestion = () => {
    const newObject = [...form.contents, blankQuestion]
    setForm({...form, contents: newObject})
  }

  return (
    <div className="container">
      <div className="content">
        <h2>Tambah Materi</h2>
        <form onSubmit={submitHandler}>     
          <label htmlFor="title">Nama Materi</label>   
          <input type="text" name="title" id="title" value={form.title} onChange={ChangeHandler} /> 
          <div className="button-group">
            <input type="button" value="Tambah Materi" onClick={addMaterial}/>            
            <input type="button" value="Tambah Pertanyaan" onClick={addQuestion} />   
          </div>
          {
            form.contents.map((content, index) => {
              if (content.type === 'material') {
                return (
                  <div key={index} className="additional">
                    <h3>{`MATERI #${index+1}`}</h3>
                    <label htmlFor={`title${index}`}>Judul Materi</label>
                    <input
                      type="text"
                      name={`title${index}`}
                      value={form.contents[index].title}
                      id={`title${index}`}
                      data-name="title" 
                      data-idx={index}
                      onChange={MaterialChangeHandler}
                    />
                    <label htmlFor={`content${index}`}>Isi Konten</label>
                    <textarea
                      type="text"
                      name={`content${index}`}
                      value={form.contents[index].content}
                      id={`content${index}`}
                      data-name="content" 
                      data-idx={index}
                      onChange={MaterialChangeHandler}
                    />
                  </div>
                )
              } else {
                return (
                  <div key={index} className="additional">
                    <h3>{`PERTANYAAN #${index+1}`}</h3>
                    <label htmlFor={`title${index}`}>Pertanyaan</label>
                    <input
                      type="text"
                      name={`title${index}`}
                      value={form.contents[index].title}
                      id={`title${index}`}
                      data-name="title" 
                      data-idx={index}
                      onChange={MaterialChangeHandler}
                    />
                    <label htmlFor={`anwersA${index}`}>Jawaban A</label>
                    <input
                      type="text"
                      name={`anwers[0]${index}`}
                      value={form.contents[index].content}
                      id={`anwers[0]${index}}`}
                      data-name="answers"
                      data-aid="0"
                      data-idx={index}
                      onChange={QuestionChangeHandler}
                    />
                    <label htmlFor={`anwers[1]${index}`}>Jawaban B</label>
                    <input
                      type="text"
                      name={`anwers[1]${index}`}
                      value={form.contents[index].content}
                      id={`anwers[1]${index}}`}
                      data-name="answers" 
                      data-aid="1"
                      data-idx={index}
                      onChange={QuestionChangeHandler}
                    />
                    <label htmlFor={`anwers[2]${index}`}>Jawaban C</label>
                    <input
                      type="text"
                      name={`anwers[2]${index}`}
                      value={form.contents[index].content}
                      id={`anwers[2]${index}}`}
                      data-name="answers" 
                      data-aid="2"
                      data-idx={index}
                      onChange={QuestionChangeHandler}
                    />
                    <label htmlFor={`correctAnswer${index}`}>Jawaban Benar</label>
                    <select
                      type="text"
                      name={`correctAnswer${index}`}
                      value={form.contents[index].content}
                      id={`correctAnswer${index}`}
                      data-name="correctAnswer" 
                      data-idx={index}
                      onChange={MaterialChangeHandler}
                    >
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                    </select>
                  </div>
                )
              }
            })
          }
          <input type="submit" value="Submit" />        
        </form>
      </div>
    </div>

  )
})