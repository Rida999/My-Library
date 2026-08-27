import { Link } from 'react-router-dom';
import { MinusIcon, PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../../context/AuthContext';
import { saveCart } from '../../../services/library';
import { calculateSubtotal } from '../../../utils/catalog';

export default function Cart({onClose}) {
  const {profile}=useAuth();
  const items=profile?.cart||[];
  const change=(id,delta)=>saveCart(profile.id,items.map((item)=>item.id===id?{...item,qty:Math.max(1,Math.min(9,Number(item.qty)+delta))}:item));
  const remove=(id)=>saveCart(profile.id,items.filter((item)=>item.id!==id));
  return <div className="fixed inset-0 z-50 bg-black bg-opacity-80" onMouseDown={onClose}><aside className="absolute right-0 h-full w-full md:w-2/3 lg:w-1/2 bg-white flex flex-col" onMouseDown={(e)=>e.stopPropagation()}><header className="flex items-center justify-between px-6 py-5 border-b"><h2 className="text-3xl font-black text-gray-800">Bag</h2><button onClick={onClose} aria-label="Close cart"><XMarkIcon className="w-7"/></button></header><div className="flex-1 overflow-y-auto px-6">{items.length===0?<div className="h-full flex items-center justify-center text-2xl text-gray-400">Your bag is empty</div>:items.map((item)=><article key={item.id} className="grid grid-cols-[80px_1fr_auto] gap-4 py-6 border-b"><img className="w-20 h-28 object-cover" src={item.url} alt=""/><div><h3 className="font-bold text-gray-800">{item.title}</h3><p className="text-sm text-gray-500">{item.author}</p><div className="inline-flex items-center border mt-4"><button className="p-2" onClick={()=>change(item.id,-1)}><MinusIcon className="w-4"/></button><span className="px-2">{item.qty}</span><button className="p-2" onClick={()=>change(item.id,1)}><PlusIcon className="w-4"/></button></div></div><div className="flex flex-col justify-between items-end"><strong>{Number(item.price)*Number(item.qty)}$</strong><button onClick={()=>remove(item.id)} className="text-red-500" aria-label="Remove"><TrashIcon className="w-5"/></button></div></article>)}</div>{items.length>0&&<footer className="bg-gray-100 p-6"><div className="flex justify-between text-2xl font-bold mb-5"><span>Subtotal</span><span>{calculateSubtotal(items)}$</span></div><Link onClick={onClose} to="/checkout" className="block w-full text-center py-4 bg-gray-800 text-white text-xl">Checkout</Link></footer>}</aside></div>;
}
