var rp = require("request-promise");
var max_pm25_aqi = 0;
var max_pm25_site_id = "";
var max_pm25_time = "";
async function getData() {
  for (let id of ["1", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"]) {
    var options = {
      uri: 'http://moitruongthudo.vn/public/dailyaqi/PM2.5?site_id=' + id,
      headers: {
          'User-Agent': 'bangoc'
      },
      json: true,
    };
    await rp(options)
      .then(function(response) {
        for (let point of response) {
          if (max_pm25_aqi < point["value"]) {
            max_pm25_aqi = point["value"];
            max_pm25_site_id = id;
            max_pm25_time = point["time"];
          }
        }
    });
  }
}
(async () => {
  await getData();
  console.log("Max AQI by PM2.5:\n\tValue: " + max_pm25_aqi +
              "\n\tsite_id: " + max_pm25_site_id +
              "\n\ttime: " + max_pm25_time);
})();