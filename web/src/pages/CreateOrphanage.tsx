import React, { ChangeEvent, FormEvent, useState } from 'react';
import { FiPlus } from 'react-icons/fi';

import { MapContainer as Map, TileLayer } from 'react-leaflet';
import L, { Layer, LeafletMouseEvent } from 'leaflet';

import { MapPosition } from '../common/types';
import Sidebar from '../components/Sidebar';
import happyMapIcon from '../utils/mapIcon';
import api from '../services/api';

import './../styles/pages/create-orphanage.css';
import { useHistory } from 'react-router-dom';

function CreateOrphanage() {
  const history = useHistory();
  
  // Posicionamento
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [geo, setGeo] = useState<MapPosition>({
    pos: {
      lat: -15.6232153, 
      lng: -56.02438890, 
      zoom: 3
    }
  });

  // Formulário
  const [name, setName] = useState<string>('');
  const [about, setAbout] = useState<string>('');
  const [instructions, setInstructions] = useState<string>('');
  const [opening_hours, setOpeningHours] = useState<string>('');
  const [open_on_weekends, setOpenOnWeekends] = useState<boolean>(true);

  // Container de Imagens
  const [images, setImages] = useState<File[]>([]);  
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        setGeo({
          pos: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            zoom: 12
          }});
        }
      );
    }
  }

  getLocation()

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    // Caso não haja fotos, nada se altera
    if (!event.target.files) {
      return;
    }

    // Jogar os arquivos (imagens) pra images useState
    const selectedImages = Array.from(event.target.files);
    setImages(selectedImages);

    // Preparar o Preview das imagens nos quadrinhos
    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });
    setPreviewImages(selectedImagesPreview);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const { latitude, longitude } = position;

    // FormData() é pra poder enviar MULTPART/FORM que vai 
    // poder enviar/receber ARQUIVOS/IMAGENS do FE pro BE
    // envio similar ao que preenchemos no POST no POSTMAN multiform/data
    const data = new FormData();
    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));
    images.forEach(image => {
      data.append('images', image);
    });

    await api.post('/orphanages', data);
    alert('Cadastro realizado com sucesso!');
    history.push('/app');
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>
            <Map
              center={[geo.pos.lat, geo.pos.lng]}
              zoom={15}
              key={geo.pos.lat}
              style={{ width: '100%', height: 280, cursor: "pointer" }}
              
              // Logica para: setar o marker quando clicar;
              // remover o antigo marker se clicar outro lugar;
              // armazenar a lat/lng quando clicar
              whenCreated={(map) => {
                var theMarker: Layer;
                const icon = happyMapIcon;

                map.on("click", function (event: LeafletMouseEvent) {
                  const { lat, lng } = event.latlng;
                  theMarker !== undefined && map.removeLayer(theMarker);
                
                  theMarker = L.marker([lat, lng], {icon}).addTo(map);
                  setPosition({latitude: lat, longitude: lng});
                });
              }}
            >
              <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </Map>

            {/* <a href={`https://www.google.com.br/maps/preview/reveal?authuser=0&hl=pt-BR&gl=br&pb=!2m12!1m3!1d2522.67385178775!2d${position.lng}!3d${position.lat}!2m3!1f0!2f0!3f0!3m2!1i502!2i976!4f13.1!3m2!2d${position.lng}!3d${position.lat}!4m2!1sUUUUYJCvAvuv5NoPh62Z6AI!7e81!5m5!2m4!1i96!2i64!3i1!4i8`}>CLIQUE</a> */}

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
                id="about" 
                value={about}
                onChange={e => setAbout(e.target.value)}
                maxLength={300} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              {/* Container de Imagens usa LABEL p/ ESCOLHA/UPLOAD das fotos */}
              <div className="images-container">
                {previewImages.map((image, index) => (
                  <img key={index} src={image} alt={`Foto n.${index+1}`}/>
                ))}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>

                <input multiple onChange={handleSelectImages} type="file" id="image[]"/>
              </div>

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
                id="instructions"
                value={instructions}
                onChange={e => setInstructions(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de Funcionamento</label>
              <input 
                id="opening_hours"
                value={opening_hours}
                onChange={e => setOpeningHours(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select"> 
                <button 
                  type="button" 
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(true)}
                >Sim</button>
                <button 
                  type="button" 
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(false)}
                >Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

export default CreateOrphanage;