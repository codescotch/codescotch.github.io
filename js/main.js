new Vue({
    el: 'body',
    props: ['search', 'maxResults', 'list'],
    data: {
        search: '',
        maxResults: 12,
        list: []
    },
    methods: {
        fetchVideoList: function () {
            var apiKey = 'AIzaSyBc_Jr5X4lJXlSwXuBfA3u4cIx6MFTcuJA';
            var requestUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet';
            requestUrl += '&q=' + this.search.replace(' ', '+') + ' live';
            requestUrl += '&maxResults=' + this.maxResults;
            requestUrl += '&type=video&videoDefinition=high&videoDuration=long&videoEmbeddable=true&key=' + apiKey;

            this.$http
                .jsonp(requestUrl)
                .then(function (response) {
                    this.list = response.data.items;
                }, function (response) {
                    return 'There was an error with the request.';
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
        }
    }
});