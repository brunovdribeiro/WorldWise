import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type CitiesProviderProps = {
    children: ReactNode
}

export type CityModel = {
    id: number,
    country: string,
    cityName: string,
    emoji: string,
    date: string,
    notes: string
    position: PositionModel
}

export type PositionModel = {
    lat: number,
    lng: number
}

type CityContextModel = {
    cities : CityModel[],
    isLoading: boolean,
    currentCity: CityModel,
    getCity: (id: number )=> void
}

const defaultCityModel : CityModel = {id: 0, cityName: '', country: '', date: '', emoji: '', notes: '' }
const defaultCityContextModel : CityContextModel = { cities: [], currentCity: defaultCityModel, isLoading: false, getCity: (id)=> id }


const CitiesContext = createContext<CityContextModel>(defaultCityContextModel);

const ApiUrl = "http://localhost:8000";

const CitiesProvider = ( {children} : CitiesProviderProps )=> {
    const [cities, setCities] = useState<CityModel[]>([])
    const [currentCity, setCurrentCity] = useState<CityModel>(defaultCityModel)
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


    const getCity = async (id: number) => {
        try {
            setIsLoading(true);
            const response = await fetch(`${ApiUrl}/cities/${id}`);
            const data = await response.json();

            setCurrentCity(data);
        } catch {
            alert("There was an error loading data...");
        } finally {
            setIsLoading(false);
        }
    }

    return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
        {children}
    </CitiesContext.Provider>)
}

const useCities = ()=> {
    const context = useContext(CitiesContext)

    if (!context)
        throw new Error("CitiesContext was used outside of the CitiesProvider")

    return context
}

export {CitiesProvider, useCities}