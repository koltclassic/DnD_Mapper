      // Using leaflet.js to pan and zoom a big image.
      // See also: http://kempe.net/blog/2014/06/14/leaflet-pan-zoom-image.html
      // create the slippy map
      var map = L.map('image-map', {
        minZoom: 1,
        maxZoom: 4,
        center: [0,0],
        zoom: 1,
        crs: L.CRS.Simple
      });

      // dimensions of the image 
      var w = 4000,
          h = 2878,
          url = 'http://vignette1.wikia.nocookie.net/forgottenrealms/images/a/a0/Faerun_map.jpg/revision/latest?cb=20080923050218';

      // calculate the edges of the image, in coordinate space
      var southWest = map.unproject([0, h], map.getMaxZoom()-1);
      var northEast = map.unproject([w, 0], map.getMaxZoom()-1);
      var bounds = new L.LatLngBounds(southWest, northEast);

      // add the image overlay, 
      // so that it covers the entire map
      L.imageOverlay(url, bounds).addTo(map);

      // tell leaflet that the map is exactly as big as the image
      map.setMaxBounds(bounds);

      //Initialize FeatureGroup to store editable layers
      var drawnItems = new L.FeatureGroup();
      map.addLayer(drawnItems);

      //Initialize the draw control and pass it in the FeatureGroup of editable layers
      var drawControl = new L.Control.Draw({
          edit: {
            featureGroup: drawnItems
          }
      });

      map.addControl(drawControl);

      map.on('draw:created', function(e){
        var type = e.layerType,
            layer = e.layer,
            shape = layer.toGeoJSON(),
            shape_for_db = JSON.stringify(shape);

        if (type === 'marker'){
          var title = prompt('enter title');
          var content = prompt('enter content');
          layer.bindPopup('<h1>' + title + '</h1><br><p>' + content + '</p>').openPopup();
        }
        //myDataRef.push({layer: shape_for_db})
        drawnItems.addLayer(layer);
      });


      // drawnItems.on('click', function(event){
      //     var clickedMarker = event.layer;
      //     console.log(event.layer);  
      // });

      // map.on('draw:edited', function(e){
      //   console.log(e);
      //   var layers = e.layers;

      //   layers.eachLayer(function (layer){

      //   });
      // });

      //map.addControl(drawControl);


      /*
      var popup = L.popup();

      function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map);
      }

      map.on('click', onMapClick);
      */

      var BaldursGate = L.marker([-131.75, 110.625]).bindPopup('<a href="http://forgottenrealms.wikia.com/wiki/Baldur%27s_Gate" class="speciallink" target="myiframe">Baldur&#8217s Gate</a>').addTo(map);
      var Candlekeep = L.marker([-152.5, 113.5]).bindPopup('<a href="http://forgottenrealms.wikia.com/wiki/Candlekeep" class="speciallink">Candlekeep</a>').addTo(map);
      var Cragmaw_Hideout = L.marker([-66.75, 67.4375]).bindPopup('<b>Cragmaw Hideout</b>').addTo(map);
      var Crimmor = L.marker([-167.375, 129.75]).bindPopup('<a href="http://forgottenrealms.wikia.com/wiki/Crimmor" class="speciallink">Crimmor</a>').addTo(map);
      var Daggerford = L.marker([-91.875, 92.75]).bindPopup('<a href="http://forgottenrealms.wikia.com/wiki/Daggerford" class="speciallink">Daggerford</a>').addTo(map);
      var Fort_Morninglord = L.marker([-129.1875, 137.25]).bindPopup('<a href="http://forgottenrealms.wikia.com/wiki/Fort_Morninglord" class="speciallink">Fort Morninglord</a>').addTo(map);
      var Luskan = L.marker([-48.375, 54.375]).bindPopup('<a href="http://forgottenrealms.wikia.com/wiki/Luskan" class="speciallink">Luskan</a>').addTo(map);
      var Mirabar = L.marker([-31.125, 72.25]).bindPopup('<a href="http://forgottenrealms.wikia.com/wiki/Mirabar" class="speciallink">Mirabar</a>').addTo(map);
      var Neverwinter = L.marker([-61.625, 62.5]).bindPopup('<a href="http://forgottenrealms.wikia.com/wiki/Neverwinter" class="speciallink">Neverwinter</a>').addTo(map);
       var Secomber = L.marker([-84, 108.875]).bindPopup('<a href="http://forgottenrealms.wikia.com/wiki/Secomber" class="speciallink">Secomber</a>').addTo(map);
       var Sskhanaja = L.marker([-95.8125, 123.25]).bindPopup('<a href="http://forgottenrealms.wikia.com/wiki/Ss%27Khanaja" class="speciallink">Ss&#8217Khanaja</a>').addTo(map);
       var Silverymoon = L.marker([-38.125, 112.5]).bindPopup('<a href="http://forgottenrealms.wikia.com/wiki/Silverymoon" class="speciallink">Silverymoon</a>').addTo(map);
      var WarlocksCrypt = L.marker([-114.5, 107.5]).bindPopup('<a href="http://forgottenrealms.wikia.com/wiki/Warlock%27s_Crypt" class="speciallink">Warlock&#8217s Crypt</a>').addTo(map);
      var Waterdeep = L.marker([-84.6875, 81]).bindPopup('<a href="http://forgottenrealms.wikia.com/wiki/Waterdeep" class="speciallink">Waterdeep</a>').addTo(map);
      var Zelbross = L.marker([-78.625, 119]).bindPopup('<a href="http://forgottenrealms.wikia.com/wiki/Zelbross" class="speciallink">Zelbross</a>').addTo(map);


      /*
      var location = [
      { name: "BaldursGate",
        location: [-131.75, 110.625],
      },
      {
        name: "Candlekeep",
        location: [-152.5, 113.5],
      },
      {
        name: "Cragmaw_Hideout",
        location: [-66.75, 67.4375],
      },
      {
        name: "Crimmor",
        location: [-167.375, 129.75],
      },
      {
        name: "Daggerford",
        location: [-91.875, 92.75],
      },
      {
        name: "Fort_Morninglord",
        location: [-129.1875, 137.25],
      },
      {
        name: "Luskan",
        location: [-48.375, 54.375],
      },
      {
        name: "Mirabar",
        location: [-31.125, 72.25],
      },
      {
        name: "Neverwinter",
        location: [-61.625, 62.5],
      },
      {
        name: "Secomber",
        location: [-84, 108.875],
      },
      {
        name: "Sskhanaja",
        location: [-95.8125, 123.25],
      },
      {
        name: "Silverymoon",
        location: [-38.125, 112.5],
      },
      {
        name: "WarlocksCrypt",
        location: [-114.5, 107.5],
      },
      {
        name: "Waterdeep",
        location: [-84.6875, 81],
      },
      {
        name: "Zelbross",
        location: [-78.625, 119],
      }
      ];

      function addPoint(name, location){
        L.marker(location).bindPopup(name);
      };

      var partypath = [
      {
        point: [-61.625, 62.5]
      },
      {
        point: [-66.9375, 65.5625]
      },
      {
        point: [-66.75, 67.4375]
      }
      ];
    */

      var pointA = new L.LatLng(-61.625, 62.5);
      var pointB = new L.LatLng(-66.9375, 65.5625);
      var pointC = new L.LatLng(-66.75, 67.4375);
      var pointList = [pointA, pointB, pointC];

      var firstpolyline = new L.Polyline(pointList, {
      color: 'red',
      weight: 5,
      opacity: 0.8,
      smoothFactor: 2

      });
      firstpolyline.addTo(map);