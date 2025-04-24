import React, { Fragment, useEffect, useState } from 'react'
import EditTask from './EditTask';

function ListTasks() {

    const [tasks, setTasks] = useState([]);

    //Delete a single task
    const deleteTask = async (id) => {
        try {
            const deleteTask = await fetch(`http://localhost:5000/tasks/${id}`, {
                method: "DELETE"
            });
            setTasks(tasks.filter(task => task.task_id !== id))
            
        } catch (err) {
            console.log(err.message);
        }
    }

    //Update the task status
    const updateStatus = async (id, newStatus) => {
      try {
        const body = { status: newStatus };
        const response = await fetch(`http://localhost:5000/tasks/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });
        
        if (response.ok) {
          const updatedTask = await response.json();
          setTasks(tasks.map(task => task.task_id === id ? {...task, status: updatedTask.status || newStatus} : task))
        }
      } catch (err) {
        console.log(err.message)
      }
    }


    const getTasks = async () => {
        try {
            const response = await fetch("http://localhost:5000/tasks");
            const jsonData = await response.json();
            setTasks(jsonData);
        } catch (err) {
            console.log(err.message)
        }
    }

    //Format the date and time picker
    const formatter = new Intl.DateTimeFormat("en-GB", {
      dateStyle: "short",
      timeStyle: "short",
      hour12: true
    })

    useEffect(() => {
        getTasks();
    }, [])

  return <Fragment>
      <table className="table table-striped mt-5 text-center">
    <thead>
      <tr>
        <th>Title</th>
        <th>Description</th>
        <th>Status</th>
        <th>Due date/time</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {tasks.map(task => (
        <tr key={task.task_id} className={task.status === "Complete" ? "table-success" : ""}>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>
              <select className='form-select form-select-sm rounded' style={{ cursor: 'pointer' }} value={task.status} onChange={(e) => updateStatus(task.task_id, e.target.value)}>
                <option value='Incomplete'>Incomplete</option>
                <option value='Complete'>Complete</option>
              </select>
            </td>
            <td>{formatter.format(new Date(task.due_date))}</td>
            <td>
                <EditTask task={task} />
            </td>
            <td><button className='btn btn-danger' onClick={() => deleteTask(task.task_id)}>Delete</button></td>
        </tr>
      ))}                               
    </tbody>
  </table>
  </Fragment>
}

export default ListTasks
