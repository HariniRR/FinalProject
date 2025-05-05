import React, { useState } from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import Landing from './Components/Landing';
import AuthForm from './Components/AuthForm';
import MyNavbar from './Components/MyNavbar';
import LegalRights from './Components/LegalRights';
import Resources from './Components/Resources';
import Profile from './Components/Profile';
import Games from './Components/Games';
import Quiz from './Components/Quizzes';
import Home from './Components/Home';
import Admin from './Components/Admin';
import HazardHunt from './Components/HazardHunt';
import WordSearch from './Components/WordSearch';
import WhosRightGame from './Components/WhoseRight';
import MentalBingo from './Components/MentalBingo';
import Empower from './Components/Empower';
import Canvas from './Components/Canvas';
import Counsellor from './Components/Counselor';
import Patternpuzzle from './Components/PatternPuzzle';
import Practice from './Components/Practice';
import CrosswordGame from './Components/CrossWord';

// import { useTranslation } from 'react-i18next';
// import LanguageSwitcher from './Components/LanguageSwitcher';
// import Translate from './Components/Translate';
// import './i18n'; 

function Layout({ isAuthenticated }) {
  return (
    <>
      {isAuthenticated && <MyNavbar />}
      <div style={{ marginTop: isAuthenticated ? '70px' : '10px' }}>
        <Outlet />
      </div>
    </>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleSignIn = () => {
    setIsAuthenticated(true);
  };
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signin" element={<AuthForm mode="signin" onSignIn={handleSignIn} />} />
      <Route path="/signup" element={<AuthForm mode="signup" onSignIn={handleSignIn} />} />

      <Route element={<Layout isAuthenticated={isAuthenticated} />}>
      <Route path="/mynavbar" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/empower" element={<Empower />} />
        <Route path="/legalrights" element={<LegalRights />} />
        <Route path="/counsellor" element={<Counsellor />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/games" element={<Games />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/WordSearch" element={<WordSearch />} />
        <Route path="/WhosRightGame" element={<WhosRightGame />} /> 
        <Route path="/HazardHunt" element={<HazardHunt />} />
        <Route path="/MentalBingo" element={<MentalBingo />} />
        <Route path="/Canvas" element={<Canvas />} />
        <Route path="/patternpuzzle" element={<Patternpuzzle />} />
        <Route path="/admin" element={<Admin />} />
        {/* <Route path="/EscapefromDanger" element={<EscapeFromDanger />} /> */}
        <Route path="/Crossword" element={<CrosswordGame />} />
        {/* <Route path="/Practice" element={<Practice />} /> */}
        

      </Route>
    </Routes>
  );
}

export default App;

