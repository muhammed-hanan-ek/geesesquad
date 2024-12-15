import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { getcompletedTaskApi } from '../Services/AllApi'

const History = () => {
  const[completedTask,setCompletedTask]=useState([])
  console.log(completedTask);
  
  useEffect(()=>{
    fetchCompletedTasks()
  },[])
  
    const token = sessionStorage.getItem("token")
      const fetchCompletedTasks = async () => {
          const token = sessionStorage.getItem("token");
          if (!token) {
            alert("Please log in to view expenses.");
            return;
          }
      
          const reqHeader = {
            Authorization: `Bearer ${token}`,
          };
      
          try {
            const result = await getcompletedTaskApi(reqHeader);
            if (result.status === 200) {
              setCompletedTask(result.data.reverse());
            }
          } catch (err) {
            console.error(err);
            alert("Error occurred while fetching tasks");
          }
        };
  return (
    <div>
        <Header/>
        <h1 className="mt-4 text-light p-3 container-fluid fw-bold rounded ">
        <i class="fa-solid fa-clock-rotate-left fs-3 me-3"></i>History
        </h1>
       <div className="row py-3">
        {
          completedTask.length>0?
          completedTask?.map(task=>(
            <div className="col-lg-3 d-flex justify-content-center">
        <div className="card bg-light text-dark" style={{height:"350px",width:"18rem"}}>
                    <h2 className='text-center mt-4 fw-bold'>{task.title}</h2><hr />
                    <div className="ms-3 fw-bold">Description:</div><br />
                    <div className='container' style={{textAlign:"justify"}}>{task.description}</div>
                    <div className="ms-3 fw-bold mt-3">Date: {task.date}</div>
                    <div className="ms-3 fw-bold mt-3 d-flex align-items-center">Status: <span className='ms-3 me-1'><i class="fa-solid fa-circle-check" style={{color:"green"}}></i></span>Completed</div>
                </div>
        </div>
        
          )):<div className="text-center text-danger">Tasks not Available</div>

        }
        
       </div>
        <Footer/>
    </div>
  )
}

export default History