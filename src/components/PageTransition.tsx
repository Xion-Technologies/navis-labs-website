import { useLocation } from "react-router-dom";
import { useEffect, useState, type ReactNode } from "react";

export default function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const [animKey, setAnimKey] = useState(pathname);

  useEffect(() => {
    setAnimKey(pathname);
  }, [pathname]);

  return (
    <div key={animKey} className="page-transition">
      {children}
    </div>
  );
}
