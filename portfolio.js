document.documentElement.classList.add("js-enabled");

const menuToggle = document.querySelector(".menu-toggle");
const siteNavigation = document.querySelector("#site-navigation");

if (menuToggle && siteNavigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    siteNavigation.classList.toggle("is-open", !isOpen);
  });

  siteNavigation.addEventListener("click", event => {
    if (event.target.closest("a")) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      siteNavigation.classList.remove("is-open");
    }
  });
}

const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const filterEmpty = document.querySelector("#filter-empty");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    let visibleCount = 0;

    filterButtons.forEach(filterButton => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    projectCards.forEach(card => {
      const isVisible = filter === "all" || card.dataset.category === filter;
      card.hidden = !isVisible;
      visibleCount += Number(isVisible);
    });

    if (filterEmpty) {
      filterEmpty.hidden = visibleCount > 0;
    }
  });
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(item => revealObserver.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("is-visible"));
}

const terminalForm = document.querySelector("#terminal-form");
const terminalInput = document.querySelector("#terminal-input");
const terminalOutput = document.querySelector("#terminal-output");

if (terminalForm && terminalInput && terminalOutput) {
  const commands = {
    help: "Available commands: help, whoami, ls, clear",
    whoami: "guest — practicing in a simulated lab environment",
    ls: "lab-notes.txt  projects/  reports/"
  };

  terminalForm.addEventListener("submit", event => {
    event.preventDefault();
    const command = terminalInput.value.trim().toLowerCase();
    if (!command) return;

    if (command === "clear") {
      terminalOutput.replaceChildren();
    } else {
      const commandLine = document.createElement("p");
      commandLine.className = "terminal-command";
      commandLine.textContent = `guest@lab:~$ ${command}`;

      const resultLine = document.createElement("p");
      resultLine.textContent = commands[command] || `Command not found: ${command}`;
      terminalOutput.append(commandLine, resultLine);
    }

    terminalInput.value = "";
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
    terminalInput.focus();
  });
}