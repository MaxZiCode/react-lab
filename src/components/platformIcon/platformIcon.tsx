interface PlatformInfoProps {
  className?: string;
  logo: string;
  label: string;
}

export default function platformIcon(props: PlatformInfoProps): JSX.Element {
  return <img src={props.logo} alt={`${props.label} logo`} className={props.className} />;
}
