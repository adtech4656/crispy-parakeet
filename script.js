// Import GSAP and ScrollTrigger
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// GSAP Configuration
gsap.registerPlugin(ScrollTrigger)

// Initialize animations on page load
document.addEventListener("DOMContentLoaded", () => {
  initializeAnimations()
  initializeScrollAnimations()
  setupFormHandler()
})

// Initialize basic GSAP animations
function initializeAnimations() {
  // Animate hero title
  gsap.from(".hero-title", {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power3.out",
  })

  // Animate hero subtitle
  gsap.from(".hero-subtitle", {
    duration: 1,
    y: 30,
    opacity: 0,
    delay: 0.2,
    ease: "power3.out",
  })

  // Animate buttons
  gsap.from(".btn-primary", {
    duration: 1,
    y: 30,
    opacity: 0,
    delay: 0.4,
    ease: "power3.out",
  })

  // Navbar animation
  gsap.from(".navbar-main", {
    duration: 0.8,
    y: -50,
    opacity: 0,
    ease: "power3.out",
  })
}

// ScrollTrigger animations
function initializeScrollAnimations() {
  // Service cards animation
  gsap.utils.toArray(".service-content").forEach((element) => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
      duration: 0.8,
      x: 50,
      opacity: 0,
      ease: "power3.out",
    })
  })

  // Service images animation
  gsap.utils.toArray(".service-image").forEach((element) => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
      duration: 0.8,
      x: -50,
      opacity: 0,
      ease: "power3.out",
    })
  })

  // Promise cards stagger animation
  gsap.from(".promise-card", {
    scrollTrigger: {
      trigger: ".promise-section",
      start: "top 70%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
    duration: 0.6,
    y: 30,
    opacity: 0,
    stagger: 0.2,
    ease: "power3.out",
  })

  // Room cards animation
  gsap.utils.toArray(".room-card").forEach((element) => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
      duration: 0.8,
      y: 40,
      opacity: 0,
      ease: "power3.out",
    })
  })

  // Spirit section cards
  gsap.from(".spirit-card", {
    scrollTrigger: {
      trigger: ".spirit-section",
      start: "top 70%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
    duration: 0.6,
    y: 30,
    opacity: 0,
    stagger: 0.15,
    ease: "power3.out",
  })

  // Contact section animation
  gsap.from(".contact-form", {
    scrollTrigger: {
      trigger: ".contact-section",
      start: "top 75%",
      end: "bottom 25%",
      toggleActions: "play none none reverse",
    },
    duration: 0.8,
    x: -30,
    opacity: 0,
    ease: "power3.out",
  })

  gsap.from(".contact-info", {
    scrollTrigger: {
      trigger: ".contact-section",
      start: "top 75%",
      end: "bottom 25%",
      toggleActions: "play none none reverse",
    },
    duration: 0.8,
    x: 30,
    opacity: 0,
    ease: "power3.out",
  })

  // Parallax effect for images
  gsap.utils.toArray(".service-image-wrapper").forEach((element) => {
    gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        markers: false,
      },
      y: 50,
      ease: "none",
    })
  })
}

// Form submission handler
function setupFormHandler() {
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Animate form submission
      gsap.to(".btn-success", {
        duration: 0.3,
        scale: 0.95,
        ease: "power2.out",
      })

      // Reset form with animation
      gsap.to(this, {
        duration: 0.5,
        opacity: 0,
        y: 20,
        onComplete: () => {
          this.reset()
          gsap.to(this, {
            duration: 0.5,
            opacity: 1,
            y: 0,
          })
        },
      })

      // Show success message
      const successMsg = document.createElement("div")
      successMsg.className = "alert alert-success mt-3"
      successMsg.textContent = "Merci! Votre message a été envoyé avec succès."
      this.appendChild(successMsg)

      gsap.from(successMsg, {
        duration: 0.5,
        opacity: 0,
        y: 20,
      })

      // Remove success message after 5 seconds
      setTimeout(() => {
        gsap.to(successMsg, {
          duration: 0.3,
          opacity: 0,
          onComplete: () => successMsg.remove(),
        })
      }, 5000)
    })
  }
}

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar-main")
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)"
  } else {
    navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.05)"
  }
})

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href")
    if (href !== "#" && document.querySelector(href)) {
      e.preventDefault()
      const target = document.querySelector(href)
      gsap.to(window, {
        duration: 0.8,
        scrollTo: {
          y: target,
          autoKill: false,
        },
        ease: "power3.inOut",
      })
    }
  })
})

// Lazy load images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        if (img.dataset.src) {
          img.src = img.dataset.src
          img.classList.add("loaded")
        }
        observer.unobserve(img)
      }
    })
  })

  document.querySelectorAll("img[data-src]").forEach((img) => imageObserver.observe(img))
}
        // Animate testimonial cards on scroll
        gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
                opacity: 0,
                x: i % 2 === 0 ? -50 : 50,
                duration: 0.8,
            });
        });
