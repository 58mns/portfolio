import skills from "./skills.json" assert { type: "json" };
import projects from "./projects.json" assert { type: "json" };
("use strict");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

function fillSkills() {
  if (skills.skills.length > 0) {
    let innerContent1 = "";

    skills.skills.forEach((skill) => {
      let innerContent2 = "";

      skill.tools.forEach((tool) => {
        innerContent2 += `<div class="skill-tool">
        ${tool}
        </div>`;
      });

      let content = `<div class="skill-container">
      <div class="skill-category skill-category-text-1">
        <div class="skill-category-title">
          ${skill.category}
        </div>
        <div class="skill-category-line"></div>
      </div>
      <div class="skill-tools skill-tool-text-1">
        ${innerContent2}
      </div>
    </div>`;

      innerContent1 += content;
    });

    let skillsElement = document.querySelector(".skills-container");
    skillsElement.insertAdjacentHTML("afterbegin", innerContent1);
  }
}

function fillProjects() {
  if (projects.projects.length > 0) {
    let innerContent1 = "";

    projects.projects.forEach((project) => {
      let content = `<div class="project-container">
      <div class="project-image-container">
        <img src="${project.image}" alt="${project.alt}">
      </div>

      <div class="project-description description-text-1">
        <div class="project-title project-text-1">
          ${project.title}
        </div>

        <div class="project-category project-text-2">
        ${project.category}
        </div>

        <div class="project-about project-text-3">
        ${project.about}
        </div>

        <button name="button-project" value="${project.title}" class="project-button project-text-4"
          onclick="console.log(this.value)">
          More info
        </button>

      </div>
    </div>`;

      innerContent1 += content;
    });

    let projectsElement = document.querySelector(".projects-container");
    projectsElement.insertAdjacentHTML("afterbegin", innerContent1);
  }
}

function init() {
  const hiddenElements = document.querySelectorAll(".hidden");
  hiddenElements.forEach((el) => observer.observe(el));

  fillSkills();
  fillProjects();
}

window.onload = init;
