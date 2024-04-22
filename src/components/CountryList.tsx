import Spinner from "./Spinner.tsx";
import { useMemo } from "react";
import Message from "./Message.tsx";
import style from "./CountryList.module.css";
import CountryItem from "./CountryItem.tsx";
import { useCities } from "../contexts/CitiesContext.tsx";

type CountryModel = {
    country: string,
    emoji: string
}

const initialState: CountryModel[] = [];
export const CountryList = () => {

    const {cities, isLoading} = useCities()

    const countries = cities.reduce((arr, cur) => {
        if (arr.map(el => el.country).includes(cur.country))
            return arr;

        return [...arr, {country: cur.country, emoji: cur.emoji}]
    }, initialState)


    const loader = useMemo(() => <Spinner />, []);
    const countriesView = useMemo(() => <ul className={style.countryList}>
        {countries.map(country => <CountryItem key={country.country} country={country} />)}
    </ul>, [countries]);
    const noCities = useMemo(() => <Message message="Add your first city by clicking on a city on the map" />, [])

    if (isLoading) return loader;

    if (cities.length) return countriesView;

    return noCities;
};

export default CountryList;