import mapMarkerImg from './../assets/images/map-marker.svg';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { MapContainer as LeafletMap, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import './../styles/pages/orphanages-map.css';

function OrphanagesMap() {
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy"/>
          <h2>Escolha um orfanato</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Manaus</strong>
          <span>Amazonas</span>
        </footer>
      </aside>
      
      <LeafletMap
        center={[-27.2092052, -49.6401092]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* MAPBOX <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
      </LeafletMap>

      <Link to="" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>

    </div>
  );
}

export default OrphanagesMap;