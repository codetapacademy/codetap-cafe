import { useEffect, useState, useContext } from "react";
import { getState, DispatchContext } from "../../redux";

const useFirestoreQuery = ref => {
  const [messageList, setMessageList] = useState({
    isLoading: true,
    data: []
  });
  const dispatch = useContext(DispatchContext);

  useEffect(
    () =>
      ref.onSnapshot(snapshot => {
        console.log(`ref.onSnapshot`);
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
      }),
    []
  );

  return messageList;
};

export default useFirestoreQuery;
