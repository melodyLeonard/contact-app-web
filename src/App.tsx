import './App.scss';
import AppNavigation from './router/index';
import {Provider as AuthProvider} from './store/authStore';
import {Provider as ContactProvider} from './store/contactStore';

function App() {
  
  return (
    <div className="app-container">
      <AuthProvider>
        <ContactProvider>
         <AppNavigation/>
        </ContactProvider>
      </AuthProvider>
    </div>
  );
}

export default App;

