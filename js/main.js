Vue.filter('number', function (value) {
    var n = parseInt(value);
    return n.toLocaleString('en');
});

new Vue({
    el: 'body',
    props: ['search', 'maxResults', 'list'],
    data: {
        search: '',
        maxResults: 48,
        list: [],
        listDetails: []
    },
    computed: {
        currentYear: function () {
            var d = new Date();
            return d.getFullYear();
        }
    },
    methods: {
        buildRequestUrl: function (requestType, numVideos) {
            var apiKey = 'AIzaSyBc_Jr5X4lJXlSwXuBfA3u4cIx6MFTcuJA';
            var requestUrl = 'https://www.googleapis.com/youtube/v3/';
            var args = '';

            switch (requestType) {
                case 'search':
                    args = '&q=' + this.search.replace(' ', '+') + '+live';
                    args += '&maxResults=' + this.maxResults;
                    args += '&type=video&videoDefinition=high&videoDuration=long&videoEmbeddable=true';
                    break;

                case 'videos':
                    var videoIds = '';
                    for (var i = 0; i < numVideos; i++) {
                        if (i < numVideos - 1) {
                            videoIds += this.list[i].id.videoId + '%2C';
                        } else {
                            videoIds += this.list[i].id.videoId;
                        }
                    }
                    args = '%2Cstatistics&id=' + videoIds + '&fields=items(snippet%2Cstatistics)';
                    break;
            }

            requestUrl += requestType + '?part=snippet';
            requestUrl += args;
            requestUrl += '&key=' + apiKey;
            return requestUrl;
        },
        fetchVideoList: function () {
            var requestType = 'search';
            var requestUrl = this.buildRequestUrl(requestType);

            this.$http
                .jsonp(requestUrl)
                .then(function (response) {
                    this.list = response.data.items;
                    var numVideos = response.data.items.length;
                    this.fetchVideoDetails(numVideos);
                }, function () {
                    return 'There was an error with the request.';
                });
        },
        fetchVideoDetails: function (numVideos) {
            var requestType = 'videos';
            var requestUrl = this.buildRequestUrl(requestType, numVideos);

            this.$http
                .jsonp(requestUrl)
                .then(function (response) {
                    this.listDetails = response.data.items;
                }, function () {
                    return 'There was an error with the request.'
                });
        },
        convertPublishedAt: function (publishedAt) {
            var date = new Date(publishedAt)
                .toString();
            var month = date.substr(4, 3),
                day = date.substr(8, 2),
                year = date.substr(11, 4);
            day = parseInt(day, 10);
            date = month + ' ' + day + ' ' + year;
            return date;
        },
        openLightbox: function (videoId) {
            var lightbox = lity();
            lightbox('//www.youtube.com/watch?v=' + videoId);
        }
    }
});