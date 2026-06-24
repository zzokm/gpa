import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { useLocale } from '../i18n/LocaleContext';

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
  const { t } = useLocale();
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
    <>
      <style jsx global>{`.app-footer {
  text-align: center;
  padding: 0px 0 40px 0;
  margin-top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  position: relative;
  width: min(95%, 755px); /* Max width of 800px applied to container */
  margin-left: auto;
  margin-right: auto;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: var(--space-md) var(--space-xl);
  border-radius: var(--radius-lg);
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  transition: var(--transition-base);
}

.footer-content:hover {
  background: rgba(255, 255, 255, 0.22);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 15px;
  flex: 1;
}

.footer-left span {
  color: var(--text-color);
  opacity: 0.78;
  font-size: var(--text-sm);
  letter-spacing: 0.3px;
  font-weight: 500;
}

.footer-middle {
  color: var(--text-color);
  opacity: 0.72;
  font-size: var(--text-sm);
  letter-spacing: 0.5px;
  font-weight: 500;
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.copyright-icon {
  width: var(--text-sm);
  height: var(--text-sm);
  margin: 0 var(--space-xs);
  vertical-align: -0.125em;
  color: var(--text-color);
  opacity: 0.75;
}

.footer-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 15px;
  flex: 1;
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.signature-logo-link {
  display: block;
  width: 40px;
  height: calc(40px * (1440/2558)); /* Calculate height based on SVG aspect ratio */
  background: linear-gradient(45deg, #ff7955, #fab6a1, #ff7955);
  background-size: 200% 200%;
  animation: gradientAnimation 3s ease infinite;
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  transition: transform 0.3s ease;
}

.signature-logo-link:hover {
  transform: scale(1.1);
}

.github-link {
  color: var(--text-color);
  opacity: 0.75;
  font-size: var(--text-2xl);
  transition: var(--transition-base);
}

.github-link:hover {
  transform: scale(1.1);
  color: var(--text-color);
  opacity: 1;
}

/* Enhanced responsive styles */
@media (max-width: 768px) {
  .app-footer {
    width: min(92%, 800px); /* Better width for tablets */
  }
  
  .footer-content {
    flex-direction: column;
    gap: var(--space-lg);
    padding: var(--space-lg) var(--space-md);
    background: rgba(255, 255, 255, 0.22);
  }
  
  .footer-middle {
    font-size: var(--text-xs);
    order: 3;
    font-weight: 600;
    margin-top: var(--space-xs);
  }
  
  .copyright-icon {
    width: var(--text-xs);
    height: var(--text-xs);
    margin: 0 var(--space-xs);
  }
  
  .footer-left {
    gap: var(--space-md);
    order: 1;
    justify-content: center;
  }
  
  .footer-right {
    gap: var(--space-sm);
    order: 2;
  }
  
  .footer-left span {
    font-size: var(--text-sm);
    font-weight: 600;
  }
  
  .github-link {
    font-size: var(--text-2xl);
  }
}

@media (max-width: 480px) {
  .app-footer {
    width: min(90%, 800px); /* Better width for phones */
  }
  
  .footer-content {
    padding: 18px 16px;
    gap: 14px;
  }
  
  .signature-logo-link {
    width: 38px; /* Slightly larger on mobile */
    height: calc(38px * (1440/2558));
  }
  
  .github-link {
    font-size: 28px; /* Even bigger GitHub icon on phones */
  }
  
  .copyright-icon {
    width: 12px;
    height: 12px;
    margin: 0 4px;
  }
}

@media (max-width: 360px) {
  .app-footer {
    width: min(95%, 800px); /* Adjusted width for very small screens */
  }
  
  .footer-content {
    padding: 16px 12px;
    gap: 12px;
  }
}`}</style>
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
            title={t('footer.visitProfile')}
          >
          </a>
          <span>{t('footer.madeBy')} <span style={{ color: '#ff7955' }}>Yehia</span></span>
        </div>
        
        <div className="footer-middle">
          {t('footer.copyright')} <CopyrightIcon /> {currentYear}
        </div>
        
        <div className="footer-right">
          <a 
            href="https://github.com/zzokm/gpa" 
            target="_blank" 
            rel="noopener noreferrer"
            className="github-link"
            title={t('footer.viewSource')}
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;
