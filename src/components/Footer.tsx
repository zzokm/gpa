import './Footer.css'
import React from 'react'
import { FaGithub, FaStar } from 'react-icons/fa'
import { FiGithub } from 'react-icons/fi'
import { useLocale } from '../i18n/LocaleContext'

const CREATOR_GITHUB_URL = 'https://github.com/zzokm'
const REPO_GITHUB_URL = 'https://github.com/zzokm/gpa'

const Footer: React.FC = () => {
  const { t } = useLocale()

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-left">
          <a
            href={CREATOR_GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-creator-link"
            title={t('footer.visitProfile')}
          >
            <FiGithub className="footer-creator-link-icon" aria-hidden="true" />
            <span>{t('footer.madeBy')}</span>
          </a>
        </div>

        <div className="footer-right">
          <a
            href={REPO_GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-star-btn"
            title={t('footer.starRepo')}
          >
            <FaGithub className="footer-star-btn-github" aria-hidden="true" />
            <span className="footer-star-btn-separator" aria-hidden="true" />
            <span className="footer-star-btn-label">{t('footer.star')}</span>
            <FaStar className="footer-star-btn-star" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
