import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import logo from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLng } from 'leaflet';
import api from '../../services/api';
import ibgeApi from '../../services/ibgeApi';
import ClickMarker from './ClickMarker';
import Dropzone from '../../components/dropzone';

interface item {
    id: number,
    title: string,
    image_url: string
}

interface IBGEStateResponse {
    sigla: string
}

interface IBGECityResponse {
    nome: string
}

const CreatePoint = () => {
    const [selectedPosition, setSelectedPosition] = useState<LatLng>(new LatLng(0, 0));
    const [renderMap, setRenderMap] = useState(false);

    const [items, setItems] = useState<item[]>([]);
    const [states, setStates] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    
    const [selectedState, setSelectedState] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const [selectedFile, setSelectedFile] = useState<File>();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: ''
    });


    function handleSelectPosition(value: LatLng) {
        setSelectedPosition(value);
    }
    
    function handleSelectState(event: ChangeEvent<HTMLSelectElement>) {
        setSelectedState(event.target.value);
    }

    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
        setSelectedCity(event.target.value);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData({...formData, [name]: value});
    }

    function handleSelectItem(id: number) {
        const alreadySelected = selectedItems.findIndex(item => item === id);

        if(alreadySelected >= 0) {
            const filteredItems = selectedItems.filter(item => item !== id);
            setSelectedItems(filteredItems);
        }
        else {
            setSelectedItems([...selectedItems, id]);
        }
    }

    async function handleSubmit(event: FormEvent){
        event.preventDefault();

        const { name, email, whatsapp } = formData;

        const data = new FormData();

        data.append('name', name);
        data.append('email', email);
        data.append('whatsapp', whatsapp);
        data.append('uf', selectedState);
        data.append('city', selectedCity);
        data.append('latitude', String(selectedPosition.lat));
        data.append('longitude', String(selectedPosition.lng));
        data.append('items', selectedItems.join(','));

        if(selectedFile)
        {
            data.append('image', selectedFile);
        }


        

        await api.post('points', data);
        alert('Collection point created!')
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setSelectedPosition(new LatLng(latitude, longitude));
            setRenderMap(true);
        },
        error => {
            // Default: Brasilia-DF
            setSelectedPosition(new LatLng(-15.7213698,-48.102167));
            setRenderMap(true);
        });
    }, []);

    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data);
        });
    }, []);

    useEffect(() => {
        ibgeApi.get<IBGEStateResponse[]>('localidades/estados').then(response => {
            const stateInitials = response.data.map(state => state.sigla);
            setStates(stateInitials);
        });
    }, []);    
    
    useEffect(() => {
        if(selectedState !== '0')
        {
            ibgeApi.get<IBGECityResponse[]>(`localidades/estados/${selectedState}/municipios`).then(response => {
                const cityNames = response.data.map(city => city.nome);
                setCities(cityNames);
            });
        }
    }, [selectedState]);

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta" />
                <Link to="/">
                    <FiArrowLeft />
                    Back to home
                </Link>
            </header>
            <form onSubmit={handleSubmit}>
                <h1>Registration of the waste collection point.</h1>
                <Dropzone onFileUploaded={setSelectedFile} />
                <fieldset>
                    <legend>
                        <h2>Data</h2>
                    </legend>
                    <div className="field">
                        <label htmlFor="name">Entity Name</label>
                        <input onChange={handleInputChange} type="text" name="name" id="name" />
                        <div className="field-group">
                            <div className="field">
                                <label htmlFor="email">Email</label>
                                <input onChange={handleInputChange} type="email" name="email" id="email" />
                            </div>
                            <div className="field">
                                <label htmlFor="whatsapp">Whatsapp</label>
                                <input onChange={handleInputChange} type="text" name="whatsapp" id="whatsapp" />
                            </div>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Address</h2>
                        <span>Select the address on the map</span>
                    </legend>
                    {renderMap && (
                        <MapContainer center={selectedPosition} zoom={15} scrollWheelZoom={true}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            
                            <ClickMarker position={selectedPosition} setPosition={handleSelectPosition} />
                        </MapContainer>
                    )}
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">State</label>
                            <select name="uf" id="uf" value={selectedState} onChange={handleSelectState}>
                                <option key="0" value="0">Select a state</option>
                                {states.map(state => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">City</label>
                            <select name="city" id="city" value={selectedCity} onChange={handleSelectCity}>
                                <option key="0" value="0">Select a city</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Collection Items</h2>
                        <span>Select one or more items below</span>
                    </legend>
                    <ul className="items-grid">
                        {items.map(item => (
                            <li 
                                key={item.id} 
                                onClick={() => handleSelectItem(item.id)} 
                                className={selectedItems.includes(item.id) ? 'selected' : ''}>
                                <img src={item.image_url} alt={item.title} />
                                <span>{item.title}</span>
                            </li>
                            ))}
                    </ul>
                </fieldset>
                <button type="submit">
                    Register Collection Point
                </button>
            </form>
        </div>
    );
}

export default CreatePoint;