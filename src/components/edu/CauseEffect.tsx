import type { ReactNode } from 'react'

export function CauseEffect(props: {
  causeTitle?: string
  effectTitle?: string
  cause: ReactNode
  effect: ReactNode
}) {
  return (
    <div className="tc-causeEffect">
      <div className="tc-causeEffectCol">
        <div className="tc-causeEffectTitle">{props.causeTitle ?? 'Cause'}</div>
        <div className="tc-causeEffectBody">{props.cause}</div>
      </div>
      <div className="tc-causeEffectCol">
        <div className="tc-causeEffectTitle">{props.effectTitle ?? 'Effect'}</div>
        <div className="tc-causeEffectBody">{props.effect}</div>
      </div>
    </div>
  )
}
