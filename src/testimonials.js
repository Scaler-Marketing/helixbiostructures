import { createSVGGrid } from "./modules/createSVGGrid";
import { getElementHeightInRem } from "./modules/getHeight";

function initTestimonials() {
  // Variables
  const wrapper = document.querySelector('.testimonials-wrapper'),
    sliderContent = wrapper.querySelectorAll(".testimonial-item .testimonial-content"),
    names = wrapper.querySelector('.testimonial-source-wrapper .testimonial-source-list'),
    companies = wrapper.querySelector('.testimonial-company-wrapper .testimonial-source-list'),
    nextButton = document.querySelector(".button.next"),
    prevButton = document.querySelector(".button.prev");
  
  const namesHeight = Number(getElementHeightInRem(names.parentNode).toFixed(2));
  const companiesHeight = Number(getElementHeightInRem(companies.parentNode).toFixed(2)); 

  // console.log(namesHeight, companiesHeight);
  
  let currentIndex = 0;

  sliderContent.forEach((content) => {
    createSVGGrid(content, 10);
  });

  gsap.set(".testimonial-item svg rect", {
    opacity: 0
  });
  gsap.set(".testimonial-item:first-child svg rect", {
    opacity: 1
  });

  // clone last and first item from each name and company
  const allNames = names.querySelectorAll(".testimonial-source"),
    firstName = allNames[0],
    firstNameClone = firstName.cloneNode(true),
    lastName = allNames[allNames.length - 1],
    lastNameClone = lastName.cloneNode(true);
  
  names.insertBefore(lastNameClone, firstName);
  names.append(firstNameClone);
  
  // set styles
  gsap.set(firstNameClone, {
    position: "absolute",
    top: "100%",
    left: 0,
  });
  gsap.set(lastNameClone, {
    position: "absolute",
    bottom: "100%",
    left: 0,
  });

  const allCompanies = companies.querySelectorAll(".testimonial-source"),
    firstCompany = allCompanies[0],
    firstCompanyClone = firstCompany.cloneNode(true),
    lastCompany = allCompanies[allCompanies.length - 1],
    lastCompanyClone = lastCompany.cloneNode(true);
  
  companies.insertBefore(lastCompanyClone, firstCompany);
  companies.append(firstCompanyClone);
  
  // set styles
  gsap.set(firstCompanyClone, {
    position: "absolute",
    top: "100%",
    left: 0,
  });
  gsap.set(lastCompanyClone, {
    position: "absolute",
    bottom: "100%",
    left: 0,
  });

  // Next button click
  nextButton.addEventListener("click", () => {
    let currentSlide = sliderContent[currentIndex];
    if (currentIndex < sliderContent.length - 1) {
      let nextSlide = sliderContent[currentIndex + 1];

      transitionSlides(
        currentSlide,
        nextSlide,
        currentIndex + 1,
        sliderContent.length - 1,
        "next",
        names,
        namesHeight,
        companies,
        companiesHeight
      );

      currentIndex++;
    } else {
      let nextSlide = sliderContent[0];

      transitionSlides(
        currentSlide,
        nextSlide,
        0,
        sliderContent.length - 1,
        'next',
        names,
        namesHeight,
        companies,
        companiesHeight
      );

      currentIndex = 0;
    }
  });

  // Prev button click
  prevButton.addEventListener("click", () => {
    let currentSlide = sliderContent[currentIndex];
    if (currentIndex > 0) {
      let prevSlide = sliderContent[currentIndex - 1];

      transitionSlides(
        currentSlide,
        prevSlide,
        currentIndex - 1,
        sliderContent.length - 1,
        "prev",
        names,
        namesHeight,
        companies,
        companiesHeight
      );

      currentIndex--;
    } else {
      let prevSlide = sliderContent[sliderContent.length - 1];

      transitionSlides(
        currentSlide,
        prevSlide,
        sliderContent.length - 1,
        sliderContent.length - 1,
        "prev",
        names,
        namesHeight,
        companies,
        companiesHeight
      );

      currentIndex = sliderContent.length - 1;
    }
  });
}

function transitionSlides(current, next, index, total, direction, names, namesHeight, companies, companiesHeight) {
  const currentSquares = current.parentNode.querySelectorAll('rect'),
    nextSquares = next.parentNode.querySelectorAll('rect');
    
  // next slide
  gsap.fromTo(
    nextSquares,
    {
      opacity: 0
    },
    {
      opacity: 1,
      duration: 0.01,
      overwrite: true,
      stagger: {
        each: 0.01,
        // grid: "auto",
        // from: "center"
        from: "random"
      }
      // ease: "expo.out",
    }
  );

  // current slide
  gsap.fromTo(
    currentSquares,
    {
      opacity: 1,
    },
    {
      opacity: 0,
      duration: 0.01,
      overwrite: true,
      stagger: {
        each: 0.01,
        // grid: "auto",
        // from: "center"
        from: "random",
      },
      // ease: "expo.out",
    }
  );

  // names list
  const yNames = calculateYPosition(index, total, direction, namesHeight);
  // console.log(index, total, direction, yNames);
  gsap.to(names, {
    y: `${yNames}rem`,
    duration: 0.5,
    ease: "expo.out",
  });

  // companies list
  const yCompanies = calculateYPosition(index, total, direction, companiesHeight);
  gsap.to(companies, {
    y: `${yCompanies}rem`,
    duration: 0.5,
    ease: "expo.out",
  });
}

function calculateYPosition(index, total, direction, height) {
  if (index === 0 && direction === 'prev') {
    return 0;
  }

  if (index === total && direction === 'next') {
    return (-1 * height) * total;
  }

  const newIndex = direction === 'next' ? index + 1 : index - 1;

  return (index * (-1 * height));
}

document.fonts.ready.then(() => {
  initTestimonials();
});
