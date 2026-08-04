// Mobile nav — load on every page
(function() {
  var nav = document.querySelector('.navbar');
  if (!nav) return;

  // Create hamburger button if not exists
  if (!nav.querySelector('.nav-toggle')) {
    var toggle = document.createElement('button');
    toggle.className = 'nav-toggle';
    toggle.setAttribute('aria-label', 'Toggle navigation');
    toggle.innerHTML = '<span class="hamburger"></span>';
    var navLinks = nav.querySelector('.nav-links');
    if (navLinks) nav.insertBefore(toggle, navLinks);
  }

  // Create backdrop
  var existing = document.querySelector('.nav-backdrop');
  var backdrop = existing || document.createElement('div');
  if (!existing) {
    backdrop.className = 'nav-backdrop';
    document.body.appendChild(backdrop);
  }

  var toggleBtn = nav.querySelector('.nav-toggle');
  var links = nav.querySelector('.nav-links');

  function closeMenu() {
    toggleBtn.classList.remove('active');
    links.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }
  function openMenu() {
    toggleBtn.classList.add('active');
    links.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  toggleBtn.addEventListener('click', function() {
    links.classList.contains('open') ? closeMenu() : openMenu();
  });
  backdrop.addEventListener('click', closeMenu);
  links.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', closeMenu);
  });
})();
