export function KeyTerm(props: { term: string; definition?: string }) {
  return (
    <p className="tc-keyTerm">
      <span className="tc-keyTermTerm">{props.term}</span>
      {props.definition ? (
        <span className="tc-keyTermDef">{props.definition}</span>
      ) : null}
    </p>
  )
}
