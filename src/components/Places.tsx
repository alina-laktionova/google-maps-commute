import React from 'react'
import usePlacesAutocomplete, {getGeocode, getLatLng} from 'use-places-autocomplete'
import {Combobox, ComboboxInput, ComboboxList, ComboboxOption, ComboboxPopover} from '@reach/combobox'

type Props = {
    setOffice: (position: google.maps.LatLngLiteral) => void
}

const Places = (props: Props) => {
    const {setOffice} = props
    const {
        ready,
        value,
        setValue,
        suggestions: {status, data},
        clearSuggestions,
    } = usePlacesAutocomplete()

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const handleSelect = async (val: string) => {
        setValue(val, false)
        clearSuggestions()

        const results = await getGeocode({address: val})
        const {lat, lng} = await getLatLng(results[0])
        setOffice({lat, lng})
    }

    return (
        <Combobox onSelect={handleSelect}>
            <ComboboxInput
                value={value}
                onChange={handleInput}
                disabled={!ready}
                className="combobox-input"
                placeholder="Search office address"
            />
            <ComboboxPopover>
                <ComboboxList className="combobox-list">
                    {status === 'OK' &&
                        data.map(({place_id, description}) => (
                            <ComboboxOption className="combobox-option" key={place_id} value={description} />
                        ))}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    )
}

export default Places
