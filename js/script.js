
document.addEventListener("DOMContentLoaded", () => {


    class MobileNavbar {
        constructor(mobileMenu, navPanel, body) {
            this.mobileMenu = document.querySelector(mobileMenu);
            this.navPanel = document.querySelector(navPanel);
            this.body = document.querySelector(body);
            this.activeClass = "active";
            this.noScrollClass = "no-scroll";

            this.handleClick = this.handleClick.bind(this);
        }

        handleClick() {
            this.navPanel.classList.toggle(this.activeClass);
            this.mobileMenu.classList.toggle(this.activeClass);
            this.body.classList.toggle(this.noScrollClass);
        }

        addClickEvent() {
            if (this.mobileMenu) {
                this.mobileMenu.addEventListener("click", this.handleClick);
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