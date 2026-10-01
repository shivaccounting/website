SHIV ACCOUNTING WEBSITE — HOW TO PUT IT LIVE
=============================================

What is in this folder
- index.html, services.html, industries.html, about.html, contact.html  (the 5 pages)
- thank-you.html (shown after the contact form is sent), 404.html (page not found)
- assets/  (styles, logo, photo, brochure PDF, share image)
- vercel.json  (keeps the old addresses like /services working on Vercel)
- .htaccess    (same job if you ever host on Hostinger instead)
- robots.txt, sitemap.xml  (for Google)

Where your site lives today
- shivaccounting.com points to Vercel (IP 216.198.79.1). DNS is managed at Hostinger.
- Your email uses Microsoft 365 (MX record -> mail.protection.outlook.com).
- Do NOT change or delete MX, TXT, CNAME "autodiscover" or other Microsoft records at Hostinger.

OPTION A (recommended) — replace the site on Vercel. No DNS changes.
1. Log in at vercel.com with the account that hosts the current site.
2. Create a free GitHub account if you do not have one. Make a new repository
   called "shivaccounting-website" and upload EVERYTHING in this folder
   (drag the files in the browser, including the assets folder and vercel.json).
3. In Vercel: Add New -> Project -> Import that GitHub repository.
   Framework preset: "Other". Leave build command and output directory empty. Deploy.
4. Open the new deployment link (something.vercel.app) and check every page on
   your phone and computer.
5. In the OLD Vercel project: Settings -> Domains -> remove shivaccounting.com
   and www.shivaccounting.com.
6. In the NEW project: Settings -> Domains -> add shivaccounting.com and
   www.shivaccounting.com. Because DNS already points to Vercel, they go live
   within minutes. Nothing changes at Hostinger.
7. Keep the old project for a week as a backup, then delete it if you like.

Future edits: change a file in GitHub -> Vercel republishes automatically.

OPTION B — host on Hostinger instead (only if you want to leave Vercel)
1. Hostinger hPanel -> Websites -> your hosting plan -> File Manager -> public_html.
2. Upload all files from this folder (show hidden files so .htaccess is included).
3. Hostinger -> Domains -> DNS: change ONLY the A record for "@" to your
   hosting plan's IP, and make "www" a CNAME to shivaccounting.com.
   Leave every Microsoft 365 record exactly as it is.
4. Enable the free SSL certificate in hPanel. Allow up to a few hours for DNS.

After it is live
- Contact form: the first time someone submits it, FormSubmit sends a one-time
  activation email to info@shivaccounting.com. Click "Activate" in that email,
  otherwise you will not receive enquiries. Send yourself a test first.
- Google Search Console: add the site and submit https://www.shivaccounting.com/sitemap.xml
- Calendly, LinkedIn and email links are already set.
