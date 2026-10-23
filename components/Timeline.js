import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { timeline } from "@/lib/data";

export default function Timeline() {
  return (
    <section id="story" className="sec">
      <div className="wrap">
        <SectionHead kicker="PREVIOUSLY, IN THE AKAZA SERIES" title="THE STORY SO FAR" />

        <div className="tl">
          {timeline.map((t, i) => (
            <Reveal key={`${t.date}-${t.title}`} className={`tl-item ${t.now ? "now" : ""}`} delay={60}>
              <span className="tl-dot" aria-hidden="true" />
              <div className={`panel tl-card ${i % 2 ? "blue" : ""}`}>
                <span className="tl-date">{t.date}</span>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
