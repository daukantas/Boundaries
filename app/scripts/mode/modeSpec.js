'use strict';

describe('ModeCtrl', function() {
  var ModeCtrl, scope;

  beforeEach(module('boundaries.mode'));
  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    ModeCtrl = $controller('ModeCtrl', {
      '$scope': scope
    });
  }));

  it('Toggles between rigid and flexible lines', function() {
    expect(scope.rigid).toBe(false);
    scope.rigid = true;
    expect(scope.rigid).toBe(true);
  });
  it('Toggles between polygon and polyline mode', function() {
    expect(scope.polygon).toBe(false);
    scope.polygon = true;
    expect(scope.polygon).toBe(true);
  });
});