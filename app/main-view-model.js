"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var platform_1 = require("platform");
var timer_1 = require("timer");
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel(mainpage) {
        var _this = _super.call(this) || this;
        _this.completed = false;
        _this._videoPlayer = mainpage.getViewById("nativeVideoPlayer");
        _this.currentTime = "";
        _this.videoDuration = "";
        _this.videoSrc = "~/videos/big_buck_bunny.mp4";
        _this.subtitlesSrc = "~/videos/sample.srt";
        _this.trackVideoCurrentPosition();
        return _this;
    }
    HelloWorldModel.prototype.setEnglishSubtitles = function () {
        this._videoPlayer.subtitles = "~/videos/sample.srt";
    };
    HelloWorldModel.prototype.setRussianSubtitles = function () {
        this._videoPlayer.subtitles = "~/videos/sample-ru.srt";
    };
    HelloWorldModel.prototype.disableSubtitles = function () {
        this._videoPlayer.subtitles = "";
    };
    /**
     * Video Finished callback
     */
    HelloWorldModel.prototype.videoFinished = function (args) {
        this.completed = true;
    };
    HelloWorldModel.prototype.playbackStart = function (args) {
        this.completed = false;
    };
    /**
     * Pause the video
     */
    HelloWorldModel.prototype.pauseVideo = function () {
        this._videoPlayer.pause();
    };
    /**
     * Play the video
     */
    HelloWorldModel.prototype.playVideo = function () {
        this._videoPlayer.play();
        this.completed = false;
    };
    /**
     * Stop the video player
     */
    HelloWorldModel.prototype.stopVideo = function () {
        if (platform_1.isAndroid) {
            this._videoPlayer.stop();
        }
    };
    /**
     * Get the video duration
     */
    HelloWorldModel.prototype.getVideoDuration = function () {
        var videoDuration = this._videoPlayer.getDuration();
        console.log("Video Duration: " + videoDuration);
        this.set("videoDuration", videoDuration);
    };
    /**
     * Go to 30 seconds
     */
    HelloWorldModel.prototype.goToTime = function () {
        try {
            this._videoPlayer.seekToTime(30000);
        }
        catch (err) {
            console.log(err);
        }
    };
    HelloWorldModel.prototype.animate = function () {
        var _this = this;
        console.log("Animation");
        var enums = require("ui/enums");
        this._videoPlayer.animate({
            rotate: 360,
            duration: 3000,
            curve: enums.AnimationCurve.spring
        }).then(function () {
            return _this._videoPlayer.animate({
                rotate: 0,
                duration: 3000,
                curve: enums.AnimationCurve.spring
            });
        }).then(function () {
            return _this._videoPlayer.animate({
                scale: { x: .5, y: .5 },
                duration: 1000,
                curve: enums.AnimationCurve.spring
            });
        }).then(function () {
            return _this._videoPlayer.animate({
                scale: { x: 1.5, y: 1.5 },
                duration: 3000,
                curve: enums.AnimationCurve.spring
            });
        }).then(function () {
            return _this._videoPlayer.animate({
                scale: { x: 1.0, y: 1.0 },
                duration: 3000,
                curve: enums.AnimationCurve.spring
            });
        });
    };
    HelloWorldModel.prototype.muteVideo = function () {
        this._videoPlayer.mute(true);
    };
    HelloWorldModel.prototype.unmuteVideo = function () {
        this._videoPlayer.mute(false);
    };
    /**
     * Get the video current time
     */
    HelloWorldModel.prototype.getVideoCurrentTime = function () {
        try {
            var currentTime = this._videoPlayer.getCurrentTime();
            console.log("Current Time: " + currentTime);
        }
        catch (err) {
            console.log(err);
        }
    };
    /**
     * Change the video src property
     */
    HelloWorldModel.prototype.changeVideoSource = function () {
        //  this._videoPlayer.src = "~/videos/test_video_rotated.mp4";
        //  return;
        if (this.videoSrc === "~/videos/small.mp4") {
            this._videoPlayer.src = "https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4";
        }
        else {
            this._videoPlayer.src = "~/videos/small.mp4";
        }
    };
    HelloWorldModel.prototype.trackVideoCurrentPosition = function () {
        var _this = this;
        var trackInterval = timer_1.setInterval(function () {
            var x, y;
            if (_this.completed) {
                x = "";
                y = "";
            }
            else {
                x = _this._videoPlayer.getCurrentTime();
                y = _this._videoPlayer.getDuration();
            }
            _this.set("currentTime", x);
            _this.set("videoDuration", y);
        }, 200);
        return trackInterval;
    };
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
