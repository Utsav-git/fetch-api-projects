const getNews = async() => {
    const response = await fetch('http://www.omdbapi.com/?apikey=8f532db0&i=tt1285016');
    const data = await response.json();

    return data;
};

getNews()
    .then(data => console.log("resolved: ",data))

