

export const MockMaps = [
  {
     id : 1,
    "name": "firstMap",
    "width": 400,
    "height": 200,
    date : new Date(),
    "points": [
      { "x":0, "y":20, "temperature": 23, "humidity": 87, "lightIntensity": 600, "isTilted": false},
      { "x":100, "y":60, "temperature": 0, "humidity": 0, "lightIntensity": 200, "isTilted": false},
      { "x":0, "y":20, "temperature": 23},
      { "x":0, "y":20, "humidity": 87, "lightIntensity": 600}
    ]
  },

  {
    id:2,
    "name": "secondMap",
    "width": 4000,
    "height": 2000,
    date : new Date(),
    "points": [
      { "x":0, "y":200, "temperature": 23, "humidity": 87, "lightIntensity": 600, "isTilted": false},
      { "x":100, "y":60, "temperature": 0, "humidity": 0, "lightIntensity": 200, "isTilted": false},
      { "x":400, "y":200, "temperature": 23},
      { "x":100, "y":2000, "humidity": 87, "lightIntensity": 200}
    ]
  },

  {
    id: 3,
    "name": "thirdMap",
    "width": 200,
    "height": 600,
    date : new Date(),
    "points": [
      { "x":0, "y":20, "temperature": 23, "humidity": 87, "lightIntensity": 600, "isTilted": false},
      { "x":100, "y":500, "temperature": 0, "humidity": 0, "lightIntensity": 200, "isTilted": false},
      { "x":50, "y":20, "temperature": 23},
      { "x":1000, "y":20, "humidity": 87, "lightIntensity": 400}
    ]
  },
];

export const MockMapsWithoutPoints = [
  {
    id : 1,
    "name": "firstMap",
    "width": 400,
    "height": 200,
    date : new Date()
  },

  {
    id:2,
    "name": "secondMap",
    "width": 4000,
    "height": 2000,
    date : new Date()
  },

  {
    id: 3,
    "name": "thirdMap",
    "width": 200,
    "height": 600,
    date : new Date()
  },
];
