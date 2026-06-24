export const FCAI_DOMAIN_URL = 'http://newecom.fci.cu.edu.eg/' as const
export const FCAI_IP_URL = 'http://193.227.14.58/' as const

/** Checked in order for online/offline status (IP first — often more reachable on campus). */
export const FCAI_URLS = [FCAI_IP_URL, FCAI_DOMAIN_URL] as const

/** User-facing “FCAI Website” link — IP mirror, not the domain. */
export const FCAI_WEBSITE_URL = FCAI_IP_URL
