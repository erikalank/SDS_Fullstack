import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createStudy } from '../features/studies/studySlice'

function StudyForm() {
  const [text, setText] = useState('')
  const [subject, setSubject] = useState('')
  const [dueDate, setDueDate] = useState('')

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createStudy({ text, subject, dueDate }))
    setText('')
    setSubject('')
    setDueDate('')
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Study task</label>
          <input
            type='text'
            name='text'
            placeholder="Task description"
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="text"
            placeholder="Subject (optional)"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="border p-2 rounded mb-2 w-full"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border p-2 rounded mb-2 w-full"
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Task
          </button>
        </div>
      </form>
    </section>
  )
}

export default StudyForm