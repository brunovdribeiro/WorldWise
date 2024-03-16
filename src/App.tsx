import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage.tsx";
import Product from "./pages/Product.tsx";
import Pricing from "./pages/Pricing.tsx";
import PageNotFound from "./pages/PageNotFound.tsx";
import "./index.css";
import Login from "./pages/Login.tsx";
import AppLayout from "./pages/AppLayout.tsx";

function App() {
    return (
            <>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/products" element={<Product />} />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="app" element={<AppLayout />}>
                            <Route path="cities" element={<p>List of cities</p>} />
                            <Route path="countries" element={<p>List of countries</p>} />
                            <Route path="form" element={<p>Form</p>} />
                        </Route>
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </BrowserRouter>
            </>
    );
}

export default App;
