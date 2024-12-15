import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import './Header.css'

import Modal from 'react-bootstrap/Modal';


const Header = () => {

    const token=sessionStorage.getItem("token")
    const [username,setUsername]=useState('')
    const [email,setEmail]=useState('')
    
    const navigate=useNavigate()
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(()=>{
        const user=sessionStorage.getItem("user")
        if (user) {
            setUsername(JSON.parse(user).username);
            setEmail(JSON.parse(user).email);
          } else {
            setUsername('');
            setEmail('');
          }
    },[])

    // logout
    const handleLogout=()=>{
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        navigate('/')
    }
    return (
        <>
            <div className='bg-light text-dark container-fluid d-flex align-items-center' style={{ height: "80px" }}>
                <Link to={'/'} className='text-dark fw-bold ms-3 name' style={{ textDecoration: "none" }}><i class="fa-solid fa-list-check me-3"></i>TASK MANAGER</Link>
                <div className="ms-auto d-flex">
                    
                    <button onClick={handleShow} className='btn btn-dark' style={{borderRadius:"50%"}}>
                    <i class="fa-solid fa-user"></i>
                    </button>
                </div>

            </div>
            <div>

            </div>
            <Modal show={show} onHide={handleClose}
            
            style={{
                
            }}centered
            id='modal'>
        
        <Modal.Body>
            <div className="d-flex justify-content-center p-5">
                {
                    token?
                    <div className='text-center'>
                    <h5>Username</h5>
                    <span>{username}</span>
                    <h5 className='mt-4'>Email</h5>
                    <span>{email}</span>
                </div>
                :
                <div className='text-danger fw-bold  text-center'>Please Login or Register</div>
                
}
            </div>
        </Modal.Body>
        {token?<button onClick={handleLogout} variant="secondary" className='btn btn-light fw-bold'>
        <i class="fa-solid fa-right-from-bracket me-2"></i> Logout
          </button>
        :
        <Modal.Footer>
          <Link to={'/login'} variant="secondary" className='btn btn-light'>
            Sign In
          </Link>
        </Modal.Footer>
        
        }

      </Modal>
        </>

    )
}

export default Header