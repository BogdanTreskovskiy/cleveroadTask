
let position = {
  longitude: 0,
  latitude: 0
}
let list = []

const convertDateToUTC = date => {
  // return new Date(new Date(1970, 0, 1, 0,0,0,0).setMilliseconds(new Date(d).getTime()))
  const d = new Date(date);
  return new Date(
    d.getUTCFullYear(),
    d.getUTCMonth(),
    d.getUTCDate(),
    d.getUTCHours(),
    d.getUTCMinutes(),
    d.getUTCSeconds(),
    d.getUTCMilliseconds()
  );
};

const fetchLocation = () => {
  fetch('http://api.open-notify.org/iss-now.json')
  .then(response => {
    return response.json()
  })
  .then(json => {
    position = json.iss_position

    initMap(position.latitude, position.longitude)
    draw()
  })
  .catch(error => {
    console.error(error)
  })
}

const fetchPeople = () => {
  fetch('http://api.open-notify.org/astros.json')
  .then(response => {
    return response.json()
  })
  .then(json => {
    list = json.people

    draw()
  })
  .catch(error => {
    console.error(error)
  })
}

function initMap(lat, long) {
  var myLatLng = {lat: Number(lat), lng: Number(long)};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'ISS'
  });
}

const draw = () => {
  // location
  const lat = document.getElementById('lat')
  lat.innerHTML = position.latitude

  const long = document.getElementById('long')
  long.innerHTML = position.longitude

  // UTC time and date  
  const rightNowUTC = convertDateToUTC(Date.now())

  const time = document.getElementById('t')
  time.innerHTML = rightNowUTC.toLocaleTimeString()

  const date = document.getElementById('date')
  date.innerHTML = rightNowUTC.toDateString()


  // list 
  const people = document.getElementById('people')

  let html = ''

  for (let i = 0; i < list.length; i++) {
    html += '<div class="man">'
    html += '<img src="./icon.png" alt="icon">'
    html += '<span>' + list[i].name + '</span>'
    html += '</div>'
  }

  people.innerHTML = html

  const total = document.getElementById('total')
  total.innerHTML = list.length
}

fetchLocation()
fetchPeople()

setInterval(() => {
  fetchLocation()
}, 5000)


