import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import GlobalChat from "./Globalchat/GlobalChat";

function Home() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(() => auth.currentUser);
  const { displayName, photoURL } = user;
  console.log(displayName);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
      if (initializing) {
        setInitializing(false);
      }
    });

    // Cleanup subscription
    return unsubscribe;
  }, [auth, initializing]);

  return (
    <>
      <GlobalChat user={user} />
    </>
  );
}

export default Home;
