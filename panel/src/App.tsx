import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { authContext } from './context/authContext.ts';
import SignIn from './components/SignIn/SignIn.tsx';
import SignUp from './components/SignUp/SignUp.tsx';
import MainTable from './module/MainTable/MainTable.tsx';

function App() {
    const [auth, setAuth] = useState(false);

    return (
        <>
            <authContext.Provider value={{ auth, setAuth }}>
                <BrowserRouter>
                    {auth ? (
                        <Routes>
                            <Route path="/*" element={<MainTable />} />
                            <Route path="/table" element={<MainTable />} />
                        </Routes>
                    ) : (
                        <Routes>
                            <Route path="/*" element={<SignIn />} />
                            <Route path="/signin" element={<SignIn />} />
                            <Route path="/signup" element={<SignUp />} />
                        </Routes>
                    )}
                </BrowserRouter>
            </authContext.Provider>
        </>
    );
}

export default App;
