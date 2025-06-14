
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

interface HeaderProps {
  withBack?: boolean;
  questionCount?: string; // e.g. "1/22"
}

const Header: React.FC<HeaderProps> = ({ withBack, questionCount }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLanding = location.pathname === "/";
  return (
    <header className="w-full bg-flourishgreen h-[64px] flex items-center px-4 md:px-10 mb-4 font-inter relative">
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
        <img
          src="/logo-placeholder.svg"
          alt="Mind Flourish logo"
          className="h-8 w-8 object-contain"
        />
        <span className="text-flourishwhite text-2xl font-bold tracking-tight select-none leading-tight font-inter">
          Mind Flourish
        </span>
      </div>
      {questionCount && (
        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-white text-base font-bold font-inter">
          {questionCount}
        </span>
      )}
    </header>
  );
};

export default Header;
