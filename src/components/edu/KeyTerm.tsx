export function KeyTerm(props: { term: string; definition?: string }) {
  return (
    <div className="my-6 p-4 rounded-xl bg-[var(--color-semantic-people-bg)] border border-[var(--color-semantic-people-border)] shadow-sm">
      <p className="m-0 text-lg">
        <strong className="font-bold text-[var(--color-semantic-people)] mr-2">
          {props.term}
        </strong>
        {props.definition ? (
          <span className="text-slate-700">{props.definition}</span>
        ) : null}
      </p>
    </div>
  );
}
