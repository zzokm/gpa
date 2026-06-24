export const FCAI_DOMAIN_URL = 'http://newecom.fci.cu.edu.eg/' as const
export const FCAI_IP_URL = 'http://193.227.14.58/' as const

/** Hash route on the registered-courses page (same on domain and IP mirrors). */
export const FCAI_REGISTERED_COURSES_PATH = '#/courses-per-students' as const

/** Registered courses page — IP mirror + standard in-app route. */
export const FCAI_REGISTERED_COURSES_URL =
  `${FCAI_IP_URL.replace(/\/$/, '')}${FCAI_REGISTERED_COURSES_PATH}` as const

/** Checked in order for online/offline status (IP first — often more reachable on campus). */
export const FCAI_URLS = [FCAI_IP_URL, FCAI_DOMAIN_URL] as const

/** User-facing “FCAI Website” link — IP mirror, not the domain. */
export const FCAI_WEBSITE_URL = FCAI_IP_URL
