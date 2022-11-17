import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Mainform = () => {
    const navigate = useNavigate()
    const validation = () =>{
        if(!data.name){
            setError("Please enter your name");
            return false;
        }else if (!data.room){
            setError("Please select room");
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
    <div className="px-3 py-4 shadow bg-white text-dark border rounded row">
        <form method='POST'  onSubmit={handleSubmit}>
            <div className="form-group mb-4">
                <h2 className="text-warning mb-4">Welcome to Chat club</h2>
            </div>
            <div className="form-group mb-4">
                <input onChange={handleChange}  className='bg-light form-control' type="text" name="name" id="" placeholder='Enter Name'/>
            </div>
            <div className="form-group mb-4">
                <select name="room" onChange={handleChange} className="form-select bg-light">
                    <option value="">Select Room</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Coding">Coding</option>
                    <option value="SocialMedia">SocialMedia</option>
                </select>
            </div>
            <button type="submit" className='btn btn-warning w-100 mb-2'onClick={()=>postData}>Submit</button>
            {error?<small className='text-danger'>{error}</small> :""}
        </form>

    </div>
    </>
  )
}

export default Mainform