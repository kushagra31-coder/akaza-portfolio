import Reveal from "./Reveal";
import { Icon } from "./Icons";
import { profile, socials } from "@/lib/data";

export default function Contact() {
  return (
    <section id="contact" className="sec">
      <div className="wrap">
        <Reveal className="panel contact">
          <span className="caption">TO BE CONTINUED...</span>
          <h2 className="contact-title glitch" data-text="SWING BY">
            SWING BY
          </h2>
          <p>
            Got a project, an internship, a hackathon team or a bug that refuses to die? Drop me a line and
            let&apos;s build something.
          </p>
          <a className="btn big" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <div className="contact-links">
            <a
              className="btn yellow sm"
              href={profile.resume || "/Kushagra_Singh_Tomar_Resume.pdf"}
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume ↗
            </a>
            {socials
              .filter((s) => s.key !== "mail")
              .map((s) => (
                <a key={s.key} className="btn blue sm" href={s.href} target="_blank" rel="noopener noreferrer">
                  <Icon name={s.key} size={18} /> {s.label}
                </a>
              ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
