import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import StudyForm from "../components/StudyForm"
import Spinner from '../components/Spinner'
import {getStudies, reset} from '../features/studies/studySlice'
import StudyItem from "../components/StudyItem"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'


function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const {studies, isLoading, isError, message} = useSelector((state) => state.studies)

  const [subjectFilter, setSubjectFilter] = useState('all')

  const subjects = [...new Set(studies.map(s => s.subject).filter(Boolean))]

  const [date, setDate] = useState(new Date())

  useEffect(() => {
    if(isError) {
      console.log(message)
    }


    if(!user) {
      navigate('/login')
    } else {
      dispatch(getStudies())
    }

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if(isLoading) {
    return <Spinner />
  }

  const filteredStudies = studies.filter((s) => {
    if (subjectFilter === 'all') return true
    return s.subject === subjectFilter
  })

  const activeStudies = filteredStudies.filter((s) => !s.completed)
  const completedStudies = filteredStudies.filter((s) => s.completed)

  const selectedDateStudies = studies.filter((study) => {
    if (!study.dueDate) return false

    const studyDate = new Date(study.dueDate).toDateString()
    const selected = new Date(date).toDateString()

    return studyDate === selected
  })

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Studies Dashboard</p>
      </section>

      <StudyForm />

      <select
        value={subjectFilter}
        onChange={(e) => setSubjectFilter(e.target.value)}
        style={{ marginBottom: '1rem' }}
      >
        <option value="all">All subjects</option>
        {subjects.map((subj, i) => (
          <option key={i} value={subj}>{subj}</option>
        ))}
      </select>

      <div className="lists">
        
        <div>
          <h2>To Do</h2>
          {activeStudies.length > 0 ? (
            activeStudies.map((study) => (
              <StudyItem key={study._id} study={study} />
            ))
          ) : (
            <p>No tasks</p>
          )}
        </div>

        <div>
          <h2>Completed</h2>
          {completedStudies.length > 0 ? (
            completedStudies.map((study) => (
              <StudyItem key={study._id} study={study} />
            ))
          ) : (
            <p>No completed tasks</p>
          )}
        </div>

        <div className="calendar-layout">

          <div className="calendar-box">
            <Calendar
              onChange={setDate}
              value={date}
              tileContent={({ date, view }) => {
                if (view === 'month') {
                  const hasTask = studies.some((study) => {
                    if (!study.dueDate) return false
                    return (
                      new Date(study.dueDate).toDateString() === date.toDateString()
                    )
                  })

                  return hasTask ? <span className="dot"></span> : null
                }
              }}
            />
          </div>

          <div className="day-tasks">
            <h3>Tasks for this day</h3>

            {selectedDateStudies.length > 0 ? (
              selectedDateStudies.map((study) => (
                <StudyItem key={study._id} study={study} />
              ))
            ) : (
              <p>No tasks</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
