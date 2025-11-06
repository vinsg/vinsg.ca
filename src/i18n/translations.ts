export const languages = {
  en: 'English',
  fr: 'Français',
};

export const defaultLang = 'en';

export const ui = {
  en: {
    'nav.uses': 'Uses',
    'nav.home': 'Home',
    'hero.greeting': 'Hello,',
    'hero.intro': "My name is Vincent, <em>aka vinsg</em>. I'm an Android developer passionate about building great user interfaces and exploring interaction design. I speak English and French fluently.",
    'hero.location': 'I currently live and work in Montréal, Canada.',
    'hero.contact': 'Feel free to take a look around my blog or contact me on',
    'posts.title': 'Posts',
    'posts.comingSoon': 'Coming Soon!',
    'slides.title': 'Slides',
    'slides.comingSoon': 'Coming Soon!',
    'projects.title': 'Projects',
    'projects.editOwners.description': 'A CLI tool to manage GitHub CODEOWNERS files',
    'projects.website.description': 'This personal website with my writings',
    'blog.by': 'by',
    'blog.readingTime': 'min read',
    'site.title': 'The Interface Codex',
    'site.description': "Vincent's blog, following all my curiosities.",
  },
  fr: {
    'nav.uses': 'Utilisations',
    'nav.home': 'Accueil',
    'hero.greeting': 'Bonjour,',
    'hero.intro': "Je m'appelle Vincent, <em>aka vinsg</em>. Je suis développeur Android passionné par la création d'excellentes interfaces utilisateur et l'exploration du design d'interaction. Je parle couramment anglais et français.",
    'hero.location': 'Je vis et travaille actuellement à Montréal, Canada.',
    'hero.contact': "N'hésitez pas à consulter mon blog ou à me contacter sur",
    'posts.title': 'Articles',
    'posts.comingSoon': 'Bientôt disponible !',
    'slides.title': 'Présentations',
    'slides.comingSoon': 'Bientôt disponible !',
    'projects.title': 'Projets',
    'projects.editOwners.description': 'Un outil CLI pour gérer les fichiers GitHub CODEOWNERS',
    'projects.website.description': 'Ce site web personnel avec mes écrits',
    'blog.by': 'par',
    'blog.readingTime': 'min de lecture',
    'site.title': 'Le Codex de l\'Interface',
    'site.description': 'Le blog de Vincent, suivant toutes mes curiosités.',
  },
} as const;

export type UIKey = keyof typeof ui['en'];
