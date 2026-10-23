export default function Marquee() {
  const item = "JAVA BACKEND ✦ CYBERSECURITY LEARNER ✦ OPEN TO INTERNSHIPS ✦ ";
  const block = Array(4).fill(item).join("");

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <span>{block}</span>
        <span>{block}</span>
      </div>
    </div>
  );
}
