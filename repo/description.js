window.onload = function () {
  var id = window.location.href.split("description.html?id=");

  var banner_image = document.getElementById("banner");
  banner_image.setAttribute("src", "./PackageInfo/" + id[1] + "/banner.png");

  var icon_image = document.getElementById("icon");
  icon_image.setAttribute("src", "./PackageInfo/" + id[1] + "/icon.png");

  var filePath = "./PackageInfo/" + id[1] + "/Info.json";
  var jsonData = loadJson(filePath);

  for (var i = 1; i <= Number(jsonData["screenshot"]); i++) {
    var img = document.createElement("img");
    img.src = "./PackageInfo/" + id[1] + "/screenshot" + i + ".png";
    document.getElementById("screenshot_scroll").appendChild(img);
  }

  var tweak_name = document.getElementById("tweak_name");
  tweak_name.innerHTML = jsonData["name"];

  var developer = document.getElementById("bundle_id");
  developer.innerHTML = id[1];

  var developer = document.getElementById("developer");
  developer.innerHTML = jsonData["developer"];

  var description_short = document.getElementById("description_short");
  description_short.innerHTML = jsonData["desc_short"];

  var price = document.getElementById("price");
  price.innerHTML = jsonData["price"];

  var compatible = document.getElementById("compatible");
  compatible.innerHTML = jsonData["compatible"];

  var description_long = document.getElementById("description_long");
  description_long.innerHTML = jsonData["desc_long"];

  var changelog = document.getElementById("changelog");
  var changelog_array = jsonData["changelog"];

  var version = document.getElementById("version");
  var versions = Object.keys(changelog_array);

  version.innerHTML = versions[0];

  var latest_changelog =
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

  var old_changelog =
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
  var jsonFile;
  var obj = new XMLHttpRequest();

  obj.open("get", filePath, false);
  obj.onload = function () {
    try {
      jsonFile = JSON.parse(this.responseText);
    } catch (e) {
      //alert("URLが壊れています。");
    }
  };
  obj.send(null);
  return jsonFile;
}
