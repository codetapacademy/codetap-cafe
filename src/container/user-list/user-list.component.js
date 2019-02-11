import React, { useContext, useEffect } from "react";
import { firestore } from "../../firebase";
import { getState } from "../../redux";
import { DispatchContext } from "../../redux";
import { UPDATE_USER_LIST } from "./constant";

const UserList = ({}) => {
  const urerRef = firestore.collection("user");
  const dispatch = useContext(DispatchContext);
  const { data: userList } = getState("userList");
  const { data: memberList } = getState("memberList");
  console.log(userList, memberList);
  const renderUserList = () => {
    return userList.map(({ displayName, uid }) => (
      <div key={uid}>{displayName}</div>
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
