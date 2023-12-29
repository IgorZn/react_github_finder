import {BrowserRouter, Router, Route, Routes} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import About from "./pages/About";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import {GithubProvider} from "./context/github/GithubContext";
import {AlertProvider} from './context/alert/AlertContext'

function App() {
    return (
        <GithubProvider>
            <AlertProvider>
                <BrowserRouter>
                    <div className="flex flex-col justify-between h-screen">
                        <Navbar/>
                        <main className={'container mx-auto px-3 pb-12'}>
                            <Routes>
                                <Route path={'/about'} element={<About/>}/>
                                <Route path={'/'} element={<Home/>}/>
                                <Route path={'/notfound'} element={<NotFound/>}/>
                                <Route path={'/*'} element={<NotFound/>}/>
                            </Routes>
                        </main>

                        <Footer/>
                    </div>
                </BrowserRouter>
            </AlertProvider>
        </GithubProvider>
    );
}

export default App;
