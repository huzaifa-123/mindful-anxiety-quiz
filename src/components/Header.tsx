
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

interface HeaderProps {
  withBack?: boolean;
}

const Header: React.FC<HeaderProps> = ({ withBack }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLanding = location.pathname === "/";
  return (
    <header className="w-full bg-flourishgreen h-[64px] flex items-center px-4 md:px-10 mb-4">
      {withBack ? (
        <button
          onClick={() => navigate(-1)}
          className="mr-3 rounded-full p-1 hover:bg-flourishmint/20 transition"
          aria-label="Back"
        >
          <ArrowLeft size={28} color="white" />
        </button>
      ) : null}
      <div className={`flex items-center gap-3 ${withBack ? "mx-auto" : ""}`}>
        {/* Placeholder for logo image */}
        <img
          src="/logo-placeholder.svg"
          alt="Mind Flourish logo"
          className="h-8 w-8 object-contain"
        />
        <span className="font-playfair text-flourishwhite text-2xl font-bold tracking-tight select-none leading-tight">
          Mind Flourish
        </span>
      </div>
    </header>
  );
};

export default Header;
