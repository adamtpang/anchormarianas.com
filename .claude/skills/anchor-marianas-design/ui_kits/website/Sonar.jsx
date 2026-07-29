/* Sonar.jsx: the brand-signature animated pulse dot. */
function Sonar({ label }) {
  return (
    <span className="sonar-mark">
      <span className="sonar"><span></span></span>
      {label ? <span className="label">{label}</span> : null}
    </span>
  );
}

window.Sonar = Sonar;
