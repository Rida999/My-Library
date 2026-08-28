import React from 'react';
import Empty from "../../img/Empty.svg";
import { doc,updateDoc,arrayUnion, arrayRemove } from 'firebase/firestore';
import Swal from 'sweetalert2';

const Checklist = (props) => {
    const {user,db,Delivery}=props;
    const Total=user.pending.reduce((Total,Item)=>{return Total+=(Number(Item.price)*Number(Item.qty))},0);
    const docRefUser=doc(db,"users",user.id);
    const HandleAddtoPurchased=(e)=>{
        Swal.fire({
            title: 'Delivered.',
            text: "Good job,lets move to the next one",
          }).then(()=>{
            user.pending.map ((pendingItem)=>{
                if(pendingItem.title+pendingItem.createdAt===e.target.id){
                updateDoc(docRefUser,{
                    purchased:arrayUnion(pendingItem),
                    pending:arrayRemove(pendingItem)
                });
                }
                
            }
        );
          })
    }
    return (
        user.pending.length===0?
        <div className='w-full h-full flex flex-col items-center justify-center'>
            <img src={Empty} className='h-3/4 w-3/4 mt-4 lg:w-1/2' alt="" />
            <h1 className='text-4xl lg:text-6xl mt-4 mb-8'>No Orders</h1>
        </div>
        :
        <div className="mx-auto container px-4 md:px-6 2xl:px-0 py-12 flex justify-center items-center">
            <div className="flex flex-col jusitfy-start items-start">
                <div>
                    <p className="text-md tracking-tight font-medium leading-4 text-gray-600 dark:text-white">{user.name.charAt(0).toUpperCase()+user.name.slice(1)}</p>
                </div>
                <div className="mt-3">
                    <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800 dark:text-white">Orders</h1>
                </div>
                <div className="mt-4">
                    <p className="text-2xl tracking-tight leading-6 text-gray-600 dark:text-white">{user.pending.length} items / {Total}$</p>
                </div>
                <div className="grid mx-16 my-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 sm:m-10">
                    {user.pending.map((item)=>
                            <div className="flex flex-col items-center bg-white shadow-2xl rounded-xl" key={item.title+item.createdAt}>
                                <div className="relative">
                                    <img src={item.url} alt="bag" className='rounded-t-xl h-72 w-screen' />
                                </div>
                                <div className=" flex w-full flex-col justify-between items-center">
                                    <div className='bg bg-green-600 w-full h-5' />
                                    <div className="flex justify-center items-center mt-2">
                                        <p className="tracking-tight text-2xl font-semibold leading-6 text-gray-800 dark:text-white">{item.title}</p>
                                    </div>
                                </div>
                                <div id="menu1" className="flex flex-col jusitfy-start w-full items-start mt-4 pb-4">
                                    <div className='ml-5'>
                                        <div>
                                            <p className="tracking-tight text-base font-medium leading-3 text-gray-800 dark:text-white">Quantity: <span className='text-sm font-normal'>{item.qty}</span></p>
                                        </div>
                                        <div className="mt-3">
                                            <p className="tracking-tight text-base font-medium leading-4 text-gray-800 dark:text-white">Country: <span className='text-sm font-normal'>{user.country}</span></p>
                                        </div>
                                        <div className='mt-3'>
                                            <p className="tracking-tight text-base font-medium leading-4 text-gray-800 dark:text-white">Address: <span className='text-sm font-normal'>{user.city}-{user.street}</span></p>
                                        </div>
                                        <div className="mt-3">
                                            <p className="tracking-tight text-base font-medium leading-4 text-gray-800 dark:text-white">Price: <span className='text-sm font-normal'>{item.price*item.qty}$</span></p>
                                        </div>
                                    </div>
                                    <div className="flex jusitfy-between flex-col lg:flex-row items-center mt-10 w-full space-y-4 lg:space-y-0 lg:space-x-4 xl:space-x-8">
                                        <div className="w-full flex justify-center">
                                            {!Delivery?
                                            <button disabled className="focus:outline-none cursor-not-allowed rounded-xl focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-white w-11/12 tracking-tight py-4 text-lg leading-4 hover:bg-green-700 bg-green-600 border border-green-600 dark:hover:bg-gray-700 dark:hover:text-white">Pending...</button>
                                            :<button onClick={HandleAddtoPurchased} id={item.title+item.createdAt} className="focus:outline-none rounded-xl focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-white w-11/12 tracking-tight py-4 text-lg leading-4 hover:bg-green-700 bg-green-600 border border-green-600 dark:hover:bg-gray-700 dark:hover:text-white">Pending...</button>
                                            }</div>
                                    </div>
                                </div>
                            </div>
                        )
                        }
                </div>
            </div>
        </div>
        );
}

export default Checklist;
