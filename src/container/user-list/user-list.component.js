import React, { useContext, useEffect, Fragment } from "react";
import { firestore } from "../../firebase";
import { getState } from "../../redux";
import { DispatchContext } from "../../redux";
import { UPDATE_USER_LIST } from "./constant";
import Button from "../../component/button";

const UserList = ({}) => {
  const urerRef = firestore.collection("user");
  const dispatch = useContext(DispatchContext);
  const { data: userList } = getState("userList");
  const { data: memberList } = getState("memberList");
  console.log(userList, memberList);

  const toggleMember = uid => {
    console.log(`Togge member`);
  };

  const isMemberLabel = uid => {
    return memberList.filter(member => member.id === uid).length
      ? "Remove member"
      : "Make member";
  };

  const renderUserList = () => {
    return userList.map(({ displayName, uid }) => (
      <Fragment key={uid}>
        <div>{displayName}</div>
        <Button label={isMemberLabel(uid)} />
      </Fragment>
    ));
  };

  useEffect(() => {
    urerRef.get().then(snap => {
      dispatch({
        type: UPDATE_USER_LIST,
        payload: snap.docs.map(doc => doc.data())
      });
    });
  }, []);

  return <div>{renderUserList()}</div>;
};

export default UserList;
