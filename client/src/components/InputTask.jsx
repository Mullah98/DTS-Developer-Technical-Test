import React, { Fragment, useState } from 'react'

function InputTask() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState(false)

  const onSubmitForm = async(e) => {
    e.preventDefault();
    try {
      const body = { title, description, status: status, due_date: dueDate }
      const response = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      window.location = "/";

      console.log(response)
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <Fragment>
      <h1 className='text-center mt-5'>Task Manager</h1>
      <form className='d-flex flex-column gap-3 mt-5' onSubmit={onSubmitForm}>
        <input type='text' className={`form-control ${error ? 'is-invalid' : ''}`} value={title} placeholder='Title' onChange={(e) => setTitle(e.target.value)} required />
        <input type='text' className='form-control' value={description} placeholder='Description' onChange={(e) => setDescription(e.target.value)} />
        <input type='datetime-local' className='form-control pointer-hover' value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        <button className='btn btn-success'>Add task</button>
      </form>
    </Fragment>
  )
}

export default InputTask
