/* footer.js — shared footer link rows for pages/ */
(function () {
  var el = document.getElementById('footerLinks');
  if (!el) return;
  var links = [
    ['../index.html', 'Home'],
    ['packages.html', 'Packages'],
    ['library.html', 'Library'],
    ['news.html', 'News'],
    ['about.html', 'About'],
    ['contact.html', 'Contact'],
  ];
  el.innerHTML = links.map(function (l) {
    return '<a href="' + l[0] + '">' + l[1] + '</a>';
  }).join('');
})();
