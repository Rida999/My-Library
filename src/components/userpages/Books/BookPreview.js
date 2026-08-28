import React,{useEffect,useState} from 'react';
import { Link,useParams } from 'react-router-dom';
import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import './BookPreview.css';

const Page=({front,back,index,current})=><div className={`flip-sheet ${current>index?'is-flipped':''}`} style={{zIndex:current>index?index:10-index}}><div className="flip-face flip-front">{front}</div><div className="flip-face flip-back">{back}</div></div>;

export default function BookPreview({books}){
 const {bookId}=useParams(); const [page,setPage]=useState(0); const book=books.find((item)=>item.id===bookId);
 useEffect(()=>{
  const turnWithKeyboard=(event)=>{
   if(event.key==='ArrowLeft')setPage((current)=>Math.max(0,current-1));
   if(event.key==='ArrowRight')setPage((current)=>Math.min(3,current+1));
  };
  window.addEventListener('keydown',turnWithKeyboard);
  return ()=>window.removeEventListener('keydown',turnWithKeyboard);
 },[]);
 if(!book)return <div className="min-h-screen flex flex-col items-center justify-center"><h1 className="text-3xl font-bold">Book not found</h1><Link className="mt-5 text-indigo-700" to="/home">Back to books</Link></div>;
 const pages=[
  {front:<div className="cover-page" style={{backgroundImage:`url(${book.url})`}}><div><h1>{book.title}</h1><p>{book.author}</p></div></div>,back:<div className="paper-page title-page"><p className="page-label">My Library</p><h2>{book.title}</h2><p>by {book.author}</p></div>},
  {front:<div className="paper-page"><p className="page-label">About this book</p><h2>The story</h2><p className="page-copy">{book.description||'No description is available for this book.'}</p></div>,back:<div className="paper-page"><p className="page-label">Book details</p><h2>Details</h2><dl><div><dt>Category</dt><dd>{book.category?.replaceAll('-',' ')||'General'}</dd></div><div><dt>Language</dt><dd>{book.language||'Not specified'}</dd></div><div><dt>Author</dt><dd>{book.author}</dd></div></dl></div>},
  {front:<div className="paper-page final-page"><p className="page-label">Available now</p><h2>Add it to your shelf</h2><p className="book-price">{book.price}$</p><Link to="/home" className="preview-action" onClick={(event)=>event.stopPropagation()}>Return to collection</Link></div>,back:<div className="back-cover"><span>MY LIBRARY</span></div>}
 ];
 const turnFromBook=(event)=>{
  const bounds=event.currentTarget.getBoundingClientRect();
  const clickedLeft=event.clientX<bounds.left+(bounds.width/2);
  setPage((current)=>clickedLeft?Math.max(0,current-1):Math.min(pages.length,current+1));
 };
 return <main className="reader-page"><div className="reader-header"><Link to="/home"><ArrowLeftIcon/>Back to books</Link><span>{book.title}</span></div><div className="flip-stage"><div className="flip-book" onClick={turnFromBook}>{pages.map((item,index)=><Page key={index} {...item} index={index} current={page}/>)}</div></div><div className="reader-controls"><button disabled={page===0} onClick={()=>setPage(Math.max(0,page-1))}><ChevronLeftIcon/>Previous</button><span>{page+1} / {pages.length+1}</span><button disabled={page===pages.length} onClick={()=>setPage(Math.min(pages.length,page+1))}>Next<ChevronRightIcon/></button></div></main>;
}
