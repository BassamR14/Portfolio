import { projects } from "./data/projects.js";
import { skills } from "./data/skills.js";

function onPageLoad() {
  renderSkills();
  renderMainProject();
  renderOtherProjects();
  initThemeToggle();
}

onPageLoad();

function renderSkills() {
  const skillsList = document.querySelector(".skills-container");
  const categories = ["languages", "frameworks", "tools"];

  categories.forEach((category) => {
    const heading = document.createElement("h3");
    heading.innerText = category;
    skillsList.append(heading);

    const categoryList = document.createElement("ul");

    const items = skills.filter((s) => s.category === category);
    items.forEach((skill) => {
      const li = document.createElement("li");
      const icon = document.createElement("i");
      icon.className = skill.icon;
      li.append(icon, skill.name);
      categoryList.append(li);
    });
    skillsList.append(categoryList);
  });
}

function renderMainProject() {
  const featuredProject = projects.find((p) => p.featured);

  const mainProject = document.querySelector(".main-project");

  const imgDiv = document.createElement("div");
  const link = document.createElement("a");
  const img = document.createElement("img");
  img.src = featuredProject.image;

  link.append(img);
  imgDiv.append(link);

  const infoDiv = document.createElement("div");
  infoDiv.classList.add("main-proj-info");
  const title = document.createElement("h2");
  const text = document.createElement("p");
  const techUsed = document.createElement("p");
  const github = document.createElement("a");

  title.innerText = featuredProject.title;
  text.innerText = featuredProject.description;
  github.innerText = featuredProject.githubLink;
  techUsed.innerText = "Tech: ";

  const techSection = document.createElement("section");
  techSection.classList.add("tech-used");
  featuredProject.tech.forEach((tech) => {
    const div = document.createElement("div");
    div.innerText = tech;
    techSection.append(div);
  });

  techUsed.append(techSection);
  infoDiv.append(title, text, techUsed, github);
  mainProject.append(imgDiv, infoDiv);
}

function renderOtherProjects() {
  const otherProjects = projects
    .filter((p) => !p.featured)
    .reverse()
    .slice(0, 3);

  const otherProjectsSection = document.querySelector(".other-projects");
  const projectsContainer = document.createElement("div");
  projectsContainer.classList.add("other-projects-container");

  otherProjects.forEach((project) => {
    const card = document.createElement("div");
    const link = document.createElement("a");
    const img = document.createElement("img");
    const title = document.createElement("h2");

    img.src = project.image;
    title.innerText = project.title;

    link.append(img);
    card.append(link, title);
    projectsContainer.append(card);
  });

  const seeMoreBtn = document.createElement("button");
  seeMoreBtn.innerText = "See More";

  otherProjectsSection.append(projectsContainer, seeMoreBtn);
}

function initThemeToggle() {
  const buttons = document.querySelectorAll(".toggle-btn");
  const pill = document.querySelector(".toggle-pill");

  const savedTheme = localStorage.getItem("theme") || "manga";
  applyTheme(savedTheme, buttons, pill);

  buttons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      applyTheme(btn.dataset.theme, buttons, pill);
      console.log(document.body.className);

      localStorage.setItem("theme", btn.dataset.theme);
    });
  });
}

function applyTheme(theme, buttons, pill) {
  buttons.forEach((btn) => btn.classList.remove("active"));
  const activeBtn = [...buttons].find((b) => b.dataset.theme === theme);
  activeBtn.classList.add("active");

  const index = [...buttons].indexOf(activeBtn);
  pill.style.transform = index === 0 ? "translateX(0)" : "translateX(100%)";

  document.body.className = `theme-${theme}`;
}
