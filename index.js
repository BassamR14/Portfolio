import { projects } from "./data/projects.js";
import { skills } from "./data/skills.js";
import { courses } from "./data/courses.js";

function onPageLoad() {
  renderSkills();
  renderMainProject();
  renderOtherProjects();
  renderCourses();
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
    createCard(project, projectsContainer, () => openModal("project", project));
  });

  const seeMoreBtn = document.createElement("button");
  seeMoreBtn.innerText = "See More";

  otherProjectsSection.append(projectsContainer, seeMoreBtn);

  const allOtherProjects = projects.filter((p) => !p.featured).reverse();

  seeMoreBtn.addEventListener("click", () => openModal("all-projects"));
}

function renderCourses() {
  const courseSection = document.querySelector(".courses");

  const courseList = document.createElement("ul");
  courseList.classList.add("list");

  courses.forEach((c) => {
    const li = document.createElement("li");
    li.classList.add("listing");
    const courseSpan = document.createElement("span");
    const statusSpan = document.createElement("span");

    courseSpan.innerText = c.course;
    statusSpan.innerText = c.status;

    if (c.status === "Completed") {
      statusSpan.classList.add("course-completed");
    } else {
      statusSpan.classList.add("course-upcoming");
    }

    li.append(courseSpan, statusSpan);
    courseList.append(li);
  });

  courseSection.append(courseList);
}

function openModal(type, data = null) {
  // prevent duplicate modals
  document.querySelector(".modal")?.remove();

  const modal = document.createElement("div");
  modal.classList.add("modal");

  const closeBtn = document.createElement("button");
  closeBtn.innerText = "✕";
  closeBtn.classList.add("modal-close");
  closeBtn.addEventListener("click", () => modal.remove());

  const content = document.createElement("div");
  content.classList.add("modal-content");

  if (type === "all-projects") {
    const allOtherProjects = projects.filter((p) => !p.featured).reverse();
    const grid = document.createElement("div");
    grid.classList.add("modal-grid");

    allOtherProjects.forEach((project) => {
      createCard(project, grid, () => openModal("project", project));
    });

    content.append(grid);
  }

  if (type === "project") {
    content.classList.add("modal-content--detail");

    const backBtn = document.createElement("button");
    backBtn.innerText = "← Back";
    backBtn.classList.add("modal-back");
    backBtn.addEventListener("click", () => openModal("all-projects"));

    const img = document.createElement("img");
    img.src = data.image;

    const title = document.createElement("h2");
    title.innerText = data.title;

    const description = document.createElement("p");
    description.innerText = data.description;

    const techSection = document.createElement("div");
    techSection.classList.add("modal-tech");
    data.tech.forEach((tech) => {
      const span = document.createElement("span");
      span.innerText = tech;
      techSection.append(span);
    });

    const linksDiv = document.createElement("div");
    linksDiv.classList.add("modal-links");

    if (data.link && data.link !== "#") {
      const liveLink = document.createElement("a");
      liveLink.href = data.link;
      liveLink.target = "_blank";
      liveLink.innerText = "Live Site →";
      linksDiv.append(liveLink);
    }

    if (data.githubLink) {
      const githubLink = document.createElement("a");
      githubLink.href = data.githubLink;
      githubLink.target = "_blank";
      githubLink.innerText = "GitHub →";
      linksDiv.append(githubLink);
    }

    content.append(backBtn, img, title, description, techSection, linksDiv);
  }

  modal.append(closeBtn, content);
  document.body.append(modal);
}

function createCard(object, appendLocation, onClick) {
  const card = document.createElement("div");
  const link = document.createElement("a");
  const img = document.createElement("img");
  const title = document.createElement("h2");

  img.src = object.image;
  title.innerText = object.title;

  link.append(img);
  card.append(link, title);
  appendLocation.append(card);

  card.addEventListener("click", onClick);
  card.style.cursor = "pointer";
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
