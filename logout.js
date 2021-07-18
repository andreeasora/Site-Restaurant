window.onload=function()
{
    document.getElementById("logout").onclick = logout;
    document.getElementById("logout").onmouseover = f1;
    document.getElementById("logout").onmouseout = f2;
    document.getElementById("viz").onclick = viz;
    document.getElementById("act").onclick=actualizare;
}

function actualizare()
{
    var res=[];
    $.get({
        url:"http://localhost:3000/DateLogin"
    })
    .done((rez)=>{
        res = rez;
    })
    .then(()=>
    {
        var lungime = res.length;
        const parola = res[lungime-1].password;
        const id = res[lungime-1].id;
        const nume = document.getElementById('usernamenou').value;
        const DateNoi={
           username: nume,
           password: parola,
           id: id
        }
    
        $.ajax({
           type: "PUT",
           url:"http://localhost:3000/DateLogin?id="+id,
           data:DateNoi
        })
        document.getElementById("usernamenou").value = "";
   })
}

function viz()
{
    var res=[];
    $.get({
        url:"http://localhost:3000/DateLogin"
    })
    .done((rez)=>{
        res = rez;
    })
    .then(()=>
    {
        var lungime = res.length;
        alert("Nume de utilizator: "+ res[lungime-1].username+"\n"+"Parola: "+res[lungime-1].password);
    })
}

function logout()
{
  var res=[];
  $.get({
      url:"http://localhost:3000/DateLogin"
  })
  .done((rez)=>{
      res = rez;
  })
  .then(()=>
  {
    var lungime = res.length;
    var id = res[lungime-1].id;
    $.ajax({
        type: "DELETE",
        url:"http://localhost:3000/DateLogin?id="+id
    })
    alert("DECONECTARE!");
    Close();
  })
}

function Close()
{
    window.close();
}

function f1()
{
    document.getElementById("logout").style.backgroundColor="dimgray";
    document.getElementById("logout").style.color="white";
}

function f2()
{
    document.getElementById("logout").style.backgroundColor="white";
    document.getElementById("logout").style.color="black";
}

