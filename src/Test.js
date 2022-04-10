import React,{useState} from 'react';
import {storage_bucket} from "./DataBase/Data";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Test = (props) => {
    const {User}=props;
    const [file, setfile] = useState(null);
    const [url, seturl] = useState(null);
    const storageRef=ref(storage_bucket);
    const imageRef=ref(storage_bucket,"users-images");
    const sparkyRef=ref(storage_bucket,`users-images/${User.email}.png`)
    const handleupload=(e)=>{
        setfile(e.target.files[0]);
    }
    const handleClick=()=>{
        uploadBytes(sparkyRef,file).then((snapshot)=>{
            console.log("photo has been uploaded");
            console.log(User.email)
        });
        getDownloadURL(sparkyRef)
            .then((url)=>{
                seturl(url)
            })
    }
    return (
        <div>
            <input type ="file" onChange={handleupload} />
            <button onClick={handleClick}>Upload</button>
            {url?
            <img src={url} alt="" />:""}
        </div>
    );
}

export default Test;
