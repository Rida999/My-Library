import React,{useState,useEffect} from 'react';
import { FaArrowCircleUp,FaArrowCircleDown  } from 'react-icons/fa';

const TopAndBottom = () => {
    const [isVisible, setIsVisible] = useState(true);
    const listenToScroll = () => {
        let heightToHideFrom = 1000;
        const winScroll = document.body.scrollTop || 
            document.documentElement.scrollTop;
           
        if (winScroll > heightToHideFrom) { 
           isVisible &&      // to limit setting state only the first time         
             setIsVisible(false);
        } else {
             setIsVisible(true);
        }  
      };
    useEffect(() => {   
        window.addEventListener("scroll", listenToScroll);
        return () => 
           window.removeEventListener("scroll", listenToScroll); 
      }, [])
    return (
        isVisible?(
        <a href='#bottom' className='bottom' id='bottom'>
            <FaArrowCircleDown className='text-5xl fixed z-10 bottom-8 right-4 text-slate-500 cursor-pointer' />
        </a>
       ):(
        <a href='#top'>
            <FaArrowCircleUp className='text-5xl fixed z-10 bottom-8 right-4 text-slate-500 cursor-pointer' />
        </a>
        )
        );
}

export default TopAndBottom;
