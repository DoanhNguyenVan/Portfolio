document.addEventListener('DOMContentLoaded', () => {
  // Theme Switching Logic (Light / Dark Mode)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('theme');
  
  // Set default theme from localStorage or system preference
  if (storedTheme) {
    document.documentElement.setAttribute('data-theme', storedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // Mobile Menu Toggle
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // Close mobile menu when link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });

  // Active Navbar Link on Scroll
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink);

  // Project Filtering Logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Project Modal Data & Logic (English Version)
  const projectData = {
    proj1: {
      title: "Supermarket Management System",
      category: "Backend",
      role: "Backend Developer",
      tech: ["Java", "Spring Boot", "OOP", "SQL Server", "MVC Architecture", "Maven"],
      repoLink: "https://github.com/DoanhNguyenVan/supermarket-management-system",
      repoText: "GitHub Repo",
      repoIcon: "fa-brands fa-github",
      description: "Engineered a supermarket sales and inventory management system focused on user account management, role-based access control, online/offline sales, shift scheduling, and revenue analytics using MVC architecture and SQL Server.",
      features: [
        "User account management & granular role-based permissions (Admin / Cashier / Sales Staff).",
        "Online and offline checkout processing with shift tracking and automated receipt generation.",
        "Revenue analytics reporting by day, week, month, and real-time inventory alerts.",
        "Database schema design & query optimization on Microsoft SQL Server."
      ]
    },
    proj2: {
      title: "Online Confectionery Store",
      category: "Web Java",
      role: "Backend Developer",
      tech: ["Java", "JSP / Servlet", "SQL Server", "MVC Architecture", "HTML/CSS"],
      repoLink: "https://github.com/DoanhNguyenVan/java-servlet-ecommerce",
      repoText: "GitHub Repo",
      repoIcon: "fa-brands fa-github",
      description: "Developed an e-commerce web platform for imported confectionery products with complete catalog management, stock tracking, and order fulfillment. Implemented core backend authentication, session handling, and shopping cart logic with Java Servlets.",
      features: [
        "Product catalog management, stock status tracking, and order status updates.",
        "Core Servlet backend for authentication and role-based access control (Admin / Customer).",
        "Interactive shopping cart, online order checkout, and purchase history tracking.",
        "Implemented pure MVC pattern utilizing core Java Web technologies (JSP / Servlet / JDBC)."
      ]
    },
    proj3: {
      title: "\"Chenh Venh\" Social Media Campaign",
      category: "Social & Communication / Leadership",
      role: "Project Leader",
      tech: ["Project Management", "Leadership", "Video Content Strategy", "Event Organization", "Social Media Marketing"],
      repoLink: "https://www.facebook.com/share/18UdpM8dXD/",
      repoText: "Project Link",
      repoIcon: "fa-brands fa-facebook",
      description: "An integrated Online & Offline social communication project (executed Jan 27, 2026 – Mar 17, 2026) dedicated to preserving and celebrating the cultural heritage of Thach Xa bamboo dragonfly craft village.",
      features: [
        "Online: Directed the production of social video series highlighting village history, artisans, and cultural aesthetics.",
        "Offline: Scripted, budgeted, and coordinated personnel to execute hands-on bamboo dragonfly workshops for youth.",
        "Format: Seamlessly integrated social media marketing with live interactive cultural events.",
        "Project Link: https://www.facebook.com/share/18UdpM8dXD/"
      ]
    }
  };

  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalRole = document.getElementById('modal-role');
  const modalTech = document.getElementById('modal-tech');
  const modalTechLabel = document.getElementById('modal-tech-label');
  const modalDescription = document.getElementById('modal-description');
  const modalFeatures = document.getElementById('modal-features');
  const modalRepoLink = document.getElementById('modal-repo-link');
  const modalRepoText = document.getElementById('modal-repo-text');
  const modalRepoIcon = document.getElementById('modal-repo-icon');

  const detailButtons = document.querySelectorAll('.view-detail-btn');

  detailButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      const data = projectData[projectId];

      if (data) {
        modalTitle.textContent = data.title;
        modalCategory.textContent = data.category;
        modalRole.textContent = data.role;
        modalTech.textContent = data.tech.join(', ');

        if (modalTechLabel) {
          modalTechLabel.textContent = projectId === 'proj3' ? 'Skills' : 'Technologies Used';
        }

        modalDescription.textContent = data.description;

        if (modalRepoLink) {
          modalRepoLink.href = data.repoLink;
          if (modalRepoText) modalRepoText.textContent = data.repoText;
          if (modalRepoIcon) modalRepoIcon.className = data.repoIcon;
        }

        modalFeatures.innerHTML = '';
        data.features.forEach(feat => {
          const li = document.createElement('li');
          if (feat.includes('http')) {
            const parts = feat.split(': http');
            li.innerHTML = `${parts[0]}: <a href="http${parts[1]}" target="_blank" style="color: var(--primary-color); font-weight: 600; text-decoration: underline;">http${parts[1]}</a>`;
          } else {
            li.textContent = feat;
          }
          modalFeatures.appendChild(li);
        });

        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close Modal Handler
  function closeModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeModal();
      }
    });
  }

  // Handle ESC Key to Close Modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
      closeModal();
    }
  });

  // Contact Form Feedback
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for reaching out! Doanh Nguyen Van will get back to you as soon as possible.');
      contactForm.reset();
    });
  }
});
