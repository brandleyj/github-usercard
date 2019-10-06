/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/brandleyj
*/

axios
	.get("https://api.github.com/users/brandleyj")
	.then(response => {
		console.log(response.data);
		const newCard = cardCreator(response.data);
		entryPoint.appendChild(newCard);
	})
	.catch(error => {
		console.log("The data was not returned", error);
	});

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/
const entryPoint = document.querySelector(".cards");

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/brandleyj/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [];

axios
	.get("https://api.github.com/users/brandleyj/followers_url")
	.then(response => {
		console.log(response.data);
		response.data.forEach(item => {
			followersArray.push(item.url);
		});
	})
	.catch(error => {
		console.log("The data was not returned", error);
	});

followersArray.forEach(url => {
	console.log(url);
	axios.get(`${url}`).then(response => {
		const newCards = cardCreator(response);
		entryPoint.appendChild(newCards);
	});
});

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function cardCreator(data) {
	const card = document.createElement("div");
	const img = document.createElement("img");
	const cardInfo = document.createElement("div");
	const userFirstName = document.createElement("h3");
	const userName = document.createElement("p");
	const location = document.createElement("p");
	const profile = document.createElement("p");
	const profileLinks = document.createElement("a");
	const followers = document.createElement("p");
	const following = document.createElement("p");
	const bio = document.createElement("p");

	card.classList.add("card");
	cardInfo.classList.add("card-info");
	userFirstName.classList.add("name");
	userName.classList.add("username");

	card.appendChild(img);
	card.appendChild(cardInfo);
	cardInfo.appendChild(userFirstName);
	cardInfo.appendChild(userName);
	cardInfo.appendChild(location);
	cardInfo.appendChild(profile);
	profile.appendChild(profileLinks);
	cardInfo.appendChild(followers);
	cardInfo.appendChild(following);
	cardInfo.appendChild(bio);

	img.src = data.avatar_url;
	userFirstName.textContent = data.name;
	userName.textContent = data.login;
	location.textContent = data.location;
	profileLinks.href = data.html_url;
	profileLinks.textContent = data.html_url;
	followers.textContent = "Followers:" + data.followers;
	following.textContent = "Following:" + data.following;
	bio.textContent = data.bio;

	return card;
}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
