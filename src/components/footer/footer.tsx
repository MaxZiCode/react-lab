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
    { name: "Blizzard logo", link: blizzard, picture: blizzardLogo },
    { name: "EA logo", link: ea, picture: eaLogo },
    { name: "Konami logo", link: konami, picture: konamiLogo },
    { name: "Valve logo", link: valve, picture: valveLogo },
  ];
  return (
    <footer>
      <div className="footer-panel">
        <div className="slogan">Incredible convenient</div>
        <div className="companies">
          {linksData.map((d) => (
            <a href={d.link} key={d.name} className="panel-link-hover-focus">
              <img src={d.picture} alt={d.name} className="company" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
