import React from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { addBookToCart, removeBook, toggleFavorite } from '../../../services/library';
import { useAuth } from '../../../context/AuthContext';

const Cards = (props) => {
    const {Checked,books,Input,Admin,User}=props
    const {profile}=useAuth();
    //   filtered books
    const FilteredBooks=books.filter((book)=>{
        return book.title.toLowerCase().includes(Input.toLowerCase())
                ||book.author.toLowerCase().includes(Input.toLowerCase())
    });
    const FinalBooks=(Checked.length!==0)?FilteredBooks.filter((book)=>Checked.indexOf(book.language)!==-1):FilteredBooks;
    // end filtered 
    // adding items to cart
    const HandleAddtoCart=async(book)=>{
        await addBookToCart(User.id,book);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your Book Have Been Added To Your Cart',
            showConfirmButton: false,
            timer: 1500
          })
    }
    // // deleting cards
    const HandleDeleteCard=(e)=>{
        const bookId=e.currentTarget.id;
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
            removeBook(bookId);
            }
          })
    }
    // end adding items to cart
    return (
        <div>
            <div className="grid mx-16 my-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 sm:m-10">
                {
                    FinalBooks.map((book)=>(
                        <div key={book.id}>
                            <div className='relative'>
                                <img className="w-full h-72 rounded-t-xl block" src={book.url} alt="games" />
                                <button onClick={() => User.id && toggleFavorite(User.id,book.id,profile?.favorites?.includes(book.id))} className="w-8 h-8 absolute bottom-2 right-2 hover:scale-110 text-white" aria-label="Toggle favorite">{profile?.favorites?.includes(book.id)?<HeartSolidIcon className="text-red-500"/>:<HeartIcon/>}</button>
                            </div>
                            <div className="py-2 px-4 w-full flex justify-between bg-indigo-700">
                                <p className="text-sm text-white font-semibold tracking-wide overflow-y-auto">{book.author}</p>
                                <p className="text-sm text-white font-semibold tracking-wide">{book.price}$</p>
                            </div>
                            <div className="bg-white shadow-xl flex flex-col px-3  lg:px-5 py-2 rounded-bl-3xl rounded-br-3xl">
                                <h1 className="text-md text-gray-900 font-semibold h-12 tracking-wider ">{book.title}</h1>
                                <p className="text-gray-700 text-sm  lg:text-sm h-10 lg:leading-8 pr-4 tracking-wide overflow-x-hidden overflow-y-auto ">{book.description}</p>
                                {User.email===""?
                                <Link to="/signin" className="text-white from- bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 hover:bg-gradient-to-br focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-900 shadow-lg shadow-indigo-600/60 dark:shadow-lg dark:shadow-indigo-900/90 font-medium rounded-lg sm:text-xl text-base px-5 py-2.5 text-center mx-13 my-3 ">Add to cart</Link>:
                                (Admin?<button id={book.id} onClick={HandleDeleteCard}  className="text-white from- bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 hover:bg-gradient-to-br focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-900 shadow-lg shadow-indigo-600/60 dark:shadow-lg dark:shadow-indigo-900/90 font-medium rounded-lg sm:text-xl text-base px-5 py-2.5 text-center mx-13 my-3 ">Delete Book</button>:
                                (User.email==="delivery@delivery.com"? <button id={book.id} disabled className="text-white cursor-not-allowed from- bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 hover:bg-gradient-to-br focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-900 shadow-lg shadow-indigo-600/60 dark:shadow-lg dark:shadow-indigo-900/90 font-medium rounded-lg sm:text-xl text-base px-5 py-2.5 text-center mx-13 my-3 ">Book</button>:
                                <button id={book.id} onClick={()=>HandleAddtoCart(book)} className="text-white from- bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 hover:bg-gradient-to-br focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-900 shadow-lg shadow-indigo-600/60 dark:shadow-lg dark:shadow-indigo-900/90 font-medium rounded-lg sm:text-xl text-base px-5 py-2.5 text-center mx-13 my-3 ">Add to cart</button>))}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Cards;
