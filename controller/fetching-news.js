const {auth_error,
       bad_request,
       custom_api_error} = require('../error/driver-error')

// this is for fetching the news
const fetch_news = async(req, res, next) => { 
    var url = 'https://newsapi.org/v2/everything?' +
          'q=Weather and Climate Change&' +
          'from=2024-01-02&' +
          'sortBy=popularity&' +
          `apiKey=${process.env.API_NEWS_KEY}`;
    
    fetch(url)
    .then((obj)=>{
        if(!obj)throw new bad_request("something went wrong");
        return obj.json();
    })
    .then((result)=>{
        return  res.status(200).json({data : result})
    })
}

module.exports = {fetch_news};
