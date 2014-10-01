describe('AgPix / Jasmine', function () {
	var controller, testImages = {};
	
	beforeEach(module("AgPixApp"));
	
	beforeEach(inject(function(_$rootScope_, _$controller_, _$filter_, _$compile_){
		var $http = {}, service = {};
		
        $rootScope  = _$rootScope_;
        $scope      = $rootScope.$new();
        $controller = _$controller_;
        $filter     = _$filter_;
        $compile    = _$compile_;

        controller = $controller('AgPixController', {'$rootScope' : $rootScope, '$scope': $scope, '$http':$http, 'AgBookService':service});
        
        testImages = { "title": "Test Images", "images": [ "img-1.jpg", "img-2.jpg", "img-3.jpg"]};
    }));
	
	it ('has a controller', function() {
		expect(controller).toBeDefined();
	});
	
    it ('has an init function', function() {
    	expect($scope.init).toBeDefined();
    });
    
    it ('has the imageList defined', function() {
    	expect($scope.imageList).toBeDefined();
    });
    
    it ('initializes the testImages', function() {
    	$scope.load(testImages);
    	expect($scope.imageList.title).toBe('Test Images');
    	expect($scope.imageList.images).toBeDefined();
    });

    it ('confirms the testImages has 3 images', function() {
    	$scope.load(testImages);
    	expect($scope.imageList.images.length).toBe(3);
    });

});