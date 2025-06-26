import { Heart, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-green-400">MatchKompass</h3>
            <p className="text-gray-300 text-sm">
              Ihre Plattform für die optimale Streaming-Lösung. 
              Finden Sie die perfekte Kombination für Ihre Lieblings-Vereine.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <Heart className="h-4 w-4 text-red-500" />
              <span>Made with love for football fans</span>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold text-green-400">Rechtliches</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/impressum" className="hover:text-green-400 transition-colors">
                  Impressum
                </Link>
              </li>
              <li>
                <a href="/datenschutz" className="hover:text-green-400 transition-colors">
                  Datenschutz
                </a>
              </li>
              <li>
                <a href="/agb" className="hover:text-green-400 transition-colors">
                  AGB
                </a>
              </li>
              <li>
                <a href="/widerruf" className="hover:text-green-400 transition-colors">
                  Widerrufsrecht
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold text-green-400">Support</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="/faq" className="hover:text-green-400 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/kontakt" className="hover:text-green-400 transition-colors">
                  Kontakt
                </a>
              </li>
              <li>
                <a href="/hilfe" className="hover:text-green-400 transition-colors">
                  Hilfe
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h4 className="font-semibold text-green-400">Kontakt & Social</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@matchkompass.de</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+49 (0) 123 456 789</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Deutschland</span>
              </div>
            </div>
            
            <div className="flex space-x-4 pt-2">
              <a 
                href="https://twitter.com/matchkompass" 
                className="text-gray-400 hover:text-green-400 transition-colors"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a 
                href="https://facebook.com/matchkompass" 
                className="text-gray-400 hover:text-green-400 transition-colors"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href="https://instagram.com/matchkompass" 
                className="text-gray-400 hover:text-green-400 transition-colors"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.366C4.25 14.747 3.76 13.596 3.76 12.299s.49-2.448 1.366-3.323C6.001 8.001 7.152 7.511 8.449 7.511s2.448.49 3.323 1.365c.875.875 1.366 2.026 1.366 3.323s-.49 2.448-1.366 3.323c-.875.876-2.026 1.366-3.323 1.366zm7.718 0c-1.297 0-2.448-.49-3.323-1.366-.875-.875-1.366-2.026-1.366-3.323s.49-2.448 1.366-3.323c.875-.875 2.026-1.365 3.323-1.365s2.448.49 3.323 1.365c.875.875 1.366 2.026 1.366 3.323s-.49 2.448-1.366 3.323c-.875.876-2.026 1.366-3.323 1.366z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 MatchKompass. Alle Rechte vorbehalten.</p>
          <p className="mt-2">
            Alle Preise und Angaben ohne Gewähr. Aktuelle Konditionen beim jeweiligen Anbieter prüfen.
          </p>
        </div>
      </div>
    </footer>
  );
};
