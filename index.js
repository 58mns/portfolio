import skills from "./skills.json" assert { type: "json" };
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
    let innerContent = "";
    skills.skills.forEach((skill) => {
      
      console.log(skill.category);
      skill.tools.forEach((tool) => {

      });

      let content = `<div class="box">
    <div class="image-container">
      <img src="${skill.categ}" alt="${project.alt}" width="150"
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

    let skillsElement = document.querySelector(".skills-container");
    skillsElement.insertAdjacentHTML("afterbegin", innerContent);
    console.log("skills added");
  }
}

function init() {
  const hiddenElements = document.querySelectorAll(".hidden");
  hiddenElements.forEach((el) => observer.observe(el));

  //fillSkills();
}

window.onload = init;
