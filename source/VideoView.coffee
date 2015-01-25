View = require('diso.view')
$    = require('jquery')

class VideoView extends View.Model
  model_name : 'video'

  run : ()->
    if (@video.size is 'FULLSCREEN')
      $body = $('body')
      $iframe = $('iframe')

      fullscreen = ()->
        $iframe.width($body.width())
        $iframe.height($body.height())

      fullscreen()
      $(window).resize(fullscreen)

  playerUrl : ()->
    [type, id] = @video.slug.split(':')

    switch type
      when 'youtube'
        autoplay = if @video.autoplay then 1 else 0
        controls = if ('controls' of @video)
          if @video.controls then 1 else 0
        else
          1
        _loop = if @video.loop then 1 else 0

        path = if (id.length > 11)
          "videoseries?list=#{id}&"
        else
          "#{id}?"

        url = "https://www.youtube.com/embed/#{path}autoplay=#{autoplay}&controls=#{controls}&enablejsapi=1&loop=#{_loop}&showinfo=0&autohide=1"
      
      when 'vimeo'
        "https://player.vimeo.com/video/#{id}"

      else
        throw new Error("Unsupported video type")
    
  template : ()->
    [width, height] = if (@video.size is 'FULLSCREEN')
      [500, 300]
    else
      @video.size

    url = @playerUrl()

    """
    <iframe type="text/html" width="#{width}" height="#{height}" src="#{url}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
    """

module.exports = VideoView