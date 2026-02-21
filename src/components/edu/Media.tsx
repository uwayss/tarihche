export function Media(props: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="tc-media">
      <img className="tc-mediaImg" src={props.src} alt={props.alt} />
      {props.caption ? (
        <figcaption className="tc-mediaCap">{props.caption}</figcaption>
      ) : null}
    </figure>
  );
}
