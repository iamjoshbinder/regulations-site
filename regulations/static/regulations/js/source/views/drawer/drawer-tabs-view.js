define(['jquery', 'underscore', 'backbone', 'drawer-controller'], function($, _, Backbone, DrawerEvents) {
    'use strict';
    var DrawerTabsView = Backbone.View.extend({
        el: '.toc-head',

        events: {
            'click .toc-toggle': 'openDrawer',
            'click .toc-nav-link': '_updatePaneTabs'
        },

        idMap: {
            'table-of-contents': '#menu-link',
            'timeline': '#timeline-link',
            'search': '#search-link'
        },

        initialize: function() {
            DrawerEvents.on('pane:change', this._changeActiveTab, this);
            this.$activeEls = $('#menu, #site-header, #content-body, #primary-footer');

            // view switcher buttons - TOC, calendar, search
            this.$tocLinks = $('.toc-nav-link');
            this.$toggleArrow = $('#panel-link');

            // For browser widths above 1100px apply the 'open' class
            if (document.documentElement.clientWidth > 1100) {
                this.$toggleArrow.addClass('open');
            }

            // set initial drawer state
            this.drawerState = (this.$toggleArrow.hasClass('open')) ? 'open' : 'closed';
        },

        _changeActiveTab: function(tab) {
            this.$tocLinks.removeClass('current');
            $(this.idMap[tab]).addClass('current');

            if ($('.panel').css('left') === '-200px') {
                this.openDrawer();
            }
        },

        // this.$activeEls are structural els that need to have
        // CSS applied to work with the drawer conditionally based
        // on its state
        reflowUI: function() {
            if (typeof this.$activeEls !== 'undefined') {
                this.$activeEls.toggleClass('active');
            }
        },

        openDrawer: function(e) {
            if (e) {
                e.preventDefault();
            }

            this._toggleDrawerState();
        },

        // figure out whether drawer should open/close
        // tell surrounding elements to update accordingly
        // update the open/close arrow
        // set state
        _toggleDrawerState: function() {
            var state = (this.$toggleArrow.hasClass('open')) ? 'close' : 'open';
            this.reflowUI();
            this.$toggleArrow.toggleClass('open');
            this.drawerState = state;
        },

        // update active pane based on click or external input
        _updatePaneTabs: function(e) {
            e.preventDefault();

            var $target = $(e.target),
                linkValue = _.last($target.closest('a').attr('href').split('#'));
            this.activePane = linkValue;

            DrawerEvents.trigger('pane:change', linkValue);
        }
    });

    var drawerTabs = new DrawerTabsView();
    return drawerTabs;
});