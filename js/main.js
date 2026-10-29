/* The Online Marketing — shared site behaviour (home + article pages) */
(function () {
  "use strict";
  document.documentElement.classList.add("js");

  /* Auto year in footer */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* Mobile menu */
  var btn = document.getElementById("menuBtn");
  var nav = document.getElementById("navlinks");
  if (btn && nav) {
    var setMenu = function (open) {
      nav.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", String(open));
    };
    btn.addEventListener("click", function () {
      setMenu(!nav.classList.contains("open"));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("click", function (e) {
      if (nav.classList.contains("open") && !nav.contains(e.target) && !btn.contains(e.target)) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
  }

  /* External links: open in a new tab; if popups are blocked (e.g. sandboxed
     previews / strict browsers), fall back to navigating this tab instead. */
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[target="_blank"]');
    if (!a || !a.href) return;
    e.preventDefault();
    var w = window.open(a.href, "_blank");
    if (!w) window.location.href = a.href;
  });

  /* Scroll-reveal (individual .reveal + auto-staggered .stagger containers) */
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
    document.querySelectorAll(".stagger").forEach(function (container) {
      var base = parseInt(container.getAttribute("data-d") || "0", 10);
      Array.prototype.forEach.call(container.children, function (child, i) {
        child.classList.add("reveal");
        child.style.setProperty("--d", base + i * 70 + "ms");
        io.observe(child);
      });
    });

    /* Animated hero chart (home page only) */
    var chart = document.querySelector(".chart");
    if (chart) {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            chart.classList.add("in");
            cio.unobserve(chart);
          }
        });
      }, { threshold: 0.3 });
      cio.observe(chart);
    }

    /* Nav scroll-spy (same-page anchors only) */
    var links = Array.prototype.filter.call(
      document.querySelectorAll(".navlinks a[href^='#']"),
      function (a) { return !a.classList.contains("panel-cta"); }
    );
    var map = new Map();
    links.forEach(function (a) {
      var sec = document.querySelector(a.getAttribute("href"));
      if (sec) map.set(sec, a);
    });
    if (map.size) {
      var sio = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            links.forEach(function (a) { a.classList.remove("active"); });
            var link = map.get(entry.target);
            if (link) link.classList.add("active");
          }
        });
      }, { rootMargin: "-40% 0px -55% 0px" });
      map.forEach(function (a, sec) { sio.observe(sec); });
    }
  } else {
    /* No-JS / reduced-motion fallback: show everything */
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
    var c = document.querySelector(".chart");
    if (c) c.classList.add("in");
  }
})();

/* ---------- Premium V2 behaviours ---------- */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Scroll progress bar + nav shadow */
  var prog = document.querySelector(".progress");
  var nav = document.querySelector(".nav");
  function onScroll() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    if (prog) prog.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
    if (nav) nav.classList.toggle("scrolled", h.scrollTop > 10);
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Cursor spotlight on dark tiles */
  document.querySelectorAll(".visual, .cta").forEach(function (el) {
    el.addEventListener("mousemove", function (e) {
      var r = el.getBoundingClientRect();
      el.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100) + "%");
      el.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100) + "%");
    });
  });

  /* Portrait drop-in detection */
  document.querySelectorAll(".portrait img").forEach(function (im) {
    var done = function () { im.parentNode.classList.add("has-photo"); };
    if (im.complete && im.naturalWidth) done();
    else im.addEventListener("load", done);
  });

  /* Count-up animation for metrics & stat panels */
  if ("IntersectionObserver" in window && !reduce) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        cio.unobserve(en.target);
        var el = en.target;
        var finalText = el.textContent;
        var m = finalText.match(/^([^\d]*?)([\d,]+(?:\.\d+)?)([^\d]*)$/);
        if (!m) return;
        var pre = m[1], numStr = m[2], post = m[3];
        var target = parseFloat(numStr.replace(/,/g, ""));
        var useComma = numStr.indexOf(",") > -1;
        var dur = 1300, t0 = null;
        function frame(t) {
          if (!t0) t0 = t;
          var p = Math.min((t - t0) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          var v = Math.round(target * eased);
          el.textContent = pre + (useComma ? v.toLocaleString("en-IN") : v) + post;
          if (p < 1) requestAnimationFrame(frame);
          else el.textContent = finalText;
        }
        requestAnimationFrame(frame);
      });
    }, { threshold: 0.5 });
    document.querySelectorAll(".metric strong, .stat strong").forEach(function (el) { cio.observe(el); });
  }
})();

/* ---------- Premium V4 behaviours ---------- */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  /* Hero visual parallax */
  var vw = document.querySelector(".visual-wrap");
  if (vw) {
    var ticking = false;
    var par = function () {
      var y = window.scrollY || document.documentElement.scrollTop;
      vw.style.transform = "translateY(" + Math.min(y * 0.06, 60) + "px)";
      ticking = false;
    };
    document.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(par); }
    }, { passive: true });
  }

  /* Magnetic buttons */
  document.querySelectorAll(".btn").forEach(function (b) {
    b.addEventListener("mousemove", function (e) {
      var r = b.getBoundingClientRect();
      var dx = (e.clientX - r.left - r.width / 2) / r.width;
      var dy = (e.clientY - r.top - r.height / 2) / r.height;
      b.style.transform = "translate(" + dx * 6 + "px," + (dy * 4 - 1) + "px)";
    });
    b.addEventListener("mouseleave", function () { b.style.transform = ""; });
  });
})();
