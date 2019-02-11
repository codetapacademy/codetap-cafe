import React, { useContext, useEffect, Fragment } from "react";
import { firestore } from "../../firebase";
import { getState } from "../../redux";
import { DispatchContext } from "../../redux";
import { UPDATE_USER_LIST } from "./constant";
import Button from "../../component/button";
import { UserItemWrapper } from "./user-list.style";

const UserList = () => {
  const urerRef = firestore.collection("user");
  const memberRef = firestore.collection("member");
  const dispatch = useContext(DispatchContext);
  const { data: userList } = getState("userList");
  const { data: memberList } = getState("memberList");
  console.log(userList, memberList);

  const toggleMember = uid => {
    console.log(`Togge member ${uid}`);
    const isMember = memberList.filter(member => member.id === uid);
    if (isMember.length) {
      memberRef.doc(uid).delete();
    } else {
      memberRef
        .doc(uid)
        .set(userList.filter(user => user.uid === uid).reduce(u => u), {
          merge: true
        });
    }
  };

  const isMemberLabel = uid => {
    return memberList.filter(member => member.id === uid).length
      ? "Remove member"
      : "Make member";
  };

  const renderUserList = () => {
    return userList.map(({ displayName, uid }) => (
      <UserItemWrapper key={uid}>
        <div>{displayName}</div>
        <div>
          <Button
            label={isMemberLabel(uid)}
            onClick={() => toggleMember(uid)}
          />
        </div>
      </UserItemWrapper>
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
