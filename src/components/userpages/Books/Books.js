import React,{useState} from 'react';
import Cards from './Cards';
import Filter from './Filter';
import Search from './Search';
import Posters from './Posters/Posters';
import TopAndBottom from './TopAndBottom';


const Books = (props) => {
    const {books,CartItems,Admin,db,User}=props;
    const [Input, setInput] =useState("");
    const HandleChange=(e)=>{
        setInput(e.target.value);
    }
    // checked
    const [Checked, setChecked] = useState([]);

    const handleToggle=(e)=>{
        const currentIndex=Checked.indexOf(e.target.value);
        const newChecked=[...Checked];

        if(currentIndex===-1){
            newChecked.push(e.target.value)
        }
        else{
            newChecked.splice(currentIndex, 1)
        }
        setChecked(newChecked);
    }
    // end checked
    return (
        <div className='flex flex-col m-8'>
            <div className='flex justify-center'>
                <Search HandleChange={HandleChange} Input={Input} />
            </div>
            <Posters />
            <Filter handleToggle={handleToggle} />
            <Cards books={books} CartItems={CartItems} Input={Input} Checked={Checked} Admin={Admin} db={db} User={User} />
            <TopAndBottom />
        </div>
    );
}

export default Books;
