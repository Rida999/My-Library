import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import Swipers from './Swipers'

const Allswipers = (props) => {
    const {books}=props;
    const Categories=[
        {
            name:"All",
            class:"text-white bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-800 shadow-lg shadow-sky-500/50 dark:shadow-lg dark:shadow-sky-800/80 font-medium rounded-lg text-xl px-5 py-2.5 text-center mx-10 my-4 ",
            id:1
        },
        {
            name:"Horror",
            class:"text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-xl px-5 py-2.5 text-center mx-10 my-4 ",
            id:2
        },
        {
            name:"Detective-and-Mystery",
            class:"text-white bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-xl px-5 py-2.5 text-center mx-10 my-4 ",
            id:3
        },
        {
            name:"Romance",
            class:"text-white bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-xl px-5 py-2.5 text-center mx-10 my-4 ",
            id:4
        },
        {
            name:"Kid-Zone",
            class:"text-white bg-gradient-to-r from-lime-500 via-lime-600 to-lime-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-xl px-5 py-2.5 text-center mx-10 my-4 ",
            id:5
        },
        {
            name:"Historical",
            class:"text-white bg-gradient-to-r from-zinc-500 via-zinc-600 to-zinc-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-zinc-300 dark:focus:ring-zinc-800 shadow-lg shadow-zinc-500/50 dark:shadow-lg dark:shadow-zinc-800/80 font-medium rounded-lg text-xl px-5 py-2.5 text-center mx-10 my-4 ",
            id:6
        },
        {
            name:"Comic-Book",
            class:"text-white bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-amber-300 dark:focus:ring-amber-800 shadow-lg shadow-amber-500/50 dark:shadow-lg dark:shadow-amber-800/80 font-medium rounded-lg text-xl px-5 py-2.5 text-center mx-10 my-4 ",
            id:7
        },
        {
            name:"Action-and-Adventure",
            class:"text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-xl px-5 py-2.5 text-center mx-10 my-4 ",
            id:8
        }
      ];
    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {
                Categories.map((category)=>category.name!=="All"?(
                    <div className='flex flex-col' key={category.id} name={category.name}>
                        <Swipers books={books.filter((book)=>book.category===category.name)} />
                        <Link to={`/categories/${category.name}`} className={category.class}>{category.name}</Link>
                    </div>
                ):(
                    <div className='flex flex-col' key={category.id} name={category.name}>
                        <Swipers books={books} />
                        <Link to={`/home`} className={category.class}>{category.name}</Link>
                    </div>
                )
                )
            }
        </div>
    );
}

export default Allswipers;
