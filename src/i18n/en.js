// English source strings — the single source of truth for site copy.
//
// Farsi lives in fa.json and is generated from this file with
// `npm run translate` (local Ollama), then reviewed by a human. Editing an
// English string here marks its Farsi as stale; `npm run i18n:check` reports
// it and the site falls back to English for that string until it is
// re-translated.
//
// {name} placeholders are filled at render time (often with a link) and must
// survive translation unchanged.
//
// Keys are grouped by page. Post content (src/data/posts.js) is NOT here yet.
export default {
  // ---------------------------------------------------------------- shared
  'site.name': 'Persian Parade',
  'nav.home': 'Home',
  'nav.about': 'About Us',
  'nav.news': 'News',
  'nav.events': 'Events',
  'nav.gallery': 'Gallery',
  'nav.press': 'Press Room',
  'nav.sponsors': 'Sponsors',
  'nav.support': 'Support',
  'nav.history': 'Post History',
  'nav.contact': 'Contact Us',
  'nav.donate': 'Donate',
  'nav.shop': 'Shop',
  'nav.toggleMenu': 'Toggle menu',
  'lang.label': 'Language',
  'lang.machineNotice':
    'This Persian translation was drafted automatically and is being reviewed. If something reads wrong, please let us know.',
  'lang.englishOnly': 'This post is available in English only.',

  'footer.copyright': '© {year} Persian Parade Foundation - a 501(c)(3) non-profit organization',
  'footer.about': 'About',
  'footer.contact': 'Contact',
  'footer.contactHeading': 'Contact Us',
  'footer.logoAlt': 'Persian Parade Foundation logo',

  'cta.donateNow': 'Donate Now',
  'common.donationAppeal':
    'Your generous donations help sustain our mission to promote Persian art, culture, and community spirit year-round. Every contribution makes a difference.',

  // ------------------------------------------------------------------ home
  'home.ourSponsors': 'Our Sponsors',
  'home.sponsorAlt': 'AHA Persian School - Sponsor',

  // ----------------------------------------------------------------- about
  'about.title': 'About Us',
  'about.subtitle': 'The Persian Parade!',
  'about.founded':
    'The Persian Parade in New York City was founded in 2004 by visionary Iranian American doctors with the aim of celebrating Persian culture and heritage, especially during the Persian New Year festivities.',
  'about.leadershipTitle': 'Our Leadership',
  'about.leadership':
    'The Persian Parade Foundation is governed by an elected Board of Directors, made up of members of the Persian community from the New York area.',
  'about.missionTitle': 'Our Purpose & Mission',
  'about.mission1':
    'The annual Persian Parade is the culmination of a year-long, community-wide effort to celebrate the rich history of Persian culture in New York City.',
  'about.mission2':
    'Our organization aspires to create friendship and understanding with other cultures and educate about Iranian heritage and values.',
  'about.mission3':
    'The Persian Parade Foundation is a non-religious, non-political, non-governmental organization.',
  'about.img1Alt': 'A dancer in traditional Persian costume performing in the parade',
  'about.img2Alt': 'Parade leaders in green, white and red sashes marching with flags',
  'about.img3Alt': 'A boy holding a sign that reads "My love USA & Iran"',

  // --------------------------------------------------------------- contact
  'contact.title': 'Contact Us',
  'contact.intro':
    "We'd love to hear from you. Reach out with any questions, suggestions, or collaboration ideas.",
  'contact.getInTouch': 'Get in Touch',
  'contact.body':
    'For general inquiries or to get involved with the Persian Parade Foundation, please contact us using the form or the details below.',
  'contact.emailLabel': 'Email:',
  'form.email': 'Email Address',
  'form.message': 'Message',
  'form.submit': 'Submit',
  'form.sending': 'Sending...',
  'form.thanks': 'Thanks for your message! We’ll be in touch soon.',

  // ---------------------------------------------------------------- donate
  'donate.title': 'Donate',
  'donate.intro':
    'Your generous support helps sustain our mission to promote Persian art, culture, and community spirit year-round. Every contribution makes a difference.',
  'donate.makeDonation': 'Make a Donation',
  'donate.zeffy':
    'All donations are processed securely through Zeffy, a 0% fee fundraising platform. 100% of your donation goes directly to the Persian Parade Foundation.',
  'donate.formTitle': 'Donation form powered by Zeffy',
  'donate.byCheck': 'Prefer to donate by check or have questions? Contact us at {email}',
  'donate.taxNote':
    'Persian Parade Foundation is a 501(c)(3) non-profit organization. Your donation is tax-deductible to the extent allowed by law. EIN: {ein}',

  // ---------------------------------------------------------------- events
  'events.title': 'Events',
  'events.intro':
    "Celebrate Persian culture with us. From parades to performances, this is where you'll find everything happening with the Persian Parade Foundation.",
  'events.noneTitle': 'No upcoming events',
  'events.noneBody':
    'There are no events scheduled at this time. Please check back soon, or follow our social media for announcements.',

  // --------------------------------------------------------------- gallery
  'gallery.title': 'Gallery',
  'gallery.intro': 'Check out these pictures from our previous events!',
  'gallery.album': 'Parade {year}',
  'gallery.photoAlt': 'Parade {year} - photo {n}',
  'gallery.close': 'Close gallery',
  'gallery.closeLabel': 'Close',
  'gallery.photoCount': '{n} photos',

  // --------------------------------------------------------------- history
  'history.title': 'Post History',
  'history.intro': 'Explore past events and memories from the Persian Parade Foundation.',
  'history.empty': 'No archived posts available.',

  // ----------------------------------------------------------------- press
  'press.title': 'Press Room',
  'press.intro':
    "Explore our latest press coverage, videos, and articles showcasing the Persian Parade's rich cultural history and community impact.",
  'press.archive': 'Press Archive',
  'press.clickToView': 'Click to view this press coverage.',
  'press.featured': 'Featured coverage',
  'press.video': 'Video',
  'press.newTab': '(opens in a new tab)',

  // -------------------------------------------------------------- sponsors
  'sponsors.title': 'Become a Sponsor',
  'sponsors.intro':
    'Partner with the Persian Parade Foundation to support cultural celebration, community pride, and the promotion of Iranian heritage in New York City.',
  'sponsors.current': 'Current Sponsors',
  'sponsors.ahaAlt': 'AHA Persian School',
  'sponsors.levels': 'Sponsorship Levels',
  'sponsors.advertising': 'Advertising Sponsorship',
  'sponsors.tier.cyrus': 'Cyrus Cylinder Guild',
  'sponsors.tier.persepolis': 'Persepolis Patron',
  'sponsors.tier.float': 'Float Sponsor',
  'sponsors.tier.sponsor': 'Sponsor',
  'sponsors.b.table10Two': 'Table for 10 at two Persian Parade Galas during the Parade year',
  'sponsors.b.vipTwo': 'VIP seating at two Persian Parade Galas',
  'sponsors.b.recognitionGalas': 'Special recognition on the Persian Parade website and at Galas',
  'sponsors.b.bannersBoth': 'Advertising with long banners along both sides of a float of your choice',
  'sponsors.b.table10One': 'Table for 10 at one Persian Parade Gala',
  'sponsors.b.vipOne': 'VIP seating at one Persian Parade Gala',
  'sponsors.b.recognitionGala': 'Special recognition on the Persian Parade website and at Gala',
  'sponsors.b.bannerOne': 'Advertising with long banner along one side of a float of your choice',
  'sponsors.b.tickets4': '4 tickets to one Persian Parade Gala',
  'sponsors.b.customDesign': 'Custom artistic design request for float (subject to Executive Board approval)',
  'sponsors.b.recognitionWebGala': 'Recognition on website and at Gala',
  'sponsors.b.longBannerOne': 'Long banner along one side of a float of your choice',
  'sponsors.b.displayBoth': 'Display long banners along both sides of a float of your choice',
  'sponsors.b.ackYear': 'Acknowledgment on the Persian Parade website for one year',
  'sponsors.b.boardApproval': 'Subject to Executive Board approval',
  'sponsors.b.displayOneOr': 'Display a long banner along one side of a float, OR',
  'sponsors.b.displayTwoSmall': 'Display two small banners along both sides of a float',
  'sponsors.b.ackWebYear': 'Acknowledgment on the website for one year',
  'sponsors.b.smallBanner': 'Display a small banner on one side of a float',
  'sponsors.reachOut': 'If you would like to become a sponsor, please reach out to {email}.',
  'sponsors.friends': 'Friends of the Persian Parade',
  'sponsors.friendsBody':
    'We welcome donations of any amount. Every contribution helps us sustain and grow this cultural celebration.',
  'sponsors.corporate': 'Corporate Partnership',
  'sponsors.corporateBody':
    'We collaborate with corporations to develop customized partnerships that align with your business goals. Enjoy exclusive co-branding, employee access, float advertising, and recognition across our digital and physical platforms.',
  'sponsors.corporateContact':
    'For partnership inquiries, please contact our Office of Public Relations at {email}.',

  // --------------------------------------------------------------- support
  'support.title': 'Support Us',
  'support.intro':
    'Explore ways you can support the Persian Parade Foundation and help us celebrate Persian culture.',
  'support.memberTitle': 'Become a Member',
  'support.memberBody':
    'Join our community by becoming a member of the Persian Parade Foundation. Members receive exclusive updates, early event invitations, and opportunities to shape the future of our cultural celebrations.',
  'support.memberHow': 'To become a member, please visit our {contactLink} or contact us at {email}.',
  'support.contactPageLink': 'contact us page',
  'support.sponsorTitle': 'Become a Sponsor',
  'support.sponsorBody':
    'Sponsorships help us bring the Persian Parade to life each year. Your support promotes Iranian art, culture, and history to thousands of attendees.',
  'support.sponsorHow':
    'Learn about sponsorship opportunities and benefits on our {sponsorLink} or reach out directly via {email}.',
  'support.sponsorPageLink': 'sponsorship page',
  'support.volunteerTitle': 'Become a Volunteer',
  'support.volunteerBody':
    'Help us create an unforgettable Persian Parade by volunteering your time and talents. We invite you to join one of the following committees:',
  'support.committee.art': 'Art & Design',
  'support.committee.dance': 'Dance',
  'support.committee.fundraising': 'Fundraising',
  'support.committee.pr': 'Public Relations',
  'support.committee.culture': 'Cultural & Education',
  'support.committee.digital': 'Digital Media',
  'support.committee.events': 'Events Planning',
  'support.committee.music': 'Music',
  'support.openings': 'Currently, we have openings for:',
  'support.opening.artDirector': 'Artistic Director',
  'support.opening.digitalDirector': 'Director of Digital Media',
  'support.volunteerHow':
    "If you're interested, please send your resume and a brief summary of your skills to {email}. We will contact you if your background matches our current needs.",
  'support.donorTitle': 'Become a Donor',
  'support.donorHow':
    'To donate, please visit our {donateLink} or contact us for more information at {email}.',
  'support.donatePageLink': 'donation page',

  // --------------------------------------------------------- misc / slider
  'slider.label': 'Photos from past Persian Parades',
  'slider.pause': 'Pause',
  'slider.play': 'Play',

  // ------------------------------------------------------------ home hero
  'hero.eyebrow': 'Annual Persian Day Parade · since 2004',
  'hero.title': 'Celebrating Persian culture in the heart of New York',
  'hero.dateTba': 'Next parade: date to be announced',
  'hero.route': 'Madison Ave, 38th St to 26th St',
  'hero.donate': 'Support the Parade',
  'hero.involved': 'March or volunteer',
  'hero.involvedShort': 'Get involved',

  'involved.title': 'Get involved',
  'involved.donate.title': 'Donate',
  'involved.donate.body': 'Help bring the parade to Madison Avenue every year.',
  'involved.donate.cta': 'Give now',
  'involved.march.title': 'March with us',
  'involved.march.body': 'Bring your school, business or community group.',
  'involved.march.cta': 'Get in touch',
  'involved.sponsor.title': 'Sponsor',
  'involved.sponsor.body': 'Cyrus Cylinder Guild, Persepolis Patron and more.',
  'involved.sponsor.cta': 'See levels',
  'involved.volunteer.title': 'Volunteer',
  'involved.volunteer.body': 'Join a committee and help on parade day or year-round.',
  'involved.volunteer.cta': 'Sign up',

  'news.title': 'Latest news',
  'news.intro': 'Announcements and updates from the Persian Parade Foundation.',
  'news.seeAll': 'See all news',
  'news.archiveLink': 'Looking for older posts? See the post history',
  'news.readMore': 'Read more',
  'news.readLess': 'Show less',

  'sponsorsStrip.thanks': 'Thank you to our sponsors.',
  'sponsorsStrip.become': 'Become a sponsor',
};
