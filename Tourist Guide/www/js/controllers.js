var app = angular.module('starter.controllers', ['ionic'])


app.controller("CurrencyConverter", function ($scope, $http, $httpParamSerializerJQLike) {
 $scope.sourceCurrency = 'USD';
    $scope.changedCurrency = 'INR';
   
    $scope.Currency = function() {
    
           var SourceValue=document.getElementById("SourceValue").value;
           var SourceCurrency = document.getElementById("SourceCurrency");
           SourceCurrency=SourceCurrency.options[SourceCurrency.selectedIndex].value;
   
           var TargetCurrency = document.getElementById("TargetCurrency");
           TargetCurrency =TargetCurrency.options[TargetCurrency.selectedIndex].value;
$http({
    method: 'GET',
    url : 'http://api.fixer.io/latest?symbols='+SourceCurrency+','+TargetCurrency+'',
    contentType: "application/json"
}).success(function(response) {
    var list=response.rates;

    var TargetRate=response.rates[TargetCurrency];
    var SourceRate=response.rates[SourceCurrency];
    
    BaseRate=TargetRate/SourceRate;    
    OutputValue=SourceValue*BaseRate;
   //$scope.changedCurrency = OutputValue;
    document.getElementById("TargetValue").value=OutputValue;
        });
}; })

app.controller("Accomdation", function ($scope, $http) {

        var accomodationPlace;
        var autocomplete;
        var accomodationMapOptions = {
        zoom: 3,
        center: new google.maps.LatLng(39,3),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
        $scope.map = new google.maps.Map(document.getElementById('accomodationMap'), accomodationMapOptions);
    function accomodationSetMarker(lati, longi)
    {
         accomodationMapOptions = {
            zoom: 13,
            center: new google.maps.LatLng(lati, longi),
            mapTypeId: google.maps.MapTypeId.ROADMAP
             
        }
        $scope.map = new google.maps.Map(document.getElementById('accomodationMap'), accomodationMapOptions);
    }
    $scope.map = new google.maps.Map(document.getElementById('accomodationMap'), accomodationMapOptions);
    $scope.accomodationMarkers = [];
    var infoWindow = new google.maps.InfoWindow();
    function createMarker(info){
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.position[0], info.position[1]),
            title: info.title,
            icon:'img/accomodation_marker.png'
        });
        marker.content = '<div class="infoWindowContent">' + info.vicinity + '</div>';
        google.maps.event.addListener(marker, 'mousedown', function(){
            infoWindow.setContent('<h6>' + marker.title + '</h6>' + marker.content);
            infoWindow.open($scope.map, marker);
        });
        $scope.accomodationMarkers.push(marker);
    }  
    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }
            var input = document.getElementById('placeInput');
            autocomplete = new google.maps.places.Autocomplete(input);
            google.maps.event.addListener(autocomplete, 'place_changed', function () {
            accomodationPlace = autocomplete.getPlace();
            });
        $scope.Accomdation = function() {       
            accomodationPlace = autocomplete.getPlace();
            if(accomodationPlace!=undefined && accomodationPlace!=null && accomodationPlace!=""){
            var latitude = accomodationPlace.geometry.location.lat();
            var longitude = accomodationPlace.geometry.location.lng();
            $http.get('http://places.cit.api.here.com/places/v1/discover/explore?at='+latitude+','+longitude+'&cat=accommodation&app_id=vPgPzO4cc045RjvcZ8U8&app_code=98SpI4Xnqm9oiI_zRuS97A&tf=plain&pretty=true')
                .success(function(sourcedata){
                accomodationSetMarker(latitude,longitude);             
                for(var i=0;i<sourcedata.results.items.length;i++)
                    {
                        createMarker(sourcedata.results.items[i]);
                    }
                //document.getElementById("accomodationMap").innerHTML=content;
                console.log(sourcedata);
            }); 
            }
        };  
    
    })

app.controller("Places", function ($scope, $http) {
    
    var place;
        var autocomplete;
        var mapOptions = {
        zoom: 3,
        center: new google.maps.LatLng(39, 3),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
        $scope.map = new google.maps.Map(document.getElementById('placesMap'), mapOptions);

    function setMarker(lati, longi)
    {
        var mapOptions = {
            zoom: 13,
            center: new google.maps.LatLng(lati, longi),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        $scope.map = new google.maps.Map(document.getElementById('placesMap'), mapOptions);
    }
    
    $scope.markers = [];
    var infoWindow = new google.maps.InfoWindow();
    function createMarker(info){
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.position[0], info.position[1]),
            title: info.title,
            icon:'img/points-of-interest_marker.png'
            
        });
        marker.content = '<div class="infoWindowContent">' + info.vicinity + '</div>';

        google.maps.event.addListener(marker, 'mousedown', function(){
            infoWindow.setContent('<h6>' + marker.title + '</h6>' + marker.content);
            infoWindow.open($scope.map, marker);
        });

        $scope.markers.push(marker);
    }  


    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }
        
            var input = document.getElementById('pInput');
            autocomplete = new google.maps.places.Autocomplete(input);
            google.maps.event.addListener(autocomplete, 'place_changed', function () {
                 place = autocomplete.getPlace();  
            });
        
        $scope.Places = function() {       
            place = autocomplete.getPlace();
            if(place!=undefined && place!=null && place!=""){
            var latitude = place.geometry.location.lat();
            var longitude = place.geometry.location.lng();
            $http.get('http://places.cit.api.here.com/places/v1/discover/explore?at='+latitude+','+longitude+'&cat=going-out&app_id=vPgPzO4cc045RjvcZ8U8&app_code=98SpI4Xnqm9oiI_zRuS97A&tf=plain&pretty=true')
                .success(function(sourcedata){
                setMarker(latitude,longitude);
                
                for(var i=0;i<sourcedata.results.items.length;i++)
                    {
                        createMarker(sourcedata.results.items[i]);    
                    }
            });
            }
        }; 
    
    })

app.controller('googlemapoutput', function ($scope,$http) {
    var place;
    var autocomplete;
    var latitude;
    var longitude;
    var locality;
    var input = document.getElementById('searchLocation');
    autocomplete = new google.maps.places.Autocomplete(input);
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        place = autocomplete.getPlace();  
    });
    $scope.getWeather = function() {  
        
        place = autocomplete.getPlace();
        if(place!=undefined && place!=null && place!=""){
        latitude = place.geometry.location.lat();
        longitude = place.geometry.location.lng();
   
        if(place.address_components!=null)
        {
        for(var i=0 ;i < place.address_components.length;i++)
    {
        if(place.address_components[i].types!=null)
        {
        for(var j=0;j<place.address_components[i].types.length;j++)
        {
            
            if(place.address_components[i].types[j]=="locality")
            {
                locality=place.address_components[i].long_name;
                break;
            }
        }
        }
    }
        }
            document.getElementById("currentWeather").innerHTML = "<iframe id='forecast_embed' width='500' type='text/html' frameborder='0' height='245' src='http://forecast.io/embed/#lat=" + latitude + "&lon=" + longitude + "&name=" + locality + "&color=#00aaff&font=Georgia&units=us'> </iframe>";
            document.getElementById("currentWeather").classList.remove('hide');
        }
    };
    
    
})

app.controller('loginCtrl', function($scope, $state) {
    $state.go('main.dashboard.home'); 
    
})

app.controller('Food',function($scope,$http){
    console.log("I am in food");

        var accomodationPlace;
        var autocomplete;
        var accomodationMapOptions = {
        zoom: 3,
        center: new google.maps.LatLng(0,0),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
        $scope.map = new google.maps.Map(document.getElementById('foodMap'), accomodationMapOptions);
    function accomodationSetMarker(lati, longi)
    {
         accomodationMapOptions = {
            zoom: 13,
            center: new google.maps.LatLng(lati, longi),
            mapTypeId: google.maps.MapTypeId.ROADMAP
             
        }
        $scope.map = new google.maps.Map(document.getElementById('foodMap'), accomodationMapOptions);
    }
    $scope.map = new google.maps.Map(document.getElementById('foodMap'), accomodationMapOptions);
    $scope.accomodationMarkers = [];
    var infoWindow = new google.maps.InfoWindow();
     
    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }
            var input = document.getElementById('foodInput');
            autocomplete = new google.maps.places.Autocomplete(input);
            google.maps.event.addListener(autocomplete, 'place_changed', function () {
            accomodationPlace = autocomplete.getPlace();
            });
        $scope.Food = function() {       
            accomodationPlace = autocomplete.getPlace();
            if(accomodationPlace!=undefined && accomodationPlace!=null && accomodationPlace!=""){
            var latitude = accomodationPlace.geometry.location.lat();
            var longitude = accomodationPlace.geometry.location.lng();
            $http.get('http://places.cit.api.here.com/places/v1/discover/explore?at='+latitude+','+longitude+'&cat=eat-drink&app_id=vPgPzO4cc045RjvcZ8U8&app_code=98SpI4Xnqm9oiI_zRuS97A&tf=plain&pretty=true')
                .success(function(sourcedata){
                accomodationSetMarker(latitude,longitude);             
                for(var i=0;i<sourcedata.results.items.length;i++)
                    {
                        createMarker(sourcedata.results.items[i]);
                    }
                document.getElementById("foodMap").innerHTML=content;
                console.log(sourcedata);
            }); 
            }
        };
    function createMarker(info){
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.position[0], info.position[1]),
            title: info.title,
            icon:'img/food_marker.png'
        });
        marker.content = '<div class="infoWindowContent">' + info.vicinity + '</div>';
        google.maps.event.addListener(marker, 'mousedown', function(){
            infoWindow.setContent('<h6>' + marker.title + '</h6>' + marker.content);
            infoWindow.open($scope.map, marker);
        });
        $scope.accomodationMarkers.push(marker);
    } 
    
    
})




app.controller('homeCtrlr',function($scope,$scope,  $ionicActionSheet, $state, $ionicLoading,$log,$ionicHistory){

$scope.showWeather = function()
{
$state.go('main.dashboard.weather');
}

$scope.Currency=function()
{
$state.go('main.dashboard.Currency');
}
$scope.Places=function()
{
$state.go('main.dashboard.Places');
}
$scope.Accomdation=function()
{
$state.go('main.dashboard.Accomdation');
}
$scope.goToFood=function()
{
    $state.go('main.dashboard.Food');
}
})

app.controller('tabsContrlr',function($scope,$state,$log){
$scope.goToHome=function()
{
$state.go('main.dashboard.home');
};


$scope.goToWeather = function()
{
        $state.go('main.dashboard.weather');
};

$scope.goToCurrency = function()
{
        $state.go('main.dashboard.Currency');
};

    $scope.goToPlaces = function()
{
        $state.go('main.dashboard.Places');
};
    $scope.goToAccomodation = function()
{
        $state.go('main.dashboard.Accomdation');
};
$scope.goToFood=function()
{
    $state.go('main.dashboard.Food');
};

});
