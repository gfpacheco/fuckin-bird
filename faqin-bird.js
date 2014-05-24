var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

faqin.Config = {
  viewport: {
    x: 3,
    y: 5,
    width: 6,
    height: 10,
    type: 'xFixed',
    xFixed: 1
  },
  floor: {
    x: 3,
    y: 9,
    width: 6,
    height: 2,
    velocity: new faqin.Vector(2.5, 0),
    fill: 'rgba(20, 200, 20, 255)'
  },
  bird: {
    x: 1,
    y: 3,
    width: 0.6,
    height: 0.6,
    velocity: new faqin.Vector(2.5, 0),
    dynamic: true,
    gravity: 10,
    fill: 'rgba(255, 255, 0, 255)'
  },
  pipes: {
    simple: [
      new faqin.Rect({
        x: 0.5,
        y: 1.2,
        width: 0.6,
        height: 2.4,
        fill: 'rgba(20, 200, 20, 255)'
      }), new faqin.Rect({
        x: 0.5,
        y: 2.5,
        width: 1,
        height: 0.6,
        fill: 'rgba(20, 200, 20, 255)'
      }), new faqin.Rect({
        x: 0.5,
        y: 5.5,
        width: 1,
        height: 0.6,
        fill: 'rgba(20, 200, 20, 255)'
      }), new faqin.Rect({
        x: 0.5,
        y: 6.8,
        width: 0.6,
        height: 2.4,
        fill: 'rgba(20, 200, 20, 255)'
      })
    ]
  }
};

faqin.Bird = (function(_super) {
  __extends(Bird, _super);

  function Bird(options) {
    this.flap = __bind(this.flap, this);
    Bird.__super__.constructor.apply(this, arguments);
    window.addEventListener('click', (function(_this) {
      return function() {
        return _this.flap();
      };
    })(this));
    window.addEventListener('keydown', (function(_this) {
      return function() {
        return _this.flap();
      };
    })(this));
  }

  Bird.prototype.flap = function() {
    this.velocity.y = -5;
    return this;
  };

  return Bird;

})(faqin.Rect);

faqin.Game = (function() {
  function Game() {
    this.addEventListeners = __bind(this.addEventListeners, this);
    this.createPipe = __bind(this.createPipe, this);
    this.createBird = __bind(this.createBird, this);
    this.createFloor = __bind(this.createFloor, this);
    this.stop = __bind(this.stop, this);
    this.start = __bind(this.start, this);
    this.engine = new faqin.Engine({
      canvas: document.getElementById('gameCanvas'),
      viewport: new faqin.Viewport(faqin.Config.viewport),
      fps: 48,
      debug: true
    });
    this.pipes = [];
    this.lastPipeX = 3.3;
    this.createFloor();
    this.createBird();
    this.addEventListeners();
    this.start();
  }

  Game.prototype.start = function() {
    this.createPipe();
    setTimeout((function(_this) {
      return function() {
        return _this.createPipe();
      };
    })(this), 1500);
    return this.engine.start();
  };

  Game.prototype.stop = function() {
    this.engine.pause();
    return clearInterval(this.pipesInterval);
  };

  Game.prototype.createFloor = function() {
    return this.engine.solids.push(new faqin.Rect(faqin.Config.floor));
  };

  Game.prototype.createBird = function() {
    this.bird = new faqin.Bird(faqin.Config.bird);
    this.engine.viewport.anchor = this.bird;
    return this.engine.solids.push(this.bird);
  };

  Game.prototype.createPipe = function() {
    var hidden, pipe, solid, _i, _len, _ref;
    console.log('createPipe');
    this.lastPipeX += 3.75;
    pipe = [];
    hidden = 0;
    _ref = faqin.Config.pipes.simple;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      solid = _ref[_i];
      solid = clone(solid);
      solid.x += this.lastPipeX;
      solid.addEventListener('hide', (function(_this) {
        return function() {
          hidden++;
          if (hidden === faqin.Config.pipes.simple.length) {
            return _this.createPipe();
          }
        };
      })(this));
      pipe.push(solid);
      this.engine.solids.push(solid);
    }
    return this.pipes.push(pipe);
  };

  Game.prototype.addEventListeners = function() {
    return this.bird.addEventListener('collide', (function(_this) {
      return function() {
        return _this.stop();
      };
    })(this));
  };

  return Game;

})();

window.onload = function() {
  return new faqin.Game;
};
