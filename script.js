let div=document.createElement("div");
div.setAttribute("class","container");

//Creating Text box to get the input from the user
let number=document.createElement('input');
number.setAttribute("type","text");
number.setAttribute("class","form-control");
number.setAttribute("id","searchnumber")
number.setAttribute("placeholder","1 முதல் 1330 குறள்களைத் தேட எந்த எண்ணையும் உள்ளிடவும்");

//Submit button creation and onclicking function call statement
let button=document.createElement("button");
button.setAttribute("class","btn");
button.setAttribute("id","searchbutton");
button.innerHTML="தேடு";
button.addEventListener("click",search);

//contains card for display details of the page
let contains=document.createElement("div");
contains.setAttribute("class","card w-50");
contains.style.textAlign="left";
contains.innerHTML=`<p>- திருக்குறள் <mark>திருவள்ளுவரால்</mark> எழுதப்பட்டது.<br>
- திருக்குறள் முதன் முதலில் 1812 ஆம் ஆண்டு அச்சிடப்பட்டு வெளியிடப்பட்டது.<br>
- திருக்குறளின் முந்தைய பெயர் <mark>"முப்பால்"</mark>.<br>
- திருக்குறள் 133 அத்தியாயங்களைக் கொண்டது.<br>
- ஒவ்வொரு அத்தியாயத்திலும் 10 குறள்கள் இருப்பதால் மொத்தம் 1330 குறள்கள் உள்ளன.<br>
<b>திருக்குறளில் மூன்று முக்கிய பிரிவுகள் உள்ளன அவை :</b>
1.அறத்துப்பால் - 380 குறள்கள்(1-380)<br>
2.பொருட்பால் - 700 குறள்கள்(381-1080)<br>
3.காமத்துப்பால் - 250 குறள்கள்(1081-1330)</p>`;

//appending all elements to container
div.append(contains,number,button);
document.body.append(div);

async function search()
{
    let kuralNumber=document.getElementById('searchnumber').value;
    //console.log(kuralNumber);
    try
    {
        if(kuralNumber === "" || kuralNumber === null)  //input can't be empty
    {
        alert("எண்ணை உள்ளிடவும். காலியாக இருக்க முடியாது..!");
        return false;
    }
    else if(kuralNumber <= 1330)
    {
        let res=await fetch(`https://api-thirukkural.vercel.app/api?num=${kuralNumber}`);
        let result=await res.json();

        //Creation of card for display of details
        let div2=document.createElement("div");
        div2.setAttribute("class","card text-center");

        //creating Section as Heading inside the head part of the Card
        let divhead=document.createElement("h4");
        divhead.setAttribute("class","card-header");
        divhead.innerHTML=`<b>பிரிவு : </b>${result.sect_tam}`;

        //Body of the Card
        let divbody=document.createElement("div");
        divbody.setAttribute("class","card-body");
        
        //Creation of Adhigaram as Subtitle
        let chapter=document.createElement("h5");
        chapter.setAttribute("class","card-subtitle mb-2 text-muted");
        chapter.innerHTML=`<b>அத்தியாயம் : </b>${result.chap_tam}`;
    
        //adding image inside the body of the card 
        let image=document.createElement("img");
        image.setAttribute("src","https://www.bayareakuralkoodam.org/images/bakk/index/palm-script.jpg");
        image.setAttribute("class","card-img-left");

        //display of searched kural number inside the Card
        let displaykuralnumber=document.createElement("div");
        displaykuralnumber.setAttribute("class","kuralNumber");
        displaykuralnumber.innerHTML=`<b>குறள் எண் : ${result.number}</b>`;
   
        //display of tamil lines inside the cards
        let tamline1=document.createElement("div");
        tamline1.setAttribute("class","card-text1");
        tamline1.innerHTML=`${result.line1}`;
        let tamline2=document.createElement("div");
        tamline2.setAttribute("class","card-text2");
        tamline2.innerHTML=`${result.line2}`;
    
        //Tamil explanation for the kural
        let tamexp=document.createElement("div");
        tamexp.setAttribute("class","card-text3");
        tamexp.innerHTML=`<b>குறள் விளக்கம்: </b> <br>${result.tam_exp}`;
    
        //appending all elements inside the body of the card
        divbody.append(chapter,image,displaykuralnumber,tamline1,tamline2,tamexp);
        div2.append(divhead,divbody);
        div.append(div2);   
        
    }
    else
    {
        throw kuralNumber;
    }

    }
    //Catch for display number not in the defined range
    catch(kuralNumber)
    {
        alert("திருக்குறளில் 1330 குறள்கள் மட்டுமே இருப்பதால், 1 முதல் 1330 வரையிலான மதிப்புகளை உள்ளிடவும்.");
    }

    //Resetting the search box once submit is engaged
    let inputs=document.querySelectorAll('input');
    inputs.forEach(input => input.value='' );
}