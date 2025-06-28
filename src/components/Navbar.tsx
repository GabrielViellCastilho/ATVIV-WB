import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();

  const linkClasses = (path: string) =>
    `px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
      location.pathname === path
        ? "bg-sky-900 text-white"
        : "text-white hover:bg-sky-800"
    }`;

  return (
    <nav className="bg-sky-600 px-6 py-4 shadow-md flex flex-wrap gap-4 items-center">
      <Link to="/" className={linkClasses("/")}>
        Consulta de Clientes
      </Link>
      <Link to="/cadastro" className={linkClasses("/cadastro")}>
        Cadastro
      </Link>
    </nav>
  );
};

export default Navbar;
