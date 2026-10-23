import Reveal from "./Reveal";

export default function SectionHead({ kicker, title, sub }) {
  return (
    <Reveal className="sec-head">
      <span className="ghost" aria-hidden="true">{title}</span>
      <span className="caption">{kicker}</span>
      <h2 className="sec-title glitch" data-text={title}>
        {title}
      </h2>
      {sub ? <p className="sec-sub">{sub}</p> : null}
    </Reveal>
  );
}
