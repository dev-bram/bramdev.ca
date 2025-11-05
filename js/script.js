"use strict";

function scrollAnimations() {
  let userHasScrolled = false;
  const elementsToAnimate = document.querySelectorAll(".hidden");

  function checkIfElementIsVisible() {
    elementsToAnimate.forEach((element) => {
      if (element.classList.contains("show")) {
        return;
      }

      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const isVisible = rect.top < windowHeight && rect.bottom > 0;

      if (isVisible) {
        const delay = element.dataset.delay || 0;
        setTimeout(() => {
          element.classList.add("show");
        }, delay);
      }
    });
  }

  window.addEventListener('scroll', () => {
    if (!userHasScrolled) {
      userHasScrolled = true;
    }
    checkIfElementIsVisible();
  });
}

function initCarousel() {
  const carouselTracks = document.querySelectorAll(".carousel-track");
  if (!carouselTracks.length) return;

  carouselTracks.forEach((carouselTrack) => {
    const logoItems = Array.from(carouselTrack.children);
    if (logoItems.length === 0) return;

    logoItems.forEach((item) => {
      const clone = item.cloneNode(true);
      carouselTrack.appendChild(clone);
    });

    carouselTrack.style.width = `${
      logoItems.length * 2 * 200 + logoItems.length * 2 * 32
    }px`;

    const totalItems = logoItems.length;
    const baseDuration = 50;
    const durationPerItem = 0.5;
    const scrollDuration = baseDuration + totalItems * durationPerItem;
    carouselTrack.style.setProperty("--scroll-duration", `${scrollDuration}s`);
  });
}

function initAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    if (!question) return;

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
        }
      });

      if (isActive) {
        item.classList.remove("active");
      } else {
        item.classList.add("active");
      }
    });
  });
}

function init() {
  scrollAnimations();
  initCarousel();
  initAccordion();
}

document.addEventListener("DOMContentLoaded", init);