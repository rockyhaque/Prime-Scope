import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hook/useAuth";


const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();

    if(loading){
        return (
            <div>
                <span className="loading loading-ball loading-lg"></span>
                <span className="loading loading-ball loading-md"></span>
                <span className="loading loading-ball loading-lg"></span>
            </div>
        )
    }
    if(user){
        return children;
    }
    return <Navigate to="/login" state={location.pathname} replace={true}></Navigate>
};

export default PrivateRoute;