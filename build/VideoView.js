(function() {
  var $, VideoView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('diso.view');

  $ = require('jquery');

  VideoView = (function(_super) {
    __extends(VideoView, _super);

    function VideoView() {
      return VideoView.__super__.constructor.apply(this, arguments);
    }

    VideoView.prototype.model_name = 'video';

    VideoView.prototype.run = function() {
      var $body, $iframe, fullscreen;
      if (this.video.size === 'FULLSCREEN') {
        $body = $('body');
        $iframe = $('iframe');
        fullscreen = function() {
          $iframe.width($body.width());
          return $iframe.height($body.height());
        };
        fullscreen();
        return $(window).resize(fullscreen);
      }
    };

    VideoView.prototype.playerUrl = function() {
      var autoplay, controls, id, path, type, url, _loop, _ref;
      _ref = this.video.slug.split(':'), type = _ref[0], id = _ref[1];
      switch (type) {
        case 'youtube':
          autoplay = this.video.autoplay ? 1 : 0;
          controls = 'controls' in this.video ? this.video.controls ? 1 : 0 : 1;
          _loop = this.video.loop ? 1 : 0;
          path = id.length > 11 ? "videoseries?list=" + id + "&" : "" + id + "?";
          return url = "https://www.youtube.com/embed/" + path + "autoplay=" + autoplay + "&controls=" + controls + "&enablejsapi=1&loop=" + _loop + "&showinfo=0&autohide=1";
        case 'vimeo':
          return "https://player.vimeo.com/video/" + id;
        default:
          throw new Error("Unsupported video type");
      }
    };

    VideoView.prototype.template = function() {
      var height, url, width, _ref;
      _ref = this.video.size === 'FULLSCREEN' ? [500, 300] : this.video.size, width = _ref[0], height = _ref[1];
      url = this.playerUrl();
      return "<iframe type=\"text/html\" width=\"" + width + "\" height=\"" + height + "\" src=\"" + url + "\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";
    };

    return VideoView;

  })(View.Model);

  module.exports = VideoView;

}).call(this);
