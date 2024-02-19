const regioninfo = document.getElementById("regioninfo");
const level = document.getElementById("level");
const category = document.getElementById("category");
const input = document.getElementById("input_1");
const region = document.getElementById("region_input");
const levelcontainer = document.getElementById("uv_level_content");
const toggle = document.getElementById("uv_level_content");
const leftheader = document.getElementById("uv_level_content_left")

input.addEventListener("submit", async (e) => {
    toggle.classList.toggle('show');
    e.preventDefault();

    try{
        const data1 = await axios.post("/api/v1/uv-index",
        {
            city_name: region.value
        });
    displayCategory(data1.data);
    }catch(e) {
        console.log(e);
    }

})

function displayCategory(data){
    currentuv = data.uv_current;
    level.innerText = currentuv;

    if(currentuv < 3){
        levelcontainer.style.backgroundColor = "rgb(123, 183, 51)";
        leftheader.style.backgroundColor = "rgb(80, 122, 29)";
        category.innerText = "Low";
    }
    else if(currentuv < 6){
        levelcontainer.style.backgroundColor = "rgb(246, 178, 10)";
        leftheader.style.backgroundColor = "rgb(212, 163, 42)";
        category.innerText = "Moderate";
    }
    else if(currentuv < 8){
        levelcontainer.style.backgroundColor = "rgb(239, 134, 21)";
        leftheader.style.backgroundColor = "rgb(207, 118, 21)";
        category.innerText = "High";
    }
    else if(currentuv < 11){
        levelcontainer.style.backgroundColor = "rgb(224, 64, 41)";
        leftheader.style.backgroundColor = "rgb(177, 42, 22)";
        category.innerText = "Very High";
    }
    else{
        levelcontainer.style.backgroundColor = "rgb(168, 95, 154)";
        leftheader.style.backgroundColor = "rgb(149, 42, 128)";
        category.innerText = "Extreme";
    }
}
