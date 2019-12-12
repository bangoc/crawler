var rp = require("request-promise");
var max_pm25_aqi = 0;
var max_pm25_site_id = "";
var max_pm25_time = "";
var sites = new Map(
              [[1, "Hoàn Kiếm"],
               [7, "Thành Công"],
               [8, "Tân Mai"],
               [9, "Kim Liên"],
               [10, "Phạm Văn Đồng"],
               [11, "Tây Mỗ"],
               [12, "Mỹ Đình"],
               [13, "Hàng Đậu"],
               [14, "Chi cục bảo vệ môi trường"],
               [15, "Minh Khai - Bắc Từ Liêm"],
               [16, "French Embassy in Vietnam"]
               ]);
async function findMaxPM25() {
  for (let id of sites.keys()) {
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
  await findMaxPM25();
  console.log("Max AQI by PM2.5:\n\tValue: " + max_pm25_aqi +
              "\n\tsite_id: " + max_pm25_site_id +
              "\n\tsite_name: " + sites.get(max_pm25_site_id) +
              "\n\ttime: " + max_pm25_time);
})();