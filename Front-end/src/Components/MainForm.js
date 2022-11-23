import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import '../newstyle.css'

const Mainform = () => {
    const navigate = useNavigate()
    const validation = () =>{
        if(!data.name){
            setError("Please enter your name");
            return false;
        }if (!data.room){
            setError("Please select room");
            return false;

        }
        setError("");
        return true;
    }
    const [error,setError] = useState("")

    const [data,setData] = useState({name:"",room:""})
    const handleSubmit = (e) =>{
        e.preventDefault();
        const isvalid = validation();
        if(isvalid){
            navigate(`/chat/${data.room}`,{state:data})
        }
    }
    const handleChange = (e)=>{
        // console.log(e.target.name,e.target.value);
        setData({
            ...data,
            [e.target.name]:e.target.value
        })

        // const handleEnter = e=>{
        //     e.keyCode === 13 ?handleSubmit:"";
        // }
    }
    const postData= async(e)=>{
        e.preventDefault();
        const {name,room} = data;
        const res = await fetch('/',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                name,room
            })
            
        });
        const data = await res.json();
        if(data.status === 422||!data){
            window.alert("Invalid ragistration");
            console.log("Invalid ragistration");
        }else{
            window.alert("Successful ragistration");
            console.log("Successful ragistration");
        }
        
    }


  return (
    <>
    <div className=" w-full h-screen flex justify-center items-center p-2  bg-pink-500 ">
        <form method='POST' className="flex text-center flex-col rounded-lg lg:w-1/2 w-full p-6 bg-pink-200"  onSubmit={handleSubmit}>
            <div className="form-group mb-4">
                <h2 className="font-bold text-4xl text-pink-700">Welcome to Chat club</h2>
            </div>
            <div className="form-group mb-4 ">
                <input onChange={handleChange}  className='bg-light text-xl placeholder:text-center focus:outline-none focus:border-y-2 text-pink-800 m-auto text-center  rounded-xl focus:border-pink-500 font-bold p-2 w-full form-control' type="text" name="name" id="" placeholder='Enter Name'/>
            </div>
            <div className="form-group mb-4">
                <select name="room" onChange={handleChange} className="w-full rounded-xl focus:outline-none focus:border-y-2  text-pink-800 bg-pink- focus:border-pink-500 text-center p-2 text-xl font-bold form-select bg-light">
                    <option className="font-bold rounded-2xl bg-pink-100" value="">Select Room</option>
                    <option className="font-bold rounded-2xl bg-pink-100" value="Gaming">Gaming</option>
                    <option className="font-bold rounded-2xl bg-pink-100" value="Coding">Coding</option>
                    <option className="font-bold rounded-2xl bg-pink-100" value="SocialMedia">SocialMedia</option>
                </select>
            </div>
            <button type="submit" className="text-2xl rounded-xl hover:text-pink-50 transition-all hover:bg-pink-700 p-2 font-bold w-full bg-pink-600 text-pink-200  " onClick={()=>postData}>Submit</button>

            {error?<small className="text-xl font-extrabold p-2 bg-white text-red-600 border-4 border-red-500 mt-4">{error}</small> :""}
        </form>

    </div>
    </>
  )
}

export default Mainform