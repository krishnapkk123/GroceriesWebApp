


var app = angular.module('GroceriesApp',["ngRoute"]);

app.config(function($routeProvider){

$routeProvider
 .when("/",{

 	templateUrl:"http://localhost/grossery/view/GroceriesList.html",
 	controller:"Listcontroller"

 })
 .when("/addItem",{

 	templateUrl:"http://localhost/grossery/view/addItem.html",
 	controller:"Listcontroller"
 })

.when("/addItem/edit/:id",{

 	templateUrl:"http://localhost/grossery/view/addItem.html",
 	controller:"Listcontroller"

 })

 //.otherwise({
 	//redirectTo:"/"
 //})

});


app.service("GrocerieService",function(){


	var grocerieService = [];
	grocerieService.grocerieItems  =  [

   {id:1,   completed: true,   itemName :'milk',  date:'26-11-2016'},
   {id:2,  completed: true,   itemName :'buttr',  date:'26-11-2016'},
   {id:3,  completed: true,   itemName :'cake',  date:'26-11-2016'},
   {id:4,  completed: true,   itemName :'dish',  date:'26-11-2016'},
   {id:5,  completed: true,   itemName :'element',  date:'26-11-2016'},
   {id:6,  completed: true,   itemName :'element',  date:'26-11-2016'},
   {id:7,  completed: true,   itemName :'element',  date:'26-11-2016'},
  



];

grocerieService.findById =function(id){

for(var item in grocerieService.grocerieItems){

	if(grocerieService.grocerieItems[item].id === id){

		console.log(grocerieService.grocerieItems[item]);
	return grocerieService.grocerieItems[item];

}
}


};

grocerieService.getNewId = function(){

if(grocerieService.newId){

	grocerieService.newId++;
	return grocerieService.newId;
} 

 else
 {
 	var maxId = _.max(grocerieService.grocerieItems,function(entry){return entry.id;})
 	grocerieService.newId=maxId.id + 1;
 	return grocerieService.newId;
 }



};

grocerieService.removeItem =function(entry){

var index = grocerieService.grocerieItems.indexOf(entry);
grocerieService.grocerieItems.splice(index, 1);


};
  
grocerieService.save =	function(entry)

{


	var updateItem =grocerieService.findById(entry.id);

	if(updateItem){

		updateItem.completed = entry.completed;
		updateItem.itemName =entry.itemName	;
		updateItem.date =entry.date;

	}else {

	entry.id = grocerieService.getNewId();

	grocerieService.grocerieItems.push(entry);

}
}


return grocerieService;

	
});



app.controller("HeaderController",function($scope,GrocerieService){

$scope.appTitle= "GroceryManagement";




	});




app.controller("Listcontroller",function($scope, GrocerieService,$routeParams,$location){



  $scope.GrocerieItems = GrocerieService.grocerieItems;

  $scope.rp ="routeParams value is "+  $routeParams.id ;

  if (!$routeParams.id)

  {
  
  $scope.grocerieItems = {id :0,completed:false ,itemName:'', date: new Date()};
  }

 else

{
	$scope.grocerieItems=_.clone(GrocerieService.findById(parseInt($routeParams.id)));
}

  $scope.save = function(){


  	GrocerieService.save($scope.grocerieItems);
  	$location.path("/");

  }

  $scope.removeItem =function(entry){


	GrocerieService.removeItem(entry);
};


console.log($scope.grocerieItems);

});