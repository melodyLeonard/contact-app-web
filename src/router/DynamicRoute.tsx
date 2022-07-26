import { ReactElement,FC } from 'react';
import {Navigate} from 'react-router-dom'

interface IProps{
    isAuthenticated: boolean;
    redirectPath?: string
    children: ReactElement<any, any> | null
}

export const ProtectedRoute:FC<IProps> = ({
    isAuthenticated,
    redirectPath = '/login',
    children,
    }) => {
    if (!isAuthenticated) {
        return <Navigate to={redirectPath} replace />;
    }

    return children;
};