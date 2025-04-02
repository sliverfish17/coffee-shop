import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../types/roles";
import { menuItems } from "../../helpers/menu";

const getRole = (): ROLES | null =>
  localStorage.getItem("role") as ROLES | null;

const Drawer = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const role = getRole();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = open ? "hidden" : "auto";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 bg-zinc-800 text-white px-4 py-2 rounded-md shadow"
      >
        ☰ Меню
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-zinc-900 text-white z-50 transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4 border-b border-zinc-700 flex justify-between items-center">
          <h2 className="text-xl font-bold">Меню</h2>
          <button onClick={() => setOpen(false)} className="text-lg">
            ×
          </button>
        </div>

        <nav className="p-4 space-y-6">
          {menuItems
            .filter((section) => section.roles.includes(role || ""))
            .map((section) => (
              <div key={section.category}>
                <h3 className="text-sm text-zinc-400 uppercase mb-2">
                  {section.category}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.to}>
                      <button
                        onClick={() => {
                          if (link.onClick) link.onClick();
                          navigate(link.to);
                          setOpen(false);
                        }}
                        className="block w-full text-left"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </nav>
      </div>
    </>
  );
};

export default Drawer;
