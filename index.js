import projects from "./projects.json" assert { type: "json" };
("use strict");

function fillSkills() {
  console.log("skills added");
}

function fillProjects() {
  if (projects.projects.length > 0) {
    let innerContent = "";
    projects.projects.forEach((project) => {
      let content = `<div class="box">
    <div class="image-container">
      <img src="${project.image}" alt="${project.alt}" width="150"
        height="100">
    </div>
    <div class="triangle-up"></div>
    <div class="project-info">
      <div class="project-title">
        ${project.name}
      </div>
      <div class="project-description">
      ${project.description}
      </div>
      <div class="popup-link">
        click
      </div>
    </div>
  </div> <br>`;
      innerContent += content;
    });

    let projectsElement = document.querySelector(".projects-container");
    projectsElement.insertAdjacentHTML("afterbegin", innerContent);
    console.log("projects added");
  }
}

function init() {
  fillSkills();
  fillProjects();
}

window.onload = init;
