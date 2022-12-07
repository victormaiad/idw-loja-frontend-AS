import { Link } from "react-router-dom";

export default function Cabecalho() {
  return (
    <header className="cabecalho">
      <div className="marca">
        <Link to={"/"}>Loja PMW</Link>
      </div>
    </header>
  );
}
