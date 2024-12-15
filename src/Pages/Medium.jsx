import React, { useContext, useEffect, useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Spinner, Modal, Button } from 'react-bootstrap';
import { getMediumPrioriTaskApi, deleteTaskApi, EditTaskApi } from '../Services/AllApi';
import { mediumlengthContext } from '../contexts/contextShare';

const Medium = () => {
  const [meduimLength,setMediumLength]=useContext(mediumlengthContext)
  const [mediumTask, setMediumTask] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({ title: '', description: '', date: '', priority: '' });

  useEffect(() => {
    fetchMediumTasks();
  }, []);

  const fetchMediumTasks = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      alert('Please log in to view tasks.');
      return;
    }

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const result = await getMediumPrioriTaskApi(reqHeader);
      if (result.status === 200) {
        setMediumTask(result.data.reverse());
        setMediumLength(result.data.length)
      }
    } catch (err) {
      console.error(err);
      alert('Error occurred while fetching tasks');
    }
  };

  const handleDeleteTask = async (id) => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      alert('Please log in to delete tasks.');
      return;
    }

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const result = await deleteTaskApi(id, reqHeader);
      if (result.status === 200) {
        alert('Task deleted successfully!');
        fetchMediumTasks();
      } else {
        alert('Failed to delete task. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while deleting the task.');
    }
  };

  const handleEditTask = (task) => {
    setEditForm({
      title: task.title,
      description: task.description,
      date: task.date,
      priority: task.priority,
    });
    setSelectedTask(task);
    setShowEditModal(true);
  };

  const handleSaveEditedTask = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      alert('Please log in.');
      return;
    }

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const result = await EditTaskApi(selectedTask._id, editForm, reqHeader);
      if (result.status === 200) {
        alert('Task updated successfully!');
        setShowEditModal(false);
        fetchMediumTasks();
      } else {
        alert('Failed to update task. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while updating the task.');
    }
  };

  // Mark task as completed
  const handleMarkComplete = async (task) => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      alert('Please log in.');
      return;
    }

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    const updatedTask = { ...task, status: 'Completed' };

    try {
      const result = await EditTaskApi(task._id, updatedTask, reqHeader); // Update the status of the task
      if (result.status === 200) {
        alert('Task marked as completed!');
        fetchMediumTasks(); // Refresh tasks list
      } else {
        alert('Failed to update task status. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while updating the task status.');
    }
  };

  return (
    <div>
      <Header />
      <h1 className="mt-4 text-light p-3 container-fluid fw-bold rounded ">
        <i className="fa-solid fa-ranking-star fs-3 me-3"></i>Medium Priority
      </h1>
      <div className="row py-3">
        {mediumTask.length > 0 ? (
          mediumTask.map((task) => (
            <div key={task._id} className="col-lg-3 d-flex justify-content-center">
              <div className="card bg-light text-dark" style={{ height: '420px', width: '20rem' }}>
                <h2 className="text-center mt-4 fw-bold">{task.title}</h2>
                <hr />
                <div className="ms-3 fw-bold">Description:</div>
                <div className="container" style={{ textAlign: 'justify' }}>
                  {task.description}
                </div>
                <div className="ms-3 fw-bold mt-3">Date: {task.date}</div>
                <div className="ms-3 fw-bold mt-3">Priority: {task.priority}</div>
                <div className="fw-bold d-flex align-items-center ms-3">
                  Status:
                  {task.status === 'pending' ? (
                    <>
                      <Spinner animation="border" size="sm" className="mx-2" /> {task.status}{' '}
                      <button 
                        className="btn btn-light ms-2 fw-bold" 
                        onClick={() => handleMarkComplete(task)} // Call handleMarkComplete when clicked
                      >
                        Complete
                      </button>
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-circle-check text-success ms-2"></i> Completed
                    </>
                  )}
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    className="btn border-light"
                    onClick={() => handleDeleteTask(task._id)}
                  >
                    <i className="fa-solid fa-trash text-danger"></i>
                  </button>
                  <button
                    className="btn border-light"
                    onClick={() => handleEditTask(task)}
                  >
                    <i className="fa-solid fa-pen-to-square text-success"></i>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-danger">Tasks not Available</div>
        )}
      </div>

      {/* Edit Modal */}
      <Modal centered show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                id="date"
                value={editForm.date}
                onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="priority" className="form-label">Priority</label>
              <select
                className="form-select"
                id="priority"
                value={editForm.priority}
                onChange={(e) => setEditForm({ ...editForm, priority: e.target.value })}
              >
                <option value="">Select Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSaveEditedTask}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </div>
  );
};

export default Medium;
