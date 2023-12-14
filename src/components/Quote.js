import "./Quote.css"
import React, { Component } from 'react';

class Quote extends Component {
  constructor(props) {
    super(props);

    // Define your list of quotes
    this.state = {
      quotes: [
        "Get up here and eat your chili dog! - Marsha Clogston",
        "Who clogged the Faucette? - Ted Hickey",
        "I can deal with your drug addiction, but I can't deal with you being late. - Joe Bacon",
        "Come on now you ain't that retarded. - Martinez Robinson",
        "Is it one of our lineman rules to scoop play side? - Joe Bacon",
        "Kader is a freaking athlete. - Joe Bacon",
        "Alignment Assignment Technique.",
        "Hit squad tackling. - Martinez Robinson",
        "Good game big boy. - Ellis Brister",
        "Whos gonna be that dog? - Cooper",
        "Ya ever played linebacker before? - Brister",
        "Clogston, you a deadeye. - Martinez Robinson",
        "Hit squad tackling. - Martinez Robinson",
        "I'm in the conversation to start both ways. - Morrison",
        "Did it happen because you broke outside contain? - Joe Bacon",
        "I got 2 words Sha Hall",
        "Kader is allowed to be undiscipline because he is so discipline - Cooper",
        "It's not over! - Carrico",
        "You know who quits football? I think you know. - Joe Bacon",
        "Step on their throats do not let them breathe. - Bacon",
        "Cason, you know. - Bacon",
        "We're gonna pound McClain in the second half. - Brister",
        "If that was my daughter, I'd kill em. - Bacon",
        "Lift or leave. - Whitmore",
        "I hate football, but I love you guys. - Whitmore"


        // Add more quotes here
      ],
      currentQuote: "Loading...", // Initial message
    };
  }

  componentDidMount() {
    // Set an initial quote when the component mounts
    const storedQuote = localStorage.getItem('storedQuote');

    if (storedQuote) {
        // If a quote is stored, use it
        this.setState({ currentQuote: storedQuote });
      } else {
        // If no quote is stored, get a random quote and store it
        this.getRandomQuote();
      }

    // Update the quote every 24 hours (in milliseconds)
    this.quoteInterval = setInterval(() => {
      this.getRandomQuote();
    }, 24 * 60 * 60 * 1000);
  }

  
  componentWillUnmount() {
    // Clear the interval when the component is unmounted
    clearInterval(this.quoteInterval);
  }

  getRandomQuote() {
    const { quotes } = this.state;
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    this.setState({ currentQuote: randomQuote });

        // Store the selected quote in local storage
        localStorage.setItem('storedQuote', randomQuote);

        // Set the quote in the component's state
        this.setState({ currentQuote: randomQuote });
  }


  render() {
    const { currentQuote } = this.state;

    return (
      <div className="text-sm quote bg-gray-200 border-b-4 border-green-400 rounded-lg">
        <h2>Quote of the Day: {currentQuote}</h2>
      </div>
    );

  }
}

export default Quote;
