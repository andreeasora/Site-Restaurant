window.onload=function()
{
    document.getElementById("btn").onmouseover = schimba1;
    document.getElementById("btn").onmouseout = schimba2;
    document.getElementById("btn2").onmouseover = schimba3;
    document.getElementById("btn2").onmouseout = schimba4;
    document.getElementById("vizualizare").onmouseover = schimba5;
    document.getElementById("vizualizare").onmouseout = schimba6;
    document.getElementById("vizualizare2").onmouseover = schimba7;
    document.getElementById("vizualizare2").onmouseout = schimba8;
    document.getElementById("btn2").onclick = is_checked;
    document.getElementById("btn").onclick = adauga;
    document.getElementById("nume").addEventListener("keydown", func1);
    document.getElementById("nume").addEventListener("keyup", func2);
    document.getElementById("prenume").addEventListener("keydown", func3);
    document.getElementById("prenume").addEventListener("keyup", func4);
    document.getElementById("adresa").addEventListener("keydown", func5);
    document.getElementById("adresa").addEventListener("keyup", func6);
    document.getElementById("oras").addEventListener("keydown", func7);
    document.getElementById("oras").addEventListener("keyup", func8);
    document.getElementById("nr").addEventListener("keydown", func9);
    document.getElementById("nr").addEventListener("keyup", func10);
    document.getElementById("vizualizare").onclick=afiseaza_modal;
    document.getElementById("vizualizare2").onclick=afiseaza_modal2;
    var ceas = setInterval(timer, 1000); 
}

function timer() 
{
  var d = new Date();
  var t = d.toLocaleTimeString();
  document.getElementById("ceas").innerHTML = t;
}

function validareEmail(email) 
{
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validareNume(nume)
{
    const result = /^[a-zA-Z ]+$/;
    return result.test(nume);
}

function not()
{
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/NotFound",
        statusCode:
        {
            200: function()
            {
                console.log("Succes!")
            },
            404: function()
            { 
                window.open("eroare.html")
            }
        }
    })
}

var comenzi=[];

var nr=1;

var adauga = (ev)=> //Arrow function
{
    ev.preventDefault();
    if (document.getElementById('nume').value==''||document.getElementById('prenume').value==''||document.getElementById('email').value==''||document.getElementById('adresa').value==''||document.getElementById('oras').value==''||document.getElementById('nr').value=='')
    {
        not();
        alert("Vă rugăm introduceți toate datele!");
    }
    else if (validareEmail(document.getElementById('email').value)==false)
    {
        alert("E-mail invalid!");
    }
    else if(validareNume(document.getElementById('nume').value)==false)
    {
        alert("Nume invalid!");
    }
    else if(validareNume(document.getElementById('prenume').value)==false)
    {
        alert("Prenume invalid! Dacă aveți două prenume, acestea trebuie scrise fără cratimă!");
    }
    else
   {
    var d = new Date();
    var zi = d.getDate();
    var luna = d.getMonth() + 1;
    var an = d.getFullYear();
    var ora = d.toLocaleTimeString();
    var comanda=
    {
        nume: document.getElementById('nume').value,
        prenume: document.getElementById('prenume').value,
        email: document.getElementById('email').value,
        adresa: document.getElementById('adresa').value,
        oras: document.getElementById('oras').value,
        nr_telefon: document.getElementById('nr').value,
        ora_comenzii: ora,
        data_comenzii: "zi: "+zi+" luna: "+luna+" an: "+an,
        comanda_corespunzatoare: nr,
        id: nr
        
    }
    $.post({
        url:"http://localhost:3000/DetaliiContact",
        data: comanda
    })
    comenzi.push(comanda);
    nr++;
    document.forms[0].reset();
    localStorage.setItem("DetaliiContact", JSON.stringify(comenzi));
    alert("Detalii adăugate cu succes!");
    DetaliiContact();
    var list=document.getElementById("creat");
    var el=creare("p","Cost transport: 15 lei!");
    el.id='transport_creat';
    el.classList.add('classList');
    list.appendChild(el);
   }
}

function creare(tag,text)
{
    var elnou=document.createElement(tag);
    var textnou=document.createTextNode(text);
    elnou.appendChild(textnou);
    return elnou;
}

function DetaliiContact()
{
    var det=[];
    $.get({
        url:"http://localhost:3000/DetaliiContact"
    })
    .done((rez)=>{
        det = rez;
    })
    .then(()=>
    {
      var lungime = det.length;
      document.getElementById('detcontact').innerHTML+="Detalii comanda "+ det[lungime-1].comanda_corespunzatoare+": "+"<br>";
      document.getElementById('detcontact').innerHTML+="Nume: "+det[lungime-1].nume+"<br>";
      document.getElementById('detcontact').innerHTML+="Prenume: "+det[lungime-1].prenume+"<br>";
      document.getElementById('detcontact').innerHTML+="Adresa: "+det[lungime-1].adresa+"<br>";
      document.getElementById('detcontact').innerHTML+="Oraș: "+det[lungime-1].oras+"<br>";
      document.getElementById('detcontact').innerHTML+="E-mail: "+det[lungime-1].email+"<br>";
      document.getElementById('detcontact').innerHTML+="Număr de telefon: "+det[lungime-1].nr_telefon+"<br>";
      document.getElementById('detcontact').innerHTML+="<br>";   
    })
}

var det= [];

var nr_comanda = 1;

var is_checked = (ev)=> //Arrow function
{
    ev.preventDefault();
    var obiecte=document.querySelectorAll(".produs");
    var can=document.querySelectorAll(".cantitate");
    var suma=0;
    var suma_totala;
    var elemente_comandate="";
    for (var i=0;i<obiecte.length;i++)
    {
        if(obiecte[i].checked==true) 
        { 
            suma=suma+parseInt(obiecte[i].value)*can[i].value;
            elemente_comandate+=(can[i].value+"x: "+obiecte[i].name+" ");
            obiecte[i].parentNode.style.color = "black";
            obiecte[i].parentNode.style.fontWeight = "400";
            obiecte[i].checked=false;
        }
    }
    if (suma!=0)
    {
        function getRandomInt(maxim) 
        {                                                       //random-intre 0 si 1
            return Math.floor(Math.random()*Math.floor(maxim)); //nr intre 0 si maxim-1
        }    
        var random = getRandomInt(1000)
       suma_totala=suma+15;
       var det2=[];
       det2.push("numar comanda: "+nr_comanda);
       det2.push("total plata: "+suma_totala+" lei!");
       det2.push("produsele comandate: "+elemente_comandate);
       det.push(det2);
       localStorage.setItem("DetaliiComenzi", JSON.stringify(det));
       var Comanda =
       {
           de_plata: suma_totala,
           produse: elemente_comandate,
           numar_comanda: nr_comanda
       }
       $.post({
        url:"http://localhost:3000/DetaliiComenzi",
        data: Comanda
       })
       alert("Comanda finalizată! Număr comanda: "+ random);
       document.getElementById('iconp').innerHTML = 0;
       document.getElementById('total').innerHTML = '';
       nr_comanda++;
       for (var i=0;i<can.length;i++)
       {
           can[i].value="";
       }
       var de_sters=document.getElementById('transport_creat');
       de_sters.remove();
       DetaliiComenzi();
    }
    else
    {
       alert("Nu ați ales niciun produs!");
    }
}

function DetaliiComenzi()
{
    var det=[];
    $.get({
        url:"http://localhost:3000/DetaliiComenzi"
    })
    .done((rez)=>{
        det = rez;
    })
    .then(()=>
    {
      var lungime = det.length;
      document.getElementById('prod').innerHTML+="Comanda "+ det[lungime-1].numar_comanda+": "+"<br>";
      document.getElementById('prod').innerHTML+="Suma de plată: "+det[lungime-1].de_plata+" lei"+"<br>";
      document.getElementById('prod').innerHTML+="Produsele comandate: "+det[lungime-1].produse+"<br>";
      document.getElementById('prod').innerHTML+="<br>";   
    })
}

function schimbastil() 
{
    var nr=0;
    var chk = document.querySelectorAll(".produs");
    var can = document.querySelectorAll(".cantitate");
    for (var i=0;i<chk.length;i++)
    {
       if (chk[i].checked)
        {
         nr=nr+parseInt(can[i].value);
         chk[i].parentNode.style.color = "brown";
         chk[i].parentNode.style.fontWeight = "800";
         document.getElementById('iconp').innerHTML = nr;
        }
       else 
        {
         chk[i].parentNode.style.color = "black";
         chk[i].parentNode.style.fontWeight = "400";
         document.getElementById('iconp').innerHTML = nr;
        }
    }
}

function makecheck()
{
   var ch = document.querySelectorAll(".produs");
   var can = document.querySelectorAll(".cantitate");
   var cost=0;
   for (var i=0;i<can.length;i++)
   { 
      if (parseInt(can[i].value)>0)
      { 
        ch[i].checked=true;
        schimbastil();
        cost=cost+parseInt(can[i].value)*ch[i].value;
        document.getElementById("total").innerHTML = cost+15;
      }
      else 
      {
        ch[i].checked=false;
        schimbastil();
      }
    }
}

window.onclick = function(event) 
{
    var modal= document.getElementById("modalbox");
    if (event.target==modal) 
    {
      modal.style.display = "none";
    }
    var modal2= document.getElementById("modalbox2");
    if (event.target==modal2) 
    {
      modal2.style.display = "none";
    }
}

function afiseaza_modal() 
{
    document.getElementById("modalbox").style.display = "block";
}

function afiseaza_modal2() 
{
    document.getElementById("modalbox2").style.display = "block";
}

function current_target(event) 
{ 
    var header=document.getElementById("getcomputedstyle");
    var culoare_background=window.getComputedStyle(header).getPropertyValue("background-color");
    alert("Acesta este un "+event.currentTarget.nodeName+" de culoare "+culoare_background+"!");
}

function functie1(event) 
{
    alert("Div mic - al doilea titlu h3!");
    event.stopPropagation();
}
  
function functie2() 
{
    alert("DIV mare - primul titlu h3!");
}

function schimba1()
{
    document.getElementById("btn").style.backgroundColor="brown";
    document.getElementById("btn").style.color="white";
}

function schimba2()
{
    document.getElementById("btn").style.backgroundColor="white";
    document.getElementById("btn").style.color="black";
}

function schimba3()
{
    document.getElementById("btn2").style.backgroundColor="brown";
    document.getElementById("btn2").style.color="white";
}

function schimba4()
{
    document.getElementById("btn2").style.backgroundColor="white";
    document.getElementById("btn2").style.color="black";
}

function schimba5()
{
    document.getElementById("vizualizare").style.backgroundColor="brown";
    document.getElementById("vizualizare").style.color="white";
}

function schimba6()
{
    document.getElementById("vizualizare").style.backgroundColor="white";
    document.getElementById("vizualizare").style.color="black";
}

function schimba7()
{
    document.getElementById("vizualizare2").style.backgroundColor="brown";
    document.getElementById("vizualizare2").style.color="white";
}

function schimba8()
{
    document.getElementById("vizualizare2").style.backgroundColor="white";
    document.getElementById("vizualizare2").style.color="black";
}

function func1(){ document.getElementById("nume").style.backgroundColor="mistyrose";}

function func2(){ document.getElementById("nume").style.backgroundColor="oldlace";}

function func3(){ document.getElementById("prenume").style.backgroundColor="mistyrose";}

function func4(){ document.getElementById("prenume").style.backgroundColor="oldlace";}

function func5(){ document.getElementById("adresa").style.backgroundColor="mistyrose";}

function func6(){ document.getElementById("adresa").style.backgroundColor="oldlace";}

function func7(){ document.getElementById("oras").style.backgroundColor="mistyrose";}

function func8(){ document.getElementById("oras").style.backgroundColor="oldlace";}

function func9(){ document.getElementById("nr").style.backgroundColor="mistyrose";}

function func10(){ document.getElementById("nr").style.backgroundColor="oldlace";}

function Update()
{
    const nume = document.getElementById('nume').value;
    const prenume = document.getElementById('prenume').value;
    const email = document.getElementById('email').value;
    const adresa = document.getElementById('adresa').value;
    const oras = document.getElementById('oras').value;
    const nr_tel = document.getElementById('nr').value;
    const DateNoi={
        nume: nume,
        prenume: prenume,
        email: email,
        adresa: adresa,
        oras:oras,
        nr_tel: nr_tel
    }
    var id = 1;
    document.forms[0].reset();
    $.ajax({
        type: "PUT",
        url:"http://localhost:3000/DetaliiContact?id="+id,
        data:DateNoi
    })
}

function Sterge()
{
    var id = 1;
    $.ajax({
        type: "DELETE",
        url:"http://localhost:3000/DetaliiContact?id="+id
    })
}