// Name  : Li Yongjie
// Class : DAAA/1A/01
// Adm   : 2342377

var input = require("readline-sync");

// -------- Class -----------

//Creating movie class to create objects
class Movie {
    constructor(name, genre, runningTime, releaseDate, rating) {
        this.name = name;
        this.genre = genre;
        this.runningTime = runningTime;
        this.releaseDate = releaseDate;
        this.rating = rating;
    }

    // Returning movie details
    getMovieDetails() {
        var movieDetail = ''
        movieDetail += `\nName\t\t: ${this.name}`;
        movieDetail += `\nGenre\t\t: ${this.genre}`;
    
        var hours = parseInt(this.runningTime/ 60);
        var min = (this.runningTime) % 60;

        if (hours == 0)
        movieDetail += `\nRunning Time\t: ${min}m`; // If there are no hours

        else if (min == 0)
        movieDetail += `\nRunning Time\t: ${hours}h` // If there are no minutes

        else
        movieDetail += `\nRunning Time\t: ${hours}h ${min}m`; // If there are hours and minutes

        movieDetail += `\nRelease Date\t: ${this.releaseDate}`;

        var rate = ((this.rating[1] / this.rating[0]).toFixed(1)); // Finds the rating and rounds off to 1.dp
        if(isNaN(rate))
        rate = 0;
        movieDetail += `\nRating\t\t: ${rate} (${this.rating[0]} voters)`;
      
        return movieDetail
    }
}

// -------- Functions -----------

//Function to check if reprompt is required and gives a reprompt message if required
function reprompt(message) {
    console.log(`\tPlease enter a ${message}!`);
    invalid = true
}

//Function to check if input is invalid
function validateInput(input, message, rangeMin, rangeMax, include) {
    invalid = isNaN(input)||input<rangeMin||input>rangeMax||input.includes(".")||input.startsWith("0")
    if (invalid) {
        console.log(`\tPlease enter a ${message}!`);
    };
    return(invalid)
}

function enterOption() {
    var option = input.question("\t>> ")
    return option
}

// -------- Variables -----------

//Craeting an array of objects
var movieList = [
    new Movie("Black Panther: Wakanda Forever 2022", ["Adventure", "Action", "Drama", "Fantasy", "Sci-Fi", "Thriller"], 161, "11 Nov 2022", [9, 42]),
    new Movie("Avatar: The Way of Water", ["Adventure", "Sci-Fi"], 192, "16 Dec 2022", [4, 15]),
    new Movie("Fast X", ["Crime", "Action", "Mystery", "Thriller"], 43, "19 May 2023", [28, 60]),
    new Movie("Ant-Man and the Wasp: Quantumania", ["Adventure", "Action"], 120, "16 Feb 2023", [18, 80]),
    new Movie("M3GAN", ["Horror", "Mystery", "Thriller"], 102, "6 Jan 2023", [20, 70])
  ];

//Creating array of choices and genre
var choices = ["Display All Movies", "Add Movie", "Add Rating", "Latest 3 Release Date", "Filter Genre", "Exit"];
var genres = ['Action', 'Adventure', 'Crime', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Sci-Fi', 'Thriller']

console.log("Welcome to Silver Vintage Movie Review Programme");
var name = input.question("Please enter your name: ");

do {
    console.log(`\nHi ${name}, please select your choice:`);
    for (j = 1; j <= 6; j++) {
        //Displays the 6 choices
        console.log(`\t${j}. ${choices[j - 1]}`)
    }
    var choice = enterOption();

    switch(choice) {
    
    case('1') : // Display All Movies 
        for(let i = 0; i < movieList.length; i++)
        console.log(movieList[i].getMovieDetails())
    break;

    
    case('2') : // Add Movie
        do {
            // Prompting Movie Name
            var newMovieName = input.question("\n\tPlease enter Movie's name: ");

            // Validating by checking for duplicate
            for(let i = 0; i<movieList.length; i++) {
                if((newMovieName.toLowerCase()).trim() == (movieList[i].name).toLowerCase()) {
                    console.log('\tPlease enter a unique movie name!')
                    invalid = true;
                    break
                } else {
                invalid = false
                }
            }
        }  while (invalid)

        do {
            // Prompting Movie Genre
            var tempGenre = [], newMovieGenre = [], test =[], invalid = false;
            
            console.log("\n\tPlease enter Movie's genre(s): ");
            for(let i = 1; i <= genres.length; i++) {
                console.log(`\t${i})  ${genres[i-1]}`)
            }
            var typeOfGenre = enterOption().split(',');

            // Validating Movie Genre
            if(typeOfGenre.length==0) {
                invalid = true;
            };
            for(let i = 0; i < typeOfGenre.length; i++) {
                typeOfGenre[i]=typeOfGenre[i].trim();
                if(validateInput(typeOfGenre[i], "valid input", 1, 9)) {
                    break;
                }
                
                if(!(test.includes(typeOfGenre[i]))) {
                    test.push(typeOfGenre[i]);
                    tempGenre.push(parseInt(typeOfGenre[i])); //Changes the string array to integer array
                } else {
                    reprompt("valid input");
                }
            };
        } while(invalid);
        
        // Createing a string array that contains the movie genre in alphabtical order
        tempGenre.sort();
        for(let i = 0; i < tempGenre.length; i++) {
            newMovieGenre.push(genres[tempGenre[i]-1]);
        };
        
        // Prompting for Movie Release Date
        var newMovieReleaseDate = input.question("\n\tPlease Enter Movie's release date: ");
        
        //Prompting and Validating for Movie Running Time
        do {
        var newMovieRunningTime = input.question("\n\tPlease Enter Movie's running time(mins): ");

        invalid = validateInput(newMovieRunningTime, "valid running time", 1);
        
        } while(invalid);

        movieList.push(new Movie(newMovieName, newMovieGenre, newMovieRunningTime, newMovieReleaseDate, [0,0]));//Adding new movie and its details to movieList
        
        break;


    case('3') :  // Add Rating

        do{
            console.log("\n\tSelect the movie to add a rating:");
            for(var i = 1; i <=movieList.length ; i++) {
                console.log(`\t${i}) ${movieList[i-1].name}`);
            }
            console.log(`\t${i}) Go Back To Main Menu`);
            var selectMovie = enterOption();
            
            invalid = validateInput(selectMovie,"valid rating", 1, i);
            
        } while(invalid)

        // Validating Movie Rating
        if(selectMovie != i) {
        do{
            var addRating = input.question(`\n\tEnter your rating for "${movieList[selectMovie-1].name}" (1 to 5 inclusive): `);
            
            invalid = validateInput(addRating,"valid rating", 1, 5);

        } while(invalid);

        movieList[selectMovie-1].rating[0] += 1;
        movieList[selectMovie-1].rating[1] += parseInt(addRating);
        }

    break;


    
    case('4') : // Latest 3 Release Dates

        var cloneMovieList = [...movieList];

        cloneMovieList.sort(function(a,b) { // Sorts the movelist based on the number of miliseconds from highest to lowest
            var firstDate = Date.parse(a.releaseDate);
            var secondDate = Date.parse(b.releaseDate);
            return secondDate - firstDate; //If result is +ve(secondDate >firstDate) firstDate is placed after secondDate, -ve(firstDate > secondDate) causes firstDate to be placed before secondDate
        })

        console.log("\n\tThe 3 latest movies are:");
        for(let i = 0; i<3; i++) {
            console.log(`\t${i+1}) ${cloneMovieList[i].releaseDate} - ${cloneMovieList[i].name}`);
        }

    break;


    case('5') : // Filter by Genre

    do {

        console.log("\n\tPlease select a genre: ");
        for(let i = 1; i <= genres.length; i++) {
            console.log(`\t${i})  ${genres[i-1]}`);
        };
        var typeOfGenre = enterOption();

        invalid = validateInput(typeOfGenre, "valid genre", 1, genres.length);

    } while(invalid);

    console.log(`\n\tYou have selected "${genres[typeOfGenre-1]}" genre:`);

    for(let i = 0, j = 1; i< movieList.length; i++) {
        if(movieList[i].genre.includes(genres[typeOfGenre-1])) {
            console.log(`\t${j}) ${movieList[i].name}`);
            j++;
        };
    }

    break;
    
    //Exit
    case('6') :

        console.log("Thank you & goodbye!\n");

    break;

    default:
        //If user doesn't select choices 1-6
        console.log("Please enter a valid input.");
    }
} while (choice !== '6');