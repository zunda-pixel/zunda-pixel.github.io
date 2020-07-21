window.onload = function () {
  var banner_image = document.getElementById("banner");
  banner_image.setAttribute(
    "src",
    "https://repo.anthopak.dev/assets/com.anthopak.pancake/banner.png"
  );
  var icon_image = document.getElementById("icon");
  icon_image.setAttribute(
    "src",
    "https://repo.anthopak.dev/assets/com.anthopak.pancake/icon.png"
  );
  var image = '<imgsrc="https://repo.anthopak.dev/assets/com.anthopak.pancake/screenshot/panCake1.png"/><imgsrc="https://repo.anthopak.dev/assets/com.anthopak.pancake/screenshot/panCake2.png"/><imgsrc="https://repo.anthopak.dev/assets/com.anthopak.pancake/screenshot/panCake3.png"/><imgsrc="https://repo.packix.com/api/Packages/5b12be85424f7f000fdbdd95/screenshots/5cc7af8c774b0b0018f359ec/download?size=full"/><imgsrc="https://repo.packix.com/api/Packages/5b12be85424f7f000fdbdd95/screenshots/5cc7af8c774b0b0018f359ec/download?size=full"/>';

  var id = window.location.href.split("description.html?id=");

  var filePath = "./PackageInfo/" + id[1] + ".json";
  var jsonData = loadJson(filePath);

  var title = document.getElementById("title");
  title.innerHTML = jsonData["name"];

  var tweak_name = document.getElementById("tweak_name");
  tweak_name.innerHTML = jsonData["name"];

  var developer = document.getElementById("developer");
  developer.innerHTML = jsonData["developer"];

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
    "<div class='latest-changelog'><ul>";
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
  old_changelog += "</div>";

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
