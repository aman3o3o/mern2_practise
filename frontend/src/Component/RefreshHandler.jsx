import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const RefreshHandler = () => {
    let location = useLocation();
    let navigate = useNavigate();

    useEffect(() => {

        if (["/", "/login", "/signup"].includes(location.pathname)) {
            navigate("/data");
        }

    }, [location.pathname])

    return (
        null
    )
}

export default RefreshHandler