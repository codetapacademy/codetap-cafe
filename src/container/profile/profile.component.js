import React from 'react';
import Button from '../../component/button';
import TextArea from '../../component/text-area';

const Profile = () => {
  const buttonPropList = {
    label: "Edit",
    onClick: () => console.log('mos craciun'),
    // disabled: true
  }

  const textAreaPropList = {
    placeholder: "insert text here",

  }

  return(
    <div>
      <Button {...buttonPropList} />
      <TextArea {...textAreaPropList}/>
    </div>
  )
}

export default Profile;