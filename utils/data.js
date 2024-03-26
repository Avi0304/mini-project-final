const items = [
  {
    name: "Tomato Soup",
    price: 120,
    category: "Soups",
    image:
      "https://www.allrecipes.com/thmb/QijITeBBcE99Ur5kDoccAJ35WWo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/277311spicy-fresh-tomato-soupFranceC4x3-56454ad082214f33960f62665fc8c169.jpg",
  },
  {
    name: "Manchow Soup",
    price: 150,
    category: "Soups",
    image:
      "https://www.archanaskitchen.com/images/archanaskitchen/World_Asian/Vegetable_Manchow_Soup.jpg",
  },
  {
    name: "Broccoli cheddar soup ",
    price: 110,
    category: "Soups",
    image:
      "https://sugarspunrun.com/wp-content/uploads/2022/10/Broccoli-Cheddar-Soup-Recipe-1-of-1-2.jpg",
  },
  {
    name: "Lentil soup",
    price: 170,
    category: "Soups",
    image:
      "https://cookieandkate.com/images/2019/01/best-lentil-soup-recipe-4.jpg",
  },
  
  {
    name: "Garlic Twist Bread",
    price: 200,
    category: "Starters",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOTbjofFCV8HvP8EEZX5lp4rs1QTmddJaU4A&usqp=CAU",
  },
  {
    name: "Nachos",
    price: 190,
    category: "Starters",
    image:
      "https://www.theslowroasteditalian.com/wp-content/uploads/2021/11/Air-Fryer-Nachos-SQUARE.jpg",
  },
  {
    name: "Springs rolls",
    price: 140,
    category: "Starters",
    image:
      "https://saltedmint.com/wp-content/uploads/2024/01/Vegetable-Spring-Rolls-4.jpg",
  },
  {
    name: "Panner Tikka Dry",
    price: 200,
    category: "Starters",
    image:
      "https://www.cookwithmanali.com/wp-content/uploads/2015/07/Restaurant-Style-Recipe-Paneer-Tikka.jpg",
  },
  {
    name: "Panner Chilli",
    price: 220,
    category: "Starters",
    image:
      "https://www.sharmispassions.com/wp-content/uploads/2011/02/ChilliPaneer5.jpg",
  },
  {
    name: "Plain Sandwich",
    price: 175,
    category: "Sandwich",
    image:
      "https://www.foodandwine.com/thmb/tM060YA0Fd0UALCmPQ-5gGWyBqA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Classic-Club-Sandwich-FT-RECIPE0523-99327c9c87214026b9419b949ee13a9c.jpg",
  },
  {
    name: "Club Sandwich",
    price: 175,
    category: "Sandwich",
    image:
      "https://images.arla.com/recordid/15F33607-F6D9-4952-B6AA210D3033BF14/club-sandwich1.jpg?format=jpg&width=1200&height=630&mode=crop",
  },
  {
    name: "Grilled Sandwich",
    price: 190,
    category: "Sandwich",
    image:
      "https://www.vegrecipesofindia.com/wp-content/uploads/2014/01/grilled-sandwich-4.jpg",
  },
  {
    name: "Veg Burger",
    price: 75,
    category: "Burger",
    image:
      "https://www.thespruceeats.com/thmb/d4-3wLGWdWQrdsYmcgOgokNDOxg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/vegan-tofu-veggie-burgers-recipe-3377169-hero-01-a2dd40a53b1c4d3ba21625925cc9e28b.jpg",
  },
  {
    name: "Hot Spicy Burger",
    price: 75,
    category: "Burger",
    image:
      "https://static.vecteezy.com/system/resources/previews/026/130/357/large_2x/the-best-hot-spicy-burgergraphy-images-will-satisfy-your-cravings-generative-ai-free-photo.jpeg",
  },
  {
    name: "Gourment Burger",
    price: 125,
    category: "Burger",
    image:
      "https://static.wixstatic.com/media/91e241_db1675e3bc4941ff9ff90d797c3b16a2~mv2.png/v1/fill/w_640,h_480,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/91e241_db1675e3bc4941ff9ff90d797c3b16a2~mv2.png",
  },
  {
    name: "Margherita Pizza",
    price: 190,
    category: "Pizza",
    image:
      "https://static.toiimg.com/photo/56868564.cms",
  },
  {
    name: "Tandoori Paneer Pizza",
    price: 230,
    category: "Pizza",
    image:
      "https://recipesblob.oetker.in/assets/2d2a87f7533e439aa3e6ed9bd63656e7/1272x764/tandoori-pizza.jpg",
  },
  {
    name: "Perperoni Pizza",
    price: 240,
    category: "Pizza",
    image:
      "https://www.moulinex-me.com/medias/?context=bWFzdGVyfHJvb3R8MTQzNTExfGltYWdlL2pwZWd8aGNlL2hmZC8xNTk2ODYyNTc4NjkxMC5qcGd8MmYwYzQ4YTg0MTgzNmVjYTZkMWZkZWZmMDdlMWFlMjRhOGIxMTQ2MTZkNDk4ZDU3ZjlkNDk2MzMzNDA5OWY3OA",
  },
  {
    name: "Shahi Paneer",
    price: 190,
    category: "Main Course",
    image:
      "https://myfoodstory.com/wp-content/uploads/2022/04/Shahi-Paneer-1.jpg",
  },
  {
    name: "Kadhai Paneer",
    price: 210,
    category: "Main Course",
    image:
      "https://dinedelicious.in/wp-content/uploads/2021/10/Kadai-Paneer-Recipe-6-500x375.jpg",
  },
  {
    name: "Paneer Buuter Masala",
    price: 200,
    category: "Main Course",
    image:
      "https://myfoodstory.com/wp-content/uploads/2021/07/restaurant-style-paneer-butter-masala-2.jpg",
  },
  {
    name: "Tandoori Roti",
    price: 30,
    category: "Main Course",
    image:
      "https://www.whiskaffair.com/wp-content/uploads/2020/08/Tandoori-Roti-2-3.jpg",
  },
  {
    name: "Roomali Roti",
    price: 17,
    category: "Main Course",
    image:
      "https://1.bp.blogspot.com/-PfaLPfj_iNY/Xpx1qaIUPiI/AAAAAAAAQO8/gJsP82fjza8RJylxuwnRSeN3DajAgfeoACNcBGAsYHQ/s1600/RoomaliRoti.JPG",
  },
  {
    name: "Garlic Naan Butter",
    price: 60,
    category: "Main Course",
    image:
      "https://www.vegrecipesofindia.com/wp-content/uploads/2022/12/garlic-naan-3.jpg",
  },
  {
    name: "Mojito",
    price: 50,
    category: "Drinks",
    image:
      "https://myfoodstory.com/wp-content/uploads/2022/04/Shahi-Paneer-1.jpg",
  },
  {
    name: "Coke",
    price: 40,
    category: "Drinks",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2022/9/RI/RZ/QZ/47977595/300-ml-paper-coke-glasses.jpg",
  },
  {
    name: "Coffee",
    price: 60,
    category: "Drinks",
    image:
      "https://neurosciencenews.com/files/2023/06/coffee-brain-caffeine-neuroscincces.jpg",
  },
];
module.exports = items;
