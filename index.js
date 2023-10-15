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

function init() {
  const hiddenElements = document.querySelectorAll(".hidden");
  hiddenElements.forEach((el) => observer.observe(el));

  fillSkills();
}

window.onload = init;
