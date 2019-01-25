import React, { useContext, useEffect } from "react";
import Button from "../../component/button/button.component";
import { firebase, firestore } from "../../firebase";
import styled from "styled-components";
import { getState, DispatchContext } from "../../redux";

const AvatarStyled = styled.span`
  width: ${({ width }) => width}px;
  height: ${({ width }) => width}px;
  border-radius: 50%;
  background-size: cover;
  margin-right: 1rem;
  background-image: url(${({ url }) => url});
`;

const AuthStyled = styled.span`
  display: flex;
  align-items: center;
`;

const Auth = () => {
  const dispatch = useContext(DispatchContext);
  const user = getState("user");

  useEffect(() => {
    const { currentUser } = firebase.auth();
    if (currentUser) {
      dispatch({
        type: "UPDATE_USER",
        payload: currentUser.providerData[0]
      });
    }
  });

  const handleLogIn = () => {
    console.log(`Log me in now!`);
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    // This custom parameter is optional
    // googleProvider.setCustomParameters({
    //   login_hint: "username@gmail.com"
    // });

    // check if the user is already logged in

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
        // setUser(result.user.providerData[0]);
        // Check if the user data is present in the user table
        /**
        displayName: "Marian Zburlea"
        email: "marianzburlea@gmail.com"
        phoneNumber: null
        photoURL: "https://lh4.googleusercontent.com/-nqIDGYToMvU/AAAAAAAAAAI/AAAAAAAAAAA/AKxrwcaf1XNC-Vej9eUYOImQdzAPJZ9nVA/mo/photo.jpg"
        providerId: "google.com"
        uid: "101400782503323587526"
         */
        const userRef = firestore.collection("user");
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
          <AvatarStyled width={24} url={user.photoURL} />
          <span>Welcome {user.displayName}!</span>
          <Button {...logoutButtonProperties} />
        </>
      )}
    </AuthStyled>
  );
};

export default Auth;
