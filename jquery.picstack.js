/*

	PicStack – A photo stack gallery plugin for jQuery
	Version : 0.7.0
	Site	: http://armincifuentes.cl/picstack
	
	Author	: Armin Cifuentes
	Company : Octano (http://octano.cl)
	License : GPLv3 / http://www.gnu.org/licenses/gpl.html

*/	

(function ($) {

	var methods = {

		init: function (options) {

			var d = {
				angleMin		: -15,
				angleMax		: 15,
				speed			: 300,
				callbackBefore	: function () {},
				callbackAfter	: function () {},
				callbackZswap	: function () {}
			};

			return this.each( function () {
				
				var element = $(this),
					maxheight = 0,
					maxwidth = 0;
				
				element.data('picstack', $.extend(d,options) );
				
				element.find('img').each( function () {
					
					var ancho = $(this).outerWidth(),
						alto = $(this).outerHeight();
					
					console.log(ancho, alto);
					
					if ( ancho > maxwidth ) {
						maxwidth = ancho;
					}
					
					if ( alto > maxheight ) {
						maxheight = alto;
					}
					
				});
				
				
				element.css({
					
					'width': maxwidth,
					'height': maxheight,
					'position': 'relative'
					
				});
				
				element.children().each( function () {
					
					var	amax = element.data().picstack.angleMax,
						amin = element.data().picstack.angleMin,
						adif = amax - amin,
						angle = amin + (Math.random() * adif),
						angle = parseInt(angle);
					
					$(this).css({
						'position': 'absolute',
						'left': element.outerWidth() / 2,
						'top': element.outerHeight() / 2,
						'margin-left': $(this).outerWidth() / -2,
						'margin-top': $(this).outerHeight() / -2,
						'-webkit-transform': 'rotate(' + angle + 'deg)',
						'-moz-transform': 'rotate(' + angle + 'deg)',
						'-ms-transform': 'rotate(' + angle + 'deg)',
						'-o-transform': 'rotate(' + angle + 'deg)',
						'transform': 'rotate(' + angle + 'deg)'
					});
					
				});
				
				
				element.on('click', function (e) {
					e.preventDefault();
					
					element.picstack('next');
				});

			});

		},
		
		next: function () {
			
			var element = $(this),
				pic		= element.children().last(),
				xoffset	= element.outerWidth(),
				yoffset = element.outerHeight();
				
			pic.animate({
				'left': xoffset * 1.5,
				'top': yoffset * 1.5,
			}, 300, function () {
				
				pic.prependTo(element);
				
				pic.animate({
					'left': xoffset /2,
					'top': yoffset /2
				}, 300);
				
			});
			
		}

		
	}

	$.fn.picstack = function (method) {

		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {		
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist.' );
		}
	}

})(jQuery);