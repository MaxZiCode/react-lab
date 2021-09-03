import blizzardLogo from "./assets/images/blizzard-logo.png";
import eaLogo from "./assets/images/ea-logo.png";
import konamiLogo from "./assets/images/konami-logo.png";
import valveLogo from "./assets/images/valve-logo.png";

export default function footer(): JSX.Element {
  return (
    <footer>
      <div className="footer-panel">
        <div className="slogan">Incredible convenient</div>
        <div className="companies">
          <a href="http://blizzard.com/">
            <img src={blizzardLogo} alt="Blizzard logo" className="company" />
          </a>
          <a href="https://www.ea.com/">
            <img src={eaLogo} alt="EA logo" className="company" />
          </a>
          <a href="https://www.konami.com/">
            <img src={konamiLogo} alt="Konami logo" className="company" />
          </a>
          <a href="https://www.valvesoftware.com/">
            <img src={valveLogo} alt="Valve logo" className="company" />
          </a>
        </div>
      </div>
    </footer>
  );
}
