import utd1 from "../assets/pl/1.jpg";
import utd2 from "../assets/pl/utd2.jpg";
import ars1 from "../assets/pl/ars1.jpg";
import ars2 from "../assets/pl/ars2.jpg";
import liv1 from "../assets/pl/liv1.jpg";
import liv2 from "../assets/pl/liv2.jpg";
import che1 from "../assets/pl/che1.jpg";
import che2 from "../assets/pl/che2.jpg";
import new1 from "../assets/pl/new1.jpg";
import new2 from "../assets/pl/new2.jpg";
import aston1 from "../assets/pl/aston1.jpg";
import aston2 from "../assets/pl/aston2.jpg";
import city1 from "../assets/pl/city1.jpg";
import city2 from "../assets/pl/city2.jpg";
import spur1 from "../assets/pl/spur1.jpg";
import spur2 from "../assets/pl/spur2.jpg";
import west1 from "../assets/pl/west1.jpg";
import west2 from "../assets/pl/west2.jpg";

//home jer
import milan1 from "../assets/seria a/milan1.jpg"
import ac1 from "../assets/seria a/ac 1.jpg"
import atlan1 from "../assets/seria a/atlanta1.jpg"
import lazio1 from "../assets/seria a/lazio1.jpg"
import  roma1 from "../assets/seria a/roma1.jpg"
import nap1 from "../assets/seria a/nap1.jpg"
import juve1 from "../assets/seria a/juve1.jpg"



//away jer
import ac2 from "../assets/seria a/ac 2.jpg"
import atlan2 from "../assets/seria a/atlanta2.jpg"
import juve2 from "../assets/seria a/juve2.jpg"
import lazio from "../assets/seria a/lazio2.jpg"
import milan2 from "../assets/seria a/milan2.jpg"
import nap2 from "../assets/seria a/nap2.jpg"
import roma2 from "../assets/seria a/roma2.jpg"
import { getRandomRating } from "./helpers";

//la liga
import ath1 from "../assets/laliga/ath1.jpg"
import ath2 from "../assets/laliga/ath2.jpg"
import atm1 from "../assets/laliga/atm1.jpg"
import atm2 from "../assets/laliga/atm2.jpg"
import b1 from "../assets/laliga/b1.jpg"
import b2 from "../assets/laliga/b2.jpg"
import betis1 from "../assets/laliga/betis1.jpg"
import betis2 from "../assets/laliga/betis2.jpg"
import girona1 from "../assets/laliga/girona1.jpg"
import girona2 from "../assets/laliga/girona2.jpg"
import r1 from "../assets/laliga/r1.jpg"
import r2 from "../assets/laliga/r2.jpg"
import sevilla1 from "../assets/laliga/sevilla1.jpg"
import sevilla2 from "../assets/laliga/sevilla2.jpg"
import villa1 from "../assets/laliga/villa1.jpg"
import villa2 from "../assets/laliga/villa2.jpg"

//bundesliga

import bayern1 from "../assets/bundesliga/bayern1.jpg"
import bayern2 from "../assets/bundesliga/bayern2.jpg"
import bvb1 from "../assets/bundesliga/bvb1.jpg"
import bvb2 from "../assets/bundesliga/bvb2.jpg"
import rl1 from "../assets/bundesliga/rl1.jpg"
import rl2 from "../assets/bundesliga/rl2.jpg"
import sc1 from "../assets/bundesliga/sc1.jpg"
import sc2 from "../assets/bundesliga/sc2.jpg"
import  union1 from "../assets/bundesliga/union1.jpg"
import  union2 from "../assets/bundesliga/union2.jpg"
import wolf1 from "../assets/bundesliga/wolf1.jpg"
import wolf2 from "../assets/bundesliga/wolf2.jpg"
import Bayer1 from "../assets/bundesliga/b1.jpg"
import Bayer2 from "../assets/bundesliga/b2.jpg"


//ligue1
import m1 from "../assets/ligue1/m1.jpg"
import m2 from "../assets/ligue1/m2.jpg"
import monaco1 from "../assets/ligue1/monaco1.jpg"
import monaco2 from "../assets/ligue1/monaco2.jpg"
import nice1 from "../assets/ligue1/nice1.jpg"
import nice2 from "../assets/ligue1/nice2.jpg"
import nol1 from "../assets/ligue1/nol1.jpg"
import nol2 from "../assets/ligue1/nol2.jpg"
import psg1 from "../assets/ligue1/psg1.jpg"
import psg2 from "../assets/ligue1/psg2.jpg"
import sd1 from "../assets/ligue1/sd1.jpg"
import sr2 from "../assets/ligue1/sr2.jpg"






const home_jer = [
  {
    _id: "1",
    club: "Arsenal",
    Image: ars1,
    rating: getRandomRating(),
    type: "Home",
    price: 600,
  },
  {
    _id: "2",
    club: "Chelsea",
    Image: che1,
    rating: getRandomRating(),
    type: "Home",
    price: 600,
  },
  {
    _id: "3",
    club: "Manchester United",
    Image: utd1,
    rating: getRandomRating(),
    type: "Home",
    price: 600,
  },
  {
    _id: "4",
    club: "Manchester City",
    Image: city1,
    rating: getRandomRating(),
    type: "Home",
    price: 600,
  },
  {  _id: "5",
    club: "Tottenham",
    Image: spur1,
    rating: getRandomRating(),
    type: "Home",
    price: 600,
  },
  {  _id: "6",
    club: "NewCastle United",
    Image: new1,
    rating: getRandomRating(),
    type: "Home",
    price: 600,
  },
  {   _id: "7",
    club: "West Ham",
    Image: west1,
    rating: getRandomRating(),
    type: "Home",
    price: 600,
  },
  {  _id: "8",
    club: "Aston Villa",
    Image: aston1,
    rating: getRandomRating(),
    type: "Home",
    price: 600,
  },
  {   _id: "9",
    club: "Liverpool",
    Image: liv1,
    rating: getRandomRating(),
    type: "Home",
    price: 600,
  },

  //seria a


  {  _id: "10",
    club: "AC Milan",
    Image: ac1,
    rating: getRandomRating(),
    type: "Home",
    price: 600,

  },
  {  _id: "11",
    club: "Atalanta",
    Image: atlan1,
    rating: getRandomRating(),
    type: "Home",
    price: 600,
   
  },
  {  _id: "12",
    club: "Juventus",
    Image: juve1,
    rating: getRandomRating(),
    type: "Home",
    price: 600,
  },
  {  _id: "13",
    club: "Lazio",
    Image: lazio1,
    rating: getRandomRating(),
    type: "Home",
    price: 600,
   
  },
  {  _id: "14",
    club: "Inter Milan",
    Image: milan1,
    rating: getRandomRating(),
    type: "Home",
    price: 600,
  
  },
  {  _id: "15",
    club: "Napoli",
    Image: nap1,
    rating: getRandomRating(),
    type: "Home",
    price: 600,
   
  },
  {  _id: "16",
    club: "Roma",
    Image: roma1,
    rating: getRandomRating(),
    type: "Home",
    price: 600,
  },

  // Bundesliga home jerseys
  {
    _id: "64",
    club: "Borussia Dortmund",
    Image: bvb1,
    rating: getRandomRating(),
    type: "Home",
    price: 600,
  },
  {
    _id: "65",
    club: "FC Bayern Munich",
    Image: bayern1,
    rating: getRandomRating(),
    type: "Home",
    price: 600,
  },
  {
    _id: "66",
    club: "Union Berlin",
    Image: union1,
    rating: getRandomRating(),
    type: "Home",
    price: 600,
  },
  {
    _id: "67",
    club: "VfL Wolfsburg",
    Image: wolf1,
    rating: getRandomRating(),
    type: "Home",
    price: 600,
  },
  {
    _id: "68",
    club: "SC Freiburg",
    Image: sc1,
    rating: getRandomRating(),
    type: "Home",
    price: 600,
  },
  {
    _id: "69",
    club: "RasenBallsport Leipzig",
    Image: rl1,
    rating: getRandomRating(),
    type: "Home",
    price: 600,
  },
  {
    _id: "78",
    club: "Bayer Leverkusen",
    Image: Bayer1,
    rating: getRandomRating(),
    type: "Home",
    price: 600,
  },
  {
    _id: "80",
    club: "FC Schalke 04",
    Image: sc1,
    rating: getRandomRating(),
    type: "Home",
    price: 600,
  },
  // La Liga home jerseys
  {
    _id: "70",
    club: "Athletic Bilbao",
    Image: ath1,
    rating: getRandomRating(),
    type: "Home",
    price: 600,
  },
  {
    _id: "71",
    club: "Atletico Madrid",
    Image: atm1,
    rating: getRandomRating(),
    type: "Home",
    price: 600,
  },
  {
    _id: "72",
    club: "FC Barcelona",
    Image: b1,
    rating: getRandomRating(),
    type: "Home",
    price: 600,
  },
  {
    _id: "73",
    club: "Real Betis",
    Image: betis1,
    rating: getRandomRating(),
    type: "Home",
    price: 600,
  },
  {
    _id: "74",
    club: "Girona FC",
    Image: girona1,
    rating: getRandomRating(),
    type: "Home",
    price: 600,
  },
  {
    _id: "75",
    club: "Real Madrid",
    Image: r1,
    rating: getRandomRating(),
    type: "Home",
    price: 600,
  },
  {
    _id: "76",
    club: "Sevilla FC",
    Image: sevilla1,
    rating: getRandomRating(),
    type: "Home",
    price: 600,
  },
  {
    _id: "77",
    club: "Villarreal CF",
    Image: villa1,
    rating: getRandomRating(),
    type: "Home",
    price: 600,
  },
  //ligue1
  {
    _id: "52",
    club: "Paris Saint-Germain",
    Image: psg1,
    rating: getRandomRating(),
    type: "Home",
    price: 600,
  },
  {
    _id: "53",
    club: "Marseille",
    Image: m1,
    rating: getRandomRating(),
    type: "Home",
    price: 600,
  },
  {
    _id: "54",
    club: "AS Monaco",
    Image: monaco1,
    rating: getRandomRating(),
    type: "Home",
    price: 600,
  },
  {
    _id: "55",
    club: "OGC Nice",
    Image: nice1,
    rating: getRandomRating(),
    type: "Home",
    price: 600,
  },
  {
    _id: "56",
    club: "Lyon",
    Image: nol1,
    rating: getRandomRating(),
    type: "Home",
    price: 600,
  },
  {
    _id: "57",
    club: "Stade Rennais",
    Image: sd1,
    rating: getRandomRating(),
    type: "Home",
    price: 600,
  },

];

const away_jer = [
  {  _id: "17",
    club: "Arsenal",
    Image: ars2,
    rating: getRandomRating(),
    type: "Away",
    price: 400,
  },
  {  _id: "18",
    club: "Chelsea",
    Image: che2,
    rating: getRandomRating(),
    type: "Away",
    price: 400,
  },
  {  _id: "19",
    club: "Liverpool",
    Image: liv2,
    rating: getRandomRating(),
    type: "Away",
    price: 400,
  },
  {  _id: "20",
    club: "Manchester City",
    Image: city2,
    rating: getRandomRating(),
    type: "Away",
    price: 400,
  },
  {  _id: "21",
    club: "Manchester United",
    Image: utd2,
    rating: getRandomRating(),
    type: "Away",
    price: 400,
  },
 
  {  _id: "22",
    club: "Tottenham",
    Image: spur2,
    rating: getRandomRating(),
    type: "Away",
    price: 400,
  },
  {  _id: "23",
    club: "Aston Villa",
    Image: aston2,
    rating: getRandomRating(),
    type: "Away",
    price: 400,
  },
  {  _id: "24",
    club: "West Ham",
    Image: west2,
    rating: getRandomRating(),
    type: "Away",
    price: 400,
  },


  //seria a
  
  {  _id: "25",
    club: "AC Milan",
    Image: ac2,
    rating: getRandomRating(),
    type: "Away",
    price: 400,
   
  },
  {  _id: "26",
    club: "Atalanta",
    Image:atlan2,
    rating: getRandomRating(),
    type: "Away",
    price: 400,
   
  },
  {  _id: "27",
    club: "Juventus",
    Image: juve2, 
    rating: getRandomRating(),
    type: "Away",
    price: 400,
 
  },
  {  _id: "28",
    club: "Lazio",
    Image: lazio,
    rating: getRandomRating(),
    type: "Away",
    price: 400,
    
  },
  {  _id: "29",
    club: "Inter Milan",
    Image: milan2,
    rating: getRandomRating(),
    type: "Away",
    price: 400,
    
  },
  {  _id: "30",
    club: "Napoli",
    Image: nap2,
    rating: getRandomRating(),
    type: "Away",
    price: 400,
    
  },
  {  _id: "31",
    club: "Roma",
    Image: roma2,
    rating: getRandomRating(),
    type: "Away",
    price: 400,
    
  },
//la liga

  
    {
      _id: "32",
      club: "Athletic Bilbao",
      Image: ath2,
      rating: getRandomRating(),
      type: "Away",
      price: 400,
    },
    {
      _id: "33",
      club: "Real Madrid",
      Image: r2,
      rating: getRandomRating(),
      type: "Away",
      price: 400,
    },
    {
      _id: "34",
      club: "FC Barcelona",
      Image: b2,
      rating: getRandomRating(),
      type: "Away",
      price: 400,
    },
    {
      _id: "35",
      club: "Real Betis",
      Image: betis2,
      rating: getRandomRating(),
      type: "Away",
      price: 400,
    },
    {
      _id: "36",
      club: "Girona FC",
      Image: girona2,
      rating: getRandomRating(),
      type: "Away",
      price: 400,
    },
    {
      _id: "37",
      club: "Villarreal CF",
      Image: villa2,
      rating: getRandomRating(),
      type: "Away",
      price: 400,
    },
    {
      _id: "38",
      club: "Atletico Madrid",
      Image: atm2,
      rating: getRandomRating(),
      type: "Away",
      price: 400,
    },
    {
      _id: "39",
      club: "Sevilla FC",
      Image: sevilla2,
      rating: getRandomRating(),
      type: "Away",
      price: 400,
    },
  



  //bub
  {
    _id: "40",
    club: "FC Bayern Munich",
    Image: bayern2,
    rating: getRandomRating(),
    type: "Away",
    price: 400,
  },
  {
    _id: "41",
    club: "Borussia Dortmund",
    Image: bvb2,
    rating: getRandomRating(),
    type: "Away",
    price: 400,
  },
  {
    _id: "42",
    club: "Union Berlin",
    Image: union2,
    rating: getRandomRating(),
    type: "Away",
    price: 400,
  },
  {
    _id: "43",
    club: "VfL Wolfsburg",
    Image: wolf2,
    rating: getRandomRating(),
    type: "Away",
    price: 400,
  },
  {
    _id: "44",
    club: "SC Freiburg",
    Image: sc2,
    rating: getRandomRating(),
    type: "Away",
    price: 400,
  },
  {
    _id: "45",
    club: "RasenBallsport Leipzig",
    Image: rl2,
    rating: getRandomRating(),
    type: "Away",
    price: 400,
  },
  {
    _id: "79",
    club: "Bayer Leverkusen",
    Image: Bayer2,
    rating: getRandomRating(),
    type: "Away",
    price: 600,
  },
  // Add remaining Ligue 1 away jerseys here...
  {
    _id: "46",
    club: "Marseille",
    Image: m2,
    rating: getRandomRating(),
    type: "Away",
    price: 400,
  },
  {
    _id: "47",
    club: "AS Monaco",
    Image: monaco2,
    rating: getRandomRating(),
    type: "Away",
    price: 400,
  },
  {
    _id: "48",
    club: "OGC Nice",
    Image: nice2,
    rating: getRandomRating(),
    type: "Away",
    price: 400,
  },
  {
    _id: "49",
    club: "Lyon",
    Image: nol2,
    rating: getRandomRating(),
    type: "Away",
    price: 400,
  },
  {
    _id: "50",
    club: "Paris Saint-Germain",
    Image: psg2,
    rating: getRandomRating(),
    type: "Away",
    price: 400,
  },
  {
    _id: "51",
    club: "Stade Rennais",
    Image: sr2,
    rating: getRandomRating(),
    type: "Away",
    price: 400,
  },

  
  {
    _id: "60",
    club: "AS Monaco",
    Image: monaco2,
    rating: getRandomRating(),
    type: "Away",
    price: 400,
  },
  {
    _id: "61",
    club: "OGC Nice",
    Image: nice2,
    rating: getRandomRating(),
    type: "Away",
    price: 400,
  },
  {
    _id: "62",
    club: "Nantes",
    Image: nol2,
    rating: getRandomRating(),
    type: "Away",
    price: 400,
  },
 
  {
    _id: "81",
    club: "FC Schalke 04",
    Image: sc2,
    rating: getRandomRating(),
    type: "Away",
    price: 600,
  },
  {  _id: "82",
  club: "NewCastle United",
  Image: new2,
  rating: getRandomRating(),
  type: "Away",
  price: 600,
},
  
];

export  {home_jer, away_jer}
