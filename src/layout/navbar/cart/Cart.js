import React, { useContext } from "react";
import { ShowContext } from "../Navbar";
import Swal from 'sweetalert2';
import { doc,updateDoc,arrayUnion, arrayRemove } from 'firebase/firestore';
import { Link } from "react-router-dom";

function Cart(props) {
    const {CartItems,db,User}=props
    const {Show,setShow} = useContext(ShowContext);
    const SubTotal=CartItems.reduce((SubTotal,CartItem)=>SubTotal+Number(Number(CartItem.price)*Number(CartItem.qty)),0);
    const Shipping=2;
    const Total=SubTotal+Shipping;
    const docRefUser=doc(db,"users",User.id);
    const onQtyChange=(e)=>{
        CartItems.map ((item)=>{
        if(item.id===e.target.id){
            if(item.qty!==e.target.value){
                updateDoc(docRefUser,{
                    cart:arrayRemove(item)
                })
            };
            updateDoc(docRefUser,{
            cart:arrayUnion({...item,qty:e.target.value}),
          });
        }
    }
      );
        };
    const HandleDeleteCard=(e)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              );
          updateDoc(docRefUser,{
            cart:CartItems.filter((CartItem)=>{
                return CartItem.id!==e.target.id
            })})
        };
    })}
    return (
        <>
            <div>
                {Show && (
                    <div className="w-full h-full bg-black bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden z-50 fixed sticky-0" id="chec-div">
                        <div className={`${CartItems.length==0?'w-1/2':'w-5/6'} absolute z-10 right-0 h-full  overflow-x-hidden transform translate-x-0 transition-all ease-in-out duration-700" id="checkout`}>
                            <div className="flex md:flex-row overflow-y-auto flex-col justify-end items-end" id="cart">
                                <div className="lg:w-full w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 flex flex-col bg-white overflow-x-hidden h-screen" id="scroll">
                                    <div className="flex items-center text-gray-500 hover:text-gray-600 cursor-pointer" onClick={(e) => {setShow(!Show)}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <polyline points="15 6 9 12 15 18" />
                                        </svg>
                                        <p className="text-sm pl-2 leading-none">Back</p>
                                    </div>
                                    <p className="text-5xl font-black leading-10 text-gray-800 pt-3">Bag</p>
                                    {/* Cart content */}
                                    {(CartItems.length==0)?<div className="flex items-center justify-center flex-1"><img src="https://professionalscareer.com/assets/images/emptycart.png" /></div>:(
                                        CartItems.map((CartItem)=>(
                                        <div className="md:flex items-center mt-14 pt-8 border-t border-gray-200" key={CartItem.price}>
                                        <div className="w-1/3">
                                            <img src={CartItem.url} alt="" />
                                        </div>
                                        <div className="md:pl-3 md:w-3/4">
                                            {/* <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">RF293</p> */}
                                            <div className="flex items-center justify-between w-full pt-1">
                                                <p className="text-base font-black leading-none text-gray-800">{CartItem.title}</p>
                                                <select className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none" id={CartItem.id} value={CartItem.qty} onChange={onQtyChange}>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                </select>
                                            </div>
                                            <p className="text-xs leading-3 text-gray-600 pt-2">{CartItem.author}</p>
                                            {/* <p className="text-xs leading-3 text-gray-600 py-4">Color: Black</p>
                                            <p className="w-96 text-xs leading-3 text-gray-600">Composition: 100% calf leather</p> */}
                                            <div className="flex items-center justify-between pt-5 pr-6">
                                                <div className="flex itemms-center">
                                                    {/* <p className="text-xs leading-3 underline text-gray-800 cursor-pointer">Add to favorites</p> */}
                                                    <p className="text-md leading-3 underline text-red-500 cursor-pointer" id={CartItem.id} onClick={HandleDeleteCard}>Remove</p>
                                                </div>
                                                <p className="text-base font-black leading-none text-gray-800">{Number(CartItem.price)*Number(CartItem.qty)}$</p>
                                            </div>
                                        </div>
                                    </div>
                                    )))}
                                    {/* end Cart Content */}
                                </div>
                                {CartItems.length==0?"":(
                                <div className="xl:w-1/2 md:w-2/5 w-full bg-gray-100 h-full">
                                    <div className="flex flex-col md:h-screen px-14 py-10 justify-between">
                                        <div>
                                            <p className="text-4xl font-black leading-9 text-gray-800">Summary</p>
                                            <div className="flex items-center justify-between pt-16">
                                                <p className="text-base leading-none text-gray-800">Subtotal</p>
                                                <p className="text-base leading-none text-gray-800">{SubTotal}$</p>
                                            </div>
                                            <div className="flex items-center justify-between pt-5">
                                                <p className="text-base leading-none text-gray-800">Shipping</p>
                                                <p className="text-base leading-none text-gray-800">{Shipping}$</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex items-center pb-4 justify-between lg:pt-5 pt-10">
                                                <p className="text-2xl leading-normal text-gray-800">Total</p>
                                                <p className="text-2xl font-bold leading-normal text-right text-gray-800">{Total}$</p>
                                            </div>
                                            <Link to="/checkout" onClick={() => setShow(!Show)} className="text-center text-xl leading-none w-full py-4 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white">
                                                Checkout
                                            </Link>
                                        </div>
                                    </div>
                                </div>)}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Cart;
