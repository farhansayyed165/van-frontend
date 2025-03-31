import React, { useState, useEffect } from "react"
import useAuth from "../../hooks/useAuth"
import { Link, useParams, useLocation, useLoaderData } from "react-router-dom"
import { getVans, getUser } from "../../api"
import TransactionSuccess from "../../components/TransactionSuccess"
import TransactionError from "../../components/TransactionError"
import { BaseUrl } from "../../constants"

export function loader({ params }) {
  console.log("params:", params);
  return getVans(params.id)
}

export default function VanDetail() {
  const location = useLocation()
  console.log(location)
  const [userData, setUserData] = useState("fetch");
  const [duration, setDuration] = useState({duration:1, errorMsg:"1", error:false});
  const van = useLoaderData()[0];
  const { auth } = useAuth();
  useEffect(()=>{
    async function fetchData(){
      const response = await getUser("userid", auth.userid);
      setUserData(response.data[0])
      }
      fetchData();
    },[])
  const search = location.state?.search || "";
  const type = location.state?.type || "all";
  const [isOpen, setIsOpen] = useState({payBefore:false, error:false, success:false});
  console.log(userData?.name) 

  const rentalRules = [
    "Do not damage the van.",
    "Return the van with a full tank.",
    "No smoking inside the van.",
    "Drive within speed limits.",
    "Keep the van clean.",
    "Only authorized drivers allowed.",
    "Follow traffic rules.",
    "Report any issues immediately.",
    "Park in safe locations.",
    "Return on time to avoid extra charges."
  ];

  console.log(van)

  const paymentHandler = async(e) =>{
    if(duration.error){
      return
    }
    function displayError(){
      setIsOpen({payBefore:false,error:true,success:false,general:true})
    }
    const amount = van.price*100*duration.duration;
    const currency = "INR";

    const response = await fetch(`${BaseUrl}/api/order`,{
      method:"POST",
      body: JSON.stringify({
        amount,
        currency
      }),
      headers:{
        "Content-Type":"application/json"
      }
    });
    var order;
    try {
      order = await response.json();
      console.log(order);
    } catch (error) {
      displayError();
      console.log(error)
    }

    var options = {
      "key": "rzp_test_U6u6MtX7VIBx9w", // Enter the Key ID generated from the Dashboard
      "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": currency,
      "name": "VANLIFE", //your business name
      "description": "Test Transaction",
      "image": "",
      "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": async function (response){
        const body = {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          van,
          duration:duration.duration,
          userid: userData.userid
        }
        try {       
          const res = await fetch(`${BaseUrl}/api/verify`, {
            method:"POST",
            body: JSON.stringify(body),
            headers:{
              "Content-Type":"application/json"
            }
          })
          console.log("response", res);
          setIsOpen({payBefore:false,error:false,success:true,general:true})
        } catch (error) {
          displayError();
          console.log(error);
        }
    },
      "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
          "name": userData.name, //your customer's name
          "email": userData.email, //Provide the customer's phone number for better conversion rates 
      },
      "theme": {
          "color": "#FF8C38"
      }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
  }

  function handleDurationChange(e){
    if(!e.target.value || e.target.value < 1){
      setDuration(()=>{
        return{
          duration:1,
          errorMsg: " be 1 or more",
          error: true
        }
      })
      return;
    }
    if( e.target.value > 30){
      setDuration(()=>{
        return{
          duration:1,
          errorMsg: " not be more than 30",
          error:true
        }
      })
      return;
    }
      setDuration(()=>{
        return {
          duration:e.target.value,
          errorMsg: "",
          error:false
        }
      });
    
  }



  return (
    <div className="mt-10 van-detail-container">
      <Link
        to={`..${search}`}
        relative="path"
        className="back-button"
      >&larr; <span>Back to {type} vans</span></Link>

      <div className="lg:flex-row gap-6 flex-col van-detail">
        <img className="lg:w-3/4 w-full" src={van.image} />
        <div className="lg:my-[57px]">
          <i className={`van-type ${van.type} selected mb-5`}>
            {van.type}
          </i>
          <h2 className="mt-8">{van.name}</h2>
          <p className="van-price"><span>${van.price}</span>/day</p>
          <p className="lg:w-3/4">{van.details}</p>
          <div className="mt-3">
          <label for="number-input" className="block mb-2 text-base font-medium text-black" >Select number of days:</label>
            {duration.error && <label for="number-input" className="block text-base font-medium text-red-700" >Number should {duration.errorMsg}</label>}
            <input max={30} type="number" id="number-input" aria-describedby="how many days" className="bg-gray-100 rounded-lg block w-full p-2 border-2 border-gray-600" placeholder="How many days?" required onChange={handleDurationChange} defaultValue={1}/>
          </div>
          
          {van.userid == auth.userid &&
            <Link to={`/host/vans/${van.vanid}`}> <button className="  stat-button mt-8"> See Stats</button> </Link>
          }
          {auth?.accessToken ? 
            <button onClick={() => {if(duration.error){return;};setIsOpen({payBefore:true,error:false,success:false,general:true})}} className={`link-button ${duration.error ? "border-[4px] border-rose-700":"border-none"} mt-8`}>Rent this van {`(${van.price*duration.duration})`}</button>
            :
            <Link className="link-button mt-8" to={"/login"} state={{from:{pathname:location.pathname}}}><button>Login to Rent this van</button></Link>
        
        }

            {isOpen.general && (
              
              <div
                className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                onClick={() => setIsOpen(false)}
              >
                {isOpen.success && <TransactionSuccess setIsOpen={setIsOpen}/>}
                {isOpen.error && <TransactionError Retry={paymentHandler} setIsOpen={setIsOpen}/>}
              {isOpen.payBefore &&  <div
                  className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
                  onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                >
                  <h2 className="text-xl font-bold mb-4">Rental Rules</h2>
                  <ul className="list-disc list-inside mb-4 text-gray-700">
                    {rentalRules.map((rule, index) => (
                      <li key={index}>{rule}</li>
                    ))}
                  </ul>
                  <div className="flex justify-between">
                    <button
                      onClick={() => setIsOpen({payBefore:false,error:false,success:false,general:false})}
                      className="bg-gray-500 text-white px-3 py-2 rounded-md hover:bg-gray-600 transition"
                    >
                      Close
                    </button>
                    <button
                      onClick={paymentHandler}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                    >
                      Pay Now
                    </button>
                  </div>
                </div>}
              </div>
            )}
        </div>
      </div>

    </div>
  )
}