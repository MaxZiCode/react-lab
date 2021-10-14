interface PlatformIconProps {
  className: string;
  logo: string;
  label: string;
}

export default function PlatformIcon(props: PlatformIconProps): JSX.Element {
  return <img src={props.logo} alt={`${props.label} logo`} className={props.className} />;
}
