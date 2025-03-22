import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export const RoleBasedRoute = ({ isAuthenticated, allowedRoles, userRole }) => {
    if (!isAuthenticated) {
        return <Navigate to="/home" />
    }

    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/unauthorized" /> // Redirect unauthorized users
    }

    return <Outlet />
}
