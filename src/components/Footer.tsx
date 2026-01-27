import React from 'react';
import './Footer.css';
import { FaGithub } from 'react-icons/fa';

// Custom Copyright SVG icon component
const CopyrightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg" 
    fill="currentColor"
    className={`copyright-icon ${props.className || ''}`}
    {...props}
  >
    <g>
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 2c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 3c1.82 0 3.413.973 4.288 2.428l-1.714 1.029A3 3 0 1 0 12 15a2.998 2.998 0 0 0 2.573-1.456l1.715 1.028A4.999 4.999 0 0 1 7 12c0-2.76 2.24-5 5-5z"></path>
    </g>
  </svg>
);

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  // Get basePath from Next.js runtime for static export
  // Extract path from assetPrefix (which may be a full URL or relative path)
  const getBasePath = (): string => {
    if (typeof window === 'undefined') return '';
    const assetPrefix = (window as any).__NEXT_DATA__?.assetPrefix;
    
    if (assetPrefix) {
      // If assetPrefix is a full URL, extract the pathname
      if (assetPrefix.startsWith('http')) {
        try {
          const url = new URL(assetPrefix);
          return url.pathname.replace(/\/$/, '');
        } catch {
          // Fall through to location-based detection
        }
      } else {
        // If it's already a path, use it directly
        return assetPrefix.replace(/\/$/, '');
      }
    }
    
    // Fallback: detect from window.location.pathname
    const pathname = window.location.pathname;
    if (pathname.startsWith('/gpa/beta')) return '/gpa/beta';
    if (pathname.startsWith('/gpa')) return '/gpa';
    return '';
  };
  
  const basePath = getBasePath();
  const logoPath = basePath ? `${basePath}/logo.svg` : '/logo.svg';
  
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-left">
          <a 
            href="https://github.com/zzokm" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="signature-logo-link"
            style={{
              WebkitMaskImage: `url(${logoPath})`,
              maskImage: `url(${logoPath})`
            }}
            title="Visit creator's profile"
          >
          </a>
          <span>Made by <span style={{ color: '#ff7955' }}>Yehia</span></span>
        </div>
        
        <div className="footer-middle">
          Copyright <CopyrightIcon /> {currentYear}
        </div>
        
        <div className="footer-right">
          <a 
            href="https://github.com/zzokm/gpa" 
            target="_blank" 
            rel="noopener noreferrer"
            className="github-link"
            title="View source code on GitHub"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
