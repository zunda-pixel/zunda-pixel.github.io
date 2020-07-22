let id;
let tweak_data;

window.onload = function () {
  id = window.location.href.split("description.html?id=");

  const banner_image = document.getElementById("banner");
  banner_image.setAttribute("src", "./PackageInfo/" + id[1] + "/banner.png");

  const icon_image = document.getElementById("icon");
  icon_image.setAttribute("src", "./PackageInfo/" + id[1] + "/icon.png");

  const filePath = "./PackageInfo/" + id[1] + "/Info.json";
  loadJson(filePath);
  for (let i = 1; i <= Number(tweak_data["screenshot"]); i++) {
    const img = document.createElement("img");
    img.src = "./PackageInfo/" + id[1] + "/screenshot" + i + ".png";
    document.getElementById("screenshot_scroll").appendChild(img);
  }

  const tweak_name = document.getElementById("tweak_name");
  tweak_name.innerHTML = tweak_data["name"];

  const bundle_id = document.getElementById("bundle_id");
  bundle_id.innerHTML = id[1];

  const developer = document.getElementById("developer");
  developer.innerHTML = tweak_data["developer"];

  const description_short = document.getElementById("description_short");
  description_short.innerHTML = tweak_data["desc_short"];

  const price = document.getElementById("price");
  price.innerHTML = tweak_data["price"];

  const compatible = document.getElementById("compatible");
  compatible.innerHTML = tweak_data["compatible"];

  const description_long = document.getElementById("description_long");
  description_long.innerHTML = tweak_data["desc_long"];

  const changelog = document.getElementById("changelog");
  const changelog_array = tweak_data["changelog"];

  const version = document.getElementById("version");
  const versions = Object.keys(changelog_array);

  version.innerHTML = versions[0];

  let latest_changelog =
    '<div id="changelog" class="changelog"><h3>' +
    versions[0] +
    "</h3><div class='latest-changelog'><ul>";

  for (const tmp_changelog of Object.values(changelog_array[versions[0]])) {
    latest_changelog += "<li>" + tmp_changelog + "</li>";
  }
  latest_changelog += "</ul></div></div>";

  delete changelog_array[versions[0]];
  versions.shift();

  changelog.insertAdjacentHTML("beforeend", latest_changelog);

  let old_changelog =
    '<div class="old-changelog"><input type="checkbox" id="sp01" value="none" /><label for="sp01"></label><div>';
  for (const version of versions) {
    old_changelog += "<h3>" + version + "</h3><ul>";
    for (const changelog of Object.values(changelog_array[version])) {
      old_changelog += "<li>" + changelog + "</li>";
    }
    old_changelog += "</ul>";
  }
  changelog.insertAdjacentHTML("beforeend", old_changelog);
};

function loadJson(filePath) {
  let jsonFile;
  const obj = new XMLHttpRequest();

  obj.open("get", filePath, false);
  obj.onload = function () {
    try {
      jsonFile = JSON.parse(this.responseText);
    } catch (e) {
      alert("URL BROKEN \n\nError:" + e);
    }
  };
  obj.send(null);
  tweak_data = jsonFile;
}
function openInPackageManager() {
  let url =
    "cydia://url/https://cydia.saurik.com/api/share#?source=https://zunda-pixel.github.io/repo/&package=";
  url += id[1];
  const userAgent = window.navigator.userAgent.toLowerCase();
  if (userAgent.indexOf("iphone") != -1) {
    window.location.href = url;
  } else if (userAgent.indexOf("ipad") != -1) {
    window.location.href = url;
  } else {
    alert("Only Available iPhone and iPad");
  }
}
