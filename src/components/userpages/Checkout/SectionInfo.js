import React from 'react';
import { Button } from '@mui/material';
import { doc,updateDoc,arrayUnion, serverTimestamp } from 'firebase/firestore';
import Swal from 'sweetalert2';

const SectionInfo = (props) => {
    const {User,CartItems,db}=props;
    // sound
    const hooray=new Audio("https://cdn.videvo.net/videvo_files/audio/premium/audio0070/watermarked/CrowdCheering%206082_96_preview.mp3");
    //  
    const docRefUser=doc(db,"users",User.id);
    const HandleAddtoPending=(e)=>{
        hooray.play();
        Swal.fire({
            title: 'congratulations!',
            text: "We'll reach you as soon as possible.",
            imageUrl: 'https://cdn.dribbble.com/users/458522/screenshots/14007167/media/214f6fa81fbd40f3b65b2cb747393226.png?compress=1&resize=400x300',
            imageWidth: 400,
            imageHeight: 300,
            imageAlt: 'hooray',
          }).then(()=>{
            CartItems.map ((CartItem)=>{
                const d=new Date();
                const date=`${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
                updateDoc(docRefUser,{
                    pending:arrayUnion({...CartItem,createdAt:date}),
                    cart:[],
                });
                // updateDoc(docRefUser,{
                    
                // });
            }
        );
          })
    }
    return (
        <div className="flex flex-col mb-24">
        <div className="-my-2 overflow-x-auto mt-4">
          <div className="py-2 px-2 align-middle min-w-full sm:px-6 lg:px-8 flex flex-col items-center w-full ">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg w-full">
                <p className='text-xl mb-3'>Personal Informations:</p>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                            email
                            </th>
                            <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                            address
                            </th>
                            <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                            Number
                            </th>
                            <th>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {User.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{User.country}-{User.city}-{User.street}</div>
                            </td>
                            <td className="px-6 py-4 pr-12 whitespace-nowrap text-left">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                    {User.number}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='mt-5'>
                <Button variant='contained' color='primary' onClick={HandleAddtoPending}><p className='text-xl px-5 py-1'>Purchase</p></Button>
            </div>
          </div>
        </div>
      </div>

    );
}

export default SectionInfo;
