import React from 'react';
import Allswipers from './Swiper/Allswipers';
// import Swipers from './Swiper/Swipers';


const Categories = (props) => {
    const {books}=props
    return (
        <div className='flex flex-col m-8'>
            <Allswipers books={books} />
        </div>
    );
}

export default Categories;
