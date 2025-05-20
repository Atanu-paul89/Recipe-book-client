import React, { use } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate } from 'react-router';
import Swal from 'sweetalert2';

const AuthGuard = ({ children }) => {
    const { user, loading } = use(AuthContext);

    if (loading) {
        return <span className='mx-100 mt-45 loading loading-infinity loading-xl'></span>
    }

    if (!user) {

        return <Navigate to='/login'></Navigate>
    }

    return children;
};

export default AuthGuard;