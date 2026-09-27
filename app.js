document.addEventListener('DOMContentLoaded', () => {

  // Concept Theme Switching Logic (Bug vs Build Success Concept)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const conceptIcon = document.getElementById('concept-icon');
  const storedTheme = localStorage.getItem('theme') || 'black';

  function updateConceptIcon(theme) {
    if (!conceptIcon) return;
    if (theme === 'red') {
      // Red Theme: Compilation / Build Success Symbol
      conceptIcon.className = 'fa-solid fa-circle-check';
      if (themeToggleBtn) themeToggleBtn.title = 'BUILD SUCCESS (Concept Đỏ)';
    } else {
      // Black Theme: Code Bug Symbol
      conceptIcon.className = 'fa-solid fa-bug';
      if (themeToggleBtn) themeToggleBtn.title = 'DEBUG / BUG (Concept Đen & Xanh)';
    }
  }
  
  document.documentElement.setAttribute('data-theme', storedTheme);
  updateConceptIcon(storedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = (currentTheme === 'red') ? 'black' : 'red';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateConceptIcon(newTheme);
    });
  }

  // Mobile Menu Toggle
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

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

  // DYNAMIC TYPING EFFECT FOR HERO TAGLINE
  const typedTextSpan = document.getElementById('typed-text');
  const textArray = [
    "Software Engineering Student",
    "Java Backend Developer",
    "Spring Boot & RESTful API Engineer",
    "OOP & Database Architecture Enthusiast"
  ];
  let textArrayIndex = 0;
  let charIndex = 0;
  let isTyping = true;

  function typeEffect() {
    if (!typedTextSpan) return;

    const currentText = textArray[textArrayIndex];
    if (isTyping) {
      if (charIndex < currentText.length) {
        typedTextSpan.textContent += currentText.charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 70);
      } else {
        isTyping = false;
        setTimeout(typeEffect, 2000);
      }
    } else {
      if (charIndex > 0) {
        typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(typeEffect, 35);
      } else {
        isTyping = true;
        textArrayIndex = (textArrayIndex + 1) % textArray.length;
        setTimeout(typeEffect, 400);
      }
    }
  }

  setTimeout(typeEffect, 500);

  // SCROLL REVEAL ANIMATIONS WITH INTERSECTION OBSERVER
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // DYNAMIC FLOATING CODE COMMANDS BACKGROUND CANVAS
  const canvas = document.getElementById('hero-particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let codeParticles = [];
    let width = canvas.width = canvas.parentElement.clientWidth;
    let height = canvas.height = canvas.parentElement.clientHeight;

    window.addEventListener('resize', () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    });

    const normalCodeSnippets = [
      "SELECT * FROM",
      "ALTER TABLE",
      "public class",
      "HashMap<K, V>",
      "INSERT INTO",
      "UPDATE users SET",
      "ArrayList<String>",
      "CREATE TABLE",
      "System.out.println()",
      "WHERE status = 'ACTIVE'",
      "INNER JOIN ON",
      "GROUP BY id",
      "ORDER BY created_at DESC",
      "try { ... } catch",
      "public static void main",
      "ResponseEntity.ok()",
      "@SpringBootApplication",
      "@RestController",
      "@Autowired",
      "@Override",
      "PRIMARY KEY (id)",
      "FOREIGN KEY"
    ];

    const errorCodeSnippets = [
      "java.lang.NullPointerException",
      "ArrayIndexOutOfBoundsException",
      "Cannot find symbol: variable",
      "java.lang.ClassNotFoundException",
      "Syntax error: delete token",
      "java.sql.SQLException: Connection refused",
      "Compilation failed: 1 error",
      "java.lang.StackOverflowError",
      "Incompatible types: String to int",
      "java.lang.IllegalArgumentException",
      "Unresolved compilation problem",
      "java.lang.ClassCastException",
      "java.io.FileNotFoundException",
      "HTTP 500 Internal Server Error",
      "OutOfMemoryError: Java heap space",
      "Exception in thread \"main\""
    ];

    class CodeParticle {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        const isRedTheme = document.documentElement.getAttribute('data-theme') === 'red';
        const currentPool = isRedTheme ? errorCodeSnippets : normalCodeSnippets;

        this.text = currentPool[Math.floor(Math.random() * currentPool.length)];
        this.x = Math.random() * Math.max(10, width - 180);
        this.y = initial ? Math.random() * height : height + Math.random() * 40;
        this.speedY = -(Math.random() * 0.6 + 0.4);
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.fontSize = Math.floor(Math.random() * 4) + 12; // 12px - 15px
        this.maxOpacity = Math.random() * 0.45 + 0.2; // 0.2 - 0.65
        this.opacity = 0;
        this.fadeIn = true;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;

        // Fade in when entering from bottom
        if (this.fadeIn) {
          this.opacity += 0.008;
          if (this.opacity >= this.maxOpacity) {
            this.opacity = this.maxOpacity;
            this.fadeIn = false;
          }
        }

        // Fade out near top
        if (this.y < height * 0.25) {
          this.opacity -= 0.006;
        }

        if (this.y < -30 || this.opacity <= 0) {
          this.reset(false);
        }
      }

      draw() {
        if (this.opacity <= 0) return;
        const isRedTheme = document.documentElement.getAttribute('data-theme') === 'red';
        const colorRGB = isRedTheme ? '255, 46, 77' : '29, 185, 84';

        ctx.font = `${this.fontSize}px 'Fira Code', 'Consolas', monospace`;
        ctx.fillStyle = `rgba(${colorRGB}, ${this.opacity})`;
        ctx.shadowColor = `rgba(${colorRGB}, 0.45)`;
        ctx.shadowBlur = 6;
        ctx.fillText(this.text, this.x, this.y);
        ctx.shadowBlur = 0; // reset blur
      }
    }

    const codeCount = Math.min(Math.floor(width / 60), 22);
    for (let i = 0; i < codeCount; i++) {
      codeParticles.push(new CodeParticle());
    }

    function animateFloatingCode() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < codeParticles.length; i++) {
        codeParticles[i].update();
        codeParticles[i].draw();
      }

      requestAnimationFrame(animateFloatingCode);
    }

    animateFloatingCode();
  }

  // Project Category Filter Logic
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
          setTimeout(() => card.classList.add('visible'), 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Project Modal Data & Logic
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
            li.innerHTML = `${parts[0]}: <a href="http${parts[1]}" target="_blank" style="color: var(--spotify-green); font-weight: 700; text-decoration: underline;">http${parts[1]}</a>`;
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

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
      closeModal();
    }
  });

  // LIGHTWEIGHT MOUSE CURSOR FLOATING CODE TRAIL EFFECT
  const normalTrailSymbols = [
    "{ }", "</>", "SELECT", "HashMap", "String", ";", "01",
    "System", "[]", "=>", "&&", "!=", "SQL", "@Autowired", "val", "void", "OOP"
  ];

  const errorTrailSymbols = [
    "NullPointer", "Error!", "Exception", "Fail", "HTTP 500", "SyntaxErr",
    "Bug!", "StackOverflow", "ClassCast", "Crash!", "CompilationErr", "NPE"
  ];

  let lastSpawnTime = 0;
  window.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastSpawnTime < 60) return;
    lastSpawnTime = now;

    const isRedTheme = document.documentElement.getAttribute('data-theme') === 'red';
    const activeSymbols = isRedTheme ? errorTrailSymbols : normalTrailSymbols;

    const particle = document.createElement('span');
    particle.className = 'cursor-code-particle';
    particle.textContent = activeSymbols[Math.floor(Math.random() * activeSymbols.length)];
    
    // Position at mouse coordinates
    particle.style.left = `${e.clientX}px`;
    particle.style.top = `${e.clientY}px`;
    
    // Slight random drift offsets
    const offsetX = (Math.random() - 0.5) * 30;
    const offsetY = - (Math.random() * 25 + 15);
    particle.style.setProperty('--offset-x', `${offsetX}px`);
    particle.style.setProperty('--offset-y', `${offsetY}px`);

    document.body.appendChild(particle);

    // Self-remove after animation completes
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, 700);
  });

});
