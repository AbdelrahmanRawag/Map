var locationModel = function (reslocation) {
  this.title = reslocation.title;
  this.location = reslocation.location;
  this.marker = reslocation.marker;
};


var data = [
  { title: "Mac", location: { lat: 29.994099, lng: 31.160268 } },
  { title: "Hardeees", location: { lat: 29.994319, lng: 31.160842 } },
  { title: "Spectra", location: { lat: 29.993899, lng: 31.160767 } },
  { title: "Marhaba", location: { lat: 29.995760, lng: 31.159295 } },
  { title: "myLocation", location: { lat: 29.993827, lng: 31.159313 } }
]
var map;
var content;
function LocationViewModel() {
  /** Here We are going to define Some Variables .*/

  var self = this;
  this.resturant = ko.observable("Resturants");
  this.list = ko.observableArray([]);
  this.list.push(new locationModel({ title: "Resturants", location: null, marker: null }))
  data.forEach(function (index) {
    var marker = new google.maps.Marker({
      position: index.location,
      map: map,
      title: index.title
    });
    index.marker = marker;
    index.marker.addListener('click',function(){
      showitem(self.list(),index);
      self.resturant(index.title);

    });
    self.list.push(new locationModel(index));
  });

  this.clicklocation = function (location) {
    if (location.title == "Resturants") {
      console.log("showAll");
      showall(self.list());
      content.close();
      self.resturant(location.title);
    }
    else {
      console.log("showITEM");
      showitem(self.list(), location);
      self.resturant(location.title);
 
    }
  }
}

function showall(list) {
  var i = 0;
  list.forEach(function (location) {
    if (i !== 0) {
      location.marker.setVisible(true);
      location.marker.setAnimation(google.maps.Animation.DROP);
      //BOUNCE
    }
    i++;
  });
}
function showitem(list, item) {
  content.setContent("<h2>"+item.title+"</h2>");
  content.open(map, item.marker);
  
  var i = 0;
  list.forEach(function (location) {
    if (i !== 0) {
      if (item.title === location.title) {
        location.marker.setVisible(true);
        location.marker.setAnimation(google.maps.Animation.BOUNCE);

      }
      else {
        location.marker.setVisible(false);
      location.marker.setAnimation(null);        
      }
    }
    i++;
  });
}
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: data[0].location
  });
  var locationmiewmodel = new LocationViewModel();
  content =  new google.maps.InfoWindow();
  ko.applyBindings(locationmiewmodel);
  console.log("initFunctino");
}