import "./footer.scss";

import blizzardLogo from "../../assets/images/blizzard-logo.png";
import eaLogo from "../../assets/images/ea-logo.png";
import konamiLogo from "../../assets/images/konami-logo.png";
import valveLogo from "../../assets/images/valve-logo.png";

export default function Footer(): JSX.Element {
  const blizzard = "http://blizzard.com/";
  const ea = "https://www.ea.com/";
  const konami = "https://www.konami.com/";
  const valve = "https://www.valvesoftware.com/";
  const linksData = [
    { id: 1, name: "Blizzard logo", link: blizzard, picture: blizzardLogo },
    { id: 2, name: "EA logo", link: ea, picture: eaLogo },
    { id: 3, name: "Konami logo", link: konami, picture: konamiLogo },
    { id: 4, name: "Valve logo", link: valve, picture: valveLogo },
  ];
  return (
    <footer>
      <div className="footer-panel">
        <div className="slogan">Incredible convenient</div>
        <div className="companies">
          {linksData.map((d) => (
            <a href={d.link} key={d.id} className="panel-link-hover-focus">
              <img src={d.picture} alt={d.name} className="company" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
