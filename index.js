("use strict");
let skills;
let projects;

async function fetchJsons() {
  await fetch("./skills.json")
    .then((response) => response.json())
    .then((json) => (skills = json));

  await fetch("./projects.json")
    .then((response) => response.json())
    .then((json) => (projects = json));
}

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
  if (projects.projects.length > 0) {
    let project = projects.projects[value];

    let overlay = document.querySelector(".project-popup-overlay");
    overlay.querySelector(
      ".popup-project-title"
    ).innerHTML = `${project.title}`;
    overlay.querySelector(
      ".popup-project-category"
    ).innerHTML = `${project.category}`;
    overlay.querySelector(".popup-project-goal").innerHTML = `${project.about}`;

    let overlay_links = overlay.querySelector(".popup-project-links");

    if (!project.links_or_not.has_links) {
      overlay_links.innerHTML = `${project.links_or_not.reason}`;
    } else {
      let links_list = "";
      project.links.forEach((link) => {
        let link_content = `<a class="button" href="${link.url}" target="_blank">
                    <div class="project-link-button project-link-button-text-1">${link.title}</div>
                  </a>`;

        links_list += link_content;
      });

      overlay_links.innerHTML = `${links_list}`;
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
        ${project.about_teaser}
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

async function init() {
  await fetchJsons();

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
