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
                    <span>00:00</span> / <span>00:00</span>
                </div>
                <div class="${styles['video-full']}">
                    <i class="iconfont icon-video-full"></i>
                </div>
                <div class="${styles['video-volume']}">
                    <i class="iconfont icon-video-volume"></i>
                    <div class="${styles['video-volprogress']}">
                        <div class="${styles['video-volprogress__now']}"></div>
                        <div class="${styles['video-volprogress__suc']}"></div>
                        <div class="${styles['video-pvolprogress__bar']}"></div>
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

    }
}

export default video;