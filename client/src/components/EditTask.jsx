import React, { Fragment, useState } from 'react'

function EditTask({ task }) {

    const [description, setDescription] = useState(task.description)


    //Update the task description
    const updateDescription = async (e) => {
        e.preventDefault();
        try {
            const body = { 
                title: task.title,
                description,
                status: task.status,
                due_date: task.due_date
             };
            const response = await fetch(`http://localhost:5000/tasks/${task.task_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })

            window.location = "/";
            
        } catch (err) {
            console.log(err.messsage)
        }
    }

  return <Fragment>
    <button type="button" className="btn btn-secondary" data-toggle="modal" data-target={`#id${task.task_id}`}>
        Edit
    </button>

    <div className="modal fade" id={`id${task.task_id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
        <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">{task.title}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setDescription(task.description)}>
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div className="modal-body">
            <input type='text' className='form-control' value={description || ""} onChange={e => setDescription(e.target.value)} />
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={e => updateDescription(e)}>Save changes</button>
            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => setDescription(task.description)}>Cancel</button>
        </div>
        </div>
    </div>
    </div>
  </Fragment>
}

export default EditTask
