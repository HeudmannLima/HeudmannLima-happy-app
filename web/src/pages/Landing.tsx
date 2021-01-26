import { FiArrowRight } from 'react-icons/fi';

import '../styles/pages/landing.css';
import logoImg from '../assets/images/logo.svg';
import { Link } from 'react-router-dom';
import OrphanagesMap from './OrphanagesMap';

function Landing() {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={logoImg} alt="Happy"/>

        <main>
          <h1 className="">Leve felicidade para o mundo</h1>
          <p className="">
            Visite orfanatos e mude o dia de muitas crianças.
          </p>
        </main>

          <div className="location">
            <strong>Manaus</strong>
            <span>Amazonas</span>
          </div>

          <Link to="/orphanages" className="enter-app">
            <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
          </Link>
      </div>
    </div>
  );
}

export default Landing;