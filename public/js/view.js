var View = new Class({
  Implements: [Options, Events],
  options: {
    /*
    onShow: $empty,
    onHide: $empty,
    onSetup: $empty,
    onInit: $empty,
    onClear: $empty,
    */
    onOpen: function() {
      if (!this.fresh) {
        this.fireEvent('clear')
        this.fireEvent('setup')
      }
      this.fireEvent('show')
      this.fireEvent('init')
      this.active = true
    },
    onClose: function() {
      this.fireEvent('cleanUp')
      this.fireEvent('hide')
      this.active = false
    },
    onReset: function() {
      if(this.active) {
        this.fireEvent('cleanUp')
        this.fireEvent('clear')
        this.fireEvent('setup')
        this.fireEvent('init')
      } else {
        this.fresh = false
      }
    }
  },
  initialize: function(options) {
    this.setOptions(options);
    this.active = false
    this.fresh = false
    this.views = []
    this.fireEvent('hide')
  },
  push: function(newView) {
    if(!newView) {
      return this
    }
    newView.close()
    newView.addEvent('open', this.open.bind(this))
    this.addEvent('close', newView.close.bind(newView))
    this.views.each(function(view) {
      newView.addEvent('open', function() {
        view.close()
      })
      view.addEvent('open', function() {
        newView.close()
      })
    })
    this.views.push(newView)
    return this
  },
  reset: function() {
    this.fireEvent('reset')
    return this
  },
  open: function() {
    if(!this.active) {
      this.fireEvent('open')
    }
    return this
  },
  close: function() {
    if(this.active) {
      this.fireEvent('close')
    }
    return this
  }
})

var ElementView = new Class({
  Extends: View,
  initialize: function(id) {
    this.parent({
      onShow: function() {
        $(id).setStyle('display','');
      },
      onHide: function() {
        $(id).setStyle('display','none');
      }
    })
  }
})

$$$ = (function() {
  var views = []
  return function(id) {
    if (id) {
      if(views[id]) { return views[id] }
      view = views[id] = new ElementView(id)
      return view
    } else {
      return new View()
    }
  }
})()