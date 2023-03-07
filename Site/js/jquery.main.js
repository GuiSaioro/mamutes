// page init
jQuery(function(){
	initTouchNav();
	initProductPaginationChange();
	initProductTypePaginationChange();
	initIndustriesPaginationChange();
	initMobileNav();
	initDropDownClasses();
	initCustomHover();
	initHeaderSmallScroll();
	initSitebarClick();
	initContactLocationDrop();
	initContactReasonDrop();
	initProceedBTNClick();
	initFindLocation();
	initFilterButton();
	initSlider();
	initHomeSlider();
	initTabs();
	initAccordion();
	initAnchors();
	initListLocationFiltering();
	initProductFiltering();
	initListRepresentativesFiltering();
	initListIndustryDetailPageFiltering();
	initListProductTypeDetailPageFiltering();
});



$(window).load(function(){
    //initMenuCropping();
	$('a[href^="#videos"]').on('click', function(e) {
		e.preventDefault();
		var id = $(this).attr('href'),
		targetOffset = $(id).offset().top;
		  
		$('html, body').animate({ 
		  scrollTop: targetOffset - 100
		}, 3000);
	  });
});
function initProductPaginationChange()
{
    var condition = $('.mainProduct').length
		// && false
	;init(condition);

	function init(condition)
	{
	    if(condition || condition == null)
		{
            $('.mainProduct .pagination a').each(function(){
                var href = $(this).attr('href'); 
                var thisHeader = $('h1.large').text().replace('&', '%26');   
                if(thisHeader != "WPT Disc Clutches & Brakes")
                {
                    if(href.indexOf('prop_ProductType') == -1 && href.indexOf('prop_IsWPTProduct=false') == -1)
                    { 
                        $(this).attr('href', href + "&prop_IsWPTProduct=false");
                    }
                }
            });
		}
	}
}

function initProductTypePaginationChange()
{
    var condition = $('.filtrationProductTypeDetailHolder').length
		// && false
	;init(condition);

	function init(condition)
	{
	    if(condition || condition == null)
		{
            $('.pagination a').each(function(){
                var href = $(this).attr('href'); 
                var thisHeader = $('h1.large').text().replace('&', '%26');   
                if(href.indexOf('prop_ProductType') == -1)
                { 
                    $(this).attr('href', href + "&prop_ProductType=" + thisHeader);
                    href = $(this).attr('href');
                    if(thisHeader != "WPT Disc Clutches & Brakes")
                    {
                        $(this).attr('href', href + "&prop_IsWPTProduct=false");
                    }
                }
            });
		}
	}
}

function initIndustriesPaginationChange()
{
    var condition = $('.filtrationIndustryDetailProductsHolder').length
		// && false
	;init(condition);

	function init(condition)
	{
	    if(condition || condition == null)
		{
            $('.pagination a').each(function(){
                var href = $(this).attr('href'); 
                var thisHeader = $('h1.large').text().replace('&', '%26');   
                if(href.indexOf('prop_Industries') == -1)
                { 
                    $(this).attr('href', href + "&prop_Industries=" + thisHeader);
                }
            });
		}
	}
}

function initMenuCropping()
{
	var condition = $('#nav').length
		// && false
	;init(condition);

	function init(condition)
	{
	    if(condition || condition == null)
		{
		    setTimeout(function(){
    		    $('ul#nav ul ul li>a').each(function(){
                    var menuText = $(this).text();
                    if($(this).text().length > 25){
                        $(this).text(menuText.slice(0,25).concat('...'));
                    }
                    else{
                        $(this).text(menuText);
                    }
                });
                $('ul#nav>li>a').each(function(){
                    var menuText = $(this).text();
                    $(this).text(menuText.trim())
                    if($(this).text().length > 10){
                
                        $(this).text(menuText.slice(0,10).concat('...'));
                    }
                    else{
                        $(this).text(menuText);
                    }
                });    
		    },1000);
    	    
		}
	}
}

function initProductFiltering()
{
	var busy = false;
	var paramTypeVal = '';
	var paramIndustryVal = '';
	var paramKeywordVal = '';
	var paramModuleId =  $('.filtrationProductsHolder').data('module_id');
	var condition = $('.filtrationProductsHolder').length
		// && false
	;init(condition);

	function init(condition)
	{
		if(condition || condition == null)
		{
			filterByProductTypeSetup();
			filterByProductIndustrySetup();
			filterByNameSetup();
		}

		function filterByProductTypeSetup()
		{
			$('.typeFilter .filterButton').click(function ()
			{
				if(!busy)
				{
					busy = true;
					var _this = $(this);

					paramTypeVal = _this.data('filter_val');
					_this.closest('.drop').find('.filterButton').removeClass('active');
					_this.closest('.custom-select').find('.filterButtonBTN').text(_this.text());
					_this.addClass('active');

					$('.product-filter').addClass('loader');

					filterAjax(function ()
					{
						$('.product-filter').removeClass('loader');
						busy = false;
					});
				}

				return false;
			});
		}

		function filterByProductIndustrySetup()
		{
			$('.industryFilter .filterButton').click(function ()
			{
				if(!busy)
				{
					busy = true;
					var _this = $(this);

					paramIndustryVal = _this.data('filter_val');
					_this.closest('.drop').find('.filterButton').removeClass('active');
					_this.closest('.custom-select').find('.filterButtonBTN').text(_this.text());
					_this.addClass('active');

					$('.product-filter').addClass('loader');

					filterAjax(function ()
					{
						$('.product-filter').removeClass('loader');
						busy = false;
					});
				}

				return false;
			});
		}

		function filterByNameSetup()
		{
			$('.filterButtonInput').click(function ()
			{
				if(!busy)
				{
					busy = true;
					var _this = $(this);

					paramKeywordVal = $('.searchInput').val();

					$('.product-filter').addClass('loader');

					filterAjax(function ()
					{
						$('.product-filter').removeClass('loader');
						busy = false;
					});
				}

				return false;
			});
		}


		function filterAjax(callback)
		{
			callback = callback==null ? function(){} : callback;
			var paramType = '&prop_ProductType=' + encodeURIComponent(paramTypeVal);
			var paramIndustry = '&prop_Industries=' + encodeURIComponent(paramIndustryVal);
			var paramKeyword = '&prop_KeyWords=' + encodeURIComponent(paramKeywordVal);
			var _href = '?prop_ModuleId=' + paramModuleId + paramType + paramIndustry + paramKeyword;

			$.ajax({
				url: _href,
				success: function (data) {
					var content = $(".products-items", data).html();
					$(".products-items").html(content);
					callback();
				}
			});
		}
	}
}

function initListIndustryDetailPageFiltering()
{
	var busy = false;
	var paramTypeVal = '';
	var paramIndustryVal = $('.filtrationIndustryDetailProductsHolder').data('industry_name');
	var paramKeywordVal = '';
	var paramModuleId =  $('.filtrationIndustryDetailProductsHolder').data('module_id');
	var condition = $('.filtrationIndustryDetailProductsHolder').length
		// && false
	;init(condition);

	function init(condition)
	{
		if(condition || condition == null)
		{
			filterByProductTypeSetup();
			filterByNameSetup();
		}

		function filterByProductTypeSetup()
		{
			$('.typeFilter .filterButton').click(function ()
			{
				if(!busy)
				{
					busy = true;
					var _this = $(this);

					paramTypeVal = _this.data('filter_val');
					_this.closest('.drop').find('.filterButton').removeClass('active');
					_this.closest('.custom-select').find('.filterButtonBTN').text(_this.text());
					_this.addClass('active');

					$('.product-filter').addClass('loader');

					filterAjax(function ()
					{
						$('.product-filter').removeClass('loader');
						busy = false;
					});
				}

				return false;
			});
		}

		function filterByNameSetup()
		{
			$('.filterButtonInput').click(function ()
			{
				if(!busy)
				{
					busy = true;
					var _this = $(this);

					paramKeywordVal = $('.searchInput').val();

					$('.product-filter').addClass('loader');

					filterAjax(function ()
					{
						$('.product-filter').removeClass('loader');
						busy = false;
					});
				}

				return false;
			});
		}


		function filterAjax(callback)
		{
			callback = callback==null ? function(){} : callback;
			var paramType = '&prop_ProductType=' + encodeURIComponent(paramTypeVal);
			var paramIndustry = '&prop_Industries=' + encodeURIComponent(paramIndustryVal);
			var paramKeyword = '&prop_KeyWords=' + encodeURIComponent(paramKeywordVal);
			var _href = '?prop_ModuleId=' + paramModuleId + paramType + paramIndustry + paramKeyword;

			$.ajax({
				url: _href,
				success: function (data) {
					var content = $(".products-items", data).html();
					$(".products-items").html(content);
					callback();
				}
			});
		}
	}
}

function initListProductTypeDetailPageFiltering()
{
	var busy = false;
	var paramIndustryVal = '';
	var paramTypeVal = $('.filtrationProductTypeDetailHolder').data('type_name');
	var paramKeywordVal = '';
	var paramModuleId =  $('.filtrationProductTypeDetailHolder').data('module_id');
	var condition = $('.filtrationProductTypeDetailHolder').length
		// && false
	;init(condition);

	function init(condition)
	{
		if(condition || condition == null)
		{
			filterByProductIndustrySetup();
			filterByNameSetup();
		}

		function filterByProductIndustrySetup()
		{
			$('.industryFilter .filterButton').click(function ()
			{
				if(!busy)
				{
					busy = true;
					var _this = $(this);

					paramIndustryVal = _this.data('filter_val');
					_this.closest('.drop').find('.filterButton').removeClass('active');
					_this.closest('.custom-select').find('.filterButtonBTN').text(_this.text());
					_this.addClass('active');

					$('.product-filter').addClass('loader');

					filterAjax(function ()
					{
						$('.product-filter').removeClass('loader');
						busy = false;
					});
				}

				return false;
			});
		}

		function filterByNameSetup()
		{
			$('.filterButtonInput').click(function ()
			{
				if(!busy)
				{
					busy = true;
					var _this = $(this);

					paramKeywordVal = $('.searchInput').val();

					$('.product-filter').addClass('loader');

					filterAjax(function ()
					{
						$('.product-filter').removeClass('loader');
						busy = false;
					});
				}

				return false;
			});
		}


		function filterAjax(callback)
		{
			callback = callback==null ? function(){} : callback;
			var paramType = '&prop_ProductType=' + encodeURIComponent(paramTypeVal);
			var paramIndustry = '&prop_Industries=' + encodeURIComponent(paramIndustryVal);
			var paramKeyword = '&prop_KeyWords=' + encodeURIComponent(paramKeywordVal);
			var _href = '?prop_ModuleId=' + paramModuleId + paramType + paramIndustry + paramKeyword;

			$.ajax({
				url: _href,
				success: function (data) {
					var content = $(".products-items", data).html();
					$(".products-items").html(content);
					callback();
				}
			});
		}
	}
}

function initListRepresentativesFiltering()
{
	var busy = false;
	var paramRegionVal = '';
	var paramIndustryVal = '';
	var paramModuleId =  $('.filtrationRepresentativesHolder').data('module_id');
	var condition = $('.filtrationRepresentativesHolder').length
		// && false
	;init(condition);

	function init(condition)
	{
		if(condition || condition == null)
		{
			filterByRegionSetup();
			filterByIndustrySetup();
		}

		function filterByRegionSetup()
		{
			$('.regionFilter .filterButton').click(function ()
			{
				if(!busy)
				{
					busy = true;
					var _this = $(this);

					paramRegionVal = _this.data('filter_val');
					_this.closest('.drop').find('.filterButton').removeClass('active');
					_this.closest('.custom-select').find('.filterButtonBTN').text(_this.text());
					_this.addClass('active');

					$('.representatives-filter').addClass('loader');

					filterAjax(function ()
					{
						$('.representatives-filter').removeClass('loader');
						busy = false;
					});
				}

				return false;
			});
		}

		function filterByIndustrySetup()
		{
			$('.industryFilter .filterButton').click(function ()
			{
				if(!busy)
				{
					busy = true;
					var _this = $(this);

					paramIndustryVal = _this.data('filter_val');
					_this.closest('.drop').find('.filterButton').removeClass('active');
					_this.closest('.custom-select').find('.filterButtonBTN').text(_this.text());
					_this.addClass('active');

					$('.representatives-filter').addClass('loader');

					filterAjax(function ()
					{
						$('.representatives-filter').removeClass('loader');
						busy = false;
					});
				}

				return false;
			});
		}


		function filterAjax(callback)
		{
			callback = callback==null ? function(){} : callback;
			var paramRegion = '&prop_Region=' + encodeURIComponent(paramRegionVal);
			var paramIndustry = '&prop_Industries=' + encodeURIComponent(paramIndustryVal);
			var _href = '?prop_ModuleId=' + paramModuleId + paramRegion + paramIndustry;

			$.ajax({
				url: _href,
				success: function (data) {
					var content = $(".representatives-items", data).html();
					$(".representatives-items").html(content);
					initAccordion();
					callback();
				}
			});
		}
	}
}

function initSitebarClick()
{
	var condition = $('.sitebar').length
		// && false
	;init(condition);

	function init(condition)
	{
		if(condition || condition == null)
		{
			initLanguageDrop();
			$('.sitebar>li>a.clickLink').on('click', function(e){
				e.preventDefault();
				e.stopPropagation();
				var is_active = $(this).closest('li').hasClass('active');
				$('.sitebar>li').removeClass('active');
				if(!is_active)
				{
					$(this).closest('li').toggleClass('active');
				}
			})
			$('.sitebar>li input').on('click', function (e){
				e.stopPropagation();
			})

			$(window).click(function() {
				$('.sitebar>li').removeClass('active');
			});
		}

	}

	function initLanguageDrop()
	{
		var busy = false;
		var condition = $('#languageDrop').length
			// && false
		;init(condition);

		function init(condition)
		{
			if(condition || condition == null)
			{
				languageDrop();
			}

			function languageDrop()
			{
				$('#languageDrop .filterButton').click(function ()
				{
					var _this = $(this);
					_this.closest('.drop').find('.filterButton').removeClass('active');
					_this.closest('.custom-select').find('.filterButtonBTN').text(_this.text());
					_this.addClass('active');

				});
			}
		}
	}
}

function initTabs() {
	jQuery('ul.tabset').tabset({
		tabLinks: 'a',
		defaultTab: false
	});
}

// accordion menu init
function initAccordion() {
	jQuery('ul.accordion').slideAccordion({
		opener: 'a.opener',
		slider: 'div.slide',
		animSpeed: 300
	});
}

function initSlider(){
  $('.slider').slick({
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  dots: true,
	  infinite: false,
	  speed: 300,
	  arrows: false
  });
}

function initHomeSlider(){
	$('.homeSlider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: true,
		infinite: false,
		speed: 900,
		arrows: true,
		prevArrow: '<button class="prev"><span class="icon-arrow-left"></span></button>',
		nextArrow: '<button class="next"><span class="icon-arrow-right"></span></button>'
	});
}

function initFilterButton(){
	var condition = $('.custom-select').length
		// && false
	;init(condition);

	function init(condition)
	{
		if(condition || condition == null)
		{
			$(".filterButtonBTN").click(function(e) {
				e.stopPropagation();
				$('.filterButtonBTN').not(this).closest('.custom-select').removeClass('active');
				return $(this).closest('.custom-select').toggleClass("active");
			})

			$('.filterButton').on('click', function () {
				let _this = $(this);
				_this.closest('.custom-select').find('.filterButtonBTN').text(_this.text());
				_this.closest('.drop').find('.filterButton').removeClass('active');
				_this.addClass('active');
				_this.closest('.custom-select').removeClass('active');
			});

			$(window).click(function() {
				$('.custom-select').removeClass('active');
			});
		}
	}
}

function initContactLocationDrop()
{
	var busy = false;
	var condition = $('#contactLocationDrop').length
		// && false
	;init(condition);

	function init(condition)
	{
		if(condition || condition == null)
		{
			contactFormSetup();
		}

		function contactFormSetup()
		{
			$('#contactLocationDrop .filterButton').click(function ()
			{
				var _this = $(this);

				var id = _this.data('filter_val');
				_this.closest('.drop').find('.filterButton').removeClass('active');
				_this.closest('.custom-select').find('.filterButtonBTN').text(_this.text());
				_this.addClass('active');
				const regex = new RegExp('contact_form(.*?)\&');
				var formAction = $('.contact-form form').attr('action').replace(regex, 'contact_form' + id + '&');
				$('.contact-form form').attr('action', formAction);
				return false;
			});
		}
	}
}

function initProceedBTNClick()
{
	var condition = $('.proceedBTN').length
		// && false
	;init(condition);

	function init(condition)
	{
		if(condition || condition == null)
		{
			contactFormOpen();
		}

		function contactFormOpen()
		{
			$('.proceedBTN').click(function ()
			{
				var _this = $(this);
				if($('#contactReasonDrop .filterButton.active').data('filter_val') === 'Become a Supplier') {
					window.open('https://psp22.onventis.com/OnventisINT1/SupplierRegisterBrowser.aspx?ID=1a602126-7540-46ef-b2a7-67b80db68e66');
				} else {
					_this.hide();
					_this.closest('.item, .holder').find('.box-holder').hide();
					$('.contact-form').show();
				}

				return false;
			});
		}
	}
}

function initContactReasonDrop()
{
	var condition = $('#contactReasonDrop').length
		// && false
	;init(condition);

	function init(condition)
	{
		if(condition || condition == null)
		{
			contactFormSetup();
		}

		function contactFormSetup()
		{
			$('#contactReasonDrop .filterButton').click(function ()
			{
				var _this = $(this);

				var reason = _this.data('filter_val');
				_this.closest('.drop').find('.filterButton').removeClass('active');
				_this.closest('.custom-select').find('.filterButtonBTN').text(_this.text());
				_this.addClass('active');
				$('[name="Reason"]').val(reason);
				return false;
			});
		}
	}
}

function initFindLocation()
{
	var busy = false;
	var id = "";
	var condition = $('#findLocationDrop').length
		// && false
	;init(condition);

	function init(condition)
	{
		if(condition || condition == null)
		{
			findLocationDrop();
		}

		function findLocationDrop()
		{
			$('#findLocationDrop .filterButton').click(function ()
			{
				if(!busy)
				{
					busy = true;
					var _this = $(this);

					id = _this.data('filter_val');
					_this.closest('.drop').find('.filterButton').removeClass('active');
					_this.closest('.custom-select').find('.filterButtonBTN').text(_this.text());
					_this.addClass('active');

					$('.location-item').addClass('loader');

					filterAjax(function ()
					{
						$('.location-item').removeClass('loader');
						busy = false;
					});
				}

				return false;
			});
		}

		function filterAjax(callback)
		{
			callback = callback==null ? function(){} : callback;
			var _href = '/inner_api/find-location?item_id=' + id;

			$.ajax({
				url: _href,
				success: function (data) {
					var content = $(data).html();
					$(".map-info").html(content);
					callback();
				}
			});
		}
	}
}

function initListLocationFiltering()
{
    var busy = false;
    var paramRegionVal = '';
    var paramModuleId =  $('.filtrationLocationHolder').data('module_id');
    var condition = $('.filtrationLocationHolder').length
    // && false
    ;init(condition);

    function init(condition)
    {
        if(condition || condition == null)
        {
            filterByRegionSetup();
        }

        function filterByRegionSetup()
        {
            $('.filtrationLocationHolder .filterButton').click(function ()
            {
                if(!busy)
                {
                    busy = true;
                    var _this = $(this);

                    paramRegionVal = _this.data('filter_val');
                    _this.closest('.drop').find('.filterButton').removeClass('active');
                    _this.closest('.custom-select').find('.filterButtonBTN').text(_this.text());
                    _this.addClass('active');

                    $('.location-filter').addClass('loader');

                    filterAjax(function ()
                    {
                        $('.location-filter').removeClass('loader');
                        busy = false;
                    });
                }

                return false;
            });
        }

        function filterAjax(callback)
        {
            callback = callback==null ? function(){} : callback;
            var paramRegion = '&prop_Region=' + encodeURIComponent(paramRegionVal);
            var _href = '?prop_ModuleId=' + paramModuleId + paramRegion;

            $.ajax({
                url: _href,
                success: function (data) {
                    var content = $(".location-holder", data).html();
                    $(".location-holder").html(content);
                    callback();
                }
            });
        }
    }
}

// mobile menu init
function initMobileNav() {
	jQuery('body').mobileNav({
		menuActiveClass: 'nav-active',
		menuOpener: '.nav-opener'
	});
}

// handle dropdowns on mobile devices
function initTouchNav() {
	jQuery('#nav').each(function(){
		new TouchNav({
			navBlock: this
		});
	});
}

function initAnchors() {
	new SmoothScroll({
		anchorLinks: 'a.anchor',
		extraOffset: 115,
		wheelBehavior: 'none'
	});
}


// add classes if item has dropdown
function initDropDownClasses() {
	jQuery('#nav li').each(function() {
		var item = jQuery(this);
		var drop = item.find('ul');
		var link = item.find('a').eq(0);
		if(drop.length) {
			item.addClass('has-drop-down');
			if(link.length) link.addClass('has-drop-down-a');
		}
	});
}

// add classes on hover/touch
function initCustomHover() {
	jQuery('.item').touchHover();
}


function initHeaderSmallScroll() {
	$(window).scroll(function () {
		if ($('body').width() > 767) {
			scroll();
		}
	});

	if ($('body').width() > 767) {
		scroll();
	}

    scroll();

    function scroll() {
        var x = $(document).scrollTop();
        var _offset = 30;

        if(x > _offset) {
            $('body').addClass('scroll');
        } else {
            $('body').removeClass('scroll');
        }
    }
}

/*
 * Simple Mobile Navigation
 */
;(function($) {
	function MobileNav(options) {
		this.options = $.extend({
			container: null,
			hideOnClickOutside: false,
			menuActiveClass: 'nav-active',
			menuOpener: '.nav-opener',
			menuDrop: '.nav-drop',
			toggleEvent: 'click',
			outsideClickEvent: 'click touchstart pointerdown MSPointerDown'
		}, options);
		this.initStructure();
		this.attachEvents();
	}
	MobileNav.prototype = {
		initStructure: function() {
			this.page = $('html');
			this.container = $(this.options.container);
			this.opener = this.container.find(this.options.menuOpener);
			this.drop = this.container.find(this.options.menuDrop);
		},
		attachEvents: function() {
			var self = this;

			if(activateResizeHandler) {
				activateResizeHandler();
				activateResizeHandler = null;
			}

			this.outsideClickHandler = function(e) {
				if(self.isOpened()) {
					var target = $(e.target);
					if(!target.closest(self.opener).length && !target.closest(self.drop).length) {
						self.hide();
					}
				}
			};

			this.openerClickHandler = function(e) {
				e.preventDefault();
				self.toggle();
			};

			this.opener.on(this.options.toggleEvent, this.openerClickHandler);
		},
		isOpened: function() {
			return this.container.hasClass(this.options.menuActiveClass);
		},
		show: function() {
			this.container.addClass(this.options.menuActiveClass);
			if(this.options.hideOnClickOutside) {
				this.page.on(this.options.outsideClickEvent, this.outsideClickHandler);
			}
		},
		hide: function() {
			this.container.removeClass(this.options.menuActiveClass);
			if(this.options.hideOnClickOutside) {
				this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
			}
		},
		toggle: function() {
			if(this.isOpened()) {
				this.hide();
			} else {
				this.show();
			}
		},
		destroy: function() {
			this.container.removeClass(this.options.menuActiveClass);
			this.opener.off(this.options.toggleEvent, this.clickHandler);
			this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
		}
	};

	var activateResizeHandler = function() {
		var win = $(window),
			doc = $('html'),
			resizeClass = 'resize-active',
			flag, timer;
		var removeClassHandler = function() {
			flag = false;
			doc.removeClass(resizeClass);
		};
		var resizeHandler = function() {
			if(!flag) {
				flag = true;
				doc.addClass(resizeClass);
			}
			clearTimeout(timer);
			timer = setTimeout(removeClassHandler, 500);
		};
		win.on('resize orientationchange', resizeHandler);
	};

	$.fn.mobileNav = function(options) {
		return this.each(function() {
			var params = $.extend({}, options, {container: this}),
				instance = new MobileNav(params);
			$.data(this, 'MobileNav', instance);
		});
	};
}(jQuery));

/*
 * Mobile hover plugin
 */
;(function($){

	// detect device type
	var isTouchDevice = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
		isWinPhoneDevice = /Windows Phone/.test(navigator.userAgent);

	// define events
	var eventOn = (isTouchDevice && 'touchstart') || (isWinPhoneDevice && navigator.pointerEnabled && 'pointerdown') || (isWinPhoneDevice && navigator.msPointerEnabled && 'MSPointerDown') || 'mouseenter',
		eventOff = (isTouchDevice && 'touchend') || (isWinPhoneDevice && navigator.pointerEnabled && 'pointerup') || (isWinPhoneDevice && navigator.msPointerEnabled && 'MSPointerUp') || 'mouseleave';

	// event handlers
	var toggleOn, toggleOff, preventHandler;
	if(isTouchDevice || isWinPhoneDevice) {
		// prevent click handler
		preventHandler = function(e) {
			e.preventDefault();
		};

		// touch device handlers
		toggleOn = function(e) {
			var options = e.data, element = $(this);

			var toggleOff = function(e) {
				var target = $(e.target);
				if (!target.is(element) && !target.closest(element).length) {
					element.removeClass(options.hoverClass);
					element.off('click', preventHandler);
					if(options.onLeave) options.onLeave(element);
					$(document).off(eventOn, toggleOff);
				}
			};

			if(!element.hasClass(options.hoverClass)) {
				element.addClass(options.hoverClass);
				element.one('click', preventHandler);
				$(document).on(eventOn, toggleOff);
				if(options.onHover) options.onHover(element);
			}
		};
	} else {
		// desktop browser handlers
		toggleOn = function(e) {
			var options = e.data, element = $(this);
			element.addClass(options.hoverClass);
			$(options.context).on(eventOff, options.selector, options, toggleOff);
			if(options.onHover) options.onHover(element);
		};
		toggleOff = function(e) {
			var options = e.data, element = $(this);
			element.removeClass(options.hoverClass);
			$(options.context).off(eventOff, options.selector, toggleOff);
			if(options.onLeave) options.onLeave(element);
		};
	}

	// jQuery plugin
	$.fn.touchHover = function(opt) {
		var options = $.extend({
			context: this.context,
			selector: this.selector,
			hoverClass: 'hover'
		}, opt);

		$(this.context).on(eventOn, this.selector, options, toggleOn);
		return this;
	};
}(jQuery));

// navigation accesibility module
function TouchNav(opt) {
	this.options = {
		hoverClass: 'hover',
		menuItems: 'li',
		menuOpener: 'a',
		menuDrop: 'ul',
		navBlock: null
	};
	for(var p in opt) {
		if(opt.hasOwnProperty(p)) {
			this.options[p] = opt[p];
		}
	}
	this.init();
}
TouchNav.isActiveOn = function(elem) {
	return elem && elem.touchNavActive;
};
TouchNav.prototype = {
	init: function() {
		if(typeof this.options.navBlock === 'string') {
			this.menu = document.getElementById(this.options.navBlock);
		} else if(typeof this.options.navBlock === 'object') {
			this.menu = this.options.navBlock;
		}
		if(this.menu) {
			this.addEvents();
		}
	},
	addEvents: function() {
		// attach event handlers
		var self = this;
		var touchEvent = (navigator.pointerEnabled && 'pointerdown') || (navigator.msPointerEnabled && 'MSPointerDown') || (this.isTouchDevice && 'touchstart');
		this.menuItems = lib.queryElementsBySelector(this.options.menuItems, this.menu);

		var initMenuItem = function(item) {
			var currentDrop = lib.queryElementsBySelector(self.options.menuDrop, item)[0],
				currentOpener = lib.queryElementsBySelector(self.options.menuOpener, item)[0];

			// only for touch input devices
			if( currentDrop && currentOpener && (self.isTouchDevice || self.isPointerDevice) ) {
				lib.event.add(currentOpener, 'click', lib.bind(self.clickHandler, self));
				lib.event.add(currentOpener, 'mousedown', lib.bind(self.mousedownHandler, self));
				lib.event.add(currentOpener, touchEvent, function(e){
					if( !self.isTouchPointerEvent(e) ) {
						self.preventCurrentClick = false;
						return;
					}
					self.touchFlag = true;
					self.currentItem = item;
					self.currentLink = currentOpener;
					self.pressHandler.apply(self, arguments);
				});
			}
			// for desktop computers and touch devices
			jQuery(item).bind('mouseenter', function(){
				if(!self.touchFlag) {
					self.currentItem = item;
					self.mouseoverHandler();
				}
			});
			jQuery(item).bind('mouseleave', function(){
				if(!self.touchFlag) {
					self.currentItem = item;
					self.mouseoutHandler();
				}
			});
			item.touchNavActive = true;
		};

		// addd handlers for all menu items
		for(var i = 0; i < this.menuItems.length; i++) {
			initMenuItem(self.menuItems[i]);
		}

		// hide dropdowns when clicking outside navigation
		if(this.isTouchDevice || this.isPointerDevice) {
			lib.event.add(document.documentElement, 'mousedown', lib.bind(this.clickOutsideHandler, this));
			lib.event.add(document.documentElement, touchEvent, lib.bind(this.clickOutsideHandler, this));
		}
	},
	mousedownHandler: function(e) {
		if(this.touchFlag) {
			e.preventDefault();
			this.touchFlag = false;
			this.preventCurrentClick = false;
		}
	},
	mouseoverHandler: function() {
		lib.addClass(this.currentItem, this.options.hoverClass);
		jQuery(this.currentItem).trigger('itemhover');
	},
	mouseoutHandler: function() {
		lib.removeClass(this.currentItem, this.options.hoverClass);
		jQuery(this.currentItem).trigger('itemleave');
	},
	hideActiveDropdown: function() {
		for(var i = 0; i < this.menuItems.length; i++) {
			if(lib.hasClass(this.menuItems[i], this.options.hoverClass)) {
				lib.removeClass(this.menuItems[i], this.options.hoverClass);
				jQuery(this.menuItems[i]).trigger('itemleave');
			}
		}
		this.activeParent = null;
	},
	pressHandler: function(e) {
		// hide previous drop (if active)
		if(this.currentItem !== this.activeParent) {
			if(this.activeParent && this.currentItem.parentNode === this.activeParent.parentNode) {
				lib.removeClass(this.activeParent, this.options.hoverClass);
			} else if(!this.isParent(this.activeParent, this.currentLink)) {
				this.hideActiveDropdown();
			}
		}
		// handle current drop
		this.activeParent = this.currentItem;
		if(lib.hasClass(this.currentItem, this.options.hoverClass)) {
			this.preventCurrentClick = false;
		} else {
			e.preventDefault();
			this.preventCurrentClick = true;
			lib.addClass(this.currentItem, this.options.hoverClass);
			jQuery(this.currentItem).trigger('itemhover');
		}
	},
	clickHandler: function(e) {
		// prevent first click on link
		if(this.preventCurrentClick) {
			e.preventDefault();
		}
	},
	clickOutsideHandler: function(event) {
		var e = event.changedTouches ? event.changedTouches[0] : event;
		if(this.activeParent && !this.isParent(this.menu, e.target)) {
			this.hideActiveDropdown();
			this.touchFlag = false;
		}
	},
	isParent: function(parent, child) {
		while(child.parentNode) {
			if(child.parentNode == parent) {
				return true;
			}
			child = child.parentNode;
		}
		return false;
	},
	isTouchPointerEvent: function(e) {
		return (e.type.indexOf('touch') > -1) ||
				(navigator.pointerEnabled && e.pointerType === 'touch') ||
				(navigator.msPointerEnabled && e.pointerType == e.MSPOINTER_TYPE_TOUCH);
	},
	isPointerDevice: (function() {
		return !!(navigator.pointerEnabled || navigator.msPointerEnabled);
	}()),
	isTouchDevice: (function() {
		return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
	}())
};

/*
 * Utility module
 */
lib = {
	hasClass: function(el,cls) {
		return el && el.className ? el.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)')) : false;
	},
	addClass: function(el,cls) {
		if (el && !this.hasClass(el,cls)) el.className += " "+cls;
	},
	removeClass: function(el,cls) {
		if (el && this.hasClass(el,cls)) {el.className=el.className.replace(new RegExp('(\\s|^)'+cls+'(\\s|$)'),' ');}
	},
	extend: function(obj) {
		for(var i = 1; i < arguments.length; i++) {
			for(var p in arguments[i]) {
				if(arguments[i].hasOwnProperty(p)) {
					obj[p] = arguments[i][p];
				}
			}
		}
		return obj;
	},
	each: function(obj, callback) {
		var property, len;
		if(typeof obj.length === 'number') {
			for(property = 0, len = obj.length; property < len; property++) {
				if(callback.call(obj[property], property, obj[property]) === false) {
					break;
				}
			}
		} else {
			for(property in obj) {
				if(obj.hasOwnProperty(property)) {
					if(callback.call(obj[property], property, obj[property]) === false) {
						break;
					}
				}
			}
		}
	},
	event: (function() {
		var fixEvent = function(e) {
			e = e || window.event;
			if(e.isFixed) return e; else e.isFixed = true;
			if(!e.target) e.target = e.srcElement;
			e.preventDefault = e.preventDefault || function() {this.returnValue = false;};
			e.stopPropagation = e.stopPropagation || function() {this.cancelBubble = true;};
			return e;
		};
		return {
			add: function(elem, event, handler) {
				if(!elem.events) {
					elem.events = {};
					elem.handle = function(e) {
						var ret, handlers = elem.events[e.type];
						e = fixEvent(e);
						for(var i = 0, len = handlers.length; i < len; i++) {
							if(handlers[i]) {
								ret = handlers[i].call(elem, e);
								if(ret === false) {
									e.preventDefault();
									e.stopPropagation();
								}
							}
						}
					};
				}
				if(!elem.events[event]) {
					elem.events[event] = [];
					if(elem.addEventListener) elem.addEventListener(event, elem.handle, false);
					else if(elem.attachEvent) elem.attachEvent('on'+event, elem.handle);
				}
				elem.events[event].push(handler);
			},
			remove: function(elem, event, handler) {
				var handlers = elem.events[event];
				for(var i = handlers.length - 1; i >= 0; i--) {
					if(handlers[i] === handler) {
						handlers.splice(i,1);
					}
				}
				if(!handlers.length) {
					delete elem.events[event];
					if(elem.removeEventListener) elem.removeEventListener(event, elem.handle, false);
					else if(elem.detachEvent) elem.detachEvent('on'+event, elem.handle);
				}
			}
		};
	}()),
	queryElementsBySelector: function(selector, scope) {
		scope = scope || document;
		if(!selector) return [];
		if(selector === '>*') return scope.children;
		if(typeof document.querySelectorAll === 'function') {
			return scope.querySelectorAll(selector);
		}
		var selectors = selector.split(',');
		var resultList = [];
		for(var s = 0; s < selectors.length; s++) {
			var currentContext = [scope || document];
			var tokens = selectors[s].replace(/^\s+/,'').replace(/\s+$/,'').split(' ');
			for (var i = 0; i < tokens.length; i++) {
				token = tokens[i].replace(/^\s+/,'').replace(/\s+$/,'');
				if (token.indexOf('#') > -1) {
					var bits = token.split('#'), tagName = bits[0], id = bits[1];
					var element = document.getElementById(id);
					if (element && tagName && element.nodeName.toLowerCase() != tagName) {
						return [];
					}
					currentContext = element ? [element] : [];
					continue;
				}
				if (token.indexOf('.') > -1) {
					var bits = token.split('.'), tagName = bits[0] || '*', className = bits[1], found = [], foundCount = 0;
					for (var h = 0; h < currentContext.length; h++) {
						var elements;
						if (tagName == '*') {
							elements = currentContext[h].getElementsByTagName('*');
						} else {
							elements = currentContext[h].getElementsByTagName(tagName);
						}
						for (var j = 0; j < elements.length; j++) {
							found[foundCount++] = elements[j];
						}
					}
					currentContext = [];
					var currentContextIndex = 0;
					for (var k = 0; k < found.length; k++) {
						if (found[k].className && found[k].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))) {
							currentContext[currentContextIndex++] = found[k];
						}
					}
					continue;
				}
				if (token.match(/^(\w*)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/)) {
					var tagName = RegExp.$1 || '*', attrName = RegExp.$2, attrOperator = RegExp.$3, attrValue = RegExp.$4;
					if(attrName.toLowerCase() == 'for' && this.browser.msie && this.browser.version < 8) {
						attrName = 'htmlFor';
					}
					var found = [], foundCount = 0;
					for (var h = 0; h < currentContext.length; h++) {
						var elements;
						if (tagName == '*') {
							elements = currentContext[h].getElementsByTagName('*');
						} else {
							elements = currentContext[h].getElementsByTagName(tagName);
						}
						for (var j = 0; elements[j]; j++) {
							found[foundCount++] = elements[j];
						}
					}
					currentContext = [];
					var currentContextIndex = 0, checkFunction;
					switch (attrOperator) {
						case '=': checkFunction = function(e) { return (e.getAttribute(attrName) == attrValue) }; break;
						case '~': checkFunction = function(e) { return (e.getAttribute(attrName).match(new RegExp('(\\s|^)'+attrValue+'(\\s|$)'))) }; break;
						case '|': checkFunction = function(e) { return (e.getAttribute(attrName).match(new RegExp('^'+attrValue+'-?'))) }; break;
						case '^': checkFunction = function(e) { return (e.getAttribute(attrName).indexOf(attrValue) == 0) }; break;
						case '$': checkFunction = function(e) { return (e.getAttribute(attrName).lastIndexOf(attrValue) == e.getAttribute(attrName).length - attrValue.length) }; break;
						case '*': checkFunction = function(e) { return (e.getAttribute(attrName).indexOf(attrValue) > -1) }; break;
						default : checkFunction = function(e) { return e.getAttribute(attrName) };
					}
					currentContext = [];
					var currentContextIndex = 0;
					for (var k = 0; k < found.length; k++) {
						if (checkFunction(found[k])) {
							currentContext[currentContextIndex++] = found[k];
						}
					}
					continue;
				}
				tagName = token;
				var found = [], foundCount = 0;
				for (var h = 0; h < currentContext.length; h++) {
					var elements = currentContext[h].getElementsByTagName(tagName);
					for (var j = 0; j < elements.length; j++) {
						found[foundCount++] = elements[j];
					}
				}
				currentContext = found;
			}
			resultList = [].concat(resultList,currentContext);
		}
		return resultList;
	},
	trim: function (str) {
		return str.replace(/^\s+/, '').replace(/\s+$/, '');
	},
	bind: function(f, scope, forceArgs){
		return function() {return f.apply(scope, typeof forceArgs !== 'undefined' ? [forceArgs] : arguments);};
	}
};

/*
 * jQuery Tabs plugin
 */

;(function($, $win) {
	'use strict';

	function Tabset($holder, options) {
		this.$holder = $holder;
		this.options = options;

		this.init();
	}

	Tabset.prototype = {
		init: function() {
			this.$tabLinks = this.$holder.find(this.options.tabLinks);

			this.setStartActiveIndex();
			this.setActiveTab();

			if (this.options.autoHeight) {
				this.$tabHolder = $(this.$tabLinks.eq(0).attr(this.options.attrib)).parent();
			}
		},

		setStartActiveIndex: function() {
			var $classTargets = this.getClassTarget(this.$tabLinks);
			var $activeLink = $classTargets.filter('.' + this.options.activeClass);
			var $hashLink = this.$tabLinks.filter('[' + this.options.attrib + '="' + location.hash + '"]');
			var activeIndex;

			if (this.options.checkHash && $hashLink.length) {
				$activeLink = $hashLink;
			}

			activeIndex = $classTargets.index($activeLink);

			this.activeTabIndex = this.prevTabIndex = (activeIndex === -1 ? (this.options.defaultTab ? 0 : null) : activeIndex);
		},

		setActiveTab: function() {
			var self = this;

			this.$tabLinks.each(function(i, link) {
				var $link = $(link);
				var $classTarget = self.getClassTarget($link);
				var $tab = $($link.attr(self.options.attrib));

				if (i !== self.activeTabIndex) {
					$classTarget.removeClass(self.options.activeClass);
					$tab.addClass(self.options.tabHiddenClass).removeClass(self.options.activeClass);
				} else {
					$classTarget.addClass(self.options.activeClass);
					$tab.removeClass(self.options.tabHiddenClass).addClass(self.options.activeClass);
				}

				self.attachTabLink($link, i);
			});
		},

		attachTabLink: function($link, i) {
			var self = this;

			$link.on(this.options.event + '.tabset', function(e) {
				e.preventDefault();

				if (self.activeTabIndex === self.prevTabIndex && self.activeTabIndex !== i) {
					self.activeTabIndex = i;
					self.switchTabs();
				}
			});
		},

		resizeHolder: function(height) {
			var self = this;

			if (height) {
				this.$tabHolder.height(height);
				setTimeout(function() {
					self.$tabHolder.addClass('transition');
				}, 10);
			} else {
				self.$tabHolder.removeClass('transition').height('');
			}
		},

		switchTabs: function() {
			var self = this;

			var $prevLink = this.$tabLinks.eq(this.prevTabIndex);
			var $nextLink = this.$tabLinks.eq(this.activeTabIndex);

			var $prevTab = this.getTab($prevLink);
			var $nextTab = this.getTab($nextLink);

			$prevTab.removeClass(this.options.activeClass);

			if (self.haveTabHolder()) {
				this.resizeHolder($prevTab.outerHeight());
			}

			setTimeout(function() {
				self.getClassTarget($prevLink).removeClass(self.options.activeClass);

				$prevTab.addClass(self.options.tabHiddenClass);
				$nextTab.removeClass(self.options.tabHiddenClass).addClass(self.options.activeClass);

				self.getClassTarget($nextLink).addClass(self.options.activeClass);

				if (self.haveTabHolder()) {
					self.resizeHolder($nextTab.outerHeight());

					setTimeout(function() {
						self.resizeHolder();
						self.prevTabIndex = self.activeTabIndex;
					}, self.options.animSpeed);
				} else {
					self.prevTabIndex = self.activeTabIndex;
				}
			}, this.options.autoHeight ? this.options.animSpeed : 1);
		},

		getClassTarget: function($link) {
			return this.options.addToParent ? $link.parent() : $link;
		},

		getActiveTab: function() {
			return this.getTab(this.$tabLinks.eq(this.activeTabIndex));
		},

		getTab: function($link) {
			return $($link.attr(this.options.attrib));
		},

		haveTabHolder: function() {
			return this.$tabHolder && this.$tabHolder.length;
		},

		destroy: function() {
			var self = this;

			this.$tabLinks.off('.tabset').each(function() {
				var $link = $(this);

				self.getClassTarget($link).removeClass(self.options.activeClass);
				$($link.attr(self.options.attrib)).removeClass(self.options.activeClass + ' ' + self.options.tabHiddenClass);
			});

			this.$holder.removeData('Tabset');
		}
	};

	$.fn.tabset = function(options) {
		options = $.extend({
			activeClass: 'active',
			addToParent: false,
			autoHeight: false,
			checkHash: false,
			defaultTab: true,
			animSpeed: 500,
			tabLinks: 'a',
			attrib: 'href',
			event: 'click',
			tabHiddenClass: 'js-tab-hidden'
		}, options);
		options.autoHeight = options.autoHeight && $.support.opacity;

		return this.each(function() {
			var $holder = $(this);

			if (!$holder.data('Tabset')) {
				$holder.data('Tabset', new Tabset($holder, options));
			}
		});
	};
}(jQuery, jQuery(window)));

/*
 * jQuery Accordion plugin
 */
;(function($){
	$.fn.slideAccordion = function(opt){
		// default options
		var options = $.extend({
			addClassBeforeAnimation: false,
			allowClickWhenExpanded: false,
			activeClass:'active',
			opener:'.opener',
			slider:'.slide',
			animSpeed: 300,
			collapsible:true,
			event:'click'
		},opt);

		return this.each(function(){
			// options
			var accordion = $(this);
			var items = accordion.find(':has('+options.slider+')');

			items.each(function(){
				var item = $(this);
				var opener = item.find(options.opener);
				var slider = item.find(options.slider);
				opener.bind(options.event, function(e){
					if(!slider.is(':animated')) {
						if(item.hasClass(options.activeClass)) {
							if(options.allowClickWhenExpanded) {
								return;
							} else if(options.collapsible) {
								slider.slideUp(options.animSpeed, function(){
									hideSlide(slider);
									item.removeClass(options.activeClass);
								});
							}
						} else {
							// show active
							var levelItems = item.siblings('.'+options.activeClass);
							var sliderElements = levelItems.find(options.slider);
							item.addClass(options.activeClass);
							showSlide(slider).hide().slideDown(options.animSpeed);
						
							// collapse others
							sliderElements.slideUp(options.animSpeed, function(){
								levelItems.removeClass(options.activeClass);
								hideSlide(sliderElements);
							});
						}
					}
					e.preventDefault();
				});
				if(item.hasClass(options.activeClass)) showSlide(slider); else hideSlide(slider);
			});
		});
	};

	// accordion slide visibility
	var showSlide = function(slide) {
		return slide.css({position:'', top: '', left: '', width: '' });
	};
	var hideSlide = function(slide) {
		return slide.show().css({position:'absolute', top: -9999, left: -9999, width: slide.width() });
	};
}(jQuery));

/*!
 * SmoothScroll module
 */
;(function($, exports) {
	// private variables
	var page,
		win = $(window),
		activeBlock, activeWheelHandler,
		wheelEvents = ('onwheel' in document || document.documentMode >= 9 ? 'wheel' : 'mousewheel DOMMouseScroll');

	// animation handlers
	function scrollTo(offset, options, callback) {
		// initialize variables
		var scrollBlock;
		if (document.body) {
			if (typeof options === 'number') {
				options = {
					duration: options
				};
			} else {
				options = options || {};
			}
			page = page || $('html, body');
			scrollBlock = options.container || page;
		} else {
			return;
		}

		// treat single number as scrollTop
		if (typeof offset === 'number') {
			offset = {
				top: offset
			};
		}

		// handle mousewheel/trackpad while animation is active
		if (activeBlock && activeWheelHandler) {
			activeBlock.off(wheelEvents, activeWheelHandler);
		}
		if (options.wheelBehavior && options.wheelBehavior !== 'none') {
			activeWheelHandler = function(e) {
				if (options.wheelBehavior === 'stop') {
					scrollBlock.off(wheelEvents, activeWheelHandler);
					scrollBlock.stop();
				} else if (options.wheelBehavior === 'ignore') {
					e.preventDefault();
				}
			};
			activeBlock = scrollBlock.on(wheelEvents, activeWheelHandler);
		}

		// start scrolling animation
		scrollBlock.stop().animate({
			scrollLeft: offset.left,
			scrollTop: offset.top
		}, options.duration, function() {
			if (activeWheelHandler) {
				scrollBlock.off(wheelEvents, activeWheelHandler);
			}
			if ($.isFunction(callback)) {
				callback();
			}
		});
	}

	// smooth scroll contstructor
	function SmoothScroll(options) {
		this.options = $.extend({
			anchorLinks: 'a[href^="#"]', // selector or jQuery object
			container: null, // specify container for scrolling (default - whole page)
			extraOffset: null, // function or fixed number
			activeClasses: null, // null, "link", "parent"
			easing: 'swing', // easing of scrolling
			animMode: 'duration', // or "speed" mode
			animDuration: 800, // total duration for scroll (any distance)
			animSpeed: 1500, // pixels per second
			anchorActiveClass: 'anchor-active',
			sectionActiveClass: 'section-active',
			wheelBehavior: 'stop', // "stop", "ignore" or "none"
			useNativeAnchorScrolling: false // do not handle click in devices with native smooth scrolling
		}, options);
		this.init();
	}
	SmoothScroll.prototype = {
		init: function() {
			this.initStructure();
			this.attachEvents();
			this.isInit = true;
		},
		initStructure: function() {
			var self = this;

			this.container = this.options.container ? $(this.options.container) : $('html,body');
			this.scrollContainer = this.options.container ? this.container : win;
			this.anchorLinks = jQuery(this.options.anchorLinks).filter(function() {
				return jQuery(self.getAnchorTarget(jQuery(this))).length;
			});
		},
		getId: function(str) {
			try {
				return '#' + str.replace(/^.*?(#|$)/, '');
			} catch (err) {
				return null;
			}
		},
		getAnchorTarget: function(link) {
			// get target block from link href
			var targetId = this.getId($(link).attr('href'));
			return $(targetId.length > 1 ? targetId : 'html');
		},
		getTargetOffset: function(block) {
			// get target offset
			var blockOffset = block.offset().top;
			if (this.options.container) {
				blockOffset -= this.container.offset().top - this.container.prop('scrollTop');
			}

			// handle extra offset
			if (typeof this.options.extraOffset === 'number') {
				blockOffset -= this.options.extraOffset;
			} else if (typeof this.options.extraOffset === 'function') {
				blockOffset -= this.options.extraOffset(block);
			}
			return {
				top: blockOffset
			};
		},
		attachEvents: function() {
			var self = this;

			// handle active classes
			if (this.options.activeClasses && this.anchorLinks.length) {
				// cache structure
				this.anchorData = [];

				for (var i = 0; i < this.anchorLinks.length; i++) {
					var link = jQuery(this.anchorLinks[i]),
						targetBlock = self.getAnchorTarget(link),
						anchorDataItem = null;

					$.each(self.anchorData, function(index, item) {
						if (item.block[0] === targetBlock[0]) {
							anchorDataItem = item;
						}
					});

					if (anchorDataItem) {
						anchorDataItem.link = anchorDataItem.link.add(link);
					} else {
						self.anchorData.push({
							link: link,
							block: targetBlock
						});
					}
				};

				// add additional event handlers
				this.resizeHandler = function() {
					if (!self.isInit) return;
					self.recalculateOffsets();
				};
				this.scrollHandler = function() {
					self.refreshActiveClass();
				};

				this.recalculateOffsets();
				this.scrollContainer.on('scroll', this.scrollHandler);
				win.on('resize.SmoothScroll load.SmoothScroll orientationchange.SmoothScroll refreshAnchor.SmoothScroll', this.resizeHandler);
			}

			// handle click event
			this.clickHandler = function(e) {
				self.onClick(e);
			};
			if (!this.options.useNativeAnchorScrolling) {
				this.anchorLinks.on('click', this.clickHandler);
			}
		},
		recalculateOffsets: function() {
			var self = this;
			$.each(this.anchorData, function(index, data) {
				data.offset = self.getTargetOffset(data.block);
				data.height = data.block.outerHeight();
			});
			this.refreshActiveClass();
		},
		toggleActiveClass: function(anchor, block, state) {
			anchor.toggleClass(this.options.anchorActiveClass, state);
			block.toggleClass(this.options.sectionActiveClass, state);
		},
		refreshActiveClass: function() {
			var self = this,
				foundFlag = false,
				containerHeight = this.container.prop('scrollHeight'),
				viewPortHeight = this.scrollContainer.height(),
				scrollTop = this.options.container ? this.container.prop('scrollTop') : win.scrollTop();

			// user function instead of default handler
			if (this.options.customScrollHandler) {
				this.options.customScrollHandler.call(this, scrollTop, this.anchorData);
				return;
			}

			// sort anchor data by offsets
			this.anchorData.sort(function(a, b) {
				return a.offset.top - b.offset.top;
			});

			// default active class handler
			$.each(this.anchorData, function(index) {
				var reverseIndex = self.anchorData.length - index - 1,
					data = self.anchorData[reverseIndex],
					anchorElement = (self.options.activeClasses === 'parent' ? data.link.parent() : data.link);

				if (scrollTop >= containerHeight - viewPortHeight) {
					// handle last section
					if (reverseIndex === self.anchorData.length - 1) {
						self.toggleActiveClass(anchorElement, data.block, true);
					} else {
						self.toggleActiveClass(anchorElement, data.block, false);
					}
				} else {
					// handle other sections
					if (!foundFlag && (scrollTop >= data.offset.top - 1 || reverseIndex === 0)) {
						foundFlag = true;
						self.toggleActiveClass(anchorElement, data.block, true);
					} else {
						self.toggleActiveClass(anchorElement, data.block, false);
					}
				}
			});
		},
		calculateScrollDuration: function(offset) {
			var distance;
			if (this.options.animMode === 'speed') {
				distance = Math.abs(this.scrollContainer.scrollTop() - offset.top);
				return (distance / this.options.animSpeed) * 1000;
			} else {
				return this.options.animDuration;
			}
		},
		onClick: function(e) {
			var targetBlock = this.getAnchorTarget(e.currentTarget),
				targetOffset = this.getTargetOffset(targetBlock);

			e.preventDefault();
			scrollTo(targetOffset, {
				container: this.container,
				wheelBehavior: this.options.wheelBehavior,
				duration: this.calculateScrollDuration(targetOffset)
			});
			this.makeCallback('onBeforeScroll', e.currentTarget);
		},
		makeCallback: function(name) {
			if (typeof this.options[name] === 'function') {
				var args = Array.prototype.slice.call(arguments);
				args.shift();
				this.options[name].apply(this, args);
			}
		},
		destroy: function() {
			var self = this;

			this.isInit = false;
			if (this.options.activeClasses) {
				win.off('resize.SmoothScroll load.SmoothScroll orientationchange.SmoothScroll refreshAnchor.SmoothScroll', this.resizeHandler);
				this.scrollContainer.off('scroll', this.scrollHandler);
				$.each(this.anchorData, function(index) {
					var reverseIndex = self.anchorData.length - index - 1,
						data = self.anchorData[reverseIndex],
						anchorElement = (self.options.activeClasses === 'parent' ? data.link.parent() : data.link);

					self.toggleActiveClass(anchorElement, data.block, false);
				});
			}
			this.anchorLinks.off('click', this.clickHandler);
		}
	};

	// public API
	$.extend(SmoothScroll, {
		scrollTo: function(blockOrOffset, durationOrOptions, callback) {
			scrollTo(blockOrOffset, durationOrOptions, callback);
		}
	});

	// export module
	exports.SmoothScroll = SmoothScroll;
}(jQuery, this));


/*  -------------------- GDPR Cookies plugin -------------------------- */

/**
 * Minified by jsDelivr using Terser v3.14.1.
 * Original file: /npm/js-cookie@2.2.1/src/js.cookie.js
 * 
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
!function(e){var n;if("function"==typeof define&&define.amd&&(define(e),n=!0),"object"==typeof exports&&(module.exports=e(),n=!0),!n){var t=window.Cookies,o=window.Cookies=e();o.noConflict=function(){return window.Cookies=t,o}}}(function(){function e(){for(var e=0,n={};e<arguments.length;e++){var t=arguments[e];for(var o in t)n[o]=t[o]}return n}function n(e){return e.replace(/(%[0-9A-Z]{2})+/g,decodeURIComponent)}return function t(o){function r(){}function i(n,t,i){if("undefined"!=typeof document){"number"==typeof(i=e({path:"/"},r.defaults,i)).expires&&(i.expires=new Date(1*new Date+864e5*i.expires)),i.expires=i.expires?i.expires.toUTCString():"";try{var c=JSON.stringify(t);/^[\{\[]/.test(c)&&(t=c)}catch(e){}t=o.write?o.write(t,n):encodeURIComponent(String(t)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),n=encodeURIComponent(String(n)).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent).replace(/[\(\)]/g,escape);var f="";for(var u in i)i[u]&&(f+="; "+u,!0!==i[u]&&(f+="="+i[u].split(";")[0]));return document.cookie=n+"="+t+f}}function c(e,t){if("undefined"!=typeof document){for(var r={},i=document.cookie?document.cookie.split("; "):[],c=0;c<i.length;c++){var f=i[c].split("="),u=f.slice(1).join("=");t||'"'!==u.charAt(0)||(u=u.slice(1,-1));try{var a=n(f[0]);if(u=(o.read||o)(u,a)||n(u),t)try{u=JSON.parse(u)}catch(e){}if(r[a]=u,e===a)break}catch(e){}}return e?r[e]:r}}return r.set=i,r.get=function(e){return c(e,!1)},r.getJSON=function(e){return c(e,!0)},r.remove=function(n,t){i(n,"",e(t,{expires:-1}))},r.defaults={},r.withConverter=t,r}(function(){})});

