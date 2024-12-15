import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { getLowPrioriTaskApi, deleteTaskApi, EditTaskApi } from '../Services/AllApi';

const Low = () => {
  const [lowTask, setLowTask] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTask, setEditTask] = useState({
    _id: '',
    title: '',
    description: '',
    status: '',
    date: '',
  });

  useEffect(() => {
    fetchLowTasks();
  }, []);

  // Fetch Low Priority Tasks
  const fetchLowTasks = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      alert('Please log in to view tasks.');
      return;
    }

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const result = await getLowPrioriTaskApi(reqHeader);
      if (result.status === 200) {
        setLowTask(result.data.reverse());
      }
    } catch (err) {
      console.error(err);
      alert('Error occurred while fetching tasks');
    }
  };

  // Delete Task
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
        fetchLowTasks(); // Refresh the tasks list
      } else {
        alert('Failed to delete task. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while deleting the task.');
    }
  };

  // Handle Edit Button Click
  const handleEditClick = (task) => {
    setEditTask(task);
    setShowEditModal(true);
  };

  // Handle Input Change in Modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditTask({ ...editTask, [name]: value });
  };

  // Save Updated Task
  const handleSaveTask = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      alert('Please log in to edit tasks.');
      return;
    }

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const result = await EditTaskApi(editTask._id, editTask, reqHeader);
      if (result.status === 200) {
        alert('Task updated successfully!');
        setShowEditModal(false);
        fetchLowTasks(); // Refresh the tasks list
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
        fetchLowTasks(); // Refresh tasks list
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
        <i className="fa-solid fa-ranking-star fs-3 me-3"></i>Low Priority
      </h1>
      <div className="row py-3">
        {lowTask.length > 0 ? (
          lowTask.map((task) => (
            <div key={task._id} className="col-lg-3 d-flex justify-content-center">
              <div className="card bg-light text-dark" style={{ height: '420px', width: '20rem' }}>
                <h2 className="text-center mt-4 fw-bold">{task.title}</h2>
                <hr />
                <div className="ms-3 fw-bold">Description:</div>
                <br />
                <div className="ms-3" style={{ textAlign: 'justify' }}>
                  {task.description}
                </div>
                <div className="ms-3 fw-bold mt-3">Date: {task.date}</div>
                <div className="ms-3 fw-bold mt-3">Priority: {task.priority}</div>
                <div className="fw-bold d-flex align-items-center ms-3">
                  Status:{' '}
                  {task.status === 'pending' ? (
                    <>
                      <Spinner animation="border" size="sm" className="mx-2" /> {task.status}{' '}
                      <button
                        className="btn btn-light ms-2 fw-bold"
                        onClick={() => handleMarkComplete(task)} // Mark as completed
                      >
                        Complete
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="ms-3 me-1">
                        <i className="fa-solid fa-circle-check" style={{ color: 'green' }}></i>
                      </span>
                      Completed
                    </>
                  )}
                </div>
                <div className="d-flex justify-content-end">
                  <button onClick={() => handleDeleteTask(task._id)} className="btn border-light">
                    <i className="fa-solid fa-trash text-danger"></i>
                  </button>
                  <button
                    onClick={() => handleEditClick(task)}
                    className="btn border-light"
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
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={editTask.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={editTask.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={editTask.status}
                onChange={handleInputChange}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={editTask.date}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveTask}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </div>
  );
};

export default Low;
