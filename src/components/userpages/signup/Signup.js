import React,{useState} from "react";
import { Link } from "react-router-dom";
import PasswordStrengthBar from 'react-password-strength-bar';
import Swal from 'sweetalert2';
import signup from '../../../img/signup.png'
import { useForm } from "react-hook-form";
import bcrypt from "bcryptjs/dist/bcrypt";

const Signup = (props) => {
    const {SignupInfo,adminUsers,userImgHandler}=props;
    const [url, seturl] = useState("");
    // form handling with errors
    const {register,handleSubmit,setError,formState:{errors}}=useForm();
    const [emailExisted, setemailExisted] = useState(false);
    // strength bar handling
    const [score, setscore] = useState(0);
    // data handling
    const [details, setdetails] = useState({cart:[],purchased:[],pending:[],name:"",password:"",email:"",country:"",city:"",street:"",number:"",img:false});
    const submitHandler=()=>{
        if(emailExisted){
            setError("email",{types:{type1:"already taken"}});
        }
        else{
            SignupInfo({...details,password:bcrypt.hashSync(details.password, 8)});
        }
    }
    const PhotoHandler=async()=>{
        const { value: file } =await Swal.fire({
            title: 'Select image',
            input: 'file',
            inputAttributes: {
              'accept': '.jpg,.png,.jpeg',
              'aria-label': 'Upload your profile picture'
            }
          })
          
          if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
              Swal.fire({
                title: 'Your uploaded picture',
                imageUrl: e.target.result,
                imageAlt: 'The uploaded picture'
              });
              seturl(e.target.result);
            }
            reader.readAsDataURL(file);
            userImgHandler(file);
            setdetails({...details,img:true})
          }
    }
    // end data

    return (
            <div className=" dark:bg-gray-800 flex flex-col items-center justify-center w-full" >
                <div className=" dark:bg-gray-800 rounded flex flex-col min-w-full min-h-full">
                    <div className="xl:w-full dark:border-gray-700  dark:bg-gray-800">
                        <div className="flex flex-col w-11/12 mx-auto xl:w-full xl:mx-0 items-center justify-center">
                            <img src={signup} alt="" />
                            <p className="text-lg text-gray-800 dark:text-gray-100 font-bold">Give Us Some Informations Of Yours.</p>
                        </div>
                    </div>
                </div>
                <form className='w-full h-full flex justify-center items-center' onSubmit={handleSubmit(submitHandler)}>
                    <div className='flex w-11/12 md:w-1/2 lg:w-1/3 min-h-full my-8 py-6 bg-white flex-col justify-center items-center border-slate-600 border-2 border-opacity-20 rounded-md shadow-2xl'>     
                            <div className="mx-auto flex flex-col items-center justify-center">
                                <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-2 items-center cursor-pointer min-w-full">
                                    <div className="w-20 h-20 rounded-full bg-cover bg-center bg-no-repeat absolute shadow flex flex-col items-center justify-center" onClick={PhotoHandler}>
                                        {url!==""?<img src={url} alt="" />:(
                                            <div>
                                                 <img src="https://cdn.tuk.dev/assets/webapp/forms/form_layouts/form2.jpg" alt="" className="absolute z-0 h-full w-full object-cover rounded-full shadow top-0 left-0 bottom-0 right-0" />
                                        <div className="absolute bg-black opacity-50 top-0 right-0 bottom-0 left-0 rounded-full z-0" />
                                            <div className="cursor-pointer flex flex-col justify-center items-center z-10 text-gray-100">
                                                <p className="text-xs text-gray-100 z-10">Edit Picture</p>
                                            </div>
                                            </div>
                                        )}
                                       </div>
                                    </div>
                                </div>
                                <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-2 items-center min-w-full mt-24">
                                    <label htmlFor="fullname" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                        Full Name
                                    </label>
                                    <div className="flex flex-col">
                                        <input type="text" id="fullname" {...register("fullname",{required:true})} name="fullname" onChange={e=>setdetails({...details,name:e.target.value})} value={details.name} className="border border-gray-300 dark:border-gray-700 pl-3 w-80 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent placeholder-gray-500 text-gray-500 dark:text-gray-400" placeholder="@example" />
                                        {errors.fullname?(
                                        <span className="text-red-600 text-xs">
                                        {errors.fullname?.type==="required" && "name is required"}
                                        </span>):""}
                                    </div>
                                </div>
                                <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-2 items-center min-w-full">
                                    <label htmlFor="password" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                        Password
                                    </label>
                                    <div className="flex flex-col">
                                        <input type="password" id="password" {...register("password",{required:true,validate:value=>score>1})} name="password" onChange={e=>setdetails({...details,password:e.target.value})} value={details.password}  className="w-80 border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" />
                                        {errors.password?(
                                            <span className="text-red-600 text-xs">
                                            {errors.password?.type==="required" && "password is required"}
                                            {errors.password?.type==="validate" && "make you're password stronger"}
                                            </span>):""}
                                    </div>
                                    <PasswordStrengthBar password={details.password} onChangeScore={(e)=>{setscore(e)}} className="w-80" />
                                </div>
                                <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6 items-center min-w-full">
                                    <label htmlFor="Email" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                        Email
                                    </label>
                                    <div className="flex flex-col">
                                        <div className="border border-gray-300 shadow-sm rounded flex">
                                            <div className="px-4 py-3 dark:text-gray-100 flex items-center border-r border-gray-300">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail" width={30} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                    <rect x={3} y={5} width={18} height={14} rx={2} />
                                                    <polyline points="3 7 12 13 21 7" />
                                                </svg>
                                            </div>
                                                <input 
                                                type="text"
                                                 id="Email"
                                                  {...register("email",{required:true,pattern:{value:/^[\w-\.]+@((gmail|hotmail|yahoo|outlook)+\.)+com$/}})}
                                                   name="email"
                                                    onChange={e=>{setdetails({...details,email:e.target.value})}}
                                                    onInput={e=>{adminUsers.map((user)=>{if(user.email===e.target.value){setemailExisted(true)}})}}
                                                     value={details.email} 
                                                      className="pl-3 w-64 py-3 w-full text-sm focus:outline-none placeholder-gray-500 rounded bg-transparent text-gray-500 dark:text-gray-400" placeholder="example@gmail.com" 
                                                      />
                                        </div>
                                        {errors.email?(
                                                    <span className="text-red-600 text-xs">
                                                    {errors.email?.types?.type1}
                                                    {errors.email?.type==="required" && "email is required"}
                                                    {errors.email?.type==="pattern" && "there is no such an email"}
                                                    </span>):""}
                                    </div>
                                </div>
                                <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6 items-center min-w-full">
                                    <label htmlFor="Country" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                        Country
                                    </label>
                                    <div className="flex flex-col">
                                        <input type="text" id="Country" {...register("country",{required:true})} name="country" onChange={e=>setdetails({...details,country:e.target.value})} value={details.country}  className="w-80 border bg-transparent border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" placeholder="Lebanon" />
                                        {errors.country?(
                                                        <span className="text-red-600 text-xs">
                                                        {errors.country?.type==="required" && "country is required"}
                                                        </span>):""}
                                    </div>
                                </div>
                                <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6 items-center min-w-full">
                                    <label htmlFor="City" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                        City
                                    </label>
                                    <div className="flex flex-col">
                                        <div className="w-80 border border-gray-300 dark:border-gray-700 shadow-sm rounded flex">
                                            <input type="text" id="City" {...register("city",{required:true})} name="city" onChange={e=>setdetails({...details,city:e.target.value})} value={details.city}  className="pl-3 py-3 w-full text-sm focus:outline-none border border-transparent focus:border-indigo-700 bg-transparent rounded placeholder-gray-500 text-gray-500 dark:text-gray-400" placeholder="Beirut" />
                                        </div>
                                        {errors.city?(
                                                    <span className="text-red-600 text-xs">
                                                    {errors.city?.type==="required" && "city is required"}
                                                    </span>):""}
                                    </div>
                                </div>
                                <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6 items-center min-w-full">
                                    <label htmlFor="StreetAddress" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                        Street Address
                                    </label>
                                    <div className="flex flex-col">
                                        <input type="text" id="StreetAddress" {...register("street",{required:true})} name="street" onChange={e=>setdetails({...details,street:e.target.value})} value={details.street}  className="w-80 border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded bg-transparent text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" />
                                        {errors.street?(
                                                            <span className="text-red-600 text-xs">
                                                            {errors.street?.type==="required" && "street is required"}
                                                            </span>):""}
                                    </div>
                                </div>
                                <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6 items-center min-w-full">
                                    <label htmlFor="number" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                        Phone Number
                                    </label>
                                    <div className="flex flex-col">
                                        <input type="tel" id="number" {...register("number",{required:true,pattern:{value:/[0-9]{8}/}})} name="number" onChange={e=>setdetails({...details,number:e.target.value})} value={details.number}  className="w-80 border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded bg-transparent text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" />
                                        {errors.number?(
                                                            <span className="text-red-600 text-xs">
                                                            {errors.number?.type==="required" && "number is required"}
                                                            {errors.number?.type==="pattern" && "there is no such a number"}
                                                            </span>):""}
                                    </div>
                                </div>
                                <div className="w-full sm:px-0 bg-white dark:bg-gray-800 flex items-center flex-col">
                                    <button type="submit" className="bg-cyan-700 focus:outline-none transition duration-150 ease-in-out hover:bg-cyan-600 rounded text-white px-16 py-3 text-sm">
                                        Sign up
                                    </button>
                                    <h1>or</h1>
                                    <Link to="/signin">
                                        <button className="bg-gray-200 focus:outline-none transition duration-150 ease-in-out hover:bg-gray-300 dark:bg-gray-700 rounded text-cyan-600 dark:text-cyan-600 px-10 py-2 text-xs">Sign in</button>
                                    </Link>
                                </div>
                            </div>
                    </form>    
                </div>  
    );
};
export default Signup;
