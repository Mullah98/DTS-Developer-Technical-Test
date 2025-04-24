import React, { Fragment } from 'react'
import InputTask from './components/InputTask'
import ListTasks from './components/ListTasks'

function App() {
  

  return (
    <Fragment>
    <div className='container'>
      <InputTask />
      <ListTasks />
    </div>
    </Fragment>
  )
}

export default App
