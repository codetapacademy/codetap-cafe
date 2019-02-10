import { useEffect, useState, useContext } from "react";
import { DispatchContext } from "../../redux";
import { UPDATE_LIST } from "../auth/const";
import { UPDATE_MEMBER_LIST, UPDATE_MEMBER_STATUS } from "./const";

const useFirestoreQuery = (refChat, refMember, refStatus) => {
  const [messageList, setMessageList] = useState({
    isLoading: true,
    data: []
  });
  const [memberList, setMemberList] = useState({
    isLoading: true,
    data: []
  });
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    refChat.onSnapshot(snapshot => {
      const messageList = snapshot
        .docChanges()
        .map(({ type, doc }) => {
          const { message, updatedAt, user } = doc.data();
          return {
            message,
            time: (updatedAt && updatedAt.seconds) || 0,
            id: doc.id,
            user,
            type
          };
        })
        .filter(message => message && message.time);

      messageList.length &&
        dispatch({
          type: UPDATE_LIST,
          payload: messageList
        });

      setMessageList({
        isLoading: false,
        data: messageList
      });
    });
    refMember.onSnapshot(snapshot => {
      const memberList = snapshot
        .docChanges()
        .map(({ type, doc }) => ({ ...doc.data(), id: doc.id }));
      memberList.length &&
        dispatch({
          type: UPDATE_MEMBER_LIST,
          payload: memberList
        });

      setMemberList({
        isLoading: false,
        data: memberList
      });
    });

    refStatus.on("value", snapshot => {
      const statusObject = snapshot.val();
      const statusList = Object.keys(statusObject).map(key => ({
        id: key,
        status: statusObject[key]
      }));

      dispatch({
        type: UPDATE_MEMBER_STATUS,
        payload: statusList
      });
    });
  }, []);

  return { messageList, memberList };
};

export default useFirestoreQuery;
