(function () {
  "use strict";
  var site = window.SITE || { profile: {}, videos: [] };
  var profile = site.profile || {};
  var $ = function (id) { return document.getElementById(id); };

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  // Nhận dạng nền tảng từ link
  function parse(video) {
    var url = video.url || "";
    var m;
    var out = { kind: "demo", vertical: !!video.vertical, thumb: video.thumb || "" };
    if ((m = url.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{11})/))) {
      out.kind = "youtube";
      out.id = m[1];
      if (/\/shorts\//.test(url)) out.vertical = true;
      if (!out.thumb) out.thumb = "https://i.ytimg.com/vi/" + m[1] + "/hqdefault.jpg";
    } else if ((m = url.match(/tiktok\.com\/.*\/video\/(\d+)/))) {
      out.kind = "tiktok";
      out.id = m[1];
      out.vertical = true;
    } else if (/\.(mp4|webm|mov)(\?|$)/i.test(url)) {
      out.kind = "file";
      out.src = url;
    } else if (url) {
      out.kind = "link";
    }
    return out;
  }

  var videos = (site.videos || []).map(function (v, i) {
    var p = parse(v);
    return Object.assign({ index: i }, v, p);
  });

  // Ảnh bìa tạm khi chưa có ảnh thật
  function placeholder(i) {
    var hue = (i * 47 + 12) % 360;
    return "linear-gradient(135deg, hsl(" + hue + " 70% 42%), hsl(" + ((hue + 60) % 360) + " 60% 16%))";
  }

  function card(v) {
    var b = el("button", "card" + (v.vertical ? " tall" : ""));
    b.type = "button";
    if (v.thumb) {
      var img = el("img", "poster");
      img.src = v.thumb;
      img.alt = "";
      img.loading = "lazy";
      img.onerror = function () { img.remove(); b.style.background = placeholder(v.index); };
      b.appendChild(img);
    } else {
      b.style.background = placeholder(v.index);
    }
    b.appendChild(el("span", "shade"));
    if (v.duration) b.appendChild(el("span", "dur", v.duration));
    b.appendChild(el("span", "play"));
    var info = el("span", "info");
    if (v.category) info.appendChild(el("span", "cat", v.category));
    info.appendChild(el("span", "title", v.title || "Chưa có tiêu đề"));
    b.appendChild(info);
    b.setAttribute("aria-label", "Phát video: " + (v.title || ""));
    b.addEventListener("click", function () { open(v); });
    return b;
  }

  // Trình phát
  var dialog = $("player");
  var frame = $("player-frame");

  function open(v) {
    if (v.kind === "link") { window.open(v.url, "_blank", "noopener"); return; }
    $("player-title").textContent = v.title || "";
    $("player-desc").textContent = v.description || "";
    frame.className = "frame" + (v.vertical ? " tall" : "");
    frame.textContent = "";
    var node;
    if (v.kind === "youtube" || v.kind === "tiktok") {
      node = el("iframe");
      node.src = v.kind === "youtube"
        ? "https://www.youtube-nocookie.com/embed/" + v.id + "?autoplay=1&rel=0"
        : "https://www.tiktok.com/player/v1/" + v.id + "?autoplay=1";
      node.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
      node.allowFullscreen = true;
      node.title = v.title || "Video";
    } else if (v.kind === "file") {
      node = el("video");
      node.src = v.src;
      node.controls = true;
      node.autoplay = true;
      node.playsInline = true;
    } else {
      node = el("div", "notice", "Đây là video mẫu. Video thật của bạn sẽ phát ở đây.");
    }
    frame.appendChild(node);
    dialog.showModal();
  }

  dialog.addEventListener("close", function () { frame.textContent = ""; });
  dialog.addEventListener("click", function (e) { if (e.target === dialog) dialog.close(); });
  $("player-close").addEventListener("click", function () { dialog.close(); });

  // Hồ sơ
  document.querySelectorAll("[data-bind]").forEach(function (node) {
    node.textContent = profile[node.getAttribute("data-bind")] || "";
  });
  if (profile.name) {
    document.title = profile.name + (profile.role ? " · " + profile.role : "");
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.content = profile.tagline || document.title;
  }
  $("year").textContent = new Date().getFullYear();

  (profile.stats || []).forEach(function (s) {
    var d = el("div");
    d.appendChild(el("dt", null, s.label));
    d.appendChild(el("dd", null, s.value));
    $("stats").appendChild(d);
  });

  (profile.bio || []).forEach(function (p) { $("bio").appendChild(el("p", null, p)); });
  if (profile.location) $("location").textContent = "📍 " + profile.location;
  var avatar = $("avatar");
  if (profile.avatar) avatar.style.backgroundImage = "url('" + encodeURI(profile.avatar) + "')";
  else avatar.textContent = (profile.name || "?").trim().charAt(0).toUpperCase();

  var links = $("links");
  if (profile.email) {
    var mail = el("a", "btn primary", profile.email);
    mail.href = "mailto:" + profile.email;
    links.appendChild(mail);
  }
  (profile.socials || []).forEach(function (s) {
    if (!s.url) return;
    var a = el("a", "btn", s.label + " ↗");
    a.href = s.url;
    a.target = "_blank";
    a.rel = "noopener";
    links.appendChild(a);
  });

  // Video nổi bật
  var featured = videos.filter(function (v) { return v.featured; })[0] || videos[0];
  if (featured) $("featured").appendChild(card(featured));

  // Lưới và bộ lọc
  var categories = [];
  videos.forEach(function (v) { if (v.category && categories.indexOf(v.category) < 0) categories.push(v.category); });
  var current = "";

  function render() {
    var wide = $("grid-wide"), tall = $("grid-tall");
    wide.textContent = "";
    tall.textContent = "";
    var list = videos.filter(function (v) { return !current || v.category === current; });
    list.forEach(function (v) { (v.vertical ? tall : wide).appendChild(card(v)); });
    var hasWide = wide.children.length > 0, hasTall = tall.children.length > 0;
    wide.hidden = !hasWide;
    tall.hidden = !hasTall;
    $("vertical-title").hidden = !(hasWide && hasTall);
    $("empty").hidden = list.length > 0;
  }

  if (categories.length > 1) {
    [""].concat(categories).forEach(function (c) {
      var chip = el("button", "chip", c || "Tất cả");
      chip.type = "button";
      chip.setAttribute("aria-pressed", String(c === current));
      chip.addEventListener("click", function () {
        current = c;
        document.querySelectorAll(".chip").forEach(function (x) { x.setAttribute("aria-pressed", String(x === chip)); });
        render();
      });
      $("filters").appendChild(chip);
    });
  }
  render();
})();
