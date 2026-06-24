# Privacy Policy — FCAI GPA Calculator

This document describes how the [GPA Calculator](https://gpa.zokm.me) handles information. The app is built for FCAI students at Cairo University. **This policy is published in the repository for transparency; it is not shown as a page inside the live web app.**

*Last updated: 2026-06-24*

---

## Summary

- Your **course list and grades stay in your browser** (localStorage). We do not operate a server-side database of your academic data.
- The **production deployment** uses **Google Analytics 4 (GA4)** to understand how the app is used and to improve it.
- We **do not** collect your name, student ID, course names, or the HTML you paste to import courses.
- After a **successful HTML import from the FCAI portal**, we send **one analytics event** that includes your **overall GPA** (two decimal places) computed from the imported courses at that moment. GPA is **not** sent when you only add courses manually or when you edit grades later.

---

## Data stored on your device

The app saves the following in your browser’s **localStorage** so you can return later:

- Courses (name, credit hours, grade, level, term, import flag)
- Collapsed/expanded state of course groups
- Language preference (English or Egyptian Arabic)

This data never leaves your device except as described under analytics below. Clearing site data in your browser removes it.

---

## Google Analytics 4

When you use the **hosted production app** (not local development without a measurement ID), Google Analytics may collect:

### Automatically (Enhanced Measurement)

- Page views (URL, page title)
- Scroll depth (e.g. 90% scroll)
- Clicks on **outbound links** (e.g. GitHub, FCAI portal, extension stores)
- Some form interactions on the add-course form
- Device type, browser, operating system, screen size
- Approximate location (country/city derived from IP by Google)
- Session information (duration, returning vs new visitor)
- Referrer and campaign parameters (UTM) when present

Google uses cookies such as `_ga` to distinguish browsers and sessions. See [Google’s privacy policy](https://policies.google.com/privacy) for how Google processes data.

### Custom events we send

We send events for product improvement, for example:

- Opening or closing modals (import, how-to)
- Import attempts, successes, and failures (error type only — **not** pasted HTML)
- **On each successful HTML import only:** overall **`gpa`** (numeric, 2 decimals), number of courses imported, whether existing data was replaced, and coarse buckets (e.g. how many imported rows had grades)
- Adding, removing, or editing courses manually (counts and grades on the scale — **not** course names)
- Language changes, clear-all and undo, group expand/collapse, and similar UI actions

We **do not** send:

- Course names or course codes  
- Student IDs, email addresses, or names  
- The text or HTML you paste into the import box  
- GPA on events other than a successful HTML import  

---

## Who processes analytics data

Analytics data is processed by **Google LLC** as part of Google Analytics 4, under your use of the production website. The open-source code in this repository does not include your measurement ID; the deployer configures it via environment variables.

---

## Opting out

You can limit analytics collection by:

- Using browser extensions that block Google Analytics  
- Blocking third-party or analytics scripts in your browser  
- Running the app locally from source without a measurement ID  

Disabling analytics does not affect GPA calculation or local storage of your courses.

---

## Changes

This file may be updated when analytics or storage behavior changes. The date at the top reflects the latest revision.

---

## Contact

For questions about this policy or the open-source project, open an issue or contact the maintainer via the [GitHub repository](https://github.com/zzokm/gpa).
