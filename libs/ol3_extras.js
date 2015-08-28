/**
 *  (c) richard@nautoguide.com
 *
 */

/**
 *
 * Override the existing ol3 bbox as its too twitchy.
 *
 * We need to provide a buffer zone based on the resolution
 *
 * TODO: this is a hack for now, we need to add constructor & options for the buffer zone
 *
 * @param extent
 * @param resolution
 * @returns {*[]}
 */

ol.loadingstrategy.bbox = function(extent, resolution) {
    var buffer=500*resolution;
    extent[0]-=buffer;
    extent[1]-=buffer;
    extent[2]+=buffer;
    extent[3]+=buffer;
    return [extent];
};


/**
 *  Ol3 doesn't have a getLayer by name function as its assumed you
 *  will have object pointers. As we are dynamic we need layers by name
 *  so this is the ol3 version. For this to work you should have add a 'name' value
 *  to your layer
 *
 *  Note that with new grouping we must detect groups and look in there too.
 *
 *
 */

ol.Map.prototype.getLayer = function (name) {
    var self=this;
    var groups = self.getLayers().getArray();
    for (var g = 0; g < groups.length; g++) {
        if (groups[g] instanceof ol.layer.Group) {
            var layers = groups[g].getLayers().getArray();
            for (var i = 0; i < layers.length; i++) {
                if (layers[i].get('name') == name) {
                    return layers[i];
                }
            }
        } else {
            if (name == groups[g].get('name')) {
                return groups[g];
            }
        }
    }
    console.log('I failed to find layer: ' + name);
    return null;
}

ol.Map.prototype.getLayerGroupByName = function (name) {
    var self=this;
    var names=name.split(",");
    var groups = self.getLayers().getArray();
    var ret_groups=[];
    for (var g = 0; g < groups.length; g++) {
        if (groups[g] instanceof ol.layer.Group && names.indexOf(groups[g].get('name'))>-1) {
            var layers=groups[g].getLayers().getArray();
            for(var i=0;i<layers.length;i++)
                ret_groups.push(layers[i]);
        }
    }
    return ret_groups;
}

/**
 *
 * Simple  getGeomtryCenter
 *
 * @param geometry
 * @returns {*[]}
 */
ol.Map.prototype.getGeomtryCenter = function(geometry) {
    var extent=geometry.getExtent();
    var x = extent[0] + (extent[2]-extent[0])/2;
    var y = extent[1] + (extent[3]-extent[1])/2;
    return [x, y];
}

