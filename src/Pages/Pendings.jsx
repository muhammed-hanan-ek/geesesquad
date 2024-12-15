import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Spinner } from 'react-bootstrap';
import Footer from '../Components/Footer';
import { deleteTaskApi, EditTaskApi, getPendingTasksApi } from '../Services/AllApi';

const Pendings = () => {
  const [selectedTask, setSelectedTask] = useState(null); // Track the selected task
  const [allPendingTasks, setAllPendingTasks] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false); // Track the edit modal visibility
  const [editForm, setEditForm] = useState({ title: '', description: '', date: '', priority: '' });

  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch pending tasks
  const fetchTasks = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      alert('Please log in to view tasks.');
      return;
    }

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const result = await getPendingTasksApi(reqHeader);
      if (result.status === 200) {
        setAllPendingTasks(result.data.reverse());
      }
    } catch (err) {
      console.error(err);
      alert('Error occurred while fetching tasks.');
    }
  };

  // Delete task
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
        fetchTasks(); // Refresh the tasks list
        setSelectedTask(null); // Close the modal
      } else {
        alert('Failed to delete task. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while deleting the task.');
    }
  };

  // Open Edit Modal
  const handleEditTask = () => {
    if (selectedTask) {
      setEditForm({
        title: selectedTask.title,
        description: selectedTask.description,
        date: selectedTask.date,
        priority: selectedTask.priority,
      });
      setShowEditModal(true);
    }
  };

  // Save Edited Task
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
        setShowEditModal(false); // Close edit modal
        setSelectedTask(null); // Close details modal
        fetchTasks(); // Refresh tasks list
      } else {
        alert('Failed to update task. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while updating the task.');
    }
  };

  // Mark task as completed
  const handleMarkComplete = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      alert('Please log in.');
      return;
    }

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    const updatedTask = { ...selectedTask, status: 'Completed' }; // Modify the status to 'Completed'

    try {
      const result = await EditTaskApi(selectedTask._id, updatedTask, reqHeader); // Assuming EditTaskApi can update status as well
      if (result.status === 200) {
        alert('Task marked as completed!');
        fetchTasks(); // Refresh tasks list
        setSelectedTask(null); // Close the details modal
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
      <h1 className="mt-4 text-light p-3 container-fluid fw-bold rounded">
        Pending Tasks
      </h1>
      <div className="container">
        {allPendingTasks.length > 0 ? (
          allPendingTasks?.map((task) => (
            <button
              key={task._id}
              onClick={() => setSelectedTask(task)} // Set the selected task
              className="bg-light p-3 mt-2 row w-100 row mb-2"
              style={{ borderRadius: '20px' }}
            >
              <div className="col-lg-1">
                <div
                  className="bg-dark text-center d-flex justify-content-center align-items-center"
                  style={{ width: '70px', height: '70px', borderRadius: '50%' }}
                >
                  <i className="fa-solid fa-list-check fs-2 p-3 text-light"></i>
                </div>
              </div>
              <div className="col-lg-11 d-flex justify-content-between">
                <div>
                  <h3 className="text-start fw-bold">{task.title}</h3>
                  <h5 className="text-start">{task.date}</h5>
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="fw-bold text-danger text-center">Tasks not available</div>
        )}
      </div>

      {/* Modal for Selected Task Details */}
      {selectedTask && (
        <Modal centered show={!!selectedTask} onHide={() => setSelectedTask(null)}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedTask.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <span className="fw-bold">Description: </span>
              {selectedTask.description || 'No description provided'}
            </p>
            <div className="fw-bold">Ending Date: {selectedTask.date || 'N/A'}</div>
            <div className="fw-bold">Priority: {selectedTask.priority}</div>
            <div className="fw-bold d-flex align-items-center">
              Status: <Spinner animation="border" size="sm" className="mx-2" /> {selectedTask.status}{' '}
              <button className="btn btn-light ms-2 fw-bold" onClick={handleMarkComplete}>
                Complete
              </button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => handleDeleteTask(selectedTask._id)}
              variant="secondary"
            >
              <i className="fa-solid fa-trash text-danger"></i>
            </Button>
            <Button onClick={handleEditTask} variant="secondary">
              <i className="fa-solid fa-pen-to-square text-success"></i>
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Modal for Editing Task */}
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
              <label htmlFor="date" className="form-label">Ending Date</label>
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
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
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

export default Pendings;
