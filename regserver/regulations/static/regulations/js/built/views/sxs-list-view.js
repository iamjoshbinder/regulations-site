define("sxs-list-view",["jquery","underscore","backbone","dispatch","sidebar-list-view","./folder-model","sxs-view"],function(e,t,n,r,i,s,o){var u=i.extend({el:"#sxs-list",events:{"click .sxs-link":"openSxS"},initialize:function(){this.model=new s({supplementalPath:"sidebar"}),this.render=t.bind(this.render,this),r.on("regSection:open:after",this.getSidebar,this),this.modifyListDisplay(),r.hasPushState===!1&&(this.events={})},openSxS:function(t){t.preventDefault();var n=e(t.target),i=n.data("sxs-paragraph-id"),s=n.data("doc-number");r.set("sxs-analysis",new o({regParagraph:i,docNumber:s,fromVersion:r.getVersion()}))},getSidebar:function(e){this.model.get(e,this.render)},render:function(t){var n=e(t),i=n.find("#sxs-list").html();this.$el.html(i),this.modifyListDisplay(),r.trigger("sidebar:update",n.find("#permalinks"))},modifyListDisplay:function(){var e=this.$el.find(".expand-drawer");e.children().length>0&&this.highlightHeader()},highlightHeader:function(){this.$el.find("header").addClass("has-content")}});return u});