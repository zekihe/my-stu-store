import * as minify from "../../../node_modules/_@types_html-minifier-terser@5.1.0@@types/html-minifier-terser/index";

// webcpack方式
let styles = require('./video.css');

interface Ivideo {
    url?: string,
    elem?: string | HTMLElement;
    width?: string,
    height?: string,
    autoplay?: boolean
}

interface Icomponent {
    tempContainer: HTMLElement;
    init: () => void;
    template: () => void;
    handle: () => void;

}

function video ( options: Ivideo ) {
    return new Video(options)
}

class Video implements Icomponent {
    tempContainer;
    constructor(private settings : Ivideo) {
        this.settings = Object.assign({
            width: '100%',
            height: '100%',
            autoplay: false
        }, this.settings);
        this.init();
    }
    init() {
        this.template();
        this.handle();
    }
    template () {
        this.tempContainer = document.createElement('div');
        this.tempContainer.className = styles.video;
        this.tempContainer.style.width = this.settings.width;
        this.tempContainer.style.height = this.settings.height;
        this.tempContainer.innerHTML = `
            <video class="${styles['video-content']}" src="${this.settings.url}"></video>
            <div class="${styles['video-play-btn']}"></div>
            <div class="${styles['video-controls']}">
                <div class="${styles['video-progress']}">
                    <div class="${styles['video-progress__now']}"></div>
                    <div class="${styles['video-progress__suc']}"></div>
                    <div class="${styles['video-progress__bar']}"></div>
                </div>
                <div class="${styles['video-play']}">
                    <i class="iconfont icon-video-play"></i>
                </div>
                <div class="${styles['video-time']}">
                    <span class="cur">00:00</span> / <span class="dur">00:00</span>
                </div>
                <div class="${styles['video-full']}">
                    <i class="iconfont icon-video-full"></i>
                </div>
                <div class="${styles['video-volume']}">
                    <i class="iconfont icon-video-volume"></i>
                    <div class="${styles['video-volprogress']}">
                        <div class="${styles['video-volprogress__now']}"></div>
                        <div class="${styles['video-volprogress__bar']}"></div>
                    </div>
                </div>
            </div>
        `;
        if(typeof this.settings.elem === 'object') {
            this.settings.elem.appendChild(this.tempContainer);
        } else {
            document.querySelector(`${this.settings.elem}`).appendChild(this.tempContainer);
        } 
        
    }
    handle() {
        // video元素
        let videoContent : HTMLVideoElement = this.tempContainer.querySelector(`.${styles['video-content']}`);
        // 控制组
        let videoControls = this.tempContainer.querySelector(`.${styles['video-controls']}`);
        let videoPlay = this.tempContainer.querySelector(`.${styles['video-play']}`);
        let videoPlayBtn = this.tempContainer.querySelector(`.${styles['video-play-btn']}`);
        let videoTimes = this.tempContainer.querySelectorAll(`.${styles['video-time']} span`);
        let videoFull = this.tempContainer.querySelector(`.${styles['video-full']} i`);
        let videoProgress = this.tempContainer.querySelectorAll(`.${styles['video-progress']} div`);
        let videoVolProgress = this.tempContainer.querySelectorAll(`.${styles['video-volprogress']} div`);
        let videoVolume = this.tempContainer.querySelector(`.${styles['video-volume']} i`);

        let timer, state = {
            error: !1,
            loading: !1, 
            playing: !1
        };
        videoContent.volume = 0.5;
        videoContent.autoplay = true;
        
        Object.defineProperty(state, 'loading', {
            get: function () {
                console.log('get val loading')
                return this._loading
            },
            set: function (newValue) {
                this._loading = newValue;
                console.log('set loading', newValue); //成功触发方法打印出设置的值
            }
        });

        Object.defineProperty(state, 'playing', {
            get: function () {
                console.log('get val playing')
                return this._playing
            },
            set: function (newValue) {
                this._playing = newValue;
                console.log('set playing', newValue); //成功触发方法打印出设置的值
            }
        });

        // 
        videoContent.addEventListener('error', () => {
            console.log('error');
            state.error = !0;
        });

        videoContent.addEventListener('loadstart', () => {
            console.log('loadstart');
            
        });
        videoContent.addEventListener('waiting', (e) => {
            console.log('waiting', state.playing);
            console.log('waiting', state);
            state.playing && (state.loading = !0);
        });
        videoContent.addEventListener('seeked', (e) => {
            console.log('seeked');
            state.loading = !1;
        });

        // video是否加载完毕
        videoContent.addEventListener('canplay', () => {
            console.log('canplay');
            state.loading = !1;
            videoTimes[1].innerHTML = timeFormat(videoContent.duration);
        });

        // video play
        videoContent.addEventListener('play', () => {
            state.loading = !1;
            state.playing = !0;
            timer = setInterval(playingTime, 300);
            videoPlay.querySelector('i').className = 'iconfont icon-video-pause';
            videoPlayBtn.style.display = 'none';
        });

        // video pause
        videoContent.addEventListener('pause', () => {
            state.loading = !1;
            state.playing = !1;
            clearInterval(timer);
            videoPlay.querySelector('i').className = 'iconfont icon-video-play';
            videoPlayBtn.style.display = 'block';
        });
        
        // video play and pause
        videoPlay.addEventListener('click', (e) => {
            if (videoContent.paused) {
                videoContent.play();
            } else {
                videoContent.pause();
            }
        });
        // video click pause
        videoContent.addEventListener('click', (e) => {
            if (videoContent.paused) {
                videoContent.play();
            } else {
                videoContent.pause();
            }
        });
        // video play 
        videoPlayBtn.addEventListener('click', (e) => {
            videoContent.play();
        });
        // video full 
        videoFull.addEventListener('click', (e) => {
            videoContent.requestFullscreen();
        });

        videoProgress[2].addEventListener('mousedown', function(e: MouseEvent) {
            console.log(e);
            let downX = e.pageX;
            let downL = this.offsetLeft;
            document.onmousemove = (e: MouseEvent) => {
                let scale = (e.pageX - downX + downL + 6) / this.parentNode.offsetWidth; 
                let endScale = 1 - (12 / this.parentNode.offsetWidth);

                if(scale < 0) {
                    scale = 0;
                } else if(scale > 1) {
                    scale = 1;
                }
                videoProgress[0].style.width = scale * 100 + '%';
                videoProgress[1].style.width = scale * 100 + '%';
                if( scale > endScale ) {
                    this.style.left = endScale * 100 + '%';
                } else {
                    this.style.left = scale * 100 + '%';
                }
                
                videoContent.currentTime = scale * videoContent.duration;
            }
            document.onmouseup = (e: MouseEvent) => {
                document.onmousemove = document.onmouseup = null;
            }
            e.preventDefault();
        });

        // video volume
        videoVolume.addEventListener('click', (e) => {
            if(videoContent.volume == 0) {
                videoContent.volume = 0.5;
                videoVolume.className = 'iconfont icon-video-volume';
                videoVolProgress[0].style.width = '50%';
                videoVolProgress[1].style.left = '50%';
            } else {
                videoContent.volume = 0;
                videoVolume.className = 'iconfont icon-video-mute';
                videoVolProgress[0].style.width = '0';
                videoVolProgress[1].style.left = '0';
            }
        });

        videoVolProgress[1].addEventListener('mousedown', function(e: MouseEvent) {
            console.log(e);
            let downX = e.pageX;
            let downL = this.offsetLeft;
            document.onmousemove = (e: MouseEvent) => {
                let scale = (e.pageX - downX + downL + 5) / this.parentNode.offsetWidth; 
                let endScale = 1 - (10 / this.parentNode.offsetWidth);

                videoVolume.className = 'iconfont icon-video-volume';
                if(scale < 0) {
                    scale = 0;
                    videoVolume.className = 'iconfont icon-video-mute';
                } else if(scale > 1) {
                    scale = 1;
                }
                videoVolProgress[0].style.width = scale * 100 + '%';
                if( scale > endScale ) {
                    this.style.left = endScale * 100 + '%';
                } else {
                    this.style.left = scale * 100 + '%';
                }
                
                videoContent.volume = scale;
            }
            document.onmouseup = (e: MouseEvent) => {
                document.onmousemove = document.onmouseup = null;
            }
            e.preventDefault();
        });

        function playingTime() {
            let scale = videoContent.currentTime / videoContent.duration;
            // 缓存节点时间/总时间
            let scaleSuc = videoContent.buffered.end(0) / videoContent.duration;
            videoTimes[0].innerHTML = timeFormat(videoContent.currentTime);
            videoProgress[0].style.width = scale * 100 + '%';
            videoProgress[1].style.width = scaleSuc * 100 + '%';
            videoProgress[2].style.left = scale * 100 + '%';
        }

        function timeFormat(number : number) : string {
            number = Math.floor(number);
            let min = Math.floor(number/60);
            let sec = number % 60;
            return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
        }
    }
}

export default video;