import { useDispatch } from 'react-redux'
import { toggleComplete, deleteStudy } from '../features/studies/studySlice'

function StudyItem({ study }) {
  const dispatch = useDispatch()

  return (

    <div className={`study ${study.completed ? 'completed' : ''}`}>
      <div className='study-content'>
        <h3>{study.text}</h3>
        {study.subject && <p>{study.subject}</p>}
        {study.dueDate && (
          <p>
            Due: {new Date(study.dueDate).toLocaleDateString()}
          </p>
        )}
      </div>

      <div className="study-actions">
        <button
          className="complete-btn"
          onClick={() => dispatch(toggleComplete(study))}
        >
          {study.completed ? '↺' : '✓'}
        </button>

        <button
          className="close"
          onClick={() => dispatch(deleteStudy(study._id))}
        >
          ✕
        </button>
      </div>
    </div>
  )
}

export default StudyItem