import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { profile } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="sec">
      <div className="wrap">
        <SectionHead kicker="CHAPTER ONE" title="ORIGIN STORY" />

        <div className="about-grid">
          <Reveal from="left" className="panel about-text">
            {profile.about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>
          <Reveal from="right" delay={100} className="panel blue about-facts">
            <h3 className="mini-title">QUICK FACTS</h3>
            <dl>
              {profile.facts.map(([k, v]) => (
                <div key={k} className="fact">
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
