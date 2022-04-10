import React from 'react'
import "./Bookshelf.css"

export default function Bookshelf(props) {
    const {Purchased}=props
    const colors=["green","blue","umber","springer"];
    const tilte=[{
        id:1,
        tilted:"tilted"
    },
    {
        id:2,
        tilted:0
    },{
        id:3,
        tilted:0
    },
    {
        id:4,
        tilted:0
    },
    {
        id:5,
        tilted:0
    }
        ];
    return (
    <div className='flex flex-col min-h-full items-center mt-5 mb-24'>
        <h1 className='t text-6xl mb-8'>See your purchased books.</h1>
            <div className="bookshelf">
            {Purchased.length!==0?Purchased.map((book)=>{
                return(
                        <div className={`book-${tilte[Math.floor(Math.random()*5)].tilted}`} key={book.createdAt+book.id}>
                            <div className={`book book-${colors[Math.floor(Math.random()*4)]}`}>
                                <h2 className='mt-3'>{book.title}</h2>
                            </div>
                        </div>
                    )
                }):
                        <div className=''>
                            <div className='p-16'>
                                <h1 className='mb-5 text-4xl text-center text-neutral-400'>Nothing have been purchased</h1>
                            </div>
                        </div>
                    }
            </div>
    </div>
  )
}
