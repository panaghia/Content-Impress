/*
---
description: Content Impress - Highlight web page content

license: MIT-style

authors:
- Sergio Panagia (http://panaghia.it)

requires:
- Element.Event
- Fx.Tween
- Element.Style
- Element.Dimenstions
- String
- Array

provides: [Impress]

...
*/

var Impress = new Class(
{
	Implements: [Options, Events],
	options:{
		color: '#333',
		opacity: .9,
		onHover: false,
		toImpressOnHover: [],
		active: false
	},
	initialize: function(options)
	{
		this.setOptions(options);
		this.render();
	},
	render: function()
	{
		if(this.options.onHover)
		{
			var context = this;
			$$(this.options.toImpressOnHover).each(function(el, i)
			{
				el.addEvent('mouseenter', function()
				{
					if(context.options.onHover)
						context.activate(this);
				});
				el.addEvent('mouseleave', function()
				{
					$$('._impress_block_').dispose();
					context.options.active = false;
				});
				
			});
		}		
	},
	activateOnHover: function(flag)
	{
		this.options.onHover = flag;
		if(flag == false && this.options.active)
		{
			this.deactivate();
		}
	},
	isActive: function()
	{
		return this.options.active;
	},
	activate: function(el)
	{
		if(!this.options.active)
		{
			this.options.active = false; //force it
			this.toggle(el);
		}
	},
	deactivate: function()
	{
		if(this.options.active)
		{
			this.options.active = false;
			this.removeBounds();
		}
	},
	toggle: function(el)
	{
		if(!this.options.active)
		{
			var color = this.options.color;
			var opacity = this.options.opacity;
			
			
			var elWidth = el.getSize().x;
			var elHeight = el.getSize().y;
			var elPosx = el.getPosition().x;
			var elPosy = el.getPosition().y;
			
			var top = new Element('div', {id: '_impress_top_', 'class': '_impress_block_'});
			var left = new Element('div', {id: '_impress_left_', 'class': '_impress_block_'});
		
			var right = new Element('div', {id: '_impress_right_', 'class': '_impress_block_'});
		
			var bottom = new Element('div', {id: '_impress_bottom_', 'class': '_impress_block_'});
		
			
			//LEFT BLOCK
			var leftWidth =  elPosx - 0;
			var leftHeight = $(document.body).getSize().y;
			var leftPosx = 0;
			var leftPosy = 0;
			left.inject(document.body);
			left.setStyles(
			{
				'position':'fixed',
				'top': leftPosy,
				'left': leftPosx,
				'width': leftWidth,
				'height': leftHeight,
				'backgroundColor': color,
				'opacity': opacity,
				'z-index': 999
			});
			
			//RIGHT BLOCK
			var rightWidth = $(document.body).getSize().x - elPosx + elWidth;
			var rightHeight = $(document.body).getSize().y;
			var rightPosx = elPosx + elWidth;
			var rightPosy = 0;
			right.inject(document.body);
			right.setStyles(
			{
				'position':'fixed',
				'top': rightPosy,
				'left': rightPosx,
				'width': rightWidth,
				'height': rightHeight,
				'backgroundColor': color,
				'opacity': opacity,
				'z-index': 999
			});
			
			//TOP BLOCK
			//var topWidth = $(document.body).getSize().x;
			var topWidth = $(document.body).getComputedSize().width;
			var topHeight = elPosy;
			var topPosx = 0;
			var topPosy = 0;
			top.inject(document.body);
			top.setStyles(
			{
				'position':'absolute',
				'top': topPosy,
				'left': topPosx,
				'width': topWidth,
				'height': topHeight,
				'backgroundColor': color,
				'opacity': opacity,
				'z-index': 999
			});
					
			//BOTTOM BLOCK
			var bottomWidth = topWidth;
			var bottomHeight = $(document.body).getSize().y - elPosy - elHeight;
		
			var D = document;
			var bodyH = 
			Math.max(
			Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
		Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
		Math.max(D.body.clientHeight, D.documentElement.clientHeight)
		);
		    		
			var bottomHeight = bodyH - elPosy - elHeight;
			
			var bottomPosy = elPosy + elHeight;
			var bottomPosx = 0;
			bottom.inject(document.body);
			bottom.setStyles(
			{
				'position':'absolute',
				'top': bottomPosy,
				'left': bottomPosx,
				'width': bottomWidth,
				'height': bottomHeight,
				'backgroundColor': color,
				'opacity': opacity,
				'z-index': 999
			});
			
			$$('._impress_block_').addEvent('click', function()
			{
				this.removeBounds();
				this.options.active = false;
			}.bind(this));
			
			
		}
		else
		{
			this.removeBounds();
		}
		this.options.active = !this.options.active;

	},
	removeBounds: function()
	{
		$$('._impress_block_').set('tween', 
		{
			duration:500,
			onComplete: $$('._impress_block_').destroy.bind(this)
			
		});
		$$('._impress_block_').fade('out');
		this.fireEvent('close');		
	}
});