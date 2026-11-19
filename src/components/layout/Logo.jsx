import { Link } from 'react-router-dom';

const base = import.meta.env.BASE_URL;

/** Edutou mark + pixel wordmark. */
export default function Logo({ className = '', onClick }) {
  return (
    <Link to="/" className={`edt-logo ${className}`.trim()} aria-label="Edutou home" onClick={onClick}>
      <img className="edt-logo__mark" src={`${base}brand/edutou-mark.png`} alt="" width="256" height="256" />
      <img className="edt-logo__word" src={`${base}brand/edutou-wordmark.png`} alt="" width="400" height="112" />
    </Link>
  );
}
