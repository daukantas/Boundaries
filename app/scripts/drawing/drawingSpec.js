'use strict';

function makeLatLng(lat, lng) {
  return {
    lat: function() {
      return function() {
        return lat;
      };
    },
    lng: function() {
      return function() {
        return lng;
      };
    }
  };
}

describe('DrawingSvc', function() {
  var $q, $timeout, DrawingSvc, MockDirectionsSvc;

  MockDirectionsSvc = function() {
    this.route = function(locations) {
      var deferred = $q.defer();

      var path = [];

      for (var i = 0; i < locations.length; i++) {
        if (i !== 0) {
          path.push(locations[i]);
        }

        if (i === locations.length - 1) {
          break;
        }

        var pathLength = Math.round(10 + 10 * Math.random());
        var lat, lng;

        for (var j = 0; j < pathLength; j++) {
          lat = -90 + 180 * Math.random();
          lng = -180 + 360 * Math.random();
          path.push(makeLatLng(lat, lng));
        }
      }

      deferred.resolve(path);

      return deferred.promise;
    };
  };

  var MockMapSvc = {
    '__gjsload__': function() {},
    'Animation': {
      'BOUNCE': 1,
      'DROP': 2,
      'k': 3,
      'j': 4
    },
    'Circle': function() {},
    'ControlPosition': {
      'TOP_LEFT': 1,
      'TOP_CENTER': 2,
      'TOP': 2,
      'TOP_RIGHT': 3,
      'LEFT_CENTER': 4,
      'LEFT_TOP': 5,
      'LEFT': 5,
      'LEFT_BOTTOM': 6,
      'RIGHT_TOP': 7,
      'RIGHT': 7,
      'RIGHT_CENTER': 8,
      'RIGHT_BOTTOM': 9,
      'BOTTOM_LEFT': 10,
      'BOTTOM_CENTER': 11,
      'BOTTOM': 11,
      'BOTTOM_RIGHT': 12,
      'CENTER': 13
    },
    'Data': function() {},
    'GroundOverlay': function() {},
    'ImageMapType': function() {},
    'InfoWindow': function() {},
    'LatLng': function() {},
    'LatLngBounds': function() {},
    'MVCArray': function() {},
    'MVCObject': function() {},
    'Map': function() {},
    'MapTypeControlStyle': {
      'DEFAULT': 0,
      'HORIZONTAL_BAR': 1,
      'DROPDOWN_MENU': 2
    },
    'MapTypeId': {
      'ROADMAP': 'roadmap',
      'SATELLITE': 'satellite',
      'HYBRID': 'hybrid',
      'TERRAIN': 'terrain'
    },
    'MapTypeRegistry': function() {},
    'Marker': function() {},
    'MarkerImage': function() {},
    'NavigationControlStyle': {
      'DEFAULT': 0,
      'SMALL': 1,
      'ANDROID': 2,
      'ZOOM_PAN': 3,
      'Dn': 4,
      'Xm': 5
    },
    'OverlayView': function() {},
    'Point': function() {},
    'Polygon': function() {},
    'Polyline': function() {},
    'Rectangle': function() {},
    'ScaleControlStyle': {
      'DEFAULT': 0
    },
    'Size': function() {},
    'StrokePosition': {
      'CENTER': 0,
      'INSIDE': 1,
      'OUTSIDE': 2
    },
    'SymbolPath': {
      'CIRCLE': 0,
      'FORWARD_CLOSED_ARROW': 1,
      'FORWARD_OPEN_ARROW': 2,
      'BACKWARD_CLOSED_ARROW': 3,
      'BACKWARD_OPEN_ARROW': 4
    },
    'ZoomControlStyle': {
      'DEFAULT': 0,
      'SMALL': 1,
      'LARGE': 2,
      'Xm': 3
    },
    'event': {
      'Re': false,
      'Zd': {},
      'addListener': function() {},
      'yf': function() {},
      'removeListener': function() {},
      'clearListeners': function() {},
      'clearInstanceListeners': function() {},
      'trigger': function() {},
      'addDomListener': function() {},
      'addDomListenerOnce': function() {},
      'ca': function() {},
      'bind': function() {},
      'addListenerOnce': function() {},
      'forward': function() {},
      'Ua': function() {},
      'bi': function() {},
      'Qj': function() {}
    },
    'BicyclingLayer': function() {},
    'DirectionsRenderer': function() {},
    'DirectionsService': function() {},
    'DirectionsStatus': {
      'OK': 'OK',
      'UNKNOWN_ERROR': 'UNKNOWN_ERROR',
      'OVER_QUERY_LIMIT': 'OVER_QUERY_LIMIT',
      'REQUEST_DENIED': 'REQUEST_DENIED',
      'INVALID_REQUEST': 'INVALID_REQUEST',
      'ZERO_RESULTS': 'ZERO_RESULTS',
      'MAX_WAYPOINTS_EXCEEDED': 'MAX_WAYPOINTS_EXCEEDED',
      'NOT_FOUND': 'NOT_FOUND'
    },
    'DirectionsTravelMode': {
      'DRIVING': 'DRIVING',
      'WALKING': 'WALKING',
      'BICYCLING': 'BICYCLING',
      'TRANSIT': 'TRANSIT'
    },
    'DirectionsUnitSystem': {
      'METRIC': 0,
      'IMPERIAL': 1
    },
    'DistanceMatrixService': function() {},
    'DistanceMatrixStatus': {
      'OK': 'OK',
      'INVALID_REQUEST': 'INVALID_REQUEST',
      'OVER_QUERY_LIMIT': 'OVER_QUERY_LIMIT',
      'REQUEST_DENIED': 'REQUEST_DENIED',
      'UNKNOWN_ERROR': 'UNKNOWN_ERROR',
      'MAX_ELEMENTS_EXCEEDED': 'MAX_ELEMENTS_EXCEEDED',
      'MAX_DIMENSIONS_EXCEEDED': 'MAX_DIMENSIONS_EXCEEDED'
    },
    'DistanceMatrixElementStatus': {
      'OK': 'OK',
      'NOT_FOUND': 'NOT_FOUND',
      'ZERO_RESULTS': 'ZERO_RESULTS'
    },
    'ElevationService': function() {},
    'ElevationStatus': {
      'OK': 'OK',
      'UNKNOWN_ERROR': 'UNKNOWN_ERROR',
      'OVER_QUERY_LIMIT': 'OVER_QUERY_LIMIT',
      'REQUEST_DENIED': 'REQUEST_DENIED',
      'INVALID_REQUEST': 'INVALID_REQUEST',
      'Bn': 'DATA_NOT_AVAILABLE'
    },
    'FusionTablesLayer': function() {},
    'Geocoder': function() {},
    'GeocoderLocationType': {
      'ROOFTOP': 'ROOFTOP',
      'RANGE_INTERPOLATED': 'RANGE_INTERPOLATED',
      'GEOMETRIC_CENTER': 'GEOMETRIC_CENTER',
      'APPROXIMATE': 'APPROXIMATE'
    },
    'GeocoderStatus': {
      'OK': 'OK',
      'UNKNOWN_ERROR': 'UNKNOWN_ERROR',
      'OVER_QUERY_LIMIT': 'OVER_QUERY_LIMIT',
      'REQUEST_DENIED': 'REQUEST_DENIED',
      'INVALID_REQUEST': 'INVALID_REQUEST',
      'ZERO_RESULTS': 'ZERO_RESULTS',
      'ERROR': 'ERROR'
    },
    'KmlLayer': function() {},
    'KmlLayerStatus': {
      'UNKNOWN': 'UNKNOWN',
      'OK': 'OK',
      'INVALID_REQUEST': 'INVALID_REQUEST',
      'DOCUMENT_NOT_FOUND': 'DOCUMENT_NOT_FOUND',
      'FETCH_ERROR': 'FETCH_ERROR',
      'INVALID_DOCUMENT': 'INVALID_DOCUMENT',
      'DOCUMENT_TOO_LARGE': 'DOCUMENT_TOO_LARGE',
      'LIMITS_EXCEEDED': 'LIMITS_EXECEEDED',
      'TIMED_OUT': 'TIMED_OUT'
    },
    'MaxZoomService': function() {},
    'MaxZoomStatus': {
      'OK': 'OK',
      'ERROR': 'ERROR'
    },
    'StreetViewCoverageLayer': function() {},
    'StreetViewPanorama': function() {},
    'StreetViewService': function() {},
    'StreetViewStatus': {
      'OK': 'OK',
      'UNKNOWN_ERROR': 'UNKNOWN_ERROR',
      'ZERO_RESULTS': 'ZERO_RESULTS'
    },
    'StyledMapType': function() {},
    'TrafficLayer': function() {},
    'TransitLayer': function() {},
    'TravelMode': {
      'DRIVING': 'DRIVING',
      'WALKING': 'WALKING',
      'BICYCLING': 'BICYCLING',
      'TRANSIT': 'TRANSIT'
    },
    'UnitSystem': {
      'METRIC': 0,
      'IMPERIAL': 1
    },
    'version': '3.16.8',
    'map': {}
  };

  beforeEach(module('boundaries.drawing', function($provide) {
    $provide.value('DirectionsSvc', new MockDirectionsSvc());
    $provide.value('MapSvc', MockMapSvc);
  }));

  beforeEach(inject(function(_$timeout_, _$q_) {
    $q = _$q_;
    $timeout = _$timeout_;
  }));

  beforeEach(inject(function(_DrawingSvc_) {
    DrawingSvc = _DrawingSvc_;
  }));

  it('Makes rigid paths', function() {
    var start = makeLatLng(0, 40),
      end = makeLatLng(40, 0),
      path;

    var promise = DrawingSvc.makePath([start, end], true);

    promise.then(function(result) {
      path = result;

      expect(path.length).toEqual(2);
      expect(path[0]).toEqual(start);
      expect(path[1]).toEqual(end);
    });

    $timeout.flush();
  });

  describe('splice tests', function() {
    var points = [makeLatLng(0, 10), makeLatLng(0, 20), makeLatLng(0, 30)];

    it('Prepends one path to another', function() {
      DrawingSvc.makePath(points, false)
        .then(function(path) {
          var pathLength = path.length;

          DrawingSvc.splicePath(path, 0, 0, points);
          expect(path).toBe(path);

          expect(path.length).toBe(pathLength + points.length);
        });
      $timeout.flush();
    });
    it('Splices one path midway of another', function() {
      DrawingSvc.makePath(points, false).then(function(path) {
        DrawingSvc.makePath(points, false).then(function(newPath) {
          var pathLength = path.length;
          DrawingSvc.splicePath(path, 5, 4, newPath);
          expect(path.length).toBe(pathLength + newPath.length - 4);
        });
      });

      $timeout.flush();
    });
    it('Appends one path to another', function() {
      DrawingSvc.makePath(points, false).then(function(path) {
        var pathLength = path.length;
        DrawingSvc.splicePath(path, pathLength, 0, points);
        expect(path.length).toBe(pathLength + points.length);
      });
      
      $timeout.flush();
    });
  });
});
