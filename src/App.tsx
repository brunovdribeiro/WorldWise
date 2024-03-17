import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage.tsx";
import Product from "./pages/Product.tsx";
import Pricing from "./pages/Pricing.tsx";
import PageNotFound from "./pages/PageNotFound.tsx";
import "./index.css";
import Login from "./pages/Login.tsx";
import AppLayout from "./pages/AppLayout.tsx";
import CityList from "./components/CityList.tsx";
import { useEffect, useState } from "react";

const ApiUrl = "http://localhost:8000";

export type CityModel = {
    cityName: string
}

function App() {
    const [cities, setCities] = useState<CityModel[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchCities = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${ApiUrl}/cities`);
                const data = await response.json();

                setCities(data);
            } catch {
                alert("There was an error loading data...");
            } finally {
                setIsLoading(false);
            }
        }

        fetchCities();
    }, []);

    return (
            <>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/products" element={<Product />} />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="app" element={<AppLayout />}>
                            <Route index element={<CityList cities={cities} isLoading={isLoading} />} />
                            <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />} />
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
