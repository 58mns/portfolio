import skills from "./skills.json" assert { type: "json" };
import projects from "./projects.json" assert { type: "json" };
import popup_projects from "./popup_projects.json" assert { type: "json" };

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

function showProject(value) {
  if (popup_projects.projects.length > 0) {
    let project = popup_projects.projects[value];

    let overlay = document.querySelector(".project-popup-overlay");
    overlay.querySelector(
      ".popup-project-title"
    ).innerHTML = `${project.title}`;
    overlay.querySelector(
      ".popup-project-category"
    ).innerHTML = `${project.category}`;
    overlay.querySelector(".popup-project-goal").innerHTML = `${project.about}`;

    let overlay_github = overlay.querySelector(".popup-project-github");
    if (project.github.startsWith("*")) {
      overlay_github.innerHTML = `${project.github}`;
    } else {
      overlay_github.innerHTML = `<a class="button" href="${project.github}" target="_blank">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"
        class="icon-svg">
        <path
          d="M11 1C9.68678 1 8.38642 1.25866 7.17317 1.7612C5.95991 2.26375 4.85752 3.00035 3.92893 3.92893C2.05357 5.8043 1 8.34784 1 11C1 15.42 3.87 19.17 7.84 20.5C8.34 20.58 8.5 20.27 8.5 20V18.31C5.73 18.91 5.14 16.97 5.14 16.97C4.68 15.81 4.03 15.5 4.03 15.5C3.12 14.88 4.1 14.9 4.1 14.9C5.1 14.97 5.63 15.93 5.63 15.93C6.5 17.45 7.97 17 8.54 16.76C8.63 16.11 8.89 15.67 9.17 15.42C6.95 15.17 4.62 14.31 4.62 10.5C4.62 9.39 5 8.5 5.65 7.79C5.55 7.54 5.2 6.5 5.75 5.15C5.75 5.15 6.59 4.88 8.5 6.17C9.29 5.95 10.15 5.84 11 5.84C11.85 5.84 12.71 5.95 13.5 6.17C15.41 4.88 16.25 5.15 16.25 5.15C16.8 6.5 16.45 7.54 16.35 7.79C17 8.5 17.38 9.39 17.38 10.5C17.38 14.32 15.04 15.16 12.81 15.41C13.17 15.72 13.5 16.33 13.5 17.26V20C13.5 20.27 13.66 20.59 14.17 20.5C18.14 19.16 21 15.42 21 11C21 9.68678 20.7413 8.38642 20.2388 7.17317C19.7362 5.95991 18.9997 4.85752 18.0711 3.92893C17.1425 3.00035 16.0401 2.26375 14.8268 1.7612C13.6136 1.25866 12.3132 1 11 1Z"
          fill="currentColor" />
      </svg>
    </a>`;
    }

    let overlay_tools = overlay.querySelector(".popup-skill-tools");
    let tools_list = "";
    project.tools.forEach((tool) => {
      let tool_content = `<div class="popup-skill-tool">${tool}</div>`;

      tools_list += tool_content;
    });

    overlay_tools.innerHTML = `${tools_list}`;

    let overlay_images = overlay.querySelector(".popup-images");
    let images_list = "";
    project.images.forEach((image) => {
      let image_content = `<div class="popup-image">

      <a href="${image}" target="_blank">
        <img width="200" height="200" src="${image}" alt="${project.title}" />
      </a>

    </div>`;

      images_list += image_content;
    });

    overlay_images.innerHTML = `${images_list}`;

    document.getElementById("project-popup").style.width = "100%";
  }
}

function closeProject() {
  document.querySelector(".project-popup-overlay-content-2").scrollTop = 0;
  document.getElementById("project-popup").style.width = "0%";
}

function showMobileNavigation() {
  document.getElementById("mobile-navigation").style.height = "100%";
}

function closeMobileNavigation() {
  document.getElementById("mobile-navigation").style.height = "0%";
}

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

    projects.projects.forEach((project, index) => {
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

        <button name="button-project" value="${index}" class="project-button project-text-4"
          >
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

  document.querySelectorAll(".project-button").forEach((button) => {
    button.addEventListener("click", () => showProject(button.value), false);
  });

  document
    .querySelector(".project-popup-close")
    .addEventListener("click", closeProject, false);

  document
    .querySelector(".hamburger-menu")
    .addEventListener("click", showMobileNavigation, false);

  document
    .querySelector(".hamburger-menu-close")
    .addEventListener("click", closeMobileNavigation, false);

  document
    .querySelectorAll(".mobile-navigation-overlay-content a")
    .forEach((link) => {
      link.addEventListener("click", closeMobileNavigation, false);
    });
}

window.onload = init;
