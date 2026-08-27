const posters=[
 'https://i.insider.com/5e873c73dcd88c2607758a74?width=1000&format=jpeg&auto=webp',
 'https://cdn.lifehack.org/wp-content/uploads/2015/05/31055903/1-The-Kite-Runner-Riverhead-Edition.jpg',
 'https://images-na.ssl-images-amazon.com/images/I/51sXXoOKvML.jpg'
];
export default function Posters(){return <div className="my-8 grid grid-cols-3 gap-3 sm:gap-6 h-40 sm:h-64 overflow-hidden">{posters.map((url,index)=><img key={url} src={url} alt="Featured book" className={`w-full h-full object-cover rounded-xl shadow-lg ${index===2?'hidden sm:block':''}`}/>)}</div>}
