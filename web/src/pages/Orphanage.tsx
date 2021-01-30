import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
// import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { MapContainer as Map, Marker, TileLayer } from "react-leaflet";

import Sidebar from "../components/Sidebar";
import happyMapIcon from "../utils/mapIcon";

import '../styles/pages/orphanage.css';
import api from "../services/api";
import { OrphanageParams, Orphanages } from '../common/types';

export default function Orphanage() {
const params = useParams<OrphanageParams>();
const [orphanage, setOrphanage] = useState<Orphanages>();
const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  useEffect(() => {
    api.get(`orphanages/${params.id}`).then(response => { 
      setOrphanage(response.data);
    });
  }, [params.id]);

  if(!orphanage) {
    return <h1><p>Carregando...</p></h1>;
  }

  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img 
            src={orphanage.images[activeImageIndex].url} 
            alt={orphanage.name}
          />
          <div className="images">
            {orphanage.images.map((image, index) => (
              <button 
                type="button"
                className={activeImageIndex === index ? 'choosen' : ''}
                key={image.id}
                onMouseMove={() => setActiveImageIndex(index)}
                onClick={() => setActiveImageIndex(index)}
              >
                <img src={image.url} alt={orphanage.name} />
              </button>
            ))}
          </div>
          
          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map
                center={[orphanage.latitude, orphanage.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={true}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker interactive={false} 
                  icon={happyMapIcon}
                  position={[orphanage.latitude, orphanage.longitude]}
                />
              </Map>

              <footer>
              <a href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver rotas no Google Maps
              </a>
            </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </div>
              { orphanage.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div>
                ) : (
                  <div className="open-on-weekends dont-open">
                    <FiInfo size={32} color="#FF669D" />
                    Não atendemos <br />
                    fim de semana
                  </div>
                )
              }
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}