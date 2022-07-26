import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './DynamicRoute';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Dashboard from '../pages/Dashboard';
import { useAuth } from '../hooks/useAuth';
import SideBar from '../components/Sidebar';
import Contacts from '../pages/Contacts';

const AppNavigation = () => {
    const {isAuthenticated} = useAuth()
  return <BrowserRouter>
            <Routes>
                <Route index element={<Login />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Register />} />
                <Route
                    path="dashboard"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <SideBar>
                                <Dashboard />
                            </SideBar>
                        </ProtectedRoute>
                    }
                    />       

                 <Route
                    path="contacts"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <SideBar>
                                <Contacts />
                            </SideBar>
                        </ProtectedRoute>
                    }
                    />        
        
            </Routes>
        </BrowserRouter>
};

export default AppNavigation;
