console.log("Script loaded");


//change theme work
let currentTheme= getTheme();
//initially
document.addEventListener("DOMContentLoaded",() =>{
    changeTheme();
});
//TODO
function changeTheme(){
    //set the web page
    changePageTheme(currentTheme, currentTheme);
    //set the listener to  change theme button
    const changeThemeButton=document.querySelector("#theme_change_button");
    
    changeThemeButton.addEventListener("click",(event)=>{
        const oldTheme=currentTheme;
        if(currentTheme==="dark"){
            //theme set to light
            currentTheme="light";
        }else{
            //theme set to dark
            currentTheme="dark";
        }
        changePageTheme(currentTheme,oldTheme);
    });
}
    //set theme to localStorage
    function setTheme(theme){
        localStorage.setItem("theme",theme);
    }
    //get theme from localStorage
    function getTheme(){
        let theme=localStorage.getItem("theme");
        return theme? theme: "light";
    }
    //change current page theme
    function changePageTheme(theme,oldTheme){
        //update in localStorage
        setTheme(currentTheme);
        //remove current theme
        document.querySelector("html").classList.remove(oldTheme);
        //set the current theme
        document.querySelector("html").classList.add(theme);
        //change the text of button
        document.querySelector("#theme_change_button").querySelector("span").textContent=theme=="light" ? "Dark":"Light";
    }
