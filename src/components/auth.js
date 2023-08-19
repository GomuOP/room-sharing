import React from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import "./Auth.css"; // Import your CSS file for styling

export const Auth = () => {
    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error(err);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="auth-container">
            <button className="google-signin-button" onClick={signInWithGoogle}>
                Sign In With Google
            </button>
            <button className="signout-button" onClick={logout}>
                Sign Out
            </button>
        </div>
    );
};
