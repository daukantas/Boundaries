// require( '6to5ify/polyfill' );


angular.module( 'bndry', [ 'ngMaterial', 'ngTouch' ] )
.config( function( $mdThemingProvider ) {
  $mdThemingProvider.theme( 'default' )
    .primaryPalette( 'teal' )
    .accentPalette( 'blue' );
});


// System.import( 'src/modules/directives/shape-options-dir' );
