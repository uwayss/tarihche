export function Media(props: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="my-12 flex flex-col items-center">
      <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-50">
        <img className="max-w-full h-auto object-contain max-h-[60vh]" src={props.src} alt={props.alt} />
      </div>
      {props.caption ? (
        <figcaption className="mt-4 text-center text-slate-500 italic max-w-2xl text-sm">
          {props.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
