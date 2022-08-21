const trackers = {
  skillshare: (course_url) => "https://skillshare.eqcm.net/c/2381979/298081/4650?u=" + encodeURIComponent(course_url),
  EDX: (course_url) => "https://www.awin1.com/cread.php?awinmid=6798&awinaffid=708269&clickref=&ued=" + encodeURIComponent(course_url),
  treehouse: (course_url) => "https://treehouse.7eer.net/c/2403494/228915/3944?u=" + encodeURIComponent(course_url),
  datacamp: (course_url) => course_url + "?tap_a=5644-dce66f&tap_s=1227981-e88050&utm_medium=affiliate&utm_source=patrickvanegas",
  mindvalley: (course_url) => "https://www.awin1.com/cread.php?awinmid=11001&awinaffid=708269&clickref=&ued=" + encodeURIComponent(course_url),
  google: (course_url) => course_url,
  swayam: (course_url) => course_url,
  yc: (course_url) => course_url,
}

module.exports = {
  trackers,
}
