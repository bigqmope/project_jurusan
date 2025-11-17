// ========== LOADING SCREEN ==========
window.addEventListener('load', function() {
  const loading = document.getElementById('loading');
  if (loading) {
    setTimeout(() => {
      loading.classList.add('hidden');
      setTimeout(() => {
        loading.style.display = 'none';
      }, 500);
    }, 1000);
  }
});

// ========== NAVBAR SCROLL EFFECT ==========
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ========== SEARCH FUNCTIONALITY ==========
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');

if (searchForm && searchInput) {
  searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const value = searchInput.value.trim();
    
    if (value === "") {
      showNotification("Mohon masukkan kata kunci pencarian!", "error");
      return;
    }
    
    // Show success notification
    showNotification(`Mencari: "${value}"`, "info");
    
    // Simulate search (you can implement actual search here)
    setTimeout(() => {
      showNotification(`Pencarian "${value}" selesai!`, "success");
      searchInput.value = '';
    }, 1500);
  });
}

// ========== NOTIFICATION SYSTEM ==========
function showNotification(message, type = 'info') {
  // Remove existing notification
  const existing = document.querySelector('.notification');
  if (existing) {
    existing.remove();
  }
  
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <div class="d-flex align-items-center">
      <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} me-2 fa-lg"></i>
      <span>${message}</span>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.4s ease';
    setTimeout(() => notification.remove(), 400);
  }, 3000);
}

// ========== SCROLL TO TOP BUTTON ==========
const scrollTopBtn = document.getElementById('scrollTopBtn');

if (scrollTopBtn) {
  // Show/hide button based on scroll position
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });

  // Scroll to top on click
  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ========== ANIMATED COUNTER ==========
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

// Trigger counter animation when section is visible
const counterSection = document.querySelector('.counter-section');
if (counterSection) {
  let counterAnimated = false;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counterAnimated) {
        counterAnimated = true;
        
        document.querySelectorAll('.counter-number').forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'));
          animateCounter(counter, target);
        });
        
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  observer.observe(counterSection);
}

// ========== ACTIVE NAV LINK ON SCROLL ==========
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Skip if href is just "#" or if it's a modal/tab trigger
    if (href === '#' || href.length <= 1) {
      return;
    }
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      
      const offsetTop = target.offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ========== IMAGE ERROR HANDLING ==========
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function() {
    // Placeholder image if original fails to load
    this.src = 'https://via.placeholder.com/400x300/667eea/ffffff?text=Image+Not+Available';
    this.alt = 'Image not available';
  });
});

// ========== YEAR AUTO UPDATE ==========
const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// ========== CONSOLE MESSAGE ==========
console.log('%c🎓 Sistem Informasi UNTAN', 'color: #0d6efd; font-size: 24px; font-weight: bold;');
console.log('%cDeveloped with ❤️', 'color: #28a745; font-size: 14px;');

// ========== PERFORMANCE MONITORING ==========
window.addEventListener('load', function() {
  const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
  console.log(`⚡ Page loaded in ${loadTime}ms`);
});