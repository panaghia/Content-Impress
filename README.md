Content Impress
====================

Content Impress is a MooTools class to highlight a certain area of a web page trought removing information noise around it.

How to use
----------

There are two main way of using this plugin:

a) Activate by button

	var impress = new Impress({
			opacity: .9,
			color: '#333',
			onClose: function()
			{
				//restore button state
			}
		});

b) Activate on hover

	impress = new Impress({
			opacity: .9,
			color: '#333',
			onHover: true,
			toImpressOnHover: $$('.impress')
		});

c) Activate on Element
	 
	var el = document.id('element2Impress');
	el.impress();
	/* or */
	el.impress({
		opacity: .5,
		color: '#111'
	});
		
		
Screenshots
-----------

![Screenshot 1](http://dl.dropbox.com/u/5138746/impress.jpg)