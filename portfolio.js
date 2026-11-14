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
const trainingPosts = document.querySelector("#training-posts");
const trainingPostGrid = document.querySelector("#training-post-grid");
const archiveTopicFilter = document.querySelector("#archive-topic-filter");

const hackersAriseCourseRules = [
  { name: "Linux Basics for Hackers", pattern: /\blinux basics for hackers\b/i },
  { name: "Network Basics for Hackers", pattern: /\bnetwork basics for hackers\b/i },
  { name: "Getting Started Becoming a Master Hacker", pattern: /\bgetting started becoming a master hacker\b|\bbecoming a master hacker\b/i },
  { name: "MITRE ATT&CK for Cybersecurity Analysts", pattern: /\bmitre att&(?:amp;)?ck hands-on\b|\bmitre att&(?:amp;)?ck for cybersecurity analysts\b/i },
  { name: "Cyber-threat Intelligence and Hunting for Cybersecurity", pattern: /\bcyber.?threat intelligence\b/i },
  { name: "Open Source Intelligence (OSINT)", pattern: /\bopen source intelligence\b|\bosint\b/i },
  { name: "Web App Hacking", pattern: /\bweb app hacking\b/i },
  { name: "PowerShell for Hackers", pattern: /\bpowershell for hackers\b/i },
  { name: "Security+ SY0-701 Bootcamp", pattern: /\bsecurity\s*\+\s*(?:sy0-701\b)?(?:\s+bootcamp\b)?/i },
  { name: "Phishing Analysis", pattern: /\bphishing analysis\b/i },
  { name: "Cyber Defense from a Military Perspective", pattern: /\bcyber defense from (?:a )?military perspective\b|\bmilitary-level cyber defense\b/i },
  { name: "Infrastructure Basics for Hackers", pattern: /\binfrastructure basics for hackers\b/i },
  { name: "Python Basics for Hackers", pattern: /\bpython basics for hackers\b/i },
  { name: "Radio Basics for Hackers", pattern: /\bradio basics for hackers\b/i },
  { name: "Cryptography Basics for Hackers", pattern: /\bcryptography basics for hackers\b/i },
  { name: "Wi-Fi Hacking", pattern: /\bwi-?fi hacking\b/i },
  { name: "Nmap for Hackers", pattern: /\bnmap (?:for|basics for) hackers\b/i },
  { name: "Criminal Law for Hackers", pattern: /\bcriminal law for hackers\b/i },
  { name: "SOC Analyst Level 1", pattern: /\bsoc analyst\b/i },
  { name: "Certified Threat Intelligence Analyst (CTIA)", pattern: /\bcertified threat intelligence analyst\b|\bctia\b/i }
];

const archiveTopicRules = [
  { name: "Events", pattern: /\boxcon\b/i },
  { name: "Threat intelligence", pattern: /\b(threat intel|threat intelligence|ctia|cyber threat|misp|ioc|indicators of compromise|mitre att&(?:amp;)?ck|apt breakdown|fortibleed)\b/i },
  { name: "SOC & incident response", pattern: /\b(soc|incident response|investigating a cyber attack|digital forensics|malicious bluetooth)\b/i },
  { name: "Web & application security", pattern: /\b(web app|web hacking|web security|php|beef-xss|simple exploit|evilginx|eviltokens)\b/i },
  { name: "Network & wireless", pattern: /\b(network|nmap|wi-?fi|wireless|radio basics|sdr|bluetooth|rfid|proxmark|tcpdump|wireshark|shodan|responder|ntlm relay|psexec)\b/i },
  { name: "Linux & scripting", pattern: /\b(linux|python|powershell|bash|scripting)\b/i },
  { name: "Security awareness & social engineering", pattern: /\b(phishing|social engineering|security awareness|human psychology|think before you click|sleep late)\b/i },
  { name: "Cryptography & steganography", pattern: /\b(cryptography|encryption|steganography)\b/i },
  { name: "Malware analysis", pattern: /\bmalware\b|malicious python/i },
  { name: "Red team & cyber defense", pattern: /\b(red team|red-teamer|cyber defense|military|cyberwarfare|c2 framework|command and control|exploit|hacker|hacking|attack chain|covenant|caldera|havoc)\b/i }
];

function getArchiveTopic(text) {
  const course = hackersAriseCourseRules.find(item => item.pattern.test(text));
  if (course) return course.name;

  const rule = archiveTopicRules.find(topic => topic.pattern.test(text));
  return rule ? rule.name : "Security fundamentals";
}

function formatArchiveDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date unavailable";
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(date);
}

function isStandaloneProjectPost(tweet) {
  const text = tweet.text || "";
  const media = Array.isArray(tweet.media) ? tweet.media : [];
  return /\b(honeypot|nessus|active directory|scada)\b/i.test(text)
    || media.some(url => url.includes("HI7tiMoXYAAhN-i"));
}

function renderTrainingArchive() {
  if (!trainingPostGrid) return;

  const tweets = Array.isArray(window.tweetsArchive)
    ? window.tweetsArchive.filter(tweet =>
      Array.isArray(tweet.media)
      && tweet.media.length > 0
      && !isStandaloneProjectPost(tweet)
    )
    : [];
  if (!tweets.length) {
    const message = document.createElement("p");
    message.className = "filter-empty";
    message.textContent = "The posts archive could not be loaded.";
    trainingPostGrid.replaceChildren(message);
    return;
  }

  const topicCounts = new Map();
  tweets.forEach(tweet => {
    const topic = getArchiveTopic(tweet.text || "");
    topicCounts.set(topic, (topicCounts.get(topic) || 0) + 1);
  });

  if (archiveTopicFilter) {
    const makeOption = (label, value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = label;
      return option;
    };
    const options = document.createDocumentFragment();
    const allOption = makeOption("All posts", "all");
    options.appendChild(allOption);

    [
      { label: "Hackers-Arise courses", rules: hackersAriseCourseRules },
      { label: "Other topics", rules: archiveTopicRules.concat({ name: "Security fundamentals" }) }
    ].forEach(group => {
      const groupOptions = group.rules
        .filter(topic => topicCounts.has(topic.name))
        .map(topic => makeOption(topic.name, topic.name));
      if (!groupOptions.length) return;

      const optgroup = document.createElement("optgroup");
      optgroup.label = group.label;
      groupOptions.forEach(option => optgroup.appendChild(option));
      options.appendChild(optgroup);
    });

    archiveTopicFilter.replaceChildren(options);
  }

  const fragment = document.createDocumentFragment();
  tweets.forEach(tweet => {
    const card = document.createElement("article");
    card.className = "training-post-card";
    const topic = getArchiveTopic(tweet.text || "");
    card.dataset.topic = topic;

    const media = Array.isArray(tweet.media) ? tweet.media : [];
    if (media.length) {
      const mediaGrid = document.createElement("div");
      mediaGrid.className = "training-post-media";
      media.forEach((url, index) => {
        const image = document.createElement("img");
        image.src = url;
        image.alt = tweet.text ? `${tweet.text} — image ${index + 1}` : `Post image ${index + 1}`;
        image.loading = "lazy";
        mediaGrid.appendChild(image);
      });
      card.appendChild(mediaGrid);
    }

    const copy = document.createElement("div");
    copy.className = "training-post-copy";

    const category = document.createElement("p");
    category.className = "training-post-category";
    category.textContent = topic;

    const date = document.createElement("p");
    date.className = "training-post-date";
    date.textContent = formatArchiveDate(tweet.date);

    const text = document.createElement("p");
    text.className = "training-post-text";
    text.textContent = tweet.text || "Media post";

    copy.append(category, date, text);
    card.appendChild(copy);
    fragment.appendChild(card);
  });
  trainingPostGrid.replaceChildren(fragment);

  if (archiveTopicFilter) {
    archiveTopicFilter.addEventListener("change", () => {
      const selectedTopic = archiveTopicFilter.value;
      trainingPostGrid.querySelectorAll(".training-post-card").forEach(card => {
        card.hidden = selectedTopic !== "all" && card.dataset.topic !== selectedTopic;
      });
    });
  }
}

renderTrainingArchive();

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach(filterButton => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    projectCards.forEach(card => {
      const isVisible = filter === "all" || card.dataset.category === filter;
      card.hidden = !isVisible;
    });

    if (trainingPosts) {
      trainingPosts.hidden = filter !== "training";
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