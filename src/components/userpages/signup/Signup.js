import {useState} from 'react';
import {Link,Navigate,useNavigate} from 'react-router-dom';
import signupImage from '../../../img/signup.png';
import {useAuth} from '../../../context/AuthContext';

const initial={name:'',email:'',password:'',country:'',city:'',street:'',number:''};
export default function Signup(){
 const {firebaseUser,signup}=useAuth(); const [form,setForm]=useState(initial); const [error,setError]=useState(''); const [saving,setSaving]=useState(false); const navigate=useNavigate();
 if(firebaseUser)return <Navigate to="/home" replace/>; const field=(name)=>(e)=>setForm({...form,[name]:e.target.value});
 const submit=async(e)=>{e.preventDefault();if(form.password.length<8)return setError('Password must be at least 8 characters.');setSaving(true);setError('');try{await signup(form);navigate('/home');}catch(err){setError(err.code==='auth/email-already-in-use'?'Email already taken.':'Could not create your account.');}finally{setSaving(false)}};
 return <div className="min-h-screen bg-gray-100 flex flex-col items-center"><img src={signupImage} className="w-full max-w-2xl max-h-60 object-contain" alt="Sign up"/><p className="text-lg font-bold text-gray-800">Give Us Some Informations Of Yours.</p><form onSubmit={submit} className="w-11/12 md:w-1/2 lg:w-1/3 my-8 p-6 bg-white border rounded-md shadow-2xl space-y-4">{[['name','Full Name','text'],['password','Password','password'],['email','Email','email'],['country','Country','text'],['city','City','text'],['street','Street','text'],['number','Phone Number','tel']].map(([name,label,type])=><label key={name} className="block text-sm font-bold text-gray-800">{label}<input className="mt-2 border border-gray-300 px-3 py-3 w-full rounded focus:outline-none focus:border-indigo-700" required type={type} value={form[name]} onChange={field(name)}/></label>)}{error&&<p className="text-sm text-red-600">{error}</p>}<button disabled={saving} className="w-full bg-cyan-700 hover:bg-cyan-600 rounded text-white px-8 py-3 text-lg">{saving?'Creating...':'Submit'}</button><p className="text-center text-sm"><Link className="text-cyan-700" to="/signin">Already have an account?</Link></p></form></div>;
}
