window.onload=function()
{
    document.getElementById("log").onclick = login;
    document.getElementById("log").onmouseover = f1;
    document.getElementById("log").onmouseout = f2;
}
var info = [];
var nr=1;
function login()
{
    var ok=0;
    var OK=1;
    var date = {
        username: document.getElementById("username").value,
        password: document.getElementById("parola").value
        
    }
    nume = document.getElementById("username").value;
    parola = document.getElementById("parola").value;
    for (var i=0;i<info.length;i++)
    {
        if (info[i]['username']==nume)
        {
            ok=1;
            if(info[i]['password']!==parola){
                OK = 0;
            }
        }
    }
    $.post({
        url:"http://localhost:3000/DateLogin",
        data: date
       })
     nr++;
    if(OK==0)
    {
        alert("Parola incorecta!");
    }
    else if (ok==0)
    {
     info.push(date);
     localStorage.setItem("DateLogin", JSON.stringify(info));
     alert("Nu erati inregistrat! Contul a fost acum creat! :)");
     window.open("cont_nou.html");
    }
    else {
          window.open("cont_vechi.html");
          ok=0;
          OK=1;
         }
}

function f1()
{
    document.getElementById("log").style.backgroundColor="dimgray";
    document.getElementById("log").style.color="white";
}

function f2()
{
    document.getElementById("log").style.backgroundColor="white";
    document.getElementById("log").style.color="black";
}