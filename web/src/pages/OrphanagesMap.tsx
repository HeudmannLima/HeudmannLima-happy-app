import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { MdGpsFixed } from 'react-icons/md';

import { MapContainer as Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';

import mapMarkerImg from './../assets/images/map-marker.svg';
import 'leaflet/dist/leaflet.css';
import api from '../services/api';
import { MapPosition, Orphanages } from '../common/types';

import './../styles/pages/orphanages-map.css';
import { useEffect, useState } from 'react';

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,
  // size e anchor posiciona melhor o ponto da marcação
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [158, 24]
});

function OrphanagesMap() {
  const [center, setCenter] = useState(true);
  const [orphanages, setOrphanages] = useState<Orphanages[]>([]);
  const [geo, setGeo] = useState<MapPosition>({
    pos: {
      lat: -15.6232153, 
      lng: -56.02438890, 
      zoom: 4.5
    }
  });
  
  useEffect(() => {
    api.get('/orphanages')
      .then(response => {
        setOrphanages(response.data);
      })
    .catch();
  },[]);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        setGeo({
          pos: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            zoom: 12
          }});
      });
    }
  }

  getLocation();

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy"/>
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Manaus</strong>
          <span>Amazonas</span>
        </footer>
      </aside>
      
      <Map
        center={[geo.pos.lat, geo.pos.lng]}
        zoom={geo.pos.zoom}
        style={{ width: '100%', height: '100%' }}
        key={geo.pos.lat}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* MAPBOX <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        {orphanages.map(orphanage => {
          return (
            <Marker 
              position={[orphanage.latitude, orphanage.longitude]}
              icon={mapIcon}
              key={orphanage.id}
            >
              <Popup
                closeButton={false} 
                minWidth={248} 
                maxWidth={240}
                className="map-popup"
              >
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color="#FFF" />
                </Link>
              </Popup>
            </Marker>
          )
        })}
      </Map>

      <button 
        className="center-gps" 
        onClick={()=> setCenter(false)}
      >
        {console.log(center)}
        <MdGpsFixed size={32} color="#FFF" />
      </button>
      
      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>

    </div>
  );
}

export default OrphanagesMap;