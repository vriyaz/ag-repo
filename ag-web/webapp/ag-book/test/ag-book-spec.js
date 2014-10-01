describe('AgBook Controller / Jasmine', function () {
	var controller = undefined, testBook = {};
	
	beforeEach(module("AgBookApp"));
	
	beforeEach(inject(function(_$rootScope_, _$controller_, _$filter_, _$compile_) {
		var $http = {}, service = {};
		
        $rootScope  = _$rootScope_;
        $scope      = $rootScope.$new();
        $controller = _$controller_;
        $filter     = _$filter_;
        $compile    = _$compile_;

        controller = $controller('AgBookController', {'$rootScope' : $rootScope, '$scope': $scope, '$http':$http, 'AgBookService':service});
        
    	testBook = {
    			"title": "jasmine test book",
    			"author": "ag",
				"sections" :  [ {
				    	 "sectionTitle": "section-one",
				    	 "chapters": [ 
				    	      {"chapterTitle":"chapter-1.1","paragraphs": ["para-1.1.1","para-1.1.2","para-1.1.3"]},
				    	      {"chapterTitle":"chapter-1.2","paragraphs": ["para-1.2.1","para-1.2.2","para-1.2.3"]}
				    	 ]
				     }, {
				    	 "sectionTitle": "section-two",
				    	 "chapters": [ 
				    	      {"chapterTitle":"chapter-2.1","paragraphs": ["para-2.1.1","para-2.1.2","para-2.1.3"]},
				    	      {"chapterTitle":"chapter-1.2","paragraphs": ["para-2.2.1","para-2.2.2","para-2.2.3"]}
				    	 ]
				     }
				]
    		};
    }));
	
    it ('has a controller', function() {
    	expect(controller).toBeDefined();
    });
    
    it ('has an init function', function() {
    	expect($scope.init).toBeDefined();
    });
    
    it ('has the book defined', function() {
    	expect($scope.book).toBeDefined();
    });
    
    it ('has the currentChapter\'s title as blank', function() {
    	expect($scope.currentChapter.chapterTitle).toBe('');
    });
    
    it ('initializes the book', function() {
    	$scope.load(testBook);
    	expect($scope.book.title).toBe('jasmine test book');
    	expect($scope.book.author).toBe('ag');
    });
    
    it ('finds chapter-1.1', function() {
    	$scope.load(testBook);
    	$scope.getChapter("chapter-1.1");
    	expect($scope.currentChapter.chapterTitle).toBe('chapter-1.1');
    });

    it ('does not find chapter-3.1', function() {
    	$scope.load(testBook);
    	$scope.getChapter("chapter-3.1");
    	expect($scope.currentChapter.chapterTitle).toBe('');
    });
});

describe('AgBook Filter / Jasmine', function () {

	var agTitleCase = undefined;
	
	beforeEach(module("AgBookApp"));
	
	beforeEach(inject(function(_$rootScope_, _$controller_, _$filter_, _$compile_) {
		
        $rootScope  = _$rootScope_;
        $scope      = $rootScope.$new();
        $controller = _$controller_;
        $filter     = _$filter_;
        $compile    = _$compile_;
        
        agTitleCase = $filter('agTitleCase');
    	
    }));

	it ('agTitleCase changes undefined to ""', function() {
    	expect(agTitleCase(undefined)).toBe("");
	});
	
	it ('agTitleCase changes "" to ""', function() {
	    expect(agTitleCase('')).toBe('');
	});
	
	it ('agTitleCase changes "ag title case" to "Ag Title Case"', function() {
		expect(agTitleCase('ag title case')).toBe('Ag Title Case');
	});
	
	it ('agTitleCase changes "ag IX" to "Ag IX"', function() {
		expect(agTitleCase('ag IX')).toBe('Ag IX');
	});
	
	it ('agTitleCase changes "ag and IX" to "Ag and IX"', function() {
		expect(agTitleCase('ag and IX')).toBe('Ag and IX');
    });
});

describe('AgBook Directives / Jasmine', function () {
	
	beforeEach(module("AgBookApp"));
	
	beforeEach(inject(function(_$rootScope_, _$controller_, _$filter_, _$compile_) {
		
        $rootScope  = _$rootScope_;
        $scope      = $rootScope.$new();
        $controller = _$controller_;
        $filter     = _$filter_;
        $compile    = _$compile_;

    }));
    
    it ('builds agHeading directive', function() {
    	var element = $compile('<ag-heading ag-text="heading"></ag-heading>')($rootScope);
    	$rootScope.$digest();
    	console.log(element.html());
    	expect(element.html()).toContain('<h3 class="text text-danger ng-binding">Heading<hr></h3>');
    });
    
    it ('builds agTitle directive', function() {
    	var element = $compile('<ag-title ag-title="heading"></ag-title>')($rootScope);
    	$rootScope.$digest();
    	console.log(element.html());
    	expect(element.html()).toContain('<div class="jumbotron"><h3 class="ng-binding">Heading <small><small class="ng-binding"><!-- ngIf: agSubtitle -->  </small></small></h3></div>');
    });
});