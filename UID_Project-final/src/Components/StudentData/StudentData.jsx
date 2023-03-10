import React,{useState,useEffect} from 'react'

import {useParams} from 'react-router-dom'

import './StudentData.css'
import Navbar from '../Navbar/Navbar'


export default function StudentData() {
  const [student,setStudent] = useState([])
  const [fees,setFees] = useState("")
  const {id} = useParams();
  console.log(id)
  const getData = async()=>{
      
      await fetch(`http://localhost:4000/student/${id}`,{
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin':'*'
        },
        method:'get'
      }) 
      .then((obj)=>obj.json()) 
      .then((value)=>{
          setStudent(value);
          // console.log("first")
          // console.log(student)
          // console.log("first")

          // if(student.dest === "Bhavani")
          //   setFees("8000")
          // if(student.dest === "Erode")
          //   setFees("8000")
          // if(student.dest === "Tirupur")
          //   setFees("12000")
          // if(student.dest === "Nasiyanur")
          //   setFees("7000")
          console.log(fees)
      })  
  }

  useEffect(()=>{
      getData();
  },[id])


  return (
    <>
          <Navbar/>
        <div className="container stud-data">
          <div className="content">
          <h5 className='detail'>Name : {student.sname}</h5>
          <h6 className='detail'>Department : {student.bno}</h6>
          <h6 className='detail'>parent Name : {student.dest}</h6>
          <h6 className='detail'>Roll Number : {student.rollNo}</h6>
          
          {
            (function(){

              if(student.status=='yes')
              {
                return(
                  <h5 >Fees Paid</h5>
                )
              }
              else{
                return(
                  <>
                  <h5 style={{color:'red'}}>Semester Fees Not paid</h5>
                  
                  <form action={`http://localhost:4000/update/${student._id}`} method="post">
                    {/* <button type='submit' className='btn btn-success'>Pay {fees}</button> */}
                  </form>
                  </>
                )
              }
            }())
          }


          </div>
        </div>
    </>
  )
}
