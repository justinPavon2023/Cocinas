document.addEventListener('DOMContentLoaded', function() {
  // Preloader
  setTimeout(function() {
    document.querySelector('.preloader').style.opacity = '0';
    document.querySelector('.preloader').style.visibility = 'hidden';
    document.querySelector('.scene-container').style.opacity = '1';
    document.body.classList.remove('is-loading');
    document.body.classList.add('loaded');
  }, 1500);

  // Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav ul');
  
  menuToggle.addEventListener('click', function() {
    nav.classList.toggle('active');
    menuToggle.innerHTML = nav.classList.contains('active') ? 
      '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
  });

  // Scroll Header Effect
  window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Back to Top Button
  const backToTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTop.classList.add('active');
    } else {
      backToTop.classList.remove('active');
    }
  });

  // Tabs
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      this.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });

  // Animate on Scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll('[data-animate], [data-animate-section]');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.classList.add('animated');
        
        // Animate progress bars
        if (element.classList.contains('waste-fill')) {
          const fillPercentage = element.getAttribute('data-fill');
          element.style.width = fillPercentage;
        }
        
        if (element.classList.contains('compliance-fill')) {
          const fillPercentage = element.parentElement.style.getPropertyValue('--compliance');
          element.style.transform = `rotate(${parseInt(fillPercentage) * 3.6}deg)`;
        }
        
        if (element.classList.contains('time-fill')) {
          const fillTime = element.parentElement.style.getPropertyValue('--time');
          element.style.width = `${(parseFloat(fillTime) / 30.5) * 100}%`;
        }
      }
    });
    
    // Animate counters
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = target / speed;
      
      if (count < target && counter.parentElement.getBoundingClientRect().top < window.innerHeight - 100) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(animateOnScroll, 1);
      } else if (count >= target) {
        counter.innerText = target + '+';
      }
    });
  }

  // Initialize animations on load
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);

  // Form Validation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      
      if (name === '' || email === '' || message === '') {
        alert('Por favor complete todos los campos requeridos');
        return;
      }
      
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Por favor ingrese un email válido');
        return;
      }
      
      // Simulate form submission
      alert('Gracias por su mensaje. Nos pondremos en contacto pronto.');
      contactForm.reset();
    });
  }

  // 3D Effects with Vanilla Tilt
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.card-3d'), {
      max: 15,
      speed: 400,
      glare: true,
      'max-glare': 0.2,
      perspective: 1000
    });
  }

  // Image Hover 3D Effect
  document.querySelectorAll('.img-3d').forEach(img => {
    img.addEventListener('mousemove', function(e) {
      const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
      this.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) translateZ(20px)`;
    });
    
    img.addEventListener('mouseleave', function() {
      this.style.transform = 'rotateY(0) rotateX(0) translateZ(0)';
    });
  });

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Dark/Light Mode Toggle
  const themeToggle = document.createElement('div');
  themeToggle.className = 'theme-toggle';
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  document.body.appendChild(themeToggle);
  
  // Check for saved theme preference or use system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
  
  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem('theme', 'dark');
    } else {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem('theme', 'light');
    }
  });


  setTimeout(() => {
   
    document.querySelectorAll('.waste-fill').forEach(bar => {
      const fillPercentage = bar.getAttribute('data-fill');
      bar.style.width = fillPercentage;
    });
    
    document.querySelectorAll('.compliance-fill').forEach(fill => {
      const fillPercentage = fill.parentElement.style.getPropertyValue('--compliance');
      fill.style.transform = `rotate(${parseInt(fillPercentage) * 3.6}deg)`;
    });
    
    document.querySelectorAll('.time-fill').forEach(fill => {
      const fillTime = fill.parentElement.style.getPropertyValue('--time');
      fill.style.width = `${(parseFloat(fillTime) / 30.5) * 100}%`;
    });
  }, 1500);
});

document.addEventListener('DOMContentLoaded', function() {
  
  gsap.registerPlugin(ScrollTrigger);
  
  
  gsap.utils.toArray('[data-animate]').forEach(element => {
    const delay = element.getAttribute('data-delay') || 0;
    const animation = element.getAttribute('data-animate');
    
    let fromVars = { opacity: 0 };
    
    switch(animation) {
      case 'fadeInUp':
        fromVars.y = 50;
        break;
      case 'fadeInDown':
        fromVars.y = -50;
        break;
      case 'fadeInLeft':
        fromVars.x = -50;
        break;
      case 'fadeInRight':
        fromVars.x = 50;
        break;
    }
    
    gsap.from(element, {
      ...fromVars,
      duration: 0.8,
      delay: parseFloat(delay),
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      ease: "power2.out"
    });
  });
  
  // Animate sections with data-animate-section attribute
  gsap.utils.toArray('[data-animate-section]').forEach(section => {
    gsap.from(section, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        toggleActions: "play none none none"
      },
      ease: "power2.out"
    });
  });
  
  // Animate hero elements
  const heroContent = document.querySelector('.hero-content');
  const heroImage = document.querySelector('.hero-image');
  
  if (heroContent && heroImage) {
    gsap.from(heroContent, {
      opacity: 0,
      x: -50,
      duration: 1,
      delay: 0.5,
      ease: "power2.out"
    });
    
    gsap.from(heroImage, {
      opacity: 0,
      x: 50,
      duration: 1,
      delay: 0.5,
      ease: "power2.out"
    });
  }
  
  // Parallax effect for background
  const parallaxBg = document.querySelector('.parallax-background');
  if (parallaxBg) {
    gsap.to(parallaxBg, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: ".scene-container",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  }
  
  // 3D hover effect for buttons
  document.querySelectorAll('.btn-3d').forEach(button => {
    button.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const angleX = (y - centerY) / 10;
      const angleY = (centerX - x) / 10;
      
      gsap.to(this, {
        rotationX: angleX,
        rotationY: angleY,
        transformPerspective: 1000,
        transformOrigin: "center center",
        ease: "power2.out",
        duration: 0.5
      });
    });
    
    button.addEventListener('mouseleave', function() {
      gsap.to(this, {
        rotationX: 0,
        rotationY: 0,
        ease: "power2.out",
        duration: 0.5
      });
    });
  });
});

