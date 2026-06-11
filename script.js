body{
font-family:Arial;
margin:0;
padding:20px;
text-align:center;
background:#111;
color:white;
}

#splash{
height:100vh;
display:flex;
justify-content:center;
align-items:center;
background:white;
}

#splash img{
width:500px;
max-width:90%;
}

.movie-container{
display:flex;
gap:20px;
justify-content:center;
flex-wrap:wrap;
}

.movie-card{
background:#222;
padding:15px;
border-radius:10px;
width:250px;
}

.movie-card img{
width:100%;
height:350px;
object-fit:cover;
}

button{
background:green;
color:white;
border:none;
padding:10px 20px;
cursor:pointer;
border-radius:5px;
}

.seats{
display:grid;
grid-template-columns:repeat(4,70px);
gap:10px;
justify-content:center;
margin:20px;
}

.seat{
background:green;
padding:15px;
cursor:pointer;
border-radius:5px;
}

.selected{
background:orange;
}

input,select{
padding:10px;
margin:10px;
width:300px;
} **
