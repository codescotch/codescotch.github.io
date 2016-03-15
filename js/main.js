new Vue({
    el: 'body',
    props: ['search', 'maxResults', 'list'],
    data: {
        search: '',
        maxResults: 48,
        list: []
    },
    methods: {
        fetchVideoList: function () {
            var requestUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet';
            requestUrl += '&q=' + this.search.replace(' ', '+') + ' live';
            requestUrl += '&maxResults=' + this.maxResults;
            requestUrl += '&type=video&videoDefinition=high&videoDuration=long&videoEmbeddable=true&key=AIzaSyBc_Jr5X4lJXlSwXuBfA3u4cIx6MFTcuJA';
            console.log(requestUrl);
            // var vm = this;

            this.$http
                .jsonp(requestUrl)
                .then(function (response) {
                    this.list = response.data.items;
                }, function (response) {
                    // callback error
                });
            // console.log(this.list);
            // this.$http.get('/someUrl', [data], [options]).then(successCallback, errorCallback);
        }
    }
});