var AdaptivePlayer = function($el, options){
    this.$el = $el;
    this.cover = options.cover;
    this.file = options.file;

    this.size = 300;

    this.initialize();
};

AdaptivePlayer.prototype.initialize = function(){
    this.$audio = new Audio(this.file);
    this.$audio.controls = true;
    this.$audio.volume = 0;

    /* RENDER
        <div class="cover">
            <img class="greyscale" src="{{cover}}" />
            <div class="overlay">
                <img src="{{cover}}" />
            </div>
        </div>
        <audio class="sound" src="{{file}}" controls></audio>
    */
    var cover = $('<img />').attr('src', this.cover);
    this.$cover = $('<div class="cover"></div>');
    this.$overlay = $('<div class="overlay"></div>');

    this.$overlay.append(cover.clone());
    this.$cover.append(cover.clone().addClass("greyscale")).append(this.$overlay);
    this.$el.append(this.$cover).append(this.$audio);

    this.bindEvents();
};

AdaptivePlayer.prototype.bindEvents = function(){
    var that = this;
    this.$cover.on('click', function(e){
        var position = (e.pageX - $(e.target).offset().left) / that.size;
        that.setTime(position);
    });
};

AdaptivePlayer.prototype.setTime = function(position){
    this.$audio.currentTime = position * this.$audio.duration;
    this.setOverlay(position);
};

AdaptivePlayer.prototype.setOverlay = function(position){
    this.$overlay.width(Math.round(position * this.size));
};

AdaptivePlayer.prototype.play = function(){
    this.$audio.play();
    var that = this;
    this.interval = setInterval(function(){
        that.checkPosition();
    }, 100);
};

AdaptivePlayer.prototype.pause = function(){
    this.$audio.pause();
    clearInterval(this.interval);
};

AdaptivePlayer.prototype.checkPosition = function(){
    var position = this.$audio.currentTime / this.$audio.duration;
    this.setOverlay(position);
};