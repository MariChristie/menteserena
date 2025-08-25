class MobileNavbar {
  constructor(mobileMenu, navPanel, body) {
    this.mobileMenu = document.querySelector(mobileMenu);
    this.navPanel = document.querySelector(navPanel);
    this.body = document.querySelector(body);
    this.activeClass = "active";
  }

  handleClick() {
    this.navPanel.classList.toggle(this.activeClass);
    this.mobileMenu.classList.toggle(this.activeClass);
    this.body.classList.toggle("no-scroll");
  }

  addClickEvent() {
    if (this.mobileMenu) {
      this.mobileMenu.addEventListener("click", () => this.handleClick());
    }
  }

  init() {
    this.addClickEvent();
    return this;
  }
}

const mobileNavbar = new MobileNavbar(
  ".mobile-menu",
  ".mobile-nav-panel",
  "body"
);
mobileNavbar.init();