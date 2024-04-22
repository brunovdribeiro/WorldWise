// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button.tsx";
import { ButtonBack } from "./ButtonBack.tsx";
import { useUrlPosition } from "../hooks/useUrlPosition.tsx";
import Spinner from "./Spinner.tsx";
import Message from "./Message.tsx";

export function convertToEmoji(countryCode: string) {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}
const baseUrl = 'https://api.bigdatacloud.net/data/reverse-geocode-client'

const  Form = ()=> {
    const { lat, lng } = useUrlPosition()
    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("");
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");
    const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false)
    const [emoji, setEmoji] = useState('')
    const [geoCodeError, setGeoCodeError] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoadingGeocoding(true)
                setGeoCodeError('')

                const resp = await fetch(`${baseUrl}?latitude=${lat}&longitude=${lng}`)
                const data = await resp.json()

                if (!data.countryCode) throw new Error('That does not seem to be a city, please click somewhere else.')

                setCityName(data.city || data.locality || '')
                setCountry(data.countryName)
                setEmoji(convertToEmoji(data.countryCode))
                console.log(country)
            } catch(err) {
                setGeoCodeError(err.message)
             }
            finally {
                setIsLoadingGeocoding(false)
            }
        }

        fetchData()

    }, [lat, lng])


    if (isLoadingGeocoding) <Spinner />

    if (geoCodeError) return <Message message={geoCodeError} />

    return (
        <form className={styles.form}>
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input
                    id="cityName"
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityName}
                />
                <span className={styles.flag}>{emoji}</span>
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                <input
                    id="date"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                />
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">Notes about your trip to {cityName}</label>
                <textarea
                    id="notes"
                    onChange={(e) => setNotes(e.target.value)}
                    value={notes}
                />
            </div>

            <div className={styles.buttons}>
                <Button style="primary">Add</Button>
                <ButtonBack />
            </div>
        </form>
    );
}

export default Form;
