/**
 * Created by david on 10/22/15.
 */
var mainApplicationModuleName = "mean";

var mainApplicationModule = angular.module(mainApplicationModuleName, []);

angular.element(document).ready(function(){
   angular.bootstrap(document,[mainApplicationModuleName]);
});