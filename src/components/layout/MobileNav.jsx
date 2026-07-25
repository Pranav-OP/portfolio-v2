import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import nav from "../../data/navigation.json";
import profile from "../../data/profile.json";
import ThemeToggle from "../ui/ThemeToggle";

export default function MobileNav({ active }) {
  const [open, setOpen] = useState(false);

  // Lock scroll while the menu overlay is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-line bg-bg/80 px-5 py-3 backdrop-blur-md">
        <a href="#about" className="font-mono text-lg font-bold text-accent-fg">
          {profile.firstName}
          <span className="text-fg">.</span>
        </a>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-fg-soft"
          >
            <FiMenu size={20} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-bg/95 backdrop-blur-xl"
          >
            <div className="flex justify-end p-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-fg-soft"
              >
                <FiX size={20} />
              </button>
            </div>
            <motion.nav
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06 } } }}
              className="flex flex-col items-center gap-7 pt-10"
            >
              {nav.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    show: { opacity: 1, y: 0 },
                  }}
                  className={`font-mono text-lg ${
                    active === item.id ? "text-accent-fg" : "text-fg-soft"
                  }`}
                >
                  <span className="mr-2 text-sm text-accent-fg">
                    0{i + 1}.
                  </span>
                  {item.label}
                </motion.a>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
