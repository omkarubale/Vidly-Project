import React, { Component } from "react";
import "./App.css";
import { getMovies } from "../src/services/fakeMovieService";

class App extends Component {
    state = {
        movies: getMovies(),
        movieCount: getMovies().length
    };

    showNumberOfMovies = number => {
        let moviesCountDisplay = "There are ";
        moviesCountDisplay += number === 0 ? "no" : number;
        return moviesCountDisplay + " movies in the database.";
    };

    render() {
        return (
            <main className="container">
                <h1>Hello World</h1>
                <span>{this.showNumberOfMovies(this.state.movieCount)}</span>
                <div id="tableDiv" />
            </main>
        );
    }
}

export default App;
