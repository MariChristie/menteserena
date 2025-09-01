function setActiveLink() {
  const currentPath = window.location.pathname;

  const navLinks = document.querySelectorAll('.nav-menu a, .mobile-nav-panel a');

  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;


    if ((currentPath === '/' || currentPath === '/index.html') && (linkPath === '/' || linkPath === '/index.html')) {
      link.classList.add('active-link');
    } else if (currentPath !== '/' && linkPath === currentPath) {
      link.classList.add('active-link');
    }
  });
}


class MobileNavbar {
  constructor(mobileMenu, navPanel, navLinks, body) {
    this.mobileMenu = document.querySelector(mobileMenu);
    this.navPanel = document.querySelector(navPanel);
    this.navLinks = document.querySelectorAll(navLinks);
    this.body = document.querySelector(body);
    this.activeClass = "active";
    this.noScrollClass = "no-scroll";

    this.handleClick = this.handleClick.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
  }

  handleClick() {
    this.navPanel.classList.toggle(this.activeClass);
    this.mobileMenu.classList.toggle(this.activeClass);
    this.body.classList.toggle(this.noScrollClass);
  }

  closeMenu() {
    this.navPanel.classList.remove(this.activeClass);
    this.mobileMenu.classList.remove(this.activeClass);
    this.body.classList.remove(this.noScrollClass);
  }

  handleLinkClick(event) {
    const link = event.currentTarget.querySelector('a');
    if (!link) return;

    const href = link.getAttribute('href');

    if (href.startsWith('#')) {
      event.preventDefault();

      const targetElement = document.querySelector(href);
      if (targetElement) {
        this.closeMenu();

        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }, 400);
      }
    } else {
      this.closeMenu();
    }
  }

  addClickEvents() {
    if (this.mobileMenu) {
      this.mobileMenu.addEventListener("click", this.handleClick);
    }
    this.navLinks.forEach((link) => {
      link.addEventListener("click", this.handleLinkClick);
    });
  }

  init() {
    this.addClickEvents();
    return this;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const mobileNavbar = new MobileNavbar(
    ".mobile-menu",
    ".mobile-nav-panel",
    ".mobile-nav-panel li",
    "body"
  );
  mobileNavbar.init();

  setActiveLink();

  if (window.location.hash) {
    const targetElement = document.querySelector(window.location.hash);
    if (targetElement) {
      setTimeout(() => {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }, 100);
    }
  }
});