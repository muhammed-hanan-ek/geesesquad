import React, { useContext, useEffect, useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Spinner } from 'react-bootstrap';
import { addTaskApi, getPendingTasksApi, deleteTaskApi } from '../Services/AllApi';
import { highlengthContext, lowlengthContext, mediumlengthContext } from '../contexts/contextShare';

const Dash = () => {
  const [lowLength,setlowLength]=useContext(lowlengthContext)
  const[highLength, setHighLength]=useContext(highlengthContext)
  const[meduimLength,setMediumLength]=useContext(mediumlengthContext)
  const [open, setOpen] = useState(false);
  const [showtask, setShowtask] = useState(false);
  const [taskToShow, setTaskToShow] = useState(null); // To hold task data for modal
  const [allpendingTasks, setAllPendingTasks] = useState([]);
  const [taskDetails, setTaskDetails] = useState({
    title: '',
    description: '',
    date: '',
    priority: '',
    status: 'pending',
  });

  const { title, description, date, priority, status } = taskDetails;

  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch Pending Tasks
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
      alert('Error occurred while fetching tasks');
    }
  };

  // Handle Add Task
  const handleAddTask = async () => {
    if (title && description && date && priority && status) {
      const token = sessionStorage.getItem('token');
      if (token) {
        const reqHeader = {
          Authorization: `Bearer ${token}`,
        };
        try {
          const result = await addTaskApi(taskDetails, reqHeader);
          if (result.status === 200) {
            alert('Task added successfully!');
            setTaskDetails({
              title: '',
              description: '',
              date: '',
              priority: '',
              status: 'pending',
            });
            setOpen(false);
            fetchTasks(); // Refresh task list
          } else {
            alert('Failed to add task. Please try again.');
          }
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      alert('Fill the form completely');
    }
  };

  // Handle Delete Task
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
        setShowtask(false)
        fetchTasks(); // Refresh the tasks list after deletion
      } else {
        alert('Failed to delete task. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while deleting the task.');
    }
  };

  const homeTasks = allpendingTasks?.slice(0, 3);

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


  return (
    <div style={{ height: '100vh' }}>
      <Header />
      <div className='row mt-5 mb-5 container-fluid'>
        <div className='col-lg-4'></div>
        <div className='col-lg-4 d-flex justify-content-center'>
          <Link
            to={'/high'}
            className='p-3 py-5'
            style={{ borderRadius: '70px 20px 20px 20px', background: '#cfecc5', textDecoration: 'none' }}
          >
            <div style={{ fontSize: '50px', textAlign: 'center' }}>
              <i className='fa-solid fa-ranking-star text-dark'></i>
            </div>
            <div className='text-dark text-center fs-3 fw-bold'>High Priority</div>
            <div className='text-dark text-center fs-5 fw-bold'>{highLength} Tasks</div>
          </Link>
          <div className='ms-2'>
            <div
              className='px-3 py-3 d-flex justify-content-center'
              style={{ borderRadius: '10px 50px 10px 10px', background: '#84d8f7', textDecoration: 'none' }}
            >
              <Link to={'/medium'} style={{ textDecoration: 'none' }}>
                <div style={{ fontSize: '30px', textAlign: 'center' }}>
                  <i className='fa-solid fa-ranking-star text-dark'></i>
                </div>
                <div className='text-dark text-center f4-3 fw-bold'>Medium Priority</div>
                <div className='text-dark text-center fw-bold'>{meduimLength} Tasks</div>
              </Link>
            </div>
            <div
              className='px-3 py-3 mt-2'
              style={{ borderRadius: '10px 50px 10px 10px', background: '#d9b9da' }}
            >
              <Link to={'/low'} style={{ textDecoration: 'none' }}>
                <div style={{ fontSize: '30px', textAlign: 'center' }}>
                  <i className='fa-solid fa-ranking-star text-dark'></i>
                </div>
                <div className='text-dark text-center f4-3 fw-bold'>Low Priority</div>
                <div className='text-dark text-center fw-bold'>{lowLength} Tasks</div>
              </Link>
            </div>
          </div>
        </div>
        <div className='col-lg-4'></div>
      </div>
      <div className='d-flex justify-content-around align-items-center'>
        <h3 className='fw-bold'>PENDING TASKS</h3>
        <Link to={'/pendingtask'} className='btn btn-primary fw-bold px-5'>
          See All
        </Link>
      </div>
      <div className='container p-5'>
        {homeTasks.length > 0 ? (
          homeTasks?.map((task) => (
            <button
              onClick={() => {
                setTaskToShow(task); // Set the selected task in state
                setShowtask(true); // Show the modal
              }}
              className='bg-light p-3 mt-2 row w-100 row'
              style={{ borderRadius: '20px' }}
              key={task._id}
            >
              <div className='col-1 '>
                <div
                  className='bg-dark text-center d-flex justify-content-center align-items-center'
                  style={{ width: '70px', height: '70px', borderRadius: '50%' }}
                >
                  <i className='fa-solid fa-list-check fs-2 p-3 text-light'></i>
                </div>
              </div>
              <div className='col-11 d-flex justify-content-between'>
                <div>
                  <h3 className='text-start fw-bold'>{task.title}</h3>
                  <h5 className='text-start'>{task.date}</h5>
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className='text-danger fw-bold text-center'>Not available</div>
        )}
      </div>
      <div className='container px-5 py-3'>
        <Collapse in={open}>
          <div id='example-collapse-text'>
            <h2 className='mb-3'>Add Your Task!!!</h2>
            <div className='row'>
              <div className='col-lg-6'>
                <input
                  value={taskDetails.title}
                  onChange={(e) => setTaskDetails({ ...taskDetails, title: e.target.value })}
                  type='text'
                  className='form-control p-3  mb-3'
                  placeholder='Task Title'
                />
              </div>
              <div className='col-lg-6'>
                <input
                  value={taskDetails.description}
                  onChange={(e) => setTaskDetails({ ...taskDetails, description: e.target.value })}
                  type='text'
                  className='form-control p-3  mb-3'
                  placeholder='Description'
                />
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-6'>
                <input
                  onChange={(e) => setTaskDetails({ ...taskDetails, date: e.target.value })}
                  type='date'
                  className='form-control p-3  mb-3'
                  placeholder='Ending date'
                />
              </div>
              <div className='col-lg-6'>
                <select
                  value={taskDetails.priority}
                  onChange={(e) => setTaskDetails({ ...taskDetails, priority: e.target.value })}
                  className='w-100 p-3 form-control'
                >
                  <option disabled>Priority</option>
                  <option value='high'>High</option>
                  <option value='medium'>Medium</option>
                  <option value='low'>Low</option>
                </select>
              </div>
            </div>
            <button onClick={handleAddTask} className='w-100 btn btn-primary p-3 mt-3 fw-bold'>
              Add
            </button>
          </div>
        </Collapse>
      </div>
      <div className='container'>
        <div
          className='bg-primary p-4 w-100 container text-light d-flex justify-content-around align-items-center'
          style={{ borderRadius: '50px 50px 0px 0px' }}
        >
          <Link to={'/'}>
            <i className='fa-solid fa-house fs-3'></i>
          </Link>
          <button
            onClick={() => setOpen(!open)}
            aria-controls='example-collapse-text'
            aria-expanded={open}
            className='btn border-primary'
          >
            <i className='fa-solid fa-plus fs-3'></i>
          </button>
          <Link to={'/history'}>
            <i className='fa-solid fa-clock-rotate-left fs-3'></i>
          </Link>
        </div>
      </div>
      <Modal centered show={showtask} onHide={() => setShowtask(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{taskToShow?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <span className='fw-bold'>Description: </span>{taskToShow?.description}
          </p>
          <div className='fw-bold'>Ending Date: {taskToShow?.date}</div>
          <div className='fw-bold'>Priority: {taskToShow?.priority}</div>
          <div className='fw-bold d-flex align-items-center'>
            Status: <Spinner animation='border' size='sm' className='mx-2' /> {taskToShow?.status}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => handleDeleteTask(taskToShow?._id)}>
            <i className='fa-solid fa-trash text-danger'></i>
          </Button>
          
        </Modal.Footer>
      </Modal>
      <Footer />
    </div>
  );
};

export default Dash;
