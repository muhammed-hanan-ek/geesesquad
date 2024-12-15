import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import './landing.css'
import { useNavigate } from 'react-router-dom'


const Landing = () => {
  const navigate=useNavigate()
  const token = sessionStorage.getItem("token")
  const handleGetStarted=()=>{
    if(token){
      navigate('/dashboard')
    }else{
      alert("Please Login or Create new account")
    }
  }
  return (
    <>
        <Header/>
        <div style={{height:"90vh",borderRadius:"1200px 100px 1200px 100px"}} className="d-flex justify-content-center m-4 text-dark bg-light align-items-center">
       <div>
       <div className='text-center' style={{fontSize:"70px"}}><i class="fa-solid fa-list-check me-3"></i></div>
         <h1 className='fw-bold text-center' style={{fontSize:"50px"}}>TASK MANAGER</h1>
         <h5 id='slogan' className='text-center'>Plan, prioritize, and conquer your day with ease!</h5>
         <div className='d-flex justify-content-center mt-3' ><button onClick={handleGetStarted} style={{textDecoration:"none"}} className="btn btn-primary fw-bold mt-3 p-3">Get Started</button></div>
         </div>
        </div>
        <h1 className='text-light text-center mt-5 mb-3'>Your Ultimate Solution for Task Management!</h1>
        <div className="text-light text-center fs-5 mb-5" style={{lineHeight:"1.5"}}>With our Task Management tool, organize all your tasks and projects seamlessly on a single <br />platform, ensuring effortless planning, tracking, and achieving of your goals with ease</div>
        <div className="d-flex justify-content-evenly mb-5 flex-wrap">
            <div className="text-center text-light">
                <div style={{fontSize:"50px"}}><i class="fa-solid fa-chart-simple"></i></div>
                <h4 className='fw-bold'>Seamless Task Organization</h4>
                <div className='fs-5'> Categorize, prioritize, and manage <br /> your tasks effortlessly with an intuitive <br /> interface.</div>
            </div>
            <div className="text-center text-light">
                <div style={{fontSize:"50px"}}><i class="fa-solid fa-bars-progress"></i></div>
                <h4 className='fw-bold'>Progress Tracking</h4>
                <div className='fs-5'> Visualize your progress with <br /> real-time updates and performance <br /> insights to stay on top of deadlines</div>
            </div>
        </div>
        <Footer/>
        
    </>
  )
}

export default Landing