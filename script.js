const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-navigation");
const currentYear = document.querySelector("#current-year");
const requestForm = document.querySelector("#survey-request-form");
const formStatus = document.querySelector("#form-status");

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

if (requestForm instanceof HTMLFormElement && formStatus) {
  requestForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(requestForm);
    const fields = [
      ["Full name", "name"],
      ["Organization", "organization"],
      ["Email", "email"],
      ["Phone", "phone"],
      ["Service needed", "service"],
      ["Site location", "location"],
      ["Project details", "project"],
    ];
    const message = fields
      .map(([label, name]) => `${label}: ${String(formData.get(name) ?? "").trim() || "Not provided"}`)
      .join("\n\n");
    const emailLink = document.createElement("a");

    emailLink.href = `mailto:novaterra@gmail.com?subject=${encodeURIComponent("Survey request — NovaTerra")}&body=${encodeURIComponent(message)}`;
    emailLink.textContent = "Open your email app to review and send it.";
    formStatus.replaceChildren(document.createTextNode("Your request is ready. "), emailLink);
  });
}

if (menuToggle && navigation) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    navigation.classList.toggle("is-open", !isExpanded);
    document.body.classList.toggle("menu-open", !isExpanded);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      menuToggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 700) {
      closeMenu();
    }
  });
}
