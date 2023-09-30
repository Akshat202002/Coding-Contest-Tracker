import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, getAuth, sendEmailVerification } from 'firebase/auth';
import { useParams, useNavigate } from 'react-router-dom';

const VerificationPending = () => {
    const { email } = useParams(); // Access email parameter from the URL
    const [isEmailSent, setIsEmailSent] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();

        // Set up the auth state change listener
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("Email verification", user.emailVerified);
            console.log('User:', user);
            if (user && user.emailVerified) {
                console.log('Email verified. Redirecting to contests page.');
                // User email is verified, redirect to contests page
                navigate('/contests', { replace: true }); // Use replace option to replace the current entry in history
            }
        });

        // Clean up the listener when the component unmounts
        return () => {
            unsubscribe();
        };
    }, [navigate]);

    const resendVerificationEmail = () => {
        const auth = getAuth();
        sendEmailVerification(auth.currentUser)
            .then(() => {
                setIsEmailSent(true);
            })
            .catch((error) => {
                console.error('Error sending email verification:', error);
            });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-2">
            <h1 className="text-2xl font-bold mb-4">Email Verification Pending</h1>
            {isEmailSent ? (
                <p>
                    Verification email resent to <strong>{email}</strong>. Please check your inbox and verify your email to proceed.
                </p>
            ) : (
                <p>
                    Please verify your email. If you haven't received the verification email, you can click below to resend it.
                </p>
            )}
            <button onClick={resendVerificationEmail} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Resend Verification Email
            </button>
        </div>
    );
};

export default VerificationPending;
