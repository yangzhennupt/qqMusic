export const MUTATIONS = {
		getAll(state, obj) {
			state.sliderList = obj.data.data.slider;
			state.radioList = obj.data.data.radioList;
		},
		changeActiveIndex(state, index) {
			state.activeIndex = index;
		},
		changShowminiPlay(state, flag) {
			state.isShowminiPlay = flag;
		},
		changeFullScreen(state, flag) {
			state.fullScreen = flag;
		},
		changAudio(state, obj) {
			state.audio.src = "http://ws.stream.qqmusic.qq.com/" + obj.songid + ".m4a?fromtag=46";
			state.audio.imgurl = "https://y.gtimg.cn/music/photo_new/T002R500x500M000" + obj.albummid + ".jpg"
		},
		play(state, flag) {
			state.isPlay = flag;
			console.log(state.musicList);

		},
		getDom(state, dom) {
			state.dom = dom;
		},
		changeMusic(state, index) {
			if (state.musicList[index].data) {
				state.audio.src = "http://ws.stream.qqmusic.qq.com/" + state.musicList[index].data.songid + ".m4a?fromtag=46";
				state.audio.imgurl = "https://y.gtimg.cn/music/photo_new/T002R500x500M000" + state.musicList[index].data.albummid + ".jpg";
				let singerList = [];
				state.musicList[index].data.singer.forEach(function(v, i) {
					singerList.push(v.name);
				})
				state.audio.singer = singerList.join('/');
				state.audio.name = state.musicList[index].data.songname || state.musicList[index].data.name;
			} else {
				state.audio.src = "http://ws.stream.qqmusic.qq.com/" + state.musicList[index].id + ".m4a?fromtag=46";


				state.audio.singer = state.musicList[index].singer;
				state.audio.name = state.musicList[index].name;
			}
			state.audio.index = index;
		}
	}