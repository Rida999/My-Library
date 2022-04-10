import React from 'react';
import SectionInfo from './SectionInfo';
import SectionItems from './SectionItems';
  
  export default function CheckOut(props) {
    const {CartItems,User,db}=props;
    return (
    <>
      <SectionItems CartItems={CartItems} />
      <SectionInfo User={User} CartItems={CartItems} db={db} />
    </>
    )
  }
