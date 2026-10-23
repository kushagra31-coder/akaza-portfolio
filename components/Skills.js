import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { Icon } from "./Icons";
import { skills, terminal, socials } from "@/lib/data";

export default function Skills() {
  const thm = socials.find((s) => s.key === "tryhackme");

  return (
    <section id="skills" className="sec">
      <div className="wrap">
        <SectionHead kicker="TOOLS OF THE TRADE" title="ARSENAL" sub="Everything I build and break with." />

        <div className="skill-grid">
          {skills.map((g, i) => (
            <Reveal key={g.title} delay={(i % 3) * 80}>
              <div className={`panel skill ${i % 2 ? "blue" : ""}`}>
                <h3 className="mini-title">{g.title}</h3>
                <div className="chips">
                  {g.items.map((it) => (
                    <span className="chip" key={it}>
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="lab">
          <div className="lab-copy">
            <span className="caption">SIDE BUSINESS</span>
            <h3 className="lab-title">THE THREAT LAB</h3>
            <p>
              When I am not building systems I am breaking practice ones. CTF rooms, web exploitation and
              LLM attack labs keep my security instincts sharp.
            </p>
            {thm ? (
              <a href={thm.href} target="_blank" rel="noopener noreferrer" className="btn blue">
                My TryHackMe profile <Icon name="arrow" size={18} />
              </a>
            ) : null}
          </div>

          <div className="term" role="img" aria-label="Terminal showing security lab topics">
            <div className="term-bar">
              <i />
              <i />
              <i />
              <span>akaza@lab:~</span>
            </div>
            <div className="term-body">
              {terminal.map((l, i) => (
                <div key={i} className={`tm-line ${l.t}`} style={{ "--d": `${i * 0.28}s` }}>
                  {l.c}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
