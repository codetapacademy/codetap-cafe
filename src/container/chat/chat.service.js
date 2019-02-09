import { useEffect, useState, useContext } from "react";
import { DispatchContext } from "../../redux";

const useFirestoreQuery = (refChat, refMember) => {
  const [messageList, setMessageList] = useState({
    isLoading: true,
    data: []
  });
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    refChat.onSnapshot(snapshot => {
      const docList = snapshot
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

      docList.length &&
        dispatch({
          type: "UPDATE_LIST",
          payload: docList
        });

      setMessageList({
        isLoading: false,
        data: docList
      });
    });
    refMember.onSnapshot(snapshot => {
      snapshot.docChanges().map(({ type, doc }) => {
        return console.log(doc.data(), type);
      });
    });
    const a = 2;
  }, []);

  return messageList;
};

export default useFirestoreQuery;
