import Spinner from "./Spinner.tsx";
import { useMemo } from "react";
import Message from "./Message.tsx";
import style from "./CountryList.module.css";
import { CityModel } from "../App.tsx";
import CountryItem from "./CountryItem.tsx";

type CountryListProps = {
    cities: CityModel[],
    isLoading: boolean,

}

type CountryModel = {
    country: string,
    emoji: string
}

const initialState: CountryModel[] = [];
export const CountryList = (props: CountryListProps) => {

    const countries = props.cities.reduce((arr, cur) => {
        if (arr.map(el => el.country).includes(cur.country))
            return arr;

        return [...arr, {country: cur.country, emoji: cur.emoji}]
    }, initialState)


    const loader = useMemo(() => <Spinner />, []);
    const countriesView = useMemo(() => <ul className={style.countryList}>
        {countries.map(country => <CountryItem key={country.country} country={country} />)}
    </ul>, [countries]);
    const noCities = useMemo(() => <Message message="Add your first city by clicking on a city on the map" />, [])

    if (props.isLoading) return loader;

    if (props.cities.length) return countriesView;

    return noCities;
};

export default CountryList;