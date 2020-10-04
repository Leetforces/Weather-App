console.log("Client side Javascript file is loaded!");

const form = document.getElementById("form");
const input = document.getElementById("input");

window.addEventListener("offline", function (e) {
    form.style.display = "none"
  document.getElementById("openweathermap-widget").innerHTML = `<p>Please enable Internet connection</p>`;
});

window.addEventListener("online", function (e) {
    form.style.display = "block"
    console.log("online");
    document.getElementById("openweathermap-widget").innerHTML = ``;
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = input.value;

  fetch("/weather?address=" + location).then((res) => {
    document.getElementById("openweathermap-widget").innerHTML = ``;
    res.json().then((data) => {
      if (data.error) {
        document.getElementById(
          "openweathermap-widget"
        ).innerHTML = `<p>${data.error}</p>`;
      } else {
        run(data);
      }
    });
  });
});

const run = (data) => {
  document.getElementById("openweathermap-widget").innerHTML = ``;
  window.myWidgetParam = [];
  window.myWidgetParam.push({
    id: 11,
    cityid: data.id,
    appid: data.API_KEY,
    units: "metric",
    containerid: "openweathermap-widget",
  });
  (function () {
    var script = document.createElement("script");
    script.async = true;
    script.src =
      "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(script, s);
  })();
};