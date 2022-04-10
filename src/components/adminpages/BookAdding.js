import { addDoc } from 'firebase/firestore';
import React,{useState} from 'react';
import Addingbooks from "../../img/Addingbooks.svg";

const BookAdding = (props) => {
    const {colRefBooks}=props;
    const [details, setdetails] = useState({title:"",author:"",price:"",description:"",category:"",language:"",url:""});
    const submitHandler=(e)=>{
        addDoc(colRefBooks,details)
        .then(()=>{
            setdetails({title:"",author:"",price:"",description:"",category:"",language:"",url:""});
        })
    }
    return (
        <div className='w-full h-full flex justify-center items-center '>
            <div className='flex w-11/12 md:w-1/2 lg:w-1/3 min-h-full my-8 bg-white flex-col justify-center items-center border-slate-600 border-2 border-opacity-20 rounded-md shadow-2xl'>
                <div>
                    <img src={Addingbooks} alt="" />
                </div>
                <div className='p-8 pt-0 flex-1 flex flex-col items-center'>
                    <p className='text-xl my-5'>Add Book Information</p>
                    <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6 items-center min-w-full">
                        <label htmlFor="Title" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                            Title:
                        </label>
                        <input
                        onChange={e=>setdetails({...details,title:e.target.value})} value={details.title}
                        type="text" id="Title" name="Title" required className="w-80 border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded bg-transparent text-sm focus:outline-none focus:border-cyan-600 placeholder-gray-500 text-gray-500 dark:text-gray-400" />
                    </div>
                    <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6 items-center min-w-full">
                        <label htmlFor="Author" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                            Author:
                        </label>
                        <input
                        onChange={e=>setdetails({...details,author:e.target.value})} value={details.author}
                        type="text" id="Author" name="Author" required className="w-80 border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded bg-transparent text-sm focus:outline-none focus:border-cyan-600 placeholder-gray-500 text-gray-500 dark:text-gray-400" />
                    </div>
                    <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6 items-center min-w-full">
                        <label htmlFor="Price" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                            Price:
                        </label>
                        <input
                        onChange={e=>setdetails({...details,price:e.target.value})} value={details.price}
                        type="text" id="Price" name="Price" required className="w-80 border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded bg-transparent text-sm focus:outline-none focus:border-cyan-600 placeholder-gray-500 text-gray-500 dark:text-gray-400" />
                    </div>
                    <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6 items-center min-w-full">
                        <label htmlFor="Description" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                            Description:
                        </label>
                        <textarea
                        onChange={e=>setdetails({...details,description:e.target.value})} value={details.description}
                        id="Description" name="Description" required className="w-80 border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded bg-transparent text-sm focus:outline-none focus:border-cyan-600 placeholder-gray-500 text-gray-500 dark:text-gray-400" />
                    </div>
                    <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6 items-center min-w-full">
                        <label htmlFor="Category" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                            Category:
                        </label>
                        <select id="Category" name="Categorie" required onClick={e=>setdetails({...details,category:e.target.value})} className="w-80 border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded bg-transparent text-sm focus:outline-none focus:border-cyan-600 placeholder-gray-500 text-gray-500 dark:text-gray-400">
                            <option value="Horror" >Horror</option>
                            <option value="Detective-and-Mystery" >Detective-and-Mystery</option>
                            <option value="Romance" >Romance</option>
                            <option value="Kid-Zone" >Kid-Zone</option>
                            <option value="Historical" >Historical</option>
                            <option value="Action-and-Adventure" >Action-and-Adventure</option>
                            <option value="Comic-Book" >Comic-Book</option>
                        </select>
                    </div>
                    <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6 items-center min-w-full">
                        <label htmlFor="Language" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                            Language:
                        </label>
                        <select id="Language" name="Language" required onClick={e=>{setdetails({...details,language:e.target.value})}} className="w-80 border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded bg-transparent text-sm focus:outline-none focus:border-cyan-600 placeholder-gray-500 text-gray-500 dark:text-gray-400">
                            <option value="Arabic">Arabic</option>
                            <option value="English" selected>English</option>
                            <option value="French">French</option>
                        </select>
                    </div>
                    <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6 items-center min-w-full">
                        <label htmlFor="url" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                            Img url:
                        </label>
                        <input
                        onChange={e=>setdetails({...details,url:e.target.value})} value={details.url}
                        type="text" id="url" name="url" required className="w-80 border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded bg-transparent text-sm focus:outline-none focus:border-cyan-600 placeholder-gray-500 text-gray-500 dark:text-gray-400" />
                    </div>
                    <button onClick={submitHandler} className="bg-cyan-700 focus:outline-none transition duration-150 ease-in-out hover:bg-cyan-600 rounded text-white px-20 py-3 text-lg" type="submit">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BookAdding;
