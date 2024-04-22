import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage.tsx";
import Product from "./pages/Product.tsx";
import Pricing from "./pages/Pricing.tsx";
import PageNotFound from "./pages/PageNotFound.tsx";
import "./index.css";
import Login from "./pages/Login.tsx";
import AppLayout from "./pages/AppLayout.tsx";
import CityList from "./components/CityList.tsx";
import CountryList from "./components/CountryList.tsx";
import City from "./components/City.tsx";
import Form from "./components/Form.tsx";
import { CitiesProvider } from "./contexts/CitiesContext.tsx";

function App() {
    return (
        <CitiesProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/products" element={<Product />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="app" element={<AppLayout />}>
                        <Route index element={<Navigate replace={true} to={"cities"} />} />
                        <Route path="cities" element={<CityList />} />
                        <Route path="cities/:id" element={<City />} />
                        <Route path="countries" element={<CountryList />} />
                        <Route path="form" element={<Form />} />
                    </Route>
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </CitiesProvider>
    );
}

export default App;
