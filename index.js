import { projects } from "./data/projects.js";
import { skills } from "./data/skills.js";

function onPageLoad() {
  renderSkills();
  renderMainProject();
  renderOtherProjects();
}

onPageLoad();

function renderSkills() {
  const skillsList = document.querySelector(".skills-container");

  skills.forEach((skill) => {
    const li = document.createElement("li");
    li.innerText = skill.name;
    skillsList.append(li);
  });
}

function renderMainProject() {
  const featuredProject = projects.find((p) => p.featured);

  const mainProject = document.querySelector(".main-project");

  const above = document.createElement("div");
  const link = document.createElement("a");
  const img = document.createElement("img");
  img.src = featuredProject.image;

  link.append(img);
  above.append(link);

  const below = document.createElement("div");
  const leftSide = document.createElement("div");
  const rightSide = document.createElement("div");
  const title = document.createElement("h2");
  const text = document.createElement("p");
  const github = document.createElement("a");

  title.innerText = featuredProject.title;
  text.innerText = featuredProject.description;
  github.innerText = featuredProject.githubLink;

  const techSection = document.createElement("section");
  featuredProject.tech.forEach((tech) => {
    const div = document.createElement("div");
    div.innerText = tech;
    techSection.append(div);
  });

  leftSide.append(title, text);
  rightSide.append(techSection, github);

  below.append(leftSide, rightSide);
  mainProject.append(above, below);
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
