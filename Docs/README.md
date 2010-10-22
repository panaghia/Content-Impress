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
		
		
		
Screenshots
-----------

![Screenshot 1](http://panaghia.it/imgs/content-impress.png)