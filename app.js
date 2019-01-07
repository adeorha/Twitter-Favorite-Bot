var Twitter = require('twitter');
var config = require('./config.js');
var T = new Twitter(config);

// Set up your search parameters
var params = {
    q: '#nodejs',
    count: 1,
    result_type: 'recent',
    lang: 'en',
    tweet_mode: 'extended'
  }

  T.get('search/tweets', params, function(err, data, response) {
    if(!err){
      for(let i = 0; i < data.statuses.length; i++){
        let id = { id: data.statuses[i].id_str }
        T.post('favorites/create', id, function(err, response){
          if(err){
            console.log(err[0].message);
          }
          else{
            let username = response.user.screen_name;
            let tweetId = response.id_str;
            console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`)
            console.log(data.statuses[i].retweeted_status.full_text)
          }
        });
      }
    } else {
      console.log(err);
    }
  })