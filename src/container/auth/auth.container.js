import React, { useContext, useEffect } from "react";
import Button from "../../component/button/button.component";
import { firebase } from "../../firebase";
import { getState, DispatchContext } from "../../redux";
import { updateUser } from "./action";
import {
  AuthStyled,
  AuthGreetWrapper,
  AvatarStyled,
  ButtonWrapper
} from "./auth.style";

const Auth = () => {
  const dispatch = useContext(DispatchContext);
  const user = getState("user");

  useEffect(() => {
    const { currentUser } = firebase.auth();

    // check if the user is already logged in
    if (currentUser) {
      dispatch(updateUser(currentUser.providerData[0]));
    }
  }, []);

  const handleLogIn = () => {
    console.log(`Log me in now!`);
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    // This custom parameter is optional
    // googleProvider.setCustomParameters({
    //   login_hint: "username@gmail.com"
    // });

    // Launch pop-up
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then(result => {
        console.log(`Signed in successful`, result);
        console.log(`User data`, result.user.providerData[0]);
        dispatch({
          type: "UPDATE_USER",
          payload: result.user.providerData[0]
        });
        // const userRef = firestore.collection("user");
      });
  };

  const handleLogOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.info(`Sign out successful`);
        dispatch({
          type: "UPDATE_USER",
          payload: null
        });
      })
      .catch(error => console.log(`Sign out failed!`, error));
  };

  const loginButtonProperties = {
    label: "Log me in",
    onClick: handleLogIn
  };

  const logoutButtonProperties = {
    label: "Get me out",
    onClick: handleLogOut
  };

  return (
    <AuthStyled>
      {!user && <Button {...loginButtonProperties} />}
      {user && (
        <>
          <AvatarStyled width={32} url={user.photoURL} />
          <AuthGreetWrapper>Welcome {user.displayName}!</AuthGreetWrapper>
          <ButtonWrapper>
            <Button {...logoutButtonProperties} />
          </ButtonWrapper>
        </>
      )}
    </AuthStyled>
  );
};

export default Auth;
